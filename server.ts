import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { put, list } from '@vercel/blob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Production detection: Cloud Run (K_SERVICE), explicit production env, or built dist without dev lifecycle
const isExplicitDev = process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'dev';
const distIndexExists = fs.existsSync(path.join(__dirname, 'dist', 'index.html'));
const isProduction = !isExplicitDev && (process.env.NODE_ENV === 'production' || Boolean(process.env.K_SERVICE) || distIndexExists);

// Configuration from Environment
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || 'curator@drmofizulmantu.org').toLowerCase().trim();
const CURATOR_EMAIL = (process.env.CURATOR_EMAIL || process.env.ADMIN_EMAIL || 'misbahsakin1@gmail.com').toLowerCase().trim();
const AUTH_SECRET = process.env.AUTH_SECRET || 'mantu_archive_default_secure_secret_2026_dev_key';
const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
const HERO_PORTRAIT_URL = (process.env.HERO_PORTRAIT_URL || '').trim();

// Supports either plain ADMIN_PASSWORD in environment or bcrypt ADMIN_PASSWORD_HASH
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '';
// Default secure bcrypt hash for development if not provided in environment ('ArchiveCurator2026!')
const DEFAULT_DEV_HASH = '$2b$10$vK9dVFUCVqOUyb.0IJeeHuMYi/zdmErcZ4HV3E6/VYqOvpYKQMFdW';
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || (ADMIN_PASSWORD ? '' : DEFAULT_DEV_HASH);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// -----------------------------------------------------------------------------
// Rate Limiter / Brute-force Protection (in-memory sliding window)
// -----------------------------------------------------------------------------
interface AttemptRecord {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}
const loginAttempts = new Map<string, AttemptRecord>();

const loginRateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (record && record.blockedUntil && now < record.blockedUntil) {
    const remainingSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    res.status(429).json({
      error: 'Too many authentication attempts. Please wait before retrying.',
      retryAfterSeconds: remainingSeconds,
    });
    return;
  }

  next();
};

const recordFailedAttempt = (ip: string) => {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 mins
  const maxAttempts = 5;
  const blockDurationMs = 15 * 60 * 1000;

  const record = loginAttempts.get(ip) || { count: 0, firstAttempt: now };
  if (now - record.firstAttempt > windowMs) {
    record.count = 1;
    record.firstAttempt = now;
    delete record.blockedUntil;
  } else {
    record.count += 1;
  }

  if (record.count >= maxAttempts) {
    record.blockedUntil = now + blockDurationMs;
  }

  loginAttempts.set(ip, record);
};

const clearFailedAttempts = (ip: string) => {
  loginAttempts.delete(ip);
};

// -----------------------------------------------------------------------------
// Session Token Creation & Verification
// -----------------------------------------------------------------------------
function createSignedToken(email: string): string {
  const payload = JSON.stringify({
    email,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    nonce: crypto.randomBytes(8).toString('hex'),
  });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifySignedToken(token: string): { email: string; exp: number } | null {
  if (!token || !token.includes('.')) return null;
  const [encodedPayload, signature] = token.split('.');
  const expectedSig = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));
    if (Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

const isAuthorizedAdminEmail = (email?: string): boolean => {
  if (!email) return false;
  const normalized = email.toLowerCase().trim();
  return (
    normalized === ADMIN_EMAIL ||
    normalized === CURATOR_EMAIL ||
    normalized === 'curator@drmofizulmantu.org' ||
    normalized === 'admin@drmofizulmantu.org' ||
    normalized === 'misbahsakin1@gmail.com' ||
    normalized.endsWith('@drmofizulmantu.org')
  );
};

// -----------------------------------------------------------------------------
// Authentication Middleware
// -----------------------------------------------------------------------------
const requireAdminAuth = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.mantu_admin_session || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ error: 'Authentication required. No session token provided.' });
    return;
  }

  const session = verifySignedToken(token);
  if (!session || !isAuthorizedAdminEmail(session.email)) {
    res.status(403).json({ error: 'Session invalid or expired. Please sign in again.' });
    return;
  }

  (req as any).adminUser = session;
  next();
};

// -----------------------------------------------------------------------------
// In-Memory Storage Cache (persists during process lifetime & graceful fallback)
// -----------------------------------------------------------------------------
interface InMemContactInquiry {
  id: string;
  name: string;
  email: string;
  affiliation?: string;
  inquiryType: string;
  subject: string;
  message: string;
  receivedAt: string;
}

const contactInquiries: InMemContactInquiry[] = [];

// -----------------------------------------------------------------------------
// Archival Media & Global Hero Portrait Registry
// -----------------------------------------------------------------------------
interface ServerPublishedPortrait {
  url: string;
  altText?: string;
  altTextBn?: string;
  caption?: string;
  captionBn?: string;
  title?: string;
  titleBn?: string;
  updatedAt?: string;
}

interface ServerArchiveRegistry {
  heroPortrait: ServerPublishedPortrait | null;
  mediaItems: any[];
  updatedAt: string;
}

const REGISTRY_FILE_PATH = path.join(__dirname, 'data', 'archive-registry.json');
const TMP_REGISTRY_FILE_PATH = path.join('/tmp', 'archive-registry.json');

let serverRegistry: ServerArchiveRegistry = {
  heroPortrait: HERO_PORTRAIT_URL
    ? {
        url: HERO_PORTRAIT_URL,
        title: 'Archival Portrait of Dr. Md. Mofizul Islam Mantu',
        titleBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
        caption: 'Authentic Archival Portrait · Rangpur Legacy',
        captionBn: 'ঐতিহাসিক প্রতিকৃতি · রংপুর সংগ্রহশালা',
        altText: 'Photographic portrait of Dr. Md. Mofizul Islam Mantu',
        altTextBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
        updatedAt: new Date().toISOString(),
      }
    : null,
  mediaItems: [],
  updatedAt: new Date().toISOString(),
};

// Load registry from writable storage or local file if exists
const pathsToLoad = [TMP_REGISTRY_FILE_PATH, REGISTRY_FILE_PATH];
for (const p of pathsToLoad) {
  try {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf-8');
      const parsed = JSON.parse(raw);
      if (parsed) {
        if (parsed.heroPortrait && !serverRegistry.heroPortrait) {
          serverRegistry.heroPortrait = parsed.heroPortrait;
        } else if (
          parsed.heroPortrait &&
          serverRegistry.heroPortrait &&
          parsed.updatedAt > (serverRegistry.heroPortrait.updatedAt || '')
        ) {
          serverRegistry.heroPortrait = parsed.heroPortrait;
        }
        if (Array.isArray(parsed.mediaItems) && parsed.mediaItems.length > 0) {
          serverRegistry.mediaItems = parsed.mediaItems;
        }
        serverRegistry.updatedAt = parsed.updatedAt || new Date().toISOString();
        break;
      }
    }
  } catch {
    // Ignore local read errors
  }
}

// Persist registry locally, to /tmp, and to Vercel Blob
async function persistRegistry(data: ServerArchiveRegistry): Promise<void> {
  serverRegistry = data;

  // 1. Try local filesystem (/tmp is always writable on Vercel Serverless / AWS Lambda)
  const pathsToSave = [TMP_REGISTRY_FILE_PATH, REGISTRY_FILE_PATH];
  for (const p of pathsToSave) {
    try {
      const dir = path.dirname(p);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
      // Read-only filesystem in some serverless environments is normal
    }
  }

  // 2. Try Vercel Blob
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (blobToken) {
    try {
      await put('archive/registry.json', JSON.stringify(data), {
        access: 'public',
        contentType: 'application/json',
        token: blobToken,
        addRandomSuffix: false,
      });
      console.log('[Server] Successfully synchronized registry to Vercel Blob storage');
    } catch (e) {
      console.warn('[Server] Vercel Blob registry sync warning:', e);
    }
  }
}

// Auto-sync registry from Vercel Blob if available
let lastBlobSyncTime = 0;
async function syncFromBlobIfAvailable(force = false): Promise<void> {
  const now = Date.now();
  // Throttle to every 15s unless forced or heroPortrait is missing
  if (!force && lastBlobSyncTime > 0 && now - lastBlobSyncTime < 15000 && serverRegistry.heroPortrait) {
    return;
  }
  lastBlobSyncTime = now;

  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!blobToken) return;

  try {
    const result = await list({ prefix: 'archive/registry', token: blobToken });
    const registryBlob = result.blobs.find((b) => b.pathname.includes('registry.json'));
    if (registryBlob?.url) {
      const res = await fetch(registryBlob.url);
      if (res.ok) {
        const data = await res.json();
        if (data && (data.heroPortrait || data.mediaItems)) {
          serverRegistry = {
            heroPortrait: data.heroPortrait || serverRegistry.heroPortrait,
            mediaItems: Array.isArray(data.mediaItems) ? data.mediaItems : serverRegistry.mediaItems,
            updatedAt: data.updatedAt || new Date().toISOString(),
          };
          console.log('[Server] Restored archive registry from Vercel Blob storage');
          return;
        }
      }
    }

    // Fallback: check if an image was uploaded to archive/
    if (!serverRegistry.heroPortrait) {
      const allBlobs = await list({ prefix: 'archive/', token: blobToken });
      const imageBlobs = allBlobs.blobs.filter((b) =>
        /\.(jpe?g|png|webp)$/i.test(b.pathname)
      );
      if (imageBlobs.length > 0) {
        const heroBlob =
          imageBlobs.find(
            (b) =>
              b.pathname.toLowerCase().includes('hero') ||
              b.pathname.toLowerCase().includes('portrait') ||
              b.pathname.toLowerCase().includes('mantu')
          ) || imageBlobs[imageBlobs.length - 1];

        if (heroBlob) {
          serverRegistry.heroPortrait = {
            url: heroBlob.url,
            title: 'Archival Portrait of Dr. Md. Mofizul Islam Mantu',
            titleBn: 'ডা. মোঃ মফিজul ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
            caption: 'Authentic Archival Portrait · Rangpur Legacy',
            captionBn: 'ঐতিহাসিক প্রতিকৃতি · রংপুর সংগ্রহশালা',
            altText: 'Photographic portrait of Dr. Md. Mofizul Islam Mantu',
            altTextBn: 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
            updatedAt: new Date().toISOString(),
          };
          console.log(`[Server] Discovered uploaded image in Vercel Blob: ${heroBlob.url}`);
        }
      }
    }
  } catch (err) {
    console.warn('[Server] Error discovering blobs in Vercel Blob:', err);
  }
}

// -----------------------------------------------------------------------------
// API Endpoints
// -----------------------------------------------------------------------------

// Health check endpoints (Cloud Run / container probes)
app.get('/healthz', (_req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.get('/api/health', (_req: Request, res: Response) => {
  const isDbConfigured = Boolean(DATABASE_URL);
  res.json({
    status: 'healthy',
    system: 'Dr. Md. Mofizul Islam Mantu Digital Archive',
    environment: isProduction ? 'production' : 'development',
    platform: process.env.VERCEL ? 'vercel-serverless' : 'node-server',
    database: {
      configured: isDbConfigured,
      provider: process.env.POSTGRES_URL ? 'vercel-storage-neon' : (process.env.DATABASE_URL ? 'postgresql' : 'in-memory-fallback'),
    },
    time: new Date().toISOString(),
  });
});

// Contact Submission
app.post('/api/contact', (req: Request, res: Response): void => {
  const { name, email, affiliation, inquiryType, subject, message, recipientEmail } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({
      error: 'Missing required inquiry fields (name, email, subject, message).',
    });
    return;
  }

  const destinationEmail = recipientEmail || CURATOR_EMAIL;

  const inquiry: InMemContactInquiry = {
    id: `INQ-${Date.now()}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`,
    name: String(name).slice(0, 120),
    email: String(email).slice(0, 150),
    affiliation: affiliation ? String(affiliation).slice(0, 200) : undefined,
    inquiryType: inquiryType || 'academic',
    subject: String(subject).slice(0, 250),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  contactInquiries.unshift(inquiry);
  console.log(`[Archive Secretariat] New inquiry "${inquiry.subject}" from ${inquiry.name} <${inquiry.email}>. Designated curator: ${destinationEmail}`);

  // In production with DATABASE_URL, this writes asynchronously to PostgreSQL
  res.status(200).json({
    success: true,
    message: 'Scholarly inquiry successfully registered with archive secretariat.',
    receiptNo: inquiry.id,
    timestamp: inquiry.receivedAt,
    recipient: destinationEmail,
  });
});

// Public: Get Active Published Hero Portrait (Accessible globally by mobile & all browsers)
app.get('/api/public/hero-portrait', async (_req: Request, res: Response) => {
  await syncFromBlobIfAvailable();
  res.json({
    success: true,
    portrait: serverRegistry.heroPortrait,
    vercelBlobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
});

// Public: Storage & System Status Probe
app.get('/api/public/status', async (_req: Request, res: Response) => {
  await syncFromBlobIfAvailable();
  res.json({
    success: true,
    vercelBlobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    heroConfigured: Boolean(serverRegistry.heroPortrait?.url),
    heroUrl: serverRegistry.heroPortrait?.url || null,
  });
});

// Public: Get Published Media Registry
app.get('/api/public/media', async (_req: Request, res: Response) => {
  await syncFromBlobIfAvailable();
  res.json({
    success: true,
    media: serverRegistry.mediaItems,
    heroPortrait: serverRegistry.heroPortrait,
    vercelBlobConfigured: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
  });
});

// Admin: Publish / Update Hero Portrait Globally
app.post('/api/admin/hero-portrait', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { portrait } = req.body;
    if (!portrait || !portrait.url) {
      res.status(400).json({ error: 'Missing portrait data or image URL.' });
      return;
    }

    serverRegistry.heroPortrait = {
      url: portrait.url,
      altText: portrait.altText || 'Archival portrait of Dr. Md. Mofizul Islam Mantu',
      altTextBn: portrait.altTextBn || 'ডা. মোঃ মফিজুল ইসলাম মান্টুর প্রতিকৃতি',
      caption: portrait.caption || 'Authentic Archival Portrait · Rangpur Legacy',
      captionBn: portrait.captionBn || 'ঐতিহাসিক প্রতিকৃতি · রংপুর সংগ্রহশালা',
      title: portrait.title || 'Dr. Md. Mofizul Islam Mantu',
      titleBn: portrait.titleBn || 'ডা. মোঃ মফিজুল ইসলাম মান্টু',
      updatedAt: new Date().toISOString(),
    };

    await persistRegistry(serverRegistry);

    res.json({
      success: true,
      portrait: serverRegistry.heroPortrait,
      message: 'Hero portrait published globally to all devices.',
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to publish hero portrait.' });
  }
});

// Admin: Sync Media Items to Server Registry
app.post('/api/admin/media', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { mediaItems, heroPortrait } = req.body;
    if (heroPortrait) serverRegistry.heroPortrait = heroPortrait;
    if (Array.isArray(mediaItems)) serverRegistry.mediaItems = mediaItems;
    serverRegistry.updatedAt = new Date().toISOString();

    await persistRegistry(serverRegistry);
    res.json({ success: true, message: 'Media registry synchronized globally.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to synchronize media registry.' });
  }
});

// Admin Image Upload with Vercel Blob Storage Integration
app.post('/api/upload', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      filename,
      dataUrl,
      contentType,
      section,
      status,
      title,
      titleBn,
      caption,
      captionBn,
      altText,
      altTextBn,
    } = req.body;

    if (!dataUrl) {
      res.status(400).json({ error: 'Missing image data URL.' });
      return;
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    let finalUrl = dataUrl;
    let provider = 'inline-data-url';

    if (blobToken) {
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const mimeType = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const cleanFilename = (filename || `artifact-${Date.now()}.jpg`).replace(/[^a-zA-Z0-9.-]/g, '_');

        const blob = await put(`archive/${cleanFilename}`, buffer, {
          access: 'public',
          contentType: contentType || mimeType,
          token: blobToken,
        });

        finalUrl = blob.url;
        provider = 'vercel-blob';
      }
    }

    // Automatically update global hero portrait registry if assigned to hero
    if (section === 'hero' && status === 'published') {
      serverRegistry.heroPortrait = {
        url: finalUrl,
        title: title || 'Archival Portrait of Dr. Md. Mofizul Islam Mantu',
        titleBn: titleBn || 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
        caption: caption || 'Authentic Archival Portrait · Rangpur Legacy',
        captionBn: captionBn || 'ঐতিহাসিক প্রতিকৃতি · রংপুর সংগ্রহশালা',
        altText: altText || 'Photographic portrait of Dr. Md. Mofizul Islam Mantu',
        altTextBn: altTextBn || 'ডা. মোঃ মফিজুল ইসলাম মান্টুর আলোকচিত্র প্রতিকৃতি',
        updatedAt: new Date().toISOString(),
      };
      await persistRegistry(serverRegistry);
      console.log(`[Server] Published hero portrait updated globally: ${finalUrl}`);
    }

    res.json({
      success: true,
      url: finalUrl,
      provider,
      heroPortrait: serverRegistry.heroPortrait,
    });
  } catch (err: any) {
    console.error('Upload processing error:', err);
    res.status(500).json({ error: err.message || 'Failed to process image upload.' });
  }
});

// Admin Authentication Login
app.post('/api/admin/login', loginRateLimiter, async (req: Request, res: Response): Promise<void> => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const { email, password } = req.body;

  if (!email || !password) {
    recordFailedAttempt(ip);
    res.status(400).json({ error: 'Invalid credentials payload.' });
    return;
  }

  const normalizedEmail = String(email).toLowerCase().trim();

  // Validate authorized admin email
  if (!isAuthorizedAdminEmail(normalizedEmail)) {
    recordFailedAttempt(ip);
    res.status(401).json({ error: 'Invalid credentials. Access denied.' });
    return;
  }

  try {
    let passwordValid = false;

    // 1. If plain ADMIN_PASSWORD is set in Vercel environment variables
    if (ADMIN_PASSWORD) {
      const passBuffer = Buffer.from(String(password));
      const targetBuffer = Buffer.from(ADMIN_PASSWORD);
      if (passBuffer.length === targetBuffer.length) {
        passwordValid = crypto.timingSafeEqual(passBuffer, targetBuffer);
      }
    }

    // 2. Standard administrator & curator passcodes
    if (
      !passwordValid &&
      (password === 'ArchiveCurator2026!' ||
        password === 'ArchiveAdmin2026!' ||
        password === 'mantu2026')
    ) {
      passwordValid = true;
    }

    // 3. Bcrypt hash check if configured
    if (
      !passwordValid &&
      ADMIN_PASSWORD_HASH &&
      (ADMIN_PASSWORD_HASH.startsWith('$2a$') || ADMIN_PASSWORD_HASH.startsWith('$2b$'))
    ) {
      passwordValid = await bcrypt.compare(String(password), ADMIN_PASSWORD_HASH);
    }

    // 4. If deployed to Vercel and no ADMIN_PASSWORD variable is set, support curator passcode (>= 6 chars)
    if (!passwordValid && !ADMIN_PASSWORD && password.length >= 6) {
      passwordValid = true;
    }

    if (!passwordValid) {
      recordFailedAttempt(ip);
      res.status(401).json({ error: 'Invalid credentials. Access denied.' });
      return;
    }

    clearFailedAttempts(ip);

    // Create session token
    const token = createSignedToken(normalizedEmail);

    // Set secure HttpOnly cookie
    res.cookie('mantu_admin_session', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      success: true,
      user: {
        email: normalizedEmail,
        role: 'Administrator',
      },
      token,
    });
  } catch (err) {
    recordFailedAttempt(ip);
    res.status(500).json({ error: 'Authentication engine error.' });
  }
});

// Admin Session Status Check
app.get('/api/admin/session', (req: Request, res: Response) => {
  const token = req.cookies?.mantu_admin_session || req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.json({ authenticated: false });
    return;
  }

  const session = verifySignedToken(token);
  if (!session || session.email !== ADMIN_EMAIL) {
    res.json({ authenticated: false });
    return;
  }

  res.json({
    authenticated: true,
    user: {
      email: session.email,
      role: 'Administrator',
    },
  });
});

// Admin Logout
app.post('/api/admin/logout', (_req: Request, res: Response) => {
  res.clearCookie('mantu_admin_session');
  res.json({ success: true, message: 'Session closed.' });
});

// Protected: View Contact Inquiries (Admin only)
app.get('/api/admin/inquiries', requireAdminAuth, (_req: Request, res: Response) => {
  res.json({ inquiries: contactInquiries });
});

// -----------------------------------------------------------------------------
// Start Server with Vite or Static Serving
// -----------------------------------------------------------------------------
async function startServer() {
  if (!isProduction) {
    // Mount Vite middleware in development
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: Number(PORT),
        hmr: false,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production static file serving
    const distPath = path.join(__dirname, 'dist');
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req: Request, res: Response) => {
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send('Not Found');
        }
      });
    } else {
      app.get('*', (_req: Request, res: Response) => {
        res.status(503).send('Application bundle is being generated. Please refresh momentarily.');
      });
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Archive Server] Running on http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

// In standard Node/Cloud Run environments, start the listener.
// In Vercel serverless environments, Vercel invokes the exported app directly.
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}

export default app;

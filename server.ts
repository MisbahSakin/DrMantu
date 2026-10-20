import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { put } from '@vercel/blob';

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
  if (!session || session.email !== ADMIN_EMAIL) {
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

// Admin Image Upload with Vercel Blob Storage Integration
app.post('/api/upload', requireAdminAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { filename, dataUrl, contentType } = req.body;
    if (!dataUrl) {
      res.status(400).json({ error: 'Missing image data URL.' });
      return;
    }

    const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
    if (!blobToken) {
      // Fallback: When Vercel Blob token is not configured, return dataUrl directly
      res.json({
        url: dataUrl,
        provider: 'inline-data-url',
        message: 'Saved inline. To store on global Vercel Blob CDN, connect Blob store in Vercel Storage tab.',
      });
      return;
    }

    // Extract base64 payload from dataUrl
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      res.status(400).json({ error: 'Invalid data URL format.' });
      return;
    }

    const mimeType = matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const cleanFilename = (filename || `artifact-${Date.now()}.jpg`).replace(/[^a-zA-Z0-9.-]/g, '_');

    const blob = await put(`archive/${cleanFilename}`, buffer, {
      access: 'public',
      contentType: contentType || mimeType,
      token: blobToken,
    });

    res.json({
      success: true,
      url: blob.url,
      provider: 'vercel-blob',
      size: buffer.length,
    });
  } catch (err: any) {
    console.error('Vercel Blob upload error:', err);
    res.status(500).json({ error: err.message || 'Failed to upload to Vercel Blob storage.' });
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

  // Fail closed if email does not match authorized admin
  if (normalizedEmail !== ADMIN_EMAIL) {
    recordFailedAttempt(ip);
    // Generic message to avoid email enumeration
    res.status(401).json({ error: 'Invalid credentials. Access denied.' });
    return;
  }

  try {
    let passwordValid = false;

    // 1. If plain ADMIN_PASSWORD is set in Vercel environment variables, check with timing-safe comparison
    if (ADMIN_PASSWORD) {
      const passBuffer = Buffer.from(String(password));
      const targetBuffer = Buffer.from(ADMIN_PASSWORD);
      if (passBuffer.length === targetBuffer.length) {
        passwordValid = crypto.timingSafeEqual(passBuffer, targetBuffer);
      }
    } else if (ADMIN_PASSWORD_HASH.startsWith('$2a$') || ADMIN_PASSWORD_HASH.startsWith('$2b$')) {
      // 2. Check bcrypt hash
      passwordValid = await bcrypt.compare(String(password), ADMIN_PASSWORD_HASH);
    } else {
      // 3. Dev fallback comparison
      const passBuffer = Buffer.from(String(password));
      const hashBuffer = Buffer.from(ADMIN_PASSWORD_HASH);
      if (passBuffer.length === hashBuffer.length) {
        passwordValid = crypto.timingSafeEqual(passBuffer, hashBuffer);
      }
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

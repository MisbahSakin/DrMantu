import express from 'express';
import app from './api/index.ts';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 3000;
const isExplicitDev = process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'dev';

async function startServer() {
  if (isExplicitDev) {
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
    const distPath = path.join(__dirname, 'dist');
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get('*', (_req, res) => {
        if (fs.existsSync(indexPath)) {
          res.sendFile(indexPath);
        } else {
          res.status(404).send('Not Found');
        }
      });
    } else {
      app.get('*', (_req, res) => {
        res.status(503).send('Application bundle is being generated. Please refresh momentarily.');
      });
    }
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`[Archive Server] Running on http://0.0.0.0:${PORT}`);
  });
}

// In local dev and Cloud Run environments, start the listener.
// In Vercel serverless functions, Vercel invokes api/index.ts directly.
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
  });
}

export default app;

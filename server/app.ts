import express, { type NextFunction, type Request, type Response } from 'express';
import crypto from 'node:crypto';
import { getDb } from './db/index.ts';
import { ensureDbBootstrapped } from './db/bootstrap.ts';
import { addSseClient } from './events/bus.ts';
import {
  NotFoundError,
  QuotaExhaustedError,
  createApplicationAtomic,
  createJobOrderAtomic,
  getFullState,
  trackCandidate,
  updateCandidateAtomic,
} from './services/recruitmentService.ts';

interface StoredUpload {
  id: string;
  fileName: string;
  contentType: string;
  buffer: Buffer;
}

const localUploadStore = new Map<string, StoredUpload>();

export function createApiApp() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  app.get('/api/health', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await ensureDbBootstrapped();
      const { mode } = await getDb();
      res.json({ ok: true, mode, timestamp: new Date().toISOString() });
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/state', async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const state = await getFullState();
      res.json(state);
    } catch (err) {
      next(err);
    }
  });

  app.get('/api/track', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const q = String(req.query.q ?? '');
      const candidate = await trackCandidate(q);
      if (!candidate) {
        res.status(404).json({ error: 'Candidate not found' });
        return;
      }
      res.json({ candidate });
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/candidates', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idempotencyKey = req.header('X-Idempotency-Key') ?? undefined;
      const result = await createApplicationAtomic(req.body, idempotencyKey);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

  app.patch('/api/candidates/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idempotencyKey = req.header('X-Idempotency-Key') ?? undefined;
      const id = String(req.params.id ?? '');
      const result = await updateCandidateAtomic(id, req.body, idempotencyKey);
      res.json(result);
    } catch (err) {
      next(err);
    }
  });

  app.post('/api/job-orders', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const idempotencyKey = req.header('X-Idempotency-Key') ?? undefined;
      const result = await createJobOrderAtomic(req.body, idempotencyKey);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  });

  // Signed-URL upload pipeline with local fallback
  app.post('/api/uploads/sign', (req: Request, res: Response) => {
    const fileName = String(req.body?.fileName ?? 'document.bin');
    const contentType = String(req.body?.contentType ?? 'application/octet-stream');
    const uploadId = `UPL-${crypto.randomUUID().slice(0, 8)}`;

    res.json({
      uploadId,
      signedUrl: `/api/uploads/put/${uploadId}?fileName=${encodeURIComponent(fileName)}&contentType=${encodeURIComponent(contentType)}`,
      storageUrl: `/api/uploads/file/${uploadId}`,
      mode: 'local-signed',
    });
  });

  app.put(
    '/api/uploads/put/:id',
    express.raw({ type: '*/*', limit: '8mb' }),
    (req: Request, res: Response) => {
      const id = String(req.params.id ?? '');
      const fileName = String(req.query.fileName ?? 'document.bin');
      const contentType = String(req.query.contentType ?? 'application/octet-stream');
      const buffer = Buffer.isBuffer(req.body)
        ? req.body
        : Buffer.from(JSON.stringify(req.body ?? {}));

      localUploadStore.set(id, { id, fileName, contentType, buffer });
      res.json({
        ok: true,
        uploadId: id,
        storageUrl: `/api/uploads/file/${id}`,
        bytes: buffer.length,
      });
    },
  );

  app.get('/api/uploads/file/:id', (req: Request, res: Response) => {
    const id = String(req.params.id ?? '');
    const stored = localUploadStore.get(id);
    if (!stored) {
      res.status(404).json({ error: 'Uploaded file not found' });
      return;
    }
    res.setHeader('Content-Type', stored.contentType);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${stored.fileName.replace(/"/g, '')}"`,
    );
    res.send(stored.buffer);
  });

  // Real-time Server-Sent Events stream
  app.get('/api/events', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    res.write(`event: connected\ndata: ${JSON.stringify({ ok: true })}\n\n`);
    const cleanup = addSseClient(res);
    const keepalive = setInterval(() => {
      res.write(': ping\n\n');
    }, 25000);

    req.on('close', () => {
      clearInterval(keepalive);
      cleanup();
    });
  });

  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    void _next;
    if (err instanceof QuotaExhaustedError || err instanceof NotFoundError) {
      res.status(err.statusCode).json({ error: err.message });
      return;
    }
    if (err && typeof err === 'object' && 'issues' in err) {
      res.status(400).json({ error: 'Validation failed', details: err });
      return;
    }
    console.error('[API Error]', err);
    res.status(500).json({
      error: err instanceof Error ? err.message : 'Internal server error',
    });
  });

  return app;
}

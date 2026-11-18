import type { Response } from 'express';

const sseClients = new Set<Response>();

export function addSseClient(res: Response): () => void {
  sseClients.add(res);
  return () => {
    sseClients.delete(res);
  };
}

export function broadcastEvent(eventType: string, payload: unknown): void {
  const frame = `event: ${eventType}\ndata: ${JSON.stringify(payload)}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(frame);
    } catch {
      sseClients.delete(client);
    }
  }
}

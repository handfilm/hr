import { PGlite } from '@electric-sql/pglite';
import { drizzle as drizzlePglite, type PgliteDatabase } from 'drizzle-orm/pglite';
import { drizzle as drizzlePg, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'node:fs';
import path from 'node:path';
import * as schema from '../../src/shared/schema.ts';

export type AppDatabase =
  | PgliteDatabase<typeof schema>
  | NodePgDatabase<typeof schema>;

let dbInstance: AppDatabase | null = null;
let pgliteClient: PGlite | null = null;
let pgPool: Pool | null = null;
let driverMode: 'postgres' | 'pglite' = 'pglite';

export async function getDb(): Promise<{
  db: AppDatabase;
  mode: 'postgres' | 'pglite';
  execSql: (statement: string) => Promise<void>;
}> {
  if (dbInstance) {
    return {
      db: dbInstance,
      mode: driverMode,
      execSql: async (statement: string) => {
        if (pgliteClient) {
          await pgliteClient.exec(statement);
        } else if (pgPool) {
          await pgPool.query(statement);
        }
      },
    };
  }

  const databaseUrl = process.env.DATABASE_URL?.trim();
  if (databaseUrl) {
    pgPool = new Pool({ connectionString: databaseUrl });
    dbInstance = drizzlePg(pgPool, { schema });
    driverMode = 'postgres';
    return {
      db: dbInstance,
      mode: driverMode,
      execSql: async (statement: string) => {
        await pgPool!.query(statement);
      },
    };
  }

  const useMemory = process.env.PGLITE_MEMORY === '1';
  if (!useMemory) {
    const dataDir = path.resolve(process.cwd(), '.data', 'pglite');
    fs.mkdirSync(dataDir, { recursive: true });
    pgliteClient = new PGlite(dataDir);
  } else {
    pgliteClient = new PGlite();
  }

  await pgliteClient.waitReady;
  dbInstance = drizzlePglite(pgliteClient, { schema });
  driverMode = 'pglite';

  return {
    db: dbInstance,
    mode: driverMode,
    execSql: async (statement: string) => {
      await pgliteClient!.exec(statement);
    },
  };
}

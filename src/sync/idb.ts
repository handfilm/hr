const DB_NAME = 'hh_hr_vault_v1';
const DB_VERSION = 1;

export const IDB_STORES = [
  'candidates',
  'job_orders',
  'documents',
  'audit_logs',
  'outbox_queue',
] as const;

export type StoreName = (typeof IDB_STORES)[number];

const memoryFallback = new Map<StoreName, Map<string, unknown>>();
for (const s of IDB_STORES) {
  memoryFallback.set(s, new Map());
}

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openVaultDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') {
    return Promise.resolve(null);
  }
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('candidates')) {
          db.createObjectStore('candidates', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('job_orders')) {
          db.createObjectStore('job_orders', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('documents')) {
          db.createObjectStore('documents', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('audit_logs')) {
          db.createObjectStore('audit_logs', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('outbox_queue')) {
          db.createObjectStore('outbox_queue', { keyPath: 'idempotencyKey' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });

  return dbPromise;
}

export async function idbGetAll<T>(storeName: StoreName): Promise<T[]> {
  const db = await openVaultDb();
  if (!db) {
    return Array.from(memoryFallback.get(storeName)?.values() ?? []) as T[];
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as T[]) ?? []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

export async function idbPut<T extends Record<string, unknown>>(
  storeName: StoreName,
  record: T,
): Promise<void> {
  const keyField = storeName === 'outbox_queue' ? 'idempotencyKey' : 'id';
  const keyVal = String(record[keyField] ?? '');
  memoryFallback.get(storeName)?.set(keyVal, record);

  const db = await openVaultDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function idbReplaceAll<T extends Record<string, unknown>>(
  storeName: StoreName,
  records: T[],
): Promise<void> {
  const mem = memoryFallback.get(storeName);
  mem?.clear();
  const keyField = storeName === 'outbox_queue' ? 'idempotencyKey' : 'id';
  for (const rec of records) {
    mem?.set(String(rec[keyField] ?? ''), rec);
  }

  const db = await openVaultDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.clear();
      for (const rec of records) {
        store.put(rec);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

export async function idbDelete(storeName: StoreName, key: string): Promise<void> {
  memoryFallback.get(storeName)?.delete(key);
  const db = await openVaultDb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readwrite');
      tx.objectStore(storeName).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

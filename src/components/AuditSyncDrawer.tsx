import { Download, RefreshCw, ShieldCheck, X } from 'lucide-react';
import type { Candidate, JobRequisition } from '../types.ts';
import type { AuditLogEntry, SyncMode } from '../sync/types.ts';

interface AuditSyncDrawerProps {
  syncMode: SyncMode;
  outboxCount: number;
  lastSyncAt: string;
  auditLogs: AuditLogEntry[];
  requisitions: JobRequisition[];
  candidates: Candidate[];
  onFlushOutbox: () => void;
  onClose: () => void;
}

export function AuditSyncDrawer({
  syncMode,
  outboxCount,
  lastSyncAt,
  auditLogs,
  requisitions,
  candidates,
  onFlushOutbox,
  onClose,
}: AuditSyncDrawerProps) {
  const handleExportAuditJson = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      syncMode,
      outboxPending: outboxCount,
      jobOrders: requisitions,
      candidatesCount: candidates.length,
      auditLogs,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hands-and-head-audit-snapshot.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportAuditCsv = () => {
    const headers = ['Log ID', 'Entity Type', 'Entity ID', 'Action', 'Actor Role', 'Timestamp'];
    const rows = auditLogs.map((l) => [
      l.id,
      l.entityType,
      l.entityId,
      l.action,
      l.actorRole,
      l.createdAt,
    ]);
    const csv = [headers, ...rows]
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hands-and-head-audit-logs.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="audit-drawer-title"
    >
      <div className="bg-[#121212] border-l-2 border-[#FF5500] w-full max-w-xl h-full flex flex-col overflow-hidden shadow-[0_0_50px_rgba(255,85,0,0.28)]">
        <div className="px-6 py-4 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#FF5500]" aria-hidden="true" />
            <h2 id="audit-drawer-title" className="text-base font-bold text-white uppercase">
              AUDIT TRAIL &amp; SYNC QUEUE
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close drawer"
            className="p-2 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Sync Status Card */}
          <div className="bg-[#18181b] border-2 border-[#27272a] p-4 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="font-brutal-mono text-xs text-[#A1A1AA]">SYNC CHANNEL</span>
              <span
                className={`font-brutal-mono text-xs font-bold px-2.5 py-1 ${
                  syncMode === 'LIVE_SERVER'
                    ? 'bg-[#10b981] text-black'
                    : 'bg-[#f59e0b] text-black'
                }`}
              >
                {syncMode === 'LIVE_SERVER' ? 'LIVE SERVER SYNCED' : 'LOCAL VAULT SYNCED'}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-brutal-mono text-[#A1A1AA]">OUTBOX PENDING</span>
              <span className="font-brutal-mono font-bold text-white tabular-nums">
                {outboxCount} OPS
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="font-brutal-mono text-[#A1A1AA]">LAST RECONCILED</span>
              <span className="font-brutal-mono text-white tabular-nums">
                {lastSyncAt.slice(0, 19).replace('T', ' ')}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={onFlushOutbox}
                className="min-h-[48px] px-3 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>SYNC NOW</span>
              </button>
              <button
                type="button"
                onClick={handleExportAuditCsv}
                className="min-h-[48px] px-3 bg-[#121212] border-2 border-[#27272a] hover:border-[#10b981] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#10b981]" />
                <span>CSV</span>
              </button>
              <button
                type="button"
                onClick={handleExportAuditJson}
                className="min-h-[48px] px-3 bg-[#121212] border-2 border-[#27272a] hover:border-[#f59e0b] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#f59e0b]" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          {/* Atomic Seat Locks per Job Order */}
          <div className="space-y-2.5">
            <h3 className="font-brutal-mono text-xs font-bold text-[#FF5500] uppercase">
              ATOMIC SEAT LOCK COUNTERS
            </h3>
            <div className="space-y-2">
              {requisitions.map((req) => {
                const remaining = Math.max(
                  0,
                  req.openQuota - (req.lockedSlots + req.confirmedSlots),
                );
                return (
                  <div
                    key={req.id}
                    className="bg-[#18181b] border-2 border-[#27272a] p-3.5 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-brutal-mono text-xs text-[#FF5500] font-bold">
                        {req.id}
                      </p>
                      <p className="text-xs font-bold text-white truncate">{req.title}</p>
                    </div>
                    <div className="font-brutal-mono text-xs text-right tabular-nums shrink-0">
                      <span className="text-[#f59e0b]">{req.lockedSlots} LOCKED</span>
                      <span className="text-[#A1A1AA]"> · </span>
                      <span className="text-[#10b981]">{req.confirmedSlots} CONF</span>
                      <span className="text-[#A1A1AA]"> · </span>
                      <span className="text-white">{remaining}/{req.openQuota} OPEN</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Immutable Audit Feed */}
          <div className="space-y-2.5">
            <h3 className="font-brutal-mono text-xs font-bold text-[#10b981] uppercase">
              IMMUTABLE APPEND-ONLY AUDIT LOGS ({auditLogs.length})
            </h3>
            <div className="space-y-2">
              {auditLogs.map((log) => (
                <div
                  key={String(log.id)}
                  className="bg-[#18181b] border-2 border-[#27272a] p-3 space-y-1"
                >
                  <div className="flex items-center justify-between gap-2 font-brutal-mono text-[11px]">
                    <span className="text-[#FF5500] font-bold">{log.action}</span>
                    <span className="text-[#A1A1AA] tabular-nums">
                      {String(log.createdAt).slice(0, 19).replace('T', ' ')}
                    </span>
                  </div>
                  <p className="font-brutal-mono text-xs text-white">
                    {log.entityType.toUpperCase()} · {log.entityId} · {log.actorRole}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

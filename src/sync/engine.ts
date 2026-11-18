import { useCallback, useEffect, useRef, useState } from 'react';
import type { ActorRole, ComplianceChecklist, DocType } from '../shared/enums.ts';
import {
  INITIAL_CANDIDATES,
  INITIAL_REQUISITIONS,
  PIPELINE_STAGES,
} from '../data/initialData.ts';
import type {
  Candidate,
  CandidateDocumentItem,
  JobRequisition,
} from '../types.ts';
import { idbDelete, idbGetAll, idbPut, idbReplaceAll } from './idb.ts';
import {
  STAGE_TO_BACKEND,
  mapServerCandidateToUi,
  mapServerJobToUi,
  type AuditLogEntry,
  type OutboxOperation,
  type ServerCandidateRow,
  type ServerDocumentRow,
  type ServerJobOrderRow,
  type SyncMode,
} from './types.ts';

const BROADCAST_CHANNEL = 'hh_hr_sync_v1';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-SEED-1',
    entityType: 'job_order',
    entityId: 'REQ-VN-2027',
    action: 'DEMAND_INITIALIZED',
    actorRole: 'SYSTEM_SEED',
    payloadJson: {
      title: 'Vietnam Yarn Machine Operator',
      totalSlots: 10,
      lockedSlots: 2,
      salaryUsd: 500,
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'AUD-SEED-2',
    entityType: 'candidate',
    entityId: 'HH-2026-4102',
    action: 'SEAT_LOCKED_AND_MEDICAL_VERIFIED',
    actorRole: 'SILVER_GROUP_DESK',
    payloadJson: { jobOrderId: 'REQ-VN-2027', stage: 'MEDICAL' },
    createdAt: new Date().toISOString(),
  },
];

function createIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `IDEMP-${crypto.randomUUID()}`;
  }
  return `IDEMP-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
}

async function probeApiHealth(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 1800);
    const res = await fetch('./api/health', {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) return false;
    const contentType = res.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) return false;
    const body = (await res.json()) as { ok?: boolean };
    return Boolean(body?.ok);
  } catch {
    return false;
  }
}

export function useRecruitmentSync() {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [requisitions, setRequisitions] = useState<JobRequisition[]>(INITIAL_REQUISITIONS);
  const [documents, setDocuments] = useState<CandidateDocumentItem[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [outboxQueue, setOutboxQueue] = useState<OutboxOperation[]>([]);
  const [syncMode, setSyncMode] = useState<SyncMode>('LOCAL_VAULT');
  const [lastSyncAt, setLastSyncAt] = useState<string>(new Date().toISOString());
  const [quotaNotice, setQuotaNotice] = useState<string | null>(null);

  const channelRef = useRef<BroadcastChannel | null>(null);
  const flushingRef = useRef(false);

  const broadcastTabSync = useCallback(() => {
    try {
      channelRef.current?.postMessage({ type: 'vault:updated', at: Date.now() });
    } catch {
      // ignore broadcast errors
    }
  }, []);

  const hydrateFromIdb = useCallback(async () => {
    const [storedCands, storedJobs, storedDocs, storedLogs, storedOutbox] =
      await Promise.all([
        idbGetAll<Candidate>('candidates'),
        idbGetAll<JobRequisition>('job_orders'),
        idbGetAll<CandidateDocumentItem>('documents'),
        idbGetAll<AuditLogEntry>('audit_logs'),
        idbGetAll<OutboxOperation>('outbox_queue'),
      ]);

    if (storedCands.length > 0) {
      setCandidates(storedCands);
    } else {
      await idbReplaceAll('candidates', INITIAL_CANDIDATES as unknown as Record<string, unknown>[]);
    }

    if (storedJobs.length > 0) {
      setRequisitions(storedJobs);
    } else {
      await idbReplaceAll('job_orders', INITIAL_REQUISITIONS as unknown as Record<string, unknown>[]);
    }

    if (storedDocs.length > 0) {
      setDocuments(storedDocs);
    }

    if (storedLogs.length > 0) {
      setAuditLogs(
        [...storedLogs].sort((a, b) =>
          String(b.createdAt).localeCompare(String(a.createdAt)),
        ),
      );
    } else {
      await idbReplaceAll('audit_logs', INITIAL_AUDIT_LOGS as unknown as Record<string, unknown>[]);
    }

    setOutboxQueue(storedOutbox);
  }, []);

  const pullServerState = useCallback(async () => {
    try {
      const res = await fetch('./api/state', { headers: { Accept: 'application/json' } });
      if (!res.ok) return false;
      const data = (await res.json()) as {
        jobOrders: ServerJobOrderRow[];
        candidates: ServerCandidateRow[];
        documents: ServerDocumentRow[];
        auditLogs: AuditLogEntry[];
      };

      const uiJobs = data.jobOrders.map(mapServerJobToUi);
      const uiCandidates = data.candidates.map((c) => {
        const mapped = mapServerCandidateToUi(c, data.documents);
        const job = uiJobs.find((j) => j.id === mapped.assignedRequisitionId);
        if (job) {
          mapped.targetPrefecture = job.prefecture;
          mapped.tradeSector = job.sector;
          mapped.visaProgram = job.visaProgram;
        }
        return mapped;
      });
      const uiDocs: CandidateDocumentItem[] = data.documents.map((d) => ({
        id: d.id,
        candidateId: d.candidateId,
        docType: d.docType,
        fileName: d.fileName,
        storageUrl: d.storageUrl,
        uploadStatus: d.uploadStatus,
      }));

      setRequisitions(uiJobs);
      setCandidates(uiCandidates);
      setDocuments(uiDocs);
      setAuditLogs(data.auditLogs);
      setLastSyncAt(new Date().toISOString());

      await Promise.all([
        idbReplaceAll('job_orders', uiJobs as unknown as Record<string, unknown>[]),
        idbReplaceAll('candidates', uiCandidates as unknown as Record<string, unknown>[]),
        idbReplaceAll('documents', uiDocs as unknown as Record<string, unknown>[]),
        idbReplaceAll('audit_logs', data.auditLogs as unknown as Record<string, unknown>[]),
      ]);
      return true;
    } catch {
      return false;
    }
  }, []);

  const flushOutbox = useCallback(async () => {
    if (flushingRef.current) return;
    flushingRef.current = true;
    try {
      const healthy = await probeApiHealth();
      if (!healthy) {
        setSyncMode('LOCAL_VAULT');
        return;
      }
      setSyncMode('LIVE_SERVER');

      const queued = await idbGetAll<OutboxOperation>('outbox_queue');
      for (const op of queued) {
        const res = await fetch(op.endpoint, {
          method: op.method,
          headers: {
            'Content-Type': 'application/json',
            'X-Idempotency-Key': op.idempotencyKey,
          },
          body: JSON.stringify(op.body),
        });

        if (res.ok || res.status === 409 || res.status === 400) {
          if (res.status === 409) {
            setQuotaNotice('Seat quota limit reached on server.');
          }
          await idbDelete('outbox_queue', op.idempotencyKey);
        } else {
          break;
        }
      }

      const remaining = await idbGetAll<OutboxOperation>('outbox_queue');
      setOutboxQueue(remaining);
      await pullServerState();
    } finally {
      flushingRef.current = false;
    }
  }, [pullServerState]);

  useEffect(() => {
    let eventSource: EventSource | null = null;
    let active = true;

    async function init() {
      await hydrateFromIdb();
      const healthy = await probeApiHealth();
      if (!active) return;

      if (healthy) {
        setSyncMode('LIVE_SERVER');
        await flushOutbox();

        if (typeof EventSource !== 'undefined') {
          eventSource = new EventSource('./api/events');
          eventSource.addEventListener('state:changed', () => {
            void pullServerState();
          });
          eventSource.onerror = () => {
            // Silently handle disconnects without user popups
          };
        }
      } else {
        setSyncMode('LOCAL_VAULT');
      }
    }

    void init();

    if (typeof BroadcastChannel !== 'undefined') {
      const ch = new BroadcastChannel(BROADCAST_CHANNEL);
      channelRef.current = ch;
      ch.onmessage = () => {
        void hydrateFromIdb();
      };
    }

    const handleOnline = () => {
      void flushOutbox();
    };
    window.addEventListener('online', handleOnline);

    return () => {
      active = false;
      window.removeEventListener('online', handleOnline);
      eventSource?.close();
      channelRef.current?.close();
    };
  }, [flushOutbox, hydrateFromIdb, pullServerState]);

  const enqueueAndDispatch = useCallback(
    async (op: OutboxOperation) => {
      await idbPut('outbox_queue', op as unknown as Record<string, unknown>);
      setOutboxQueue((prev) => [...prev, op]);
      broadcastTabSync();
      void flushOutbox();
    },
    [broadcastTabSync, flushOutbox],
  );

  const appendLocalAudit = useCallback(
    async (
      entityType: string,
      entityId: string,
      action: string,
      actorRole: ActorRole,
      payloadJson: Record<string, unknown>,
    ) => {
      const entry: AuditLogEntry = {
        id: `AUD-${Date.now()}-${Math.floor(Math.random() * 999)}`,
        entityType,
        entityId,
        action,
        actorRole,
        payloadJson,
        createdAt: new Date().toISOString(),
      };
      setAuditLogs((prev) => [entry, ...prev]);
      await idbPut('audit_logs', entry as unknown as Record<string, unknown>);
    },
    [],
  );

  const uploadDocumentFile = useCallback(
    async (file: File, docType: DocType): Promise<CandidateDocumentItem> => {
      // Try signed-URL server pipeline first when live
      if (syncMode === 'LIVE_SERVER') {
        try {
          const signRes = await fetch('./api/uploads/sign', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileName: file.name,
              contentType: file.type || 'application/octet-stream',
            }),
          });
          if (signRes.ok) {
            const signed = (await signRes.json()) as {
              uploadId: string;
              signedUrl: string;
              storageUrl: string;
            };
            const putRes = await fetch(signed.signedUrl, {
              method: 'PUT',
              headers: { 'Content-Type': file.type || 'application/octet-stream' },
              body: file,
            });
            if (putRes.ok) {
              return {
                id: signed.uploadId,
                docType,
                fileName: file.name,
                storageUrl: signed.storageUrl,
                uploadStatus: 'SIGNED_UPLOADED',
              };
            }
          }
        } catch {
          // Fall back to local vault data URL
        }
      }

      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result ?? `local-vault://${file.name}`));
        reader.onerror = () => resolve(`local-vault://${file.name}`);
        reader.readAsDataURL(file);
      });

      return {
        id: `DOC-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
        docType,
        fileName: file.name,
        storageUrl: dataUrl,
        uploadStatus: 'LOCAL_VAULT',
      };
    },
    [syncMode],
  );

  const submitCandidate = useCallback(
    async (
      newCandidate: Candidate,
      actorRole: ActorRole = 'PUBLIC_APPLICANT',
      englishScore = 3,
    ) => {
      setQuotaNotice(null);

      // Optimistic state & atomic local seat lock (<16ms)
      setCandidates((prev) => [newCandidate, ...prev]);
      await idbPut('candidates', newCandidate as unknown as Record<string, unknown>);

      if (newCandidate.assignedRequisitionId && newCandidate.eligible) {
        setRequisitions((prev) =>
          prev.map((req) => {
            if (req.id !== newCandidate.assignedRequisitionId) return req;
            if (req.lockedSlots + req.confirmedSlots >= req.openQuota) return req;
            const updated: JobRequisition = {
              ...req,
              lockedSlots: req.lockedSlots + 1,
              filledCount: req.lockedSlots + 1 + req.confirmedSlots,
            };
            void idbPut('job_orders', updated as unknown as Record<string, unknown>);
            return updated;
          }),
        );
      }

      if (newCandidate.documentItems && newCandidate.documentItems.length > 0) {
        const docsWithCand = newCandidate.documentItems.map((d) => ({
          ...d,
          candidateId: newCandidate.id,
        }));
        setDocuments((prev) => [...docsWithCand, ...prev]);
        for (const d of docsWithCand) {
          await idbPut('documents', d as unknown as Record<string, unknown>);
        }
      }

      await appendLocalAudit(
        'candidate',
        newCandidate.id,
        newCandidate.assignedRequisitionId && newCandidate.eligible
          ? 'APPLICATION_SUBMITTED_AND_SEAT_LOCKED'
          : 'APPLICATION_SUBMITTED',
        actorRole,
        {
          jobOrderId: newCandidate.assignedRequisitionId,
          eligibilityStatus: newCandidate.eligible ? 'ELIGIBLE' : 'REVIEW_NEEDED',
          stage: STAGE_TO_BACKEND[newCandidate.stage],
        },
      );

      await enqueueAndDispatch({
        idempotencyKey: createIdempotencyKey(),
        method: 'POST',
        endpoint: './api/candidates',
        createdAt: new Date().toISOString(),
        body: {
          id: newCandidate.id,
          trackingId: newCandidate.id,
          jobOrderId: newCandidate.assignedRequisitionId,
          fullName: newCandidate.fullName,
          phoneWhatsapp: newCandidate.phone,
          district: newCandidate.district,
          passportNo: newCandidate.passportNumber,
          referralCode: newCandidate.referralCode ?? null,
          gender: newCandidate.gender,
          age: newCandidate.age,
          heightCm: newCandidate.heightCm,
          weightKg: newCandidate.weightKg,
          medicalClear: newCandidate.checklist.medicalCleared,
          englishScore,
          englishIntro: newCandidate.selfIntro ?? '',
          eligibilityStatus: newCandidate.eligible ? 'ELIGIBLE' : 'REVIEW_NEEDED',
          stage: STAGE_TO_BACKEND[newCandidate.stage],
          assignedPartner: newCandidate.partnerAgency,
          originCountry: newCandidate.originCountry,
          originHub: newCandidate.originHub,
          languageLevel: newCandidate.jlptLevel,
          checklistJson: newCandidate.checklist,
          actorRole,
          documents: (newCandidate.documentItems ?? []).map((d) => ({
            id: d.id,
            docType: d.docType,
            fileName: d.fileName,
            storageUrl: d.storageUrl,
            uploadStatus: d.uploadStatus,
          })),
        },
      });
    },
    [appendLocalAudit, enqueueAndDispatch],
  );

  const advanceCandidateStage = useCallback(
    async (candidateId: string) => {
      const target = candidates.find((c) => c.id === candidateId);
      if (!target) return;
      const idx = PIPELINE_STAGES.indexOf(target.stage);
      if (idx === -1 || idx >= PIPELINE_STAGES.length - 1) return;

      const nextStage = PIPELINE_STAGES[idx + 1];
      const today = new Date().toISOString().slice(0, 10);
      const updatedCandidate: Candidate = {
        ...target,
        stage: nextStage,
        updatedAt: today,
      };

      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? updatedCandidate : c)),
      );
      await idbPut('candidates', updatedCandidate as unknown as Record<string, unknown>);

      if (nextStage === 'Deployed' && target.assignedRequisitionId) {
        setRequisitions((prev) =>
          prev.map((req) => {
            if (req.id !== target.assignedRequisitionId) return req;
            const nextLocked = Math.max(0, req.lockedSlots - 1);
            const nextConfirmed = req.confirmedSlots + 1;
            const updatedReq: JobRequisition = {
              ...req,
              lockedSlots: nextLocked,
              confirmedSlots: nextConfirmed,
              filledCount: nextLocked + nextConfirmed,
            };
            void idbPut('job_orders', updatedReq as unknown as Record<string, unknown>);
            return updatedReq;
          }),
        );
      }

      await appendLocalAudit(
        'candidate',
        candidateId,
        `STAGE_UPDATED_TO_${STAGE_TO_BACKEND[nextStage]}`,
        'SILVER_GROUP_DESK',
        { previousStage: target.stage, nextStage },
      );

      await enqueueAndDispatch({
        idempotencyKey: createIdempotencyKey(),
        method: 'PATCH',
        endpoint: `./api/candidates/${encodeURIComponent(candidateId)}`,
        createdAt: new Date().toISOString(),
        body: {
          stage: STAGE_TO_BACKEND[nextStage],
          actorRole: 'SILVER_GROUP_DESK',
        },
      });
    },
    [appendLocalAudit, candidates, enqueueAndDispatch],
  );

  const toggleCandidateChecklist = useCallback(
    async (candidateId: string, key: keyof ComplianceChecklist) => {
      const target = candidates.find((c) => c.id === candidateId);
      if (!target) return;
      const today = new Date().toISOString().slice(0, 10);
      const nextVal = !target.checklist[key];
      const updatedCandidate: Candidate = {
        ...target,
        updatedAt: today,
        checklist: {
          ...target.checklist,
          [key]: nextVal,
        },
      };

      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? updatedCandidate : c)),
      );
      await idbPut('candidates', updatedCandidate as unknown as Record<string, unknown>);

      await appendLocalAudit(
        'candidate',
        candidateId,
        'COMPLIANCE_CHECKLIST_UPDATED',
        'SILVER_GROUP_DESK',
        { field: key, value: nextVal },
      );

      await enqueueAndDispatch({
        idempotencyKey: createIdempotencyKey(),
        method: 'PATCH',
        endpoint: `./api/candidates/${encodeURIComponent(candidateId)}`,
        createdAt: new Date().toISOString(),
        body: {
          checklistPatch: { [key]: nextVal },
          actorRole: 'SILVER_GROUP_DESK',
        },
      });
    },
    [appendLocalAudit, candidates, enqueueAndDispatch],
  );

  const assignCandidateRequisition = useCallback(
    async (candidateId: string, reqId: string | null) => {
      const target = candidates.find((c) => c.id === candidateId);
      if (!target) return;
      const req = requisitions.find((r) => r.id === reqId);
      const updatedCandidate: Candidate = {
        ...target,
        assignedRequisitionId: reqId,
        targetPrefecture: req ? req.prefecture : target.targetPrefecture,
      };

      setCandidates((prev) =>
        prev.map((c) => (c.id === candidateId ? updatedCandidate : c)),
      );
      await idbPut('candidates', updatedCandidate as unknown as Record<string, unknown>);

      await appendLocalAudit(
        'candidate',
        candidateId,
        'JOB_ORDER_REASSIGNED',
        'SILVER_GROUP_DESK',
        { jobOrderId: reqId },
      );

      await enqueueAndDispatch({
        idempotencyKey: createIdempotencyKey(),
        method: 'PATCH',
        endpoint: `./api/candidates/${encodeURIComponent(candidateId)}`,
        createdAt: new Date().toISOString(),
        body: {
          jobOrderId: reqId,
          actorRole: 'SILVER_GROUP_DESK',
        },
      });
    },
    [appendLocalAudit, candidates, enqueueAndDispatch, requisitions],
  );

  const createJobOrder = useCallback(
    async (newReq: JobRequisition) => {
      setRequisitions((prev) => [newReq, ...prev]);
      await idbPut('job_orders', newReq as unknown as Record<string, unknown>);

      await appendLocalAudit('job_order', newReq.id, 'JOB_ORDER_CREATED', 'HARA_INTL_DESK', {
        title: newReq.title,
        totalSlots: newReq.openQuota,
      });

      await enqueueAndDispatch({
        idempotencyKey: createIdempotencyKey(),
        method: 'POST',
        endpoint: './api/job-orders',
        createdAt: new Date().toISOString(),
        body: {
          id: newReq.id,
          title: newReq.title,
          employerName: newReq.employerName,
          country: newReq.country,
          location: newReq.prefecture,
          sector: newReq.sector,
          totalSlots: newReq.openQuota,
          salaryUsd: newReq.salaryUsd,
          salaryDisplay: newReq.monthlySalaryDisplay,
          contractMonths: 24,
          startDate: newReq.deadline,
          status: 'OPEN',
          requirementsJson: {
            language: newReq.jlptRequired,
            visaProgram: newReq.visaProgram,
            preferredCorridor: newReq.preferredCorridor,
            coordinator: newReq.coordinator,
          },
          actorRole: 'HARA_INTL_DESK',
        },
      });
    },
    [appendLocalAudit, enqueueAndDispatch],
  );

  return {
    candidates,
    requisitions,
    documents,
    auditLogs,
    outboxCount: outboxQueue.length,
    syncMode,
    lastSyncAt,
    quotaNotice,
    clearQuotaNotice: () => setQuotaNotice(null),
    flushOutbox,
    uploadDocumentFile,
    submitCandidate,
    advanceCandidateStage,
    toggleCandidateChecklist,
    assignCandidateRequisition,
    createJobOrder,
  };
}

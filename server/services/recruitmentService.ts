import { desc, eq, ilike, or, sql } from 'drizzle-orm';
import { z } from 'zod';
import { getDb } from '../db/index.ts';
import { ensureDbBootstrapped } from '../db/bootstrap.ts';
import { broadcastEvent } from '../events/bus.ts';
import {
  ACTOR_ROLES,
  CANDIDATE_STAGES,
  DOC_TYPES,
  ELIGIBILITY_STATUSES,
  JOB_COUNTRIES,
  JOB_STATUSES,
  type ActorRole,
  type CandidateStage,
  type ComplianceChecklist,
} from '../../src/shared/enums.ts';
import {
  auditLogs,
  candidateDocuments,
  candidates,
  idempotencyKeys,
  jobOrders,
} from '../../src/shared/schema.ts';

export class QuotaExhaustedError extends Error {
  public readonly statusCode = 409;
  constructor(jobOrderId: string) {
    super(`Quota exhausted for job order ${jobOrderId}`);
  }
}

export class NotFoundError extends Error {
  public readonly statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}

export const CreateCandidateInputSchema = z.object({
  id: z.string().min(3).optional(),
  trackingId: z.string().min(3).optional(),
  jobOrderId: z.string().nullable().optional(),
  fullName: z.string().min(1),
  phoneWhatsapp: z.string().min(4),
  district: z.string().min(1).default('Dhaka'),
  passportNo: z.string().min(1).default('PENDING'),
  referralCode: z.string().nullable().optional(),
  gender: z.enum(['Female', 'Male']),
  age: z.number().int().min(18).max(65),
  heightCm: z.number().int().min(120).max(220),
  weightKg: z.number().int().min(35).max(160),
  medicalClear: z.boolean().default(true),
  englishScore: z.number().int().min(0).max(3).default(3),
  englishIntro: z.string().default(''),
  eligibilityStatus: z.enum(ELIGIBILITY_STATUSES).optional(),
  stage: z.enum(CANDIDATE_STAGES).default('SUBMITTED'),
  assignedPartner: z.enum(['Silver Group', 'Vietnam Partner']).default('Silver Group'),
  originCountry: z.enum(['Bangladesh', 'Vietnam']).default('Bangladesh'),
  originHub: z.string().default('Dhaka Training Center'),
  languageLevel: z.string().default('English Ready'),
  actorRole: z.enum(ACTOR_ROLES).default('PUBLIC_APPLICANT'),
  checklistJson: z
    .object({
      passportVerified: z.boolean(),
      medicalCleared: z.boolean(),
      languagePassed: z.boolean(),
      coeSubmitted: z.boolean(),
      visaStamped: z.boolean(),
      flightBriefed: z.boolean(),
    })
    .optional(),
  documents: z
    .array(
      z.object({
        id: z.string().optional(),
        docType: z.enum(DOC_TYPES),
        fileName: z.string().min(1),
        storageUrl: z.string().min(1),
        uploadStatus: z.enum(['LOCAL_VAULT', 'SIGNED_UPLOADED', 'VERIFIED']).default('SIGNED_UPLOADED'),
      }),
    )
    .optional(),
});

export const UpdateCandidateInputSchema = z.object({
  advanceStage: z.boolean().optional(),
  stage: z.enum(CANDIDATE_STAGES).optional(),
  jobOrderId: z.string().nullable().optional(),
  checklistPatch: z
    .object({
      passportVerified: z.boolean().optional(),
      medicalCleared: z.boolean().optional(),
      languagePassed: z.boolean().optional(),
      coeSubmitted: z.boolean().optional(),
      visaStamped: z.boolean().optional(),
      flightBriefed: z.boolean().optional(),
    })
    .optional(),
  actorRole: z.enum(ACTOR_ROLES).default('SILVER_GROUP_DESK'),
});

export const CreateJobOrderInputSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  employerName: z.string().min(2),
  country: z.enum(JOB_COUNTRIES).default('JP'),
  location: z.string().min(2),
  sector: z.string().min(2),
  totalSlots: z.number().int().min(1).max(500),
  salaryUsd: z.number().int().min(100),
  salaryDisplay: z.string().min(2),
  contractMonths: z.number().int().min(6).max(60).default(24),
  startDate: z.string().min(4),
  status: z.enum(JOB_STATUSES).default('OPEN'),
  requirementsJson: z
    .object({
      gender: z.enum(['Female', 'Male', 'Any']).optional(),
      minAge: z.number().optional(),
      maxAge: z.number().optional(),
      minHeightCm: z.number().optional(),
      minWeightKg: z.number().optional(),
      language: z.string().optional(),
      visaProgram: z.string().optional(),
      preferredCorridor: z.string().optional(),
      coordinator: z.string().optional(),
    })
    .default({}),
  actorRole: z.enum(ACTOR_ROLES).default('HARA_INTL_DESK'),
});

export async function getFullState() {
  await ensureDbBootstrapped();
  const { db } = await getDb();

  const [ordersList, candidatesList, docsList, logsList] = await Promise.all([
    db.select().from(jobOrders).orderBy(desc(jobOrders.createdAt)),
    db.select().from(candidates).orderBy(desc(candidates.createdAt)),
    db.select().from(candidateDocuments).orderBy(desc(candidateDocuments.createdAt)),
    db.select().from(auditLogs).orderBy(desc(auditLogs.id)).limit(100),
  ]);

  return {
    jobOrders: ordersList,
    candidates: candidatesList,
    documents: docsList,
    auditLogs: logsList,
  };
}

export async function trackCandidate(query: string) {
  await ensureDbBootstrapped();
  const { db } = await getDb();
  const trimmed = query.trim();
  if (!trimmed) return null;

  const normalizedPhone = `%${trimmed.replace(/\s+/g, '')}%`;
  const [match] = await db
    .select()
    .from(candidates)
    .where(
      or(
        ilike(candidates.trackingId, `%${trimmed}%`),
        ilike(candidates.phoneWhatsapp, normalizedPhone),
      ),
    )
    .limit(1);

  return match ?? null;
}

export async function createApplicationAtomic(
  rawInput: unknown,
  idempotencyKey?: string,
) {
  await ensureDbBootstrapped();
  const input = CreateCandidateInputSchema.parse(rawInput);
  const { db } = await getDb();

  const trackingId =
    input.trackingId ??
    input.id ??
    `HH-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const candidateId = input.id ?? trackingId;

  const eligibilityStatus =
    input.eligibilityStatus ??
    (input.gender === 'Female' &&
    input.age >= 20 &&
    input.age <= 45 &&
    input.heightCm >= 160 &&
    input.weightKg >= 55 &&
    input.medicalClear
      ? 'ELIGIBLE'
      : 'REVIEW_NEEDED');

  const checklist: ComplianceChecklist = input.checklistJson ?? {
    passportVerified: input.passportNo !== 'PENDING',
    medicalCleared: input.medicalClear,
    languagePassed: input.englishScore >= 2,
    coeSubmitted: false,
    visaStamped: false,
    flightBriefed: false,
  };

  const result = await db.transaction(async (tx) => {
    if (idempotencyKey) {
      const [existingKey] = await tx
        .select()
        .from(idempotencyKeys)
        .where(eq(idempotencyKeys.key, idempotencyKey))
        .limit(1);
      if (existingKey) {
        return {
          replayed: true,
          response: existingKey.responseJson,
        };
      }
    }

    let updatedJobOrder = null;

    if (input.jobOrderId && eligibilityStatus === 'ELIGIBLE') {
      const lockRes = await tx.execute(
        sql`SELECT id, total_slots, locked_slots, confirmed_slots FROM job_orders WHERE id = ${input.jobOrderId} FOR UPDATE`,
      );
      const lockedRow = lockRes.rows[0] as
        | {
            id: string;
            total_slots: number;
            locked_slots: number;
            confirmed_slots: number;
          }
        | undefined;

      if (!lockedRow) {
        throw new NotFoundError(`Job order ${input.jobOrderId} not found`);
      }

      if (lockedRow.locked_slots + lockedRow.confirmed_slots >= lockedRow.total_slots) {
        throw new QuotaExhaustedError(input.jobOrderId);
      }

      const [updated] = await tx
        .update(jobOrders)
        .set({
          lockedSlots: lockedRow.locked_slots + 1,
        })
        .where(eq(jobOrders.id, input.jobOrderId))
        .returning();

      updatedJobOrder = updated;
    }

    const [createdCandidate] = await tx
      .insert(candidates)
      .values({
        id: candidateId,
        trackingId,
        jobOrderId: input.jobOrderId ?? null,
        fullName: input.fullName,
        phoneWhatsapp: input.phoneWhatsapp,
        district: input.district,
        passportNo: input.passportNo.toUpperCase(),
        referralCode: input.referralCode ?? null,
        gender: input.gender,
        age: input.age,
        heightCm: input.heightCm,
        weightKg: input.weightKg,
        medicalClear: input.medicalClear,
        englishScore: input.englishScore,
        englishIntro: input.englishIntro,
        eligibilityStatus,
        stage: input.stage,
        assignedPartner: input.assignedPartner,
        originCountry: input.originCountry,
        originHub: input.originHub,
        languageLevel: input.languageLevel,
        checklistJson: checklist,
      })
      .returning();

    const createdDocs = [];
    if (input.documents && input.documents.length > 0) {
      for (const doc of input.documents) {
        const docId =
          doc.id ??
          `DOC-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
        const [insertedDoc] = await tx
          .insert(candidateDocuments)
          .values({
            id: docId,
            candidateId: createdCandidate.id,
            docType: doc.docType,
            fileName: doc.fileName,
            storageUrl: doc.storageUrl,
            uploadStatus: doc.uploadStatus,
          })
          .returning();
        createdDocs.push(insertedDoc);
      }
    }

    const [auditEntry] = await tx
      .insert(auditLogs)
      .values({
        entityType: 'candidate',
        entityId: createdCandidate.trackingId,
        action: updatedJobOrder ? 'APPLICATION_SUBMITTED_AND_SEAT_LOCKED' : 'APPLICATION_SUBMITTED',
        actorRole: input.actorRole as ActorRole,
        payloadJson: {
          jobOrderId: createdCandidate.jobOrderId,
          eligibilityStatus: createdCandidate.eligibilityStatus,
          stage: createdCandidate.stage,
          documentCount: createdDocs.length,
        },
      })
      .returning();

    const responsePayload = {
      candidate: createdCandidate,
      jobOrder: updatedJobOrder,
      documents: createdDocs,
      auditLog: auditEntry,
    };

    if (idempotencyKey) {
      await tx.insert(idempotencyKeys).values({
        key: idempotencyKey,
        endpoint: 'POST /api/candidates',
        responseJson: responsePayload as unknown as Record<string, unknown>,
      });
    }

    return {
      replayed: false,
      response: responsePayload,
    };
  });

  if (!result.replayed) {
    broadcastEvent('state:changed', {
      type: 'candidate:created',
      payload: result.response,
    });
  }

  return result.response;
}

export async function updateCandidateAtomic(
  candidateId: string,
  rawInput: unknown,
  idempotencyKey?: string,
) {
  await ensureDbBootstrapped();
  const input = UpdateCandidateInputSchema.parse(rawInput);
  const { db } = await getDb();

  const result = await db.transaction(async (tx) => {
    if (idempotencyKey) {
      const [existingKey] = await tx
        .select()
        .from(idempotencyKeys)
        .where(eq(idempotencyKeys.key, idempotencyKey))
        .limit(1);
      if (existingKey) {
        return { replayed: true, response: existingKey.responseJson };
      }
    }

    const [existing] = await tx
      .select()
      .from(candidates)
      .where(eq(candidates.id, candidateId))
      .limit(1);

    if (!existing) {
      throw new NotFoundError(`Candidate ${candidateId} not found`);
    }

    let nextStage: CandidateStage = existing.stage;
    if (input.stage) {
      nextStage = input.stage;
    } else if (input.advanceStage) {
      const idx = CANDIDATE_STAGES.indexOf(existing.stage);
      if (idx !== -1 && idx < CANDIDATE_STAGES.length - 1) {
        nextStage = CANDIDATE_STAGES[idx + 1];
      }
    }

    const nextChecklist: ComplianceChecklist = {
      ...existing.checklistJson,
      ...(input.checklistPatch ?? {}),
    };

    const nextJobOrderId =
      input.jobOrderId !== undefined ? input.jobOrderId : existing.jobOrderId;

    let updatedJobOrder = null;

    if (
      nextJobOrderId &&
      existing.stage !== 'DEPLOYED' &&
      nextStage === 'DEPLOYED'
    ) {
      const lockRes = await tx.execute(
        sql`SELECT id, total_slots, locked_slots, confirmed_slots FROM job_orders WHERE id = ${nextJobOrderId} FOR UPDATE`,
      );
      const lockedRow = lockRes.rows[0] as
        | {
            id: string;
            total_slots: number;
            locked_slots: number;
            confirmed_slots: number;
          }
        | undefined;
      if (lockedRow) {
        const [jobRow] = await tx
          .update(jobOrders)
          .set({
            lockedSlots: Math.max(0, lockedRow.locked_slots - 1),
            confirmedSlots: lockedRow.confirmed_slots + 1,
          })
          .where(eq(jobOrders.id, nextJobOrderId))
          .returning();
        updatedJobOrder = jobRow;
      }
    }

    const [updatedCandidate] = await tx
      .update(candidates)
      .set({
        stage: nextStage,
        checklistJson: nextChecklist,
        jobOrderId: nextJobOrderId,
        updatedAt: new Date(),
      })
      .where(eq(candidates.id, candidateId))
      .returning();

    const action =
      nextStage !== existing.stage
        ? `STAGE_UPDATED_TO_${nextStage}`
        : input.checklistPatch
          ? 'COMPLIANCE_CHECKLIST_UPDATED'
          : 'JOB_ORDER_REASSIGNED';

    const [auditEntry] = await tx
      .insert(auditLogs)
      .values({
        entityType: 'candidate',
        entityId: updatedCandidate.trackingId,
        action,
        actorRole: input.actorRole as ActorRole,
        payloadJson: {
          previousStage: existing.stage,
          nextStage: updatedCandidate.stage,
          jobOrderId: updatedCandidate.jobOrderId,
        },
      })
      .returning();

    const responsePayload = {
      candidate: updatedCandidate,
      jobOrder: updatedJobOrder,
      auditLog: auditEntry,
    };

    if (idempotencyKey) {
      await tx.insert(idempotencyKeys).values({
        key: idempotencyKey,
        endpoint: `PATCH /api/candidates/${candidateId}`,
        responseJson: responsePayload as unknown as Record<string, unknown>,
      });
    }

    return { replayed: false, response: responsePayload };
  });

  if (!result.replayed) {
    broadcastEvent('state:changed', {
      type: 'candidate:updated',
      payload: result.response,
    });
  }

  return result.response;
}

export async function createJobOrderAtomic(
  rawInput: unknown,
  idempotencyKey?: string,
) {
  await ensureDbBootstrapped();
  const input = CreateJobOrderInputSchema.parse(rawInput);
  const { db } = await getDb();

  const orderId =
    input.id ??
    `REQ-${input.country}-${Math.floor(120 + Math.random() * 850)}`;

  const result = await db.transaction(async (tx) => {
    if (idempotencyKey) {
      const [existingKey] = await tx
        .select()
        .from(idempotencyKeys)
        .where(eq(idempotencyKeys.key, idempotencyKey))
        .limit(1);
      if (existingKey) {
        return { replayed: true, response: existingKey.responseJson };
      }
    }

    const [createdOrder] = await tx
      .insert(jobOrders)
      .values({
        id: orderId,
        title: input.title,
        employerName: input.employerName,
        country: input.country,
        location: input.location,
        sector: input.sector,
        totalSlots: input.totalSlots,
        lockedSlots: 0,
        confirmedSlots: 0,
        salaryUsd: input.salaryUsd,
        salaryDisplay: input.salaryDisplay,
        contractMonths: input.contractMonths,
        startDate: input.startDate,
        requirementsJson: input.requirementsJson,
        status: input.status,
      })
      .returning();

    const [auditEntry] = await tx
      .insert(auditLogs)
      .values({
        entityType: 'job_order',
        entityId: createdOrder.id,
        action: 'JOB_ORDER_CREATED',
        actorRole: input.actorRole as ActorRole,
        payloadJson: {
          title: createdOrder.title,
          totalSlots: createdOrder.totalSlots,
          country: createdOrder.country,
        },
      })
      .returning();

    const responsePayload = {
      jobOrder: createdOrder,
      auditLog: auditEntry,
    };

    if (idempotencyKey) {
      await tx.insert(idempotencyKeys).values({
        key: idempotencyKey,
        endpoint: 'POST /api/job-orders',
        responseJson: responsePayload as unknown as Record<string, unknown>,
      });
    }

    return { replayed: false, response: responsePayload };
  });

  if (!result.replayed) {
    broadcastEvent('state:changed', {
      type: 'job:created',
      payload: result.response,
    });
  }

  return result.response;
}

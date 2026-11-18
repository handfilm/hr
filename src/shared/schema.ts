import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import type {
  ActorRole,
  CandidateStage,
  ComplianceChecklist,
  DocType,
  EligibilityStatus,
  JobCountry,
  JobStatus,
  UploadStatus,
} from './enums.ts';

export const jobOrders = pgTable('job_orders', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  employerName: text('employer_name').notNull(),
  country: text('country').$type<JobCountry>().notNull(),
  location: text('location').notNull(),
  sector: text('sector').notNull(),
  totalSlots: integer('total_slots').notNull(),
  lockedSlots: integer('locked_slots').notNull().default(0),
  confirmedSlots: integer('confirmed_slots').notNull().default(0),
  salaryUsd: integer('salary_usd').notNull(),
  salaryDisplay: text('salary_display').notNull(),
  contractMonths: integer('contract_months').notNull().default(24),
  startDate: text('start_date').notNull(),
  requirementsJson: jsonb('requirements_json')
    .$type<{
      gender?: 'Female' | 'Male' | 'Any';
      minAge?: number;
      maxAge?: number;
      minHeightCm?: number;
      minWeightKg?: number;
      language?: string;
      visaProgram?: string;
      preferredCorridor?: string;
      coordinator?: string;
    }>()
    .notNull(),
  status: text('status').$type<JobStatus>().notNull().default('OPEN'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const candidates = pgTable('candidates', {
  id: text('id').primaryKey(),
  trackingId: text('tracking_id').notNull().unique(),
  jobOrderId: text('job_order_id').references(() => jobOrders.id),
  fullName: text('full_name').notNull(),
  phoneWhatsapp: text('phone_whatsapp').notNull(),
  district: text('district').notNull(),
  passportNo: text('passport_no').notNull(),
  referralCode: text('referral_code'),
  gender: text('gender').$type<'Female' | 'Male'>().notNull(),
  age: integer('age').notNull(),
  heightCm: integer('height_cm').notNull(),
  weightKg: integer('weight_kg').notNull(),
  medicalClear: boolean('medical_clear').notNull().default(true),
  englishScore: integer('english_score').notNull().default(3),
  englishIntro: text('english_intro').notNull().default(''),
  eligibilityStatus: text('eligibility_status').$type<EligibilityStatus>().notNull(),
  stage: text('stage').$type<CandidateStage>().notNull().default('SUBMITTED'),
  assignedPartner: text('assigned_partner')
    .$type<'Silver Group' | 'Vietnam Partner'>()
    .notNull(),
  originCountry: text('origin_country')
    .$type<'Bangladesh' | 'Vietnam'>()
    .notNull()
    .default('Bangladesh'),
  originHub: text('origin_hub').notNull().default('Dhaka Training Center'),
  languageLevel: text('language_level').notNull().default('English Ready'),
  checklistJson: jsonb('checklist_json').$type<ComplianceChecklist>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

export const candidateDocuments = pgTable('candidate_documents', {
  id: text('id').primaryKey(),
  candidateId: text('candidate_id')
    .notNull()
    .references(() => candidates.id, { onDelete: 'cascade' }),
  docType: text('doc_type').$type<DocType>().notNull(),
  fileName: text('file_name').notNull(),
  storageUrl: text('storage_url').notNull(),
  uploadStatus: text('upload_status').$type<UploadStatus>().notNull().default('LOCAL_VAULT'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const idempotencyKeys = pgTable('idempotency_keys', {
  key: text('key').primaryKey(),
  endpoint: text('endpoint').notNull(),
  responseJson: jsonb('response_json').$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  entityType: text('entity_type').notNull(),
  entityId: text('entity_id').notNull(),
  action: text('action').notNull(),
  actorRole: text('actor_role').$type<ActorRole>().notNull(),
  payloadJson: jsonb('payload_json').$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type JobOrderRecord = typeof jobOrders.$inferSelect;
export type NewJobOrderRecord = typeof jobOrders.$inferInsert;
export type CandidateRecord = typeof candidates.$inferSelect;
export type NewCandidateRecord = typeof candidates.$inferInsert;
export type CandidateDocumentRecord = typeof candidateDocuments.$inferSelect;
export type AuditLogRecord = typeof auditLogs.$inferSelect;

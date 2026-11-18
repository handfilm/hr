import { count } from 'drizzle-orm';
import { getDb } from './index.ts';
import {
  auditLogs,
  candidateDocuments,
  candidates,
  jobOrders,
} from '../../src/shared/schema.ts';

let bootPromise: Promise<void> | null = null;

const DDL_SQL = `
CREATE TABLE IF NOT EXISTS job_orders (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  employer_name TEXT NOT NULL,
  country TEXT NOT NULL,
  location TEXT NOT NULL,
  sector TEXT NOT NULL,
  total_slots INTEGER NOT NULL,
  locked_slots INTEGER NOT NULL DEFAULT 0,
  confirmed_slots INTEGER NOT NULL DEFAULT 0,
  salary_usd INTEGER NOT NULL,
  salary_display TEXT NOT NULL,
  contract_months INTEGER NOT NULL DEFAULT 24,
  start_date TEXT NOT NULL,
  requirements_json JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidates (
  id TEXT PRIMARY KEY,
  tracking_id TEXT NOT NULL UNIQUE,
  job_order_id TEXT REFERENCES job_orders(id),
  full_name TEXT NOT NULL,
  phone_whatsapp TEXT NOT NULL,
  district TEXT NOT NULL,
  passport_no TEXT NOT NULL,
  referral_code TEXT,
  gender TEXT NOT NULL,
  age INTEGER NOT NULL,
  height_cm INTEGER NOT NULL,
  weight_kg INTEGER NOT NULL,
  medical_clear BOOLEAN NOT NULL DEFAULT TRUE,
  english_score INTEGER NOT NULL DEFAULT 3,
  english_intro TEXT NOT NULL DEFAULT '',
  eligibility_status TEXT NOT NULL,
  stage TEXT NOT NULL DEFAULT 'SUBMITTED',
  assigned_partner TEXT NOT NULL,
  origin_country TEXT NOT NULL DEFAULT 'Bangladesh',
  origin_hub TEXT NOT NULL DEFAULT 'Dhaka Training Center',
  language_level TEXT NOT NULL DEFAULT 'English Ready',
  checklist_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS candidate_documents (
  id TEXT PRIMARY KEY,
  candidate_id TEXT NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  doc_type TEXT NOT NULL,
  file_name TEXT NOT NULL,
  storage_url TEXT NOT NULL,
  upload_status TEXT NOT NULL DEFAULT 'LOCAL_VAULT',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  response_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id SERIAL PRIMARY KEY,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor_role TEXT NOT NULL,
  payload_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION prevent_audit_log_mutation()
RETURNS TRIGGER AS $$
BEGIN
  RAISE EXCEPTION 'audit_logs is immutable append-only: % is forbidden', TG_OP;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_prevent_audit_log_mutation ON audit_logs;
CREATE TRIGGER trg_prevent_audit_log_mutation
BEFORE UPDATE OR DELETE ON audit_logs
FOR EACH ROW EXECUTE FUNCTION prevent_audit_log_mutation();
`;

export async function ensureDbBootstrapped(): Promise<void> {
  if (!bootPromise) {
    bootPromise = runBootstrap();
  }
  return bootPromise;
}

async function runBootstrap(): Promise<void> {
  const { db, execSql } = await getDb();
  await execSql(DDL_SQL);

  const [{ value: existingOrders }] = await db
    .select({ value: count() })
    .from(jobOrders);

  if (existingOrders > 0) return;

  await db.insert(jobOrders).values([
    {
      id: 'REQ-VN-2027',
      title: 'Vietnam Yarn Machine Operator',
      employerName: 'Hung Yen Yarn & Textile Manufacturing Co., Ltd.',
      country: 'VN',
      location: 'Hung Yen Province, Vietnam',
      sector: 'Industrial Yarn & Spinning Line',
      totalSlots: 10,
      lockedSlots: 2,
      confirmedSlots: 0,
      salaryUsd: 500,
      salaryDisplay: '$500 USD / MO',
      contractMonths: 24,
      startDate: '2027-01-05',
      requirementsJson: {
        gender: 'Female',
        minAge: 20,
        maxAge: 45,
        minHeightCm: 160,
        minWeightKg: 55,
        language: 'English Ready',
        visaProgram: 'Industrial Work Permit',
        preferredCorridor: 'Bangladesh',
        coordinator: 'Silver Group × Vietnam Partner',
      },
      status: 'OPEN',
    },
    {
      id: 'REQ-JP-104',
      title: 'CNC Precision Machinist',
      employerName: 'Kansai Precision Machining Co., Ltd.',
      country: 'JP',
      location: 'Osaka, Japan',
      sector: 'Industrial Manufacturing (CNC)',
      totalSlots: 14,
      lockedSlots: 1,
      confirmedSlots: 8,
      salaryUsd: 1500,
      salaryDisplay: '¥225,000 JPY',
      contractMonths: 36,
      startDate: '2026-12-15',
      requirementsJson: {
        gender: 'Any',
        minAge: 20,
        maxAge: 38,
        language: 'JLPT N4',
        visaProgram: 'SSW (i)',
        preferredCorridor: 'Bangladesh & Vietnam',
        coordinator: 'Kenji Hara',
      },
      status: 'INTERVIEWING',
    },
    {
      id: 'REQ-JP-109',
      title: 'Kaigo Nursing Care Specialist',
      employerName: 'Hikari Elder Care Welfare Group',
      country: 'JP',
      location: 'Aichi (Nagoya), Japan',
      sector: 'Nursing Care (Kaigo)',
      totalSlots: 20,
      lockedSlots: 1,
      confirmedSlots: 11,
      salaryUsd: 1580,
      salaryDisplay: '¥238,000 JPY',
      contractMonths: 36,
      startDate: '2026-12-22',
      requirementsJson: {
        gender: 'Any',
        minAge: 20,
        maxAge: 40,
        language: 'JLPT N4',
        visaProgram: 'SSW (i)',
        preferredCorridor: 'Vietnam',
        coordinator: 'Yumi Takahashi',
      },
      status: 'OPEN',
    },
    {
      id: 'REQ-JP-112',
      title: 'Structural Rebar Technician',
      employerName: 'Shimizu Civil Structural Works',
      country: 'JP',
      location: 'Tokyo, Japan',
      sector: 'Construction & Rebar',
      totalSlots: 18,
      lockedSlots: 1,
      confirmedSlots: 10,
      salaryUsd: 1420,
      salaryDisplay: '¥212,000 JPY',
      contractMonths: 36,
      startDate: '2027-01-10',
      requirementsJson: {
        gender: 'Male',
        minAge: 20,
        maxAge: 36,
        language: 'JFT-Basic A2',
        visaProgram: 'TITP',
        preferredCorridor: 'Bangladesh',
        coordinator: 'Haruto Sato',
      },
      status: 'OPEN',
    },
  ]);

  await db.insert(candidates).values([
    {
      id: 'HH-2026-4102',
      trackingId: 'HH-2026-4102',
      jobOrderId: 'REQ-VN-2027',
      fullName: 'Nusrat Jahan Mim',
      phoneWhatsapp: '+8801712884102',
      district: 'Gazipur',
      passportNo: 'A09482173',
      referralCode: 'SG-DHAKA-09',
      gender: 'Female',
      age: 26,
      heightCm: 163,
      weightKg: 58,
      medicalClear: true,
      englishScore: 3,
      englishIntro: 'Ready for 12-hour rotating spinning line shifts in Hung Yen.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'MEDICAL',
      assignedPartner: 'Silver Group',
      originCountry: 'Bangladesh',
      originHub: 'Dhaka Training Center',
      languageLevel: 'English Ready',
      checklistJson: {
        passportVerified: true,
        medicalCleared: true,
        languagePassed: true,
        coeSubmitted: false,
        visaStamped: false,
        flightBriefed: false,
      },
    },
    {
      id: 'HH-2026-4108',
      trackingId: 'HH-2026-4108',
      jobOrderId: 'REQ-VN-2027',
      fullName: 'Sumaiya Akter Rupa',
      phoneWhatsapp: '+8801819334108',
      district: 'Narayanganj',
      passportNo: 'B05219402',
      referralCode: 'SG-CTG-04',
      gender: 'Female',
      age: 29,
      heightCm: 162,
      weightKg: 57,
      medicalClear: true,
      englishScore: 3,
      englishIntro: 'Fluent in workplace English and factory safety logs.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'INTERVIEW',
      assignedPartner: 'Silver Group',
      originCountry: 'Bangladesh',
      originHub: 'Dhaka Training Center',
      languageLevel: 'English Ready',
      checklistJson: {
        passportVerified: true,
        medicalCleared: false,
        languagePassed: true,
        coeSubmitted: false,
        visaStamped: false,
        flightBriefed: false,
      },
    },
    {
      id: 'HH-2026-2401',
      trackingId: 'HH-2026-2401',
      jobOrderId: 'REQ-JP-104',
      fullName: 'Tanvir Ahmed Chowdhury',
      phoneWhatsapp: '+8801711222401',
      district: 'Dhaka',
      passportNo: 'A07124811',
      gender: 'Male',
      age: 25,
      heightCm: 171,
      weightKg: 66,
      medicalClear: true,
      englishScore: 3,
      englishIntro: 'JLPT N4 CNC operator trained at Silver Group Dhaka.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'COE_ATTESTATION',
      assignedPartner: 'Silver Group',
      originCountry: 'Bangladesh',
      originHub: 'Dhaka Training Center',
      languageLevel: 'N4',
      checklistJson: {
        passportVerified: true,
        medicalCleared: true,
        languagePassed: true,
        coeSubmitted: true,
        visaStamped: false,
        flightBriefed: false,
      },
    },
    {
      id: 'HH-2026-3102',
      trackingId: 'HH-2026-3102',
      jobOrderId: 'REQ-JP-109',
      fullName: 'Nguyen Thi Minh Thu',
      phoneWhatsapp: '+84912343102',
      district: 'Hanoi',
      passportNo: 'C84720194',
      gender: 'Female',
      age: 24,
      heightCm: 161,
      weightKg: 55,
      medicalClear: true,
      englishScore: 3,
      englishIntro: 'JLPT N3 caregiving specialist assigned to Aichi.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'BMET_CLEARANCE',
      assignedPartner: 'Vietnam Partner',
      originCountry: 'Vietnam',
      originHub: 'Hanoi Language Academy',
      languageLevel: 'N3',
      checklistJson: {
        passportVerified: true,
        medicalCleared: true,
        languagePassed: true,
        coeSubmitted: true,
        visaStamped: true,
        flightBriefed: false,
      },
    },
    {
      id: 'HH-2026-3115',
      trackingId: 'HH-2026-3115',
      jobOrderId: 'REQ-JP-104',
      fullName: 'Tran Quoc Bao',
      phoneWhatsapp: '+84908773115',
      district: 'Ho Chi Minh City',
      passportNo: 'C99412055',
      gender: 'Male',
      age: 27,
      heightCm: 173,
      weightKg: 68,
      medicalClear: true,
      englishScore: 3,
      englishIntro: 'Deployed to Osaka precision workshop.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'DEPLOYED',
      assignedPartner: 'Vietnam Partner',
      originCountry: 'Vietnam',
      originHub: 'Ho Chi Minh City Hub',
      languageLevel: 'N2',
      checklistJson: {
        passportVerified: true,
        medicalCleared: true,
        languagePassed: true,
        coeSubmitted: true,
        visaStamped: true,
        flightBriefed: true,
      },
    },
    {
      id: 'HH-2026-2408',
      trackingId: 'HH-2026-2408',
      jobOrderId: 'REQ-JP-112',
      fullName: 'Mahmudul Hasan Rakib',
      phoneWhatsapp: '+8801911442408',
      district: 'Chattogram',
      passportNo: 'A08339120',
      gender: 'Male',
      age: 23,
      heightCm: 169,
      weightKg: 63,
      medicalClear: true,
      englishScore: 2,
      englishIntro: 'TITP structural worker in screening phase.',
      eligibilityStatus: 'ELIGIBLE',
      stage: 'SCREENING',
      assignedPartner: 'Silver Group',
      originCountry: 'Bangladesh',
      originHub: 'Chattogram Trade Campus',
      languageLevel: 'JFT-Basic A2',
      checklistJson: {
        passportVerified: true,
        medicalCleared: true,
        languagePassed: true,
        coeSubmitted: false,
        visaStamped: false,
        flightBriefed: false,
      },
    },
  ]);

  await db.insert(candidateDocuments).values([
    {
      id: 'DOC-SEED-1',
      candidateId: 'HH-2026-4102',
      docType: 'PASSPORT',
      fileName: 'nusrat_passport_bio.pdf',
      storageUrl: 'local-vault://nusrat_passport_bio.pdf',
      uploadStatus: 'VERIFIED',
    },
    {
      id: 'DOC-SEED-2',
      candidateId: 'HH-2026-4102',
      docType: 'NID',
      fileName: 'nusrat_nid_front.jpg',
      storageUrl: 'local-vault://nusrat_nid_front.jpg',
      uploadStatus: 'VERIFIED',
    },
  ]);

  await db.insert(auditLogs).values([
    {
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
    },
    {
      entityType: 'candidate',
      entityId: 'HH-2026-4102',
      action: 'SEAT_LOCKED_AND_MEDICAL_VERIFIED',
      actorRole: 'SILVER_GROUP_DESK',
      payloadJson: {
        jobOrderId: 'REQ-VN-2027',
        stage: 'MEDICAL',
      },
    },
  ]);
}

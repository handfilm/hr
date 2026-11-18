import type {
  ActorRole,
  CandidateStage,
  ComplianceChecklist,
  DocType,
  EligibilityStatus,
  UploadStatus,
} from '../shared/enums.ts';
import type {
  Candidate,
  CandidateDocumentItem,
  JobRequisition,
  PipelineStage,
} from '../types.ts';

export type SyncMode = 'LIVE_SERVER' | 'LOCAL_VAULT';

export interface AuditLogEntry {
  id: number | string;
  entityType: string;
  entityId: string;
  action: string;
  actorRole: ActorRole;
  payloadJson: Record<string, unknown>;
  createdAt: string;
}

export interface OutboxOperation {
  idempotencyKey: string;
  method: 'POST' | 'PATCH';
  endpoint: string;
  body: Record<string, unknown>;
  createdAt: string;
}

export const STAGE_TO_BACKEND: Record<PipelineStage, CandidateStage> = {
  'Application Submitted': 'SUBMITTED',
  Screening: 'SCREENING',
  'Online Interview': 'INTERVIEW',
  'Medical Fit': 'MEDICAL',
  'COE / Embassy Attestation': 'COE_ATTESTATION',
  'BMET Smart Card': 'BMET_CLEARANCE',
  Deployed: 'DEPLOYED',
};

export const BACKEND_TO_STAGE: Record<CandidateStage, PipelineStage> = {
  SUBMITTED: 'Application Submitted',
  SCREENING: 'Screening',
  INTERVIEW: 'Online Interview',
  MEDICAL: 'Medical Fit',
  COE_ATTESTATION: 'COE / Embassy Attestation',
  BMET_CLEARANCE: 'BMET Smart Card',
  DEPLOYED: 'Deployed',
};

export interface ServerJobOrderRow {
  id: string;
  title: string;
  employerName: string;
  country: 'VN' | 'JP';
  location: string;
  sector: string;
  totalSlots: number;
  lockedSlots: number;
  confirmedSlots: number;
  salaryUsd: number;
  salaryDisplay: string;
  contractMonths: number;
  startDate: string;
  requirementsJson: {
    gender?: 'Female' | 'Male' | 'Any';
    minAge?: number;
    maxAge?: number;
    minHeightCm?: number;
    minWeightKg?: number;
    language?: string;
    visaProgram?: string;
    preferredCorridor?: string;
    coordinator?: string;
  };
  status: 'OPEN' | 'INTERVIEWING' | 'CLOSED';
}

export interface ServerCandidateRow {
  id: string;
  trackingId: string;
  jobOrderId: string | null;
  fullName: string;
  phoneWhatsapp: string;
  district: string;
  passportNo: string;
  referralCode: string | null;
  gender: 'Female' | 'Male';
  age: number;
  heightCm: number;
  weightKg: number;
  medicalClear: boolean;
  englishScore: number;
  englishIntro: string;
  eligibilityStatus: EligibilityStatus;
  stage: CandidateStage;
  assignedPartner: 'Silver Group' | 'Vietnam Partner';
  originCountry: 'Bangladesh' | 'Vietnam';
  originHub: string;
  languageLevel: string;
  checklistJson: ComplianceChecklist;
  createdAt: string;
  updatedAt: string;
}

export interface ServerDocumentRow {
  id: string;
  candidateId: string;
  docType: DocType;
  fileName: string;
  storageUrl: string;
  uploadStatus: UploadStatus;
  createdAt: string;
}

export function mapServerJobToUi(row: ServerJobOrderRow): JobRequisition {
  const req = row.requirementsJson ?? {};
  const statusMap: Record<ServerJobOrderRow['status'], JobRequisition['status']> = {
    OPEN: 'Open',
    INTERVIEWING: 'Interviewing',
    CLOSED: 'Closed',
  };
  return {
    id: row.id,
    title: row.title,
    employerName: row.employerName,
    country: row.country,
    prefecture: row.location,
    sector: row.sector,
    visaProgram: (req.visaProgram as JobRequisition['visaProgram']) ?? 'SSW (i)',
    jlptRequired: (req.language as JobRequisition['jlptRequired']) ?? 'N4',
    monthlySalaryDisplay: row.salaryDisplay,
    monthlySalaryJpy: row.country === 'JP' ? Math.round(row.salaryUsd * 150) : Math.round(row.salaryUsd * 152),
    salaryUsd: row.salaryUsd,
    openQuota: row.totalSlots,
    lockedSlots: row.lockedSlots,
    confirmedSlots: row.confirmedSlots,
    filledCount: row.lockedSlots + row.confirmedSlots,
    preferredCorridor:
      (req.preferredCorridor as JobRequisition['preferredCorridor']) ?? 'Bangladesh & Vietnam',
    coordinator: req.coordinator ?? 'Hara International',
    deadline: row.startDate,
    status: statusMap[row.status],
  };
}

export function mapServerCandidateToUi(
  row: ServerCandidateRow,
  docs: ServerDocumentRow[] = [],
): Candidate {
  const candidateDocs: CandidateDocumentItem[] = docs
    .filter((d) => d.candidateId === row.id)
    .map((d) => ({
      id: d.id,
      docType: d.docType,
      fileName: d.fileName,
      storageUrl: d.storageUrl,
      uploadStatus: d.uploadStatus,
    }));

  const docMap = {
    passportFile: candidateDocs.find((d) => d.docType === 'PASSPORT')?.fileName,
    nidFile: candidateDocs.find((d) => d.docType === 'NID')?.fileName,
    photoFile: candidateDocs.find((d) => d.docType === 'PHOTO')?.fileName,
    certificateFile: candidateDocs.find((d) => d.docType === 'CERTIFICATE')?.fileName,
  };

  return {
    id: row.trackingId || row.id,
    fullName: row.fullName,
    phone: row.phoneWhatsapp,
    district: row.district,
    passportNumber: row.passportNo,
    referralCode: row.referralCode ?? undefined,
    gender: row.gender,
    age: row.age,
    heightCm: row.heightCm,
    weightKg: row.weightKg,
    originCountry: row.originCountry,
    originHub: row.originHub,
    partnerAgency: row.assignedPartner,
    tradeSector: 'Industrial Yarn & Spinning Line',
    jlptLevel: (row.languageLevel as Candidate['jlptLevel']) ?? 'English Ready',
    visaProgram: 'Industrial Work Permit',
    stage: BACKEND_TO_STAGE[row.stage] ?? 'Application Submitted',
    assignedRequisitionId: row.jobOrderId,
    targetPrefecture:
      row.jobOrderId === 'REQ-VN-2027'
        ? 'Hung Yen Province, Vietnam'
        : 'Japan Placement',
    interviewDate: String(row.createdAt).slice(0, 10),
    updatedAt: String(row.updatedAt).slice(0, 10),
    eligible: row.eligibilityStatus === 'ELIGIBLE',
    selfIntro: row.englishIntro,
    documents: docMap,
    documentItems: candidateDocs,
    checklist: row.checklistJson,
  };
}

import type { DocType, UploadStatus } from './shared/enums.ts';

export type Locale = 'bn' | 'ja' | 'en' | 'vi';

export type AppMode = 'public' | 'admin';

export type SourceCountry = 'Bangladesh' | 'Vietnam';

export type PipelineStage =
  | 'Application Submitted'
  | 'Screening'
  | 'Online Interview'
  | 'Medical Fit'
  | 'COE / Embassy Attestation'
  | 'BMET Smart Card'
  | 'Deployed';

export type VisaProgram =
  | 'SSW (i)'
  | 'TITP'
  | 'Engineer / Specialist'
  | 'Industrial Work Permit';

export interface ComplianceChecklist {
  passportVerified: boolean;
  medicalCleared: boolean;
  languagePassed: boolean;
  coeSubmitted: boolean;
  visaStamped: boolean;
  flightBriefed: boolean;
}

export interface CandidateDocuments {
  passportFile?: string;
  nidFile?: string;
  photoFile?: string;
  certificateFile?: string;
}

export interface CandidateDocumentItem {
  id: string;
  candidateId?: string;
  docType: DocType;
  fileName: string;
  storageUrl: string;
  uploadStatus: UploadStatus;
}

export interface Candidate {
  id: string;
  fullName: string;
  phone: string;
  district: string;
  passportNumber: string;
  referralCode?: string;
  gender: 'Female' | 'Male';
  age: number;
  heightCm: number;
  weightKg: number;
  originCountry: SourceCountry;
  originHub: string;
  partnerAgency: 'Silver Group' | 'Vietnam Partner';
  tradeSector: string;
  jlptLevel: 'English Ready' | 'N5' | 'N4' | 'N3' | 'N2' | 'JFT-Basic A2';
  visaProgram: VisaProgram;
  stage: PipelineStage;
  assignedRequisitionId: string | null;
  targetPrefecture: string;
  interviewDate: string;
  updatedAt: string;
  eligible: boolean;
  selfIntro?: string;
  documents?: CandidateDocuments;
  documentItems?: CandidateDocumentItem[];
  checklist: ComplianceChecklist;
}

export interface JobRequisition {
  id: string;
  title: string;
  employerName: string;
  country: 'VN' | 'JP';
  prefecture: string;
  sector: string;
  visaProgram: VisaProgram;
  jlptRequired: 'English Ready' | 'N5' | 'N4' | 'N3' | 'N2' | 'JFT-Basic A2';
  monthlySalaryDisplay: string;
  monthlySalaryJpy: number;
  salaryUsd: number;
  openQuota: number;
  lockedSlots: number;
  confirmedSlots: number;
  filledCount: number;
  preferredCorridor: 'Bangladesh & Vietnam' | 'Bangladesh' | 'Vietnam';
  coordinator: string;
  deadline: string;
  status: 'Open' | 'Interviewing' | 'Closed';
}

export interface PartnerHub {
  id: string;
  organization: string;
  country: 'Bangladesh' | 'Japan' | 'Vietnam';
  city: string;
  role: string;
  leadCoordinator: string;
  contactEmail: string;
  activeCenters: number;
  currentCapacity: number;
  focusPrograms: string;
}

export type WorkspaceTab = 'overview' | 'candidates' | 'jobs' | 'compliance' | 'partners';

export type InfoModalType = 'faq' | 'privacy' | 'contact' | null;

export type TopNavSection = 'home' | 'demands' | 'legal' | 'faq' | 'privacy' | 'contact';


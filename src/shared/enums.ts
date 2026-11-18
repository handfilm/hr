export const JOB_COUNTRIES = ['VN', 'JP'] as const;
export type JobCountry = (typeof JOB_COUNTRIES)[number];

export const JOB_STATUSES = ['OPEN', 'INTERVIEWING', 'CLOSED'] as const;
export type JobStatus = (typeof JOB_STATUSES)[number];

export const ELIGIBILITY_STATUSES = ['ELIGIBLE', 'REVIEW_NEEDED'] as const;
export type EligibilityStatus = (typeof ELIGIBILITY_STATUSES)[number];

export const CANDIDATE_STAGES = [
  'SUBMITTED',
  'SCREENING',
  'INTERVIEW',
  'MEDICAL',
  'COE_ATTESTATION',
  'BMET_CLEARANCE',
  'DEPLOYED',
] as const;
export type CandidateStage = (typeof CANDIDATE_STAGES)[number];

export const DOC_TYPES = ['PASSPORT', 'NID', 'PHOTO', 'CERTIFICATE'] as const;
export type DocType = (typeof DOC_TYPES)[number];

export const UPLOAD_STATUSES = ['LOCAL_VAULT', 'SIGNED_UPLOADED', 'VERIFIED'] as const;
export type UploadStatus = (typeof UPLOAD_STATUSES)[number];

export const ACTOR_ROLES = [
  'PUBLIC_APPLICANT',
  'SILVER_GROUP_DESK',
  'VIETNAM_PARTNER_DESK',
  'HARA_INTL_DESK',
  'SYSTEM_SEED',
] as const;
export type ActorRole = (typeof ACTOR_ROLES)[number];

export interface ComplianceChecklist {
  passportVerified: boolean;
  medicalCleared: boolean;
  languagePassed: boolean;
  coeSubmitted: boolean;
  visaStamped: boolean;
  flightBriefed: boolean;
}

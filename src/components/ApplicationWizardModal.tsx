import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileUp,
  MessageCircle,
  Search,
  ShieldCheck,
  X,
} from 'lucide-react';
import type { DocType } from '../shared/enums.ts';
import type { Candidate, CandidateDocumentItem, CandidateDocuments } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface ApplicationWizardModalProps {
  t: Translations;
  initialStep?: 1 | 2;
  onClose: () => void;
  onUploadDocument: (file: File, docType: DocType) => Promise<CandidateDocumentItem>;
  onSubmitCandidate: (
    candidate: Candidate,
    englishScore: number,
  ) => Promise<void> | void;
  onJumpToTracker: (trackingId: string) => void;
}

export function ApplicationWizardModal({
  t,
  initialStep = 1,
  onClose,
  onUploadDocument,
  onSubmitCandidate,
  onJumpToTracker,
}: ApplicationWizardModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialStep);

  // Step 1: Identity
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('Dhaka');
  const [passportNumber, setPassportNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');

  // Step 2: Live Auto-Validator
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [age, setAge] = useState<number>(25);
  const [heightCm, setHeightCm] = useState<number>(162);
  const [weightKg, setWeightKg] = useState<number>(57);
  const [medNoInfectious, setMedNoInfectious] = useState(true);
  const [medNoHeartNeuro, setMedNoHeartNeuro] = useState(true);
  const [medNoHeightFear, setMedNoHeightFear] = useState(true);

  // Step 3: 3-Tap English Readiness
  const [engSpeak, setEngSpeak] = useState(true);
  const [engWrite, setEngWrite] = useState(true);
  const [engSafety, setEngSafety] = useState(true);
  const [selfIntro, setSelfIntro] = useState(
    'I can speak and write English and am ready for 12-hour rotating factory shifts.',
  );

  // Step 4: Documents (Signed-URL / Local Vault pipeline)
  const [documents, setDocuments] = useState<CandidateDocuments>({});
  const [documentItems, setDocumentItems] = useState<CandidateDocumentItem[]>([]);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [submittedCandidate, setSubmittedCandidate] = useState<Candidate | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!submittedCandidate) {
      setQrDataUrl(null);
      return;
    }
    const trackUrl = `https://hr.handsandhead.com/?track=${encodeURIComponent(
      submittedCandidate.id,
    )}`;
    QRCode.toDataURL(trackUrl, {
      width: 180,
      margin: 1,
      color: { dark: '#0a0a0a', light: '#ffffff' },
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => setQrDataUrl(null));
  }, [submittedCandidate]);

  const liveMetrics = useMemo(() => {
    const safeHeight = Math.max(100, heightCm || 160);
    const safeWeight = Math.max(30, weightKg || 55);
    const totalInches = safeHeight / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    const heightM = safeHeight / 100;
    const bmi = Number((safeWeight / (heightM * heightM)).toFixed(1));

    const reasons: string[] = [];
    if (gender !== 'Female') reasons.push(t.wizard.mismatchReasonGender);
    if (age < 20 || age > 45) reasons.push(t.wizard.mismatchReasonAge);
    if (heightCm < 160) reasons.push(t.wizard.mismatchReasonHeight);
    if (weightKg < 55) reasons.push(t.wizard.mismatchReasonWeight);
    if (!medNoInfectious || !medNoHeartNeuro || !medNoHeightFear) {
      reasons.push(t.wizard.mismatchReasonMedical);
    }

    return {
      ftIn: `${feet}' ${inches}"`,
      bmi,
      isEligible: reasons.length === 0,
      reasons,
    };
  }, [
    gender,
    age,
    heightCm,
    weightKg,
    medNoInfectious,
    medNoHeartNeuro,
    medNoHeightFear,
    t.wizard,
  ]);

  const handleFileChange =
    (key: keyof CandidateDocuments, docType: DocType) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setUploadingKey(key);
      try {
        const uploaded = await onUploadDocument(file, docType);
        setDocuments((prev) => ({ ...prev, [key]: uploaded.fileName }));
        setDocumentItems((prev) => [
          ...prev.filter((d) => d.docType !== docType),
          uploaded,
        ]);
      } finally {
        setUploadingKey(null);
      }
    };

  const attachSampleDocs = () => {
    setDocuments({
      passportFile: 'passport_bio_scan.pdf',
      nidFile: 'national_id_card.jpg',
      photoFile: 'candidate_portrait.jpg',
      certificateFile: 'ssc_certificate.pdf',
    });
    setDocumentItems([
      {
        id: `DOC-SAMPLE-PP-${Date.now()}`,
        docType: 'PASSPORT',
        fileName: 'passport_bio_scan.pdf',
        storageUrl: 'local-vault://passport_bio_scan.pdf',
        uploadStatus: 'LOCAL_VAULT',
      },
      {
        id: `DOC-SAMPLE-NID-${Date.now()}`,
        docType: 'NID',
        fileName: 'national_id_card.jpg',
        storageUrl: 'local-vault://national_id_card.jpg',
        uploadStatus: 'LOCAL_VAULT',
      },
      {
        id: `DOC-SAMPLE-PH-${Date.now()}`,
        docType: 'PHOTO',
        fileName: 'candidate_portrait.jpg',
        storageUrl: 'local-vault://candidate_portrait.jpg',
        uploadStatus: 'LOCAL_VAULT',
      },
      {
        id: `DOC-SAMPLE-CERT-${Date.now()}`,
        docType: 'CERTIFICATE',
        fileName: 'ssc_certificate.pdf',
        storageUrl: 'local-vault://ssc_certificate.pdf',
        uploadStatus: 'LOCAL_VAULT',
      },
    ]);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const trackingId = `HH-2026-${randomCode}`;
    const today = new Date().toISOString().slice(0, 10);
    const englishScore = [engSpeak, engWrite, engSafety].filter(Boolean).length;

    const newCandidate: Candidate = {
      id: trackingId,
      fullName: fullName.trim() || 'Applicant Candidate',
      phone: phone.trim() || '+8801700000000',
      district: district.trim() || 'Dhaka',
      passportNumber: passportNumber.trim().toUpperCase() || 'PENDING',
      referralCode: referralCode.trim() || undefined,
      gender,
      age: Number(age) || 25,
      heightCm: Number(heightCm) || 160,
      weightKg: Number(weightKg) || 55,
      originCountry: 'Bangladesh',
      originHub: 'Dhaka Training Center',
      partnerAgency: 'Silver Group',
      tradeSector: 'Industrial Yarn & Spinning Line',
      jlptLevel: englishScore >= 2 ? 'English Ready' : 'N5',
      visaProgram: 'Industrial Work Permit',
      stage: 'Application Submitted',
      assignedRequisitionId: 'REQ-VN-2027',
      targetPrefecture: 'Hung Yen Province, Vietnam',
      interviewDate: '2026-12-01',
      updatedAt: today,
      eligible: liveMetrics.isEligible,
      selfIntro: selfIntro.trim(),
      documents,
      documentItems,
      checklist: {
        passportVerified: Boolean(passportNumber.trim() || documents.passportFile),
        medicalCleared: medNoInfectious && medNoHeartNeuro && medNoHeightFear,
        languagePassed: englishScore >= 2,
        coeSubmitted: false,
        visaStamped: false,
        flightBriefed: false,
      },
    };

    await onSubmitCandidate(newCandidate, englishScore);
    setSubmittedCandidate(newCandidate);
  };

  const whatsappReceiptHref = submittedCandidate
    ? `https://wa.me/8801700000000?text=${encodeURIComponent(
        `Hands & Head HR Application Receipt\nTracking ID: ${submittedCandidate.id}\nName: ${submittedCandidate.fullName}\nPhone: ${submittedCandidate.phone}\nDemand: Vietnam Yarn Factory ($500/mo)\nEligibility: ${submittedCandidate.eligible ? '100% ELIGIBLE' : 'REVIEW REQUIRED'}\nTrack: https://hr.handsandhead.com/?track=${submittedCandidate.id}`,
      )}`
    : '#';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wizard-title"
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-[0_0_50px_rgba(255,85,0,0.28)]">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between gap-4 sticky top-0 z-10">
          <div>
            <p className="font-brutal-mono text-[11px] text-[#FF5500] uppercase">
              SILVER GROUP × VIETNAM PARTNER
            </p>
            <h2 id="wizard-title" className="text-lg sm:text-xl font-bold text-white">
              {submittedCandidate ? t.wizard.passTitle : t.wizard.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.close}
            className="p-2.5 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* If Submitted -> Digital Candidate Pass with Scannable QR */}
        {submittedCandidate ? (
          <div className="p-6 space-y-6">
            <div className="bg-[#18181b] border-2 border-[#10b981] p-6 space-y-5 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#27272a] pb-4">
                <div>
                  <p className="font-brutal-mono text-xs text-[#10b981] uppercase">
                    {t.wizard.passTrackingId}
                  </p>
                  <p className="font-brutal-mono text-3xl sm:text-4xl font-bold text-white tracking-wider mt-1">
                    {submittedCandidate.id}
                  </p>
                  <div className="mt-2 inline-block px-3 py-1 bg-[#10b981] text-black font-brutal-mono text-xs font-bold uppercase">
                    {submittedCandidate.eligible
                      ? t.wizard.eligibleBadge
                      : t.wizard.mismatchBadge}
                  </div>
                </div>

                {qrDataUrl && (
                  <div className="bg-white p-2 border-2 border-[#10b981] self-start shrink-0">
                    <img
                      src={qrDataUrl}
                      alt={`QR Tracking Pass ${submittedCandidate.id}`}
                      className="w-28 h-28"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-brutal-mono text-xs text-[#A1A1AA]">{t.wizard.fullName}</p>
                  <p className="font-bold text-white mt-1">{submittedCandidate.fullName}</p>
                </div>
                <div>
                  <p className="font-brutal-mono text-xs text-[#A1A1AA]">{t.wizard.phone}</p>
                  <p className="font-brutal-mono font-bold text-white mt-1">
                    {submittedCandidate.phone}
                  </p>
                </div>
                <div>
                  <p className="font-brutal-mono text-xs text-[#A1A1AA]">
                    {t.labels.prefecture}
                  </p>
                  <p className="font-bold text-white mt-1">
                    {submittedCandidate.targetPrefecture}
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#A1A1AA] border-t-2 border-[#27272a] pt-4">
                {t.wizard.passNote}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappReceiptHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[68px] px-5 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm sm:text-base uppercase flex items-center justify-center gap-3 transition-colors"
              >
                <MessageCircle className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span>{t.wizard.sendWhatsappReceipt}</span>
              </a>

              <button
                type="button"
                onClick={() => onJumpToTracker(submittedCandidate.id)}
                className="min-h-[68px] px-5 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-sm sm:text-base uppercase flex items-center justify-center gap-3 transition-colors cursor-pointer"
              >
                <Search className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span>{t.wizard.trackThisId}</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6">
            {/* Step Progress Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {([1, 2, 3, 4] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStep(s)}
                  className={`py-3 px-2.5 border-2 font-brutal-mono text-xs font-bold text-left transition-colors cursor-pointer ${
                    step === s
                      ? 'border-[#FF5500] bg-[#FF5500] text-black'
                      : step > s
                        ? 'border-[#10b981] bg-[#18181b] text-[#10b981]'
                        : 'border-[#27272a] bg-[#18181b] text-[#A1A1AA]'
                  }`}
                >
                  {t.wizard.stepLabels[s - 1]}
                </button>
              ))}
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="wiz-name" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                    {t.wizard.fullName}
                  </label>
                  <input
                    id="wiz-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Tasnim Akter / Nguyen Thi Hoa"
                    className="w-full px-4 py-3.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-semibold focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wiz-phone" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.phone}
                    </label>
                    <input
                      id="wiz-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+88017XXXXXXXX"
                      className="w-full px-4 py-3.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="wiz-district" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.district}
                    </label>
                    <input
                      id="wiz-district"
                      type="text"
                      required
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wiz-passport" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.passportNumber}
                    </label>
                    <input
                      id="wiz-passport"
                      type="text"
                      value={passportNumber}
                      onChange={(e) => setPassportNumber(e.target.value)}
                      placeholder="A01234567"
                      className="w-full px-4 py-3.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono uppercase focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="wiz-ref" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.referralCode}
                    </label>
                    <input
                      id="wiz-ref"
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="SG-DHAKA-01"
                      className="w-full px-4 py-3.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono uppercase focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: LIVE AUTO-VALIDATOR */}
            {step === 2 && (
              <div className="space-y-5">
                <div
                  className={`p-4 border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    liveMetrics.isEligible
                      ? 'border-[#10b981] bg-[#10b981]/10 shadow-[0_0_24px_rgba(16,185,129,0.2)]'
                      : 'border-[#e11d48] bg-[#e11d48]/10 shadow-[0_0_24px_rgba(225,29,72,0.2)]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {liveMetrics.isEligible ? (
                      <ShieldCheck className="w-7 h-7 text-[#10b981] shrink-0" />
                    ) : (
                      <AlertTriangle className="w-7 h-7 text-[#e11d48] shrink-0" />
                    )}
                    <div>
                      <p
                        className={`font-brutal-mono text-sm font-bold ${
                          liveMetrics.isEligible ? 'text-[#10b981]' : 'text-[#e11d48]'
                        }`}
                      >
                        {liveMetrics.isEligible ? t.wizard.eligibleBadge : t.wizard.mismatchBadge}
                      </p>
                      {!liveMetrics.isEligible && (
                        <ul className="mt-1 space-y-0.5 text-xs text-white">
                          {liveMetrics.reasons.map((r) => (
                            <li key={r}>• {r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-brutal-mono text-xs shrink-0">
                    <div className="bg-[#121212] border border-[#27272a] px-3 py-2">
                      <span className="text-[#A1A1AA] block">{t.wizard.ftInLabel}</span>
                      <span className="text-white font-bold text-sm tabular-nums">{liveMetrics.ftIn}</span>
                    </div>
                    <div className="bg-[#121212] border border-[#27272a] px-3 py-2">
                      <span className="text-[#A1A1AA] block">{t.wizard.bmiLabel}</span>
                      <span className="text-white font-bold text-sm tabular-nums">{liveMetrics.bmi}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.gender}
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {(['Female', 'Male'] as const).map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGender(g)}
                          className={`min-h-[52px] border-2 font-bold text-sm cursor-pointer transition-colors ${
                            gender === g
                              ? 'border-[#FF5500] bg-[#FF5500] text-black'
                              : 'border-[#27272a] bg-[#18181b] text-white'
                          }`}
                        >
                          {g === 'Female' ? t.wizard.female : t.wizard.male}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="wiz-age" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.age}
                    </label>
                    <input
                      id="wiz-age"
                      type="number"
                      min={18}
                      max={65}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full min-h-[52px] px-4 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-lg font-bold tabular-nums focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="wiz-height" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.heightCm}
                    </label>
                    <input
                      id="wiz-height"
                      type="number"
                      min={120}
                      max={220}
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full min-h-[52px] px-4 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-lg font-bold tabular-nums focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="wiz-weight" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                      {t.wizard.weightKg}
                    </label>
                    <input
                      id="wiz-weight"
                      type="number"
                      min={35}
                      max={150}
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full min-h-[52px] px-4 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-lg font-bold tabular-nums focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2.5 pt-2">
                  <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
                    {t.wizard.medicalHeader}
                  </p>
                  {[
                    { checked: medNoInfectious, set: setMedNoInfectious, label: t.wizard.medNoInfectious },
                    { checked: medNoHeartNeuro, set: setMedNoHeartNeuro, label: t.wizard.medNoHeartNeuro },
                    { checked: medNoHeightFear, set: setMedNoHeightFear, label: t.wizard.medNoHeightFear },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => item.set(!item.checked)}
                      className={`w-full min-h-[54px] px-4 border-2 flex items-center gap-3 text-left transition-colors cursor-pointer ${
                        item.checked
                          ? 'border-[#10b981] bg-[#18181b] text-white'
                          : 'border-[#27272a] bg-[#18181b] text-[#A1A1AA]'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-5 h-5 shrink-0 ${item.checked ? 'text-[#10b981]' : 'text-[#27272a]'}`}
                      />
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: 3-TAP ENGLISH READINESS */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="font-brutal-mono text-xs text-[#f59e0b] uppercase">
                  {t.wizard.englishHeader}
                </p>

                <div className="space-y-3">
                  {[
                    { checked: engSpeak, set: setEngSpeak, label: t.wizard.engSpeak },
                    { checked: engWrite, set: setEngWrite, label: t.wizard.engWrite },
                    { checked: engSafety, set: setEngSafety, label: t.wizard.engSafety },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => item.set(!item.checked)}
                      className={`w-full min-h-[68px] px-5 border-2 flex items-center justify-between gap-4 text-left transition-colors cursor-pointer ${
                        item.checked
                          ? 'border-[#10b981] bg-[#10b981]/10 text-white'
                          : 'border-[#27272a] bg-[#18181b] text-[#A1A1AA]'
                      }`}
                    >
                      <span className="text-base font-bold">{item.label}</span>
                      <span
                        className={`font-brutal-mono text-xs px-3 py-1 font-bold ${
                          item.checked ? 'bg-[#10b981] text-black' : 'bg-[#27272a] text-[#A1A1AA]'
                        }`}
                      >
                        {item.checked ? 'YES' : 'NO'}
                      </span>
                    </button>
                  ))}
                </div>

                <div>
                  <label htmlFor="wiz-intro" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1.5">
                    {t.wizard.selfIntroLabel}
                  </label>
                  <textarea
                    id="wiz-intro"
                    rows={3}
                    value={selfIntro}
                    onChange={(e) => setSelfIntro(e.target.value)}
                    placeholder={t.wizard.selfIntroPlaceholder}
                    className="w-full px-4 py-3 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 4: DOCUMENTS & SUBMIT */}
            {step === 4 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-brutal-mono text-xs text-[#FF5500] uppercase">
                    {t.wizard.docsHeader}
                  </p>
                  <button
                    type="button"
                    onClick={attachSampleDocs}
                    className="px-3 py-1.5 border-2 border-[#27272a] hover:border-[#FF5500] font-brutal-mono text-xs text-white cursor-pointer"
                  >
                    {t.wizard.attachSample}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(
                    [
                      { key: 'passportFile', docType: 'PASSPORT', label: t.wizard.docPassport },
                      { key: 'nidFile', docType: 'NID', label: t.wizard.docNid },
                      { key: 'photoFile', docType: 'PHOTO', label: t.wizard.docPhoto },
                      { key: 'certificateFile', docType: 'CERTIFICATE', label: t.wizard.docCert },
                    ] as const
                  ).map((doc) => {
                    const fileName = documents[doc.key];
                    const isUploading = uploadingKey === doc.key;
                    return (
                      <label
                        key={doc.key}
                        className={`min-h-[76px] p-4 border-2 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                          fileName
                            ? 'border-[#10b981] bg-[#10b981]/10'
                            : 'border-[#27272a] bg-[#18181b] hover:border-[#FF5500]'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-white">{doc.label}</p>
                          <p className="font-brutal-mono text-xs text-[#A1A1AA] truncate mt-0.5">
                            {isUploading ? 'UPLOADING...' : fileName ?? 'PDF / JPG / PNG'}
                          </p>
                        </div>
                        <FileUp
                          className={`w-6 h-6 shrink-0 ${
                            fileName ? 'text-[#10b981]' : 'text-[#FF5500]'
                          }`}
                        />
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange(doc.key, doc.docType)}
                          className="sr-only"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Navigation Footer */}
            <div className="pt-4 border-t-2 border-[#27272a] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3 | 4) : s))}
                  className="min-h-[68px] px-6 border-2 border-[#27272a] bg-[#18181b] hover:border-white text-white font-bold text-sm uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>{t.wizard.prevStep}</span>
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s < 4 ? ((s + 1) as 1 | 2 | 3 | 4) : s))}
                  className="min-h-[68px] px-8 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-base uppercase flex items-center justify-center gap-2 shadow-[0_0_24px_rgba(255,85,0,0.3)] cursor-pointer"
                >
                  <span>{t.wizard.nextStep}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="min-h-[68px] px-8 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-base uppercase flex items-center justify-center gap-2 shadow-[0_0_28px_rgba(16,185,129,0.3)] cursor-pointer"
                >
                  <CheckCircle2 className="w-6 h-6" />
                  <span>{t.wizard.submitApp}</span>
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

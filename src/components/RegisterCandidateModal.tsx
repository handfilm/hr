import { FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import { Candidate, JobRequisition, SourceCountry, VisaProgram } from '../types';
import { Translations } from '../i18n';

interface RegisterCandidateModalProps {
  t: Translations;
  requisitions: JobRequisition[];
  onClose: () => void;
  onSubmit: (candidate: Candidate) => void;
}

export function RegisterCandidateModal({
  t,
  requisitions,
  onClose,
  onSubmit,
}: RegisterCandidateModalProps) {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+88017');
  const [district, setDistrict] = useState('Dhaka');
  const [passportNumber, setPassportNumber] = useState('');
  const [gender, setGender] = useState<'Female' | 'Male'>('Female');
  const [age, setAge] = useState(25);
  const [heightCm, setHeightCm] = useState(162);
  const [weightKg, setWeightKg] = useState(57);
  const [originCountry, setOriginCountry] = useState<SourceCountry>('Bangladesh');
  const [originHub, setOriginHub] = useState('Dhaka Training Center');
  const [tradeSector, setTradeSector] = useState('Industrial Yarn & Spinning Line');
  const [jlptLevel, setJlptLevel] = useState<Candidate['jlptLevel']>('English Ready');
  const [visaProgram, setVisaProgram] = useState<VisaProgram>('Industrial Work Permit');
  const [assignedRequisitionId, setAssignedRequisitionId] = useState<string>(
    requisitions[0]?.id ?? '',
  );

  const handleCountryChange = (country: SourceCountry) => {
    setOriginCountry(country);
    setOriginHub(
      country === 'Bangladesh' ? 'Dhaka Training Center' : 'Hanoi Language Academy',
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const randomNum = Math.floor(4200 + Math.random() * 5500);
    const today = new Date().toISOString().slice(0, 10);
    const selectedReq = requisitions.find((r) => r.id === assignedRequisitionId);

    const newCandidate: Candidate = {
      id: `HH-2026-${randomNum}`,
      fullName: fullName.trim(),
      phone: phone.trim() || '+8801700000000',
      district: district.trim() || 'Dhaka',
      passportNumber: passportNumber.trim().toUpperCase() || 'PENDING',
      gender,
      age,
      heightCm,
      weightKg,
      originCountry,
      originHub: originHub.trim() || 'Central Hub',
      partnerAgency: originCountry === 'Bangladesh' ? 'Silver Group' : 'Vietnam Partner',
      tradeSector: tradeSector.trim(),
      jlptLevel,
      visaProgram,
      stage: 'Screening',
      assignedRequisitionId: assignedRequisitionId || null,
      targetPrefecture: selectedReq?.prefecture ?? 'Hung Yen, Vietnam',
      interviewDate: today,
      updatedAt: today,
      eligible: age >= 20 && age <= 45 && heightCm >= 160 && weightKg >= 55,
      checklist: {
        passportVerified: Boolean(passportNumber.trim()),
        medicalCleared: false,
        languagePassed: false,
        coeSubmitted: false,
        visaStamped: false,
        flightBriefed: false,
      },
    };

    onSubmit(newCandidate);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-candidate-title"
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-[0_0_40px_rgba(255,85,0,0.25)]">
        <div className="px-6 py-4 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between">
          <h2 id="register-candidate-title" className="text-lg font-bold text-white uppercase">
            {t.actions.registerCandidate}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.close}
            className="p-2 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cand-name" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.fullName}
              </label>
              <input
                id="cand-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Tasnim Akter"
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cand-phone" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.wizard.phone}
              </label>
              <input
                id="cand-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cand-country" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.origin}
              </label>
              <select
                id="cand-country"
                value={originCountry}
                onChange={(e) => handleCountryChange(e.target.value as SourceCountry)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="Bangladesh">Bangladesh (Silver Group)</option>
                <option value="Vietnam">Vietnam (Vietnam Partner)</option>
              </select>
            </div>

            <div>
              <label htmlFor="cand-district" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.wizard.district}
              </label>
              <input
                id="cand-district"
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cand-passport" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.wizard.passportNumber}
              </label>
              <input
                id="cand-passport"
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                placeholder="A01234567"
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-sm uppercase focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label htmlFor="cand-gender" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.wizard.gender}
              </label>
              <select
                id="cand-gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as 'Female' | 'Male')}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div>
              <label htmlFor="cand-age" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.wizard.age}
              </label>
              <input
                id="cand-age"
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="cand-ht" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                CM
              </label>
              <input
                id="cand-ht"
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="cand-wt" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                KG
              </label>
              <input
                id="cand-wt"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cand-sector" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.sector}
              </label>
              <input
                id="cand-sector"
                type="text"
                required
                value={tradeSector}
                onChange={(e) => setTradeSector(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="cand-lang" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.language}
              </label>
              <select
                id="cand-lang"
                value={jlptLevel}
                onChange={(e) => setJlptLevel(e.target.value as Candidate['jlptLevel'])}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="English Ready">English Ready</option>
                <option value="JFT-Basic A2">JFT-Basic A2</option>
                <option value="N5">JLPT N5</option>
                <option value="N4">JLPT N4</option>
                <option value="N3">JLPT N3</option>
                <option value="N2">JLPT N2</option>
              </select>
            </div>

            <div>
              <label htmlFor="cand-prog" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.program}
              </label>
              <select
                id="cand-prog"
                value={visaProgram}
                onChange={(e) => setVisaProgram(e.target.value as VisaProgram)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="Industrial Work Permit">Industrial Work Permit</option>
                <option value="SSW (i)">SSW (i)</option>
                <option value="TITP">TITP</option>
                <option value="Engineer / Specialist">Engineer / Specialist</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="cand-req" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
              {t.labels.employer}
            </label>
            <select
              id="cand-req"
              value={assignedRequisitionId}
              onChange={(e) => setAssignedRequisitionId(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
            >
              <option value="">Unassigned (Pool)</option>
              {requisitions.map((req) => (
                <option key={req.id} value={req.id}>
                  {req.id} — {req.employerName} ({req.prefecture})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t-2 border-[#27272a] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[54px] px-5 text-xs font-bold text-white border-2 border-[#27272a] hover:border-white cursor-pointer"
            >
              {t.actions.cancel}
            </button>
            <button
              type="submit"
              className="min-h-[54px] px-6 text-xs font-bold text-black bg-[#FF5500] hover:bg-[#ff6a1a] cursor-pointer"
            >
              {t.actions.save}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

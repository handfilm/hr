import { FormEvent, useState } from 'react';
import { X } from 'lucide-react';
import type { JobRequisition, VisaProgram } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface CreateRequisitionModalProps {
  t: Translations;
  onClose: () => void;
  onSubmit: (requisition: JobRequisition) => void;
}

export function CreateRequisitionModal({
  t,
  onClose,
  onSubmit,
}: CreateRequisitionModalProps) {
  const [employerName, setEmployerName] = useState('');
  const [country, setCountry] = useState<'JP' | 'VN'>('JP');
  const [prefecture, setPrefecture] = useState('Tokyo, Japan');
  const [sector, setSector] = useState('Industrial Manufacturing (CNC)');
  const [visaProgram, setVisaProgram] = useState<VisaProgram>('SSW (i)');
  const [jlptRequired, setJlptRequired] = useState<JobRequisition['jlptRequired']>('N4');
  const [monthlySalaryJpy, setMonthlySalaryJpy] = useState(220000);
  const [openQuota, setOpenQuota] = useState(10);
  const [preferredCorridor, setPreferredCorridor] =
    useState<JobRequisition['preferredCorridor']>('Bangladesh & Vietnam');
  const [deadline, setDeadline] = useState('2027-02-15');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!employerName.trim()) return;

    const salaryNum = Number(monthlySalaryJpy) || 210000;
    const newReq: JobRequisition = {
      id: `REQ-${country}-${Math.floor(120 + Math.random() * 800)}`,
      title: sector.trim(),
      employerName: employerName.trim(),
      country,
      prefecture: prefecture.trim() || 'Tokyo, Japan',
      sector: sector.trim(),
      visaProgram,
      jlptRequired,
      monthlySalaryDisplay:
        country === 'VN'
          ? `$${Math.round(salaryNum / 152)} USD / MO`
          : `¥${salaryNum.toLocaleString()} JPY`,
      monthlySalaryJpy: salaryNum,
      salaryUsd: Math.round(salaryNum / 150),
      openQuota: Math.max(1, Number(openQuota) || 1),
      lockedSlots: 0,
      confirmedSlots: 0,
      filledCount: 0,
      preferredCorridor,
      coordinator: country === 'VN' ? 'Silver Group × Vietnam Partner' : 'Kenji Hara',
      deadline,
      status: 'Open',
    };

    onSubmit(newReq);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-req-title"
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-lg overflow-hidden shadow-[0_0_40px_rgba(255,85,0,0.25)]">
        <div className="px-6 py-4 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between">
          <h2 id="create-req-title" className="text-lg font-bold text-white uppercase">
            {t.actions.createRequisition}
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="req-emp" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.employer}
              </label>
              <input
                id="req-emp"
                type="text"
                required
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                placeholder="e.g. Yamato Logistics Engineering K.K."
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="req-country" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                DESTINATION
              </label>
              <select
                id="req-country"
                value={country}
                onChange={(e) => setCountry(e.target.value as 'JP' | 'VN')}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="JP">Japan (JP)</option>
                <option value="VN">Vietnam (VN)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="req-pref" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.prefecture}
              </label>
              <input
                id="req-pref"
                type="text"
                required
                value={prefecture}
                onChange={(e) => setPrefecture(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="req-sector" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.sector}
              </label>
              <input
                id="req-sector"
                type="text"
                required
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="req-prog" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.program}
              </label>
              <select
                id="req-prog"
                value={visaProgram}
                onChange={(e) => setVisaProgram(e.target.value as VisaProgram)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="SSW (i)">SSW (i)</option>
                <option value="TITP">TITP</option>
                <option value="Industrial Work Permit">Industrial Work Permit</option>
                <option value="Engineer / Specialist">Engineer / Specialist</option>
              </select>
            </div>

            <div>
              <label htmlFor="req-jlpt" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.language}
              </label>
              <select
                id="req-jlpt"
                value={jlptRequired}
                onChange={(e) =>
                  setJlptRequired(e.target.value as JobRequisition['jlptRequired'])
                }
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="English Ready">English Ready</option>
                <option value="JFT-Basic A2">JFT-Basic A2</option>
                <option value="N5">N5</option>
                <option value="N4">N4</option>
                <option value="N3">N3</option>
                <option value="N2">N2</option>
              </select>
            </div>

            <div>
              <label htmlFor="req-corridor" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                CORRIDOR
              </label>
              <select
                id="req-corridor"
                value={preferredCorridor}
                onChange={(e) =>
                  setPreferredCorridor(
                    e.target.value as JobRequisition['preferredCorridor'],
                  )
                }
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white text-sm focus:border-[#FF5500] focus:outline-none"
              >
                <option value="Bangladesh & Vietnam">Both (BD &amp; VN)</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="Vietnam">Vietnam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="req-salary" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.salary} (JPY)
              </label>
              <input
                id="req-salary"
                type="number"
                min={50000}
                step={1000}
                value={monthlySalaryJpy}
                onChange={(e) => setMonthlySalaryJpy(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="req-quota" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                QUOTA
              </label>
              <input
                id="req-quota"
                type="number"
                min={1}
                max={200}
                value={openQuota}
                onChange={(e) => setOpenQuota(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="req-deadline" className="block font-brutal-mono text-xs text-[#A1A1AA] mb-1">
                {t.labels.deadline}
              </label>
              <input
                id="req-deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#18181b] border-2 border-[#27272a] text-white font-brutal-mono text-sm focus:border-[#FF5500] focus:outline-none"
              />
            </div>
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

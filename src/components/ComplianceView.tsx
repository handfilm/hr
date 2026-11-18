import { CheckCircle2, Circle } from 'lucide-react';
import { Candidate, ComplianceChecklist } from '../types';
import { Translations } from '../i18n';

interface ComplianceViewProps {
  candidates: Candidate[];
  t: Translations;
  onToggleChecklist: (candidateId: string, key: keyof ComplianceChecklist) => void;
  onSelectCandidate: (candidateId: string) => void;
}

const COLUMNS: { key: keyof ComplianceChecklist; shortLabel: string }[] = [
  { key: 'passportVerified', shortLabel: 'PASSPORT' },
  { key: 'medicalCleared', shortLabel: 'MEDICAL' },
  { key: 'languagePassed', shortLabel: 'ENGLISH/JP' },
  { key: 'coeSubmitted', shortLabel: 'COE/EMBASSY' },
  { key: 'visaStamped', shortLabel: 'BMET/VISA' },
  { key: 'flightBriefed', shortLabel: 'DEPARTURE' },
];

export function ComplianceView({
  candidates,
  t,
  onToggleChecklist,
  onSelectCandidate,
}: ComplianceViewProps) {
  return (
    <div className="space-y-6">
      <div className="border-b-2 border-[#27272a] pb-4">
        <h2 className="text-2xl font-bold text-white uppercase">
          {t.labels.complianceChecklist}
        </h2>
        <p className="mt-1 font-brutal-mono text-xs text-[#A1A1AA]">
          COE / EMBASSY ATTESTATION · BMET SMART CARD · PRE-DEPARTURE CLEARANCE
        </p>
      </div>

      <div className="bg-[#121212] border-2 border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#27272a] bg-[#0a0a0a] font-brutal-mono text-xs text-[#A1A1AA]">
                <th className="py-3.5 px-5">{t.labels.fullName}</th>
                <th className="py-3.5 px-4">{t.labels.origin}</th>
                <th className="py-3.5 px-4">{t.labels.stage}</th>
                {COLUMNS.map((col) => (
                  <th key={col.key} className="py-3.5 px-3 text-center whitespace-nowrap">
                    {col.shortLabel}
                  </th>
                ))}
                <th className="py-3.5 px-5 text-right">PROGRESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-sm">
              {candidates.map((c) => {
                const completedCount = COLUMNS.filter((col) => c.checklist[col.key]).length;
                return (
                  <tr key={c.id} className="hover:bg-[#18181b] transition-colors">
                    <td className="py-3.5 px-5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onSelectCandidate(c.id)}
                        className="text-left font-bold text-white hover:text-[#FF5500] cursor-pointer"
                      >
                        {c.fullName}
                      </button>
                      <p className="font-brutal-mono text-xs text-[#FF5500] tabular-nums">{c.id}</p>
                    </td>
                    <td className="py-3.5 px-4 text-[#A1A1AA] whitespace-nowrap">
                      {c.originCountry} · {c.partnerAgency}
                    </td>
                    <td className="py-3.5 px-4 text-white font-bold whitespace-nowrap">
                      {t.stages[c.stage]}
                    </td>
                    {COLUMNS.map((col) => {
                      const checked = c.checklist[col.key];
                      return (
                        <td key={col.key} className="py-3.5 px-3 text-center">
                          <button
                            type="button"
                            onClick={() => onToggleChecklist(c.id, col.key)}
                            aria-label={`${col.shortLabel} for ${c.fullName}`}
                            className={`inline-flex items-center justify-center p-2 border-2 transition-colors cursor-pointer ${
                              checked
                                ? 'border-[#10b981] bg-[#10b981]/15'
                                : 'border-[#27272a] bg-[#0a0a0a] hover:border-[#FF5500]'
                            }`}
                          >
                            {checked ? (
                              <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[#A1A1AA]" />
                            )}
                          </button>
                        </td>
                      );
                    })}
                    <td className="py-3.5 px-5 text-right font-brutal-display text-2xl text-[#f59e0b] tabular-nums whitespace-nowrap">
                      {completedCount} / {COLUMNS.length}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

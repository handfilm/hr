import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import type { Candidate, JobRequisition } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface JobOrdersViewProps {
  requisitions: JobRequisition[];
  candidates: Candidate[];
  t: Translations;
  onOpenCreateModal: () => void;
  onSelectCandidate: (candidateId: string) => void;
}

export function JobOrdersView({
  requisitions,
  candidates,
  t,
  onOpenCreateModal,
  onSelectCandidate,
}: JobOrdersViewProps) {
  const [corridorFilter, setCorridorFilter] = useState<'ALL' | 'Bangladesh' | 'Vietnam'>('ALL');

  const filteredReqs = useMemo(() => {
    if (corridorFilter === 'ALL') return requisitions;
    return requisitions.filter(
      (r) =>
        r.preferredCorridor === corridorFilter ||
        r.preferredCorridor === 'Bangladesh & Vietnam',
    );
  }, [requisitions, corridorFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center p-1 bg-[#121212] border-2 border-[#27272a] self-start">
          {(['ALL', 'Bangladesh', 'Vietnam'] as const).map((corridor) => (
            <button
              key={corridor}
              type="button"
              onClick={() => setCorridorFilter(corridor)}
              className={`px-4 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                corridorFilter === corridor
                  ? 'bg-[#FF5500] text-black'
                  : 'text-[#A1A1AA] hover:text-white'
              }`}
            >
              {corridor === 'ALL' ? t.labels.allCountries : corridor}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpenCreateModal}
          className="min-h-[56px] px-6 text-xs font-bold text-black bg-[#FF5500] hover:bg-[#ff6a1a] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" aria-hidden="true" />
          <span>{t.actions.createRequisition}</span>
        </button>
      </div>

      <div className="bg-[#121212] border-2 border-[#27272a] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#27272a] bg-[#0a0a0a] font-brutal-mono text-xs text-[#A1A1AA]">
                <th className="py-3.5 px-5">ORDER ID</th>
                <th className="py-3.5 px-4">{t.labels.employer}</th>
                <th className="py-3.5 px-4">{t.labels.prefecture}</th>
                <th className="py-3.5 px-4">{t.labels.sector}</th>
                <th className="py-3.5 px-4">{t.labels.language}</th>
                <th className="py-3.5 px-4 text-right">{t.labels.salary}</th>
                <th className="py-3.5 px-4 text-right">LOCKS / {t.labels.quota}</th>
                <th className="py-3.5 px-5 text-right">{t.labels.deadline}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-sm">
              {filteredReqs.map((req) => {
                const matched = candidates.filter((c) => c.assignedRequisitionId === req.id);
                const used = req.lockedSlots + req.confirmedSlots;
                return (
                  <tr key={req.id} className="hover:bg-[#18181b] transition-colors">
                    <td className="py-4 px-5 font-brutal-mono text-xs font-bold text-[#FF5500] tabular-nums whitespace-nowrap">
                      {req.id}
                    </td>
                    <td className="py-4 px-4">
                      <p className="font-bold text-white">{req.employerName}</p>
                      <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-0.5">
                        {req.title} · {req.coordinator}
                      </p>
                      {matched.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2 text-xs">
                          {matched.map((m) => (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => onSelectCandidate(m.id)}
                              className="px-2 py-1 bg-[#0a0a0a] border border-[#27272a] hover:border-[#FF5500] font-brutal-mono text-[11px] text-[#10b981] cursor-pointer"
                            >
                              {m.fullName}
                            </button>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-white whitespace-nowrap">
                      {req.prefecture}
                    </td>
                    <td className="py-4 px-4 text-[#A1A1AA] whitespace-nowrap">
                      {req.sector}
                    </td>
                    <td className="py-4 px-4 font-brutal-mono text-xs text-[#f59e0b] whitespace-nowrap">
                      {req.jlptRequired} · {req.visaProgram}
                    </td>
                    <td className="py-4 px-4 text-right font-brutal-mono font-bold text-white tabular-nums whitespace-nowrap">
                      {req.monthlySalaryDisplay}
                    </td>
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <span className="font-brutal-display text-2xl text-[#FF5500] tabular-nums block">
                        {used} / {req.openQuota}
                      </span>
                      <span className="font-brutal-mono text-[10px] text-[#A1A1AA] tabular-nums">
                        {req.lockedSlots} LOCKED · {req.confirmedSlots} CONF
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right font-brutal-mono text-xs text-[#A1A1AA] tabular-nums whitespace-nowrap">
                      {req.deadline}
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

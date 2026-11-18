import { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Circle, Download, MessageCircle, Search, X } from 'lucide-react';
import {
  Candidate,
  ComplianceChecklist,
  JobRequisition,
  PipelineStage,
  SourceCountry,
} from '../types';
import { PIPELINE_STAGES } from '../data/initialData';
import { Translations } from '../i18n';

interface CandidatesViewProps {
  candidates: Candidate[];
  requisitions: JobRequisition[];
  vietnamPartnerName: string;
  t: Translations;
  selectedCandidateId: string | null;
  onSelectCandidate: (id: string | null) => void;
  onAdvanceStage: (id: string) => void;
  onToggleChecklist: (id: string, key: keyof ComplianceChecklist) => void;
  onAssignRequisition: (candidateId: string, reqId: string | null) => void;
  onOpenRegisterModal: () => void;
}

const CHECKLIST_LABELS: { key: keyof ComplianceChecklist; label: string }[] = [
  { key: 'passportVerified', label: 'Passport Validated (18+ months)' },
  { key: 'medicalCleared', label: 'Designated Medical Clearance' },
  { key: 'languagePassed', label: 'English / JLPT Language Pass' },
  { key: 'coeSubmitted', label: 'COE / Embassy Attestation Filed' },
  { key: 'visaStamped', label: 'BMET Smart Card / Visa Stamped' },
  { key: 'flightBriefed', label: 'Pre-Departure & Flight Briefed' },
];

export function CandidatesView({
  candidates,
  requisitions,
  vietnamPartnerName,
  t,
  selectedCandidateId,
  onSelectCandidate,
  onAdvanceStage,
  onToggleChecklist,
  onAssignRequisition,
  onOpenRegisterModal,
}: CandidatesViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<'ALL' | SourceCountry>('ALL');
  const [stageFilter, setStageFilter] = useState<'ALL' | PipelineStage>('ALL');

  const filteredCandidates = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return candidates.filter((c) => {
      if (countryFilter !== 'ALL' && c.originCountry !== countryFilter) return false;
      if (stageFilter !== 'ALL' && c.stage !== stageFilter) return false;
      if (!q) return true;
      return (
        c.fullName.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q) ||
        c.tradeSector.toLowerCase().includes(q) ||
        c.targetPrefecture.toLowerCase().includes(q)
      );
    });
  }, [candidates, searchQuery, countryFilter, stageFilter]);

  const selectedCandidate = useMemo(
    () => candidates.find((c) => c.id === selectedCandidateId) ?? null,
    [candidates, selectedCandidateId],
  );

  const handleExportCsv = () => {
    const headers = [
      'Tracking ID',
      'Name',
      'Phone',
      'Origin Country',
      'Partner',
      'Trade Sector',
      'Language',
      'Program',
      'Stage',
      'Destination',
      'Requisition ID',
    ];
    const rows = filteredCandidates.map((c) => [
      c.id,
      c.fullName,
      c.phone,
      c.originCountry,
      c.partnerAgency === 'Vietnam Partner' ? vietnamPartnerName : c.partnerAgency,
      c.tradeSector,
      c.jlptLevel,
      c.visaProgram,
      c.stage,
      c.targetPrefecture,
      c.assignedRequisitionId ?? 'Unassigned',
    ]);
    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hands-and-head-candidates.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Filter & Action Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="w-5 h-5 text-[#FF5500] absolute left-4 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.labels.searchCandidates}
            className="w-full min-h-[56px] pl-12 pr-4 text-sm bg-[#121212] border-2 border-[#27272a] focus:border-[#FF5500] text-white placeholder:text-[#A1A1AA] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center p-1 bg-[#121212] border-2 border-[#27272a]">
            {(['ALL', 'Bangladesh', 'Vietnam'] as const).map((corridor) => (
              <button
                key={corridor}
                type="button"
                onClick={() => setCountryFilter(corridor)}
                className={`px-3.5 py-2.5 text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  countryFilter === corridor
                    ? 'bg-[#FF5500] text-black'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                {corridor === 'ALL' ? t.labels.allCountries : corridor}
              </button>
            ))}
          </div>

          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value as 'ALL' | PipelineStage)}
            aria-label={t.labels.stage}
            className="min-h-[52px] px-4 text-xs font-bold bg-[#121212] border-2 border-[#27272a] text-white focus:border-[#FF5500] focus:outline-none"
          >
            <option value="ALL">{t.labels.allStages}</option>
            {PIPELINE_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {t.stages[stage]}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleExportCsv}
            className="min-h-[52px] px-5 text-xs font-bold text-black bg-[#10b981] hover:bg-[#34d399] transition-colors flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>{t.actions.exportCsv}</span>
          </button>
        </div>
      </div>

      {/* Main Split: Table + Optional Detail Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div
          className={`bg-[#121212] border-2 border-[#27272a] overflow-hidden ${
            selectedCandidate ? 'xl:col-span-8' : 'xl:col-span-12'
          }`}
        >
          {filteredCandidates.length === 0 ? (
            <div className="py-16 px-6 text-center space-y-4">
              <p className="text-base font-bold text-[#A1A1AA]">{t.labels.noResults}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCountryFilter('ALL');
                    setStageFilter('ALL');
                  }}
                  className="min-h-[54px] px-5 text-xs font-bold text-white border-2 border-[#27272a] hover:border-[#FF5500] cursor-pointer"
                >
                  {t.actions.resetFilters}
                </button>
                <button
                  type="button"
                  onClick={onOpenRegisterModal}
                  className="min-h-[54px] px-5 text-xs font-bold text-black bg-[#FF5500] hover:bg-[#ff6a1a] cursor-pointer"
                >
                  {t.actions.registerCandidate}
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-[#27272a] bg-[#0a0a0a] font-brutal-mono text-xs text-[#A1A1AA]">
                    <th className="py-3.5 px-4">{t.labels.candidateId}</th>
                    <th className="py-3.5 px-4">{t.labels.fullName}</th>
                    <th className="py-3.5 px-4">{t.labels.origin}</th>
                    <th className="py-3.5 px-4">{t.labels.sector}</th>
                    <th className="py-3.5 px-4">{t.labels.language}</th>
                    <th className="py-3.5 px-4">{t.labels.prefecture}</th>
                    <th className="py-3.5 px-4 text-right">{t.labels.stage}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272a] text-sm">
                  {filteredCandidates.map((c) => {
                    const isSelected = c.id === selectedCandidateId;
                    return (
                      <tr
                        key={c.id}
                        onClick={() => onSelectCandidate(isSelected ? null : c.id)}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-[#18181b] outline outline-2 outline-[#FF5500]' : 'hover:bg-[#18181b]'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-brutal-mono text-xs text-[#FF5500] font-bold tabular-nums whitespace-nowrap">
                          {c.id}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <p className="font-bold text-white">{c.fullName}</p>
                          <p className="font-brutal-mono text-[11px] text-[#A1A1AA]">{c.phone}</p>
                        </td>
                        <td className="py-3.5 px-4 text-[#A1A1AA] whitespace-nowrap">
                          {c.originCountry} ·{' '}
                          {c.partnerAgency === 'Vietnam Partner'
                            ? vietnamPartnerName
                            : c.partnerAgency}
                        </td>
                        <td className="py-3.5 px-4 text-white whitespace-nowrap">
                          {c.tradeSector}
                        </td>
                        <td className="py-3.5 px-4 font-brutal-mono text-xs text-[#f59e0b] whitespace-nowrap">
                          {c.jlptLevel} · {c.visaProgram}
                        </td>
                        <td className="py-3.5 px-4 text-[#A1A1AA] whitespace-nowrap">
                          {c.targetPrefecture}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-[#10b981] whitespace-nowrap">
                          {t.stages[c.stage]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {selectedCandidate && (
          <aside className="xl:col-span-4 bg-[#121212] border-2 border-[#FF5500] p-5 space-y-5 shadow-[0_0_30px_rgba(255,85,0,0.18)]">
            <div className="flex items-start justify-between gap-4 border-b-2 border-[#27272a] pb-4">
              <div>
                <p className="font-brutal-mono text-xs text-[#FF5500] font-bold tabular-nums">
                  {selectedCandidate.id} · {selectedCandidate.originCountry}
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  {selectedCandidate.fullName}
                </h2>
                <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-0.5">
                  {selectedCandidate.phone} · {selectedCandidate.district}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onSelectCandidate(null)}
                aria-label={t.actions.close}
                className="p-2 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-[#18181b] border-2 border-[#27272a] p-3.5">
              <div>
                <p className="font-brutal-mono text-[#A1A1AA]">GENDER / AGE</p>
                <p className="mt-0.5 font-bold text-white tabular-nums">
                  {selectedCandidate.gender} · {selectedCandidate.age} YRS
                </p>
              </div>
              <div>
                <p className="font-brutal-mono text-[#A1A1AA]">PHYSICAL</p>
                <p className="mt-0.5 font-brutal-mono font-bold text-white tabular-nums">
                  {selectedCandidate.heightCm} CM / {selectedCandidate.weightKg} KG
                </p>
              </div>
              <div>
                <p className="font-brutal-mono text-[#A1A1AA]">PASSPORT</p>
                <p className="mt-0.5 font-brutal-mono font-bold text-white">
                  {selectedCandidate.passportNumber}
                </p>
              </div>
              <div>
                <p className="font-brutal-mono text-[#A1A1AA]">ELIGIBILITY</p>
                <p
                  className={`mt-0.5 font-brutal-mono font-bold ${
                    selectedCandidate.eligible ? 'text-[#10b981]' : 'text-[#e11d48]'
                  }`}
                >
                  {selectedCandidate.eligible ? '100% ELIGIBLE' : 'REVIEW'}
                </p>
              </div>
            </div>

            <div className="space-y-2 border-t-2 border-[#27272a] pt-4">
              <label
                htmlFor="assign-req"
                className="block font-brutal-mono text-xs text-[#A1A1AA] uppercase"
              >
                {t.labels.employer}
              </label>
              <select
                id="assign-req"
                value={selectedCandidate.assignedRequisitionId ?? ''}
                onChange={(e) =>
                  onAssignRequisition(
                    selectedCandidate.id,
                    e.target.value ? e.target.value : null,
                  )
                }
                className="w-full min-h-[48px] px-3 text-xs font-bold bg-[#18181b] border-2 border-[#27272a] text-white focus:border-[#FF5500] focus:outline-none"
              >
                <option value="">Unassigned</option>
                {requisitions.map((req) => (
                  <option key={req.id} value={req.id}>
                    {req.id} — {req.employerName} ({req.prefecture})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5 border-t-2 border-[#27272a] pt-4">
              <h3 className="font-brutal-mono text-xs font-bold text-[#f59e0b] uppercase">
                {t.labels.complianceChecklist}
              </h3>
              <div className="space-y-2">
                {CHECKLIST_LABELS.map((item) => {
                  const done = selectedCandidate.checklist[item.key];
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => onToggleChecklist(selectedCandidate.id, item.key)}
                      className={`w-full min-h-[44px] px-3 border-2 flex items-center gap-2.5 text-left text-xs transition-colors cursor-pointer ${
                        done
                          ? 'border-[#10b981] bg-[#10b981]/10 text-white'
                          : 'border-[#27272a] bg-[#18181b] text-[#A1A1AA] hover:border-[#FF5500]'
                      }`}
                    >
                      {done ? (
                        <CheckCircle2
                          className="w-4 h-4 text-[#10b981] shrink-0"
                          aria-hidden="true"
                        />
                      ) : (
                        <Circle
                          className="w-4 h-4 text-[#27272a] shrink-0"
                          aria-hidden="true"
                        />
                      )}
                      <span className="font-bold">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3 pt-2">
              {selectedCandidate.stage !== 'Deployed' && (
                <button
                  type="button"
                  onClick={() => onAdvanceStage(selectedCandidate.id)}
                  className="w-full min-h-[68px] px-5 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>{t.actions.advanceStage}</span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              )}

              <a
                href={`https://wa.me/${selectedCandidate.phone.replace(/[^\d]/g, '')}?text=${encodeURIComponent(
                  `Hands & Head HR Status Update\nTracking ID: ${selectedCandidate.id}\nCandidate: ${selectedCandidate.fullName}\nCurrent Stage: ${t.stages[selectedCandidate.stage]}\nDestination: ${selectedCandidate.targetPrefecture}`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[60px] px-5 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{t.actions.sendWhatsappStatus}</span>
              </a>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

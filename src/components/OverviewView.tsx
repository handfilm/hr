import { ArrowRight } from 'lucide-react';
import { Candidate, JobRequisition, WorkspaceTab } from '../types';
import { PIPELINE_STAGES } from '../data/initialData';
import { Translations } from '../i18n';

interface OverviewViewProps {
  candidates: Candidate[];
  requisitions: JobRequisition[];
  t: Translations;
  onNavigate: (tab: WorkspaceTab) => void;
  onSelectCandidate: (candidateId: string) => void;
}

export function OverviewView({
  candidates,
  requisitions,
  t,
  onNavigate,
  onSelectCandidate,
}: OverviewViewProps) {
  const totalOpenQuotas = requisitions.reduce(
    (sum, req) => sum + Math.max(0, req.openQuota - req.filledCount),
    0,
  );
  const coeInProgress = candidates.filter(
    (c) =>
      c.stage === 'COE / Embassy Attestation' ||
      c.stage === 'BMET Smart Card' ||
      c.stage === 'Medical Fit',
  ).length;
  const deployedCount = candidates.filter((c) => c.stage === 'Deployed').length;

  const bdCandidates = candidates.filter((c) => c.originCountry === 'Bangladesh');
  const vnCandidates = candidates.filter((c) => c.originCountry === 'Vietnam');

  const stageCounts = PIPELINE_STAGES.map((stage) => ({
    stage,
    label: t.stages[stage],
    count: candidates.filter((c) => c.stage === stage).length,
  }));

  const maxStageCount = Math.max(1, ...stageCounts.map((s) => s.count));

  const upcomingActions = candidates
    .filter((c) => c.stage !== 'Deployed')
    .slice(0, 6);

  return (
    <div className="space-y-8">
      <div className="border-b-2 border-[#27272a] pb-5">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          {t.corridors.heading}
        </h1>
        <p className="mt-1 font-brutal-mono text-xs text-[#A1A1AA]">
          {t.portalSubtitle}
        </p>
      </div>

      {/* Top KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-[#121212] border-2 border-[#FF5500] p-5">
          <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
            {t.metrics.activeCandidates}
          </p>
          <p className="mt-2 font-brutal-display text-5xl text-white tabular-nums">
            {candidates.length}
          </p>
          <p className="mt-2 font-brutal-mono text-xs text-[#FF5500] tabular-nums">
            BD {bdCandidates.length} · VN {vnCandidates.length}
          </p>
        </div>

        <div className="bg-[#121212] border-2 border-[#e11d48] p-5">
          <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
            {t.metrics.openQuotas}
          </p>
          <p className="mt-2 font-brutal-display text-5xl text-[#e11d48] tabular-nums">
            {totalOpenQuotas}
          </p>
          <p className="mt-2 font-brutal-mono text-xs text-[#A1A1AA] tabular-nums">
            {requisitions.filter((r) => r.status !== 'Closed').length} ACTIVE ORDERS
          </p>
        </div>

        <div className="bg-[#121212] border-2 border-[#f59e0b] p-5">
          <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
            {t.metrics.coeProcessing}
          </p>
          <p className="mt-2 font-brutal-display text-5xl text-[#f59e0b] tabular-nums">
            {coeInProgress}
          </p>
          <p className="mt-2 font-brutal-mono text-xs text-[#A1A1AA]">
            IMMIGRATION &amp; BMET QUEUE
          </p>
        </div>

        <div className="bg-[#121212] border-2 border-[#10b981] p-5">
          <p className="font-brutal-mono text-xs text-[#A1A1AA] uppercase">
            {t.metrics.deployedTotal}
          </p>
          <p className="mt-2 font-brutal-display text-5xl text-[#10b981] tabular-nums">
            {deployedCount}
          </p>
          <p className="mt-2 font-brutal-mono text-xs text-[#A1A1AA]">
            ACTIVE ON SITE
          </p>
        </div>
      </div>

      {/* Corridor Summary & 7-Stage Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 bg-[#121212] border-2 border-[#27272a] p-6">
          <div className="flex items-center justify-between mb-6 gap-4">
            <h2 className="text-lg font-bold text-white uppercase">
              7-STAGE PIPELINE FUNNEL
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('candidates')}
              className="px-4 py-2 border-2 border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-brutal-mono text-xs font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer transition-colors"
            >
              <span>{t.nav.candidates}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="space-y-4">
            {stageCounts.map((item) => {
              const widthPct = Math.round((item.count / maxStageCount) * 100);
              return (
                <div key={item.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-bold text-white">{item.label}</span>
                    <span className="font-brutal-mono text-sm font-bold text-[#FF5500] tabular-nums">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-3 w-full bg-[#18181b] border border-[#27272a] overflow-hidden">
                    <div
                      className="h-full bg-[#FF5500] transition-all"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="lg:col-span-5 bg-[#121212] border-2 border-[#27272a] p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white uppercase mb-5">
              PARTNER DESK SYNCHRONIZATION
            </h2>
            <div className="space-y-3">
              <div className="bg-[#18181b] border-2 border-[#27272a] p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white">SILVER GROUP</h3>
                  <span className="font-brutal-mono text-xs text-[#FF5500] tabular-nums">
                    {bdCandidates.length} CANDIDATES
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A1A1AA]">{t.corridors.bangladeshSub}</p>
              </div>

              <div className="bg-[#18181b] border-2 border-[#27272a] p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white">VIETNAM PARTNER</h3>
                  <span className="font-brutal-mono text-xs text-[#10b981] tabular-nums">
                    {vnCandidates.length} CANDIDATES
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A1A1AA]">{t.corridors.vietnamSub}</p>
              </div>

              <div className="bg-[#18181b] border-2 border-[#27272a] p-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base font-bold text-white">HARA INTERNATIONAL</h3>
                  <span className="font-brutal-mono text-xs text-[#f59e0b] tabular-nums">
                    {requisitions.length} ORDERS
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A1A1AA]">{t.corridors.japanSub}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('partners')}
            className="mt-6 w-full min-h-[60px] border-2 border-[#27272a] hover:border-[#FF5500] bg-[#18181b] text-white font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.nav.partners}
          </button>
        </section>
      </div>

      {/* Priority Active Queue */}
      <section className="bg-[#121212] border-2 border-[#27272a] overflow-hidden">
        <div className="px-6 py-4 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white uppercase">
            ACTIVE PROCESSING QUEUE
          </h2>
          <button
            type="button"
            onClick={() => onNavigate('compliance')}
            className="px-4 py-2 border-2 border-[#f59e0b] text-[#f59e0b] hover:bg-[#f59e0b] hover:text-black font-brutal-mono text-xs font-bold whitespace-nowrap cursor-pointer transition-colors"
          >
            {t.nav.compliance}
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#27272a] bg-[#0a0a0a] font-brutal-mono text-xs text-[#A1A1AA]">
                <th className="py-3.5 px-6">{t.labels.candidateId}</th>
                <th className="py-3.5 px-4">{t.labels.fullName}</th>
                <th className="py-3.5 px-4">{t.labels.origin}</th>
                <th className="py-3.5 px-4">{t.labels.sector}</th>
                <th className="py-3.5 px-4">{t.labels.prefecture}</th>
                <th className="py-3.5 px-6 text-right">{t.labels.stage}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#27272a] text-sm">
              {upcomingActions.map((candidate) => (
                <tr
                  key={candidate.id}
                  onClick={() => {
                    onSelectCandidate(candidate.id);
                    onNavigate('candidates');
                  }}
                  className="hover:bg-[#18181b] cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-6 font-brutal-mono text-xs text-[#FF5500] font-bold tabular-nums whitespace-nowrap">
                    {candidate.id}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white whitespace-nowrap">
                    {candidate.fullName}
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A1AA] whitespace-nowrap">
                    {candidate.partnerAgency} · {candidate.originCountry}
                  </td>
                  <td className="py-3.5 px-4 text-[#A1A1AA] whitespace-nowrap">
                    {candidate.tradeSector}
                  </td>
                  <td className="py-3.5 px-4 text-white whitespace-nowrap">
                    {candidate.targetPrefecture}
                  </td>
                  <td className="py-3.5 px-6 text-right font-bold text-[#10b981] whitespace-nowrap">
                    {t.stages[candidate.stage]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import { useMemo } from 'react';
import { ArrowRight, BarChart3, TrendingUp } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Candidate, JobRequisition, WorkspaceTab } from '../types';
import { PIPELINE_STAGES } from '../data/initialData';
import { Translations } from '../i18n';

interface OverviewViewProps {
  candidates: Candidate[];
  requisitions: JobRequisition[];
  vietnamPartnerName: string;
  t: Translations;
  onNavigate: (tab: WorkspaceTab) => void;
  onSelectCandidate: (candidateId: string) => void;
}

const STAGE_CHART_COLORS: Record<string, string> = {
  'Application Submitted': '#71717a',
  Screening: '#a1a1aa',
  'Online Interview': '#38bdf8',
  'Medical Fit': '#10b981',
  'COE / Embassy Attestation': '#f59e0b',
  'BMET Smart Card': '#FF5500',
  Deployed: '#22c55e',
};

const STAGE_SHORT_LABELS: Record<string, string> = {
  'Application Submitted': 'Submitted',
  Screening: 'Screening',
  'Online Interview': 'Interview',
  'Medical Fit': 'Medical',
  'COE / Embassy Attestation': 'Attestation',
  'BMET Smart Card': 'Smart Card',
  Deployed: 'Deployed',
};

const BASELINE_MONTHLY_VOLUME: { monthKey: string; label: string; baseApps: number; baseCleared: number }[] = [
  { monthKey: '2026-07', label: 'JUL 26', baseApps: 12, baseCleared: 9 },
  { monthKey: '2026-08', label: 'AUG 26', baseApps: 18, baseCleared: 14 },
  { monthKey: '2026-09', label: 'SEP 26', baseApps: 24, baseCleared: 19 },
  { monthKey: '2026-10', label: 'OCT 26', baseApps: 31, baseCleared: 25 },
  { monthKey: '2026-11', label: 'NOV 26', baseApps: 38, baseCleared: 29 },
  { monthKey: '2026-12', label: 'DEC 26', baseApps: 44, baseCleared: 36 },
];

export function OverviewView({
  candidates,
  requisitions,
  vietnamPartnerName,
  t,
  onNavigate,
  onSelectCandidate,
}: OverviewViewProps) {
  const totalOpenQuotas = requisitions.reduce(
    (sum, req) => sum + Math.max(0, req.openQuota - req.filledCount),
    0,
  );
  const medicalCount = candidates.filter((c) => c.stage === 'Medical Fit').length;
  const attestationCount = candidates.filter(
    (c) => c.stage === 'COE / Embassy Attestation',
  ).length;
  const smartCardCount = candidates.filter((c) => c.stage === 'BMET Smart Card').length;
  const coeInProgress = medicalCount + attestationCount + smartCardCount;
  const deployedCount = candidates.filter((c) => c.stage === 'Deployed').length;

  const bdCandidates = candidates.filter((c) => c.originCountry === 'Bangladesh');
  const vnCandidates = candidates.filter((c) => c.originCountry === 'Vietnam');

  const stageCounts = useMemo(
    () =>
      PIPELINE_STAGES.map((stage) => ({
        stage,
        shortLabel: STAGE_SHORT_LABELS[stage] ?? stage,
        label: t.stages[stage],
        count: candidates.filter((c) => c.stage === stage).length,
        fill: STAGE_CHART_COLORS[stage] ?? '#FF5500',
      })),
    [candidates, t.stages],
  );

  const maxStageCount = Math.max(1, ...stageCounts.map((s) => s.count));

  const monthlyTrendData = useMemo(() => {
    const liveMonthApps = new Map<string, number>();
    const liveMonthCleared = new Map<string, number>();

    for (const c of candidates) {
      const monthKey = (c.updatedAt || c.interviewDate || '2026-11').slice(0, 7);
      liveMonthApps.set(monthKey, (liveMonthApps.get(monthKey) ?? 0) + 1);
      if (
        c.stage === 'Medical Fit' ||
        c.stage === 'COE / Embassy Attestation' ||
        c.stage === 'BMET Smart Card' ||
        c.stage === 'Deployed'
      ) {
        liveMonthCleared.set(monthKey, (liveMonthCleared.get(monthKey) ?? 0) + 1);
      }
    }

    return BASELINE_MONTHLY_VOLUME.map((m) => ({
      month: m.label,
      applications: m.baseApps + (liveMonthApps.get(m.monthKey) ?? 0),
      cleared: m.baseCleared + (liveMonthCleared.get(m.monthKey) ?? 0),
    }));
  }, [candidates]);

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
          Silver Group × Hara International × {vietnamPartnerName}
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
            {bdCandidates.length} DHAKA · {vnCandidates.length} HUNG YEN
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

      {/* RECRUITMENT TRENDS DASHBOARD (RECHARTS) */}
      <section className="space-y-4" aria-labelledby="recruitment-trends-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b-2 border-[#27272a] pb-4">
          <div>
            <div className="flex items-center gap-2 text-[#FF5500]">
              <TrendingUp className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="font-brutal-mono text-xs font-bold uppercase tracking-wider">
                ANALYTICS &amp; THROUGHPUT
              </span>
            </div>
            <h2
              id="recruitment-trends-heading"
              className="mt-1 text-2xl font-bold text-white uppercase"
            >
              {t.trends.heading}
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">{t.trends.subheading}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 font-brutal-mono text-xs">
            <span className="px-3 py-1.5 bg-[#121212] border border-[#10b981] text-[#10b981] tabular-nums">
              {t.trends.medicalLabel}: {medicalCount}
            </span>
            <span className="px-3 py-1.5 bg-[#121212] border border-[#f59e0b] text-[#f59e0b] tabular-nums">
              {t.trends.attestationLabel}: {attestationCount}
            </span>
            <span className="px-3 py-1.5 bg-[#121212] border border-[#FF5500] text-[#FF5500] tabular-nums">
              {t.trends.smartCardLabel}: {smartCardCount}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Candidate Distribution by Stage */}
          <div className="lg:col-span-6 bg-[#121212] border-2 border-[#27272a] p-5 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase">
                  {t.trends.stageDistTitle}
                </h3>
                <p className="font-brutal-mono text-[11px] text-[#A1A1AA] mt-0.5">
                  {t.trends.stageDistSub}
                </p>
              </div>
              <BarChart3 className="w-5 h-5 text-[#FF5500] shrink-0" aria-hidden="true" />
            </div>

            <div className="h-[270px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stageCounts}
                  margin={{ top: 10, right: 12, left: -18, bottom: 16 }}
                >
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="shortLabel"
                    tick={{ fill: '#A1A1AA', fontSize: 10, fontFamily: 'Space Mono, monospace' }}
                    axisLine={{ stroke: '#27272a' }}
                    tickLine={false}
                    interval={0}
                    angle={-18}
                    textAnchor="end"
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#A1A1AA', fontSize: 11, fontFamily: 'Space Mono, monospace' }}
                    axisLine={{ stroke: '#27272a' }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255, 85, 0, 0.08)' }}
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '2px solid #FF5500',
                      borderRadius: '0px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontFamily: 'Space Mono, monospace',
                    }}
                    labelStyle={{ color: '#FF5500', fontWeight: 700 }}
                    formatter={(value: unknown) => [String(value ?? 0), t.labels.stage]}
                  />
                  <Bar dataKey="count" radius={[0, 0, 0, 0]} maxBarSize={38}>
                    {stageCounts.map((entry) => (
                      <Cell key={entry.stage} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Monthly Volume of Processed Applications */}
          <div className="lg:col-span-6 bg-[#121212] border-2 border-[#27272a] p-5 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase">
                  {t.trends.monthlyVolTitle}
                </h3>
                <p className="font-brutal-mono text-[11px] text-[#A1A1AA] mt-0.5">
                  {t.trends.monthlyVolSub}
                </p>
              </div>
              <div className="flex items-center gap-3 font-brutal-mono text-[10px] shrink-0">
                <span className="flex items-center gap-1 text-[#FF5500]">
                  <span className="w-2.5 h-2.5 bg-[#FF5500] inline-block" />
                  {t.trends.applicationsLabel}
                </span>
                <span className="flex items-center gap-1 text-[#10b981]">
                  <span className="w-2.5 h-2.5 bg-[#10b981] inline-block" />
                  {t.trends.clearedLabel}
                </span>
              </div>
            </div>

            <div className="h-[270px] w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={monthlyTrendData}
                  margin={{ top: 10, right: 12, left: -18, bottom: 4 }}
                >
                  <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#A1A1AA', fontSize: 11, fontFamily: 'Space Mono, monospace' }}
                    axisLine={{ stroke: '#27272a' }}
                    tickLine={false}
                  />
                  <YAxis
                    allowDecimals={false}
                    tick={{ fill: '#A1A1AA', fontSize: 11, fontFamily: 'Space Mono, monospace' }}
                    axisLine={{ stroke: '#27272a' }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255, 85, 0, 0.08)' }}
                    contentStyle={{
                      backgroundColor: '#0a0a0a',
                      border: '2px solid #FF5500',
                      borderRadius: '0px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontFamily: 'Space Mono, monospace',
                    }}
                    labelStyle={{ color: '#FF5500', fontWeight: 700 }}
                  />
                  <Bar
                    dataKey="applications"
                    name={t.trends.applicationsLabel}
                    fill="#FF5500"
                    maxBarSize={36}
                  />
                  <Line
                    type="monotone"
                    dataKey="cleared"
                    name={t.trends.clearedLabel}
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#10b981', strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: '#34d399' }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

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
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white">SILVER GROUP</h3>
                  <span className="font-brutal-mono text-xs text-[#FF5500] tabular-nums shrink-0">
                    {bdCandidates.length} CANDIDATES
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A1A1AA]">{t.corridors.bangladeshSub}</p>
              </div>

              <div className="bg-[#18181b] border-2 border-[#27272a] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white truncate">
                    {vietnamPartnerName}
                  </h3>
                  <span className="font-brutal-mono text-xs text-[#10b981] tabular-nums shrink-0">
                    {vnCandidates.length} CANDIDATES
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#A1A1AA]">{t.corridors.vietnamSub}</p>
              </div>

              <div className="bg-[#18181b] border-2 border-[#27272a] p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold text-white">HARA INTERNATIONAL</h3>
                  <span className="font-brutal-mono text-xs text-[#f59e0b] tabular-nums shrink-0">
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
                    {candidate.partnerAgency === 'Vietnam Partner'
                      ? vietnamPartnerName
                      : candidate.partnerAgency}{' '}
                    · {candidate.originCountry}
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

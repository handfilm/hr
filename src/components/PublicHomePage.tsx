import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCheck,
  MessageCircle,
  Scale,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { Candidate } from '../types';
import { PIPELINE_STAGES } from '../data/initialData';
import { Translations } from '../i18n';

interface PublicHomePageProps {
  t: Translations;
  candidates: Candidate[];
  trackerQuery: string;
  onTrackerQueryChange: (q: string) => void;
  onOpenWizard: (initialStep: 1 | 2) => void;
  onOpenLegalModal: () => void;
}

export function PublicHomePage({
  t,
  candidates,
  trackerQuery,
  onTrackerQueryChange,
  onOpenWizard,
  onOpenLegalModal,
}: PublicHomePageProps) {
  const [submittedSearch, setSubmittedSearch] = useState(trackerQuery);

  const activeSearch = (submittedSearch || trackerQuery).trim().toLowerCase();

  const trackedCandidate = useMemo(() => {
    if (!activeSearch) return candidates[0] ?? null;
    return (
      candidates.find(
        (c) =>
          c.id.toLowerCase() === activeSearch ||
          c.phone.replace(/\s+/g, '').toLowerCase().includes(activeSearch.replace(/\s+/g, '')) ||
          c.id.toLowerCase().includes(activeSearch),
      ) ?? null
    );
  }, [candidates, activeSearch]);

  const handleTrackerSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(trackerQuery);
  };

  const scrollToTracker = () => {
    const el = document.getElementById('live-tracker');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const whatsappDirectHref = `https://wa.me/8801700000000?text=${encodeURIComponent(
    'Assalamu Alaikum / Hello Silver Group & Hands & Head HR — I want to apply for the Vietnam Yarn Factory ($500 USD/mo) / Japan SSW recruitment.',
  )}`;

  const cardBorderMap = {
    orange: 'border-[#FF5500]',
    emerald: 'border-[#10b981]',
    crimson: 'border-[#e11d48]',
    gold: 'border-[#f59e0b]',
    default: 'border-[#27272a]',
  };

  const cardTextMap = {
    orange: 'text-[#FF5500]',
    emerald: 'text-[#10b981]',
    crimson: 'text-[#e11d48]',
    gold: 'text-[#f59e0b]',
    default: 'text-white',
  };

  const currentStageIdx = trackedCandidate
    ? PIPELINE_STAGES.indexOf(trackedCandidate.stage)
    : -1;

  return (
    <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-14">
      {/* HERO SECTION */}
      <section className="bg-[#121212] border-2 border-[#27272a] p-6 sm:p-10 lg:p-12 space-y-8">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#18181b] border-2 border-[#e11d48]">
          <span className="w-2.5 h-2.5 bg-[#e11d48]" aria-hidden="true" />
          <span className="font-brutal-mono text-xs sm:text-sm font-bold text-white tracking-wider">
            {t.hero.quotaPill}
          </span>
        </div>

        <div className="space-y-4 max-w-5xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] text-white text-balance">
            {t.hero.headline}
          </h1>
          <p className="font-brutal-mono text-xs sm:text-sm text-[#A1A1AA] tracking-wide">
            {t.hero.subline}
          </p>
        </div>

        {/* Two Massive Primary Buttons (min-h 76px) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onOpenWizard(1)}
            className="min-h-[76px] px-6 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-lg sm:text-xl uppercase tracking-wide flex items-center justify-between gap-4 shadow-[0_0_32px_rgba(255,85,0,0.35)] transition-all cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <ClipboardCheck className="w-7 h-7 shrink-0" aria-hidden="true" />
              <span>{t.hero.applyNow}</span>
            </span>
            <ArrowUpRight className="w-7 h-7 shrink-0" aria-hidden="true" />
          </button>

          <a
            href={whatsappDirectHref}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[76px] px-6 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-lg sm:text-xl uppercase tracking-wide flex items-center justify-between gap-4 shadow-[0_0_28px_rgba(16,185,129,0.28)] transition-all"
          >
            <span className="flex items-center gap-3">
              <MessageCircle className="w-7 h-7 shrink-0" aria-hidden="true" />
              <span>{t.hero.whatsappDirect}</span>
            </span>
            <ArrowUpRight className="w-7 h-7 shrink-0" aria-hidden="true" />
          </a>
        </div>

        {/* Two Secondary Giant Tiles (min-h 68px) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onOpenWizard(2)}
            className="min-h-[68px] px-6 bg-[#18181b] hover:border-[#FF5500] border-2 border-[#27272a] text-white font-bold text-base sm:text-lg uppercase tracking-wide flex items-center justify-between gap-4 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#FF5500] shrink-0" aria-hidden="true" />
              <span>{t.hero.checkEligibility}</span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-[#A1A1AA] shrink-0" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={scrollToTracker}
            className="min-h-[68px] px-6 bg-[#18181b] hover:border-[#f59e0b] border-2 border-[#27272a] text-white font-bold text-base sm:text-lg uppercase tracking-wide flex items-center justify-between gap-4 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-3">
              <Search className="w-6 h-6 text-[#f59e0b] shrink-0" aria-hidden="true" />
              <span>{t.hero.trackStatus}</span>
            </span>
            <ArrowUpRight className="w-5 h-5 text-[#A1A1AA] shrink-0" aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* VISUAL RULES & BENEFITS MATRIX */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-[#27272a] pb-5">
          <div>
            <p className="font-brutal-mono text-xs font-bold text-[#FF5500] tracking-wider">
              {t.matrix.sectionLabel}
            </p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-white">
              {t.matrix.sectionTitle}
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenLegalModal}
            className="min-h-[68px] px-6 bg-[#18181b] border-2 border-[#f59e0b] hover:bg-[#f59e0b] hover:text-black text-[#f59e0b] font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-colors cursor-pointer shrink-0"
          >
            <Scale className="w-6 h-6 shrink-0" aria-hidden="true" />
            <span>{t.matrix.legalButton}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.matrix.cards.map((card, idx) => {
            const accent = card.accent ?? 'default';
            return (
              <div
                key={idx}
                className={`bg-[#121212] border-2 ${cardBorderMap[accent]} p-6 flex flex-col justify-between min-h-[156px]`}
              >
                <p
                  className={`font-brutal-display text-3xl sm:text-4xl leading-none tabular-nums ${cardTextMap[accent]}`}
                >
                  {card.value}
                </p>
                <div className="mt-4 pt-3 border-t border-[#27272a]">
                  <p className="text-base font-bold text-white">{card.label}</p>
                  <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-1">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIVE 7-STAGE PIPELINE TRACKER */}
      <section
        id="live-tracker"
        className="bg-[#121212] border-2 border-[#27272a] p-6 sm:p-10 space-y-8 scroll-mt-24"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div>
            <p className="font-brutal-mono text-xs font-bold text-[#f59e0b] tracking-wider">
              {t.tracker.sectionLabel}
            </p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-white">
              {t.tracker.title}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="font-brutal-mono text-xs text-[#A1A1AA]">
              {t.tracker.quickSamples}
            </span>
            {candidates.slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  onTrackerQueryChange(sample.id);
                  setSubmittedSearch(sample.id);
                }}
                className="px-3 py-1.5 bg-[#18181b] border-2 border-[#27272a] hover:border-[#FF5500] font-brutal-mono text-xs text-white cursor-pointer"
              >
                {sample.id}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleTrackerSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            value={trackerQuery}
            onChange={(e) => onTrackerQueryChange(e.target.value)}
            placeholder={t.tracker.placeholder}
            className="flex-1 min-h-[68px] px-5 bg-[#18181b] border-2 border-[#27272a] focus:border-[#FF5500] text-white font-brutal-mono text-sm sm:text-base placeholder:text-[#A1A1AA] focus:outline-none"
          />
          <button
            type="submit"
            className="min-h-[68px] px-8 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
            <span>{t.tracker.searchBtn}</span>
          </button>
        </form>

        {trackedCandidate ? (
          <div className="bg-[#18181b] border-2 border-[#27272a] p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b-2 border-[#27272a] pb-5">
              <div>
                <p className="font-brutal-mono text-xs text-[#A1A1AA]">
                  {t.tracker.candidateLabel}
                </p>
                <p className="text-xl font-bold text-white mt-1">
                  {trackedCandidate.fullName}
                </p>
                <p className="font-brutal-mono text-xs text-[#FF5500] mt-0.5">
                  {trackedCandidate.id} · {trackedCandidate.phone}
                </p>
              </div>
              <div>
                <p className="font-brutal-mono text-xs text-[#A1A1AA]">
                  {t.tracker.corridorLabel}
                </p>
                <p className="text-base font-bold text-white mt-1">
                  {trackedCandidate.targetPrefecture}
                </p>
                <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-0.5">
                  {trackedCandidate.tradeSector}
                </p>
              </div>
              <div>
                <p className="font-brutal-mono text-xs text-[#A1A1AA]">
                  {t.tracker.statusLabel}
                </p>
                <p className="text-xl font-bold text-[#10b981] mt-1">
                  {t.stages[trackedCandidate.stage]}
                </p>
                <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-0.5">
                  UPDATED: {trackedCandidate.updatedAt}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
              {PIPELINE_STAGES.map((stage, idx) => {
                const isDone = idx < currentStageIdx;
                const isCurrent = idx === currentStageIdx;
                return (
                  <div
                    key={stage}
                    className={`p-3.5 border-2 flex flex-col justify-between min-h-[92px] ${
                      isCurrent
                        ? 'border-[#FF5500] bg-[#FF5500]/15 shadow-[0_0_20px_rgba(255,85,0,0.22)]'
                        : isDone
                          ? 'border-[#10b981] bg-[#10b981]/10'
                          : 'border-[#27272a] bg-[#121212]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-brutal-mono text-xs text-[#A1A1AA] tabular-nums">
                        0{idx + 1}
                      </span>
                      {(isDone || isCurrent) && (
                        <CheckCircle2
                          className={`w-4 h-4 ${
                            isCurrent ? 'text-[#FF5500]' : 'text-[#10b981]'
                          }`}
                        />
                      )}
                    </div>
                    <p
                      className={`text-xs font-bold mt-2 leading-snug ${
                        isCurrent
                          ? 'text-[#FF5500]'
                          : isDone
                            ? 'text-white'
                            : 'text-[#A1A1AA]'
                      }`}
                    >
                      {t.stages[stage]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-[#18181b] border-2 border-[#e11d48] p-6 text-center">
            <p className="font-bold text-white">{t.tracker.notFound}</p>
          </div>
        )}
      </section>
    </div>
  );
}

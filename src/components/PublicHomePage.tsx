import { FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Factory,
  MessageCircle,
  Scale,
  Search,
  ShieldCheck,
} from 'lucide-react';
import type { Candidate, JobRequisition } from '../types.ts';
import { PIPELINE_STAGES } from '../data/initialData.ts';
import type { Translations } from '../i18n.ts';
import { HoverDetailButton } from './HoverDetailButton.tsx';
import slideYarnImg from '../assets/images/hero_yarn_operators_1795037405504.jpg';
import slideKnitImg from '../assets/images/hero_knit_inspection_1795037404989.jpg';
import slideCorridorImg from '../assets/images/hero_corridor_training_1795037406445.jpg';

interface PublicHomePageProps {
  t: Translations;
  candidates: Candidate[];
  requisitions: JobRequisition[];
  trackerQuery: string;
  onTrackerQueryChange: (q: string) => void;
  onOpenWizard: (initialStep: 1 | 2) => void;
  onOpenLegalModal: () => void;
}

const SLIDE_IMAGES = [
  {
    src: slideYarnImg,
    alt: 'Skilled textile and yarn spinning machine operators on an industrial production line',
  },
  {
    src: slideKnitImg,
    alt: 'Precision knitwear and fabric quality control specialists inspecting fabric rolls',
  },
  {
    src: slideCorridorImg,
    alt: 'International industrial workforce training with Bangladeshi, Vietnamese, and Japanese coordinators',
  },
];

export function PublicHomePage({
  t,
  candidates,
  requisitions,
  trackerQuery,
  onTrackerQueryChange,
  onOpenWizard,
  onOpenLegalModal,
}: PublicHomePageProps) {
  const [submittedSearch, setSubmittedSearch] = useState(trackerQuery);
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

  const activeSearch = (submittedSearch || trackerQuery).trim().toLowerCase();

  useEffect(() => {
    if (sliderPaused) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [sliderPaused]);

  const vnDemand = useMemo(
    () => requisitions.find((r) => r.id === 'REQ-VN-2027') ?? requisitions[0],
    [requisitions],
  );

  const vnRemaining = vnDemand
    ? Math.max(0, vnDemand.openQuota - (vnDemand.lockedSlots + vnDemand.confirmedSlots))
    : 10;

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
    'Assalamu Alaikum / Hello Silver Group & Human Resource Export — I want to apply for the Vietnam Yarn Factory ($500 USD/mo) / Japan SSW recruitment.',
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

  const currentSlideCopy = t.heroSlides[activeSlide] ?? t.heroSlides[0];

  return (
    <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-14">
      {/* FULL-WIDTH FRAMED HERO PHOTO SLIDER */}
      <section
        aria-label="Featured textile & industrial recruitment showcase"
        onMouseEnter={() => setSliderPaused(true)}
        onMouseLeave={() => setSliderPaused(false)}
        onFocus={() => setSliderPaused(true)}
        onBlur={() => setSliderPaused(false)}
        className="relative border-2 border-[#27272a] bg-[#0a0a0a] overflow-hidden min-h-[540px] sm:min-h-[580px] lg:min-h-[620px] flex flex-col justify-between"
      >
        {/* Background Slides */}
        <div className="absolute inset-0 z-0">
          {SLIDE_IMAGES.map((img, idx) => {
            const isActive = idx === activeSlide;
            const hasFailed = Boolean(failedSlides[idx]);
            return (
              <div
                key={idx}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {hasFailed ? (
                  <div className="w-full h-full bg-gradient-to-br from-[#18181b] via-[#121212] to-[#0a0a0a] flex items-center justify-center">
                    <Factory className="w-24 h-24 text-[#FF5500]/20" aria-hidden="true" />
                  </div>
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedSlides((prev) => ({ ...prev, [idx]: true }))
                    }
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>
            );
          })}

          {/* Dark Obsidian Gradient Scrim for 100% Foreground Contrast */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, #0a0a0a 15%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.85) 100%)',
            }}
          />
        </div>

        {/* Hero Top Bar: Live Demand Indicator + Manual Slider Controls */}
        <div className="relative z-10 p-5 sm:p-8 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-2 bg-[#121212]/90 border-2 border-[#e11d48] font-brutal-mono text-xs font-bold text-white tracking-wider">
              {t.hero.quotaPill}
            </span>

            {vnDemand && (
              <span className="px-3.5 py-2 bg-[#121212]/90 border-2 border-[#FF5500] font-brutal-mono text-xs font-bold tabular-nums text-[#FF5500]">
                {vnRemaining} / {vnDemand.openQuota} OPEN · {vnDemand.lockedSlots} LOCKED
              </span>
            )}
          </div>

          {/* Manual Slide Controls + Indicator Bars */}
          <div className="flex items-center gap-2 bg-[#0a0a0a]/85 border border-[#27272a] p-1.5">
            <button
              type="button"
              onClick={() =>
                setActiveSlide(
                  (prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length,
                )
              }
              aria-label={t.hero.prevSlide}
              className="w-11 h-11 border border-[#27272a] hover:border-[#FF5500] bg-[#121212] text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1.5 px-2" role="tablist" aria-label="Hero slides">
              {SLIDE_IMAGES.map((_, idx) => {
                const isCurrent = idx === activeSlide;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={isCurrent}
                    aria-label={`Slide ${idx + 1}`}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-2.5 transition-all cursor-pointer ${
                      isCurrent
                        ? 'w-9 bg-[#FF5500]'
                        : 'w-4 bg-[#52525b] hover:bg-[#A1A1AA]'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveSlide((prev) => (prev + 1) % SLIDE_IMAGES.length)
              }
              aria-label={t.hero.nextSlide}
              className="w-11 h-11 border border-[#27272a] hover:border-[#FF5500] bg-[#121212] text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Hero Bottom Stage: Localized Slide Headline + Overlaid Primary & Secondary CTAs */}
        <div className="relative z-10 p-5 sm:p-8 lg:p-10 space-y-6">
          <div className="space-y-3 max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 font-brutal-mono text-xs font-bold">
              <span className="text-[#FF5500] tracking-wider">
                0{activeSlide + 1} / 0{SLIDE_IMAGES.length} · {currentSlideCopy.kicker}
              </span>
              <span className="text-[#A1A1AA]" aria-hidden="true">
                |
              </span>
              <span className="text-[#10b981]">{currentSlideCopy.highlightBadge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold leading-[1.12] text-white text-balance">
              {currentSlideCopy.headline}
            </h1>

            <p className="text-sm sm:text-base text-[#e4e4e7] font-medium max-w-3xl">
              {currentSlideCopy.subline}
            </p>
          </div>

          {/* Two Oversized Primary CTAs Overlaid on Hero Bottom Stage (72px–76px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HoverDetailButton
              badge={t.hoverCards.applyNow.badge}
              title={t.hoverCards.applyNow.title}
              bullets={t.hoverCards.applyNow.bullets}
              icon={<ClipboardCheck className="w-4 h-4" aria-hidden="true" />}
              preferredPlacement="top"
            >
              <button
                type="button"
                onClick={() => onOpenWizard(1)}
                className="w-full min-h-[74px] px-6 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-lg sm:text-xl uppercase tracking-wide flex items-center justify-between gap-4 shadow-[0_0_32px_rgba(255,85,0,0.4)] transition-all cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <ClipboardCheck className="w-7 h-7 shrink-0" aria-hidden="true" />
                  <span>{t.hero.applyNow}</span>
                </span>
                <ArrowUpRight className="w-7 h-7 shrink-0" aria-hidden="true" />
              </button>
            </HoverDetailButton>

            <HoverDetailButton
              badge={t.hoverCards.whatsapp.badge}
              title={t.hoverCards.whatsapp.title}
              bullets={t.hoverCards.whatsapp.bullets}
              icon={<MessageCircle className="w-4 h-4" aria-hidden="true" />}
              preferredPlacement="top"
            >
              <a
                href={whatsappDirectHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[74px] px-6 bg-[#10b981] hover:bg-[#34d399] text-black font-bold text-lg sm:text-xl uppercase tracking-wide flex items-center justify-between gap-4 shadow-[0_0_28px_rgba(16,185,129,0.32)] transition-all"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="w-7 h-7 shrink-0" aria-hidden="true" />
                  <span>{t.hero.whatsappDirect}</span>
                </span>
                <ArrowUpRight className="w-7 h-7 shrink-0" aria-hidden="true" />
              </a>
            </HoverDetailButton>
          </div>

          {/* Two Secondary Giant Tiles (68px) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <HoverDetailButton
              badge={t.hoverCards.checkEligibility.badge}
              title={t.hoverCards.checkEligibility.title}
              bullets={t.hoverCards.checkEligibility.bullets}
              icon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
              preferredPlacement="top"
            >
              <button
                type="button"
                onClick={() => onOpenWizard(2)}
                className="w-full min-h-[68px] px-6 bg-[#121212]/95 hover:border-[#FF5500] border-2 border-[#27272a] text-white font-bold text-base sm:text-lg uppercase tracking-wide flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#FF5500] shrink-0" aria-hidden="true" />
                  <span>{t.hero.checkEligibility}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#A1A1AA] shrink-0" aria-hidden="true" />
              </button>
            </HoverDetailButton>

            <HoverDetailButton
              badge={t.hoverCards.trackStatus.badge}
              title={t.hoverCards.trackStatus.title}
              bullets={t.hoverCards.trackStatus.bullets}
              icon={<Search className="w-4 h-4" aria-hidden="true" />}
              preferredPlacement="top"
            >
              <button
                type="button"
                onClick={scrollToTracker}
                className="w-full min-h-[68px] px-6 bg-[#121212]/95 hover:border-[#f59e0b] border-2 border-[#27272a] text-white font-bold text-base sm:text-lg uppercase tracking-wide flex items-center justify-between gap-4 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-3">
                  <Search className="w-6 h-6 text-[#f59e0b] shrink-0" aria-hidden="true" />
                  <span>{t.hero.trackStatus}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-[#A1A1AA] shrink-0" aria-hidden="true" />
              </button>
            </HoverDetailButton>
          </div>
        </div>
      </section>

      {/* VISUAL RULES & BENEFITS MATRIX */}
      <section id="job-demands-matrix" className="space-y-6 scroll-mt-24">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b-2 border-[#27272a] pb-5">
          <div>
            <p className="font-brutal-mono text-xs font-bold text-[#FF5500] tracking-wider">
              {t.matrix.sectionLabel}
            </p>
            <h2 className="mt-1 text-3xl sm:text-4xl font-bold text-white">
              {t.matrix.sectionTitle}
            </h2>
          </div>

          <HoverDetailButton
            badge={t.hoverCards.legalButton.badge}
            title={t.hoverCards.legalButton.title}
            bullets={t.hoverCards.legalButton.bullets}
            icon={<Scale className="w-4 h-4" aria-hidden="true" />}
            preferredPlacement="top"
          >
            <button
              type="button"
              onClick={onOpenLegalModal}
              className="min-h-[68px] px-6 bg-[#18181b] border-2 border-[#f59e0b] hover:bg-[#f59e0b] hover:text-black text-[#f59e0b] font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-colors cursor-pointer shrink-0"
            >
              <Scale className="w-6 h-6 shrink-0" aria-hidden="true" />
              <span>{t.matrix.legalButton}</span>
            </button>
          </HoverDetailButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.matrix.cards.map((card, idx) => {
            const accent = card.accent ?? 'default';
            return (
              <HoverDetailButton
                key={idx}
                badge={card.value}
                title={card.label}
                bullets={card.hoverBullets}
                icon={<ShieldCheck className="w-4 h-4" aria-hidden="true" />}
                preferredPlacement="top"
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => onOpenWizard(2)}
                  className={`w-full h-full text-left bg-[#121212] hover:bg-[#18181b] border-2 ${cardBorderMap[accent]} p-6 flex flex-col justify-between min-h-[156px] transition-colors cursor-pointer`}
                >
                  <p
                    className={`font-brutal-display text-3xl sm:text-4xl leading-none tabular-nums ${cardTextMap[accent]}`}
                  >
                    {card.value}
                  </p>
                  <div className="mt-4 pt-3 border-t border-[#27272a] w-full">
                    <p className="text-base font-bold text-white">{card.label}</p>
                    <p className="font-brutal-mono text-xs text-[#A1A1AA] mt-1">
                      {card.sub}
                    </p>
                  </div>
                </button>
              </HoverDetailButton>
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
          <HoverDetailButton
            badge={t.hoverCards.trackStatus.badge}
            title={t.hoverCards.trackStatus.title}
            bullets={t.hoverCards.trackStatus.bullets}
            icon={<Search className="w-4 h-4" aria-hidden="true" />}
            preferredPlacement="top"
          >
            <button
              type="submit"
              className="w-full sm:w-auto min-h-[68px] px-8 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-base uppercase tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
            >
              <Search className="w-5 h-5" aria-hidden="true" />
              <span>{t.tracker.searchBtn}</span>
            </button>
          </HoverDetailButton>
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

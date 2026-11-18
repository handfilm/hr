import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowUpRight, Cpu, Globe, MapPin, ShieldCheck } from 'lucide-react';
import type { TopNavSection } from '../types.ts';
import type { Translations } from '../i18n.ts';
import { BangladeshFlag, JapanFlag, VietnamFlag } from './CountryFlags.tsx';

interface FooterProps {
  t: Translations;
  vietnamPartnerName: string;
  onNavigateSection: (section: TopNavSection) => void;
}

type AllianceKey = 'bd' | 'jp' | 'vn';

export function Footer({ t, vietnamPartnerName, onNavigateSection }: FooterProps) {
  const [selectedAlliance, setSelectedAlliance] = useState<AllianceKey>('vn');
  const [techHoverOpen, setTechHoverOpen] = useState(false);
  const [techCoords, setTechCoords] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 16,
    width: 460,
  });

  const techTriggerRef = useRef<HTMLAnchorElement | null>(null);
  const techCardRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const quickLinks: { id: TopNavSection; label: string }[] = [
    { id: 'home', label: t.topNav.home },
    { id: 'demands', label: t.topNav.demands },
    { id: 'legal', label: t.topNav.legal },
    { id: 'faq', label: t.topNav.faq },
    { id: 'privacy', label: t.topNav.privacy },
    { id: 'contact', label: t.topNav.contact },
  ];

  const allianceCompanies: {
    key: AllianceKey;
    name: string;
    Flag: typeof BangladeshFlag;
    dotColor: string;
    borderActive: string;
    textAccent: string;
    copy: Translations['allianceSpotlight']['bd'];
  }[] = [
    {
      key: 'bd',
      name: t.collaborationPartners.bd,
      Flag: BangladeshFlag,
      dotColor: 'bg-[#FF5500]',
      borderActive: 'border-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.22)]',
      textAccent: 'text-[#FF5500]',
      copy: t.allianceSpotlight.bd,
    },
    {
      key: 'jp',
      name: t.collaborationPartners.jp,
      Flag: JapanFlag,
      dotColor: 'bg-[#f59e0b]',
      borderActive: 'border-[#f59e0b] shadow-[0_0_20px_rgba(245,158,11,0.2)]',
      textAccent: 'text-[#f59e0b]',
      copy: t.allianceSpotlight.jp,
    },
    {
      key: 'vn',
      name: vietnamPartnerName || t.collaborationPartners.vn,
      Flag: VietnamFlag,
      dotColor: 'bg-[#10b981]',
      borderActive: 'border-[#10b981] shadow-[0_0_20px_rgba(16,185,129,0.22)]',
      textAccent: 'text-[#10b981]',
      copy: t.allianceSpotlight.vn,
    },
  ];

  const activeCompany =
    allianceCompanies.find((item) => item.key === selectedAlliance) ?? allianceCompanies[2];

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openTechCard = useCallback(() => {
    clearCloseTimer();
    setTechHoverOpen(true);
  }, [clearCloseTimer]);

  const scheduleCloseTechCard = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setTechHoverOpen(false);
    }, 160);
  }, [clearCloseTimer]);

  const updateTechCardPosition = useCallback(() => {
    const anchor = techTriggerRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;
    const cardW = Math.min(480, vw - margin * 2);

    let left = rect.right - cardW;
    if (left < margin) {
      left = Math.max(margin, vw / 2 - cardW / 2);
    }
    if (left + cardW > vw - margin) {
      left = vw - cardW - margin;
    }

    const estimatedH = techCardRef.current?.offsetHeight ?? 320;
    let top = rect.top - estimatedH - 14;
    if (top < margin) {
      top = Math.min(rect.bottom + 12, vh - estimatedH - margin);
    }

    setTechCoords({ top, left, width: cardW });
  }, []);

  useLayoutEffect(() => {
    if (techHoverOpen) {
      updateTechCardPosition();
    }
  }, [techHoverOpen, updateTechCardPosition]);

  useEffect(() => {
    if (!techHoverOpen) return;
    const onResizeOrScroll = () => updateTechCardPosition();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTechHoverOpen(false);
    };
    window.addEventListener('resize', onResizeOrScroll);
    window.addEventListener('scroll', onResizeOrScroll, true);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResizeOrScroll);
      window.removeEventListener('scroll', onResizeOrScroll, true);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [techHoverOpen, updateTechCardPosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  return (
    <footer className="relative z-10 bg-[#070707] border-t-2 border-[#27272a] mt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 sm:py-12 space-y-8">
        {/* Dynamic Tri-National 3-Company Alliance Matrix */}
        <section
          aria-label={t.footer.allianceHeading}
          className="bg-[#0e0e10] border-2 border-[#27272a] p-4 sm:p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-node-pulse" aria-hidden="true" />
              <p className="font-brutal-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                {t.footer.allianceHeading}
              </p>
            </div>
            <span className="font-brutal-mono text-[10px] text-[#A1A1AA]">
              {t.allianceSpotlight.tapHint}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
            {allianceCompanies.map((company) => {
              const { Flag } = company;
              const isSelected = selectedAlliance === company.key;
              return (
                <button
                  key={company.key}
                  type="button"
                  onMouseEnter={() => setSelectedAlliance(company.key)}
                  onFocus={() => setSelectedAlliance(company.key)}
                  onClick={() => setSelectedAlliance(company.key)}
                  className={`text-left p-4 border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? `bg-[#18181b] ${company.borderActive}`
                      : 'bg-[#121212] border-[#27272a] hover:border-[#52525b]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Flag label={company.copy.country} className="w-[24px] h-[17px]" />
                      <div className="min-w-0">
                        <p className={`font-brutal-mono text-[10px] font-bold uppercase ${company.textAccent}`}>
                          {company.copy.country}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-white truncate">
                          {company.name}
                        </h3>
                      </div>
                    </div>
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1 ${company.dotColor} animate-node-pulse`}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#27272a]/80 text-xs">
                    <span className="text-[#d4d4d8] font-medium truncate">
                      {company.copy.role}
                    </span>
                    <span className="inline-flex items-center gap-1 font-brutal-mono text-[11px] text-[#A1A1AA] shrink-0">
                      <MapPin className="w-3 h-3 text-[#FF5500]" aria-hidden="true" />
                      <span>{company.copy.headquarters}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Live Dynamic Spotlight Detail Bar for Hovered / Selected Company */}
          <div className="bg-[#121212] border border-[#27272a] px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <activeCompany.Flag label={activeCompany.copy.country} />
              <span className="font-brutal-mono text-xs font-bold text-white">
                {activeCompany.name}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#10b981]/10 border border-[#10b981]/50 text-[#10b981] font-brutal-mono text-[11px] font-bold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{activeCompany.copy.credentialBadge}</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#d4d4d8]">
              {activeCompany.copy.highlights[0]}
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#27272a]">
          {/* Left Column: HUMAN RESOURCE EXPORT + Zero-Fraud BMET Notice */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 bg-[#FF5500] shrink-0" aria-hidden="true" />
              <h2 className="text-lg sm:text-xl font-bold tracking-wide text-white">
                {t.footer.brandTitle}
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed max-w-md">
              {t.footer.ethicalNotice}
            </p>
          </div>

          {/* Center Column: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-brutal-mono text-xs font-bold uppercase tracking-wider text-white">
              {t.footer.quickLinksHeading}
            </h3>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateSection(link.id)}
                    className="text-xs sm:text-sm text-[#A1A1AA] hover:text-[#FF5500] hover:underline underline-offset-4 transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Short Privacy & Data Security Summary */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 text-[#10b981] shrink-0" aria-hidden="true" />
              <h3 className="font-brutal-mono text-xs font-bold uppercase tracking-wider">
                {t.footer.privacyHeading}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              {t.footer.privacySummary}
            </p>
            <button
              type="button"
              onClick={() => onNavigateSection('privacy')}
              className="font-brutal-mono text-xs font-bold text-[#10b981] hover:underline underline-offset-4 cursor-pointer"
            >
              {t.topNav.privacy} →
            </button>
          </div>
        </div>

        {/* Bottom Bar: Copyright + Technology Provider (Mouse-Over Big-Font Details Card ONLY) */}
        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-brutal-mono text-[11px] text-[#A1A1AA]">
            © 2026 HUMAN RESOURCE EXPORT · {t.collaborationPartners.bd} ×{' '}
            {t.collaborationPartners.jp} × {vietnamPartnerName}
          </p>

          <a
            ref={techTriggerRef}
            href={t.footer.techProviderCard.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={openTechCard}
            onMouseLeave={scheduleCloseTechCard}
            className={`inline-flex items-center gap-2.5 px-4 py-2.5 border-2 text-xs sm:text-sm font-brutal-mono transition-all shrink-0 ${
              techHoverOpen
                ? 'bg-[#18181b] border-[#FF5500] shadow-[0_0_20px_rgba(255,85,0,0.3)]'
                : 'bg-[#121212] border-[#27272a] hover:border-[#FF5500]'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
            <span className="text-[#A1A1AA]">{t.footer.techProviderLabel}</span>
            <span className="font-bold text-[#FF5500] tracking-wider">
              {t.footer.techProviderName}
            </span>
            <ArrowUpRight className="w-4 h-4 text-[#FF5500]" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Big-Font Technology Provider Details Card — strictly shown on mouse over */}
      {techHoverOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={techCardRef}
            role="tooltip"
            onMouseEnter={openTechCard}
            onMouseLeave={scheduleCloseTechCard}
            style={{
              top: `${techCoords.top}px`,
              left: `${techCoords.left}px`,
              width: `${techCoords.width}px`,
            }}
            className="fixed z-50 bg-[#121212] border-2 border-[#FF5500] shadow-[0_20px_56px_rgba(0,0,0,0.96),0_0_36px_rgba(255,85,0,0.34)] p-6 sm:p-7 space-y-5 animate-hover-card"
          >
            <div className="space-y-2 border-b-2 border-[#27272a] pb-4">
              <div className="flex items-center gap-2 text-[#FF5500]">
                <Cpu className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span className="font-brutal-mono text-xs font-bold uppercase tracking-widest">
                  {t.footer.techProviderCard.badge}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {t.footer.techProviderCard.title}
              </h3>
              <p className="text-base sm:text-lg text-[#e4e4e7] font-medium leading-snug">
                {t.footer.techProviderCard.subtitle}
              </p>
            </div>

            <ul className="space-y-3">
              {t.footer.techProviderCard.features.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-sm sm:text-base text-[#d4d4d8] leading-snug"
                >
                  <span
                    className="w-2.5 h-2.5 bg-[#FF5500] shrink-0 mt-1.5"
                    aria-hidden="true"
                  />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <a
              href={t.footer.techProviderCard.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-4 py-3 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-brutal-mono font-bold text-base sm:text-lg flex items-center justify-between gap-3 transition-colors"
            >
              <span className="flex items-center gap-2.5">
                <Globe className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>handsandhead.com</span>
              </span>
              <ArrowUpRight className="w-5 h-5 shrink-0" aria-hidden="true" />
            </a>
          </div>,
          document.body,
        )}
    </footer>
  );
}

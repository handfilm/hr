import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Building2, MapPin, ShieldCheck, X } from 'lucide-react';
import type { Translations } from '../i18n.ts';
import { BangladeshFlag, JapanFlag } from './CountryFlags.tsx';

type PartnerNodeKey = 'bd' | 'jp';

interface AllianceBarProps {
  t: Translations;
}

export function AllianceBar({ t }: AllianceBarProps) {
  const [activeKey, setActiveKey] = useState<PartnerNodeKey | null>(null);
  const [pinnedByClick, setPinnedByClick] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 16,
    width: 320,
  });

  const nodeRefs = useRef<Record<PartnerNodeKey, HTMLButtonElement | null>>({
    bd: null,
    jp: null,
  });
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const partners: {
    key: PartnerNodeKey;
    name: string;
    Flag: typeof BangladeshFlag;
    accentBorder: string;
    dotColor: string;
    copy: Translations['allianceSpotlight']['bd'];
  }[] = [
    {
      key: 'bd',
      name: t.collaborationPartners.bd,
      Flag: BangladeshFlag,
      accentBorder: 'border-[#FF5500]',
      dotColor: 'bg-[#FF5500]',
      copy: t.allianceSpotlight.bd,
    },
    {
      key: 'jp',
      name: t.collaborationPartners.jp,
      Flag: JapanFlag,
      accentBorder: 'border-[#f59e0b]',
      dotColor: 'bg-[#f59e0b]',
      copy: t.allianceSpotlight.jp,
    },
  ];

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    if (pinnedByClick) return;
    closeTimerRef.current = window.setTimeout(() => {
      setActiveKey(null);
    }, 150);
  }, [clearCloseTimer, pinnedByClick]);

  const updateCardPosition = useCallback(() => {
    if (!activeKey) return;
    const anchor = nodeRefs.current[activeKey];
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    const vw = window.innerWidth;
    const cardW = Math.min(340, vw - 24);
    const margin = 12;

    let left = rect.left + rect.width / 2 - cardW / 2;
    left = Math.max(margin, Math.min(left, vw - cardW - margin));

    const estimatedH = cardRef.current?.offsetHeight ?? 230;
    let top = rect.bottom + 10;
    if (top + estimatedH > window.innerHeight - 16) {
      top = Math.max(12, rect.top - estimatedH - 10);
    }

    setCoords({ top, left, width: cardW });
  }, [activeKey]);

  useLayoutEffect(() => {
    if (activeKey) {
      updateCardPosition();
    }
  }, [activeKey, updateCardPosition]);

  useEffect(() => {
    if (!activeKey) return;
    const onResizeOrScroll = () => updateCardPosition();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPinnedByClick(false);
        setActiveKey(null);
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const clickedAnchor = Object.values(nodeRefs.current).some((el) =>
        el?.contains(target),
      );
      if (clickedAnchor || cardRef.current?.contains(target)) return;
      setPinnedByClick(false);
      setActiveKey(null);
    };

    window.addEventListener('resize', onResizeOrScroll);
    window.addEventListener('scroll', onResizeOrScroll, true);
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('resize', onResizeOrScroll);
      window.removeEventListener('scroll', onResizeOrScroll, true);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [activeKey, updateCardPosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const activePartner = activeKey
    ? partners.find((p) => p.key === activeKey) ?? null
    : null;

  return (
    <div className="relative bg-[#121212] border border-[#FF5500]/65 shadow-[0_0_20px_rgba(255,85,0,0.18)] px-2 sm:px-3 py-1.5 w-full lg:w-auto lg:min-w-[460px]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5 sm:gap-2.5">
        {partners.map((partner, idx) => {
          const { Flag } = partner;
          const isActive = activeKey === partner.key;
          return (
            <div key={partner.key} className="contents">
              <button
                ref={(el) => {
                  nodeRefs.current[partner.key] = el;
                }}
                type="button"
                aria-expanded={isActive}
                onMouseEnter={() => {
                  clearCloseTimer();
                  setPinnedByClick(false);
                  setActiveKey(partner.key);
                }}
                onMouseLeave={scheduleClose}
                onFocus={() => {
                  clearCloseTimer();
                  setActiveKey(partner.key);
                }}
                onBlur={scheduleClose}
                onClick={() => {
                  clearCloseTimer();
                  if (isActive && pinnedByClick) {
                    setPinnedByClick(false);
                    setActiveKey(null);
                  } else {
                    setPinnedByClick(true);
                    setActiveKey(partner.key);
                  }
                }}
                className={`group w-full flex items-center justify-center sm:justify-start gap-2 sm:gap-2.5 px-2.5 sm:px-3.5 py-2 border text-left transition-all cursor-pointer min-w-0 ${
                  isActive
                    ? `${partner.accentBorder} bg-[#18181b] shadow-[0_0_14px_rgba(255,85,0,0.28)]`
                    : 'border-[#27272a] bg-[#0a0a0a]/90 hover:border-[#FF5500]/80 hover:bg-[#18181b]'
                }`}
              >
                <span className="relative flex items-center justify-center shrink-0">
                  <Flag
                    label={`${partner.copy.country} Flag`}
                    className="w-[22px] h-[15px] sm:w-[24px] sm:h-[17px]"
                  />
                  <span
                    className={`absolute -top-1 -right-1 w-2 h-2 rounded-full ${partner.dotColor} animate-node-pulse`}
                    aria-hidden="true"
                  />
                </span>
                <span className="flex flex-col leading-tight min-w-0">
                  <span className="font-brutal-mono text-[11px] sm:text-xs font-bold text-white tracking-wide truncate">
                    {partner.name}
                  </span>
                  <span className="hidden sm:block text-[10px] text-[#A1A1AA] truncate">
                    {partner.copy.shortSubtitle}
                  </span>
                </span>
              </button>

              {idx === 0 && (
                <div
                  className="flex items-center gap-0.5 sm:gap-1 shrink-0 px-0.5"
                  aria-hidden="true"
                >
                  <span className="w-2 sm:w-3.5 h-[2px] bg-gradient-to-r from-[#FF5500] to-[#f59e0b]" />
                  <span className="w-2 h-2 rounded-full bg-[#FF5500] shadow-[0_0_10px_#FF5500] animate-node-pulse" />
                  <span className="w-2 sm:w-3.5 h-[2px] bg-gradient-to-r from-[#f59e0b] to-[#FF5500]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {activePartner &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={cardRef}
            role="dialog"
            aria-label={`${activePartner.name} Spotlight`}
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            style={{
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
            }}
            className="fixed z-50 bg-[#121212] border-2 border-[#FF5500] shadow-[0_14px_40px_rgba(0,0,0,0.92),0_0_24px_rgba(255,85,0,0.28)] p-4 animate-hover-card"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <activePartner.Flag label={activePartner.copy.country} />
                <div className="min-w-0">
                  <p className="font-brutal-mono text-[10px] font-bold uppercase text-[#FF5500]">
                    {activePartner.copy.country}
                  </p>
                  <h3 className="text-sm font-bold text-white truncate">
                    {activePartner.name}
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPinnedByClick(false);
                  setActiveKey(null);
                }}
                aria-label={t.actions.close}
                className="p-1 text-[#A1A1AA] hover:text-white border border-[#27272a] hover:border-[#FF5500] cursor-pointer shrink-0"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2 bg-[#18181b] border border-[#27272a] px-2.5 py-2">
                <span className="inline-flex items-center gap-1.5 text-[#A1A1AA] font-brutal-mono text-[10px]">
                  <Building2 className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
                  <span>{t.allianceSpotlight.roleLabel}</span>
                </span>
                <span className="font-bold text-white text-right">
                  {activePartner.copy.role}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 bg-[#18181b] border border-[#27272a] px-2.5 py-2">
                <span className="inline-flex items-center gap-1.5 text-[#A1A1AA] font-brutal-mono text-[10px]">
                  <MapPin className="w-3.5 h-3.5 text-[#f59e0b]" aria-hidden="true" />
                  <span>{t.allianceSpotlight.hqLabel}</span>
                </span>
                <span className="font-bold text-white">
                  {activePartner.copy.headquarters}
                </span>
              </div>

              <div className="flex items-center gap-2 bg-[#10b981]/10 border border-[#10b981]/60 px-2.5 py-2 text-[#10b981] font-bold">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span className="text-[11px]">{activePartner.copy.credentialBadge}</span>
              </div>

              <ul className="space-y-1.5 pt-1">
                {activePartner.copy.highlights.map((line, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[11px] text-[#e4e4e7] leading-snug"
                  >
                    <span className="w-1.5 h-1.5 bg-[#FF5500] shrink-0 mt-1.5" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

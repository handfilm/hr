import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import { HelpCircle, X } from 'lucide-react';

export interface HoverDetailButtonProps {
  title: string;
  bullets: string[];
  icon?: ReactNode;
  badge?: string;
  children: ReactNode;
  className?: string;
  showMobileInfoBadge?: boolean;
  preferredPlacement?: 'top' | 'bottom';
}

interface CardCoords {
  top: number;
  left: number;
  width: number;
  placement: 'top' | 'bottom';
}

export function HoverDetailButton({
  title,
  bullets,
  icon,
  badge,
  children,
  className = '',
  showMobileInfoBadge = true,
  preferredPlacement = 'top',
}: HoverDetailButtonProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [pinnedByTap, setPinnedByTap] = useState(false);
  const [coords, setCoords] = useState<CardCoords>({
    top: 0,
    left: 12,
    width: 320,
    placement: preferredPlacement,
  });

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    if (pinnedByTap) return;
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 90);
  }, [clearCloseTimer, pinnedByTap]);

  const computePosition = useCallback(() => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const rect = triggerEl.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 12;
    const cardWidth = Math.min(352, Math.max(296, vw - margin * 2));
    const estimatedHeight = cardRef.current?.offsetHeight ?? 210;

    let left = rect.left + rect.width / 2 - cardWidth / 2;
    if (left < margin) left = margin;
    if (left + cardWidth > vw - margin) {
      left = Math.max(margin, vw - margin - cardWidth);
    }

    const spaceAbove = rect.top - margin;
    const spaceBelow = vh - rect.bottom - margin;

    let placement: 'top' | 'bottom' = preferredPlacement;
    if (preferredPlacement === 'top' && spaceAbove < estimatedHeight + 10 && spaceBelow > spaceAbove) {
      placement = 'bottom';
    } else if (
      preferredPlacement === 'bottom' &&
      spaceBelow < estimatedHeight + 10 &&
      spaceAbove > spaceBelow
    ) {
      placement = 'top';
    }

    let top =
      placement === 'top'
        ? rect.top - estimatedHeight - 10
        : rect.bottom + 10;

    if (top < margin) top = margin;
    if (top + estimatedHeight > vh - margin) {
      top = Math.max(margin, vh - margin - estimatedHeight);
    }

    setCoords({ top, left, width: cardWidth, placement });
  }, [preferredPlacement]);

  useLayoutEffect(() => {
    if (!isOpen) return;
    computePosition();
    const raf = window.requestAnimationFrame(computePosition);
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen, computePosition]);

  useEffect(() => {
    if (!isOpen) return;

    const handleReposition = () => computePosition();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setPinnedByTap(false);
      }
    };
    const handleOutsidePointer = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (
        target &&
        !triggerRef.current?.contains(target) &&
        !cardRef.current?.contains(target)
      ) {
        setIsOpen(false);
        setPinnedByTap(false);
      }
    };

    window.addEventListener('resize', handleReposition);
    window.addEventListener('scroll', handleReposition, true);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handleOutsidePointer);

    return () => {
      window.removeEventListener('resize', handleReposition);
      window.removeEventListener('scroll', handleReposition, true);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handleOutsidePointer);
    };
  }, [isOpen, computePosition]);

  useEffect(() => () => clearCloseTimer(), [clearCloseTimer]);

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
      return;
    }
    clearCloseTimer();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (pinnedByTap) return;
    scheduleClose();
  };

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => {
        clearCloseTimer();
      }}
      onBlur={() => {
        if (!pinnedByTap) scheduleClose();
      }}
      className={`relative group/hoverdetail ${className}`}
    >
      {children}

      {showMobileInfoBadge && (
        <button
          type="button"
          aria-label={`Details: ${title}`}
          aria-expanded={isOpen}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPinnedByTap((prev) => {
              const next = !prev;
              setIsOpen(next);
              return next;
            });
          }}
          className="lg:hidden absolute -top-2 -right-2 z-20 w-6 h-6 bg-[#121212] border border-[#FF5500] text-[#FF5500] flex items-center justify-center shadow-[0_0_10px_rgba(255,85,0,0.35)] cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      )}

      {isOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={cardRef}
            role="tooltip"
            onMouseEnter={clearCloseTimer}
            onMouseLeave={scheduleClose}
            style={{
              position: 'fixed',
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 90,
            }}
            className="animate-hover-card bg-[#121212] border-2 border-[#FF5500] p-4 sm:p-5 shadow-[0_0_36px_rgba(255,85,0,0.38)] pointer-events-auto"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#27272a] pb-3">
              <div className="flex items-center gap-2.5 min-w-0">
                {icon && (
                  <span className="w-8 h-8 bg-[#FF5500]/15 border border-[#FF5500] text-[#FF5500] flex items-center justify-center shrink-0">
                    {icon}
                  </span>
                )}
                <div className="min-w-0">
                  {badge && (
                    <span className="block font-brutal-mono text-[10px] font-bold uppercase tracking-wider text-[#FF5500]">
                      {badge}
                    </span>
                  )}
                  <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {title}
                  </h4>
                </div>
              </div>

              {pinnedByTap && (
                <button
                  type="button"
                  aria-label="Close details"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(false);
                    setPinnedByTap(false);
                  }}
                  className="p-1 border border-[#27272a] text-[#A1A1AA] hover:text-white cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <ul className="mt-3 space-y-2">
              {bullets.map((bullet, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#e4e4e7] leading-relaxed"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 bg-[#FF5500] shrink-0"
                    aria-hidden="true"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </div>
  );
}

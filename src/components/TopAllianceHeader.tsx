import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Check,
  FileText,
  Globe,
  HelpCircle,
  Home,
  Layers,
  Lock,
  Phone,
  Scale,
  ShieldAlert,
} from 'lucide-react';
import type { AppMode, Locale, TopNavSection } from '../types.ts';
import type { Translations } from '../i18n.ts';
import { HoverDetailButton } from './HoverDetailButton.tsx';

interface TopAllianceHeaderProps {
  mode: AppMode;
  onToggleMode: (nextMode: AppMode) => void;
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  overlayEnabled: boolean;
  onToggleOverlay: () => void;
  onNavigateSection: (section: TopNavSection) => void;
  t: Translations;
}

const LOCALE_OPTIONS: { code: Locale; badge: string; label: string }[] = [
  { code: 'bn', badge: 'BN', label: 'বাংলা (Default)' },
  { code: 'ja', badge: 'JP', label: '日本語' },
  { code: 'en', badge: 'EN', label: 'English' },
  { code: 'vi', badge: 'VI', label: 'Tiếng Việt' },
];

export function TopAllianceHeader({
  mode,
  onToggleMode,
  locale,
  onChangeLocale,
  overlayEnabled,
  onToggleOverlay,
  onNavigateSection,
  t,
}: TopAllianceHeaderProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!langMenuOpen) return;
    const handleOutside = (e: PointerEvent) => {
      if (!langDropdownRef.current?.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangMenuOpen(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('pointerdown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, [langMenuOpen]);

  const currentLocaleBadge =
    LOCALE_OPTIONS.find((item) => item.code === locale)?.badge ?? 'BN';

  const topNavItems: {
    id: TopNavSection;
    label: string;
    icon: typeof Home;
    hover: Translations['hoverCards']['navHome'];
  }[] = [
    { id: 'home', label: t.topNav.home, icon: Home, hover: t.hoverCards.navHome },
    { id: 'demands', label: t.topNav.demands, icon: FileText, hover: t.hoverCards.navDemands },
    { id: 'legal', label: t.topNav.legal, icon: Scale, hover: t.hoverCards.navLegal },
    { id: 'faq', label: t.topNav.faq, icon: HelpCircle, hover: t.hoverCards.navFaq },
    { id: 'privacy', label: t.topNav.privacy, icon: Lock, hover: t.hoverCards.navPrivacy },
    { id: 'contact', label: t.topNav.contact, icon: Phone, hover: t.hoverCards.navContact },
  ];

  return (
    <header className="relative lg:sticky lg:top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b-2 border-[#27272a]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-col gap-3">
        {/* Top Row: Brand Title + Highlighted Collaboration Banner | Top-Corner Links Box + Compact Icon Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">
          {/* Brand Title + Directly-Underneath Collaboration Highlight */}
          <div className="flex flex-col items-start gap-2 min-w-0">
            <button
              type="button"
              onClick={() => onNavigateSection('home')}
              className="flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] cursor-pointer"
            >
              <span className="w-2.5 h-7 sm:h-8 bg-[#FF5500] shrink-0" aria-hidden="true" />
              <span className="font-bold text-xl sm:text-2xl lg:text-[26px] tracking-tight text-white leading-none">
                {t.portalTitle}
              </span>
              {locale !== 'en' && (
                <span className="hidden sm:inline-block font-brutal-mono text-[11px] font-bold text-[#A1A1AA] tracking-wider whitespace-nowrap">
                  / HUMAN RESOURCE EXPORT
                </span>
              )}
            </button>

            {/* Highlighted Collaboration Banner Directly Under Title */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1.5 bg-[#121212] border border-[#FF5500]/75 shadow-[0_0_16px_rgba(255,85,0,0.2)] text-[11px] font-brutal-mono">
              <span className="inline-flex items-center gap-1.5 font-bold text-white whitespace-nowrap">
                <span className="px-1 py-0.5 bg-[#FF5500] text-black text-[10px] font-bold leading-none">
                  BD
                </span>
                <span>{t.collaborationPartners.bd}</span>
              </span>
              <span className="text-[#FF5500] font-bold" aria-hidden="true">
                ×
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-white whitespace-nowrap">
                <span className="px-1 py-0.5 bg-[#f59e0b] text-black text-[10px] font-bold leading-none">
                  JP
                </span>
                <span>{t.collaborationPartners.jp}</span>
              </span>
              <span className="text-[#FF5500] font-bold" aria-hidden="true">
                ×
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-white whitespace-nowrap">
                <span className="px-1 py-0.5 bg-[#10b981] text-black text-[10px] font-bold leading-none">
                  VN
                </span>
                <span>{t.collaborationPartners.vn}</span>
              </span>
            </div>
          </div>

          {/* Right Side: Top-Corner Important Links Box + Compact Icon-Only Controls */}
          <div className="flex flex-wrap items-center justify-between xl:justify-end gap-2.5">
            {/* Top-Corner Important Links & Pages Box */}
            <nav
              aria-label="Primary portal navigation"
              className="flex flex-wrap items-center gap-1 bg-[#121212] border-2 border-[#27272a] px-2 py-1.5"
            >
              {topNavItems.map((item) => {
                const NavIcon = item.icon;
                return (
                  <HoverDetailButton
                    key={item.id}
                    badge={item.hover.badge}
                    title={item.hover.title}
                    bullets={item.hover.bullets}
                    icon={<NavIcon className="w-4 h-4" aria-hidden="true" />}
                    preferredPlacement="bottom"
                    showMobileInfoBadge={false}
                  >
                    <button
                      type="button"
                      onClick={() => onNavigateSection(item.id)}
                      className="px-2.5 py-1.5 text-xs font-bold text-[#d4d4d8] hover:text-white hover:bg-[#18181b] hover:underline decoration-[#FF5500] underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </HoverDetailButton>
                );
              })}
            </nav>

            {/* Compact Icon-Only Utility Controls + Command Center Trigger */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Language Icon-Only Dropdown (44px x 44px) */}
              <div ref={langDropdownRef} className="relative">
                <HoverDetailButton
                  badge={t.hoverCards.languageSwitcher.badge}
                  title={t.hoverCards.languageSwitcher.title}
                  bullets={t.hoverCards.languageSwitcher.bullets}
                  icon={<Globe className="w-4 h-4" aria-hidden="true" />}
                  preferredPlacement="bottom"
                  showMobileInfoBadge={false}
                >
                  <button
                    type="button"
                    onClick={() => setLangMenuOpen((v) => !v)}
                    aria-label={t.modeSwitch.languageSelectLabel}
                    aria-expanded={langMenuOpen}
                    aria-haspopup="menu"
                    className={`relative w-11 h-11 border-2 flex items-center justify-center transition-colors cursor-pointer ${
                      langMenuOpen
                        ? 'border-[#FF5500] bg-[#18181b] text-[#FF5500]'
                        : 'border-[#27272a] bg-[#121212] text-white hover:border-[#FF5500]'
                    }`}
                  >
                    <Globe className="w-5 h-5" aria-hidden="true" />
                    <span className="absolute -bottom-1 -right-1 px-1 py-0.5 bg-[#FF5500] text-black font-brutal-mono text-[9px] font-bold leading-none">
                      {currentLocaleBadge}
                    </span>
                  </button>
                </HoverDetailButton>

                {langMenuOpen && (
                  <div
                    role="menu"
                    aria-label={t.labels.languageLabel}
                    className="absolute right-0 mt-2 w-48 bg-[#121212] border-2 border-[#FF5500] shadow-[0_0_28px_rgba(255,85,0,0.3)] z-50 p-1 space-y-1"
                  >
                    {LOCALE_OPTIONS.map((opt) => {
                      const active = opt.code === locale;
                      return (
                        <button
                          key={opt.code}
                          type="button"
                          role="menuitemradio"
                          aria-checked={active}
                          onClick={() => {
                            onChangeLocale(opt.code);
                            setLangMenuOpen(false);
                          }}
                          className={`w-full px-3 py-2.5 text-xs font-bold flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#FF5500] text-black'
                              : 'text-white hover:bg-[#18181b]'
                          }`}
                        >
                          <span>{opt.label}</span>
                          <span className="flex items-center gap-1 font-brutal-mono text-[10px]">
                            <span>{opt.badge}</span>
                            {active && <Check className="w-3.5 h-3.5" aria-hidden="true" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Overlay Icon-Only Toggle (44px x 44px) */}
              <HoverDetailButton
                badge={t.hoverCards.overlayToggle.badge}
                title={t.hoverCards.overlayToggle.title}
                bullets={t.hoverCards.overlayToggle.bullets}
                icon={<Layers className="w-4 h-4" aria-hidden="true" />}
                preferredPlacement="bottom"
                showMobileInfoBadge={false}
              >
                <button
                  type="button"
                  onClick={onToggleOverlay}
                  aria-label={
                    overlayEnabled ? t.modeSwitch.overlayOn : t.modeSwitch.overlayOff
                  }
                  aria-pressed={overlayEnabled}
                  className={`w-11 h-11 border-2 flex items-center justify-center transition-all cursor-pointer ${
                    overlayEnabled
                      ? 'border-[#FF5500] bg-[#18181b] text-[#FF5500] shadow-[0_0_16px_rgba(255,85,0,0.38)]'
                      : 'border-[#27272a] bg-[#121212] text-[#71717a] hover:text-white'
                  }`}
                >
                  <Layers className="w-5 h-5" aria-hidden="true" />
                </button>
              </HoverDetailButton>

              {/* Compact Command Center Trigger */}
              <HoverDetailButton
                badge={t.hoverCards.commandCenter.badge}
                title={t.hoverCards.commandCenter.title}
                bullets={t.hoverCards.commandCenter.bullets}
                icon={<ShieldAlert className="w-4 h-4" aria-hidden="true" />}
                preferredPlacement="bottom"
                showMobileInfoBadge={false}
              >
                <button
                  type="button"
                  onClick={() => onToggleMode(mode === 'public' ? 'admin' : 'public')}
                  className={`h-11 px-3.5 border-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    mode === 'admin'
                      ? 'border-[#10b981] bg-[#10b981] text-black hover:bg-[#34d399]'
                      : 'border-[#FF5500] bg-[#18181b] text-white hover:bg-[#FF5500] hover:text-black shadow-[0_0_18px_rgba(255,85,0,0.22)]'
                  }`}
                >
                  {mode === 'public' ? (
                    <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <ArrowLeftRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                  <span>
                    {mode === 'public' ? t.modeSwitch.toAdmin : t.modeSwitch.toPublic}
                  </span>
                </button>
              </HoverDetailButton>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

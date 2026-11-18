import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Check,
  Briefcase,
  Globe,
  HelpCircle,
  Home,
  Layers,
  ShieldCheck,
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
  const [activeNav, setActiveNav] = useState<TopNavSection>('home');
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
    { id: 'demands', label: t.topNav.demands, icon: Briefcase, hover: t.hoverCards.navDemands },
    { id: 'legal', label: t.topNav.legal, icon: Scale, hover: t.hoverCards.navLegal },
    { id: 'faq', label: t.topNav.faq, icon: HelpCircle, hover: t.hoverCards.navFaq },
    { id: 'privacy', label: t.topNav.privacy, icon: ShieldCheck, hover: t.hoverCards.navPrivacy },
    { id: 'contact', label: t.topNav.contact, icon: Phone, hover: t.hoverCards.navContact },
  ];

  const handleNavClick = (id: TopNavSection) => {
    setActiveNav(id);
    onNavigateSection(id);
  };

  return (
    <header className="relative lg:sticky lg:top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b-2 border-[#27272a]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col gap-2">
        {/* TOP ROW: Brand Title (Left) + Language, Overlay & Admin Panel in Top-Right Corner */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Title */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-3 text-left min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500] cursor-pointer"
          >
            <span className="w-2 sm:w-2.5 h-6 sm:h-7 bg-[#FF5500] shrink-0" aria-hidden="true" />
            <span className="font-bold text-base sm:text-xl lg:text-2xl tracking-tight text-white truncate">
              {t.portalTitle}
            </span>
            {locale !== 'en' && (
              <span className="hidden xl:inline-block font-brutal-mono text-[11px] font-bold text-[#A1A1AA] tracking-wider whitespace-nowrap shrink-0">
                / HUMAN RESOURCE EXPORT
              </span>
            )}
          </button>

          {/* Top-Right Corner Controls: Language + Overlay + Admin Panel */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Icon-Only Dropdown */}
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
                  className={`relative w-10 h-10 sm:w-11 sm:h-11 border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    langMenuOpen
                      ? 'border-[#FF5500] bg-[#18181b] text-[#FF5500]'
                      : 'border-[#27272a] bg-[#121212] text-white hover:border-[#FF5500]'
                  }`}
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
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

            {/* Overlay Icon-Only Toggle */}
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
                className={`w-10 h-10 sm:w-11 sm:h-11 border-2 flex items-center justify-center transition-all cursor-pointer ${
                  overlayEnabled
                    ? 'border-[#FF5500] bg-[#18181b] text-[#FF5500] shadow-[0_0_14px_rgba(255,85,0,0.35)]'
                    : 'border-[#27272a] bg-[#121212] text-[#71717a] hover:text-white'
                }`}
              >
                <Layers className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              </button>
            </HoverDetailButton>

            {/* Admin Panel / Command Center Trigger (Icon in top corner on mobile, Icon + Text on desktop) */}
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
                aria-label={mode === 'public' ? t.modeSwitch.toAdmin : t.modeSwitch.toPublic}
                className={`h-10 w-10 sm:w-auto sm:h-11 sm:px-3.5 border-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === 'admin'
                    ? 'border-[#10b981] bg-[#10b981] text-black hover:bg-[#34d399]'
                    : 'border-[#FF5500] bg-[#18181b] text-white hover:bg-[#FF5500] hover:text-black shadow-[0_0_16px_rgba(255,85,0,0.22)]'
                }`}
              >
                {mode === 'public' ? (
                  <ShieldAlert className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                ) : (
                  <ArrowLeftRight className="w-4 h-4 sm:w-4 sm:h-4 shrink-0" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {mode === 'public' ? t.modeSwitch.toAdmin : t.modeSwitch.toPublic}
                </span>
              </button>
            </HoverDetailButton>
          </div>
        </div>

        {/* SECOND ROW: Highlighted Collaboration Banner (Left) + Pro Responsive Nav Links (Right) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
          {/* Highlighted Collaboration Strip Directly Under Title */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 px-2.5 py-1 bg-[#121212] border border-[#FF5500]/65 shadow-[0_0_14px_rgba(255,85,0,0.16)] text-[10px] sm:text-[11px] font-brutal-mono self-start lg:self-auto">
            <span className="inline-flex items-center gap-1 font-bold text-white whitespace-nowrap">
              <span className="px-1 py-0.5 bg-[#FF5500] text-black text-[9px] font-bold leading-none">
                BD
              </span>
              <span>{t.collaborationPartners.bd}</span>
            </span>
            <span className="text-[#FF5500] font-bold" aria-hidden="true">
              ×
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-white whitespace-nowrap">
              <span className="px-1 py-0.5 bg-[#f59e0b] text-black text-[9px] font-bold leading-none">
                JP
              </span>
              <span>{t.collaborationPartners.jp}</span>
            </span>
            <span className="text-[#FF5500] font-bold" aria-hidden="true">
              ×
            </span>
            <span className="inline-flex items-center gap-1 font-bold text-white whitespace-nowrap">
              <span className="px-1 py-0.5 bg-[#10b981] text-black text-[9px] font-bold leading-none">
                VN
              </span>
              <span>{t.collaborationPartners.vn}</span>
            </span>
          </div>

          {/* Pro Navigation Bar: Big Icons ONLY on Mobile (<md), Full Text + Icons on Desktop (md+) */}
          <nav
            aria-label="Primary portal navigation"
            className="grid grid-cols-6 md:flex md:flex-wrap items-center gap-1.5 md:gap-1 bg-[#121212] border border-[#27272a] p-1"
          >
            {topNavItems.map((item) => {
              const NavIcon = item.icon;
              const isSelected = activeNav === item.id && mode === 'public';
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
                    onClick={() => handleNavClick(item.id)}
                    aria-label={item.label}
                    title={item.label}
                    className={`w-full md:w-auto min-h-[44px] md:min-h-[38px] md:px-3 flex items-center justify-center gap-2 text-xs font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer border ${
                      isSelected
                        ? 'bg-[#18181b] border-[#FF5500] text-white shadow-[0_0_12px_rgba(255,85,0,0.2)]'
                        : 'bg-transparent border-transparent text-[#d4d4d8] hover:text-white hover:bg-[#18181b] hover:border-[#27272a]'
                    }`}
                  >
                    <NavIcon
                      className={`w-5 h-5 md:w-4 md:h-4 shrink-0 ${
                        isSelected ? 'text-[#FF5500]' : 'text-[#FF5500]/85'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="hidden md:inline">{item.label}</span>
                  </button>
                </HoverDetailButton>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}

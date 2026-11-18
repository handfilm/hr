import { Layers, ShieldAlert, ArrowLeftRight } from 'lucide-react';
import { AppMode, Locale } from '../types';
import { Translations } from '../i18n';

interface TopAllianceHeaderProps {
  mode: AppMode;
  onToggleMode: (nextMode: AppMode) => void;
  locale: Locale;
  onChangeLocale: (locale: Locale) => void;
  overlayEnabled: boolean;
  onToggleOverlay: () => void;
  t: Translations;
}

const LOCALE_BUTTONS: { code: Locale; label: string }[] = [
  { code: 'bn', label: 'বাংলা' },
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'EN' },
  { code: 'vi', label: 'TIẾNG VIỆT' },
];

export function TopAllianceHeader({
  mode,
  onToggleMode,
  locale,
  onChangeLocale,
  overlayEnabled,
  onToggleOverlay,
  t,
}: TopAllianceHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b-2 border-[#27272a]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex flex-col xl:flex-row xl:items-center justify-between gap-3">
        {/* Bold Tri-National Alliance Branding */}
        <div className="flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onToggleMode('public')}
            className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5500]"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-block w-3 h-6 bg-[#FF5500] shrink-0" aria-hidden="true" />
              <span className="font-brutal-display text-2xl sm:text-3xl tracking-wider text-white whitespace-nowrap">
                {t.portalTitle}
              </span>
            </div>
            <p className="font-brutal-mono text-[10px] sm:text-xs text-[#A1A1AA] tracking-wider mt-0.5">
              {t.allianceBrand}
            </p>
          </button>
        </div>

        {/* Right Controls: 4-Language Switcher + Overlay Toggle + Command Center Switch */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div
            className="flex items-center bg-[#121212] border-2 border-[#27272a] p-1"
            role="group"
            aria-label={t.labels.languageLabel}
          >
            {LOCALE_BUTTONS.map((btn) => {
              const active = locale === btn.code;
              return (
                <button
                  key={btn.code}
                  type="button"
                  onClick={() => onChangeLocale(btn.code)}
                  className={`px-3 py-2 text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#FF5500] text-black'
                      : 'text-[#A1A1AA] hover:text-white hover:bg-[#18181b]'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onToggleOverlay}
            className={`px-3.5 py-2.5 border-2 font-brutal-mono text-xs font-bold flex items-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              overlayEnabled
                ? 'border-[#FF5500] bg-[#18181b] text-[#FF5500]'
                : 'border-[#27272a] bg-[#121212] text-[#A1A1AA] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{overlayEnabled ? t.modeSwitch.overlayOn : t.modeSwitch.overlayOff}</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleMode(mode === 'public' ? 'admin' : 'public')}
            className={`px-4 py-2.5 border-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'admin'
                ? 'border-[#10b981] bg-[#10b981] text-black hover:bg-[#34d399]'
                : 'border-[#FF5500] bg-[#18181b] text-white hover:bg-[#FF5500] hover:text-black shadow-[0_0_20px_rgba(255,85,0,0.22)]'
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
        </div>
      </div>
    </header>
  );
}

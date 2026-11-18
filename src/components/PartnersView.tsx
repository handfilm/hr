import { FormEvent, useEffect, useState } from 'react';
import { Check, RotateCcw, Settings2 } from 'lucide-react';
import type { PartnerHub } from '../types.ts';
import type { Translations } from '../i18n.ts';
import { BangladeshFlag, JapanFlag, VietnamFlag } from './CountryFlags.tsx';

interface PartnersViewProps {
  hubs: PartnerHub[];
  vietnamPartnerName: string;
  onUpdateVietnamPartnerName: (nextName: string) => void;
  onResetVietnamPartnerName: () => void;
  t: Translations;
}

export function PartnersView({
  hubs,
  vietnamPartnerName,
  onUpdateVietnamPartnerName,
  onResetVietnamPartnerName,
  t,
}: PartnersViewProps) {
  const [draftName, setDraftName] = useState(vietnamPartnerName);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setDraftName(vietnamPartnerName);
  }, [vietnamPartnerName]);

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = draftName.trim();
    if (!cleaned) return;
    onUpdateVietnamPartnerName(cleaned);
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="border-b-2 border-[#27272a] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white uppercase">{t.nav.partners}</h2>
          <p className="mt-1 font-brutal-mono text-xs text-[#A1A1AA]">
            DHAKA × HANOI &amp; HUNG YEN × TOKYO, OSAKA &amp; NAGOYA
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#121212] border border-[#27272a] px-3 py-1.5">
          <BangladeshFlag label="Bangladesh" />
          <span className="text-[#FF5500] font-bold text-xs">×</span>
          <JapanFlag label="Japan" />
          <span className="text-[#FF5500] font-bold text-xs">×</span>
          <VietnamFlag label="Vietnam" />
        </div>
      </div>

      {/* Editable Vietnam Facility Partner Name Settings */}
      <form
        onSubmit={handleSave}
        className="bg-[#121212] border-2 border-[#27272a] focus-within:border-[#FF5500] p-5 space-y-4 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <Settings2 className="w-5 h-5 text-[#FF5500] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-brutal-mono text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                {t.partnerSettings.title}
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                {t.partnerSettings.subtitle}
              </p>
            </div>
          </div>

          {savedNotice && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#10b981]/15 border border-[#10b981] font-brutal-mono text-[11px] font-bold text-[#10b981] shrink-0">
              <Check className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.partnerSettings.savedNotice}</span>
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label
              htmlFor="vn-partner-name-input"
              className="sr-only"
            >
              {t.partnerSettings.fieldLabel}
            </label>
            <div className="flex items-center bg-[#0a0a0a] border-2 border-[#27272a] focus-within:border-[#FF5500] px-3">
              <VietnamFlag label="Vietnam" className="mr-2.5" />
              <input
                id="vn-partner-name-input"
                type="text"
                required
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="QUYNH AN YARN CO., LTD"
                className="w-full min-h-[48px] bg-transparent text-white font-brutal-mono text-xs sm:text-sm font-bold focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="min-h-[48px] px-5 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-xs uppercase tracking-wider cursor-pointer shrink-0 transition-colors"
          >
            {t.partnerSettings.saveBtn}
          </button>

          <button
            type="button"
            onClick={() => {
              onResetVietnamPartnerName();
              setSavedNotice(true);
              window.setTimeout(() => setSavedNotice(false), 2500);
            }}
            className="min-h-[48px] px-4 bg-[#18181b] border-2 border-[#27272a] hover:border-[#FF5500] text-white font-brutal-mono text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shrink-0 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.partnerSettings.resetBtn}</span>
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hubs.map((hub) => {
          const borderAccent =
            hub.country === 'Bangladesh'
              ? 'border-[#FF5500]'
              : hub.country === 'Vietnam'
                ? 'border-[#10b981]'
                : 'border-[#f59e0b]';
          const textAccent =
            hub.country === 'Bangladesh'
              ? 'text-[#FF5500]'
              : hub.country === 'Vietnam'
                ? 'text-[#10b981]'
                : 'text-[#f59e0b]';

          const FlagIcon =
            hub.country === 'Bangladesh'
              ? BangladeshFlag
              : hub.country === 'Vietnam'
                ? VietnamFlag
                : JapanFlag;

          const displayOrganization =
            hub.country === 'Vietnam' ? vietnamPartnerName : hub.organization;

          return (
            <article
              key={hub.id}
              className={`bg-[#121212] border-2 ${borderAccent} p-6 flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2">
                    <FlagIcon label={hub.country} />
                    <p className={`font-brutal-mono text-xs font-bold uppercase ${textAccent}`}>
                      {hub.country} · {hub.city}
                    </p>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-white break-words">
                    {displayOrganization}
                  </h3>
                </div>
                <p className="text-sm font-semibold text-[#A1A1AA]">{hub.role}</p>
              </div>

              <dl className="space-y-3 border-t-2 border-[#27272a] pt-4 text-xs">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">COORDINATOR</dt>
                  <dd className="font-bold text-white">{hub.leadCoordinator}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">DESK EMAIL</dt>
                  <dd className="font-brutal-mono text-[#FF5500]">{hub.contactEmail}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-brutal-mono text-[#A1A1AA]">CAPACITY</dt>
                  <dd className="font-brutal-mono font-bold text-white tabular-nums">
                    {hub.activeCenters} HUBS · {hub.currentCapacity} SEATS
                  </dd>
                </div>
                <div className="pt-3 border-t border-[#27272a]">
                  <dt className="font-brutal-mono text-[#A1A1AA] mb-1">SECTORS</dt>
                  <dd className="text-white font-semibold leading-relaxed">{hub.focusPrograms}</dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}

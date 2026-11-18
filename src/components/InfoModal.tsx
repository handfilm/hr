import { useEffect, useState } from 'react';
import {
  ChevronDown,
  HelpCircle,
  Lock,
  Mail,
  MapPin,
  Phone,
  Clock,
  X,
} from 'lucide-react';
import type { InfoModalType } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface InfoModalProps {
  type: Exclude<InfoModalType, null>;
  t: Translations;
  onClose: () => void;
}

export function InfoModal({ type, t, onClose }: InfoModalProps) {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const title =
    type === 'faq'
      ? t.infoModals.faq.title
      : type === 'privacy'
        ? t.infoModals.privacy.title
        : t.infoModals.contact.title;

  const subtitle =
    type === 'faq'
      ? t.infoModals.faq.subtitle
      : type === 'privacy'
        ? t.infoModals.privacy.subtitle
        : t.infoModals.contact.subtitle;

  const HeaderIcon =
    type === 'faq' ? HelpCircle : type === 'privacy' ? Lock : Phone;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="info-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-[0_0_48px_rgba(255,85,0,0.28)]">
        <div className="px-6 py-5 bg-[#18181b] border-b-2 border-[#27272a] flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <HeaderIcon className="w-6 h-6 text-[#FF5500] shrink-0" aria-hidden="true" />
            <div className="min-w-0">
              <h2
                id="info-modal-title"
                className="text-lg sm:text-xl font-bold text-white truncate"
              >
                {title}
              </h2>
              <p className="font-brutal-mono text-xs text-[#A1A1AA] truncate mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.actions.close}
            className="w-11 h-11 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-5">
          {type === 'faq' && (
            <div className="space-y-3">
              {t.infoModals.faq.items.map((item, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className={`border-2 transition-colors ${
                      isOpen
                        ? 'border-[#FF5500] bg-[#18181b]'
                        : 'border-[#27272a] bg-[#0a0a0a] hover:border-[#52525b]'
                    }`}
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-white leading-snug">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#FF5500] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 border-t border-[#27272a] text-sm text-[#d4d4d8] leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-5">
              <div className="bg-[#18181b] border-2 border-[#10b981] p-5">
                <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {t.infoModals.privacy.summary}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.infoModals.privacy.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-[#0a0a0a] border-2 border-[#27272a] p-5 space-y-2"
                  >
                    <h3 className="text-sm font-bold text-[#FF5500]">{sec.heading}</h3>
                    <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
                      {sec.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === 'contact' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {t.infoModals.contact.desks.map((desk, idx) => (
                <article
                  key={idx}
                  className="bg-[#18181b] border-2 border-[#27272a] hover:border-[#FF5500] p-5 flex flex-col justify-between space-y-4 transition-colors"
                >
                  <div className="space-y-2">
                    <p className="font-brutal-mono text-[11px] font-bold text-[#FF5500]">
                      {desk.country}
                    </p>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {desk.org}
                    </h3>
                  </div>

                  <div className="space-y-2.5 text-xs text-[#d4d4d8] border-t border-[#27272a] pt-3">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{desk.address}</span>
                    </p>
                    <p className="flex items-center gap-2 font-brutal-mono">
                      <Phone className="w-4 h-4 text-[#10b981] shrink-0" aria-hidden="true" />
                      <span>{desk.phone}</span>
                    </p>
                    <p className="flex items-center gap-2 font-brutal-mono break-all">
                      <Mail className="w-4 h-4 text-[#f59e0b] shrink-0" aria-hidden="true" />
                      <span>{desk.email}</span>
                    </p>
                    <p className="flex items-center gap-2 font-brutal-mono text-[#A1A1AA]">
                      <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>{desk.hours}</span>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[56px] bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-sm uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.actions.close}
          </button>
        </div>
      </div>
    </div>
  );
}

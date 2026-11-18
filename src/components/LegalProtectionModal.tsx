import { CheckSquare, Scale, X } from 'lucide-react';
import { Translations } from '../i18n';

interface LegalProtectionModalProps {
  t: Translations;
  onClose: () => void;
}

export function LegalProtectionModal({ t, onClose }: LegalProtectionModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_0_40px_rgba(255,85,0,0.25)]">
        <div className="px-6 py-5 border-b-2 border-[#27272a] flex items-center justify-between gap-4 bg-[#18181b]">
          <div className="flex items-center gap-3">
            <Scale className="w-6 h-6 text-[#FF5500] shrink-0" aria-hidden="true" />
            <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white">
              {t.legalModal.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.legalModal.close}
            className="p-2 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-brutal-mono text-xs uppercase tracking-wider text-[#FF5500] mb-3">
              {t.legalModal.overtimeTitle}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {t.legalModal.overtimeItems.map((item) => (
                <div
                  key={item.rate}
                  className="bg-[#18181b] border-2 border-[#27272a] p-4 flex flex-col justify-between"
                >
                  <span className="font-brutal-display text-4xl text-[#f59e0b] tabular-nums">
                    {item.rate}
                  </span>
                  <span className="mt-2 text-xs font-bold text-white leading-snug">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t-2 border-[#27272a] pt-5">
            <h3 className="font-brutal-mono text-xs uppercase tracking-wider text-[#10b981] mb-3">
              {t.legalModal.bmetTitle}
            </h3>
            <div className="space-y-2.5">
              {t.legalModal.bmetItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-[#18181b] border-2 border-[#27272a] p-3.5"
                >
                  <CheckSquare className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-sm font-semibold text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[68px] bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-base uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.legalModal.close}
          </button>
        </div>
      </div>
    </div>
  );
}

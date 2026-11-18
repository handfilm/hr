import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import type { TopNavSection } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface FooterProps {
  t: Translations;
  onNavigateSection: (section: TopNavSection) => void;
}

export function Footer({ t, onNavigateSection }: FooterProps) {
  const quickLinks: { id: TopNavSection; label: string }[] = [
    { id: 'home', label: t.topNav.home },
    { id: 'demands', label: t.topNav.demands },
    { id: 'legal', label: t.topNav.legal },
    { id: 'faq', label: t.topNav.faq },
    { id: 'privacy', label: t.topNav.privacy },
    { id: 'contact', label: t.topNav.contact },
  ];

  return (
    <footer className="relative z-10 bg-[#070707] border-t-2 border-[#27272a] mt-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#27272a]">
          {/* Left Column: HUMAN RESOURCE EXPORT + Zero-Fraud BMET Notice */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-2 h-6 bg-[#FF5500] shrink-0" aria-hidden="true" />
              <h2 className="text-lg sm:text-xl font-bold tracking-wide text-white">
                {t.footer.brandTitle}
              </h2>
            </div>
            <p className="font-brutal-mono text-xs text-[#FF5500] tracking-wide">
              {t.collaborationPartners.bd} × {t.collaborationPartners.jp} ×{' '}
              {t.collaborationPartners.vn}
            </p>
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

        {/* Bottom Bar: Copyright + Technology Provider Badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-brutal-mono text-[11px] text-[#A1A1AA]">
            {t.footer.copyright}
          </p>

          <a
            href="https://handsandhead.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#121212] border border-[#27272a] hover:border-[#FF5500] text-xs font-brutal-mono transition-colors shrink-0"
          >
            <span className="text-[#A1A1AA]">{t.footer.techProviderLabel}</span>
            <span className="font-bold text-[#FF5500]">{t.footer.techProviderName}</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#FF5500]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

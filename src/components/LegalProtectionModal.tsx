import { FormEvent, useState } from 'react';
import {
  AlertTriangle,
  CheckSquare,
  ExternalLink,
  Globe,
  Loader2,
  Scale,
  Search,
  X,
} from 'lucide-react';
import type { Locale } from '../types.ts';
import type { Translations } from '../i18n.ts';

interface LegalProtectionModalProps {
  t: Translations;
  locale: Locale;
  onClose: () => void;
}

interface SearchSource {
  title: string;
  uri: string;
}

interface LegalSearchResponse {
  topic: string;
  queryUsed: string;
  summary: string;
  sources: SearchSource[];
  searchedAt: string;
}

export function LegalProtectionModal({ t, locale, onClose }: LegalProtectionModalProps) {
  const [customQuery, setCustomQuery] = useState('');
  const [activeTopic, setActiveTopic] = useState<'bmet' | 'vietnam_labor' | 'custom' | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<LegalSearchResponse | null>(null);

  const runLiveLookup = async (
    topic: 'bmet' | 'vietnam_labor' | 'custom',
    queryText?: string,
  ) => {
    setActiveTopic(topic);
    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('./api/legal/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          query: queryText,
          locale,
        }),
      });

      const contentType = response.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        throw new Error(
          'Live Google Search requires the Node/Express API backend (/api/legal/search). Static preview does not execute server routes.',
        );
      }

      const payload = (await response.json()) as Partial<LegalSearchResponse> & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error || `Search request failed (${response.status})`);
      }

      setResult({
        topic: payload.topic ?? topic,
        queryUsed: payload.queryUsed ?? '',
        summary: payload.summary ?? '',
        sources: Array.isArray(payload.sources) ? payload.sources : [],
        searchedAt: payload.searchedAt ?? new Date().toISOString(),
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Unable to complete live web search.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;
    void runLiveLookup('custom', customQuery.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#121212] border-2 border-[#FF5500] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-[0_0_40px_rgba(255,85,0,0.25)]">
        <div className="px-6 py-5 border-b-2 border-[#27272a] flex items-center justify-between gap-4 bg-[#18181b] sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <Scale className="w-6 h-6 text-[#FF5500] shrink-0" aria-hidden="true" />
            <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold text-white truncate">
              {t.legalModal.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.legalModal.close}
            className="p-2 border-2 border-[#27272a] text-[#A1A1AA] hover:text-white hover:border-[#FF5500] cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Static Vietnam Overtime Matrix */}
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

          {/* Static Bangladesh BMET Checklist */}
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

          {/* Real-Time Google Search Grounding Panel */}
          <div className="border-t-2 border-[#27272a] pt-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#FF5500] shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="font-brutal-mono text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    {t.legalModal.liveSearchHeading}
                  </h3>
                  <p className="text-xs text-[#A1A1AA] mt-0.5">
                    {t.legalModal.liveSearchSubheading}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                disabled={loading}
                onClick={() => void runLiveLookup('bmet')}
                className={`min-h-[48px] px-4 border-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 ${
                  activeTopic === 'bmet'
                    ? 'border-[#10b981] bg-[#10b981]/15 text-[#10b981]'
                    : 'border-[#27272a] bg-[#18181b] text-white hover:border-[#10b981]'
                }`}
              >
                <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.legalModal.liveBtnBmet}</span>
              </button>

              <button
                type="button"
                disabled={loading}
                onClick={() => void runLiveLookup('vietnam_labor')}
                className={`min-h-[48px] px-4 border-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60 ${
                  activeTopic === 'vietnam_labor'
                    ? 'border-[#f59e0b] bg-[#f59e0b]/15 text-[#f59e0b]'
                    : 'border-[#27272a] bg-[#18181b] text-white hover:border-[#f59e0b]'
                }`}
              >
                <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.legalModal.liveBtnVietnam}</span>
              </button>
            </div>

            <form onSubmit={handleCustomSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="text"
                value={customQuery}
                onChange={(e) => setCustomQuery(e.target.value)}
                placeholder={t.legalModal.liveSearchPlaceholder}
                className="flex-1 min-h-[48px] px-4 bg-[#0a0a0a] border-2 border-[#27272a] focus:border-[#FF5500] text-white text-xs sm:text-sm placeholder:text-[#71717a] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading || !customQuery.trim()}
                className="min-h-[48px] px-5 bg-[#18181b] border-2 border-[#FF5500] text-[#FF5500] hover:bg-[#FF5500] hover:text-black font-brutal-mono text-xs font-bold uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="w-4 h-4" aria-hidden="true" />
                )}
                <span>{t.legalModal.liveSearchBtn}</span>
              </button>
            </form>

            {loading && (
              <div className="bg-[#18181b] border-2 border-[#FF5500]/60 p-4 flex items-center gap-3 text-xs font-brutal-mono text-[#FF5500]">
                <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
                <span>{t.legalModal.liveSearching}</span>
              </div>
            )}

            {errorMsg && !loading && (
              <div className="bg-[#e11d48]/10 border-2 border-[#e11d48] p-4 flex items-start gap-3 text-xs text-white">
                <AlertTriangle className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="leading-relaxed">{errorMsg}</p>
              </div>
            )}

            {result && !loading && (
              <div className="bg-[#0a0a0a] border-2 border-[#27272a] p-4 sm:p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#27272a] pb-2.5">
                  <span className="font-brutal-mono text-[10px] font-bold text-[#10b981] uppercase">
                    {t.legalModal.liveDisclaimer}
                  </span>
                  <span className="font-brutal-mono text-[10px] text-[#A1A1AA] tabular-nums">
                    {t.legalModal.liveSearchedAtLabel}:{' '}
                    {new Date(result.searchedAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="text-xs sm:text-sm text-[#e4e4e7] leading-relaxed whitespace-pre-line">
                  {result.summary}
                </div>

                {result.sources.length > 0 && (
                  <div className="border-t border-[#27272a] pt-3 space-y-2">
                    <p className="font-brutal-mono text-[11px] font-bold text-[#f59e0b] uppercase">
                      {t.legalModal.liveSourcesLabel} ({result.sources.length})
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {result.sources.map((src, idx) => (
                        <a
                          key={idx}
                          href={src.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 px-3 py-2 bg-[#18181b] border border-[#27272a] hover:border-[#FF5500] text-xs text-white transition-colors"
                        >
                          <span className="truncate font-semibold">{src.title}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-[#FF5500] shrink-0" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full min-h-[60px] bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-base uppercase tracking-wider transition-colors cursor-pointer"
          >
            {t.legalModal.close}
          </button>
        </div>
      </div>
    </div>
  );
}

import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

export const LegalSearchInputSchema = z.object({
  topic: z.enum(['bmet', 'vietnam_labor', 'custom']).default('bmet'),
  query: z.string().max(300).optional(),
  locale: z.enum(['bn', 'ja', 'en', 'vi']).default('en'),
});

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface LegalSearchResult {
  topic: 'bmet' | 'vietnam_labor' | 'custom';
  queryUsed: string;
  summary: string;
  sources: GroundingSource[];
  searchedAt: string;
}

export class GeminiUnavailableError extends Error {
  public readonly statusCode = 503;
  constructor(message: string) {
    super(message);
  }
}

const LOCALE_LANGUAGE_NAMES: Record<'bn' | 'ja' | 'en' | 'vi', string> = {
  bn: 'Bengali (বাংলা)',
  ja: 'Japanese (日本語)',
  en: 'English',
  vi: 'Vietnamese (Tiếng Việt)',
};

function buildPrompt(
  topic: 'bmet' | 'vietnam_labor' | 'custom',
  customQuery: string | undefined,
  locale: 'bn' | 'ja' | 'en' | 'vi',
): { prompt: string; queryUsed: string } {
  const langLabel = LOCALE_LANGUAGE_NAMES[locale];

  if (topic === 'bmet') {
    const queryUsed =
      'Bangladesh BMET demand letter attestation, emigration clearance, Smart Card & overseas employment rules (bmet.gov.bd / probashi.gov.bd)';
    const prompt = [
      `Using live Google Search results from official Bangladesh government portals (such as bmet.gov.bd, probashi.gov.bd, Bangladesh Embassy guidelines, and official notices), summarize the current Bangladesh BMET (Bureau of Manpower, Employment and Training) requirements for:`,
      `1. Overseas Demand Letter & Power of Attorney embassy attestation`,
      `2. BMET Biometric Registration, Fingerprinting & Emigration Clearance / Smart Card issuance`,
      `3. Pre-departure orientation, medical fitness, and worker legal protections against fraud`,
      `Provide clear, concise bullet points in ${langLabel} (keep BMET technical terms recognizable). Include concrete steps verified from search sources.`,
    ].join('\n');
    return { prompt, queryUsed };
  }

  if (topic === 'vietnam_labor') {
    const queryUsed =
      'Vietnam Labor Code 2019 overtime rates (150%, 200%, 300%, +30% night shift), working hours & foreign worker Decree guidelines';
    const prompt = [
      `Using live Google Search results from official Vietnamese legal sources (such as Vietnam Labor Code 2019 / Bộ luật Lao động 2019, MOLISA, Vietnam Government Portal, ILO Vietnam, or Decree 152/2020/ND-CP & Decree 70/2023/ND-CP), summarize current statutory worker rules covering:`,
      `1. Statutory overtime pay rates (regular working days 150%, weekly rest days 200%, public holidays 300%, and night shift +30% allowance)`,
      `2. Maximum shift/overtime limits, rest breaks, and foreign industrial work permit / contract compliance`,
      `3. Key worker protections and wage payment guarantees`,
      `Respond concisely in clear bullet points in ${langLabel}.`,
    ].join('\n');
    return { prompt, queryUsed };
  }

  const sanitized = (customQuery ?? '').trim();
  const queryUsed =
    sanitized || 'Bangladesh BMET attestation and Vietnam Labor Code overseas employment guidelines';
  const prompt = [
    `Answer the following overseas employment compliance question using authoritative web sources via Google Search (Bangladesh BMET, Probashi Kallyan, Vietnam Labor Code 2019, MOLISA, or Embassy attestation portals):`,
    `Question: "${queryUsed}"`,
    `Provide a factual, structured summary with bullet points in ${langLabel}. Do not invent URLs or statutes.`,
  ].join('\n');
  return { prompt, queryUsed };
}

export async function runLegalSearchGrounding(rawInput: unknown): Promise<LegalSearchResult> {
  const input = LegalSearchInputSchema.parse(rawInput);

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new GeminiUnavailableError(
      'Live web search is unavailable because GEMINI_API_KEY is not configured on the server.',
    );
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const { prompt, queryUsed } = buildPrompt(input.topic, input.query, input.locale);

  const response = await ai.models.generateContent({
    model: 'gemini-4-hydrogen',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });

  const summary = response.text?.trim() ?? '';
  if (!summary) {
    throw new Error('Empty response returned from grounded web search.');
  }

  const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
  const seenUris = new Set<string>();
  const sources: GroundingSource[] = [];

  for (const chunk of rawChunks) {
    const uri = chunk.web?.uri?.trim();
    if (!uri || seenUris.has(uri)) continue;
    seenUris.add(uri);
    sources.push({
      title: chunk.web?.title?.trim() || uri,
      uri,
    });
  }

  return {
    topic: input.topic,
    queryUsed,
    summary,
    sources,
    searchedAt: new Date().toISOString(),
  };
}

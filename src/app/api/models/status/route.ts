import { NextResponse } from 'next/server';

type ProviderStatus = {
  available: boolean;
  reason?: string;
};

// Cache results for 60 seconds to avoid spamming APIs
let cache: { data: Record<string, ProviderStatus>; timestamp: number } | null = null;
const CACHE_TTL = 60_000;

async function checkGemini(): Promise<ProviderStatus> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return { available: false, reason: 'GEMINI_API_KEY não configurada' };
  
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${key}`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (res.ok) return { available: true };
    if (res.status === 400 || res.status === 403) return { available: false, reason: 'API Key Gemini inválida' };
    return { available: false, reason: `Gemini indisponível (${res.status})` };
  } catch {
    return { available: false, reason: 'Não foi possível conectar ao Gemini' };
  }
}

async function checkOpenRouter(): Promise<ProviderStatus> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) return { available: false, reason: 'OPENROUTER_API_KEY não configurada' };

  try {
    const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: { 'Authorization': `Bearer ${key}` },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { available: false, reason: 'API Key OpenRouter inválida' };
    const data = await res.json();
    const limit = data.data?.limit;
    const usage = data.data?.usage;
    if (limit && usage !== undefined && usage >= limit) {
      return { available: false, reason: 'Créditos OpenRouter esgotados' };
    }
    return { available: true };
  } catch {
    return { available: false, reason: 'Não foi possível conectar ao OpenRouter' };
  }
}

async function checkPerplexity(): Promise<ProviderStatus> {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) return { available: false, reason: 'PERPLEXITY_API_KEY não configurada' };
  if (!key.startsWith('pplx-')) return { available: false, reason: 'PERPLEXITY_API_KEY formato inválido' };
  return { available: true };
}

async function checkOpenAI(): Promise<ProviderStatus> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { available: false, reason: 'OPENAI_API_KEY não configurada' };
  if (!key.startsWith('sk-')) return { available: false, reason: 'OPENAI_API_KEY formato inválido' };
  return { available: true };
}

async function checkLocal(): Promise<ProviderStatus> {
  const baseUrl = process.env.LOCAL_BASE_URL || 'http://localhost:1234/v1';
  try {
    const res = await fetch(`${baseUrl}/models`, { signal: AbortSignal.timeout(2000) });
    if (res.ok) return { available: true };
    return { available: false, reason: 'Servidor local não respondeu' };
  } catch {
    return { available: false, reason: 'Servidor local offline (LM Studio)' };
  }
}

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  const [gemini, openrouter, perplexity, openai, local] = await Promise.all([
    checkGemini(),
    checkOpenRouter(),
    checkPerplexity(),
    checkOpenAI(),
    checkLocal(),
  ]);

  const statuses: Record<string, ProviderStatus> = {
    gemini,
    openrouter,
    perplexity,
    openai,
    local,
  };

  cache = { data: statuses, timestamp: Date.now() };
  return NextResponse.json(statuses);
}

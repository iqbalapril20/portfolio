import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const ABACUS_NAMESPACE = 'iqbalapril20-portfolio';
const ABACUS_KEY = 'visits';
const COUNTAPI_KEY = 'iqbalapril20_portfolio_visits';
const REDIS_KEY = 'portfolio:visitors';

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 4000) {
  return fetch(url, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(timeoutMs),
  });
}

async function queryUpstash(increment: boolean): Promise<number | null> {
  const restUrl = process.env.UPSTASH_REDIS_REST_URL;
  const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!restUrl || !restToken) return null;

  const command = increment ? `incr/${REDIS_KEY}` : `get/${REDIS_KEY}`;
  const response = await fetchWithTimeout(`${restUrl.replace(/\/+$/, '')}/${command}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${restToken}`,
    },
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { result?: number | string | null };
  const parsed = Number(data.result ?? 0);
  return Number.isFinite(parsed) ? parsed : null;
}

async function queryAbacus(increment: boolean): Promise<number | null> {
  const action = increment ? 'hit' : 'get';
  const response = await fetchWithTimeout(
    `https://abacus.jasoncameron.dev/${action}/${ABACUS_NAMESPACE}/${ABACUS_KEY}`,
  );

  if (!increment && response.status === 404) return 0;
  if (!response.ok) return null;

  const data = (await response.json()) as { value?: number | string };
  const parsed = Number(data.value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function queryCountApi(increment: boolean): Promise<number | null> {
  const action = increment ? 'hit' : 'get';
  const response = await fetchWithTimeout(
    `https://countapi.mileshilliard.com/api/v1/${action}/${COUNTAPI_KEY}`,
  );

  if (!increment && response.status === 404) return 0;
  if (!response.ok) return null;

  const data = (await response.json()) as { value?: number | string };
  const parsed = Number(data.value);
  return Number.isFinite(parsed) ? parsed : null;
}

async function resolveVisitorCount(increment: boolean): Promise<number | null> {
  try {
    const upstashCount = await queryUpstash(increment);
    if (upstashCount !== null) return upstashCount;
  } catch {
    // Fallback to next counter provider
  }

  try {
    const abacusCount = await queryAbacus(increment);
    if (abacusCount !== null) return abacusCount;
  } catch {
    // Fallback to next counter provider
  }

  try {
    const countApiCount = await queryCountApi(increment);
    if (countApiCount !== null) return countApiCount;
  } catch {
    // Graceful offline fallback
  }

  return null;
}

function buildJsonResponse(count: number | null) {
  return NextResponse.json(
    {
      count,
      live: count !== null,
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}

export async function GET() {
  const count = await resolveVisitorCount(false);
  return buildJsonResponse(count);
}

export async function POST() {
  const count = await resolveVisitorCount(true);
  return buildJsonResponse(count);
}

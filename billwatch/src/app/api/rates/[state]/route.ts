/**
 * API route: GET /api/rates/[state]
 *
 * Returns residential electricity rate data for a given state from the EIA API.
 * Caches data for 24 hours via the in-memory EIA client cache.
 * Falls back to cached data on EIA API errors.
 */

import { NextResponse } from "next/server";
import { getStateRates } from "@/lib/eia/client";
import type { RateErrorResponse } from "@/types/eia";

/** Valid 2-letter US state codes + DC */
const VALID_STATE_CODES = new Set([
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
]);

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ state: string }> },
) {
  const { state } = await params;
  const stateCode = state.toUpperCase();

  if (!VALID_STATE_CODES.has(stateCode)) {
    return NextResponse.json(
      { error: `Invalid state code: ${state}`, stateCode } satisfies RateErrorResponse,
      { status: 400 },
    );
  }

  try {
    const data = await getStateRates(stateCode);

    if (!data) {
      return NextResponse.json(
        { error: `No rate data available for ${stateCode}`, stateCode } satisfies RateErrorResponse,
        { status: 404 },
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error fetching rate data";
    return NextResponse.json(
      { error: message, stateCode } satisfies RateErrorResponse,
      { status: 502 },
    );
  }
}

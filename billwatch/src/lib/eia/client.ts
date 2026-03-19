/**
 * EIA API v2 client for residential electricity rate data.
 *
 * Fetches monthly residential electricity prices by state from the
 * U.S. Energy Information Administration Open Data API.
 *
 * API docs: https://www.eia.gov/opendata/documentation.php
 */

import type {
  EIAApiResponse,
  EIADataRow,
  StateRateData,
  RateHistoryEntry,
} from "@/types/eia";
import { getEiaApiKey } from "@/lib/env";

const EIA_BASE_URL = "https://api.eia.gov/v2/electricity/retail-sales/data";

/** Cache entry with TTL */
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/** 24-hour cache TTL in milliseconds — EIA data updates monthly */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/** Number of rows for all-state bulk fetch: 51 jurisdictions × 12 months */
const ALL_STATES_ROW_COUNT = 51 * 12;

/** In-memory cache keyed by state code (or "ALL" for all states) */
const cache = new Map<string, CacheEntry<StateRateData>>();

/** Visible for testing — clears the in-memory cache */
export function clearCache(): void {
  cache.clear();
}

/** Visible for testing — returns cache size */
export function getCacheSize(): number {
  return cache.size;
}

/** Visible for testing — expire all cache entries so the next fetch bypasses cache */
export function expireCache(): void {
  for (const [key, entry] of cache) {
    cache.set(key, { ...entry, expiresAt: 0 });
  }
}

/**
 * Build the EIA API URL for fetching residential electricity data.
 *
 * @param stateCode - 2-letter state abbreviation, or undefined for all states
 * @param length - number of monthly data points to fetch (default: 12)
 */
export function buildEiaUrl(stateCode?: string, length = 12): string {
  const params = new URLSearchParams({
    api_key: getEiaApiKey(),
    "data[]": "price",
    "facets[sectorid][]": "RES",
    frequency: "monthly",
    "sort[0][column]": "period",
    "sort[0][direction]": "desc",
    length: String(length),
  });

  if (stateCode) {
    params.append("facets[stateid][]", stateCode.toUpperCase());
  }

  // Also request revenue, sales, and customers
  params.append("data[]", "revenue");
  params.append("data[]", "sales");
  params.append("data[]", "customers");

  return `${EIA_BASE_URL}?${params.toString()}`;
}

/**
 * Fetch raw data from the EIA API.
 * Throws on network errors or non-200 responses.
 */
async function fetchEiaData(url: string): Promise<EIADataRow[]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `EIA API error: ${response.status} ${response.statusText}`,
    );
  }

  const json = (await response.json()) as EIAApiResponse;

  if (!json.response?.data) {
    throw new Error("EIA API returned unexpected response format");
  }

  return json.response.data;
}

/**
 * Transform raw EIA data rows into a StateRateData object.
 *
 * Rows are expected to be sorted by period descending (newest first).
 * Takes the most recent row for current values and builds history from all rows.
 */
function transformToStateRateData(
  rows: EIADataRow[],
  stateCode: string,
): StateRateData | null {
  // Filter to only rows with valid price data for the requested state
  const stateRows = rows.filter(
    (r) =>
      r.stateid === stateCode.toUpperCase() &&
      r.price !== null &&
      r.price !== undefined,
  );

  if (stateRows.length === 0) {
    return null;
  }

  const latest = stateRows[0];

  const rateHistory: RateHistoryEntry[] = stateRows.map((r) => ({
    period: r.period,
    price: r.price as number,
  }));

  return {
    stateCode: latest.stateid,
    stateName: latest.stateDescription,
    currentRate: latest.price as number,
    currentPeriod: latest.period,
    rateHistory,
    customers: latest.customers ?? null,
    revenue: latest.revenue ?? null,
    sales: latest.sales ?? null,
    fetchedAt: new Date().toISOString(),
  };
}

/**
 * Fetch residential electricity rate data for a single state.
 *
 * Returns cached data if available and not expired. Otherwise fetches
 * from EIA API and caches the result for 24 hours.
 *
 * @param stateCode - 2-letter state abbreviation (e.g. "TX", "CA")
 * @returns State rate data, or null if the state code is invalid
 * @throws If the EIA API is unreachable and no cached data exists
 */
export async function getStateRates(
  stateCode: string,
): Promise<StateRateData | null> {
  const key = stateCode.toUpperCase();

  // Return cached data if still valid
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.data;
  }

  try {
    const url = buildEiaUrl(key);
    const rows = await fetchEiaData(url);
    const result = transformToStateRateData(rows, key);

    if (result) {
      cache.set(key, {
        data: result,
        expiresAt: Date.now() + CACHE_TTL_MS,
      });
    }

    return result;
  } catch (error) {
    // If we have stale cached data, return it on API error
    if (cached) {
      return cached.data;
    }
    throw error;
  }
}

/**
 * Fetch residential electricity rate data for all 50 states + DC.
 *
 * Makes a single bulk API call for efficiency, then splits by state.
 * Results are cached per-state for 24 hours.
 *
 * @returns Map of state code → StateRateData
 * @throws If the EIA API is unreachable and no cached data exists
 */
export async function getAllStateRates(): Promise<Map<string, StateRateData>> {
  const url = buildEiaUrl(undefined, ALL_STATES_ROW_COUNT);
  const rows = await fetchEiaData(url);

  // Group rows by state
  const byState = new Map<string, EIADataRow[]>();
  for (const row of rows) {
    if (!row.stateid || row.stateid === "US") continue;
    const existing = byState.get(row.stateid) ?? [];
    existing.push(row);
    byState.set(row.stateid, existing);
  }

  const result = new Map<string, StateRateData>();
  const now = Date.now();

  for (const [code, stateRows] of byState) {
    const data = transformToStateRateData(stateRows, code);
    if (data) {
      result.set(code, data);
      cache.set(code, { data, expiresAt: now + CACHE_TTL_MS });
    }
  }

  return result;
}

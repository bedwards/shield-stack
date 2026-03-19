/**
 * TypeScript types for EIA API v2 responses.
 *
 * EIA Open Data API v2: https://www.eia.gov/opendata/
 * Endpoint: /v2/electricity/retail-sales/data
 */

/** A single data row from the EIA electricity retail sales endpoint */
export interface EIADataRow {
  /** Time period (e.g. "2026-01" for monthly) */
  period: string;
  /** State ID — 2-letter abbreviation (e.g. "TX", "CA") or "US" for national */
  stateid: string;
  /** State name (e.g. "Texas") */
  stateDescription: string;
  /** Sector ID (e.g. "RES" for residential) */
  sectorid: string;
  /** Sector name (e.g. "residential") */
  sectorName: string;
  /** Average retail price of electricity (cents per kWh) */
  price: number | null;
  /** Revenue from retail sales (million dollars) */
  revenue: number | null;
  /** Retail sales of electricity (million kWh) */
  sales: number | null;
  /** Number of customer accounts */
  customers: number | null;
}

/** Top-level EIA API v2 response envelope */
export interface EIAApiResponse {
  response: {
    total: number;
    dateFormat: string;
    frequency: string;
    data: EIADataRow[];
    description: string;
  };
}

/** Processed state rate data returned by our API */
export interface StateRateData {
  /** 2-letter state code */
  stateCode: string;
  /** Full state name */
  stateName: string;
  /** Most recent residential price (cents per kWh) */
  currentRate: number;
  /** Period of the most recent data point (e.g. "2026-01") */
  currentPeriod: string;
  /** Monthly rate history (last 12 months, newest first) */
  rateHistory: RateHistoryEntry[];
  /** Number of residential customer accounts */
  customers: number | null;
  /** Revenue from residential sales (million dollars) */
  revenue: number | null;
  /** Residential sales volume (million kWh) */
  sales: number | null;
  /** Fetched at timestamp (ISO 8601) */
  fetchedAt: string;
}

/** A single month's rate data */
export interface RateHistoryEntry {
  /** Time period (e.g. "2026-01") */
  period: string;
  /** Average retail price (cents per kWh) */
  price: number;
}

/** Error response from our API */
export interface RateErrorResponse {
  error: string;
  stateCode?: string;
}

/**
 * FCC VizMo (Visualizing Mobile Broadband) API client.
 *
 * The VizMo API returns aggregated results from the FCC Speed Test Mobile
 * Application, providing download/upload speed, latency, and packet loss
 * data per carrier at a given lat/lon location.
 *
 * API docs: http://fcc.github.io/vizmo/docs/basics.html
 * Base URL: https://vizmo.fcc.gov/api/
 */

const VIZMO_BASE_URL = "https://vizmo.fcc.gov/api";
const VIZMO_TIMEOUT_MS = 10_000;

// --- VizMo Response Types (matching actual API schema) ---

export type VizMoCarrier =
  | "combined"
  | "att"
  | "sprint"
  | "tmobile"
  | "verizon"
  | "other";

export interface VizMoMetric {
  min: number;
  max: number;
  average: number;
  median: number;
  participation: number;
  percentile: {
    percentile_0: number;
    percentile_10: number;
    percentile_25: number;
    percentile_50: number;
    percentile_75: number;
    percentile_90: number;
    percentile_100: number;
  };
}

export interface VizMoTimePeriodData {
  download: VizMoMetric;
  upload: VizMoMetric;
  latency: VizMoMetric;
  packet_loss: VizMoMetric;
}

export interface VizMoPropertyId {
  carrier: VizMoCarrier;
  time: string;
  geo_group: string;
  geo_type: string;
  date: string;
  geo_zoom: number;
  geo_id: number;
}

export interface VizMoProperty {
  id: VizMoPropertyId;
  value: {
    total: VizMoTimePeriodData;
    offpeak: VizMoTimePeriodData;
    onpeak: VizMoTimePeriodData;
    weekend: VizMoTimePeriodData;
    weekday: VizMoTimePeriodData;
  };
}

export interface VizMoResponse {
  type: "Feature";
  bbox: [number, number, number, number];
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
  properties: VizMoProperty[];
}

// --- Normalized coverage result (what we return to the UI) ---

export interface CarrierCoverage {
  carrier_name: string;
  carrier_slug: string;
  technology: string;
  signal_strength: "excellent" | "good" | "fair" | "poor";
  signal_dbm: number;
  download_mbps: number;
  upload_mbps: number;
  has_5g: boolean;
}

// --- Carrier name mapping ---

const CARRIER_DISPLAY_NAMES: Record<string, string> = {
  att: "AT&T",
  tmobile: "T-Mobile",
  verizon: "Verizon",
  sprint: "Sprint",
  other: "Other Carriers",
};

/**
 * Estimate signal strength from download speed.
 * VizMo doesn't provide dBm values, so we estimate based on speed thresholds.
 * These thresholds reflect typical mobile broadband performance tiers.
 */
function estimateSignalFromSpeed(downloadMbps: number): {
  strength: CarrierCoverage["signal_strength"];
  dbm: number;
} {
  if (downloadMbps >= 100) return { strength: "excellent", dbm: -60 };
  if (downloadMbps >= 25) return { strength: "good", dbm: -75 };
  if (downloadMbps >= 5) return { strength: "fair", dbm: -90 };
  return { strength: "poor", dbm: -110 };
}

/**
 * Convert a VizMo carrier property into our normalized CarrierCoverage format.
 */
export function vizMoPropertyToCarrierCoverage(
  property: VizMoProperty,
): CarrierCoverage | null {
  const { carrier } = property.id;

  // Skip "combined" — it's an aggregate across all carriers
  if (carrier === "combined") return null;

  const displayName = CARRIER_DISPLAY_NAMES[carrier] || carrier;
  const total = property.value.total;
  const downloadMbps = total.download.median;
  const uploadMbps = total.upload.median;

  // Skip carriers with no test data at this location
  if (total.download.participation === 0) return null;

  const signal = estimateSignalFromSpeed(downloadMbps);

  return {
    carrier_name: displayName,
    carrier_slug: carrier,
    technology: downloadMbps >= 100 ? "5G" : "4G LTE",
    signal_strength: signal.strength,
    signal_dbm: signal.dbm,
    download_mbps: Math.round(downloadMbps * 10) / 10,
    upload_mbps: Math.round(uploadMbps * 10) / 10,
    has_5g: downloadMbps >= 100,
  };
}

/**
 * Query the FCC VizMo API for carrier coverage data at a given lat/lng.
 * Returns normalized carrier coverage results.
 *
 * Throws on network errors or unexpected response formats.
 * Returns empty array if no data is available at this location.
 */
export async function queryVizMoCoverage(
  lat: number,
  lng: number,
): Promise<CarrierCoverage[]> {
  const url = `${VIZMO_BASE_URL}/carrier.json?lat=${lat}&lon=${lng}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), VIZMO_TIMEOUT_MS);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      throw new VizMoApiError(
        `VizMo API returned ${response.status}: ${response.statusText}`,
        response.status,
      );
    }

    const data: VizMoResponse = await response.json();

    if (!data.properties || !Array.isArray(data.properties)) {
      return [];
    }

    const results: CarrierCoverage[] = [];
    for (const property of data.properties) {
      const coverage = vizMoPropertyToCarrierCoverage(property);
      if (coverage) {
        results.push(coverage);
      }
    }

    // Sort: best coverage first
    results.sort((a, b) => b.download_mbps - a.download_mbps);

    return results;
  } catch (error) {
    if (error instanceof VizMoApiError) throw error;

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new VizMoApiError(
        "VizMo API request timed out",
        0,
      );
    }

    throw new VizMoApiError(
      `Failed to connect to VizMo API: ${error instanceof Error ? error.message : String(error)}`,
      0,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export class VizMoApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
  ) {
    super(message);
    this.name = "VizMoApiError";
  }
}

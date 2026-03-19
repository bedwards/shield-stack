import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  queryVizMoCoverage,
  vizMoPropertyToCarrierCoverage,
  VizMoApiError,
  type VizMoProperty,
  type VizMoResponse,
} from "./fcc-vizmo";

// --- Helper: build a VizMo metric with defaults ---

function buildMetric(overrides: Partial<{
  average: number;
  median: number;
  participation: number;
}> = {}) {
  return {
    min: 0,
    max: 200,
    average: overrides.average ?? 50,
    median: overrides.median ?? 45,
    participation: overrides.participation ?? 100,
    percentile: {
      percentile_0: 0,
      percentile_10: 10,
      percentile_25: 25,
      percentile_50: 50,
      percentile_75: 75,
      percentile_90: 90,
      percentile_100: 100,
    },
  };
}

function buildTimePeriodData(downloadMedian: number, uploadMedian: number, participation = 100) {
  return {
    download: buildMetric({ median: downloadMedian, participation }),
    upload: buildMetric({ median: uploadMedian, participation }),
    latency: buildMetric({ median: 50000 }),
    packet_loss: buildMetric({ median: 1.5 }),
  };
}

function buildProperty(
  carrier: string,
  downloadMedian: number,
  uploadMedian: number,
  participation = 100,
): VizMoProperty {
  const period = buildTimePeriodData(downloadMedian, uploadMedian, participation);
  return {
    id: {
      carrier: carrier as VizMoProperty["id"]["carrier"],
      time: "total",
      geo_group: "hex",
      geo_type: "hex5k",
      date: "total",
      geo_zoom: 12,
      geo_id: 495558,
    },
    value: {
      total: period,
      offpeak: period,
      onpeak: period,
      weekend: period,
      weekday: period,
    },
  };
}

function buildVizMoResponse(properties: VizMoProperty[]): VizMoResponse {
  return {
    type: "Feature",
    bbox: [-74.1, 40.6, -73.9, 40.8],
    geometry: {
      type: "Polygon",
      coordinates: [[[-74.0, 40.7], [-73.9, 40.7], [-73.9, 40.8], [-74.0, 40.8], [-74.0, 40.7]]],
    },
    properties,
  };
}

// --- Tests ---

describe("vizMoPropertyToCarrierCoverage", () => {
  it("converts a VizMo property to normalized CarrierCoverage", () => {
    const property = buildProperty("att", 150, 30);
    const result = vizMoPropertyToCarrierCoverage(property);

    expect(result).not.toBeNull();
    expect(result!.carrier_name).toBe("AT&T");
    expect(result!.carrier_slug).toBe("att");
    expect(result!.download_mbps).toBe(150);
    expect(result!.upload_mbps).toBe(30);
    expect(result!.signal_strength).toBe("excellent");
    expect(result!.has_5g).toBe(true);
    expect(result!.technology).toBe("5G");
  });

  it("skips combined carrier (aggregate data)", () => {
    const property = buildProperty("combined", 100, 20);
    expect(vizMoPropertyToCarrierCoverage(property)).toBeNull();
  });

  it("skips carriers with zero participation", () => {
    const property = buildProperty("verizon", 0, 0, 0);
    expect(vizMoPropertyToCarrierCoverage(property)).toBeNull();
  });

  it("classifies signal strength based on download speed", () => {
    // excellent: >= 100 Mbps
    const excellent = vizMoPropertyToCarrierCoverage(buildProperty("att", 120, 25));
    expect(excellent!.signal_strength).toBe("excellent");

    // good: >= 25 Mbps
    const good = vizMoPropertyToCarrierCoverage(buildProperty("att", 50, 10));
    expect(good!.signal_strength).toBe("good");

    // fair: >= 5 Mbps
    const fair = vizMoPropertyToCarrierCoverage(buildProperty("att", 10, 2));
    expect(fair!.signal_strength).toBe("fair");

    // poor: < 5 Mbps
    const poor = vizMoPropertyToCarrierCoverage(buildProperty("att", 2, 0.5));
    expect(poor!.signal_strength).toBe("poor");
  });

  it("maps carrier slugs to display names", () => {
    expect(vizMoPropertyToCarrierCoverage(buildProperty("att", 50, 10))!.carrier_name).toBe("AT&T");
    expect(vizMoPropertyToCarrierCoverage(buildProperty("tmobile", 50, 10))!.carrier_name).toBe("T-Mobile");
    expect(vizMoPropertyToCarrierCoverage(buildProperty("verizon", 50, 10))!.carrier_name).toBe("Verizon");
    expect(vizMoPropertyToCarrierCoverage(buildProperty("sprint", 50, 10))!.carrier_name).toBe("Sprint");
  });

  it("rounds speed values to one decimal place", () => {
    const result = vizMoPropertyToCarrierCoverage(buildProperty("att", 75.678, 12.345));
    expect(result!.download_mbps).toBe(75.7);
    expect(result!.upload_mbps).toBe(12.3);
  });
});

describe("queryVizMoCoverage", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("calls VizMo API with correct lat/lon and returns parsed results", async () => {
    const mockResponse = buildVizMoResponse([
      buildProperty("att", 80, 15),
      buildProperty("tmobile", 150, 35),
      buildProperty("combined", 100, 25),
    ]);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const results = await queryVizMoCoverage(40.7128, -74.006);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "https://vizmo.fcc.gov/api/carrier.json?lat=40.7128&lon=-74.006",
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );

    // Should have 2 results (combined is excluded)
    expect(results).toHaveLength(2);

    // Sorted by download speed descending
    expect(results[0].carrier_slug).toBe("tmobile");
    expect(results[0].download_mbps).toBe(150);
    expect(results[1].carrier_slug).toBe("att");
    expect(results[1].download_mbps).toBe(80);
  });

  it("throws VizMoApiError on non-OK HTTP response", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 503,
      statusText: "Service Unavailable",
    });

    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow(VizMoApiError);
    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow("VizMo API returned 503");
  });

  it("returns empty array when response has no properties", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ type: "Feature", properties: [] }),
    });

    const results = await queryVizMoCoverage(40.7, -74.0);
    expect(results).toEqual([]);
  });

  it("returns empty array when properties field is missing", async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ type: "Feature" }),
    });

    const results = await queryVizMoCoverage(40.7, -74.0);
    expect(results).toEqual([]);
  });

  it("throws VizMoApiError on network failure", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(new TypeError("fetch failed"));

    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow(VizMoApiError);
    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow("Failed to connect to VizMo API");
  });

  it("throws VizMoApiError on timeout", async () => {
    globalThis.fetch = vi.fn().mockRejectedValue(
      Object.assign(new DOMException("The operation was aborted", "AbortError")),
    );

    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow(VizMoApiError);
    await expect(queryVizMoCoverage(40.7, -74.0)).rejects.toThrow("timed out");
  });

  it("filters out carriers with no test data", async () => {
    const mockResponse = buildVizMoResponse([
      buildProperty("att", 80, 15, 50),
      buildProperty("verizon", 0, 0, 0), // no data
      buildProperty("tmobile", 120, 30, 200),
    ]);

    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const results = await queryVizMoCoverage(40.7, -74.0);
    expect(results).toHaveLength(2);
    expect(results.map((r) => r.carrier_slug)).toEqual(["tmobile", "att"]);
  });
});

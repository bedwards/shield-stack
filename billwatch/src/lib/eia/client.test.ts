import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  getStateRates,
  getAllStateRates,
  buildEiaUrl,
  clearCache,
  getCacheSize,
  expireCache,
} from "./client";

// Mock env module so getEiaApiKey doesn't throw
vi.mock("@/lib/env", () => ({
  getEiaApiKey: () => "test-api-key",
}));

/** Factory for a valid EIA API response */
function makeEiaResponse(
  rows: Array<{
    period?: string;
    stateid?: string;
    stateDescription?: string;
    price?: number | null;
    revenue?: number | null;
    sales?: number | null;
    customers?: number | null;
  }>,
) {
  return {
    response: {
      total: rows.length,
      dateFormat: "YYYY-MM",
      frequency: "monthly",
      description: "Electricity retail sales",
      data: rows.map((r) => ({
        period: r.period ?? "2026-01",
        stateid: r.stateid ?? "TX",
        stateDescription: r.stateDescription ?? "Texas",
        sectorid: "RES",
        sectorName: "residential",
        price: r.price ?? 14.5,
        revenue: r.revenue ?? 1200,
        sales: r.sales ?? 8500,
        customers: r.customers ?? 11000000,
      })),
    },
  };
}

describe("buildEiaUrl", () => {
  it("builds a URL with state filter", () => {
    const url = buildEiaUrl("TX");
    expect(url).toContain("api_key=test-api-key");
    expect(url).toContain("facets%5Bstateid%5D%5B%5D=TX");
    expect(url).toContain("facets%5Bsectorid%5D%5B%5D=RES");
    expect(url).toContain("frequency=monthly");
  });

  it("builds a URL without state filter for all states", () => {
    const url = buildEiaUrl(undefined, 612);
    expect(url).not.toContain("facets%5Bstateid%5D");
    expect(url).toContain("length=612");
  });

  it("defaults to 12 data points", () => {
    const url = buildEiaUrl("CA");
    expect(url).toContain("length=12");
  });
});

describe("getStateRates", () => {
  beforeEach(() => {
    clearCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearCache();
  });

  it("fetches and returns state rate data", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-02", stateid: "TX", price: 14.8 },
      { period: "2026-01", stateid: "TX", price: 14.5 },
      { period: "2025-12", stateid: "TX", price: 14.2 },
    ]);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    const result = await getStateRates("TX");

    expect(result).not.toBeNull();
    expect(result!.stateCode).toBe("TX");
    expect(result!.currentRate).toBe(14.8);
    expect(result!.currentPeriod).toBe("2026-02");
    expect(result!.rateHistory).toHaveLength(3);
    expect(result!.rateHistory[0].period).toBe("2026-02");
    expect(result!.fetchedAt).toBeDefined();
  });

  it("returns cached data on second call", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-02", stateid: "CA", price: 28.5 },
    ]);

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    await getStateRates("CA");
    expect(fetchSpy).toHaveBeenCalledTimes(1);

    const result = await getStateRates("CA");
    expect(fetchSpy).toHaveBeenCalledTimes(1); // No additional fetch
    expect(result!.stateCode).toBe("CA");
    expect(getCacheSize()).toBe(1);
  });

  it("returns null when no data exists for state", async () => {
    const mockResponse = makeEiaResponse([]);
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    const result = await getStateRates("ZZ");
    expect(result).toBeNull();
  });

  it("throws on API error when no cache exists", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("Service Unavailable", { status: 503, statusText: "Service Unavailable" }),
    );

    await expect(getStateRates("TX")).rejects.toThrow(
      "EIA API error: 503 Service Unavailable",
    );
  });

  it("returns stale cache on API error when cache is expired", async () => {
    // First call succeeds and populates cache
    const mockResponse = makeEiaResponse([
      { period: "2026-01", stateid: "NY", price: 24.3 },
    ]);
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );
    await getStateRates("NY");
    expect(getCacheSize()).toBe(1);

    // Expire the cache entries so the next call must re-fetch
    expireCache();

    // Second call fails — should fall back to stale cached data
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response("Service Unavailable", { status: 503, statusText: "Service Unavailable" }),
    );

    const result = await getStateRates("NY");
    expect(result).not.toBeNull();
    expect(result!.stateCode).toBe("NY");
    expect(result!.currentRate).toBe(24.3);
  });

  it("handles unexpected response format", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ unexpected: true }), { status: 200 }),
    );

    await expect(getStateRates("TX")).rejects.toThrow(
      "EIA API returned unexpected response format",
    );
  });

  it("normalizes state code to uppercase", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-01", stateid: "TX", price: 14.5 },
    ]);

    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    const result = await getStateRates("tx");
    expect(result!.stateCode).toBe("TX");
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    // Verify URL contains uppercase state code
    const calledUrl = fetchSpy.mock.calls[0][0] as string;
    expect(calledUrl).toContain("TX");
  });
});

describe("getAllStateRates", () => {
  beforeEach(() => {
    clearCache();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    clearCache();
  });

  it("fetches and groups data by state", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-01", stateid: "TX", stateDescription: "Texas", price: 14.5 },
      { period: "2026-01", stateid: "CA", stateDescription: "California", price: 28.5 },
      { period: "2025-12", stateid: "TX", stateDescription: "Texas", price: 14.2 },
      { period: "2025-12", stateid: "CA", stateDescription: "California", price: 28.1 },
    ]);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    const result = await getAllStateRates();

    expect(result.size).toBe(2);
    expect(result.get("TX")!.currentRate).toBe(14.5);
    expect(result.get("CA")!.currentRate).toBe(28.5);
    expect(result.get("TX")!.rateHistory).toHaveLength(2);
  });

  it("skips rows with US as state code", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-01", stateid: "US", stateDescription: "U.S. Total", price: 18.05 },
      { period: "2026-01", stateid: "TX", stateDescription: "Texas", price: 14.5 },
    ]);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    const result = await getAllStateRates();
    expect(result.has("US")).toBe(false);
    expect(result.has("TX")).toBe(true);
  });

  it("populates per-state cache entries", async () => {
    const mockResponse = makeEiaResponse([
      { period: "2026-01", stateid: "TX", price: 14.5 },
      { period: "2026-01", stateid: "CA", price: 28.5 },
    ]);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockResponse), { status: 200 }),
    );

    await getAllStateRates();
    expect(getCacheSize()).toBe(2);
  });
});

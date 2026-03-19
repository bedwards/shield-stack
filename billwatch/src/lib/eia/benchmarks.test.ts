import { describe, it, expect } from "vitest";
import { benchmarkRate } from "./benchmarks";
import type { StateRateData } from "@/types/eia";

function makeStateData(overrides: Partial<StateRateData> = {}): StateRateData {
  return {
    stateCode: "TX",
    stateName: "Texas",
    currentRate: 14.5,
    currentPeriod: "2026-02",
    rateHistory: [
      { period: "2026-02", price: 14.5 },
      { period: "2026-01", price: 14.3 },
      { period: "2025-12", price: 14.1 },
      { period: "2025-11", price: 13.9 },
      { period: "2025-10", price: 13.8 },
      { period: "2025-09", price: 13.5 },
    ],
    customers: 11000000,
    revenue: 1200,
    sales: 8500,
    fetchedAt: "2026-03-19T00:00:00Z",
    ...overrides,
  };
}

describe("benchmarkRate", () => {
  it("returns correct deviations for above-average rate", () => {
    const result = benchmarkRate(20.0, makeStateData());
    expect(result.userRate).toBe(20.0);
    expect(result.stateAvgRate).toBe(14.5);
    expect(result.stateDeviation).toBe(5.5);
    expect(result.stateDeviationPercent).toBeCloseTo(37.93, 1);
    expect(result.summary).toContain("above");
    expect(result.summary).toContain("Texas");
  });

  it("returns correct deviations for below-average rate", () => {
    const result = benchmarkRate(10.0, makeStateData());
    expect(result.stateDeviation).toBe(-4.5);
    expect(result.stateDeviationPercent).toBeCloseTo(-31.03, 1);
    expect(result.summary).toContain("below");
  });

  it("returns 'close to' for rates within 5% of average", () => {
    const result = benchmarkRate(14.8, makeStateData());
    expect(result.summary).toContain("close to");
  });

  it("detects rising trend", () => {
    const data = makeStateData({
      rateHistory: [
        // Recent (newer) — higher
        { period: "2026-02", price: 16.0 },
        { period: "2026-01", price: 15.5 },
        // Older — lower
        { period: "2025-12", price: 13.0 },
        { period: "2025-11", price: 12.5 },
      ],
    });
    const result = benchmarkRate(14.5, data);
    expect(result.trend).toBe("rising");
  });

  it("detects falling trend", () => {
    const data = makeStateData({
      rateHistory: [
        // Recent (newer) — lower
        { period: "2026-02", price: 12.0 },
        { period: "2026-01", price: 12.5 },
        // Older — higher
        { period: "2025-12", price: 16.0 },
        { period: "2025-11", price: 15.5 },
      ],
    });
    const result = benchmarkRate(14.5, data);
    expect(result.trend).toBe("falling");
  });

  it("detects stable trend when change is small", () => {
    const data = makeStateData({
      rateHistory: [
        { period: "2026-02", price: 14.5 },
        { period: "2026-01", price: 14.4 },
        { period: "2025-12", price: 14.3 },
        { period: "2025-11", price: 14.4 },
      ],
    });
    const result = benchmarkRate(14.5, data);
    expect(result.trend).toBe("stable");
  });

  it("returns stable for insufficient history", () => {
    const data = makeStateData({
      rateHistory: [
        { period: "2026-02", price: 14.5 },
        { period: "2026-01", price: 14.3 },
      ],
    });
    const result = benchmarkRate(14.5, data);
    expect(result.trend).toBe("stable");
  });

  it("includes national average comparison", () => {
    const result = benchmarkRate(20.0, makeStateData());
    // NATIONAL_AVG_RATE is 18.05
    expect(result.nationalAvgRate).toBe(18.05);
    expect(result.nationalDeviation).toBeCloseTo(1.95, 1);
    expect(result.nationalDeviationPercent).toBeCloseTo(10.8, 0);
  });
});

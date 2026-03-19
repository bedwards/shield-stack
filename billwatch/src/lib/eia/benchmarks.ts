/**
 * Benchmarking helpers — compare a user's electricity rate against state/national averages.
 *
 * Uses EIA API data to provide context like:
 *   "Your rate is 23% above your state average"
 *   "You're paying $42/mo more than the average Texas household"
 */

import type { StateRateData } from "@/types/eia";
import { NATIONAL_AVG_RATE } from "@/lib/states/data";

export interface BenchmarkResult {
  /** User's rate (cents/kWh) */
  userRate: number;
  /** State average rate (cents/kWh) */
  stateAvgRate: number;
  /** National average rate (cents/kWh) */
  nationalAvgRate: number;
  /** Difference from state average (positive = above average) */
  stateDeviation: number;
  /** Percentage difference from state average */
  stateDeviationPercent: number;
  /** Difference from national average (positive = above average) */
  nationalDeviation: number;
  /** Percentage difference from national average */
  nationalDeviationPercent: number;
  /** Human-readable summary */
  summary: string;
  /** Rate trend direction based on last 12 months */
  trend: "rising" | "falling" | "stable";
}

/**
 * Compare a user's electricity rate against their state and national averages.
 *
 * @param userRate - User's rate in cents per kWh
 * @param stateData - State rate data from EIA API
 * @returns Benchmark comparison result
 */
export function benchmarkRate(
  userRate: number,
  stateData: StateRateData,
): BenchmarkResult {
  const stateAvgRate = stateData.currentRate;
  const nationalAvgRate = NATIONAL_AVG_RATE;

  const stateDeviation = userRate - stateAvgRate;
  const stateDeviationPercent =
    stateAvgRate > 0 ? (stateDeviation / stateAvgRate) * 100 : 0;

  const nationalDeviation = userRate - nationalAvgRate;
  const nationalDeviationPercent =
    nationalAvgRate > 0 ? (nationalDeviation / nationalAvgRate) * 100 : 0;

  const trend = computeTrend(stateData.rateHistory.map((h) => h.price));

  const summary = buildSummary(
    userRate,
    stateAvgRate,
    stateDeviationPercent,
    stateData.stateName,
  );

  return {
    userRate,
    stateAvgRate,
    nationalAvgRate,
    stateDeviation: round2(stateDeviation),
    stateDeviationPercent: round2(stateDeviationPercent),
    nationalDeviation: round2(nationalDeviation),
    nationalDeviationPercent: round2(nationalDeviationPercent),
    summary,
    trend,
  };
}

/**
 * Determine rate trend from monthly price history.
 *
 * Compares average of first half vs second half of history.
 * History is newest-first, so first half = recent, second half = older.
 */
function computeTrend(
  prices: number[],
): "rising" | "falling" | "stable" {
  if (prices.length < 4) return "stable";

  const mid = Math.floor(prices.length / 2);
  // First half is more recent (newest-first ordering)
  const recentAvg = avg(prices.slice(0, mid));
  const olderAvg = avg(prices.slice(mid));

  const changePercent =
    olderAvg > 0 ? ((recentAvg - olderAvg) / olderAvg) * 100 : 0;

  if (changePercent > 2) return "rising";
  if (changePercent < -2) return "falling";
  return "stable";
}

function avg(nums: number[]): number {
  if (nums.length === 0) return 0;
  return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function buildSummary(
  userRate: number,
  stateAvgRate: number,
  deviationPercent: number,
  stateName: string,
): string {
  const absPercent = Math.abs(Math.round(deviationPercent));

  if (absPercent <= 5) {
    return `Your rate of ${userRate.toFixed(1)}¢/kWh is close to the ${stateName} average of ${stateAvgRate.toFixed(1)}¢/kWh.`;
  }

  const direction = deviationPercent > 0 ? "above" : "below";
  return `Your rate of ${userRate.toFixed(1)}¢/kWh is ${absPercent}% ${direction} the ${stateName} average of ${stateAvgRate.toFixed(1)}¢/kWh.`;
}

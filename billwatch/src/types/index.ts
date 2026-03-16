/**
 * Shared type definitions for BillWatch.
 */

/** Utility account types */
export type UtilityType = "electric" | "gas" | "water" | "sewer";

/** Anomaly severity levels */
export type AnomalySeverity = "low" | "medium" | "high" | "critical";

/** A utility account tracked by a user */
export interface UtilityAccount {
  id: string;
  userId: string;
  provider: string;
  utilityType: UtilityType;
  accountNumber: string | null;
  createdAt: string;
}

/** A single bill record */
export interface Bill {
  id: string;
  accountId: string;
  userId: string;
  amount: number;
  usage: number | null;
  usageUnit: string | null;
  rate: number | null;
  periodStart: string;
  periodEnd: string;
  imageUrl: string | null;
  ocrConfidence: number | null;
  createdAt: string;
}

/** A detected anomaly on a bill */
export interface Anomaly {
  id: string;
  billId: string;
  severity: AnomalySeverity;
  type: "spike" | "rate_change" | "overcharge" | "seasonal";
  description: string;
  expectedAmount: number;
  actualAmount: number;
  deviationPercent: number;
  createdAt: string;
}

/** User profile with household info */
export interface UserProfile {
  id: string;
  email: string;
  zipCode: string | null;
  homeSqft: number | null;
  householdSize: number | null;
  heatingType: "electric" | "gas" | "oil" | "other" | null;
  createdAt: string;
}

/** Aggregated benchmark data for a region */
export interface Benchmark {
  zipCode: string;
  utilityType: UtilityType;
  avgMonthlyAmount: number;
  avgMonthlyUsage: number;
  sampleSize: number;
  period: string;
}

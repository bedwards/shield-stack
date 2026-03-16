/**
 * Shared type definitions for CellScore.
 */

/** Carrier name */
export type CarrierName = "att" | "tmobile" | "verizon" | "us_cellular" | "dish" | "other";

/** Network type */
export type NetworkType = "5g" | "4g_lte" | "3g";

/** Cell plan */
export interface CellPlan {
  id: string;
  carrier: CarrierName;
  planName: string;
  monthlyPrice: number;
  dataLimit: string;
  hotspotData: string | null;
  streamingQuality: string | null;
  internationalIncluded: boolean;
  contractRequired: boolean;
  createdAt: string;
}

/** Coverage data for a location */
export interface CoverageData {
  id: string;
  carrier: CarrierName;
  zipCode: string;
  latitude: number;
  longitude: number;
  networkType: NetworkType;
  signalStrength: number;
  downloadSpeed: number | null;
  uploadSpeed: number | null;
  reportedBy: string | null;
  reportedAt: string;
}

/** Plan comparison result */
export interface PlanComparison {
  plans: CellPlan[];
  coverageScores: Record<string, number>;
  bestValue: string;
  bestCoverage: string;
}

/** User profile with location preferences */
export interface UserProfile {
  id: string;
  zipCode: string;
  currentCarrier: CarrierName | null;
  monthlyBudget: number | null;
  dataUsage: string | null;
  createdAt: string;
}

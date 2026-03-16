/**
 * Shared type definitions for SettleScan.
 */

/** Settlement status */
export type SettlementStatus = "open" | "filing" | "closed" | "paid";

/** Claim status */
export type ClaimStatus = "matched" | "filing" | "submitted" | "approved" | "denied" | "paid";

/** Settlement category */
export type SettlementCategory =
  | "data_breach"
  | "consumer_product"
  | "financial"
  | "employment"
  | "healthcare"
  | "technology"
  | "automotive"
  | "other";

/** Class action settlement */
export interface Settlement {
  id: string;
  title: string;
  slug: string;
  defendant: string;
  category: SettlementCategory;
  status: SettlementStatus;
  estimatedPayout: string;
  deadlineDate: string | null;
  description: string;
  eligibilityCriteria: string;
  claimUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

/** User claim for a settlement */
export interface Claim {
  id: string;
  userId: string;
  settlementId: string;
  status: ClaimStatus;
  claimData: Record<string, unknown>;
  submittedAt: string | null;
  paidAt: string | null;
  payoutAmount: number | null;
  createdAt: string;
}

/** User profile with matching preferences */
export interface UserProfile {
  id: string;
  email: string;
  purchaseHistory: string[];
  serviceProviders: string[];
  alertPreferences: Record<string, boolean>;
  createdAt: string;
}

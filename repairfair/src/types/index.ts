/**
 * Shared type definitions for RepairFair.
 */

/** Appliance categories */
export type ApplianceCategory =
  | "refrigerator"
  | "washer"
  | "dryer"
  | "dishwasher"
  | "oven"
  | "range"
  | "microwave"
  | "garbage_disposal"
  | "water_heater"
  | "furnace"
  | "ac_unit"
  | "hvac"
  | "ceiling_fan"
  | "garage_door"
  | "other";

/** DIY difficulty levels */
export type DiyDifficulty =
  | "easy"
  | "moderate"
  | "hard"
  | "professional_only";

/** Diagnosis confidence levels */
export type DiagnosisConfidence = "high" | "medium" | "low";

/** An appliance in the database */
export interface Appliance {
  id: string;
  brand: string;
  model: string | null;
  category: ApplianceCategory;
  avgLifespanYears: number | null;
  avgReplacementCostCents: number | null;
  slug: string;
  createdAt: string;
}

/** A canonical repair type */
export interface RepairType {
  id: string;
  name: string;
  displayName: string;
  category: ApplianceCategory;
  description: string | null;
  avgPartsCostCents: number | null;
  avgLaborHours: number | null;
  diyPossible: boolean;
  slug: string;
  createdAt: string;
}

/** A price estimate for a repair type + location */
export interface PriceEstimate {
  id: string;
  repairTypeId: string;
  zipPrefix: string | null;
  state: string | null;
  lowCents: number;
  medianCents: number;
  highCents: number;
  partsCostCents: number | null;
  laborCostCents: number | null;
  sampleSize: number;
  lastUpdated: string;
}

/** An AI diagnosis result */
export interface Diagnosis {
  id: string;
  userId: string;
  applianceCategory: ApplianceCategory;
  applianceBrand: string | null;
  applianceModel: string | null;
  symptoms: string;
  diagnosis: string;
  confidence: DiagnosisConfidence;
  repairTypeId: string | null;
  likelyParts: { name: string; avgCost: number }[];
  estimatedLaborHours: number | null;
  diyDifficulty: DiyDifficulty;
  safetyNotes: string[];
  priceEstimateLowCents: number | null;
  priceEstimateMedianCents: number | null;
  priceEstimateHighCents: number | null;
  createdAt: string;
}

/** A user-submitted repair cost report */
export interface UserSubmission {
  id: string;
  userId: string;
  applianceCategory: ApplianceCategory;
  applianceBrand: string | null;
  applianceModel: string | null;
  repairTypeId: string | null;
  repairDescription: string;
  amountPaidCents: number;
  zipCode: string;
  repairDate: string | null;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

/** Subscription plans */
export type SubscriptionPlan = "free" | "premium";

/** Subscription status */
export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "past_due"
  | "trialing";

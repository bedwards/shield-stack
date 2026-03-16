/**
 * Shared type definitions for SkimpWatch.
 */

/** Source of ingredient data */
export type IngredientSource = "openfoodfacts" | "user_report" | "automated_scan";

/** Type of ingredient change detected */
export type ChangeType = "addition" | "removal" | "substitution" | "reorder";

/** Severity of ingredient change */
export type ChangeSeverity = "minor" | "moderate" | "major";

/** Status of a crowdsourced change report */
export type ReportStatus = "pending" | "verified" | "rejected";

/** Subscription tier */
export type SubscriptionTier = "free" | "premium";

/** Product record keyed by barcode */
export interface Product {
  id: string;
  barcode: string;
  name: string;
  brand: string;
  category: string;
  imageUrl: string;
  currentIngredients: string;
  createdAt: string;
  updatedAt: string;
}

/** Point-in-time ingredient capture */
export interface IngredientSnapshot {
  id: string;
  productId: string;
  ingredientsText: string;
  source: IngredientSource;
  capturedAt: string;
  capturedBy: string | null;
  imageUrl: string | null;
}

/** Detected change between snapshots */
export interface IngredientChange {
  id: string;
  productId: string;
  oldSnapshotId: string;
  newSnapshotId: string;
  changeType: ChangeType;
  changeSummary: string;
  severity: ChangeSeverity;
  detectedAt: string;
}

/** User watchlist entry */
export interface WatchlistEntry {
  id: string;
  userId: string;
  productId: string;
  alertOnAnyChange: boolean;
  createdAt: string;
}

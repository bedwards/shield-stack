/** Severity levels for detected damage */
export type DamageSeverity = "low" | "medium" | "high" | "critical";

/** Types of damage the AI can detect */
export type DamageType =
  | "paint_inconsistency"
  | "panel_gap"
  | "overspray"
  | "body_misalignment"
  | "rust"
  | "dent"
  | "scratch"
  | "flood_damage"
  | "frame_damage"
  | "structural_repair";

/** Status of a scan session */
export type ScanStatus = "created" | "uploading" | "analyzing" | "complete" | "failed";

/** A single damage finding from AI analysis */
export interface DamageFinding {
  id: string;
  type: DamageType;
  description: string;
  severity: DamageSeverity;
  confidence: number;
  photoId: string;
  recommendation: string;
}

/** AI damage analysis report */
export interface DamageReport {
  id: string;
  scanId: string;
  overallRiskScore: number;
  summary: string;
  findings: DamageFinding[];
  modelUsed: string;
  analyzedAt: string;
}

/** A vehicle scan session */
export interface Scan {
  id: string;
  userId: string;
  vin: string | null;
  listingUrl: string | null;
  status: ScanStatus;
  createdAt: string;
  completedAt: string | null;
  shareToken: string | null;
}

/** An uploaded photo within a scan */
export interface ScanPhoto {
  id: string;
  scanId: string;
  filePath: string;
  originalFilename: string;
  orderIndex: number;
  width: number;
  height: number;
  uploadedAt: string;
}

/** VIN decode result from NHTSA */
export interface VinDecode {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  engine: string;
  bodyClass: string;
  plantCity: string;
  plantCountry: string;
}

/** Recall record from NHTSA */
export interface VinRecall {
  vin: string;
  nhtsaCampaignNumber: string;
  component: string;
  summary: string;
  consequence: string;
  remedy: string;
}

/** User profile */
export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  subscriptionTier: "free" | "per_scan" | "premium" | "dealer";
  scansRemaining: number;
  createdAt: string;
}

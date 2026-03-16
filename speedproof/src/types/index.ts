/**
 * Shared TypeScript types for SpeedProof.
 */

export interface SpeedTestResult {
  id: string;
  userId: string;
  timestamp: string;
  downloadMbps: number;
  uploadMbps: number;
  latencyMs: number;
  jitterMs: number;
  testServerRegion: string;
  ispDetected: string;
}

export interface UserProfile {
  id: string;
  ispName: string;
  planName: string;
  advertisedDownload: number;
  advertisedUpload: number;
  zipCode: string;
}

export interface AccountabilityReport {
  id: string;
  userId: string;
  periodStart: string;
  periodEnd: string;
  reportType: "30day" | "weekly" | "custom";
  pdfStoragePath: string | null;
  generatedAt: string;
}

export type ComplaintType = "fcc" | "isp_credit";

export interface Complaint {
  id: string;
  userId: string;
  type: ComplaintType;
  generatedData: Record<string, unknown>;
  submittedAt: string | null;
}

export type SubscriptionTier = "free" | "pro";

export interface Subscription {
  id: string;
  userId: string;
  tier: SubscriptionTier;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
  active: boolean;
}

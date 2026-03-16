/**
 * Shared type definitions for MoverCheck.
 */

/** Trust score color classification */
export type TrustScoreColor = "red" | "yellow" | "green";

/** Search query type */
export type SearchQueryType = "name" | "usdot" | "mc_number";

/** Moving company profile */
export interface Company {
  id: string;
  usdotNumber: string;
  mcNumber: string | null;
  legalName: string;
  dbaName: string | null;
  address: Record<string, string>;
  phone: string | null;
  operatingStatus: string;
  outOfServiceDate: string | null;
}

/** FMCSA carrier data */
export interface FmcsaData {
  id: string;
  companyId: string;
  insuranceStatus: string;
  insuranceAmount: number;
  safetyRating: string | null;
  fleetSize: number;
  driverCount: number;
  complaintCount: number;
  fetchedAt: string;
}

/** Computed trust score */
export interface TrustScore {
  id: string;
  companyId: string;
  overallScore: number;
  color: TrustScoreColor;
  fmcsaScore: number;
  reviewScore: number | null;
  bbbScore: number | null;
  ageScore: number;
  computedAt: string;
}

/** Aggregated review data */
export interface ReviewCache {
  id: string;
  companyId: string;
  platform: string;
  rating: number;
  reviewCount: number;
  sentimentSummary: string | null;
  fetchedAt: string;
}

/** Generated report */
export interface Report {
  id: string;
  userId: string | null;
  companyId: string;
  pdfUrl: string | null;
  createdAt: string;
}

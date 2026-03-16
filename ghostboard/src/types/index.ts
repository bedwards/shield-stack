/**
 * Shared type definitions for GhostBoard.
 */

/** Application outcome statuses */
export type ApplicationStatus =
  | "applied"
  | "heard_back"
  | "interview"
  | "offer"
  | "rejected"
  | "ghosted";

/** A user-submitted report about an application outcome */
export interface Report {
  id: string;
  companyId: string;
  userId: string;
  status: ApplicationStatus;
  roleLevel: string;
  appliedAt: string;
  heardBackAt: string | null;
  notes: string;
  createdAt: string;
}

/** Company profile with aggregate stats */
export interface Company {
  id: string;
  name: string;
  domain: string;
  industry: string;
  size: string;
  location: string;
  ghostingRate: number | null;
  avgResponseDays: number | null;
  interviewToOfferRatio: number | null;
  totalReports: number;
}

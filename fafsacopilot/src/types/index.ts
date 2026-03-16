/**
 * Shared type definitions for FAFSAcopilot.
 */

/** FAFSA form section */
export type FafsaSection = "student_info" | "financial_info" | "school_selection" | "dependency" | "tax_info" | "review";

/** Error severity level */
export type ErrorSeverity = "critical" | "warning" | "info";

/** Aid negotiation status */
export type NegotiationStatus = "draft" | "sent" | "responded" | "accepted" | "rejected";

/** FAFSA error detected during review */
export interface FafsaError {
  id: string;
  section: FafsaSection;
  fieldName: string;
  severity: ErrorSeverity;
  message: string;
  suggestion: string;
  potentialImpact: string;
}

/** School financial aid package */
export interface AidPackage {
  id: string;
  userId: string;
  schoolName: string;
  schoolId: string;
  tuitionCost: number;
  grantsTotal: number;
  scholarshipsTotal: number;
  loansTotal: number;
  workStudy: number;
  netCost: number;
  createdAt: string;
}

/** Aid negotiation appeal letter */
export interface NegotiationLetter {
  id: string;
  userId: string;
  aidPackageId: string;
  status: NegotiationStatus;
  letterContent: string;
  requestedAmount: number;
  createdAt: string;
}

/** User profile with FAFSA data */
export interface UserProfile {
  id: string;
  dependencyStatus: string;
  filingYear: number;
  schoolList: string[];
  createdAt: string;
}

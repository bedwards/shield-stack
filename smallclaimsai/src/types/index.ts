/**
 * Shared type definitions for SmallClaimsAI.
 */

/** Case status progression */
export type CaseStatus =
  | "intake"
  | "documents_generated"
  | "filed"
  | "served"
  | "hearing_scheduled"
  | "completed";

/** Document types that can be generated */
export type DocumentType =
  | "demand_letter"
  | "complaint"
  | "service_affidavit"
  | "subpoena"
  | "hearing_prep"
  | "collection_letter"
  | "garnishment_request";

/** Process step phases */
export type ProcessPhase =
  | "pre_filing"
  | "filing"
  | "service"
  | "hearing"
  | "post_judgment";

/** State jurisdiction information */
export interface State {
  id: string;
  code: string;
  name: string;
  slug: string;
  smallClaimsLimit: number;
  filingFeeMin: number;
  filingFeeMax: number;
  courtName: string;
  courtWebsite: string | null;
}

/** A user's small claims case */
export interface Case {
  id: string;
  userId: string;
  stateId: string;
  countyId: string | null;
  disputeTypeId: string;
  caseName: string;
  amountClaimed: number;
  status: CaseStatus;
  currentStep: number;
  createdAt: string;
  updatedAt: string;
}

/** Generated legal document */
export interface Document {
  id: string;
  caseId: string;
  documentType: DocumentType;
  content: string;
  pdfUrl: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
}

/** Dispute type category */
export interface DisputeType {
  id: string;
  name: string;
  slug: string;
  description: string;
}

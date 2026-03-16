/**
 * Shared type definitions for HOAshield.
 */

/** Status of a CC&R document analysis */
export type CcrAnalysisStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

/** Status of an HOA violation */
export type ViolationStatus =
  | "received"
  | "disputing"
  | "resolved_in_favor"
  | "resolved_against"
  | "paid"
  | "escalated";

/** Dispute letter tone options */
export type LetterTone = "firm" | "conciliatory" | "legal_demand";

/** A user's HOA property */
export interface Property {
  id: string;
  userId: string;
  address: string;
  hoaName: string;
  state: string;
  createdAt: string;
}

/** An uploaded CC&R document */
export interface CcrDocument {
  id: string;
  propertyId: string;
  userId: string;
  filePath: string;
  fileName: string;
  uploadDate: string;
  pageCount: number;
  status: CcrAnalysisStatus;
}

/** AI analysis results for a CC&R document */
export interface CcrAnalysis {
  id: string;
  ccrDocumentId: string;
  summary: string;
  rulesJson: Record<string, unknown>;
  rightsJson: Record<string, unknown>;
  enforcementProcedures: string;
  amendmentProcess: string;
  analyzedAt: string;
  modelUsed: string;
}

/** A logged HOA violation */
export interface Violation {
  id: string;
  userId: string;
  propertyId: string;
  violationType: string;
  description: string;
  fineAmount: number;
  receivedDate: string;
  dueDate: string | null;
  status: ViolationStatus;
  photos: string[];
  ccrSectionCited: string | null;
}

/** A generated dispute letter */
export interface DisputeLetter {
  id: string;
  userId: string;
  violationId: string;
  propertyId: string;
  letterType: string;
  content: string;
  ccrCitations: string[];
  stateLawCitations: string[];
  tone: LetterTone;
  generatedAt: string;
  sentDate: string | null;
  responseDate: string | null;
  responseNotes: string | null;
}

/** State HOA law entry */
export interface StateHoaLaw {
  id: string;
  state: string;
  statuteNumber: string;
  title: string;
  summary: string;
  fullText: string;
  category: string;
  effectiveDate: string;
  sourceUrl: string;
}

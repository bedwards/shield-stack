/**
 * Shared type definitions for ClearFile.
 */

/** Status of a disclosure request to a CRA */
export type RequestStatus =
  | "draft"
  | "sent"
  | "awaiting_response"
  | "response_received"
  | "overdue";

/** Status of a dispute */
export type DisputeStatus =
  | "draft"
  | "sent"
  | "under_investigation"
  | "resolved_corrected"
  | "resolved_verified"
  | "resolved_deleted"
  | "escalated";

/** Type of error found on a background check report */
export type ErrorType =
  | "wrong_person"
  | "outdated_record"
  | "incorrect_details"
  | "duplicate_entry"
  | "expunged_record"
  | "mixed_file"
  | "other";

/** A consumer reporting agency (background check company) */
export interface CRACompany {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  mailingAddress: string;
  faxNumber: string | null;
  email: string | null;
  submissionMethod: "mail" | "fax" | "online" | "email";
  phone: string | null;
  createdAt: string;
}

/** A disclosure request sent to a CRA */
export interface DisclosureRequest {
  id: string;
  userId: string;
  craCompanyId: string;
  status: RequestStatus;
  sentDate: string | null;
  responseDueDate: string | null;
  responseReceivedDate: string | null;
  letterPdfUrl: string | null;
  createdAt: string;
}

/** An uploaded background check report */
export interface UploadedReport {
  id: string;
  userId: string;
  craCompanyId: string;
  storageUrl: string;
  extractedData: Record<string, unknown> | null;
  createdAt: string;
}

/** A flagged error on a report */
export interface ErrorFlag {
  id: string;
  reportId: string;
  userId: string;
  errorType: ErrorType;
  description: string;
  reportedValue: string;
  correctValue: string;
  createdAt: string;
}

/** A dispute letter generated for an error */
export interface DisputeLetter {
  id: string;
  userId: string;
  craCompanyId: string;
  errorFlagIds: string[];
  status: DisputeStatus;
  sentDate: string | null;
  responseDueDate: string | null;
  letterPdfUrl: string | null;
  createdAt: string;
}

/** User profile with encrypted PII references */
export interface UserProfile {
  id: string;
  email: string;
  fullName: string | null;
  dateOfBirth: string | null;
  addresses: string[];
  createdAt: string;
}

/**
 * Shared type definitions for TenantShield.
 */

/** Issue category for habitability problems */
export type IssueCategory =
  | "mold"
  | "heating_cooling"
  | "plumbing"
  | "electrical"
  | "pest"
  | "structural"
  | "security"
  | "lead_paint"
  | "water_damage"
  | "other";

/** Status of a habitability issue */
export type IssueStatus =
  | "documenting"
  | "letter_sent"
  | "awaiting_response"
  | "deadline_expired"
  | "resolved"
  | "escalated";

/** Severity level for an issue */
export type IssueSeverity = "low" | "medium" | "high" | "emergency";

/** A rental property */
export interface Property {
  id: string;
  userId: string;
  address: string;
  landlordName: string;
  landlordEmail: string | null;
  landlordPhone: string | null;
  managementCompany: string | null;
  state: string;
  leaseStartDate: string | null;
  leaseEndDate: string | null;
  createdAt: string;
}

/** A habitability issue */
export interface HabitabilityIssue {
  id: string;
  userId: string;
  propertyId: string;
  category: IssueCategory;
  description: string;
  severity: IssueSeverity;
  status: IssueStatus;
  firstNoticedDate: string;
  reportedToLandlordDate: string | null;
  createdAt: string;
}

/** A piece of evidence (photo/video) */
export interface Evidence {
  id: string;
  issueId: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  mimeType: string;
  exifData: ExifMetadata | null;
  description: string | null;
  uploadedAt: string;
}

/** Extracted EXIF metadata from a photo */
export interface ExifMetadata {
  timestamp: string | null;
  latitude: number | null;
  longitude: number | null;
  cameraMake: string | null;
  cameraModel: string | null;
}

/** A generated legal demand letter */
export interface DemandLetter {
  id: string;
  userId: string;
  issueId: string;
  propertyId: string;
  content: string;
  stateLawCitations: string[];
  cureperiodDays: number | null;
  deadlineDate: string | null;
  generatedAt: string;
  sentDate: string | null;
  landlordResponseDate: string | null;
  landlordResponseNotes: string | null;
}

/** A deadline tracked by the system */
export interface Deadline {
  id: string;
  issueId: string;
  userId: string;
  type: "landlord_response" | "cure_period" | "escalation";
  dueDate: string;
  status: "pending" | "met" | "expired";
  reminderSent: boolean;
}

/** State habitability law entry */
export interface StateHabitabilityLaw {
  id: string;
  state: string;
  issueCategory: IssueCategory;
  statuteNumber: string;
  title: string;
  summary: string;
  noticeRequirement: string;
  curePeriodDays: number | null;
  tenantRemedies: string[];
  effectiveDate: string;
  sourceUrl: string;
  lastVerified: string;
}

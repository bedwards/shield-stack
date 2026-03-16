/**
 * Shared TypeScript types for ZoneAlert.
 */

export interface MonitoredAddress {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number;
  lng: number;
  radiusMiles: number;
  isPrimary: boolean;
  createdAt: string;
}

export interface ZoningApplication {
  id: string;
  municipalityId: string;
  externalId: string;
  title: string;
  description: string;
  applicationType: ZoningApplicationType;
  status: ZoningStatus;
  applicantName: string;
  address: string;
  lat: number;
  lng: number;
  hearingDate: string | null;
  decisionDate: string | null;
  decision: string | null;
  sourceUrl: string;
  scrapedAt: string;
}

export type ZoningApplicationType =
  | "rezoning"
  | "variance"
  | "conditional_use"
  | "subdivision"
  | "site_plan"
  | "special_exception"
  | "other";

export type ZoningStatus =
  | "pending"
  | "hearing_scheduled"
  | "approved"
  | "denied"
  | "withdrawn"
  | "tabled";

export interface PublicHearing {
  id: string;
  municipalityId: string;
  zoningApplicationId: string | null;
  title: string;
  description: string;
  meetingDate: string;
  meetingTime: string;
  location: string;
  agendaUrl: string | null;
  minutesUrl: string | null;
  scrapedAt: string;
}

export interface Alert {
  id: string;
  userId: string;
  monitoredAddressId: string;
  zoningApplicationId: string;
  alertType:
    | "new_application"
    | "hearing_scheduled"
    | "decision_made"
    | "status_change";
  sentAt: string;
  readAt: string | null;
  distanceMiles: number;
}

export interface Municipality {
  id: string;
  name: string;
  state: string;
  fipsCode: string;
  dataPortalUrl: string;
  scraperModule: string;
  lastScrapedAt: string | null;
  scrapeFrequencyHours: number;
  status: "active" | "inactive" | "error";
}

export type SubscriptionTier = "free" | "premium" | "pro";

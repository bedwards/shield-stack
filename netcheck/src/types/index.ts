/**
 * Shared type definitions for NetCheck.
 */

/** Network verification status for a provider */
export type NetworkStatus =
  | "in_network"
  | "out_of_network"
  | "unknown"
  | "requires_verification";

/** Insurance plan types */
export type PlanType = "hmo" | "ppo" | "epo" | "pos" | "hdhp";

/** Facility types */
export type FacilityType =
  | "hospital"
  | "ambulatory_surgery_center"
  | "imaging_center"
  | "lab"
  | "clinic";

/** Verification letter types */
export type LetterType =
  | "facility_verification_request"
  | "insurer_verification_request"
  | "provider_verification_request";

/** Verification check status */
export type VerificationStatus =
  | "pending_payment"
  | "processing"
  | "complete"
  | "failed";

/** Risk level for out-of-network providers */
export type RiskLevel = "low" | "medium" | "high";

/** A provider from the NPI registry */
export interface Provider {
  npi: string;
  name: string;
  credential: string;
  taxonomyCode: string;
  taxonomyDesc: string;
  practiceAddress: string;
  phone: string;
  enumerationDate: string;
}

/** An insurance plan */
export interface InsurancePlan {
  id: string;
  carrierId: string;
  carrierName: string;
  name: string;
  planType: PlanType;
  state: string;
}

/** A verification check result */
export interface Verification {
  id: string;
  userId: string;
  facilityId: string;
  procedureTypeId: string;
  insurancePlanId: string;
  status: VerificationStatus;
  createdAt: string;
}

/** Per-provider result within a verification */
export interface VerificationResult {
  id: string;
  verificationId: string;
  providerNpi: string;
  providerRole: string;
  networkStatus: NetworkStatus;
  riskLevel: RiskLevel;
  confidence: number;
  dataSource: string;
  checkedAt: string;
}

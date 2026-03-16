export const SITE_NAME = "ScoreRebound";
export const SITE_DESCRIPTION =
  "Student Loan Credit Score Recovery Planner — Free personalized plan to recover your credit score after student loan delinquency.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://scorerebound.com";

export const LOAN_TYPES = [
  "federal_direct",
  "federal_ffel",
  "federal_perkins",
  "parent_plus",
  "private",
] as const;

export const RECOVERY_PATHS = [
  "ibr_enrollment",
  "rehabilitation",
  "consolidation",
  "credit_building",
  "mixed",
] as const;

export const DELINQUENCY_STATUSES = [
  "current",
  "30_days",
  "60_days",
  "90_plus",
  "default",
  "collections",
] as const;

export const SCORE_RANGES = [
  "300-449",
  "450-499",
  "500-549",
  "550-599",
  "600-649",
  "650-699",
  "700+",
] as const;

export type LoanType = (typeof LOAN_TYPES)[number];
export type RecoveryPath = (typeof RECOVERY_PATHS)[number];
export type DelinquencyStatus = (typeof DELINQUENCY_STATUSES)[number];
export type ScoreRange = (typeof SCORE_RANGES)[number];

/**
 * Shared validation logic for report submissions.
 * Extracted from the API route for testability.
 */

export const VALID_STATUSES = [
  "applied",
  "heard_back",
  "interviewed",
  "offered",
  "rejected",
  "ghosted",
] as const;

export const VALID_ROLE_LEVELS = [
  "intern",
  "entry",
  "mid",
  "senior",
  "lead",
  "executive",
] as const;

export const VALID_METHODS = [
  "online",
  "referral",
  "recruiter",
  "career_fair",
  "other",
] as const;

/** Rate limits by subscription plan (reports per day) */
export const RATE_LIMITS: Record<string, number> = {
  free: 3,
  premium: 10,
  recruiter: 10,
};

export type ReportStatus = (typeof VALID_STATUSES)[number];

export interface ReportPayload {
  company_id: string;
  status: ReportStatus;
  applied_date: string;
  response_date?: string | null;
  role_level?: string | null;
  application_method?: string | null;
}

export type ValidationResult =
  | { valid: true; data: ReportPayload }
  | { valid: false; error: string };

export function validateReportPayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Request body is required" };
  }

  const b = body as Record<string, unknown>;

  if (!b.company_id || typeof b.company_id !== "string") {
    return { valid: false, error: "company_id is required" };
  }

  if (!b.status || !VALID_STATUSES.includes(b.status as ReportStatus)) {
    return {
      valid: false,
      error: `status must be one of: ${VALID_STATUSES.join(", ")}`,
    };
  }

  if (!b.applied_date || typeof b.applied_date !== "string") {
    return { valid: false, error: "applied_date is required (YYYY-MM-DD)" };
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(b.applied_date)) {
    return { valid: false, error: "applied_date must be in YYYY-MM-DD format" };
  }

  const appliedDate = new Date(b.applied_date);
  if (appliedDate > new Date()) {
    return { valid: false, error: "applied_date cannot be in the future" };
  }

  if (b.response_date && typeof b.response_date === "string") {
    if (!dateRegex.test(b.response_date)) {
      return {
        valid: false,
        error: "response_date must be in YYYY-MM-DD format",
      };
    }
    const responseDate = new Date(b.response_date);
    if (responseDate < appliedDate) {
      return {
        valid: false,
        error: "response_date cannot be before applied_date",
      };
    }
  }

  if (
    b.role_level &&
    !VALID_ROLE_LEVELS.includes(
      b.role_level as (typeof VALID_ROLE_LEVELS)[number],
    )
  ) {
    return {
      valid: false,
      error: `role_level must be one of: ${VALID_ROLE_LEVELS.join(", ")}`,
    };
  }

  if (
    b.application_method &&
    !VALID_METHODS.includes(
      b.application_method as (typeof VALID_METHODS)[number],
    )
  ) {
    return {
      valid: false,
      error: `application_method must be one of: ${VALID_METHODS.join(", ")}`,
    };
  }

  return {
    valid: true,
    data: {
      company_id: b.company_id as string,
      status: b.status as ReportStatus,
      applied_date: b.applied_date as string,
      response_date: (b.response_date as string) || null,
      role_level: (b.role_level as string) || null,
      application_method: (b.application_method as string) || null,
    },
  };
}

/**
 * Calculate response_days from applied_date and response_date.
 */
export function calculateResponseDays(
  appliedDate: string,
  responseDate: string | null | undefined,
): number | null {
  if (!responseDate) return null;
  const applied = new Date(appliedDate);
  const response = new Date(responseDate);
  return Math.round(
    (response.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24),
  );
}

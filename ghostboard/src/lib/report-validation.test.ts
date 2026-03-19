import { describe, it, expect } from "vitest";
import {
  validateReportPayload,
  calculateResponseDays,
  VALID_STATUSES,
  VALID_ROLE_LEVELS,
  VALID_METHODS,
  RATE_LIMITS,
} from "./report-validation";

describe("validateReportPayload", () => {
  const validPayload = {
    company_id: "00000000-0000-0000-0000-000000000001",
    status: "ghosted",
    applied_date: "2026-01-15",
  };

  it("accepts a valid minimal payload", () => {
    const result = validateReportPayload(validPayload);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data.company_id).toBe(validPayload.company_id);
      expect(result.data.status).toBe("ghosted");
      expect(result.data.applied_date).toBe("2026-01-15");
      expect(result.data.response_date).toBeNull();
      expect(result.data.role_level).toBeNull();
      expect(result.data.application_method).toBeNull();
    }
  });

  it("accepts a full payload with all optional fields", () => {
    const full = {
      ...validPayload,
      status: "interviewed",
      response_date: "2026-02-01",
      role_level: "senior",
      application_method: "referral",
    };
    const result = validateReportPayload(full);
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.data.response_date).toBe("2026-02-01");
      expect(result.data.role_level).toBe("senior");
      expect(result.data.application_method).toBe("referral");
    }
  });

  it("rejects null body", () => {
    const result = validateReportPayload(null);
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBe("Request body is required");
  });

  it("rejects non-object body", () => {
    const result = validateReportPayload("not an object");
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBe("Request body is required");
  });

  it("rejects missing company_id", () => {
    const result = validateReportPayload({ status: "ghosted", applied_date: "2026-01-15" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBe("company_id is required");
  });

  it("rejects non-string company_id", () => {
    const result = validateReportPayload({ ...validPayload, company_id: 123 });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toBe("company_id is required");
  });

  it("rejects invalid status", () => {
    const result = validateReportPayload({ ...validPayload, status: "invalid" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("status must be one of");
  });

  it("rejects missing status", () => {
    const result = validateReportPayload({ company_id: validPayload.company_id, applied_date: "2026-01-15" });
    expect(result.valid).toBe(false);
  });

  it("accepts all valid statuses", () => {
    for (const status of VALID_STATUSES) {
      const result = validateReportPayload({ ...validPayload, status });
      expect(result.valid).toBe(true);
    }
  });

  it("rejects missing applied_date", () => {
    const result = validateReportPayload({ company_id: validPayload.company_id, status: "ghosted" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("applied_date is required");
  });

  it("rejects invalid applied_date format", () => {
    const result = validateReportPayload({ ...validPayload, applied_date: "01/15/2026" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("YYYY-MM-DD");
  });

  it("rejects future applied_date", () => {
    const result = validateReportPayload({ ...validPayload, applied_date: "2099-01-01" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("future");
  });

  it("rejects invalid response_date format", () => {
    const result = validateReportPayload({
      ...validPayload,
      status: "heard_back",
      response_date: "not-a-date",
    });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("response_date must be in YYYY-MM-DD");
  });

  it("rejects response_date before applied_date", () => {
    const result = validateReportPayload({
      ...validPayload,
      status: "heard_back",
      applied_date: "2026-02-01",
      response_date: "2026-01-01",
    });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("cannot be before applied_date");
  });

  it("accepts valid response_date after applied_date", () => {
    const result = validateReportPayload({
      ...validPayload,
      status: "heard_back",
      response_date: "2026-02-01",
    });
    expect(result.valid).toBe(true);
  });

  it("rejects invalid role_level", () => {
    const result = validateReportPayload({ ...validPayload, role_level: "ceo" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("role_level must be one of");
  });

  it("accepts all valid role_levels", () => {
    for (const level of VALID_ROLE_LEVELS) {
      const result = validateReportPayload({ ...validPayload, role_level: level });
      expect(result.valid).toBe(true);
    }
  });

  it("rejects invalid application_method", () => {
    const result = validateReportPayload({ ...validPayload, application_method: "telegram" });
    expect(result.valid).toBe(false);
    if (!result.valid) expect(result.error).toContain("application_method must be one of");
  });

  it("accepts all valid application_methods", () => {
    for (const method of VALID_METHODS) {
      const result = validateReportPayload({ ...validPayload, application_method: method });
      expect(result.valid).toBe(true);
    }
  });
});

describe("calculateResponseDays", () => {
  it("returns null when response_date is null", () => {
    expect(calculateResponseDays("2026-01-01", null)).toBeNull();
  });

  it("returns null when response_date is undefined", () => {
    expect(calculateResponseDays("2026-01-01", undefined)).toBeNull();
  });

  it("calculates correct days between dates", () => {
    expect(calculateResponseDays("2026-01-01", "2026-01-15")).toBe(14);
  });

  it("returns 0 for same-day response", () => {
    expect(calculateResponseDays("2026-03-01", "2026-03-01")).toBe(0);
  });

  it("calculates month-spanning response correctly", () => {
    expect(calculateResponseDays("2026-01-15", "2026-02-15")).toBe(31);
  });
});

describe("RATE_LIMITS", () => {
  it("free tier has 3 reports per day", () => {
    expect(RATE_LIMITS.free).toBe(3);
  });

  it("premium tier has 10 reports per day", () => {
    expect(RATE_LIMITS.premium).toBe(10);
  });

  it("recruiter tier has 10 reports per day", () => {
    expect(RATE_LIMITS.recruiter).toBe(10);
  });
});

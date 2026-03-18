import { describe, it, expect } from "vitest";
import {
  identityProtectionSteps,
  type ChecklistStep,
} from "./identity-protection";

describe("identityProtectionSteps", () => {
  it("exports an array of 7 steps", () => {
    expect(identityProtectionSteps).toHaveLength(7);
  });

  it("every step has a unique id", () => {
    const ids = identityProtectionSteps.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every step has required fields", () => {
    identityProtectionSteps.forEach((step: ChecklistStep) => {
      expect(step.id).toBeTruthy();
      expect(step.title).toBeTruthy();
      expect(step.description).toBeTruthy();
      expect(step.category).toBeTruthy();
      expect(step.estimatedTime).toBeTruthy();
      expect(Array.isArray(step.requiredDocuments)).toBe(true);
      expect(step.requiredDocuments.length).toBeGreaterThan(0);
    });
  });

  it("all steps are categorized as first_week", () => {
    identityProtectionSteps.forEach((step) => {
      expect(step.category).toBe("first_week");
    });
  });

  it("first step is reporting death to Social Security", () => {
    expect(identityProtectionSteps[0].id).toBe("id-protect-001");
    expect(identityProtectionSteps[0].title).toContain("Social Security");
  });

  it("includes credit bureau steps for all 3 bureaus", () => {
    const bureauSteps = identityProtectionSteps.filter(
      (s) =>
        s.title.includes("Equifax") ||
        s.title.includes("Experian") ||
        s.title.includes("TransUnion")
    );
    expect(bureauSteps).toHaveLength(3);
  });

  it("includes IRS Form 14039 step", () => {
    const irsStep = identityProtectionSteps.find((s) =>
      s.title.includes("14039")
    );
    expect(irsStep).toBeDefined();
    expect(irsStep?.description).toContain("Identity Theft Affidavit");
  });

  it("includes identity protection service step", () => {
    const protectionStep = identityProtectionSteps.find((s) =>
      s.title.includes("identity protection")
    );
    expect(protectionStep).toBeDefined();
  });

  it("every step requires a death certificate except the last", () => {
    const stepsRequiringDeathCert = identityProtectionSteps.filter((s) =>
      s.requiredDocuments.some((d) => d.toLowerCase().includes("death certificate"))
    );
    // Steps 1-6 require death certificate, step 7 (identity protection) does not
    expect(stepsRequiringDeathCert.length).toBe(6);
  });
});

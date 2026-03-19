import { describe, it, expect } from "vitest";
import {
  DRIP_SEQUENCE,
  getNextDripEmail,
  isDripEligible,
} from "./drip-sequence";

describe("DRIP_SEQUENCE", () => {
  it("contains exactly 5 emails", () => {
    expect(DRIP_SEQUENCE).toHaveLength(5);
  });

  it("has sequential step indices 0-4", () => {
    expect(DRIP_SEQUENCE.map((e) => e.step)).toEqual([0, 1, 2, 3, 4]);
  });

  it("has increasing delay days", () => {
    for (let i = 1; i < DRIP_SEQUENCE.length; i++) {
      expect(DRIP_SEQUENCE[i].delayDays).toBeGreaterThan(
        DRIP_SEQUENCE[i - 1].delayDays
      );
    }
  });

  it("day 0 is the welcome email", () => {
    expect(DRIP_SEQUENCE[0].delayDays).toBe(0);
    expect(DRIP_SEQUENCE[0].subject).toContain("Welcome");
  });

  it("each email has required fields", () => {
    for (const email of DRIP_SEQUENCE) {
      expect(email.subject).toBeTruthy();
      expect(email.purpose).toBeTruthy();
      expect(email.ctaUrl).toMatch(/^\//);
      expect(email.ctaText).toBeTruthy();
    }
  });

  it("step 2 references identity protection with Aura affiliate", () => {
    expect(DRIP_SEQUENCE[2].ctaUrl).toContain("protect-identity");
    expect(DRIP_SEQUENCE[2].affiliateSlug).toBe("aura");
  });

  it("step 3 references grief counseling with Talkspace affiliate", () => {
    expect(DRIP_SEQUENCE[3].ctaUrl).toContain("grief-counseling");
    expect(DRIP_SEQUENCE[3].affiliateSlug).toBe("talkspace");
  });

  it("step 4 references life insurance with Policygenius affiliate", () => {
    expect(DRIP_SEQUENCE[4].ctaUrl).toContain("life-insurance");
    expect(DRIP_SEQUENCE[4].affiliateSlug).toBe("policygenius");
  });
});

describe("getNextDripEmail", () => {
  it("returns the email for step 0", () => {
    const email = getNextDripEmail(0);
    expect(email).not.toBeNull();
    expect(email!.step).toBe(0);
    expect(email!.delayDays).toBe(0);
  });

  it("returns the email for step 4", () => {
    const email = getNextDripEmail(4);
    expect(email).not.toBeNull();
    expect(email!.step).toBe(4);
  });

  it("returns null for step beyond sequence", () => {
    expect(getNextDripEmail(5)).toBeNull();
    expect(getNextDripEmail(10)).toBeNull();
  });

  it("returns null for negative step", () => {
    expect(getNextDripEmail(-1)).toBeNull();
  });
});

describe("isDripEligible", () => {
  it("step 0 (day 0) is immediately eligible", () => {
    const subscribed = new Date("2026-03-19T10:00:00Z");
    const now = new Date("2026-03-19T10:00:00Z");
    expect(isDripEligible(subscribed, 0, now)).toBe(true);
  });

  it("step 1 (day 3) is not eligible before 3 days", () => {
    const subscribed = new Date("2026-03-19T10:00:00Z");
    const now = new Date("2026-03-20T10:00:00Z"); // 1 day later
    expect(isDripEligible(subscribed, 1, now)).toBe(false);
  });

  it("step 1 (day 3) is eligible after 3 days", () => {
    const subscribed = new Date("2026-03-19T10:00:00Z");
    const now = new Date("2026-03-22T10:00:00Z"); // 3 days later
    expect(isDripEligible(subscribed, 1, now)).toBe(true);
  });

  it("step 4 (day 30) is eligible after 30 days", () => {
    const subscribed = new Date("2026-03-01T10:00:00Z");
    const now = new Date("2026-03-31T10:00:00Z"); // 30 days later
    expect(isDripEligible(subscribed, 4, now)).toBe(true);
  });

  it("returns false for completed sequence (step 5)", () => {
    const subscribed = new Date("2026-01-01T10:00:00Z");
    const now = new Date("2026-12-31T10:00:00Z");
    expect(isDripEligible(subscribed, 5, now)).toBe(false);
  });
});

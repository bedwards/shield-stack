import { describe, it, expect, vi, beforeEach } from "vitest";
import { isResendConfigured, getFromEmail, getSiteUrl } from "./resend";

describe("resend", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  describe("isResendConfigured", () => {
    it("returns true when RESEND_API_KEY is set", () => {
      vi.stubEnv("RESEND_API_KEY", "re_test_key");
      expect(isResendConfigured()).toBe(true);
    });

    it("returns false when RESEND_API_KEY is not set", () => {
      delete process.env.RESEND_API_KEY;
      expect(isResendConfigured()).toBe(false);
    });

    it("returns false when RESEND_API_KEY is empty string", () => {
      vi.stubEnv("RESEND_API_KEY", "");
      expect(isResendConfigured()).toBe(false);
    });
  });

  describe("getFromEmail", () => {
    it("returns custom from email when set", () => {
      vi.stubEnv("RESEND_FROM_EMAIL", "Custom <custom@example.com>");
      expect(getFromEmail()).toBe("Custom <custom@example.com>");
    });

    it("returns default ScoreRebound from email when not set", () => {
      delete process.env.RESEND_FROM_EMAIL;
      expect(getFromEmail()).toContain("ScoreRebound");
      expect(getFromEmail()).toContain("noreply@scorerebound.com");
    });
  });

  describe("getSiteUrl", () => {
    it("returns NEXT_PUBLIC_SITE_URL when set", () => {
      vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://scorerebound.com");
      expect(getSiteUrl()).toBe("https://scorerebound.com");
    });

    it("returns localhost fallback when not set", () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      expect(getSiteUrl()).toBe("http://localhost:3000");
    });
  });
});

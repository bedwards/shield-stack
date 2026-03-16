import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode, getAppUrl } from "./env";

describe("env helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  describe("isTestMode", () => {
    it('returns true when TEST_MODE is "true"', () => {
      vi.stubEnv("TEST_MODE", "true");
      expect(isTestMode()).toBe(true);
    });

    it("returns false when TEST_MODE is not set", () => {
      vi.stubEnv("TEST_MODE", "");
      expect(isTestMode()).toBe(false);
    });

    it('returns false when TEST_MODE is "false"', () => {
      vi.stubEnv("TEST_MODE", "false");
      expect(isTestMode()).toBe(false);
    });
  });

  describe("getAppUrl", () => {
    it("returns NEXT_PUBLIC_APP_URL when set", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://repairfair.com");
      expect(getAppUrl()).toBe("https://repairfair.com");
    });

    it("returns localhost fallback when not set", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
      expect(getAppUrl()).toBe("http://localhost:3002");
    });
  });
});

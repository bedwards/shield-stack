import { describe, it, expect, vi, beforeEach } from "vitest";
import { signalStrengthLabel, signalStrengthPercent } from "./coverage";

describe("coverage logic", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  describe("signalStrengthLabel", () => {
    it("returns excellent for strong signals", () => {
      expect(signalStrengthLabel(-50)).toBe("excellent");
      expect(signalStrengthLabel(-65)).toBe("excellent");
      expect(signalStrengthLabel(-70)).toBe("excellent");
    });

    it("returns good for moderate signals", () => {
      expect(signalStrengthLabel(-71)).toBe("good");
      expect(signalStrengthLabel(-78)).toBe("good");
      expect(signalStrengthLabel(-85)).toBe("good");
    });

    it("returns fair for weak signals", () => {
      expect(signalStrengthLabel(-86)).toBe("fair");
      expect(signalStrengthLabel(-95)).toBe("fair");
      expect(signalStrengthLabel(-100)).toBe("fair");
    });

    it("returns poor for very weak signals", () => {
      expect(signalStrengthLabel(-101)).toBe("poor");
      expect(signalStrengthLabel(-120)).toBe("poor");
    });
  });

  describe("signalStrengthPercent", () => {
    it("returns 100 for very strong signals", () => {
      expect(signalStrengthPercent(-50)).toBe(100);
    });

    it("returns 0 for very weak signals", () => {
      expect(signalStrengthPercent(-120)).toBe(0);
    });

    it("returns value between 0 and 100 for normal signals", () => {
      const percent = signalStrengthPercent(-85);
      expect(percent).toBeGreaterThan(0);
      expect(percent).toBeLessThan(100);
    });

    it("clamps values outside range", () => {
      expect(signalStrengthPercent(-130)).toBe(0);
      expect(signalStrengthPercent(-30)).toBe(100);
    });
  });

  describe("checkCoverage in test mode", () => {
    it("returns mock coverage data with source=mock", async () => {
      vi.stubEnv("TEST_MODE", "true");
      const { checkCoverage } = await import("./coverage");
      const result = await checkCoverage("123 Main St, New York, NY");
      expect(result.carriers.length).toBeGreaterThan(0);
      expect(result.location.lat).toBe(40.7128);
      expect(result.location.lng).toBe(-74.006);
      expect(result.source).toBe("mock");
    });
  });

  describe("geocodeAddress in test mode", () => {
    it("returns mock geocode data", async () => {
      vi.stubEnv("TEST_MODE", "true");
      const { geocodeAddress } = await import("./coverage");
      const location = await geocodeAddress("Test Address");
      expect(location.formatted).toBe("New York, NY 10001");
    });
  });
});

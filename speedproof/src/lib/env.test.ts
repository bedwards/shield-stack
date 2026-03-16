import { describe, it, expect, vi, afterEach } from "vitest";
import { isTestMode, getSupabaseUrl, getSupabaseAnonKey, getAppUrl } from "./env";

describe("env helpers", () => {
  afterEach(() => {
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

  describe("getSupabaseUrl", () => {
    it("returns the URL when set", () => {
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
      expect(getSupabaseUrl()).toBe("https://test.supabase.co");
    });

    it("throws when not set", () => {
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
      expect(() => getSupabaseUrl()).toThrow("NEXT_PUBLIC_SUPABASE_URL is not set");
    });
  });

  describe("getSupabaseAnonKey", () => {
    it("returns the key when set", () => {
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-key");
      expect(getSupabaseAnonKey()).toBe("test-key");
    });

    it("throws when not set", () => {
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
      expect(() => getSupabaseAnonKey()).toThrow("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
    });
  });

  describe("getAppUrl", () => {
    it("returns the URL when set", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://speedproof.com");
      expect(getAppUrl()).toBe("https://speedproof.com");
    });

    it("returns localhost default when not set", () => {
      vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
      expect(getAppUrl()).toBe("http://localhost:3000");
    });
  });
});

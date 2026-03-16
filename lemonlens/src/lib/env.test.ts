import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode, getSupabaseUrl, getSupabaseAnonKey, getGeminiApiKey, getStripeSecretKey } from "./env";

describe("env helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  describe("isTestMode", () => {
    it("returns true when TEST_MODE is 'true'", () => {
      vi.stubEnv("TEST_MODE", "true");
      expect(isTestMode()).toBe(true);
    });

    it("returns false when TEST_MODE is not set", () => {
      vi.stubEnv("TEST_MODE", "");
      expect(isTestMode()).toBe(false);
    });

    it("returns false when TEST_MODE is 'false'", () => {
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
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
      expect(getSupabaseAnonKey()).toBe("test-anon-key");
    });

    it("throws when not set", () => {
      vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
      expect(() => getSupabaseAnonKey()).toThrow("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
    });
  });

  describe("getGeminiApiKey", () => {
    it("returns the key when set", () => {
      vi.stubEnv("GEMINI_API_KEY", "test-gemini-key");
      expect(getGeminiApiKey()).toBe("test-gemini-key");
    });

    it("throws when not set", () => {
      vi.stubEnv("GEMINI_API_KEY", "");
      expect(() => getGeminiApiKey()).toThrow("GEMINI_API_KEY is not set");
    });
  });

  describe("getStripeSecretKey", () => {
    it("returns the key when set", () => {
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_123");
      expect(getStripeSecretKey()).toBe("sk_test_123");
    });

    it("throws when not set", () => {
      vi.stubEnv("STRIPE_SECRET_KEY", "");
      expect(() => getStripeSecretKey()).toThrow("STRIPE_SECRET_KEY is not set");
    });
  });
});

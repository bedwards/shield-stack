import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode, getSupabaseUrl, getSupabaseAnonKey } from "./env";

describe("env helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("isTestMode returns true when TEST_MODE=true", () => {
    vi.stubEnv("TEST_MODE", "true");
    expect(isTestMode()).toBe(true);
  });

  it("isTestMode returns false when TEST_MODE is not set", () => {
    vi.stubEnv("TEST_MODE", "");
    expect(isTestMode()).toBe(false);
  });

  it("isTestMode returns false when TEST_MODE=false", () => {
    vi.stubEnv("TEST_MODE", "false");
    expect(isTestMode()).toBe(false);
  });

  it("getSupabaseUrl throws when NEXT_PUBLIC_SUPABASE_URL is not set", () => {
    expect(() => getSupabaseUrl()).toThrow("NEXT_PUBLIC_SUPABASE_URL is not set");
  });

  it("getSupabaseUrl returns the URL when set", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    expect(getSupabaseUrl()).toBe("https://test.supabase.co");
  });

  it("getSupabaseAnonKey throws when NEXT_PUBLIC_SUPABASE_ANON_KEY is not set", () => {
    expect(() => getSupabaseAnonKey()).toThrow("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  });

  it("getSupabaseAnonKey returns the key when set", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    expect(getSupabaseAnonKey()).toBe("test-anon-key");
  });
});

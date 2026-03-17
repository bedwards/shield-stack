import { describe, it, expect, vi, beforeEach } from "vitest";
import { isSupabaseConfigured } from "./supabase";

describe("isSupabaseConfigured", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns true when both env vars are set", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    expect(isSupabaseConfigured()).toBe(true);
  });

  it("returns false when NEXT_PUBLIC_SUPABASE_URL is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("returns false when NEXT_PUBLIC_SUPABASE_ANON_KEY is missing", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("returns false when both env vars are missing", () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    expect(isSupabaseConfigured()).toBe(false);
  });

  it("returns false when env vars are empty strings", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "");
    expect(isSupabaseConfigured()).toBe(false);
  });
});

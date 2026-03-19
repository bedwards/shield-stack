import { describe, it, expect, vi, beforeEach } from "vitest";
import { createSupabaseClient } from "./supabase";

// Mock @supabase/supabase-js
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({
    from: vi.fn(),
    auth: { getSession: vi.fn() },
  })),
}));

describe("createSupabaseClient", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("creates a Supabase client with correct env vars", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

    const { createClient } = await import("@supabase/supabase-js");
    const client = createSupabaseClient();

    expect(createClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-anon-key",
    );
    expect(client).toBeDefined();
    expect(client.from).toBeDefined();
    expect(client.auth).toBeDefined();
  });

  it("throws when NEXT_PUBLIC_SUPABASE_URL is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

    expect(() => createSupabaseClient()).toThrow(
      "NEXT_PUBLIC_SUPABASE_URL is not set",
    );
  });

  it("throws when NEXT_PUBLIC_SUPABASE_ANON_KEY is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");

    expect(() => createSupabaseClient()).toThrow(
      "NEXT_PUBLIC_SUPABASE_ANON_KEY is not set",
    );
  });
});

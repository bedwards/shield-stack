import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ from: vi.fn() })),
}));

describe("supabase client", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("createSupabaseClient creates client with correct env vars", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

    const { createClient } = await import("@supabase/supabase-js");
    const { createSupabaseClient } = await import("./supabase");

    createSupabaseClient();

    expect(createClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-anon-key"
    );
  });

  it("createSupabaseClient throws when URL is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

    const { createSupabaseClient } = await import("./supabase");

    expect(() => createSupabaseClient()).toThrow("NEXT_PUBLIC_SUPABASE_URL is not set");
  });

  it("createSupabaseServiceClient throws when service role key is missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");

    const { createSupabaseServiceClient } = await import("./supabase");

    expect(() => createSupabaseServiceClient()).toThrow(
      "SUPABASE_SERVICE_ROLE_KEY is not set"
    );
  });

  it("createSupabaseServiceClient creates client with service role key", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://test.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "test-anon-key");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-key");

    const { createClient } = await import("@supabase/supabase-js");
    const { createSupabaseServiceClient } = await import("./supabase");

    createSupabaseServiceClient();

    expect(createClient).toHaveBeenCalledWith(
      "https://test.supabase.co",
      "test-service-key",
      { auth: { persistSession: false } }
    );
  });
});

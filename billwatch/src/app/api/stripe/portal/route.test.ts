import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock server-only
vi.mock("server-only", () => ({}));

// Mock Stripe
const mockPortalCreate = vi.fn();
vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    billingPortal: {
      sessions: {
        create: mockPortalCreate,
      },
    },
  }),
}));

// Mock Supabase
const mockGetUser = vi.fn();
const mockSingle = vi.fn();
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          not: () => ({
            order: () => ({
              limit: () => ({
                single: () => mockSingle(),
              }),
            }),
          }),
        }),
      }),
    }),
  }),
}));

vi.mock("@/lib/env", () => ({
  getSupabaseUrl: () => "https://test.supabase.co",
}));

import { POST } from "./route";

describe("POST /api/stripe/portal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-key");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3001");
  });

  it("returns 401 without Authorization header", async () => {
    const request = new Request("http://localhost:3001/api/stripe/portal", {
      method: "POST",
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Authentication required");
  });

  it("returns 401 with invalid auth token", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: "Invalid" },
    });

    const request = new Request("http://localhost:3001/api/stripe/portal", {
      method: "POST",
      headers: { Authorization: "Bearer invalid" },
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
  });

  it("returns 404 when user has no subscription", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });
    mockSingle.mockResolvedValue({ data: null, error: null });

    const request = new Request("http://localhost:3001/api/stripe/portal", {
      method: "POST",
      headers: { Authorization: "Bearer valid-token" },
    });

    const response = await POST(request);
    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toMatch(/No active subscription/);
  });

  it("creates portal session for subscribed user", async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: "user-123" } },
      error: null,
    });
    mockSingle.mockResolvedValue({
      data: { stripe_customer_id: "cus_456" },
      error: null,
    });
    mockPortalCreate.mockResolvedValue({
      url: "https://billing.stripe.com/session/portal",
    });

    const request = new Request("http://localhost:3001/api/stripe/portal", {
      method: "POST",
      headers: { Authorization: "Bearer valid-token" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.url).toBe("https://billing.stripe.com/session/portal");

    expect(mockPortalCreate).toHaveBeenCalledWith({
      customer: "cus_456",
      return_url: "http://localhost:3001/dashboard",
    });
  });
});

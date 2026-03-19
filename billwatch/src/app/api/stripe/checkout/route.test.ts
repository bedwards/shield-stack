import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock server-only
vi.mock("server-only", () => ({}));

// Mock Stripe
const mockCheckoutCreate = vi.fn();
vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    checkout: {
      sessions: {
        create: mockCheckoutCreate,
      },
    },
  }),
  getStripePriceId: () => "price_test_123",
}));

// Mock Supabase
const mockGetUser = vi.fn();
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockLimit = vi.fn();
const mockSingle = vi.fn();
vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: () => ({
      select: (...args: unknown[]) => {
        mockSelect(...args);
        return {
          eq: (...eqArgs: unknown[]) => {
            mockEq(...eqArgs);
            return {
              eq: (...eqArgs2: unknown[]) => {
                mockEq(...eqArgs2);
                return {
                  limit: (...limitArgs: unknown[]) => {
                    mockLimit(...limitArgs);
                    return {
                      single: () => mockSingle(),
                    };
                  },
                };
              },
              limit: (...limitArgs: unknown[]) => {
                mockLimit(...limitArgs);
                return {
                  single: () => mockSingle(),
                };
              },
            };
          },
        };
      },
    }),
  }),
}));

vi.mock("@/lib/env", () => ({
  getSupabaseUrl: () => "https://test.supabase.co",
}));

import { POST } from "./route";

describe("POST /api/stripe/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "test-service-role-key");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "http://localhost:3001");
  });

  it("returns 401 without Authorization header", async () => {
    const request = new Request("http://localhost:3001/api/stripe/checkout", {
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
      error: { message: "Invalid token" },
    });

    const request = new Request("http://localhost:3001/api/stripe/checkout", {
      method: "POST",
      headers: { Authorization: "Bearer invalid-token" },
    });

    const response = await POST(request);
    expect(response.status).toBe(401);
    const body = await response.json();
    expect(body.error).toBe("Invalid authentication token");
  });

  it("creates checkout session for authenticated user", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: { id: "user-123", email: "test@example.com" },
      },
      error: null,
    });
    mockSingle.mockResolvedValue({ data: null, error: null });
    mockCheckoutCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/session/test",
    });

    const request = new Request("http://localhost:3001/api/stripe/checkout", {
      method: "POST",
      headers: { Authorization: "Bearer valid-token" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.url).toBe("https://checkout.stripe.com/session/test");

    expect(mockCheckoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        mode: "subscription",
        line_items: [{ price: "price_test_123", quantity: 1 }],
        metadata: { supabase_user_id: "user-123" },
        customer_email: "test@example.com",
      }),
    );
  });

  it("reuses existing Stripe customer ID", async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: { id: "user-123", email: "test@example.com" },
      },
      error: null,
    });
    mockSingle.mockResolvedValue({
      data: { stripe_customer_id: "cus_existing" },
      error: null,
    });
    mockCheckoutCreate.mockResolvedValue({
      url: "https://checkout.stripe.com/session/test",
    });

    const request = new Request("http://localhost:3001/api/stripe/checkout", {
      method: "POST",
      headers: { Authorization: "Bearer valid-token" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    expect(mockCheckoutCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        customer: "cus_existing",
      }),
    );
  });
});

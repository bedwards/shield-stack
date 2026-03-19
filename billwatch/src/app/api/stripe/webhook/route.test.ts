import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock server-only
vi.mock("server-only", () => ({}));

// Mock Stripe webhook verification and subscription retrieval
const mockConstructEvent = vi.fn();
const mockSubscriptionsRetrieve = vi.fn();
vi.mock("@/lib/stripe", () => ({
  getStripe: () => ({
    webhooks: {
      constructEvent: mockConstructEvent,
    },
    subscriptions: {
      retrieve: mockSubscriptionsRetrieve,
    },
  }),
  getStripeWebhookSecret: () => "whsec_test_secret",
}));

// Mock subscription upsert
const mockUpsertSubscription = vi.fn();
vi.mock("@/lib/subscription", () => ({
  upsertSubscription: (...args: unknown[]) => mockUpsertSubscription(...args),
}));

import { POST } from "./route";

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 400 without stripe-signature header", async () => {
    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: "{}",
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toBe("Missing stripe-signature header");
  });

  it("returns 400 for invalid signature", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });

    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: "{}",
      headers: { "stripe-signature": "invalid" },
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });

  it("handles checkout.session.completed event", async () => {
    const now = Math.floor(Date.now() / 1000);
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          mode: "subscription",
          subscription: "sub_123",
          customer: "cus_456",
          metadata: { supabase_user_id: "user-abc" },
        },
      },
    });

    mockSubscriptionsRetrieve.mockResolvedValue({
      id: "sub_123",
      status: "active",
      current_period_start: now,
      current_period_end: now + 30 * 86400,
    });

    mockUpsertSubscription.mockResolvedValue(undefined);

    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "stripe-signature": "valid-sig" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.received).toBe(true);

    expect(mockUpsertSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-abc",
        stripeCustomerId: "cus_456",
        stripeSubscriptionId: "sub_123",
        plan: "premium",
        status: "active",
      }),
    );
  });

  it("handles customer.subscription.updated event", async () => {
    const now = Math.floor(Date.now() / 1000);
    mockConstructEvent.mockReturnValue({
      type: "customer.subscription.updated",
      data: {
        object: {
          id: "sub_123",
          customer: "cus_456",
          status: "past_due",
          metadata: { supabase_user_id: "user-abc" },
          current_period_start: now,
          current_period_end: now + 30 * 86400,
        },
      },
    });

    mockUpsertSubscription.mockResolvedValue(undefined);

    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "stripe-signature": "valid-sig" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    expect(mockUpsertSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "past_due",
      }),
    );
  });

  it("handles customer.subscription.deleted event", async () => {
    const now = Math.floor(Date.now() / 1000);
    mockConstructEvent.mockReturnValue({
      type: "customer.subscription.deleted",
      data: {
        object: {
          id: "sub_123",
          customer: "cus_456",
          status: "canceled",
          metadata: { supabase_user_id: "user-abc" },
          current_period_start: now,
          current_period_end: now + 30 * 86400,
        },
      },
    });

    mockUpsertSubscription.mockResolvedValue(undefined);

    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "stripe-signature": "valid-sig" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    expect(mockUpsertSubscription).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "cancelled",
      }),
    );
  });

  it("acknowledges unhandled event types", async () => {
    mockConstructEvent.mockReturnValue({
      type: "payment_intent.succeeded",
      data: { object: {} },
    });

    const request = new Request("http://localhost:3001/api/stripe/webhook", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "stripe-signature": "valid-sig" },
    });

    const response = await POST(request);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.received).toBe(true);
    expect(mockUpsertSubscription).not.toHaveBeenCalled();
  });
});

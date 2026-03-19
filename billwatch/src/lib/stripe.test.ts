import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock server-only — it's a no-op in test environment
vi.mock("server-only", () => ({}));

describe("Stripe helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
    // Reset cached stripe instance
    vi.resetModules();
  });

  describe("getStripePriceId", () => {
    it("returns the price ID when set", async () => {
      vi.stubEnv("STRIPE_PRICE_ID", "price_test_123");
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_xxx");
      const { getStripePriceId } = await import("./stripe");
      expect(getStripePriceId()).toBe("price_test_123");
    });

    it("throws when not set", async () => {
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_xxx");
      const { getStripePriceId } = await import("./stripe");
      expect(() => getStripePriceId()).toThrow("STRIPE_PRICE_ID is not set");
    });
  });

  describe("getStripeWebhookSecret", () => {
    it("returns the secret when set", async () => {
      vi.stubEnv("STRIPE_WEBHOOK_SECRET", "whsec_test_123");
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_xxx");
      const { getStripeWebhookSecret } = await import("./stripe");
      expect(getStripeWebhookSecret()).toBe("whsec_test_123");
    });

    it("throws when not set", async () => {
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_xxx");
      const { getStripeWebhookSecret } = await import("./stripe");
      expect(() => getStripeWebhookSecret()).toThrow(
        "STRIPE_WEBHOOK_SECRET is not set",
      );
    });
  });

  describe("constants", () => {
    it("exports correct premium price", async () => {
      vi.stubEnv("STRIPE_SECRET_KEY", "sk_test_xxx");
      const { PREMIUM_PRICE_AMOUNT, PREMIUM_PRICE_CURRENCY } = await import(
        "./stripe"
      );
      expect(PREMIUM_PRICE_AMOUNT).toBe(399);
      expect(PREMIUM_PRICE_CURRENCY).toBe("usd");
    });
  });
});

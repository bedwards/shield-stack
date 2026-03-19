import "server-only";

import Stripe from "stripe";
import { getStripeSecretKey } from "./env";

/**
 * Server-side Stripe client for BillWatch.
 *
 * @remarks Server-side only — never import this in client components.
 */
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(getStripeSecretKey(), {
      apiVersion: "2025-05-28.basil",
      typescript: true,
    });
  }
  return _stripe;
}

/** Premium plan price: $3.99/month */
export const PREMIUM_PRICE_AMOUNT = 399;
export const PREMIUM_PRICE_CURRENCY = "usd";

/**
 * Get the Stripe Price ID for the premium plan.
 * This is set in the Stripe Dashboard and stored as an env var.
 */
export function getStripePriceId(): string {
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) throw new Error("STRIPE_PRICE_ID is not set");
  return priceId;
}

/**
 * Get the Stripe webhook signing secret.
 */
export function getStripeWebhookSecret(): string {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return secret;
}

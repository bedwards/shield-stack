import "server-only";

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl } from "./env";

/**
 * Subscription status check helpers for BillWatch.
 *
 * Uses the service role client to bypass RLS and read subscription data
 * for any user (needed for middleware/API route checks).
 *
 * @remarks Server-side only — never import this in client components.
 */

export type SubscriptionPlan = "free" | "premium";
export type SubscriptionStatus = "active" | "cancelled" | "past_due";

export interface UserSubscription {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  currentPeriodEnd: string | null;
}

const FREE_SUBSCRIPTION: UserSubscription = {
  plan: "free",
  status: "active",
  stripeCustomerId: null,
  stripeSubscriptionId: null,
  currentPeriodEnd: null,
};

/**
 * Create a Supabase client with the service role key.
 * Bypasses RLS — only use server-side for admin operations.
 */
function createServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient<Database>(getSupabaseUrl(), serviceRoleKey);
}

/**
 * Get a user's current subscription.
 * Returns a free plan if no subscription exists.
 */
export async function getUserSubscription(
  userId: string,
): Promise<UserSubscription> {
  const supabase = createServiceClient();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (error || !data) {
    return FREE_SUBSCRIPTION;
  }

  return {
    plan: data.plan,
    status: data.status,
    stripeCustomerId: data.stripe_customer_id,
    stripeSubscriptionId: data.stripe_subscription_id,
    currentPeriodEnd: data.current_period_end,
  };
}

/**
 * Check if a user has an active premium subscription.
 */
export async function isPremiumUser(userId: string): Promise<boolean> {
  const sub = await getUserSubscription(userId);
  return sub.plan === "premium" && sub.status === "active";
}

/**
 * Upsert a subscription record from Stripe webhook data.
 * Uses stripe_subscription_id as the unique key for idempotent updates.
 */
export async function upsertSubscription(params: {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}): Promise<void> {
  const supabase = createServiceClient();

  // Check if a subscription with this stripe_subscription_id already exists
  const { data: existing } = await supabase
    .from("subscriptions")
    .select("id")
    .eq("stripe_subscription_id", params.stripeSubscriptionId)
    .limit(1)
    .single();

  if (existing) {
    // Update existing subscription
    const { error } = await supabase
      .from("subscriptions")
      .update({
        plan: params.plan,
        status: params.status,
        current_period_start: params.currentPeriodStart,
        current_period_end: params.currentPeriodEnd,
      })
      .eq("id", existing.id);

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }
  } else {
    // Insert new subscription
    const { error } = await supabase.from("subscriptions").insert({
      user_id: params.userId,
      stripe_customer_id: params.stripeCustomerId,
      stripe_subscription_id: params.stripeSubscriptionId,
      plan: params.plan,
      status: params.status,
      current_period_start: params.currentPeriodStart,
      current_period_end: params.currentPeriodEnd,
    });

    if (error) {
      throw new Error(`Failed to insert subscription: ${error.message}`);
    }
  }
}

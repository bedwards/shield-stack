import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";
import { upsertSubscription } from "@/lib/subscription";
import type { SubscriptionStatus } from "@/lib/subscription";

/**
 * POST /api/stripe/webhook
 *
 * Handles Stripe webhook events for subscription lifecycle.
 * Verifies the webhook signature and updates the subscriptions table.
 *
 * Events handled:
 *   - checkout.session.completed — new subscription created
 *   - customer.subscription.updated — plan/status changed
 *   - customer.subscription.deleted — subscription cancelled
 */
export async function POST(request: Request) {
  let event: Stripe.Event;

  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing stripe-signature header" },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret(),
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook error";
    console.error("Stripe webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session);
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      default:
        // Unhandled event type — acknowledge receipt
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Handler error";
    console.error(`Stripe webhook handler error (${event.type}):`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * Handle a completed checkout session.
 * Creates or updates the subscription record.
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const userId = session.metadata?.supabase_user_id;
  if (!userId) {
    throw new Error(
      "Missing supabase_user_id in checkout session metadata",
    );
  }

  if (session.mode !== "subscription" || !session.subscription) {
    return; // Not a subscription checkout
  }

  // Fetch the full subscription object for period dates
  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string,
  );

  await upsertSubscription({
    userId,
    stripeCustomerId: session.customer as string,
    stripeSubscriptionId: subscription.id,
    plan: "premium",
    status: mapStripeStatus(subscription.status),
    currentPeriodStart: new Date(
      subscription.current_period_start * 1000,
    ).toISOString(),
    currentPeriodEnd: new Date(
      subscription.current_period_end * 1000,
    ).toISOString(),
  });
}

/**
 * Handle subscription updates (plan changes, renewals, payment issues).
 */
async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
): Promise<void> {
  const userId = subscription.metadata?.supabase_user_id;
  if (!userId) {
    console.warn(
      `Subscription ${subscription.id} has no supabase_user_id metadata — skipping`,
    );
    return;
  }

  await upsertSubscription({
    userId,
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    plan: "premium",
    status: mapStripeStatus(subscription.status),
    currentPeriodStart: new Date(
      subscription.current_period_start * 1000,
    ).toISOString(),
    currentPeriodEnd: new Date(
      subscription.current_period_end * 1000,
    ).toISOString(),
  });
}

/**
 * Handle subscription deletion (cancellation at period end or immediate).
 */
async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
): Promise<void> {
  const userId = subscription.metadata?.supabase_user_id;
  if (!userId) {
    console.warn(
      `Deleted subscription ${subscription.id} has no supabase_user_id metadata — skipping`,
    );
    return;
  }

  await upsertSubscription({
    userId,
    stripeCustomerId: subscription.customer as string,
    stripeSubscriptionId: subscription.id,
    plan: "premium",
    status: "cancelled",
    currentPeriodStart: new Date(
      subscription.current_period_start * 1000,
    ).toISOString(),
    currentPeriodEnd: new Date(
      subscription.current_period_end * 1000,
    ).toISOString(),
  });
}

/**
 * Map Stripe subscription statuses to our internal statuses.
 */
function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status,
): SubscriptionStatus {
  switch (stripeStatus) {
    case "active":
    case "trialing":
      return "active";
    case "past_due":
    case "unpaid":
      return "past_due";
    case "canceled":
    case "incomplete":
    case "incomplete_expired":
    case "paused":
      return "cancelled";
    default:
      return "cancelled";
  }
}

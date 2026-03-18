import { NextResponse } from "next/server";
import { isAdminConfigured, createAdminClient } from "@/lib/supabase";
import { isResendConfigured, getResendClient, getFromEmail, getSiteUrl } from "@/lib/resend";
import { getTemplateForStep, TOTAL_DRIP_STEPS, DRIP_DELAYS_MS } from "@/lib/email-templates";
import type { EmailSubscriber } from "@/lib/database.types";

export const runtime = "edge";

/**
 * POST /api/email/drip
 *
 * Cron-triggered endpoint that processes pending drip emails.
 * Protected by CRON_SECRET header to prevent unauthorized access.
 *
 * Finds active subscribers whose next_send_at <= now, sends the appropriate
 * drip email for their current step, and advances the sequence.
 */
export async function POST(request: Request) {
  // Verify authorization
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret) {
    return NextResponse.json(
      { error: "CRON_SECRET not configured" },
      { status: 500 },
    );
  }

  if (authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 },
    );
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();
  const siteUrl = getSiteUrl();

  // Fetch subscribers who are due for their next email
  const { data: subscribers, error: queryError } = await supabase
    .from("email_subscribers")
    .select("*")
    .eq("drip_status", "active")
    .lte("next_send_at", now)
    .order("next_send_at", { ascending: true })
    .limit(50); // Process in batches to avoid timeouts

  if (queryError) {
    console.error("Drip query error:", queryError);
    return NextResponse.json(
      { error: "Failed to query subscribers" },
      { status: 500 },
    );
  }

  if (!subscribers || subscribers.length === 0) {
    return NextResponse.json({ processed: 0, sent: 0, errors: 0 });
  }

  let sent = 0;
  let errors = 0;
  const resendAvailable = isResendConfigured();

  for (const raw of subscribers) {
    const subscriber = raw as unknown as EmailSubscriber;

    try {
      const step = subscriber.drip_step;

      // Build email template
      const unsubscribeUrl = `${siteUrl}/api/email/unsubscribe?token=${subscriber.unsubscribe_token}`;
      const planUrl = subscriber.plan_id ? `${siteUrl}/plan/${subscriber.plan_id}` : undefined;

      const template = getTemplateForStep(step, {
        recoveryPath: subscriber.recovery_path,
        siteUrl,
        unsubscribeUrl,
        planUrl,
      });

      if (!template) {
        // No template for this step — mark as completed
        await supabase
          .from("email_subscribers")
          .update({ drip_status: "completed" } as never)
          .eq("id", subscriber.id);
        continue;
      }

      // Send email (skip in test mode)
      if (resendAvailable && process.env.TEST_MODE !== "true") {
        const resend = getResendClient();
        await resend.emails.send({
          from: getFromEmail(),
          to: subscriber.email,
          subject: template.subject,
          html: template.html,
        });
      }

      // Advance drip sequence
      const nextStep = step + 1;
      const isCompleted = nextStep >= TOTAL_DRIP_STEPS;
      const delayMs = DRIP_DELAYS_MS[step];
      const nextSendAt = delayMs
        ? new Date(Date.now() + delayMs).toISOString()
        : null;

      await supabase
        .from("email_subscribers")
        .update({
          drip_step: nextStep,
          drip_status: isCompleted ? "completed" : "active",
          last_sent_at: new Date().toISOString(),
          next_send_at: isCompleted ? null : nextSendAt,
        } as never)
        .eq("id", subscriber.id);

      sent++;
    } catch (err) {
      console.error(`Drip error for subscriber ${subscriber.id}:`, err);
      errors++;
    }
  }

  return NextResponse.json({
    processed: subscribers.length,
    sent,
    errors,
  });
}

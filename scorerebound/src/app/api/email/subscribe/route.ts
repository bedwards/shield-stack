import { NextResponse } from "next/server";
import { isAdminConfigured, createAdminClient } from "@/lib/supabase";
import { isResendConfigured, getResendClient, getFromEmail, getSiteUrl } from "@/lib/resend";
import { welcomeEmail, DRIP_DELAYS_MS } from "@/lib/email-templates";

export const runtime = "edge";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/email/subscribe
 *
 * Captures an email address for the drip campaign.
 * Sends a welcome email immediately and schedules the drip sequence.
 *
 * Body: { email: string, plan_id?: string, recovery_path?: string }
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body" },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Request body must be an object" },
      { status: 400 },
    );
  }

  const data = body as Record<string, unknown>;

  // Validate email
  const email = typeof data["email"] === "string" ? data["email"].trim().toLowerCase() : "";
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required" },
      { status: 400 },
    );
  }

  // Optional fields
  const planId = typeof data["plan_id"] === "string" && data["plan_id"] ? data["plan_id"] : null;
  const recoveryPath = typeof data["recovery_path"] === "string" && data["recovery_path"] ? data["recovery_path"] : null;

  // Require Supabase for persistence
  if (!isAdminConfigured()) {
    return NextResponse.json(
      { error: "Email subscription service is not configured" },
      { status: 503 },
    );
  }

  const supabase = createAdminClient();

  try {
    // Check for existing subscriber
    const { data: existingRaw } = await supabase
      .from("email_subscribers")
      .select("id, drip_status")
      .eq("email", email)
      .single();

    const existing = existingRaw as { id: string; drip_status: string } | null;

    let subscriberId: string;
    let shouldSendWelcome = true;

    if (existing) {
      if (existing.drip_status === "active") {
        // Already active — don't restart drip or re-send welcome
        return NextResponse.json({
          success: true,
          already_subscribed: true,
        });
      }

      // Re-subscribing (previously unsubscribed or completed) — reactivate
      const nextSendAt = new Date(Date.now() + DRIP_DELAYS_MS[0]!).toISOString();
      const { error: updateError } = await supabase
        .from("email_subscribers")
        .update({
          plan_id: planId,
          recovery_path: recoveryPath,
          drip_step: 1,
          drip_status: "active",
          last_sent_at: new Date().toISOString(),
          next_send_at: nextSendAt,
        } as never)
        .eq("id", existing.id);

      if (updateError) {
        throw new Error(updateError.message);
      }

      subscriberId = existing.id;
    } else {
      // New subscriber
      const nextSendAt = new Date(Date.now() + DRIP_DELAYS_MS[0]!).toISOString();
      const { data: inserted, error: insertError } = await supabase
        .from("email_subscribers")
        .insert({
          email,
          plan_id: planId,
          recovery_path: recoveryPath,
          drip_step: 1, // Welcome (step 0) sent now; next is step 1
          drip_status: "active",
          last_sent_at: new Date().toISOString(),
          next_send_at: nextSendAt,
        } as never)
        .select("id, unsubscribe_token")
        .single();

      if (insertError) {
        // Handle race condition: concurrent subscribe with same email
        if (insertError.message.includes("duplicate key") || insertError.message.includes("unique")) {
          return NextResponse.json({
            success: true,
            already_subscribed: true,
          });
        }
        throw new Error(insertError.message);
      }

      subscriberId = (inserted as { id: string }).id;
    }

    // Send welcome email (best-effort — subscription succeeds even if email fails)
    if (shouldSendWelcome && isResendConfigured() && process.env.TEST_MODE !== "true") {
      try {
        // Fetch the unsubscribe token for the link
        const { data: subscriber } = await supabase
          .from("email_subscribers")
          .select("unsubscribe_token")
          .eq("id", subscriberId)
          .single();

        const token = (subscriber as { unsubscribe_token: string } | null)?.unsubscribe_token ?? "";
        const siteUrl = getSiteUrl();
        const unsubscribeUrl = `${siteUrl}/api/email/unsubscribe?token=${token}`;
        const planUrl = planId ? `${siteUrl}/plan/${planId}` : undefined;

        const template = welcomeEmail({
          recoveryPath,
          siteUrl,
          unsubscribeUrl,
          planUrl,
        });

        const resend = getResendClient();
        await resend.emails.send({
          from: getFromEmail(),
          to: email,
          subject: template.subject,
          html: template.html,
        });
      } catch (emailError) {
        console.error("Failed to send welcome email:", emailError);
        // Don't fail the subscription — the subscriber is saved
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    );
  }
}

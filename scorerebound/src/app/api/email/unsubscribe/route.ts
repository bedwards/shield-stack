import { NextResponse } from "next/server";
import { isAdminConfigured, createAdminClient } from "@/lib/supabase";

export const runtime = "edge";

/**
 * GET /api/email/unsubscribe?token=<uuid>
 *
 * Handles unsubscribe links from drip campaign emails.
 * Marks the subscriber as unsubscribed and returns an HTML confirmation page.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return new Response(unsubscribePage("Invalid unsubscribe link."), {
      status: 400,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  if (!isAdminConfigured()) {
    return new Response(unsubscribePage("Service temporarily unavailable. Please try again later."), {
      status: 503,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const supabase = createAdminClient();

  const { data: subscriber, error: lookupError } = await supabase
    .from("email_subscribers")
    .select("id, email, drip_status")
    .eq("unsubscribe_token", token)
    .single();

  if (lookupError || !subscriber) {
    return new Response(
      unsubscribePage("This unsubscribe link is not valid or has already been used."),
      { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const sub = subscriber as { id: string; email: string; drip_status: string };

  if (sub.drip_status === "unsubscribed") {
    return new Response(
      unsubscribePage("You are already unsubscribed. You will not receive any more emails from us."),
      { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  const { error: updateError } = await supabase
    .from("email_subscribers")
    .update({ drip_status: "unsubscribed" } as never)
    .eq("id", sub.id);

  if (updateError) {
    console.error("Unsubscribe update error:", updateError);
    return new Response(
      unsubscribePage("Something went wrong. Please try again or contact support."),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } },
    );
  }

  return new Response(
    unsubscribePage(
      "You have been successfully unsubscribed. You will not receive any more recovery tip emails from ScoreRebound.",
    ),
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

function unsubscribePage(message: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe — ScoreRebound</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f9fafb; margin: 0; padding: 40px 16px; color: #1f2937; }
    .card { max-width: 480px; margin: 0 auto; background: #fff; border-radius: 12px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); text-align: center; }
    h1 { font-size: 22px; color: #059669; margin: 0 0 24px; }
    p { font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 24px; }
    a { color: #059669; text-decoration: none; font-weight: 600; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    <h1>ScoreRebound</h1>
    <p>${escapeHtml(message)}</p>
    <a href="/">Back to ScoreRebound</a>
  </div>
</body>
</html>`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

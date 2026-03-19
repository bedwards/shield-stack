import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

/**
 * POST /api/affiliate/click
 *
 * Tracks an affiliate link click server-side before redirecting the user.
 * All affiliate links MUST route through this endpoint — never embed raw
 * affiliate URLs in components or templates.
 *
 * Body: { slug: string, referrer_page?: string, checklist_step_id?: string, case_id?: string }
 * Returns: { redirect_url: string } on success, or error JSON.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, referrer_page, checklist_step_id, case_id } = body;

    if (!slug || typeof slug !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid 'slug' parameter" },
        { status: 400 }
      );
    }

    const supabase = createServiceRoleClient();

    // Look up partner by slug
    const { data: partner, error: partnerError } = await supabase
      .from("affiliate_partners")
      .select("id, affiliate_url, url, is_active")
      .eq("slug", slug)
      .single();

    if (partnerError || !partner) {
      return NextResponse.json(
        { error: `Affiliate partner not found: ${slug}` },
        { status: 404 }
      );
    }

    if (!partner.is_active) {
      return NextResponse.json(
        { error: "This affiliate partner is currently inactive" },
        { status: 410 }
      );
    }

    // Determine redirect URL — prefer affiliate_url, fallback to url
    const redirectUrl = partner.affiliate_url || partner.url;

    if (!redirectUrl) {
      return NextResponse.json(
        { error: "No redirect URL configured for this partner" },
        { status: 500 }
      );
    }

    // Extract user agent from request headers
    const userAgent = request.headers.get("user-agent") || null;

    // Log the click
    const { error: insertError } = await supabase
      .from("affiliate_clicks")
      .insert({
        partner_id: partner.id,
        case_id: case_id || null,
        checklist_step_id: checklist_step_id || null,
        referrer_page: referrer_page || null,
        user_agent: userAgent,
      });

    if (insertError) {
      // Log but don't block the redirect — user experience comes first
      console.error("Failed to log affiliate click:", insertError);
    }

    return NextResponse.json({ redirect_url: redirectUrl });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

/**
 * GET /api/affiliate/click?slug=...&referrer=...&step=...
 *
 * Alternative GET-based click tracking that redirects immediately.
 * Useful for simple link-based tracking without JavaScript.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const referrerPage = searchParams.get("referrer");
  const checklistStepId = searchParams.get("step");
  const caseId = searchParams.get("case_id");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing 'slug' query parameter" },
      { status: 400 }
    );
  }

  const supabase = createServiceRoleClient();

  // Look up partner by slug
  const { data: partner, error: partnerError } = await supabase
    .from("affiliate_partners")
    .select("id, affiliate_url, url, is_active")
    .eq("slug", slug)
    .single();

  if (partnerError || !partner) {
    return NextResponse.json(
      { error: `Affiliate partner not found: ${slug}` },
      { status: 404 }
    );
  }

  if (!partner.is_active) {
    return NextResponse.json(
      { error: "This affiliate partner is currently inactive" },
      { status: 410 }
    );
  }

  const redirectUrl = partner.affiliate_url || partner.url;

  if (!redirectUrl) {
    return NextResponse.json(
      { error: "No redirect URL configured for this partner" },
      { status: 500 }
    );
  }

  const userAgent = request.headers.get("user-agent") || null;

  // Log the click (fire-and-forget — don't block redirect)
  await supabase.from("affiliate_clicks").insert({
    partner_id: partner.id,
    case_id: caseId || null,
    checklist_step_id: checklistStepId || null,
    referrer_page: referrerPage || null,
    user_agent: userAgent,
  });

  return NextResponse.redirect(redirectUrl, 302);
}

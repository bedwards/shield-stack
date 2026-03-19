import { NextResponse } from "next/server";
import { getPartner, getPartnerUrl } from "@/lib/affiliate/partners";
import { logClick } from "@/lib/affiliate/click-log";

/**
 * GET /api/affiliate/click?slug=chooseenergy&referrer=/guides/texas&state=TX
 *
 * Validates the partner slug, logs the click (in-memory for now),
 * and redirects to the partner URL.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const referrer = searchParams.get("referrer");
  const state = searchParams.get("state");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing required parameter: slug" },
      { status: 400 },
    );
  }

  const partner = getPartner(slug);
  if (!partner) {
    return NextResponse.json(
      { error: `Unknown affiliate partner: ${slug}` },
      { status: 404 },
    );
  }

  // Log click — in-memory for now, will migrate to DB when #274 lands
  const userAgent = request.headers.get("user-agent");
  logClick({
    timestamp: new Date().toISOString(),
    slug,
    referrer: referrer ?? null,
    state: state ?? null,
    user_agent: userAgent ?? null,
  });

  const redirectUrl = getPartnerUrl(slug)!;
  return NextResponse.redirect(redirectUrl, 302);
}

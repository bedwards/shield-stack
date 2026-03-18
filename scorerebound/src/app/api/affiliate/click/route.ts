import { NextResponse } from "next/server";
import { getAffiliateProduct, getAffiliateUrl } from "@/lib/affiliates";
import { isSupabaseConfigured, getSupabaseClient } from "@/lib/supabase";
import type { AffiliateClickInsert } from "@/lib/database.types";

export const runtime = "edge";

/**
 * GET /api/affiliate/click?slug=self&referrer=/plan/abc123
 *
 * Logs the affiliate click to the database (best-effort),
 * then redirects the user to the affiliate product URL.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const referrer = searchParams.get("referrer");

  if (!slug) {
    return NextResponse.json(
      { error: "Missing required parameter: slug" },
      { status: 400 },
    );
  }

  const product = getAffiliateProduct(slug);
  if (!product) {
    return NextResponse.json(
      { error: `Unknown affiliate product: ${slug}` },
      { status: 404 },
    );
  }

  // Best-effort: log click to affiliate_clicks table
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseClient();
      const clickInsert: AffiliateClickInsert = {
        user_id: null,
        product_slug: product.slug,
        affiliate_url: product.baseUrl,
        referrer_page: referrer ?? null,
      };

      await supabase
        .from("affiliate_clicks")
        .insert(clickInsert as never);
    } catch (error) {
      // Best-effort — do not block the redirect
      console.error("Failed to log affiliate click:", error);
    }
  }

  const redirectUrl = getAffiliateUrl(slug);
  return NextResponse.redirect(redirectUrl, 302);
}

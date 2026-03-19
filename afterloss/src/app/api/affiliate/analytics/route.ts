import { NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase-server";

export interface PartnerAnalytics {
  partner_id: number;
  partner_name: string;
  slug: string;
  category: string;
  commission_type: string | null;
  commission_value: string | null;
  is_active: boolean;
  total_clicks: number;
  clicks_today: number;
  clicks_this_week: number;
  clicks_this_month: number;
  top_referrer_pages: { page: string; count: number }[];
}

/**
 * GET /api/affiliate/analytics
 *
 * Returns click analytics per affiliate partner.
 * Server-side only — uses service role key to bypass RLS.
 */
export async function GET() {
  const supabase = createServiceRoleClient();

  // Fetch all active partners
  const { data: partners, error: partnersError } = await supabase
    .from("affiliate_partners")
    .select("id, partner_name, slug, category, commission_type, commission_value, is_active")
    .order("partner_name");

  if (partnersError) {
    return NextResponse.json(
      { error: "Failed to fetch partners", details: partnersError.message },
      { status: 500 }
    );
  }

  if (!partners || partners.length === 0) {
    return NextResponse.json({ partners: [], summary: { total_clicks: 0, total_partners: 0 } });
  }

  // Fetch all clicks
  const { data: clicks, error: clicksError } = await supabase
    .from("affiliate_clicks")
    .select("partner_id, referrer_page, clicked_at");

  if (clicksError) {
    return NextResponse.json(
      { error: "Failed to fetch clicks", details: clicksError.message },
      { status: 500 }
    );
  }

  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const analytics: PartnerAnalytics[] = partners.map((partner) => {
    const partnerClicks = (clicks || []).filter(
      (c) => c.partner_id === partner.id
    );

    // Count clicks by time period
    const clicksToday = partnerClicks.filter(
      (c) => c.clicked_at >= todayStart
    ).length;
    const clicksThisWeek = partnerClicks.filter(
      (c) => c.clicked_at >= weekAgo
    ).length;
    const clicksThisMonth = partnerClicks.filter(
      (c) => c.clicked_at >= monthAgo
    ).length;

    // Top referrer pages
    const referrerCounts: Record<string, number> = {};
    for (const click of partnerClicks) {
      const page = click.referrer_page || "(direct)";
      referrerCounts[page] = (referrerCounts[page] || 0) + 1;
    }
    const topReferrerPages = Object.entries(referrerCounts)
      .map(([page, count]) => ({ page, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      partner_id: partner.id,
      partner_name: partner.partner_name,
      slug: partner.slug || "",
      category: partner.category,
      commission_type: partner.commission_type,
      commission_value: partner.commission_value,
      is_active: partner.is_active,
      total_clicks: partnerClicks.length,
      clicks_today: clicksToday,
      clicks_this_week: clicksThisWeek,
      clicks_this_month: clicksThisMonth,
      top_referrer_pages: topReferrerPages,
    };
  });

  const totalClicks = (clicks || []).length;

  return NextResponse.json({
    partners: analytics,
    summary: {
      total_clicks: totalClicks,
      total_partners: partners.length,
      active_partners: partners.filter((p) => p.is_active).length,
    },
  });
}

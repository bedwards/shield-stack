import { NextRequest, NextResponse } from "next/server";
import { isTestMode } from "@/lib/env";
import { MOCK_PLANS } from "@/lib/mock-data";
import { createSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    if (!idsParam) {
      return NextResponse.json(
        { error: "ids parameter is required (comma-separated plan IDs)" },
        { status: 400 },
      );
    }

    const ids = idsParam.split(",").slice(0, 3);

    if (ids.length === 0) {
      return NextResponse.json(
        { error: "At least one plan ID is required" },
        { status: 400 },
      );
    }

    if (isTestMode()) {
      const plans = MOCK_PLANS.filter((p) => ids.includes(p.id));
      return NextResponse.json({ plans });
    }

    // Production: query Supabase
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("plans")
      .select("*, carriers!inner(name, slug, affiliate_url)")
      .in("id", ids);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const plans = (data || []).map((row: Record<string, unknown>) => {
      const carriers = row.carriers as Record<string, unknown> | undefined;
      return {
        id: row.id,
        carrier_id: row.carrier_id,
        carrier_name: carriers?.name,
        carrier_slug: carriers?.slug,
        plan_name: row.plan_name,
        monthly_price: Number(row.monthly_price),
        data_limit_gb: row.data_limit_gb ? Number(row.data_limit_gb) : null,
        throttle_speed_after: row.throttle_speed_after,
        hotspot_gb: row.hotspot_gb ? Number(row.hotspot_gb) : null,
        num_lines_min: row.num_lines_min,
        num_lines_max: row.num_lines_max,
        features: row.features || {},
        data_priority_level: row.data_priority_level,
        affiliate_url: row.affiliate_url || carriers?.affiliate_url,
        last_verified_at: row.last_verified_at,
      };
    });

    return NextResponse.json({ plans });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to compare plans";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

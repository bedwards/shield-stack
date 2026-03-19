import { NextRequest, NextResponse } from "next/server";
import { isTestMode } from "@/lib/env";
import { MOCK_PLANS } from "@/lib/mock-data";
import { filterPlans, type PlanFilters } from "@/lib/plans";
import { createSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const filters: PlanFilters = {
      carrier: searchParams.get("carrier") || undefined,
      minPrice: searchParams.get("min_price") ? Number(searchParams.get("min_price")) : undefined,
      maxPrice: searchParams.get("max_price") ? Number(searchParams.get("max_price")) : undefined,
      minData: searchParams.get("min_data") ? Number(searchParams.get("min_data")) : undefined,
      features: searchParams.get("features") ? searchParams.get("features")!.split(",") : undefined,
      sort: (searchParams.get("sort") as PlanFilters["sort"]) || "price_asc",
    };

    if (isTestMode()) {
      const filtered = filterPlans(MOCK_PLANS, filters);
      return NextResponse.json({ plans: filtered, total: filtered.length });
    }

    // Production: query Supabase
    const supabase = createSupabaseClient();
    let query = supabase
      .from("plans")
      .select("*, carriers!inner(name, slug, affiliate_url)");

    if (filters.carrier) {
      query = query.eq("carriers.slug", filters.carrier);
    }
    if (filters.minPrice !== undefined) {
      query = query.gte("monthly_price", filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      query = query.lte("monthly_price", filters.maxPrice);
    }

    const sortColumn = filters.sort === "data_desc" ? "data_limit_gb" : "monthly_price";
    const ascending = filters.sort !== "price_desc" && filters.sort !== "data_desc";
    query = query.order(sortColumn, { ascending });

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const plans = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      carrier_id: row.carrier_id,
      carrier_name: row.carriers.name,
      carrier_slug: row.carriers.slug,
      plan_name: row.plan_name,
      monthly_price: Number(row.monthly_price),
      data_limit_gb: row.data_limit_gb ? Number(row.data_limit_gb) : null,
      throttle_speed_after: row.throttle_speed_after,
      hotspot_gb: row.hotspot_gb ? Number(row.hotspot_gb) : null,
      num_lines_min: row.num_lines_min,
      num_lines_max: row.num_lines_max,
      features: row.features || {},
      data_priority_level: row.data_priority_level,
      affiliate_url: row.affiliate_url || row.carriers.affiliate_url,
      last_verified_at: row.last_verified_at,
    }));

    return NextResponse.json({ plans, total: plans.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch plans";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

/**
 * GET /api/companies/search?q=<query>&limit=<number>
 * Search companies using trigram similarity (pg_trgm).
 * Returns companies with their stats (if available).
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();
  const limit = Math.min(parseInt(searchParams.get("limit") || "10", 10), 50);

  if (!query || query.length < 2) {
    return NextResponse.json(
      { error: "Search query must be at least 2 characters" },
      { status: 400 },
    );
  }

  const supabase = createServerClient();

  // Use ilike for simple fuzzy matching — pg_trgm index powers this
  const { data: companies, error } = await supabase
    .from("companies")
    .select("id, slug, name, domain, industry, company_size, headquarters")
    .ilike("name", `%${query}%`)
    .limit(limit);

  if (error) {
    return NextResponse.json(
      { error: "Search failed", details: error.message },
      { status: 500 },
    );
  }

  if (!companies || companies.length === 0) {
    return NextResponse.json({ companies: [], total: 0 });
  }

  // Fetch stats for the matched companies
  const companyIds = companies.map((c) => c.id);
  const { data: stats } = await supabase
    .from("company_stats")
    .select("company_id, total_reports, ghosting_rate, avg_response_days, interview_to_offer_ratio")
    .in("company_id", companyIds);

  const statsMap = new Map(stats?.map((s) => [s.company_id, s]) ?? []);

  const results = companies.map((company) => ({
    ...company,
    stats: statsMap.get(company.id) ?? null,
  }));

  return NextResponse.json({ companies: results, total: results.length });
}

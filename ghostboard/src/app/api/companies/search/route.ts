import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

/**
 * GET /api/companies/search?q=<query>&limit=<number>
 * Search companies using trigram similarity (pg_trgm).
 * Uses the search_companies RPC for true fuzzy matching with relevance scoring.
 * Falls back to ilike if RPC is not available (e.g., before migration runs).
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

  // Try RPC-based trigram similarity search first
  const { data: rpcResults, error: rpcError } = await supabase.rpc(
    "search_companies",
    { search_query: query, result_limit: limit },
  );

  if (!rpcError && rpcResults) {
    const results = rpcResults.map(
      (r: {
        id: string;
        slug: string;
        name: string;
        domain: string | null;
        industry: string | null;
        company_size: string | null;
        headquarters: string | null;
        similarity_score: number;
        total_reports: number | null;
        ghosting_rate: number | null;
        avg_response_days: number | null;
        interview_to_offer_ratio: number | null;
      }) => ({
        id: r.id,
        slug: r.slug,
        name: r.name,
        domain: r.domain,
        industry: r.industry,
        company_size: r.company_size,
        headquarters: r.headquarters,
        similarity_score: r.similarity_score,
        stats: r.total_reports
          ? {
              total_reports: r.total_reports,
              ghosting_rate: r.ghosting_rate,
              avg_response_days: r.avg_response_days,
              interview_to_offer_ratio: r.interview_to_offer_ratio,
            }
          : null,
      }),
    );

    return NextResponse.json({ companies: results, total: results.length });
  }

  // Fallback: basic ilike search (works before migration 00004 is applied)
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
    .select(
      "company_id, total_reports, ghosting_rate, avg_response_days, interview_to_offer_ratio",
    )
    .in("company_id", companyIds);

  const statsMap = new Map(stats?.map((s) => [s.company_id, s]) ?? []);

  const results = companies.map((company) => ({
    ...company,
    stats: statsMap.get(company.id) ?? null,
  }));

  return NextResponse.json({ companies: results, total: results.length });
}

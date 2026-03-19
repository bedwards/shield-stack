import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

/**
 * GET /api/companies/[slug]
 * Returns company profile with aggregate stats and recent reports.
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const supabase = createServerClient();

  // Fetch company
  const { data: company, error: companyError } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (companyError || !company) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 },
    );
  }

  // Fetch stats from materialized view
  const { data: stats } = await supabase
    .from("company_stats")
    .select("*")
    .eq("company_id", company.id)
    .single();

  // Fetch recent reports (newest first, limit 20)
  const { data: reports } = await supabase
    .from("reports")
    .select("id, status, applied_date, response_date, response_days, role_level, application_method, created_at")
    .eq("company_id", company.id)
    .eq("is_flagged", false)
    .order("created_at", { ascending: false })
    .limit(20);

  // Build status distribution for trend data
  const statusCounts: Record<string, number> = {};
  if (reports) {
    for (const r of reports) {
      statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    }
  }

  return NextResponse.json({
    company,
    stats: stats ?? {
      company_id: company.id,
      total_reports: reports?.length ?? 0,
      ghosting_rate: null,
      avg_response_days: null,
      interview_to_offer_ratio: null,
      last_report_at: null,
    },
    recent_reports: reports ?? [],
    status_distribution: statusCounts,
    has_enough_reports: (stats?.total_reports ?? 0) >= 5,
  });
}

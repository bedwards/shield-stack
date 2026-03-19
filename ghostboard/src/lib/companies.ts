/**
 * Server-side data fetching for company pages.
 * Used by SSG/ISR for company profile pages and sitemap generation.
 */

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

type CompanyRow = Database["public"]["Tables"]["companies"]["Row"];
type CompanyStatsRow = Database["public"]["Views"]["company_stats"]["Row"];

export interface CompanyWithStats extends CompanyRow {
  stats: CompanyStatsRow | null;
}

/**
 * Creates a server-side Supabase client for build-time data fetching.
 * Returns null if env vars are not set (e.g., during initial builds).
 */
function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient<Database>(url, key);
}

/**
 * Fetches all company slugs for SSG generateStaticParams.
 * Returns up to 10,000 slugs ordered by total reports (most popular first).
 */
export async function getAllCompanySlugs(): Promise<string[]> {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("companies")
    .select("slug")
    .order("created_at", { ascending: false })
    .limit(10000);

  if (error || !data) return [];
  return data.map((c) => c.slug);
}

/**
 * Fetches a single company by slug with its stats.
 */
export async function getCompanyBySlug(
  slug: string,
): Promise<CompanyWithStats | null> {
  const supabase = createServerClient();
  if (!supabase) return null;

  const { data: company, error } = await supabase
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !company) return null;

  const { data: stats } = await supabase
    .from("company_stats")
    .select("*")
    .eq("company_id", company.id)
    .single();

  return { ...company, stats: stats ?? null };
}

/**
 * Fetches trending companies (most reports, minimum 5 reports for public stats).
 */
export async function getTrendingCompanies(
  limit = 10,
): Promise<CompanyWithStats[]> {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data: statsData, error: statsError } = await supabase
    .from("company_stats")
    .select("*")
    .gte("total_reports", 5)
    .order("total_reports", { ascending: false })
    .limit(limit);

  if (statsError || !statsData || statsData.length === 0) return [];

  const companyIds = statsData.map((s) => s.company_id);
  const { data: companies, error: compError } = await supabase
    .from("companies")
    .select("*")
    .in("id", companyIds);

  if (compError || !companies) return [];

  return companies.map((company) => ({
    ...company,
    stats: statsData.find((s) => s.company_id === company.id) ?? null,
  }));
}

/**
 * Fetches recent reports with company names for the landing page.
 */
export async function getRecentReports(limit = 5) {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("reports")
    .select("id, status, role_level, created_at, company_id")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error || !data || data.length === 0) return [];

  const companyIds = [...new Set(data.map((r) => r.company_id))];
  const { data: companies } = await supabase
    .from("companies")
    .select("id, name, slug")
    .in("id", companyIds);

  const companyMap = new Map(companies?.map((c) => [c.id, c]) ?? []);

  return data.map((report) => ({
    ...report,
    company: companyMap.get(report.company_id) ?? null,
  }));
}

/**
 * Fetches all company slugs for sitemap generation.
 */
export async function getAllCompaniesForSitemap(): Promise<
  Array<{ slug: string; updated_at: string }>
> {
  const supabase = createServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("companies")
    .select("slug, updated_at")
    .order("updated_at", { ascending: false });

  if (error || !data) return [];
  return data;
}

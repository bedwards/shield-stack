import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase admin client for E2E test database assertions.
 * Uses the service role key to bypass RLS.
 */
export function createTestDbClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "E2E DB helpers require NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/**
 * Get company by slug for E2E assertions.
 */
export async function getCompanyBySlug(slug: string) {
  const db = createTestDbClient();
  const { data, error } = await db
    .from("companies")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw new Error(`Failed to get company ${slug}: ${error.message}`);
  return data;
}

/**
 * Get recent reports for a company for E2E assertions.
 */
export async function getReportsForCompany(companyId: string) {
  const db = createTestDbClient();
  const { data, error } = await db
    .from("reports")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(`Failed to get reports: ${error.message}`);
  return data;
}

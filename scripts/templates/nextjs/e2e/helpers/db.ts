/**
 * Supabase admin client for E2E test database operations.
 *
 * Uses the service role key (bypasses RLS) to set up test fixtures,
 * verify database state after user actions, and clean up test data.
 *
 * IMPORTANT: This client has FULL database access. Only use in E2E tests,
 * never import in application code.
 */

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _adminClient: SupabaseClient | null = null;

/**
 * Get a Supabase admin client that bypasses Row Level Security.
 *
 * Requires SUPABASE_SERVICE_ROLE_KEY to be set in the environment.
 * This is a server-only secret — never expose it to the browser.
 *
 * Usage:
 *   const admin = getAdminClient();
 *   const { data } = await admin.from("users").select("*");
 */
export function getAdminClient(): SupabaseClient {
  if (_adminClient) return _adminClient;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Required for E2E database operations.",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Required for E2E database operations.\n" +
        "This is the service_role key from your Supabase project settings.",
    );
  }

  _adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _adminClient;
}

/**
 * Seed a test user in Supabase Auth. Returns the user object.
 *
 * If the user already exists, returns the existing user (idempotent).
 * Uses the admin API to create users without email confirmation.
 */
export async function seedTestUser(
  email: string = "test@example.com",
  password: string = "test-password-123",
) {
  const admin = getAdminClient();

  // Try to find existing user first (idempotent)
  const { data: existingUsers } = await admin.auth.admin.listUsers();
  const existing = existingUsers?.users?.find((u) => u.email === email);
  if (existing) return existing;

  // Create new test user
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Skip email verification for test users
  });

  if (error) {
    throw new Error(`Failed to seed test user: ${error.message}`);
  }

  return data.user;
}

/**
 * Clean up test data created during E2E runs.
 *
 * Call this in globalTeardown or afterAll to remove test artifacts.
 * Customize the tables array for your product's schema.
 */
export async function cleanupTestData(userId: string, tables: string[] = []) {
  const admin = getAdminClient();

  for (const table of tables) {
    await admin.from(table).delete().eq("user_id", userId);
  }
}

/**
 * Verify a row exists in a table matching the given conditions.
 *
 * Useful for asserting that user actions created the expected DB records.
 *
 * Usage:
 *   const row = await verifyRowExists("recovery_plans", { user_id: userId });
 *   expect(row.recovery_path).toBe("ibr_enrollment");
 */
export async function verifyRowExists(
  table: string,
  match: Record<string, unknown>,
) {
  const admin = getAdminClient();

  let query = admin.from(table).select("*");
  for (const [key, value] of Object.entries(match)) {
    query = query.eq(key, value);
  }

  const { data, error } = await query.single();

  if (error) {
    throw new Error(
      `Row not found in ${table} matching ${JSON.stringify(match)}: ${error.message}`,
    );
  }

  return data;
}

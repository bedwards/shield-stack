import "server-only";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl, getSupabaseAnonKey, getSupabaseServiceRoleKey } from "./env";

/**
 * Creates a Supabase client for server-side API routes.
 * Uses the anon key — subject to RLS policies.
 */
export function createServerClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

/**
 * Creates a Supabase admin client that bypasses RLS.
 * @remarks Server-side only — never expose to client code.
 */
export function createAdminClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseServiceRoleKey(), {
    auth: { persistSession: false },
  });
}

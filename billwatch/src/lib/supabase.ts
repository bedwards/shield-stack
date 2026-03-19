import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

/**
 * Supabase client for BillWatch.
 *
 * Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * environment variables, which are validated at runtime by env.ts.
 *
 * This client is safe to use in both server and client components.
 * For server-only operations requiring the service role key,
 * create a separate client with elevated privileges.
 */
export function createSupabaseClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

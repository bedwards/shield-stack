import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

/**
 * Creates a Supabase client for browser/client-side usage.
 * Uses NEXT_PUBLIC_ prefixed env vars (accessible in client code).
 */
export function createSupabaseClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

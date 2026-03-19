import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";
import { getSupabaseUrl, getSupabaseAnonKey } from "./env";

export function createSupabaseClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

/** @remarks Server-side only — requires SUPABASE_SERVICE_ROLE_KEY */
export function createSupabaseServiceClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");
  }
  return createClient<Database>(getSupabaseUrl(), serviceRoleKey, {
    auth: { persistSession: false },
  });
}

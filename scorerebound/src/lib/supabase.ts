import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return url;
}

function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  return key;
}

/**
 * Check if Supabase environment variables are configured.
 * Returns false during build/test when env vars are not set.
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

/**
 * Supabase client for use in browser/client components.
 * Uses the anon key — all queries are subject to RLS policies.
 *
 * Lazily initialized to avoid crashing at import time when env vars
 * are not yet available (e.g., during build or test).
 */
export function getSupabaseClient() {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey());
}

/**
 * Create a Supabase client with a custom access token (e.g., from server-side auth).
 * Useful in API routes and Server Components where you have the user's JWT.
 *
 * @remarks Server-side only — do not import in client components.
 */
export function createServerSupabaseClient(accessToken?: string) {
  return createClient<Database>(getSupabaseUrl(), getSupabaseAnonKey(), {
    global: {
      headers: accessToken
        ? { Authorization: `Bearer ${accessToken}` }
        : undefined,
    },
  });
}

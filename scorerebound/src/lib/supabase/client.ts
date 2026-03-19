import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "../database.types";

/**
 * Create a Supabase client for use in browser/client components.
 * Uses cookie-based auth via @supabase/ssr for proper Next.js integration.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

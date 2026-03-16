/**
 * Environment variable helpers for AfterLoss.
 * Note: AfterLoss is a 100% free product — no Stripe needed.
 */
export function isTestMode(): boolean { return process.env.TEST_MODE === "true"; }
export function getSupabaseUrl(): string { const url = process.env.NEXT_PUBLIC_SUPABASE_URL; if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set"); return url; }
export function getSupabaseAnonKey(): string { const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set"); return key; }

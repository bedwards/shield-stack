/**
 * Environment variable helpers for TenantShield.
 * All env access should go through this module.
 *
 * Client-side vars use NEXT_PUBLIC_ prefix.
 * Server-only secrets do NOT get the prefix.
 */

export function isTestMode(): boolean {
  return process.env.TEST_MODE === "true";
}

export function getSupabaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!url) throw new Error("NEXT_PUBLIC_SUPABASE_URL is not set");
  return url;
}

export function getSupabaseAnonKey(): string {
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY is not set");
  return key;
}

export function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return key;
}

export function getClaudeApiKey(): string {
  const key = process.env.CLAUDE_API_KEY;
  if (!key) throw new Error("CLAUDE_API_KEY is not set");
  return key;
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
}

import type { Page, BrowserContext } from "@playwright/test";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Response shape from the /api/test-auth endpoint.
 */
interface TestAuthResponse {
  user_id: string;
  email: string;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

/**
 * Log in as the E2E test user by calling the /api/test-auth endpoint
 * and setting the Supabase auth cookies on the browser context.
 *
 * The test-auth endpoint creates the user if it doesn't exist (idempotent),
 * then signs in and returns session tokens.
 *
 * @param page - Playwright page instance
 * @returns The test auth response containing user_id, tokens, etc.
 */
export async function loginAsTestUser(page: Page): Promise<TestAuthResponse> {
  const baseURL =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010";

  // Call the test-auth endpoint
  const response = await page.request.post(`${baseURL}/api/test-auth`);

  if (!response.ok()) {
    const body = await response.text();
    throw new Error(
      `Failed to authenticate test user (${response.status()}): ${body}`,
    );
  }

  const authData: TestAuthResponse = await response.json();

  // Set Supabase auth cookies on the browser context so subsequent
  // page navigations are authenticated.
  // Supabase stores auth state in localStorage, so we inject it there.
  await page.evaluate(
    ({ accessToken, refreshToken, expiresAt }) => {
      // Supabase stores the session in localStorage under this key pattern
      const supabaseUrl =
        document.querySelector('meta[name="supabase-url"]')?.getAttribute("content") ||
        "";

      // Extract project ref from URL for the storage key
      // Format: https://<project-ref>.supabase.co
      const projectRef = supabaseUrl
        ? new URL(supabaseUrl).hostname.split(".")[0]
        : "default";

      const storageKey = `sb-${projectRef}-auth-token`;

      const sessionData = {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_at: expiresAt,
        expires_in: 3600,
        token_type: "bearer",
      };

      localStorage.setItem(storageKey, JSON.stringify(sessionData));
    },
    {
      accessToken: authData.access_token,
      refreshToken: authData.refresh_token,
      expiresAt: authData.expires_at,
    },
  );

  return authData;
}

/**
 * Set Supabase auth cookies directly on a browser context.
 * Use this when you need to set up auth state before navigating to any page.
 *
 * @param context - Playwright browser context
 * @param authData - Auth response from loginAsTestUser or /api/test-auth
 * @param baseURL - The base URL of the app (defaults to localhost:3010)
 */
export async function setAuthCookies(
  context: BrowserContext,
  authData: TestAuthResponse,
  baseURL = "http://localhost:3010",
): Promise<void> {
  // Supabase uses cookies for server-side auth in Next.js
  // The cookie names follow the pattern: sb-<project-ref>-auth-token
  const url = new URL(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://default.supabase.co",
  );
  const projectRef = url.hostname.split(".")[0] || "default";

  // Set the auth token cookies that Supabase SSR expects
  const cookieDomain = new URL(baseURL).hostname;

  await context.addCookies([
    {
      name: `sb-${projectRef}-auth-token`,
      value: JSON.stringify({
        access_token: authData.access_token,
        refresh_token: authData.refresh_token,
        expires_at: authData.expires_at,
        expires_in: 3600,
        token_type: "bearer",
      }),
      domain: cookieDomain,
      path: "/",
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    },
  ]);
}

/**
 * Check whether the Supabase secrets required for authenticated E2E tests
 * are available. When they're missing (e.g. CI hasn't configured them yet),
 * tests that depend on Supabase can gracefully skip.
 */
export function hasSupabaseSecrets(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
}

/**
 * Get a Supabase admin client using the service role key.
 * This client bypasses RLS and can be used for direct database
 * verification and test data cleanup.
 *
 * @remarks Server-side only — for use in E2E test helpers, not in browser code.
 * @returns Supabase client with admin (service role) privileges
 */
export function getAdminClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL is not set. Required for admin client.",
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. Required for admin client.",
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

/**
 * Authentication helpers for Playwright E2E tests.
 *
 * Provides loginAsTestUser() which authenticates via the /api/test-auth
 * endpoint (only available when TEST_MODE=true) and stores the session
 * in Playwright's storageState for reuse across tests.
 */

import { type Page, expect } from "@playwright/test";

/**
 * Test user credentials — override via environment variables.
 * These are only used in TEST_MODE=true environments.
 */
const TEST_USER = {
  email: process.env.TEST_USER_EMAIL || "test@example.com",
  password: process.env.TEST_USER_PASSWORD || "test-password-123",
};

/**
 * Log in as the test user via the /api/test-auth endpoint.
 *
 * This endpoint is only available when TEST_MODE=true and returns
 * a Supabase session with access/refresh tokens that get stored
 * as cookies for subsequent authenticated requests.
 *
 * Usage in auth.setup.ts:
 *   await loginAsTestUser(page);
 *   await page.context().storageState({ path: authFile });
 */
export async function loginAsTestUser(page: Page): Promise<void> {
  // Hit the test-auth endpoint to get a session
  const response = await page.request.post("/api/test-auth", {
    data: {
      email: TEST_USER.email,
      password: TEST_USER.password,
    },
  });

  expect(response.ok(), `Test auth failed: ${response.status()}`).toBeTruthy();

  const body = await response.json();
  expect(body.session, "Test auth did not return a session").toBeTruthy();

  // Navigate to the app so cookies are set in the browser context
  await page.goto("/");

  // Set the Supabase auth tokens in localStorage (the standard Supabase client
  // reads from localStorage on the client side)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl) {
    const storageKey = `sb-${new URL(supabaseUrl).hostname.split(".")[0]}-auth-token`;
    await page.evaluate(
      ({ key, session }) => {
        localStorage.setItem(key, JSON.stringify(session));
      },
      { key: storageKey, session: body.session },
    );
  }

  // Reload to pick up the authenticated state
  await page.reload();

  // Verify we are authenticated by checking for a common authenticated element
  // Customize this selector for your product's authenticated UI
  await page.waitForLoadState("networkidle");
}

/**
 * Path to the stored authentication state file.
 * Used by Playwright's setup project and dependent test projects.
 */
export const AUTH_STATE_PATH = "e2e/.auth/user.json";

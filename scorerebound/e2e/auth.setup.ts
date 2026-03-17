import { test as setup, expect } from "@playwright/test";
import { loginAsTestUser, setAuthCookies } from "./helpers/auth";

const AUTH_FILE = "playwright/.auth/user.json";

/**
 * Playwright setup project that authenticates the E2E test user
 * and saves the browser storage state for reuse by authenticated tests.
 *
 * This runs once before the "authenticated" project and saves cookies/localStorage
 * to playwright/.auth/user.json. Authenticated test projects reference this
 * storage state so they start already logged in.
 */
setup("authenticate e2e test user", async ({ page, context }) => {
  const baseURL =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010";

  // Navigate to the app first so we have a page context for localStorage
  await page.goto(baseURL);
  await expect(page).toHaveTitle(/ScoreRebound/);

  // Authenticate via the test-auth endpoint
  const authData = await loginAsTestUser(page);

  // Verify we got valid auth data back
  expect(authData.user_id).toBeTruthy();
  expect(authData.access_token).toBeTruthy();
  expect(authData.refresh_token).toBeTruthy();
  expect(authData.email).toBe("e2e-test@scorerebound.example.com");

  // Also set cookies on the context for server-side auth
  await setAuthCookies(context, authData, baseURL);

  // Save the authenticated state for reuse by dependent test projects
  await page.context().storageState({ path: AUTH_FILE });
});

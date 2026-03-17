/**
 * Playwright setup project for authenticated E2E tests.
 *
 * This file runs BEFORE any test in the "authenticated" project.
 * It logs in as the test user and saves the browser storage state
 * (cookies + localStorage) so authenticated tests can reuse it
 * without logging in again.
 *
 * Referenced in playwright.config.ts:
 *   projects: [
 *     { name: "setup", testMatch: /auth\.setup\.ts/ },
 *     { name: "authenticated", dependencies: ["setup"], use: { storageState: authFile } },
 *   ]
 */

import { test as setup } from "@playwright/test";
import { loginAsTestUser, AUTH_STATE_PATH } from "./helpers/auth";

setup("authenticate as test user", async ({ page }) => {
  await loginAsTestUser(page);

  // Save the authenticated state for reuse by dependent test projects
  await page.context().storageState({ path: AUTH_STATE_PATH });
});

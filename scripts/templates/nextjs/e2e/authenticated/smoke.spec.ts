/**
 * Authenticated smoke tests — verifies basic authenticated user flows.
 *
 * These tests run with a pre-authenticated browser context (storageState)
 * set up by auth.setup.ts. The user is already logged in when tests begin.
 *
 * Customize these tests for your product's authenticated pages and features.
 */

import { test, expect } from "@playwright/test";

test.describe("Authenticated Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("authenticated user sees personalized content", async ({ page }) => {
    // Verify the page loaded successfully
    await expect(page).toHaveURL(/\//);

    // TODO: Customize — check for authenticated UI elements
    // Examples:
    //   await expect(page.getByTestId("user-avatar")).toBeVisible();
    //   await expect(page.getByTestId("dashboard-link")).toBeVisible();
    //   await expect(page.getByTestId("nav-login")).not.toBeVisible();
  });

  test("authenticated user can access dashboard", async ({ page }) => {
    // TODO: Customize — navigate to your product's authenticated area
    // await page.goto("/dashboard");
    // await expect(page.getByTestId("dashboard-header")).toBeVisible();

    // Placeholder: verify the page does not redirect to login
    await expect(page).not.toHaveURL(/login/);
  });

  test("authenticated user data persists", async ({ page }) => {
    // TODO: Customize — verify user-specific data loads
    // Example for ScoreRebound:
    //   await page.goto("/dashboard");
    //   await expect(page.getByTestId("recovery-plan")).toBeVisible();

    // Placeholder: verify authenticated state survives navigation
    await page.goto("/");
    await page.reload();
    await expect(page).not.toHaveURL(/login/);
  });

  test("API routes work with authenticated session", async ({ request }) => {
    // Verify the health endpoint still works
    const healthResponse = await request.get("/api/health");
    expect(healthResponse.ok()).toBeTruthy();
    const healthBody = await healthResponse.json();
    expect(healthBody.status).toBe("ok");

    // TODO: Customize — test authenticated API endpoints
    // const response = await request.get("/api/user/profile");
    // expect(response.ok()).toBeTruthy();
    // const profile = await response.json();
    // expect(profile.email).toBeTruthy();
  });
});

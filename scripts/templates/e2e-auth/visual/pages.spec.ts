/**
 * Visual regression tests — captures and compares page screenshots.
 *
 * On first run, Playwright saves baseline snapshots to the -snapshots/ directory.
 * On subsequent runs, it compares current screenshots against the baselines.
 * If differences exceed the threshold, the test fails and generates diff images.
 *
 * Update baselines: bunx playwright test visual/ --update-snapshots
 *
 * These tests run in BOTH anonymous and authenticated contexts depending
 * on the Playwright project configuration.
 */

import { test, expect } from "@playwright/test";

test.describe("Visual Regression — Public Pages", () => {
  test("landing page", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("landing-page.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("landing page — mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("landing-page-mobile.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });

  test("landing page — hero section", async ({ page }) => {
    await page.goto("/");
    const hero = page.getByTestId("hero-section");
    await expect(hero).toBeVisible();

    await expect(hero).toHaveScreenshot("hero-section.png", {
      maxDiffPixelRatio: 0.01,
    });
  });

  test("landing page — footer", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByTestId("footer");
    await expect(footer).toBeVisible();
    await footer.scrollIntoViewIfNeeded();

    await expect(footer).toHaveScreenshot("footer.png", {
      maxDiffPixelRatio: 0.01,
    });
  });
});

/**
 * Authenticated visual regression tests.
 *
 * These only run in the "authenticated" Playwright project where
 * storageState is already set up. Customize for your product's
 * authenticated pages.
 */
test.describe("Visual Regression — Authenticated Pages", () => {
  // TODO: Customize — uncomment and adapt for your product's authenticated pages
  //
  // test("dashboard", async ({ page }) => {
  //   await page.goto("/dashboard");
  //   await page.waitForLoadState("networkidle");
  //
  //   await expect(page).toHaveScreenshot("dashboard.png", {
  //     fullPage: true,
  //     maxDiffPixelRatio: 0.01,
  //   });
  // });
  //
  // test("profile page", async ({ page }) => {
  //   await page.goto("/profile");
  //   await page.waitForLoadState("networkidle");
  //
  //   await expect(page).toHaveScreenshot("profile.png", {
  //     fullPage: true,
  //     maxDiffPixelRatio: 0.01,
  //   });
  // });

  test("placeholder — authenticated visual regression", async ({ page }) => {
    // Remove this test once you add real authenticated visual tests above.
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page).toHaveScreenshot("landing-authenticated.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.01,
    });
  });
});

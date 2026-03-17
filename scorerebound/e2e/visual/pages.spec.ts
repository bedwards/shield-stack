import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";

const screenshotCSS = fs.readFileSync(
  path.join(__dirname, "screenshot.css"),
  "utf-8",
);

// Visual regression baselines are platform-specific (font rendering differs
// between macOS and Linux). Current baselines were generated on macOS.
// CI runs on Linux and produces different page heights, causing immediate
// dimension-mismatch failures. Skip in CI until Linux baselines are committed.
// TODO: Generate Linux baselines from CI artifacts and commit them.
test.skip(!!process.env.CI, "Visual baselines are macOS-only — Linux baselines not yet committed");

/**
 * Inject stabilization CSS that disables animations, cursors, and backdrop
 * blur so screenshots are deterministic across runs.
 */
async function injectStabilizationCSS(page: import("@playwright/test").Page) {
  await page.addStyleTag({ content: screenshotCSS });
  // Allow a repaint so the browser applies the injected styles
  await page.waitForTimeout(100);
}

// ---------------------------------------------------------------------------
// Landing page — desktop (1280x720)
// ---------------------------------------------------------------------------
test.describe("Visual regression — landing page (desktop)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await injectStabilizationCSS(page);
  });

  test("full page screenshot matches baseline", async ({ page }) => {
    await expect(page).toHaveScreenshot("landing-desktop-full.png", {
      fullPage: true,
      maxDiffPixels: 100,
      mask: [page.locator("[data-testid='footer-copyright']")],
    });
  });

  test("above-the-fold viewport screenshot matches baseline", async ({
    page,
  }) => {
    await expect(page).toHaveScreenshot("landing-desktop-viewport.png", {
      maxDiffPixels: 100,
    });
  });
});

// ---------------------------------------------------------------------------
// Landing page — mobile (375x667)
// ---------------------------------------------------------------------------
test.describe("Visual regression — landing page (mobile)", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await injectStabilizationCSS(page);
  });

  test("full page screenshot matches baseline", async ({ page }) => {
    await expect(page).toHaveScreenshot("landing-mobile-full.png", {
      fullPage: true,
      maxDiffPixels: 100,
      mask: [page.locator("[data-testid='footer-copyright']")],
    });
  });

  test("above-the-fold viewport screenshot matches baseline", async ({
    page,
  }) => {
    await expect(page).toHaveScreenshot("landing-mobile-viewport.png", {
      maxDiffPixels: 100,
    });
  });
});

// ---------------------------------------------------------------------------
// Quiz page — each question step
// ---------------------------------------------------------------------------
test.describe("Visual regression — quiz steps", () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/#quiz");
    await page.waitForLoadState("networkidle");
    await injectStabilizationCSS(page);
  });

  test("step 0 — loan type selection", async ({ page }) => {
    await expect(page.locator("[data-testid='quiz-step-0']")).toBeVisible();
    await expect(page).toHaveScreenshot("quiz-step-0-loan-type.png", {
      maxDiffPixels: 100,
    });
  });

  test("step 1 — servicer selection", async ({ page }) => {
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await expect(page.locator("[data-testid='quiz-step-1']")).toBeVisible();

    await expect(page).toHaveScreenshot("quiz-step-1-servicer.png", {
      maxDiffPixels: 100,
    });
  });

  test("step 2 — delinquency status", async ({ page }) => {
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await expect(page.locator("[data-testid='quiz-step-2']")).toBeVisible();

    await expect(page).toHaveScreenshot("quiz-step-2-delinquency.png", {
      maxDiffPixels: 100,
    });
  });

  test("step 3 — score range", async ({ page }) => {
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await expect(page.locator("[data-testid='quiz-step-3']")).toBeVisible();

    await expect(page).toHaveScreenshot("quiz-step-3-score-range.png", {
      maxDiffPixels: 100,
    });
  });

  test("step 4 — goals (multi-select)", async ({ page }) => {
    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await expect(page.locator("[data-testid='quiz-step-4']")).toBeVisible();

    await expect(page).toHaveScreenshot("quiz-step-4-goals.png", {
      maxDiffPixels: 100,
    });
  });
});

// ---------------------------------------------------------------------------
// Recovery plan result page
// ---------------------------------------------------------------------------
test.describe("Visual regression — recovery plan page", () => {
  test("plan result page screenshot matches baseline", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    // Complete the quiz to generate a plan
    await page.goto("/#quiz");
    await page.waitForLoadState("networkidle");

    await page.locator("[data-testid='quiz-loan-type-federal_direct']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-servicer-mohela']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-delinquency-90_plus']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page.locator("[data-testid='quiz-score-range-500_579']").click();
    await page.locator("[data-testid='quiz-next']").click();
    await page
      .locator("[data-testid='quiz-goal-improve_credit_score']")
      .click();
    await page
      .locator("[data-testid='quiz-goal-get_out_of_default']")
      .click();
    await page.locator("[data-testid='quiz-submit']").click();

    // Wait for navigation to the plan page
    await page.waitForURL(/\/plan\//, { timeout: 15000 });
    await expect(page.locator("[data-testid='plan-viewer']")).toBeVisible({
      timeout: 10000,
    });
    await page.waitForLoadState("networkidle");
    await injectStabilizationCSS(page);

    await expect(page).toHaveScreenshot("plan-result-page.png", {
      fullPage: true,
      maxDiffPixels: 100,
      mask: [page.locator("[data-testid='footer-copyright']")],
    });
  });
});

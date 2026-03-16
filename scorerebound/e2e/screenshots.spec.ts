import { test } from "@playwright/test";
import path from "path";

const screenshotDir = path.join(__dirname, "..", "screenshots");

test.describe("ScoreRebound - Visual Screenshots", () => {
  test("full page screenshot - desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(screenshotDir, "home-desktop.png"),
      fullPage: true,
    });
  });

  test("full page screenshot - mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    await page.screenshot({
      path: path.join(screenshotDir, "home-mobile.png"),
      fullPage: true,
    });
  });

  test("hero section screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const hero = page.getByTestId("hero-section");
    await hero.screenshot({
      path: path.join(screenshotDir, "hero-section.png"),
    });
  });

  test("recovery paths screenshot", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/");
    const paths = page.getByTestId("recovery-paths-section");
    await paths.screenshot({
      path: path.join(screenshotDir, "recovery-paths.png"),
    });
  });
});

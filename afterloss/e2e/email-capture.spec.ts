import { test, expect } from "@playwright/test";

test.describe("Email Capture", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("email capture form is visible on landing page", async ({ page }) => {
    const form = page.getByTestId("email-capture-form");
    await expect(form).toBeVisible();
    await expect(page.getByTestId("email-input")).toBeVisible();
    await expect(page.getByTestId("email-submit")).toBeVisible();
  });

  test("shows empathetic copy", async ({ page }) => {
    await expect(
      page.getByText("Not ready to start yet? That's okay.")
    ).toBeVisible();
    await expect(
      page.getByText(/gentle reminders and helpful resources/)
    ).toBeVisible();
  });

  test("validates empty email submission", async ({ page }) => {
    await page.getByTestId("email-submit").click();
    // HTML5 validation prevents submission on empty required field
    const input = page.getByTestId("email-input");
    await expect(input).toHaveAttribute("required");
  });

  test("validates invalid email format", async ({ page }) => {
    await page.getByTestId("email-input").fill("not-an-email");
    await page.getByTestId("email-submit").click();
    // After form submission attempt with invalid email, expect error
    const error = page.getByTestId("email-error");
    await expect(error).toBeVisible({ timeout: 5000 });
    await expect(error).toContainText("valid email");
  });
});

test.describe("Email Capture on Guide Page", () => {
  test("email capture form is visible on 2026 guide page", async ({
    page,
  }) => {
    await page.goto("/guides/what-to-do-when-someone-dies-checklist");
    const form = page.getByTestId("email-capture-form");
    await expect(form).toBeVisible();
  });
});

test.describe("Email Capture on Resource Pages", () => {
  test("email capture form is visible on grief counseling page", async ({
    page,
  }) => {
    await page.goto("/resources/grief-counseling");
    const form = page.getByTestId("email-capture-form");
    await expect(form).toBeVisible();
  });

  test("email capture form is visible on life insurance page", async ({
    page,
  }) => {
    await page.goto("/resources/life-insurance-after-loss");
    const form = page.getByTestId("email-capture-form");
    await expect(form).toBeVisible();
  });
});

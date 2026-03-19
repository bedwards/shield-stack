import type { Page } from "@playwright/test";
import path from "path";

export const STORAGE_STATE_PATH = path.join(__dirname, "..", ".auth", "user.json");

/**
 * Authenticates via the /api/test-auth endpoint and saves storage state.
 * Requires TEST_MODE=true in the environment.
 */
export async function loginAsTestUser(page: Page) {
  const response = await page.request.post("/api/test-auth");
  const data = await response.json();

  if (!response.ok()) {
    throw new Error(`Test auth failed: ${JSON.stringify(data)}`);
  }

  // Store the test session in localStorage for the app to use
  await page.goto("/");
  await page.evaluate((session) => {
    localStorage.setItem("ghostboard-test-session", JSON.stringify(session));
  }, data);

  return data;
}

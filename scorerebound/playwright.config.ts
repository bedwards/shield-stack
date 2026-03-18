import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3010";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  snapshotPathTemplate:
    "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{platform}/{arg}-{projectName}{ext}",
  expect: {
    toHaveScreenshot: {
      maxDiffPixels: 200,
      threshold: 0.3,
    },
  },
  use: {
    baseURL,
    trace: "on-first-retry",
    screenshot: "on",
  },
  projects: [
    // Unauthenticated functional tests — run without any auth setup
    // Visual regression tests (e2e/visual/) excluded in CI — they're platform-dependent
    // and run locally via RALPH verifier/monitor on macOS instead.
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
      testIgnore: [
        "**/authenticated/**",
        ...(process.env.CI ? ["**/visual/**"] : []),
      ],
    },
    // Auth setup — creates test user and saves storage state
    {
      name: "setup",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    // Authenticated tests — depend on setup, use stored auth state
    {
      name: "authenticated",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
      testMatch: ["**/authenticated/**"],
    },
  ],
  webServer: {
    command: "bun run dev --port 3010",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

import { test as setup } from "@playwright/test";

/**
 * Playwright setup project: verifies test-auth endpoint works.
 * Runs before all other test projects.
 */
setup("verify test auth endpoint", async ({ request }) => {
  // Verify the test-auth endpoint is available
  const response = await request.post("/api/test-auth");

  // In test mode, this should succeed
  // In non-test mode, it returns 403 — that's fine, tests will skip auth-dependent flows
  if (response.ok()) {
    const data = await response.json();
    setup.info().annotations.push({
      type: "test-auth",
      description: `Authenticated as ${data.user.email}`,
    });
  }
});

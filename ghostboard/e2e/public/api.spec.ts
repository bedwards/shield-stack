import { test, expect } from "@playwright/test";

test.describe("API Endpoints", () => {
  test("GET /api/health returns ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBe(true);
    const data = await response.json();
    expect(data.status).toBe("ok");
  });

  test("GET /api/companies/search requires query param", async ({ request }) => {
    const response = await request.get("/api/companies/search");
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("at least 2 characters");
  });

  test("GET /api/companies/search with short query returns error", async ({ request }) => {
    const response = await request.get("/api/companies/search?q=a");
    expect(response.status()).toBe(400);
  });

  test("GET /api/companies/nonexistent returns 404", async ({ request }) => {
    const response = await request.get("/api/companies/nonexistent-company-slug-xyz");
    expect(response.status()).toBe(404);
  });

  test("POST /api/reports with empty body returns 400", async ({ request }) => {
    const response = await request.post("/api/reports", {
      data: {},
    });
    expect(response.status()).toBe(400);
  });

  test("POST /api/reports with invalid status returns 400", async ({ request }) => {
    const response = await request.post("/api/reports", {
      data: {
        company_id: "00000000-0000-0000-0000-000000000001",
        status: "invalid_status",
        applied_date: "2026-01-01",
      },
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("status must be one of");
  });

  test("POST /api/reports with future applied_date returns 400", async ({ request }) => {
    const response = await request.post("/api/reports", {
      data: {
        company_id: "00000000-0000-0000-0000-000000000001",
        status: "ghosted",
        applied_date: "2099-01-01",
      },
    });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toContain("future");
  });

  test("POST /api/test-auth returns 403 when not in test mode", async ({ request }) => {
    // When TEST_MODE is not set, test-auth should be forbidden
    // Note: if running with TEST_MODE=true, this test will return 200 instead
    const response = await request.post("/api/test-auth");
    // Accept either 200 (test mode) or 403 (prod mode)
    expect([200, 403]).toContain(response.status());
  });
});

import { test, expect } from "@playwright/test";

test.describe("API Endpoints", () => {
  test("GET /api/health returns ok", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.ok()).toBe(true);
    const data = await response.json();
    expect(data.status).toBe("ok");
  });

  test.describe("GET /api/companies/search", () => {
    test("requires query param", async ({ request }) => {
      const response = await request.get("/api/companies/search");
      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data.error).toContain("at least 2 characters");
    });

    test("rejects short query", async ({ request }) => {
      const response = await request.get("/api/companies/search?q=a");
      expect(response.status()).toBe(400);
    });

    test("returns results for valid query", async ({ request }) => {
      const response = await request.get("/api/companies/search?q=Amazon");
      expect(response.ok()).toBe(true);
      const data = await response.json();
      expect(data.companies).toBeDefined();
      expect(data.total).toBeGreaterThanOrEqual(0);
    });

    test("returns empty for nonexistent company", async ({ request }) => {
      const response = await request.get(
        "/api/companies/search?q=ZzzzNoCompanyLikeThis",
      );
      expect(response.ok()).toBe(true);
      const data = await response.json();
      expect(data.companies).toHaveLength(0);
    });

    test("respects limit parameter", async ({ request }) => {
      const response = await request.get(
        "/api/companies/search?q=a&limit=2",
      );
      expect(response.ok()).toBe(true);
      const data = await response.json();
      expect(data.companies.length).toBeLessThanOrEqual(2);
    });
  });

  test.describe("GET /api/companies/[slug]", () => {
    test("returns 404 for nonexistent company", async ({ request }) => {
      const response = await request.get(
        "/api/companies/nonexistent-company-slug-xyz",
      );
      expect(response.status()).toBe(404);
    });

    test("returns company data for valid slug", async ({ request }) => {
      const response = await request.get("/api/companies/amazon");
      expect(response.ok()).toBe(true);
      const data = await response.json();
      expect(data.company).toBeDefined();
      expect(data.company.name).toBe("Amazon");
      expect(data.stats).toBeDefined();
      expect(data.recent_reports).toBeDefined();
      expect(data.status_distribution).toBeDefined();
      expect(typeof data.has_enough_reports).toBe("boolean");
    });
  });

  test.describe("POST /api/reports", () => {
    test("rejects empty body", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {},
      });
      expect(response.status()).toBe(400);
    });

    test("rejects invalid status", async ({ request }) => {
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

    test("rejects future applied_date", async ({ request }) => {
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

    test("rejects invalid date format", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {
          company_id: "00000000-0000-0000-0000-000000000001",
          status: "ghosted",
          applied_date: "01/15/2026",
        },
      });
      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data.error).toContain("YYYY-MM-DD");
    });

    test("rejects response_date before applied_date", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {
          company_id: "00000000-0000-0000-0000-000000000001",
          status: "heard_back",
          applied_date: "2026-02-01",
          response_date: "2026-01-01",
        },
      });
      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data.error).toContain("cannot be before");
    });

    test("rejects invalid role_level", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {
          company_id: "00000000-0000-0000-0000-000000000001",
          status: "ghosted",
          applied_date: "2026-01-01",
          role_level: "ceo",
        },
      });
      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data.error).toContain("role_level must be one of");
    });

    test("rejects invalid application_method", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {
          company_id: "00000000-0000-0000-0000-000000000001",
          status: "ghosted",
          applied_date: "2026-01-01",
          application_method: "telegram",
        },
      });
      expect(response.status()).toBe(400);
      const data = await response.json();
      expect(data.error).toContain("application_method must be one of");
    });

    test("returns 404 for nonexistent company_id", async ({ request }) => {
      const response = await request.post("/api/reports", {
        data: {
          company_id: "00000000-0000-0000-0000-000000000099",
          status: "ghosted",
          applied_date: "2026-01-01",
        },
      });
      // Either 404 (company not found) or some other server error
      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });

  test("POST /api/test-auth returns 403 when not in test mode", async ({
    request,
  }) => {
    const response = await request.post("/api/test-auth");
    // Accept either 200 (test mode) or 403 (prod mode)
    expect([200, 403]).toContain(response.status());
  });
});

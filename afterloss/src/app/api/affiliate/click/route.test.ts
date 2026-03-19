import { describe, it, expect, vi, beforeEach } from "vitest";
import { POST, GET } from "./route";
import { NextRequest } from "next/server";

// Mock the supabase-server module
vi.mock("@/lib/supabase-server", () => ({
  createServiceRoleClient: vi.fn(),
}));

import { createServiceRoleClient } from "@/lib/supabase-server";

function mockSupabase(overrides: {
  selectReturn?: { data: unknown; error: unknown };
  insertReturn?: { error: unknown };
}) {
  const mockSingle = vi.fn().mockResolvedValue(
    overrides.selectReturn || {
      data: {
        id: 1,
        affiliate_url: "https://example.com/aff",
        url: "https://example.com",
        is_active: true,
      },
      error: null,
    }
  );

  const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
  const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
  const mockInsert = vi.fn().mockResolvedValue(
    overrides.insertReturn || { error: null }
  );

  const client = {
    from: vi.fn().mockImplementation((table: string) => {
      if (table === "affiliate_partners") {
        return { select: mockSelect };
      }
      if (table === "affiliate_clicks") {
        return { insert: mockInsert };
      }
      return {};
    }),
  };

  (createServiceRoleClient as ReturnType<typeof vi.fn>).mockReturnValue(client);
  return { client, mockInsert, mockSelect };
}

function createPostRequest(body: Record<string, unknown>): NextRequest {
  return new NextRequest("http://localhost:3000/api/affiliate/click", {
    method: "POST",
    headers: { "Content-Type": "application/json", "User-Agent": "TestBot/1.0" },
    body: JSON.stringify(body),
  });
}

function createGetRequest(params: Record<string, string>): NextRequest {
  const url = new URL("http://localhost:3000/api/affiliate/click");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new NextRequest(url, {
    method: "GET",
    headers: { "User-Agent": "TestBot/1.0" },
  });
}

describe("POST /api/affiliate/click", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns redirect_url on successful click tracking", async () => {
    mockSupabase({});

    const req = createPostRequest({
      slug: "rocket-lawyer",
      referrer_page: "/checklist",
    });

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.redirect_url).toBe("https://example.com/aff");
  });

  it("returns 400 when slug is missing", async () => {
    const req = createPostRequest({});

    const res = await POST(req);
    expect(res.status).toBe(400);

    const data = await res.json();
    expect(data.error).toContain("slug");
  });

  it("returns 404 when partner not found", async () => {
    mockSupabase({
      selectReturn: { data: null, error: { message: "not found" } },
    });

    const req = createPostRequest({ slug: "nonexistent" });
    const res = await POST(req);

    expect(res.status).toBe(404);
  });

  it("returns 410 when partner is inactive", async () => {
    mockSupabase({
      selectReturn: {
        data: {
          id: 1,
          affiliate_url: "https://example.com/aff",
          url: "https://example.com",
          is_active: false,
        },
        error: null,
      },
    });

    const req = createPostRequest({ slug: "inactive-partner" });
    const res = await POST(req);

    expect(res.status).toBe(410);
  });

  it("still returns redirect_url even if click logging fails", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockSupabase({
      insertReturn: { error: { message: "db error" } },
    });

    const req = createPostRequest({ slug: "rocket-lawyer" });
    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.redirect_url).toBe("https://example.com/aff");
    expect(consoleSpy).toHaveBeenCalledWith(
      "Failed to log affiliate click:",
      expect.objectContaining({ message: "db error" })
    );
  });

  it("inserts click with user_agent from headers", async () => {
    const { mockInsert } = mockSupabase({});

    const req = createPostRequest({
      slug: "rocket-lawyer",
      referrer_page: "/guides/texas",
      checklist_step_id: "probate_help",
      case_id: "case-uuid-123",
    });

    await POST(req);

    expect(mockInsert).toHaveBeenCalledWith({
      partner_id: 1,
      case_id: "case-uuid-123",
      checklist_step_id: "probate_help",
      referrer_page: "/guides/texas",
      user_agent: "TestBot/1.0",
    });
  });

  it("falls back to url when affiliate_url is null", async () => {
    mockSupabase({
      selectReturn: {
        data: {
          id: 2,
          affiliate_url: null,
          url: "https://fallback.com",
          is_active: true,
        },
        error: null,
      },
    });

    const req = createPostRequest({ slug: "fallback-partner" });
    const res = await POST(req);
    const data = await res.json();

    expect(data.redirect_url).toBe("https://fallback.com");
  });
});

describe("GET /api/affiliate/click", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns 400 when slug is missing", async () => {
    const req = createGetRequest({});
    const res = await GET(req);
    expect(res.status).toBe(400);
  });

  it("redirects to affiliate URL on success", async () => {
    mockSupabase({});

    const req = createGetRequest({ slug: "rocket-lawyer", referrer: "/home" });
    const res = await GET(req);

    expect(res.status).toBe(302);
    expect(res.headers.get("location")).toBe("https://example.com/aff");
  });

  it("returns 404 when partner not found", async () => {
    mockSupabase({
      selectReturn: { data: null, error: { message: "not found" } },
    });

    const req = createGetRequest({ slug: "nonexistent" });
    const res = await GET(req);
    expect(res.status).toBe(404);
  });
});

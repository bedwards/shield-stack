import { describe, it, expect, vi, beforeEach } from "vitest";
import { trackAffiliateClick } from "./track-click";

describe("trackAffiliateClick", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Mock window.location for referrer_page fallback
    Object.defineProperty(window, "location", {
      value: { pathname: "/checklist" },
      writable: true,
    });
  });

  it("sends POST to /api/affiliate/click with correct body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ redirect_url: "https://example.com/affiliate" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await trackAffiliateClick({
      slug: "rocket-lawyer",
      checklistStepId: "estate_planning",
      caseId: "case-123",
    });

    expect(mockFetch).toHaveBeenCalledWith("/api/affiliate/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: "rocket-lawyer",
        referrer_page: "/checklist",
        checklist_step_id: "estate_planning",
        case_id: "case-123",
      }),
    });
  });

  it("returns redirect URL on success", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ redirect_url: "https://trustandwill.com/aff" }),
    }));

    const url = await trackAffiliateClick({ slug: "trust-and-will" });
    expect(url).toBe("https://trustandwill.com/aff");
  });

  it("returns null on non-OK response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    }));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const url = await trackAffiliateClick({ slug: "nonexistent" });
    expect(url).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("returns null on network error", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network down")));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    const url = await trackAffiliateClick({ slug: "rocket-lawyer" });
    expect(url).toBeNull();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it("uses custom referrerPage when provided", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ redirect_url: "https://example.com" }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await trackAffiliateClick({
      slug: "nolo",
      referrerPage: "/guides/texas/probate",
    });

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.referrer_page).toBe("/guides/texas/probate");
  });
});

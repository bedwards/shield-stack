import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "./route";
import { getClickLog, clearClickLog } from "@/lib/affiliate/click-log";

function makeRequest(
  params: Record<string, string>,
  headers?: Record<string, string>,
): Request {
  const url = new URL("http://localhost:3001/api/affiliate/click");
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, value);
  }
  return new Request(url.toString(), {
    headers: new Headers(headers ?? {}),
  });
}

describe("GET /api/affiliate/click", () => {
  beforeEach(() => {
    clearClickLog();
  });

  it("redirects to partner URL for valid slug", async () => {
    const request = makeRequest({ slug: "chooseenergy" });
    const response = await GET(request);

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "https://placeholder.example.com/chooseenergy",
    );
  });

  it("returns 404 for unknown slug", async () => {
    const request = makeRequest({ slug: "nonexistent" });
    const response = await GET(request);

    expect(response.status).toBe(404);
    const body = await response.json();
    expect(body.error).toContain("Unknown affiliate partner");
  });

  it("returns 400 when slug is missing", async () => {
    const request = makeRequest({});
    const response = await GET(request);

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.error).toContain("Missing required parameter: slug");
  });

  it("logs click with all parameters", async () => {
    const request = makeRequest(
      {
        slug: "energysage",
        referrer: "/guides/solar",
        state: "CA",
      },
      { "user-agent": "TestBot/1.0" },
    );
    await GET(request);

    const log = getClickLog();
    expect(log).toHaveLength(1);
    expect(log[0].slug).toBe("energysage");
    expect(log[0].referrer).toBe("/guides/solar");
    expect(log[0].state).toBe("CA");
    expect(log[0].user_agent).toBe("TestBot/1.0");
    expect(log[0].timestamp).toBeTruthy();
  });

  it("logs click with null for missing optional params", async () => {
    const request = makeRequest({ slug: "homedepot" });
    await GET(request);

    const log = getClickLog();
    expect(log).toHaveLength(1);
    expect(log[0].referrer).toBeNull();
    expect(log[0].state).toBeNull();
  });

  it("does not log click for invalid slug", async () => {
    const request = makeRequest({ slug: "nonexistent" });
    await GET(request);

    expect(getClickLog()).toHaveLength(0);
  });

  it("logs multiple clicks", async () => {
    await GET(makeRequest({ slug: "chooseenergy" }));
    await GET(makeRequest({ slug: "sunpower" }));
    await GET(makeRequest({ slug: "arcadia" }));

    expect(getClickLog()).toHaveLength(3);
  });
});

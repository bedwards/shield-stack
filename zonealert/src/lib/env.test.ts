import { describe, it, expect, vi, afterEach } from "vitest";
import { isTestMode, getAppUrl } from "./env";

describe("env helpers", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("isTestMode returns true when TEST_MODE is 'true'", () => {
    vi.stubEnv("TEST_MODE", "true");
    expect(isTestMode()).toBe(true);
  });

  it("isTestMode returns false when TEST_MODE is not set", () => {
    vi.stubEnv("TEST_MODE", "");
    expect(isTestMode()).toBe(false);
  });

  it("getAppUrl returns default when NEXT_PUBLIC_APP_URL is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    expect(getAppUrl()).toBe("http://localhost:3009");
  });

  it("getAppUrl returns env value when set", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://zonealert.com");
    expect(getAppUrl()).toBe("https://zonealert.com");
  });
});

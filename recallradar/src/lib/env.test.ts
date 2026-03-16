import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode, getAppUrl } from "./env";

describe("env helpers", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it("isTestMode returns true when TEST_MODE=true", () => {
    vi.stubEnv("TEST_MODE", "true");
    expect(isTestMode()).toBe(true);
  });

  it("isTestMode returns false when TEST_MODE is not set", () => {
    vi.stubEnv("TEST_MODE", "");
    expect(isTestMode()).toBe(false);
  });

  it("isTestMode returns false when TEST_MODE=false", () => {
    vi.stubEnv("TEST_MODE", "false");
    expect(isTestMode()).toBe(false);
  });

  it("getAppUrl returns default when not set", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    expect(getAppUrl()).toBe("http://localhost:3008");
  });

  it("getAppUrl returns env value when set", () => {
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "https://recallradar.com");
    expect(getAppUrl()).toBe("https://recallradar.com");
  });
});

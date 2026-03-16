import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode } from "./env";

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
});

import { describe, it, expect, vi, beforeEach } from "vitest";
import { isTestMode, getAppUrl, getVapidPublicKey, getVapidPrivateKey } from "./env";

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

  it("getVapidPublicKey returns key when set", () => {
    vi.stubEnv("NEXT_PUBLIC_VAPID_PUBLIC_KEY", "test-vapid-public-key");
    expect(getVapidPublicKey()).toBe("test-vapid-public-key");
  });

  it("getVapidPublicKey throws when not set", () => {
    vi.stubEnv("NEXT_PUBLIC_VAPID_PUBLIC_KEY", "");
    expect(() => getVapidPublicKey()).toThrow("NEXT_PUBLIC_VAPID_PUBLIC_KEY is not set");
  });

  it("getVapidPrivateKey returns key when set", () => {
    vi.stubEnv("VAPID_PRIVATE_KEY", "test-vapid-private-key");
    expect(getVapidPrivateKey()).toBe("test-vapid-private-key");
  });

  it("getVapidPrivateKey throws when not set", () => {
    vi.stubEnv("VAPID_PRIVATE_KEY", "");
    expect(() => getVapidPrivateKey()).toThrow("VAPID_PRIVATE_KEY is not set");
  });
});

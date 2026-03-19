import { readFileSync } from "fs";
import { resolve } from "path";
import { describe, it, expect, beforeAll } from "vitest";
import {
  SUBSCRIPTION_CATEGORIES,
  CATEGORY_MINIMUMS,
  type SubscriptionCategory,
} from "./types";

/**
 * Validates the seed-subscriptions.sql file:
 * - At least 100 records
 * - All 9 categories are represented
 * - Minimum counts per category (from issue #256)
 * - Facebook has both memorialization and deletion entries
 * - All entries have valid categories and cancellation methods
 */
describe("Subscription Cancellation Templates (seed-subscriptions.sql)", () => {
  const VALID_CATEGORIES = new Set<string>(SUBSCRIPTION_CATEGORIES);
  const VALID_METHODS = new Set(["online", "phone", "mail", "email"]);

  let entries: Array<{
    serviceName: string;
    category: string;
    method: string;
  }>;

  beforeAll(() => {
    const sql = readFileSync(
      resolve(__dirname, "../../../supabase/seed-subscriptions.sql"),
      "utf-8"
    );
    // Match VALUES tuples: ('service_name', 'category', 'method', ...)
    // The first three single-quoted values are service_name, category, cancellation_method
    const regex =
      /\(\s*'([^']+(?:''[^']*?)*)'\s*,\s*'(streaming|utility|insurance|membership|financial|social_media|email|cloud_storage|government)'\s*,\s*'(online|phone|mail|email)'/g;
    entries = [];
    let match;
    while ((match = regex.exec(sql)) !== null) {
      entries.push({
        serviceName: match[1].replace(/''/g, "'"),
        category: match[2],
        method: match[3],
      });
    }
  });

  it("contains at least 100 subscription templates", () => {
    expect(entries.length).toBeGreaterThanOrEqual(100);
  });

  it("covers all 9 subscription categories", () => {
    const categoriesFound = new Set(entries.map((e) => e.category));
    for (const category of SUBSCRIPTION_CATEGORIES) {
      expect(
        categoriesFound.has(category),
        `Missing category: ${category}`
      ).toBe(true);
    }
  });

  describe("meets minimum counts per category", () => {
    for (const [category, minimum] of Object.entries(CATEGORY_MINIMUMS)) {
      it(`has at least ${minimum} ${category} entries`, () => {
        const count = entries.filter((e) => e.category === category).length;
        expect(count).toBeGreaterThanOrEqual(minimum as number);
      });
    }
  });

  it("documents Facebook memorialization AND deletion", () => {
    const facebookEntries = entries.filter((e) =>
      e.serviceName.startsWith("Facebook")
    );
    expect(facebookEntries.length).toBeGreaterThanOrEqual(2);

    const hasMemorialization = facebookEntries.some((e) =>
      e.serviceName.includes("Memorialization")
    );
    const hasDeletion = facebookEntries.some((e) =>
      e.serviceName.includes("Deletion")
    );
    expect(hasMemorialization, "Missing Facebook Memorialization entry").toBe(
      true
    );
    expect(hasDeletion, "Missing Facebook Account Deletion entry").toBe(true);
  });

  it("all entries have valid categories", () => {
    for (const entry of entries) {
      expect(
        VALID_CATEGORIES.has(entry.category),
        `Invalid category "${entry.category}" for "${entry.serviceName}"`
      ).toBe(true);
    }
  });

  it("all entries have valid cancellation methods", () => {
    for (const entry of entries) {
      expect(
        VALID_METHODS.has(entry.method),
        `Invalid method "${entry.method}" for "${entry.serviceName}"`
      ).toBe(true);
    }
  });

  it("all service names are unique", () => {
    const names = entries.map((e) => e.serviceName);
    const uniqueNames = new Set(names);
    expect(uniqueNames.size).toBe(names.length);
  });

  it("includes specific required services from issue #256", () => {
    const names = new Set(entries.map((e) => e.serviceName));

    // Streaming (10+)
    for (const service of [
      "Netflix",
      "Hulu",
      "Disney+",
      "YouTube TV",
      "Apple TV+",
      "Spotify",
      "Max (HBO)",
      "Peacock",
      "Paramount+",
    ]) {
      expect(names.has(service), `Missing required streaming: ${service}`).toBe(
        true
      );
    }

    // Social Media (6+)
    for (const service of [
      "Facebook (Memorialization)",
      "Facebook (Account Deletion)",
      "Instagram",
      "X (Twitter)",
      "LinkedIn",
      "TikTok",
    ]) {
      expect(
        names.has(service),
        `Missing required social media: ${service}`
      ).toBe(true);
    }

    // Financial (10+)
    for (const service of [
      "Chase",
      "Bank of America",
      "Wells Fargo",
      "Citibank",
      "Fidelity Investments",
      "Charles Schwab",
      "Vanguard",
      "American Express",
      "Discover",
      "Capital One",
    ]) {
      expect(
        names.has(service),
        `Missing required financial: ${service}`
      ).toBe(true);
    }

    // Insurance (5+)
    for (const service of [
      "State Farm",
      "Geico",
      "Progressive",
      "Allstate",
      "USAA",
    ]) {
      expect(
        names.has(service),
        `Missing required insurance: ${service}`
      ).toBe(true);
    }

    // Government (5+)
    for (const service of ["Medicare"]) {
      expect(
        names.has(service),
        `Missing required government: ${service}`
      ).toBe(true);
    }
  });

  it("seed script is idempotent (uses ON CONFLICT DO NOTHING)", () => {
    const sql = readFileSync(
      resolve(__dirname, "../../../supabase/seed-subscriptions.sql"),
      "utf-8"
    );
    const insertCount = (sql.match(/INSERT INTO subscription_templates/g) || [])
      .length;
    const conflictCount = (
      sql.match(/ON CONFLICT \(service_name\) DO NOTHING/g) || []
    ).length;
    expect(conflictCount).toBe(insertCount);
  });
});

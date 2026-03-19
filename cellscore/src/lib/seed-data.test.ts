import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Validates the seed migration SQL against issue requirements:
 * - At least 15 carriers (3 MNOs + 12 MVNOs)
 * - At least 60 plans
 * - Idempotent (ON CONFLICT DO NOTHING)
 * - data_priority_level included
 * - last_verified_at timestamps present
 * - Carrier records include type (mno/mvno), parent_carrier_id, website
 */
describe("seed migration data integrity", () => {
  const seedSql = readFileSync(
    resolve(__dirname, "../../supabase/migrations/20260319060220_seed_carriers_and_plans.sql"),
    "utf-8"
  );

  describe("carriers", () => {
    it("seeds at least 15 carriers", () => {
      const carrierInserts = seedSql.match(
        /INSERT INTO carriers.*?ON CONFLICT \(slug\) DO NOTHING;/gs
      );
      expect(carrierInserts).not.toBeNull();

      // Count unique carrier slugs
      const slugMatches = seedSql.matchAll(/'([a-z][a-z0-9-]+)',\s*'(?:mno|mvno)'/g);
      const slugs = new Set([...slugMatches].map((m) => m[1]));
      expect(slugs.size).toBeGreaterThanOrEqual(15);
    });

    it("includes at least 3 MNOs", () => {
      const mnoMatches = seedSql.matchAll(/'([a-z][a-z0-9-]+)',\s*'mno'/g);
      const mnos = [...mnoMatches];
      expect(mnos.length).toBeGreaterThanOrEqual(3);
    });

    it("includes at least 12 MVNOs", () => {
      const mvnoMatches = seedSql.matchAll(/'([a-z][a-z0-9-]+)',\s*'mvno'/g);
      const mvnos = [...mvnoMatches];
      expect(mvnos.length).toBeGreaterThanOrEqual(12);
    });

    it("all carrier inserts use ON CONFLICT DO NOTHING", () => {
      const carrierBlocks = seedSql.match(
        /INSERT INTO carriers[\s\S]*?;/g
      );
      expect(carrierBlocks).not.toBeNull();
      for (const block of carrierBlocks!) {
        expect(block).toContain("ON CONFLICT");
        expect(block).toContain("DO NOTHING");
      }
    });

    it("carriers include website URLs", () => {
      const websiteMatches = seedSql.matchAll(/https?:\/\/[^\s']+/g);
      const urls = [...websiteMatches].map((m) => m[0]);
      // Should have many URLs for websites and affiliate links
      expect(urls.length).toBeGreaterThan(15);
    });
  });

  describe("plans", () => {
    it("seeds at least 60 plans", () => {
      // Count plan name entries in INSERT INTO plans blocks
      const planNameMatches = seedSql.matchAll(
        /\(SELECT id FROM carriers WHERE slug = '[^']+'\),\s*\n\s*'([^']+)',/g
      );
      const planNames = [...planNameMatches];
      expect(planNames.length).toBeGreaterThanOrEqual(60);
    });

    it("all plan inserts use ON CONFLICT DO NOTHING", () => {
      const planBlocks = seedSql.match(
        /INSERT INTO plans[\s\S]*?ON CONFLICT[\s\S]*?;/g
      );
      expect(planBlocks).not.toBeNull();
      for (const block of planBlocks!) {
        expect(block).toContain("ON CONFLICT");
        expect(block).toContain("DO NOTHING");
      }
    });

    it("includes data_priority_level for plans", () => {
      // QCI levels should be present for carrier plans
      const qciMatches = seedSql.matchAll(/'QCI \d+'/g);
      const qciValues = [...qciMatches];
      expect(qciValues.length).toBeGreaterThanOrEqual(30);
    });

    it("includes last_verified_at timestamps", () => {
      const dateMatches = seedSql.matchAll(/'2026-03-\d{2}'/g);
      const dates = [...dateMatches];
      expect(dates.length).toBeGreaterThanOrEqual(60);
    });

    it("plans reference carriers by slug subquery", () => {
      const subqueryMatches = seedSql.matchAll(
        /\(SELECT id FROM carriers WHERE slug = '([^']+)'\)/g
      );
      const referencedSlugs = new Set([...subqueryMatches].map((m) => m[1]));
      // Every carrier with plans should be referenced
      expect(referencedSlugs.size).toBeGreaterThanOrEqual(15);
    });

    it("includes features JSONB with five_g and wifi_calling", () => {
      expect(seedSql).toContain('"five_g": true');
      expect(seedSql).toContain('"wifi_calling": true');
    });

    it("includes both unlimited and capped data plans", () => {
      // Unlimited plans have NULL as the data_limit_gb value (4th positional arg)
      // Pattern: monthly_price, NULL, 'throttle text'
      const unlimitedMatches = seedSql.matchAll(
        /\d+\.\d+, NULL, '.*?(?:after|cap|deprioritiz)/g
      );
      expect([...unlimitedMatches].length).toBeGreaterThan(0);

      // Capped plans have a numeric data_limit_gb value
      // Pattern: monthly_price, data_limit_gb, 'throttle text'
      const cappedMatches = seedSql.matchAll(
        /\d+\.\d+, \d+, '(?:128 kbps|64 kbps|Throttled)/g
      );
      expect([...cappedMatches].length).toBeGreaterThan(0);
    });

    it("includes affiliate URLs for MVNOs", () => {
      const affiliateMatches = seedSql.matchAll(/utm_source=cellscore/g);
      const affiliateUrls = [...affiliateMatches];
      // Most MVNOs should have affiliate URLs
      expect(affiliateUrls.length).toBeGreaterThanOrEqual(10);
    });
  });
});

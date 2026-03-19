import { describe, it, expect, beforeEach } from "vitest";
import {
  STATE_PROBATE_RULES,
  STATE_PROBATE_MAP,
  getStateProbateRule,
  getVerifiedStates,
  getStatesByThreshold,
  type StateProbateRule,
} from "./state-data";

/**
 * All 50 US states + DC — the canonical set of state codes that must be present.
 */
const EXPECTED_STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
];

/**
 * Top 10 states that must be verified from primary (state court) sources.
 */
const VERIFIED_STATE_CODES = [
  "CA", "TX", "FL", "NY", "PA", "IL", "OH", "GA", "NC", "MI",
];

describe("State Probate Rules Dataset", () => {
  describe("completeness", () => {
    it("contains exactly 51 records (50 states + DC)", () => {
      expect(STATE_PROBATE_RULES).toHaveLength(51);
    });

    it("contains every expected state code", () => {
      const actualCodes = STATE_PROBATE_RULES.map((s) => s.stateCode);
      for (const code of EXPECTED_STATE_CODES) {
        expect(actualCodes).toContain(code);
      }
    });

    it("has no duplicate state codes", () => {
      const codes = STATE_PROBATE_RULES.map((s) => s.stateCode);
      const unique = new Set(codes);
      expect(unique.size).toBe(codes.length);
    });

    it("is sorted alphabetically by state name", () => {
      const names = STATE_PROBATE_RULES.map((s) => s.stateName);
      const sorted = [...names].sort();
      expect(names).toEqual(sorted);
    });
  });

  describe("core fields — no nulls or undefined", () => {
    let rules: StateProbateRule[];

    beforeEach(() => {
      rules = STATE_PROBATE_RULES;
    });

    it("every record has a non-empty stateCode (2 chars)", () => {
      for (const rule of rules) {
        expect(rule.stateCode).toMatch(/^[A-Z]{2}$/);
      }
    });

    it("every record has a non-empty stateName", () => {
      for (const rule of rules) {
        expect(rule.stateName.length).toBeGreaterThan(0);
      }
    });

    it("every record has a positive probateThreshold", () => {
      for (const rule of rules) {
        expect(rule.probateThreshold).toBeGreaterThan(0);
      }
    });

    it("every record has a positive smallEstateAffidavitLimit", () => {
      for (const rule of rules) {
        expect(rule.smallEstateAffidavitLimit).toBeGreaterThan(0);
      }
    });

    it("smallEstateAffidavitLimit <= probateThreshold for every state", () => {
      for (const rule of rules) {
        expect(rule.smallEstateAffidavitLimit).toBeLessThanOrEqual(
          rule.probateThreshold,
        );
      }
    });

    it("every record has a positive filingDeadlineDays", () => {
      for (const rule of rules) {
        expect(rule.filingDeadlineDays).toBeGreaterThan(0);
      }
    });

    it("every record has a positive estimatedTimelineMonths", () => {
      for (const rule of rules) {
        expect(rule.estimatedTimelineMonths).toBeGreaterThan(0);
      }
    });

    it("every record has filingFeesMin <= filingFeesMax", () => {
      for (const rule of rules) {
        expect(rule.filingFeesMin).toBeLessThanOrEqual(rule.filingFeesMax);
      }
    });

    it("every record has a non-empty probateCourtWebsiteUrl starting with https", () => {
      for (const rule of rules) {
        expect(rule.probateCourtWebsiteUrl).toMatch(/^https:\/\//);
      }
    });

    it("every record has at least one required document", () => {
      for (const rule of rules) {
        expect(rule.requiredDocuments.length).toBeGreaterThan(0);
      }
    });

    it("every record has a non-empty sourceUrl starting with https", () => {
      for (const rule of rules) {
        expect(rule.sourceUrl).toMatch(/^https:\/\//);
      }
    });

    it("every record has a valid ISO 8601 lastVerifiedDate", () => {
      for (const rule of rules) {
        expect(rule.lastVerifiedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const parsed = new Date(rule.lastVerifiedDate);
        expect(parsed.toString()).not.toBe("Invalid Date");
      }
    });

    it("simplifiedProbateAvailable is a boolean for every record", () => {
      for (const rule of rules) {
        expect(typeof rule.simplifiedProbateAvailable).toBe("boolean");
      }
    });

    it("dataVerified is a boolean for every record", () => {
      for (const rule of rules) {
        expect(typeof rule.dataVerified).toBe("boolean");
      }
    });
  });

  describe("verified states", () => {
    it("at least 10 states are marked as verified", () => {
      const verified = STATE_PROBATE_RULES.filter((s) => s.dataVerified);
      expect(verified.length).toBeGreaterThanOrEqual(10);
    });

    it("all required top-10 states are verified", () => {
      for (const code of VERIFIED_STATE_CODES) {
        const rule = getStateProbateRule(code);
        expect(rule).toBeDefined();
        expect(rule!.dataVerified).toBe(true);
      }
    });
  });

  describe("known threshold values", () => {
    it("California threshold is $208,850 (effective Apr 2025)", () => {
      const ca = getStateProbateRule("CA");
      expect(ca?.smallEstateAffidavitLimit).toBe(208850);
    });

    it("Illinois threshold is $150,000 (raised Aug 2025)", () => {
      const il = getStateProbateRule("IL");
      expect(il?.smallEstateAffidavitLimit).toBe(150000);
    });

    it("Georgia threshold is $10,000 (lowest)", () => {
      const ga = getStateProbateRule("GA");
      expect(ga?.smallEstateAffidavitLimit).toBe(10000);
    });

    it("Michigan threshold is $53,000 (2026 CPI-adjusted)", () => {
      const mi = getStateProbateRule("MI");
      expect(mi?.smallEstateAffidavitLimit).toBe(53000);
    });

    it("Texas threshold is $75,000", () => {
      const tx = getStateProbateRule("TX");
      expect(tx?.smallEstateAffidavitLimit).toBe(75000);
    });

    it("Florida threshold is $75,000", () => {
      const fl = getStateProbateRule("FL");
      expect(fl?.smallEstateAffidavitLimit).toBe(75000);
    });

    it("New York threshold is $50,000", () => {
      const ny = getStateProbateRule("NY");
      expect(ny?.smallEstateAffidavitLimit).toBe(50000);
    });

    it("Oregon threshold is $275,000 (one of the highest)", () => {
      const or_ = getStateProbateRule("OR");
      expect(or_?.smallEstateAffidavitLimit).toBe(275000);
    });

    it("Wyoming threshold is $400,000 (raised July 2025)", () => {
      const wy = getStateProbateRule("WY");
      expect(wy?.smallEstateAffidavitLimit).toBe(400000);
    });

    it("Arizona personal property limit is $200,000 (HB2116 Sept 2025)", () => {
      const az = getStateProbateRule("AZ");
      expect(az?.smallEstateAffidavitLimit).toBe(200000);
    });

    it("South Carolina threshold is $45,000 (HB 3472 May 2025)", () => {
      const sc = getStateProbateRule("SC");
      expect(sc?.smallEstateAffidavitLimit).toBe(45000);
    });
  });

  describe("data integrity", () => {
    it("every standard document appears at least once across all states", () => {
      const standardDocs = [
        "Certified death certificate",
        "Original will (if exists)",
        "Petition for probate",
        "Government-issued photo ID",
        "Asset inventory",
      ];
      for (const doc of standardDocs) {
        const hasDoc = STATE_PROBATE_RULES.some((s) =>
          s.requiredDocuments.includes(doc),
        );
        expect(hasDoc).toBe(true);
      }
    });

    it("thresholds are within reasonable dollar ranges", () => {
      for (const rule of STATE_PROBATE_RULES) {
        expect(rule.probateThreshold).toBeGreaterThanOrEqual(5000);
        expect(rule.probateThreshold).toBeLessThanOrEqual(500000);
        expect(rule.smallEstateAffidavitLimit).toBeGreaterThanOrEqual(5000);
        expect(rule.smallEstateAffidavitLimit).toBeLessThanOrEqual(500000);
      }
    });

    it("filing fees are within reasonable dollar ranges", () => {
      for (const rule of STATE_PROBATE_RULES) {
        expect(rule.filingFeesMin).toBeGreaterThanOrEqual(0);
        expect(rule.filingFeesMin).toBeLessThanOrEqual(2000);
        expect(rule.filingFeesMax).toBeGreaterThanOrEqual(rule.filingFeesMin);
        expect(rule.filingFeesMax).toBeLessThanOrEqual(5000);
      }
    });

    it("filing deadlines are within reasonable ranges (1-365 days)", () => {
      for (const rule of STATE_PROBATE_RULES) {
        expect(rule.filingDeadlineDays).toBeGreaterThanOrEqual(1);
        expect(rule.filingDeadlineDays).toBeLessThanOrEqual(365);
      }
    });

    it("timeline estimates are within reasonable ranges (1-24 months)", () => {
      for (const rule of STATE_PROBATE_RULES) {
        expect(rule.estimatedTimelineMonths).toBeGreaterThanOrEqual(1);
        expect(rule.estimatedTimelineMonths).toBeLessThanOrEqual(24);
      }
    });
  });

  describe("lookup functions", () => {
    it("STATE_PROBATE_MAP has 51 entries", () => {
      expect(STATE_PROBATE_MAP.size).toBe(51);
    });

    it("getStateProbateRule returns correct state for valid code", () => {
      const ca = getStateProbateRule("CA");
      expect(ca).toBeDefined();
      expect(ca!.stateName).toBe("California");
    });

    it("getStateProbateRule is case-insensitive", () => {
      const ca = getStateProbateRule("ca");
      expect(ca).toBeDefined();
      expect(ca!.stateCode).toBe("CA");
    });

    it("getStateProbateRule returns undefined for invalid code", () => {
      expect(getStateProbateRule("XX")).toBeUndefined();
      expect(getStateProbateRule("")).toBeUndefined();
    });

    it("getVerifiedStates returns at least 10 states", () => {
      const verified = getVerifiedStates();
      expect(verified.length).toBeGreaterThanOrEqual(10);
      for (const v of verified) {
        expect(v.dataVerified).toBe(true);
      }
    });

    it("getStatesByThreshold returns states in ascending order", () => {
      const sorted = getStatesByThreshold();
      expect(sorted).toHaveLength(51);
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].smallEstateAffidavitLimit).toBeGreaterThanOrEqual(
          sorted[i - 1].smallEstateAffidavitLimit,
        );
      }
    });
  });

  describe("tiered threshold states", () => {
    it("Maryland has different affidavit ($50K) and simplified probate ($100K) thresholds", () => {
      const md = getStateProbateRule("MD");
      expect(md?.smallEstateAffidavitLimit).toBe(50000);
      expect(md?.probateThreshold).toBe(100000);
    });

    it("Nevada has different affidavit ($25K) and summary admin ($100K) thresholds", () => {
      const nv = getStateProbateRule("NV");
      expect(nv?.smallEstateAffidavitLimit).toBe(25000);
      expect(nv?.probateThreshold).toBe(100000);
    });

    it("North Carolina has different affidavit ($20K) and summary admin ($30K) thresholds", () => {
      const nc = getStateProbateRule("NC");
      expect(nc?.smallEstateAffidavitLimit).toBe(20000);
      expect(nc?.probateThreshold).toBe(30000);
    });

    it("Arizona has different personal ($200K) and real property ($300K) thresholds", () => {
      const az = getStateProbateRule("AZ");
      expect(az?.smallEstateAffidavitLimit).toBe(200000);
      expect(az?.probateThreshold).toBe(300000);
    });
  });
});

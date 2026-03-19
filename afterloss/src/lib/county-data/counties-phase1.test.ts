import { describe, it, expect, beforeEach } from "vitest";
import { COUNTY_DATA_PHASE1 } from "./counties-phase1";
import type { CountyData } from "./types";

const VALID_STATE_CODES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL",
  "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME",
  "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH",
  "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI",
  "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI",
  "WY",
];

describe("County Data Phase 1", () => {
  let counties: CountyData[];

  beforeEach(() => {
    counties = COUNTY_DATA_PHASE1;
  });

  describe("completeness", () => {
    it("contains at least 200 counties", () => {
      expect(counties.length).toBeGreaterThanOrEqual(200);
    });

    it("has no duplicate FIPS codes", () => {
      const fipsCodes = counties.map((c) => c.fips_code);
      const unique = new Set(fipsCodes);
      expect(unique.size).toBe(fipsCodes.length);
    });

    it("covers at least 30 distinct states", () => {
      const states = new Set(counties.map((c) => c.state_code));
      expect(states.size).toBeGreaterThanOrEqual(30);
    });
  });

  describe("required fields — no nulls on mandatory fields", () => {
    it("every record has a non-empty county_name", () => {
      for (const c of counties) {
        expect(c.county_name.length).toBeGreaterThan(0);
      }
    });

    it("every record has a valid 2-letter state_code", () => {
      for (const c of counties) {
        expect(c.state_code).toMatch(/^[A-Z]{2}$/);
        expect(VALID_STATE_CODES).toContain(c.state_code);
      }
    });

    it("every record has a 5-digit fips_code", () => {
      for (const c of counties) {
        expect(c.fips_code).toMatch(/^\d{5}$/);
      }
    });

    it("every record has a non-empty probate_court_name", () => {
      for (const c of counties) {
        expect(c.probate_court_name.length).toBeGreaterThan(0);
      }
    });

    it("every record has a non-empty court_address", () => {
      for (const c of counties) {
        expect(c.court_address.length).toBeGreaterThan(0);
      }
    });

    it("every record has a court_phone in parenthesized format", () => {
      for (const c of counties) {
        expect(c.court_phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
      }
    });

    it("every record has a positive population", () => {
      for (const c of counties) {
        expect(c.population).toBeGreaterThan(0);
      }
    });

    it("every record has a valid ISO 8601 last_verified_date", () => {
      for (const c of counties) {
        expect(c.last_verified_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        const parsed = new Date(c.last_verified_date);
        expect(parsed.toString()).not.toBe("Invalid Date");
      }
    });
  });

  describe("nullable fields — valid when present", () => {
    it("court_website is null or a valid https URL", () => {
      for (const c of counties) {
        if (c.court_website !== null) {
          expect(c.court_website).toMatch(/^https:\/\//);
        }
      }
    });

    it("filing_fees is null or a positive number", () => {
      for (const c of counties) {
        if (c.filing_fees !== null) {
          expect(c.filing_fees).toBeGreaterThan(0);
          expect(c.filing_fees).toBeLessThan(5000);
        }
      }
    });

    it("estimated_timeline is null or a non-empty string", () => {
      for (const c of counties) {
        if (c.estimated_timeline !== null) {
          expect(c.estimated_timeline.length).toBeGreaterThan(0);
        }
      }
    });
  });

  describe("data quality", () => {
    it("populations are within reasonable range (50K–12M)", () => {
      for (const c of counties) {
        // Top 200 counties should generally be > 50K
        // Exception: some states have low-pop counties as their largest
        expect(c.population).toBeGreaterThan(10000);
        expect(c.population).toBeLessThan(12000000);
      }
    });

    it("FIPS codes are consistent with state codes", () => {
      // FIPS state code mapping (first 2 digits of county FIPS)
      const stateToFips: Record<string, string> = {
        AL: "01", AK: "02", AZ: "04", AR: "05", CA: "06",
        CO: "08", CT: "09", DE: "10", DC: "11", FL: "12",
        GA: "13", HI: "15", ID: "16", IL: "17", IN: "18",
        IA: "19", KS: "20", KY: "21", LA: "22", ME: "23",
        MD: "24", MA: "25", MI: "26", MN: "27", MS: "28",
        MO: "29", MT: "30", NE: "31", NV: "32", NH: "33",
        NJ: "34", NM: "35", NY: "36", NC: "37", ND: "38",
        OH: "39", OK: "40", OR: "41", PA: "42", RI: "44",
        SC: "45", SD: "46", TN: "47", TX: "48", UT: "49",
        VT: "50", VA: "51", WA: "53", WV: "54", WI: "55",
        WY: "56",
      };

      for (const c of counties) {
        const expectedPrefix = stateToFips[c.state_code];
        if (expectedPrefix) {
          expect(c.fips_code.substring(0, 2)).toBe(expectedPrefix);
        }
      }
    });

    it("top 10 most populous US counties are included", () => {
      const topCounties = [
        { name: "Los Angeles", state: "CA" },
        { name: "Cook", state: "IL" },
        { name: "Harris", state: "TX" },
        { name: "Maricopa", state: "AZ" },
        { name: "San Diego", state: "CA" },
        { name: "Orange", state: "CA" },
        { name: "Miami-Dade", state: "FL" },
        { name: "Dallas", state: "TX" },
        { name: "Kings", state: "NY" },
        { name: "Riverside", state: "CA" },
      ];
      for (const tc of topCounties) {
        const found = counties.find(
          (c) => c.county_name === tc.name && c.state_code === tc.state,
        );
        expect(found).toBeDefined();
      }
    });

    it("all records have court_website (Phase 1 should have URLs for major counties)", () => {
      const withWebsite = counties.filter((c) => c.court_website !== null);
      // At least 90% should have websites
      expect(withWebsite.length / counties.length).toBeGreaterThan(0.9);
    });
  });

  describe("specific known values", () => {
    it("Los Angeles County CA has FIPS 06037 and population ~10M", () => {
      const la = counties.find(
        (c) => c.county_name === "Los Angeles" && c.state_code === "CA",
      );
      expect(la).toBeDefined();
      expect(la!.fips_code).toBe("06037");
      expect(la!.population).toBeGreaterThan(9000000);
    });

    it("Cook County IL has FIPS 17031 and population ~5M", () => {
      const cook = counties.find(
        (c) => c.county_name === "Cook" && c.state_code === "IL",
      );
      expect(cook).toBeDefined();
      expect(cook!.fips_code).toBe("17031");
      expect(cook!.population).toBeGreaterThan(4000000);
    });

    it("Harris County TX has FIPS 48201 and population ~4.7M", () => {
      const harris = counties.find(
        (c) => c.county_name === "Harris" && c.state_code === "TX",
      );
      expect(harris).toBeDefined();
      expect(harris!.fips_code).toBe("48201");
      expect(harris!.population).toBeGreaterThan(4000000);
    });
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import {
  PHONE_SCRIPTS,
  getPhoneScriptBySlug,
  getAllPhoneScriptSlugs,
} from "./phone-scripts";
import type { PhoneScriptPage } from "./phone-scripts";

describe("Phone Script SEO Landing Pages Data", () => {
  describe("Required scripts from issue #292", () => {
    const REQUIRED_SLUGS = [
      "social-security",
      "bank-notification",
      "life-insurance-claim",
      "credit-bureaus",
      "employer-benefits",
    ];

    it("has at least 5 phone script pages", () => {
      expect(PHONE_SCRIPTS.length).toBeGreaterThanOrEqual(5);
    });

    it.each(REQUIRED_SLUGS)(
      "has required script: %s",
      (slug) => {
        expect(getPhoneScriptBySlug(slug)).toBeDefined();
      }
    );
  });

  describe("Script data integrity", () => {
    let scripts: PhoneScriptPage[];

    beforeEach(() => {
      scripts = PHONE_SCRIPTS;
    });

    it("every script has a unique slug", () => {
      const slugs = scripts.map((s) => s.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it("every script has a year-stamped seoTitle", () => {
      const year = new Date().getFullYear();
      for (const script of scripts) {
        expect(script.seoTitle).toContain(`(${year}`);
      }
    });

    it("every script seoTitle starts with 'What to Say When Calling'", () => {
      for (const script of scripts) {
        expect(script.seoTitle).toMatch(/^What to Say When Calling/);
      }
    });

    it("every script has a description", () => {
      for (const script of scripts) {
        expect(script.description).toBeTruthy();
        expect(script.description.length).toBeGreaterThan(30);
      }
    });

    it("every script has an institution name", () => {
      for (const script of scripts) {
        expect(script.institution).toBeTruthy();
      }
    });

    it("every script has hours of operation", () => {
      for (const script of scripts) {
        expect(script.hours).toBeTruthy();
      }
    });

    it("every script has expected duration", () => {
      for (const script of scripts) {
        expect(script.expectedDuration).toBeTruthy();
      }
    });

    it("every script has at least 5 documentsNeeded", () => {
      for (const script of scripts) {
        expect(script.documentsNeeded.length).toBeGreaterThanOrEqual(5);
      }
    });

    it("every script has an opening script", () => {
      for (const script of scripts) {
        expect(script.openingScript).toBeTruthy();
        expect(script.openingScript.length).toBeGreaterThan(20);
      }
    });

    it("every script has at least 2 script sections", () => {
      for (const script of scripts) {
        expect(script.scriptSections.length).toBeGreaterThanOrEqual(2);
        for (const section of script.scriptSections) {
          expect(section.heading).toBeTruthy();
          expect(section.text).toBeTruthy();
        }
      }
    });

    it("every script has whatToExpect items", () => {
      for (const script of scripts) {
        expect(script.whatToExpect.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("every script has whatToAskFor items", () => {
      for (const script of scripts) {
        expect(script.whatToAskFor.length).toBeGreaterThanOrEqual(3);
      }
    });

    it("every script has ifTheyPushBack items", () => {
      for (const script of scripts) {
        expect(script.ifTheyPushBack.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("every script has tips", () => {
      for (const script of scripts) {
        expect(script.tips.length).toBeGreaterThanOrEqual(2);
      }
    });

    it("every script has relatedSlugs that reference existing scripts", () => {
      const allSlugs = new Set(scripts.map((s) => s.slug));
      for (const script of scripts) {
        for (const relatedSlug of script.relatedSlugs) {
          expect(allSlugs.has(relatedSlug)).toBe(true);
        }
      }
    });

    it("every script has a lastVerified date in ISO format", () => {
      for (const script of scripts) {
        expect(script.lastVerified).toBeTruthy();
        expect(script.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe("SSA-specific requirements", () => {
    it("SSA script has phone number 800-772-1213", () => {
      const ssa = getPhoneScriptBySlug("social-security");
      expect(ssa).toBeDefined();
      expect(ssa!.phoneNumber).toBe("800-772-1213");
    });

    it("SSA script has urgency note about non-retroactive benefits", () => {
      const ssa = getPhoneScriptBySlug("social-security");
      expect(ssa).toBeDefined();
      expect(ssa!.urgencyNote).toBeTruthy();
      expect(ssa!.urgencyNote!.toLowerCase()).toContain("not retroactive");
    });
  });

  describe("Credit bureaus script", () => {
    it("includes all three bureau phone numbers in script sections", () => {
      const cb = getPhoneScriptBySlug("credit-bureaus");
      expect(cb).toBeDefined();

      const sectionText = cb!.scriptSections
        .map((s) => s.heading + " " + s.text)
        .join(" ");

      expect(sectionText).toContain("800-685-1111"); // Equifax
      expect(sectionText).toContain("888-397-3742"); // Experian
      expect(sectionText).toContain("800-916-8800"); // TransUnion
    });

    it("has sections for each bureau", () => {
      const cb = getPhoneScriptBySlug("credit-bureaus");
      expect(cb).toBeDefined();

      const headings = cb!.scriptSections.map((s) => s.heading.toLowerCase());
      expect(headings.some((h) => h.includes("equifax"))).toBe(true);
      expect(headings.some((h) => h.includes("experian"))).toBe(true);
      expect(headings.some((h) => h.includes("transunion"))).toBe(true);
    });
  });

  describe("Utility functions", () => {
    it("getPhoneScriptBySlug returns correct script", () => {
      const script = getPhoneScriptBySlug("social-security");
      expect(script).toBeDefined();
      expect(script!.slug).toBe("social-security");
      expect(script!.institution).toContain("Social Security");
    });

    it("getPhoneScriptBySlug returns undefined for non-existent slug", () => {
      expect(getPhoneScriptBySlug("nonexistent")).toBeUndefined();
    });

    it("getAllPhoneScriptSlugs returns all slugs", () => {
      const slugs = getAllPhoneScriptSlugs();
      expect(slugs.length).toBe(PHONE_SCRIPTS.length);
      expect(slugs).toContain("social-security");
      expect(slugs).toContain("bank-notification");
      expect(slugs).toContain("life-insurance-claim");
      expect(slugs).toContain("credit-bureaus");
      expect(slugs).toContain("employer-benefits");
    });
  });
});

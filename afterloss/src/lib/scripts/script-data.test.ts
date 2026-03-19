import { describe, it, expect, beforeEach } from "vitest";
import {
  SCRIPTS,
  CATEGORIES,
  getScriptsByCategory,
  getScriptById,
  getCategoryBySlug,
  getAllCategories,
} from "./script-data";
import type { PhoneScript, ScriptCategory } from "./script-data";

describe("Phone Scripts Data", () => {
  describe("Script count", () => {
    it("has at least 15 scripts", () => {
      expect(SCRIPTS.length).toBeGreaterThanOrEqual(15);
    });

    it("has scripts in all defined categories", () => {
      const categoriesWithScripts = getAllCategories();
      for (const cat of CATEGORIES) {
        expect(categoriesWithScripts).toContain(cat.slug);
      }
    });
  });

  describe("Script data integrity", () => {
    let scripts: PhoneScript[];

    beforeEach(() => {
      scripts = SCRIPTS;
    });

    it("every script has a unique id", () => {
      const ids = scripts.map((s) => s.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("every script has a valid category", () => {
      const validCategories = CATEGORIES.map((c) => c.slug);
      for (const script of scripts) {
        expect(validCategories).toContain(script.category);
      }
    });

    it("every script has an opening_statement", () => {
      for (const script of scripts) {
        expect(script.openingStatement).toBeTruthy();
        expect(script.openingStatement.length).toBeGreaterThan(20);
      }
    });

    it("every script has at least 2 key_phrases", () => {
      for (const script of scripts) {
        expect(script.keyPhrases.length).toBeGreaterThanOrEqual(2);
        for (const phrase of script.keyPhrases) {
          expect(phrase).toBeTruthy();
        }
      }
    });

    it("every script has information_needed", () => {
      for (const script of scripts) {
        expect(script.informationNeeded.length).toBeGreaterThanOrEqual(2);
        for (const item of script.informationNeeded) {
          expect(item).toBeTruthy();
        }
      }
    });

    it("every script has what_to_ask_for", () => {
      for (const script of scripts) {
        expect(script.whatToAskFor.length).toBeGreaterThanOrEqual(2);
        for (const item of script.whatToAskFor) {
          expect(item).toBeTruthy();
        }
      }
    });

    it("every script has if_they_say_no escalation language", () => {
      for (const script of scripts) {
        expect(script.ifTheySayNo.length).toBeGreaterThanOrEqual(1);
        for (const item of script.ifTheySayNo) {
          expect(item).toBeTruthy();
        }
      }
    });

    it("every script has a title and shortDescription", () => {
      for (const script of scripts) {
        expect(script.title).toBeTruthy();
        expect(script.title.length).toBeGreaterThan(5);
        expect(script.shortDescription).toBeTruthy();
        expect(script.shortDescription.length).toBeGreaterThan(10);
      }
    });

    it("every script has a lastVerified date", () => {
      for (const script of scripts) {
        expect(script.lastVerified).toBeTruthy();
        expect(script.lastVerified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });

    it("SSA script has phone number 800-772-1213", () => {
      const ssa = getScriptById("ssa-death-notification");
      expect(ssa).toBeDefined();
      expect(ssa!.phoneNumber).toBe("800-772-1213");
    });

    it("credit bureau scripts have correct phone numbers", () => {
      const equifax = getScriptById("credit-bureau-equifax");
      const experian = getScriptById("credit-bureau-experian");
      const transunion = getScriptById("credit-bureau-transunion");

      expect(equifax?.phoneNumber).toBe("800-685-1111");
      expect(experian?.phoneNumber).toBe("888-397-3742");
      expect(transunion?.phoneNumber).toBe("800-916-8800");
    });
  });

  describe("Category data", () => {
    it("has all required categories", () => {
      const expectedCategories: ScriptCategory[] = [
        "government",
        "financial",
        "insurance",
        "subscriptions",
        "employment",
      ];
      for (const cat of expectedCategories) {
        expect(getCategoryBySlug(cat)).toBeDefined();
      }
    });

    it("each category has name, description, and icon", () => {
      for (const cat of CATEGORIES) {
        expect(cat.name).toBeTruthy();
        expect(cat.description).toBeTruthy();
        expect(cat.icon).toBeTruthy();
      }
    });
  });

  describe("Utility functions", () => {
    it("getScriptsByCategory returns correct scripts", () => {
      const govScripts = getScriptsByCategory("government");
      expect(govScripts.length).toBeGreaterThan(0);
      for (const script of govScripts) {
        expect(script.category).toBe("government");
      }
    });

    it("getScriptById returns the correct script", () => {
      const script = getScriptById("ssa-death-notification");
      expect(script).toBeDefined();
      expect(script!.id).toBe("ssa-death-notification");
      expect(script!.title).toContain("Social Security");
    });

    it("getScriptById returns undefined for non-existent id", () => {
      const script = getScriptById("nonexistent-script");
      expect(script).toBeUndefined();
    });

    it("getCategoryBySlug returns correct category", () => {
      const cat = getCategoryBySlug("financial");
      expect(cat).toBeDefined();
      expect(cat!.name).toBe("Financial");
    });

    it("getCategoryBySlug returns undefined for non-existent slug", () => {
      const cat = getCategoryBySlug("nonexistent");
      expect(cat).toBeUndefined();
    });

    it("getAllCategories returns unique categories from scripts", () => {
      const categories = getAllCategories();
      const uniqueCategories = new Set(categories);
      expect(uniqueCategories.size).toBe(categories.length);
    });
  });

  describe("Required scenarios from issue #265", () => {
    it("has SSA death notification script", () => {
      expect(getScriptById("ssa-death-notification")).toBeDefined();
    });

    it("has bank account closure script", () => {
      expect(getScriptById("bank-account-closure")).toBeDefined();
    });

    it("has life insurance claim script", () => {
      expect(getScriptById("life-insurance-claim")).toBeDefined();
    });

    it("has health insurance notification script", () => {
      expect(getScriptById("health-insurance-notification")).toBeDefined();
    });

    it("has auto insurance notification script", () => {
      expect(getScriptById("auto-insurance-notification")).toBeDefined();
    });

    it("has homeowners insurance notification script", () => {
      expect(getScriptById("homeowners-insurance-notification")).toBeDefined();
    });

    it("has subscription cancellation script", () => {
      expect(getScriptById("streaming-service-cancellation")).toBeDefined();
    });

    it("has employer benefits script", () => {
      expect(getScriptById("employer-benefits-inquiry")).toBeDefined();
    });

    it("has mortgage servicer notification script", () => {
      expect(getScriptById("mortgage-servicer-notification")).toBeDefined();
    });

    it("has credit bureau deceased alert scripts for all 3 bureaus", () => {
      expect(getScriptById("credit-bureau-equifax")).toBeDefined();
      expect(getScriptById("credit-bureau-experian")).toBeDefined();
      expect(getScriptById("credit-bureau-transunion")).toBeDefined();
    });

    it("has DMV title transfer script", () => {
      expect(getScriptById("dmv-title-transfer")).toBeDefined();
    });

    it("has pension/retirement notification script", () => {
      expect(getScriptById("pension-retirement-notification")).toBeDefined();
    });

    it("has utility account transfer script", () => {
      expect(getScriptById("utility-account-transfer")).toBeDefined();
    });

    it("has gym/membership cancellation script", () => {
      expect(getScriptById("gym-membership-cancellation")).toBeDefined();
    });
  });
});

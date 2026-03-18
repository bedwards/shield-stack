import { describe, it, expect, beforeEach } from "vitest";
import {
  welcomeEmail,
  weekOneEmail,
  weekFourEmail,
  weekTwelveEmail,
  getTemplateForStep,
  TOTAL_DRIP_STEPS,
  DRIP_DELAYS_MS,
} from "./email-templates";
import type { EmailTemplateParams } from "./email-templates";

const BASE_PARAMS: EmailTemplateParams = {
  recoveryPath: "ibr_enrollment",
  siteUrl: "https://scorerebound.com",
  unsubscribeUrl: "https://scorerebound.com/api/email/unsubscribe?token=test-token",
  planUrl: "https://scorerebound.com/plan/test-plan-id",
};

describe("Email Templates", () => {
  describe("welcomeEmail", () => {
    let template: { subject: string; html: string };

    beforeEach(() => {
      template = welcomeEmail(BASE_PARAMS);
    });

    it("returns a subject line", () => {
      expect(template.subject).toBeTruthy();
      expect(template.subject).toContain("ScoreRebound");
    });

    it("includes recovery path label in body", () => {
      expect(template.html).toContain("Income-Based Repayment (IBR)");
    });

    it("includes plan link when provided", () => {
      expect(template.html).toContain(BASE_PARAMS.planUrl);
    });

    it("includes unsubscribe link", () => {
      expect(template.html).toContain(BASE_PARAMS.unsubscribeUrl);
      expect(template.html).toContain("Unsubscribe");
    });

    it("includes drip schedule preview", () => {
      expect(template.html).toContain("Week 1");
      expect(template.html).toContain("Week 4");
      expect(template.html).toContain("Week 12");
    });

    it("includes affiliate CTAs with tracking URLs", () => {
      expect(template.html).toContain("Credit Karma");
      expect(template.html).toContain("Self Credit Builder");
      expect(template.html).toContain("/api/affiliate/click?slug=credit_karma&referrer=email-welcome");
      expect(template.html).toContain("/api/affiliate/click?slug=self&referrer=email-welcome");
    });

    it("does not contain hardcoded affiliate base URLs", () => {
      expect(template.html).not.toContain("https://www.creditkarma.com");
      expect(template.html).not.toContain("https://www.self.inc");
    });

    it("omits plan link when not provided", () => {
      const noLink = welcomeEmail({ ...BASE_PARAMS, planUrl: undefined });
      expect(noLink.html).not.toContain("View Your Full Recovery Plan");
    });

    it("handles null recovery path", () => {
      const nullPath = welcomeEmail({ ...BASE_PARAMS, recoveryPath: null });
      expect(nullPath.html).toContain("Credit Score Recovery");
    });
  });

  describe("weekOneEmail", () => {
    it("includes IBR guide for ibr_enrollment path", () => {
      const template = weekOneEmail({ ...BASE_PARAMS, recoveryPath: "ibr_enrollment" });
      expect(template.html).toContain("Income-Driven Repayment");
      expect(template.html).toContain("studentaid.gov");
    });

    it("includes rehabilitation guide for rehabilitation path", () => {
      const template = weekOneEmail({ ...BASE_PARAMS, recoveryPath: "rehabilitation" });
      expect(template.html).toContain("Rehabilitation");
      expect(template.html).toContain("9 voluntary, on-time payments");
    });

    it("includes consolidation guide for consolidation path", () => {
      const template = weekOneEmail({ ...BASE_PARAMS, recoveryPath: "consolidation" });
      expect(template.html).toContain("Consolidation");
      expect(template.html).toContain("30-60 days");
    });

    it("includes credit building guide for credit_building path", () => {
      const template = weekOneEmail({ ...BASE_PARAMS, recoveryPath: "credit_building" });
      expect(template.html).toContain("secured credit card");
      expect(template.html).toContain("AnnualCreditReport.com");
    });

    it("includes credit builder affiliate CTAs with tracking URLs", () => {
      const template = weekOneEmail(BASE_PARAMS);
      expect(template.html).toContain("Self Credit Builder");
      expect(template.html).toContain("MoneyLion");
      expect(template.html).toContain("Chime");
      expect(template.html).toContain("/api/affiliate/click?slug=self&referrer=email-week-1");
      expect(template.html).toContain("/api/affiliate/click?slug=moneylion&referrer=email-week-1");
      expect(template.html).toContain("/api/affiliate/click?slug=chime&referrer=email-week-1");
    });

    it("does not contain hardcoded affiliate base URLs", () => {
      const template = weekOneEmail(BASE_PARAMS);
      expect(template.html).not.toContain("https://www.self.inc");
      expect(template.html).not.toContain("https://www.moneylion.com");
      expect(template.html).not.toContain("https://www.chime.com");
    });

    it("includes unsubscribe link", () => {
      const template = weekOneEmail(BASE_PARAMS);
      expect(template.html).toContain(BASE_PARAMS.unsubscribeUrl);
    });
  });

  describe("weekFourEmail", () => {
    it("includes progress checklist", () => {
      const template = weekFourEmail(BASE_PARAMS);
      expect(template.html).toContain("Progress Checklist");
      expect(template.html).toContain("autopay");
    });

    it("includes credit monitoring affiliate CTAs with tracking URLs", () => {
      const template = weekFourEmail(BASE_PARAMS);
      expect(template.html).toContain("Credit Karma");
      expect(template.html).toContain("Experian");
      expect(template.html).toContain("CreditWise");
      expect(template.html).toContain("/api/affiliate/click?slug=credit_karma&referrer=email-week-4");
      expect(template.html).toContain("/api/affiliate/click?slug=experian&referrer=email-week-4");
      expect(template.html).toContain("/api/affiliate/click?slug=capital_one_creditwise&referrer=email-week-4");
    });

    it("does not contain hardcoded affiliate base URLs", () => {
      const template = weekFourEmail(BASE_PARAMS);
      expect(template.html).not.toContain("https://www.creditkarma.com");
      expect(template.html).not.toContain("https://www.experian.com");
      expect(template.html).not.toContain("https://www.capitalone.com");
    });

    it("includes plan link when provided", () => {
      const template = weekFourEmail(BASE_PARAMS);
      expect(template.html).toContain(BASE_PARAMS.planUrl);
    });

    it("includes unsubscribe link", () => {
      const template = weekFourEmail(BASE_PARAMS);
      expect(template.html).toContain(BASE_PARAMS.unsubscribeUrl);
    });
  });

  describe("weekTwelveEmail", () => {
    it("includes refinancing readiness signs", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).toContain("Ready to Refinance");
      expect(template.html).toContain("credit score has improved");
    });

    it("includes federal loan refinancing warning", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).toContain("losing access to federal");
    });

    it("includes refinancing affiliate CTAs with tracking URLs", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).toContain("SoFi");
      expect(template.html).toContain("Earnest");
      expect(template.html).toContain("Splash");
      expect(template.html).toContain("/api/affiliate/click?slug=sofi_refi&referrer=email-week-12");
      expect(template.html).toContain("/api/affiliate/click?slug=earnest&referrer=email-week-12");
      expect(template.html).toContain("/api/affiliate/click?slug=splash&referrer=email-week-12");
    });

    it("does not contain hardcoded affiliate base URLs", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).not.toContain("https://www.sofi.com");
      expect(template.html).not.toContain("https://www.earnest.com");
      expect(template.html).not.toContain("https://www.splashfinancial.com");
    });

    it("includes recovery continuation tips", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).toContain("utilization below 30%");
    });

    it("includes unsubscribe link", () => {
      const template = weekTwelveEmail(BASE_PARAMS);
      expect(template.html).toContain(BASE_PARAMS.unsubscribeUrl);
    });
  });

  describe("getTemplateForStep", () => {
    it("returns welcome email for step 0", () => {
      const template = getTemplateForStep(0, BASE_PARAMS);
      expect(template).not.toBeNull();
      expect(template!.subject).toContain("ScoreRebound");
    });

    it("returns week 1 email for step 1", () => {
      const template = getTemplateForStep(1, BASE_PARAMS);
      expect(template).not.toBeNull();
      expect(template!.subject).toContain("Week 1");
    });

    it("returns week 4 email for step 2", () => {
      const template = getTemplateForStep(2, BASE_PARAMS);
      expect(template).not.toBeNull();
      expect(template!.subject).toContain("Week 4");
    });

    it("returns week 12 email for step 3", () => {
      const template = getTemplateForStep(3, BASE_PARAMS);
      expect(template).not.toBeNull();
      expect(template!.subject).toContain("Week 12");
    });

    it("returns null for step beyond total", () => {
      const template = getTemplateForStep(4, BASE_PARAMS);
      expect(template).toBeNull();
    });

    it("returns null for negative step", () => {
      const template = getTemplateForStep(-1, BASE_PARAMS);
      expect(template).toBeNull();
    });
  });

  describe("constants", () => {
    it("TOTAL_DRIP_STEPS is 4 (welcome + 3 drip emails)", () => {
      expect(TOTAL_DRIP_STEPS).toBe(4);
    });

    it("DRIP_DELAYS_MS has correct intervals", () => {
      // After welcome: 7 days
      expect(DRIP_DELAYS_MS[0]).toBe(7 * 24 * 60 * 60 * 1000);
      // After week 1: 21 days
      expect(DRIP_DELAYS_MS[1]).toBe(21 * 24 * 60 * 60 * 1000);
      // After week 4: 56 days
      expect(DRIP_DELAYS_MS[2]).toBe(56 * 24 * 60 * 60 * 1000);
    });
  });

  describe("all templates produce valid HTML", () => {
    const templateFns = [welcomeEmail, weekOneEmail, weekFourEmail, weekTwelveEmail];

    templateFns.forEach((fn, i) => {
      it(`template ${i} starts with DOCTYPE and ends with </html>`, () => {
        const template = fn(BASE_PARAMS);
        expect(template.html).toMatch(/^<!DOCTYPE html>/);
        expect(template.html).toMatch(/<\/html>\s*$/);
      });

      it(`template ${i} has proper email structure`, () => {
        const template = fn(BASE_PARAMS);
        expect(template.html).toContain("<body");
        expect(template.html).toContain("ScoreRebound");
        expect(template.html).toContain("Unsubscribe");
      });
    });
  });
});

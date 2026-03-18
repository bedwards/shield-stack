import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import LifeInsuranceAfterLossPage from "./page";

describe("Life Insurance After Loss Page", () => {
  beforeEach(() => {
    render(<LifeInsuranceAfterLossPage />);
  });

  it("renders the page container", () => {
    expect(screen.getByTestId("life-insurance-page")).toBeInTheDocument();
  });

  it("renders the hero section with correct title", () => {
    const hero = screen.getByTestId("life-insurance-hero");
    expect(hero).toBeInTheDocument();
    const title = screen.getByTestId("page-title");
    expect(title.textContent).toContain("Life Insurance After Losing a Loved One");
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle", () => {
    expect(screen.getByTestId("page-subtitle")).toBeInTheDocument();
  });

  it("renders the last verified date", () => {
    const lastVerified = screen.getByTestId("last-verified");
    expect(lastVerified).toBeInTheDocument();
    expect(lastVerified.textContent).toContain("March 2026");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-nav")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-resources")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-current")).toBeInTheDocument();
  });

  it("renders why consider life insurance section", () => {
    expect(screen.getByTestId("why-section")).toBeInTheDocument();
  });

  it("renders types of life insurance section with term vs whole comparison", () => {
    expect(screen.getByTestId("types-section")).toBeInTheDocument();
    expect(screen.getByTestId("term-vs-whole-section")).toBeInTheDocument();
  });

  it("renders coverage section with calculator", () => {
    expect(screen.getByTestId("coverage-section")).toBeInTheDocument();
    expect(screen.getByTestId("coverage-calculator")).toBeInTheDocument();
  });

  it("renders employer life insurance and COBRA section", () => {
    expect(screen.getByTestId("employer-section")).toBeInTheDocument();
  });

  it("renders how to apply section", () => {
    expect(screen.getByTestId("how-to-apply-section")).toBeInTheDocument();
  });

  it("renders cost factors section", () => {
    expect(screen.getByTestId("cost-section")).toBeInTheDocument();
  });

  it("renders Policygenius affiliate CTA with disclosure", () => {
    const cta = screen.getByTestId("policygenius-cta");
    expect(cta).toBeInTheDocument();
    expect(cta.textContent).toContain(
      "AfterLoss may earn a commission at no cost to you"
    );
  });

  it("renders Policygenius affiliate link with correct attributes", () => {
    const link = screen.getByTestId("policygenius-affiliate-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-affiliate", "policygenius");
    expect(link).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders FAQ section with 6 questions", () => {
    const faqSection = screen.getByTestId("faq-section");
    expect(faqSection).toBeInTheDocument();
    const questions = faqSection.querySelectorAll("h3");
    expect(questions.length).toBe(6);
  });

  it("renders JSON-LD FAQPage schema", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThan(0);
    const schema = JSON.parse(scripts[0].textContent || "{}");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity.length).toBeGreaterThanOrEqual(5);
  });

  it("renders related resources with internal links", () => {
    expect(screen.getByTestId("related-resources")).toBeInTheDocument();
    expect(screen.getByTestId("link-checklist")).toHaveAttribute("href", "/guide");
    expect(screen.getByTestId("link-identity-protection")).toHaveAttribute(
      "href",
      "/guides/protect-identity-after-death-2026"
    );
    expect(screen.getByTestId("link-state-guides")).toHaveAttribute("href", "/states");
  });

  it("renders bottom CTA section with link to full guide", () => {
    expect(screen.getByTestId("page-cta-section")).toBeInTheDocument();
    const ctaButton = screen.getByTestId("page-cta-button");
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/guide");
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProtectIdentityAfterDeathGuide from "./page";

describe("Protect Identity After Death Guide", () => {
  beforeEach(() => {
    render(<ProtectIdentityAfterDeathGuide />);
  });

  it("renders the guide page container", () => {
    expect(screen.getByTestId("identity-protection-guide")).toBeInTheDocument();
  });

  it("renders the guide title with correct text", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain(
      "How to Protect a Deceased Person"
    );
    expect(title.textContent).toContain("Identity from Theft");
  });

  it("renders the subtitle", () => {
    expect(screen.getByTestId("guide-subtitle")).toBeInTheDocument();
  });

  it("renders the last verified date", () => {
    const lastVerified = screen.getByTestId("last-verified");
    expect(lastVerified).toBeInTheDocument();
    expect(lastVerified.textContent).toContain("March 2026");
  });

  it("renders the key statistic about 2.5 million deceased", () => {
    const callout = screen.getByTestId("stat-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain("2.5 million deceased Americans");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-nav")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-current")).toBeInTheDocument();
  });

  it("renders all 5 step sections", () => {
    expect(screen.getByTestId("step-1-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-2-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-3-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-4-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-5-section")).toBeInTheDocument();
  });

  it("renders SSA phone number link", () => {
    const link = screen.getByTestId("ssa-phone-link");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain("800-772-1213");
  });

  it("renders credit bureau phone links", () => {
    expect(screen.getByTestId("equifax-phone-link")).toBeInTheDocument();
    expect(screen.getByTestId("experian-phone-link")).toBeInTheDocument();
    expect(screen.getByTestId("transunion-phone-link")).toBeInTheDocument();
  });

  it("renders the IRS form link", () => {
    const link = screen.getByTestId("irs-form-link");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain("IRS Form 14039");
  });

  it("renders the FTC identity theft link", () => {
    expect(screen.getByTestId("ftc-link")).toBeInTheDocument();
  });

  it("renders the Aura affiliate section with disclosure", () => {
    const section = screen.getByTestId("aura-affiliate-section");
    expect(section).toBeInTheDocument();
    expect(section.textContent).toContain(
      "AfterLoss may earn a commission at no cost to you"
    );
  });

  it("renders the Aura affiliate link with correct attributes", () => {
    const link = screen.getByTestId("aura-affiliate-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("data-affiliate", "aura");
    expect(link).toHaveAttribute("rel", "noopener noreferrer sponsored");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders the comparison table", () => {
    expect(screen.getByTestId("comparison-table")).toBeInTheDocument();
  });

  it("renders the printable checklist section", () => {
    expect(screen.getByTestId("printable-checklist-section")).toBeInTheDocument();
  });

  it("renders the bottom CTA section with link to full guide", () => {
    expect(screen.getByTestId("guide-cta-section")).toBeInTheDocument();
    const ctaButton = screen.getByTestId("guide-cta-button");
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute("href", "/guide");
  });

  it("renders JSON-LD HowTo schema", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThan(0);
    const schema = JSON.parse(scripts[0].textContent || "{}");
    expect(schema["@type"]).toBe("HowTo");
    expect(schema.step).toHaveLength(5);
  });
});

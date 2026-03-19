import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import WhatToDoWhenSomeoneDiesChecklistGuide from "./page";

describe("What to Do When Someone Dies Checklist Guide", () => {
  beforeEach(() => {
    render(<WhatToDoWhenSomeoneDiesChecklistGuide />);
  });

  it("renders the guide page container", () => {
    expect(screen.getByTestId("what-to-do-guide")).toBeInTheDocument();
  });

  it("renders the guide title with 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain(
      "What to Do When Someone Dies"
    );
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle", () => {
    expect(screen.getByTestId("guide-subtitle")).toBeInTheDocument();
  });

  it("renders the last verified date", () => {
    const lastVerified = screen.getByTestId("last-verified");
    expect(lastVerified).toBeInTheDocument();
    expect(lastVerified.textContent).toContain("March 2026");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-nav")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-current")).toBeInTheDocument();
  });

  it("renders the stat callout", () => {
    const callout = screen.getByTestId("stat-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain("over 75 individual tasks");
  });

  it("renders the table of contents", () => {
    expect(screen.getByTestId("guide-toc")).toBeInTheDocument();
    expect(screen.getByTestId("toc-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("toc-item-5")).toBeInTheDocument();
  });

  it("renders all 5 timeline periods", () => {
    expect(screen.getByTestId("timeline-first-24-hours")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-week")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-month")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-3-months")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-year")).toBeInTheDocument();
  });

  it("renders the phone scripts differentiator callout", () => {
    const callout = screen.getByTestId("phone-scripts-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain("word-for-word scripts");
  });

  it("renders the AI document generation callout", () => {
    const callout = screen.getByTestId("ai-docs-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain(
      "generate every letter and form"
    );
  });

  it("renders the states CTA with link to /states", () => {
    const cta = screen.getByTestId("states-cta");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/states");
  });

  it("renders internal CTA links to /onboard", () => {
    const tocCta = screen.getByTestId("toc-cta");
    expect(tocCta).toHaveAttribute("href", "/onboard");

    const guideCta = screen.getByTestId("guide-cta-button");
    expect(guideCta).toHaveAttribute("href", "/onboard");
  });

  it("renders SSA phone link", () => {
    const link = screen.getByTestId("ssa-phone-link");
    expect(link).toBeInTheDocument();
    expect(link.textContent).toContain("800-772-1213");
  });

  it("renders FAQ section with 12 items", () => {
    expect(screen.getByTestId("guide-faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-heading")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-item-11")).toBeInTheDocument();
  });

  it("renders the bottom CTA section", () => {
    expect(screen.getByTestId("guide-cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("guide-cta-heading")).toBeInTheDocument();
  });

  it("renders JSON-LD FAQPage and HowTo schemas", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const schemas = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "{}")
    );
    const faqSchema = schemas.find((s) => s["@type"] === "FAQPage");
    const howToSchema = schemas.find((s) => s["@type"] === "HowTo");

    expect(faqSchema).toBeDefined();
    expect(faqSchema!.mainEntity.length).toBe(12);

    expect(howToSchema).toBeDefined();
    expect(howToSchema!.step).toHaveLength(5);
  });

  it("renders the grief counseling link", () => {
    const link = screen.getByTestId("grief-counseling-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/resources/grief-counseling");
  });

  it("renders the identity protection guide link", () => {
    const link = screen.getByTestId("identity-guide-link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      "/guides/protect-identity-after-death-2026"
    );
  });
});

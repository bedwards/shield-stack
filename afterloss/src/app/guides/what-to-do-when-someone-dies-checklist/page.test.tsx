import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import WhatToDoWhenSomeoneDiesGuide from "./page";

describe("What to Do When Someone Dies Guide", () => {
  beforeEach(() => {
    render(<WhatToDoWhenSomeoneDiesGuide />);
  });

  it("renders the guide page container", () => {
    expect(screen.getByTestId("what-to-do-guide")).toBeInTheDocument();
  });

  it("renders the guide hero with title containing 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain(
      "What to Do When Someone Dies"
    );
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle with empathetic tone", () => {
    const subtitle = screen.getByTestId("guide-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("step-by-step guide");
  });

  it("renders the last-updated date", () => {
    const updated = screen.getByTestId("last-updated");
    expect(updated).toBeInTheDocument();
    expect(updated.textContent).toContain("March 2026");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-nav")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-guides")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-current")).toBeInTheDocument();
  });

  it("renders the intro callout with empathetic message", () => {
    const callout = screen.getByTestId("guide-intro-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain("sorry");
    expect(callout.textContent).toContain("Take your time");
  });

  it("renders the table of contents with all sections", () => {
    expect(screen.getByTestId("table-of-contents")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-first-24-hours")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-first-week")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-first-month")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-first-3-months")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-first-year")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-comparison")).toBeInTheDocument();
    expect(screen.getByTestId("toc-link-faq")).toBeInTheDocument();
  });

  it("renders all 5 timeline sections", () => {
    expect(screen.getByTestId("timeline-first-24-hours")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-week")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-month")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-3-months")).toBeInTheDocument();
    expect(screen.getByTestId("timeline-first-year")).toBeInTheDocument();
  });

  it("renders timeline badges for each section", () => {
    expect(screen.getByTestId("timeline-badge-first-24-hours")).toHaveTextContent(
      "First 24 Hours"
    );
    expect(screen.getByTestId("timeline-badge-first-week")).toHaveTextContent(
      "First Week"
    );
    expect(screen.getByTestId("timeline-badge-first-month")).toHaveTextContent(
      "First Month"
    );
    expect(screen.getByTestId("timeline-badge-first-3-months")).toHaveTextContent(
      "First 3 Months"
    );
    expect(screen.getByTestId("timeline-badge-first-year")).toHaveTextContent(
      "First Year"
    );
  });

  it("renders tasks within timeline sections", () => {
    // First 24 hours has 5 tasks
    expect(screen.getByTestId("task-first-24-hours-0")).toBeInTheDocument();
    expect(screen.getByTestId("task-first-24-hours-4")).toBeInTheDocument();
    // First week has 5 tasks
    expect(screen.getByTestId("task-first-week-0")).toBeInTheDocument();
    expect(screen.getByTestId("task-first-week-4")).toBeInTheDocument();
    // First month has 5 tasks
    expect(screen.getByTestId("task-first-month-0")).toBeInTheDocument();
    expect(screen.getByTestId("task-first-month-4")).toBeInTheDocument();
    // First 3 months has 4 tasks
    expect(screen.getByTestId("task-first-3-months-0")).toBeInTheDocument();
    expect(screen.getByTestId("task-first-3-months-3")).toBeInTheDocument();
    // First year has 5 tasks
    expect(screen.getByTestId("task-first-year-0")).toBeInTheDocument();
    expect(screen.getByTestId("task-first-year-4")).toBeInTheDocument();
  });

  it("renders the personalized checklist CTA linking to /onboard", () => {
    const cta = screen.getByTestId("cta-personalized-checklist");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/onboard");
  });

  it("renders the state guides CTA linking to /states", () => {
    const cta = screen.getByTestId("cta-see-states");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/states");
  });

  it("renders the phone scripts differentiator callout", () => {
    const callout = screen.getByTestId("phone-scripts-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain(
      "word-for-word scripts for every phone call"
    );
  });

  it("renders the AI document generation differentiator callout", () => {
    const callout = screen.getByTestId("doc-gen-callout");
    expect(callout).toBeInTheDocument();
    expect(callout.textContent).toContain(
      "generate every letter and form you need"
    );
  });

  it("renders the comparison section with table", () => {
    expect(screen.getByTestId("comparison-section")).toBeInTheDocument();
    expect(screen.getByTestId("comparison-table")).toBeInTheDocument();
  });

  it("renders the FAQ section with 12 questions", () => {
    expect(screen.getByTestId("guide-faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-heading")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("guide-faq-item-11")).toBeInTheDocument();
  });

  it("renders the main CTA section with checklist and states links", () => {
    expect(screen.getByTestId("guide-main-cta")).toBeInTheDocument();
    const checklistCta = screen.getByTestId("cta-main-checklist");
    expect(checklistCta).toHaveAttribute("href", "/onboard");
    const statesCta = screen.getByTestId("cta-main-states");
    expect(statesCta).toHaveAttribute("href", "/states");
  });

  it("renders JSON-LD HowTo schema with 5 steps", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    const schemas = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "{}")
    );
    const howTo = schemas.find((s) => s["@type"] === "HowTo");
    expect(howTo).toBeDefined();
    expect(howTo.step).toHaveLength(5);
    expect(howTo.name).toContain("What to Do When Someone Dies");
  });

  it("renders JSON-LD FAQPage schema with 12 questions", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    const schemas = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "{}")
    );
    const faqPage = schemas.find((s) => s["@type"] === "FAQPage");
    expect(faqPage).toBeDefined();
    expect(faqPage.mainEntity).toHaveLength(12);
  });

  it("renders JSON-LD BreadcrumbList schema", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    const schemas = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "{}")
    );
    const breadcrumb = schemas.find((s) => s["@type"] === "BreadcrumbList");
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement).toHaveLength(3);
  });
});

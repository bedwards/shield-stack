import { describe, beforeEach, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ElectricBillHighGuide from "./page";

describe("Electric Bill High Guide", () => {
  beforeEach(() => {
    render(<ElectricBillHighGuide />);
  });

  it("renders the page container with correct data-testid", () => {
    expect(screen.getByTestId("guide-electric-bill-high")).toBeInTheDocument();
  });

  it("renders the guide title with 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain("Why Is My Electric Bill So High?");
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle with $163/month stat", () => {
    const subtitle = screen.getByTestId("guide-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("$163/month");
    expect(subtitle.textContent).toContain("35%");
  });

  it("renders the primary upload CTA", () => {
    const cta = screen.getByTestId("cta-upload-bill");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/upload");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toHaveAttribute("href", "/");
  });

  it("renders table of contents", () => {
    expect(screen.getByTestId("table-of-contents")).toBeInTheDocument();
    expect(screen.getByTestId("toc-statistics")).toBeInTheDocument();
    expect(screen.getByTestId("toc-causes")).toBeInTheDocument();
    expect(screen.getByTestId("toc-state-averages")).toBeInTheDocument();
    expect(screen.getByTestId("toc-faq")).toBeInTheDocument();
  });

  it("renders 2026 statistics section with correct values", () => {
    expect(screen.getByTestId("statistics-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-avg-bill")).toBeInTheDocument();
    expect(screen.getByTestId("stat-avg-bill").textContent).toContain("$163");
    expect(screen.getByTestId("stat-rate")).toBeInTheDocument();
    expect(screen.getByTestId("stat-rate").textContent).toContain("18.05");
    expect(screen.getByTestId("stat-increase")).toBeInTheDocument();
    expect(screen.getByTestId("stat-increase").textContent).toContain("+35%");
  });

  it("renders all 5 documented causes", () => {
    expect(screen.getByTestId("causes-section")).toBeInTheDocument();
    expect(screen.getByTestId("cause-aging-grid")).toBeInTheDocument();
    expect(screen.getByTestId("cause-ai-demand")).toBeInTheDocument();
    expect(screen.getByTestId("cause-fuel-prices")).toBeInTheDocument();
    expect(screen.getByTestId("cause-extreme-weather")).toBeInTheDocument();
    expect(screen.getByTestId("cause-infrastructure-investment")).toBeInTheDocument();
  });

  it("renders state average tables", () => {
    expect(screen.getByTestId("state-averages-section")).toBeInTheDocument();
    expect(screen.getByTestId("table-highest-states")).toBeInTheDocument();
    expect(screen.getByTestId("table-lowest-states")).toBeInTheDocument();
  });

  it("renders highest-state table with Hawaii at $203/mo", () => {
    const table = screen.getByTestId("table-highest-states");
    expect(table.textContent).toContain("Hawaii");
    expect(table.textContent).toContain("$203/mo");
  });

  it("renders lowest-state table with Utah at $99/mo", () => {
    const table = screen.getByTestId("table-lowest-states");
    expect(table.textContent).toContain("Utah");
    expect(table.textContent).toContain("$99/mo");
  });

  it("renders how-to-diagnose section with 6 steps", () => {
    expect(screen.getByTestId("how-to-diagnose-section")).toBeInTheDocument();
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByTestId(`howto-step-${i}`)).toBeInTheDocument();
    }
  });

  it("renders deregulated states section", () => {
    expect(screen.getByTestId("deregulated-states-section")).toBeInTheDocument();
    expect(screen.getByTestId("deregulated-states-list")).toBeInTheDocument();
    expect(screen.getByTestId("deregulated-states-list").textContent).toContain("Texas");
    expect(screen.getByTestId("deregulated-states-list").textContent).toContain("Ohio");
  });

  it("renders FAQ section with 7 items", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    for (let i = 0; i < 7; i++) {
      expect(screen.getByTestId(`faq-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders FAQ with expected questions", () => {
    expect(screen.getByTestId("faq-item-0").textContent).toContain(
      "Why did my electric bill double?"
    );
    expect(screen.getByTestId("faq-item-1").textContent).toContain(
      "average electric bill"
    );
  });

  it("renders bottom CTA section", () => {
    expect(screen.getByTestId("cta-bottom-section")).toBeInTheDocument();
    const bottomCta = screen.getByTestId("cta-bottom-upload");
    expect(bottomCta).toBeInTheDocument();
    expect(bottomCta).toHaveAttribute("href", "/upload");
  });

  it("renders JSON-LD structured data scripts", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(3);

    const jsonContents = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "")
    );
    const faq = jsonContents.find((j) => j["@type"] === "FAQPage");
    const howTo = jsonContents.find((j) => j["@type"] === "HowTo");
    const breadcrumb = jsonContents.find(
      (j) => j["@type"] === "BreadcrumbList"
    );

    expect(faq).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(5);
    expect(howTo).toBeDefined();
    expect(howTo.step.length).toBe(6);
    expect(breadcrumb).toBeDefined();
  });
});

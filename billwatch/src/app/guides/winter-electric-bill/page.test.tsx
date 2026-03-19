import { describe, beforeEach, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WinterElectricBillGuide from "./page";

describe("Winter Electric Bill Guide", () => {
  beforeEach(() => {
    render(<WinterElectricBillGuide />);
  });

  it("renders the page container with correct data-testid", () => {
    expect(
      screen.getByTestId("guide-winter-electric-bill")
    ).toBeInTheDocument();
  });

  it("renders the guide title with 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain(
      "Why Is My Electric Bill So High This Winter?"
    );
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle with winter bill stats", () => {
    const subtitle = screen.getByTestId("guide-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("$500-$800+");
    expect(subtitle.textContent).toContain("$800+");
  });

  it("renders the seasonal upload CTA with correct data-testid", () => {
    const cta = screen.getByTestId("cta-upload-seasonal");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/upload");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("breadcrumb-guides")).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
  });

  it("renders table of contents with seasonal sections", () => {
    expect(screen.getByTestId("table-of-contents")).toBeInTheDocument();
    expect(screen.getByTestId("toc-winter-stats")).toBeInTheDocument();
    expect(screen.getByTestId("toc-causes")).toBeInTheDocument();
    expect(screen.getByTestId("toc-regional")).toBeInTheDocument();
    expect(screen.getByTestId("toc-tips")).toBeInTheDocument();
    expect(
      screen.getByTestId("toc-normal-vs-suspicious")
    ).toBeInTheDocument();
    expect(screen.getByTestId("toc-faq")).toBeInTheDocument();
  });

  it("renders winter 2026 statistics section", () => {
    expect(screen.getByTestId("winter-stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-winter-avg").textContent).toContain(
      "$210-250"
    );
    expect(screen.getByTestId("stat-heating-pct").textContent).toContain(
      "45%"
    );
    expect(
      screen.getByTestId("stat-heating-degree-days").textContent
    ).toContain("+12%");
    expect(screen.getByTestId("stat-em-heat-cost").textContent).toContain(
      "2-3x"
    );
  });

  it("renders all 6 winter causes", () => {
    expect(screen.getByTestId("causes-section")).toBeInTheDocument();
    expect(screen.getByTestId("cause-heating-demand")).toBeInTheDocument();
    expect(screen.getByTestId("cause-heat-pump-emergency")).toBeInTheDocument();
    expect(screen.getByTestId("cause-insulation-gaps")).toBeInTheDocument();
    expect(screen.getByTestId("cause-rate-increases")).toBeInTheDocument();
    expect(screen.getByTestId("cause-shorter-days")).toBeInTheDocument();
    expect(
      screen.getByTestId("cause-thermostat-settings")
    ).toBeInTheDocument();
  });

  it("renders regional breakdown table with 6 regions", () => {
    expect(screen.getByTestId("regional-section")).toBeInTheDocument();
    expect(screen.getByTestId("region-northeast")).toBeInTheDocument();
    expect(screen.getByTestId("region-midwest")).toBeInTheDocument();
    expect(screen.getByTestId("region-southeast")).toBeInTheDocument();
  });

  it("renders 8 winter tips with savings info", () => {
    expect(screen.getByTestId("tips-section")).toBeInTheDocument();
    expect(screen.getByTestId("tip-thermostat")).toBeInTheDocument();
    expect(screen.getByTestId("tip-seal-leaks")).toBeInTheDocument();
    expect(screen.getByTestId("tip-ceiling-fan")).toBeInTheDocument();
    expect(screen.getByTestId("tip-heat-pump")).toBeInTheDocument();
    expect(screen.getByTestId("tip-hvac-filter")).toBeInTheDocument();
    expect(screen.getByTestId("tip-smart-thermostat")).toBeInTheDocument();
    expect(screen.getByTestId("tip-insulation")).toBeInTheDocument();
    expect(screen.getByTestId("tip-space-heaters")).toBeInTheDocument();
    // Verify savings badges
    expect(screen.getByTestId("tip-thermostat-savings").textContent).toContain(
      "10%"
    );
  });

  it("renders affiliate recommendations section", () => {
    expect(
      screen.getByTestId("affiliate-recommendations")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-smart-thermostat")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-weatherstripping")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-led-bulbs")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-attic-insulation")
    ).toBeInTheDocument();
  });

  it("renders normal vs suspicious section", () => {
    expect(
      screen.getByTestId("normal-vs-suspicious-section")
    ).toBeInTheDocument();
    expect(screen.getByTestId("normal-signs")).toBeInTheDocument();
    expect(screen.getByTestId("suspicious-signs")).toBeInTheDocument();
    expect(screen.getByTestId("link-upload-compare")).toHaveAttribute(
      "href",
      "/upload"
    );
  });

  it("renders related guides section with links", () => {
    expect(screen.getByTestId("related-guides-section")).toBeInTheDocument();
    expect(screen.getByTestId("link-electric-bill-high")).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
    expect(screen.getByTestId("link-summer-guide")).toHaveAttribute(
      "href",
      "/guides/summer-electric-bill"
    );
  });

  it("renders FAQ section with 4 items", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    for (let i = 0; i < 4; i++) {
      expect(screen.getByTestId(`faq-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders FAQ with expected winter-specific questions", () => {
    expect(screen.getByTestId("faq-item-0").textContent).toContain(
      "winter"
    );
    expect(screen.getByTestId("faq-item-3").textContent).toContain(
      "heat pump"
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
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const jsonContents = Array.from(scripts).map((s) =>
      JSON.parse(s.textContent || "")
    );
    const faq = jsonContents.find((j) => j["@type"] === "FAQPage");
    const breadcrumb = jsonContents.find(
      (j) => j["@type"] === "BreadcrumbList"
    );

    expect(faq).toBeDefined();
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3);
    expect(breadcrumb).toBeDefined();
  });
});

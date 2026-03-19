import { describe, beforeEach, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SummerElectricBillGuide from "./page";

describe("Summer Electric Bill Guide", () => {
  beforeEach(() => {
    render(<SummerElectricBillGuide />);
  });

  it("renders the page container with correct data-testid", () => {
    expect(
      screen.getByTestId("guide-summer-electric-bill")
    ).toBeInTheDocument();
  });

  it("renders the guide title with 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain(
      "Why Is My Electric Bill So High This Summer?"
    );
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle with summer bill stats", () => {
    const subtitle = screen.getByTestId("guide-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("28 states");
    expect(subtitle.textContent).toContain("$500+");
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

  it("renders table of contents with summer sections", () => {
    expect(screen.getByTestId("table-of-contents")).toBeInTheDocument();
    expect(screen.getByTestId("toc-summer-stats")).toBeInTheDocument();
    expect(screen.getByTestId("toc-causes")).toBeInTheDocument();
    expect(screen.getByTestId("toc-regional")).toBeInTheDocument();
    expect(screen.getByTestId("toc-tips")).toBeInTheDocument();
    expect(
      screen.getByTestId("toc-peak-pricing-explained")
    ).toBeInTheDocument();
    expect(screen.getByTestId("toc-faq")).toBeInTheDocument();
  });

  it("renders summer 2026 statistics section", () => {
    expect(screen.getByTestId("summer-stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-summer-avg").textContent).toContain(
      "$230-280"
    );
    expect(screen.getByTestId("stat-ac-share").textContent).toContain("50%");
    expect(screen.getByTestId("stat-peak-records").textContent).toContain(
      "28"
    );
    expect(
      screen.getByTestId("stat-peak-multiplier").textContent
    ).toContain("2-3x");
  });

  it("renders all 6 summer causes", () => {
    expect(screen.getByTestId("causes-section")).toBeInTheDocument();
    expect(screen.getByTestId("cause-ac-demand")).toBeInTheDocument();
    expect(screen.getByTestId("cause-peak-pricing")).toBeInTheDocument();
    expect(screen.getByTestId("cause-aging-ac")).toBeInTheDocument();
    expect(screen.getByTestId("cause-heat-gain")).toBeInTheDocument();
    expect(screen.getByTestId("cause-pool-pump")).toBeInTheDocument();
    expect(screen.getByTestId("cause-humidity")).toBeInTheDocument();
  });

  it("renders regional breakdown table with 6 regions", () => {
    expect(screen.getByTestId("regional-section")).toBeInTheDocument();
    expect(screen.getByTestId("region-texas")).toBeInTheDocument();
    expect(screen.getByTestId("region-california")).toBeInTheDocument();
    expect(screen.getByTestId("region-midwest")).toBeInTheDocument();
  });

  it("renders 8 summer tips with savings info", () => {
    expect(screen.getByTestId("tips-section")).toBeInTheDocument();
    expect(screen.getByTestId("tip-thermostat")).toBeInTheDocument();
    expect(screen.getByTestId("tip-peak-shift")).toBeInTheDocument();
    expect(screen.getByTestId("tip-window-treatments")).toBeInTheDocument();
    expect(screen.getByTestId("tip-ac-service")).toBeInTheDocument();
    expect(screen.getByTestId("tip-ceiling-fans")).toBeInTheDocument();
    expect(screen.getByTestId("tip-pool-pump")).toBeInTheDocument();
    expect(screen.getByTestId("tip-cooking")).toBeInTheDocument();
    expect(screen.getByTestId("tip-duct-leaks")).toBeInTheDocument();
    // Verify savings badges
    expect(screen.getByTestId("tip-peak-shift-savings").textContent).toContain(
      "20-30%"
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
      screen.getByTestId("affiliate-link-blackout-curtains")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-window-film")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("affiliate-link-ceiling-fan")
    ).toBeInTheDocument();
  });

  it("renders peak pricing explained section with rate tiers", () => {
    expect(screen.getByTestId("peak-pricing-section")).toBeInTheDocument();
    expect(screen.getByTestId("peak-off-peak")).toBeInTheDocument();
    expect(screen.getByTestId("peak-shoulder")).toBeInTheDocument();
    expect(screen.getByTestId("peak-on-peak")).toBeInTheDocument();
  });

  it("renders related guides section with links", () => {
    expect(screen.getByTestId("related-guides-section")).toBeInTheDocument();
    expect(screen.getByTestId("link-electric-bill-high")).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
    expect(screen.getByTestId("link-winter-guide")).toHaveAttribute(
      "href",
      "/guides/winter-electric-bill"
    );
  });

  it("renders FAQ section with 4 items", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    for (let i = 0; i < 4; i++) {
      expect(screen.getByTestId(`faq-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders FAQ with expected summer-specific questions", () => {
    expect(screen.getByTestId("faq-item-0").textContent).toContain(
      "summer"
    );
    expect(screen.getByTestId("faq-item-2").textContent).toContain(
      "peak pricing"
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

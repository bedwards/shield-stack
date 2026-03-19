import { describe, beforeEach, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BillDoubledGuide from "./page";

describe("Bill Doubled Crisis Guide", () => {
  beforeEach(() => {
    render(<BillDoubledGuide />);
  });

  it("renders the page container with correct data-testid", () => {
    expect(screen.getByTestId("guide-bill-doubled")).toBeInTheDocument();
  });

  it("renders the guide title with 2026", () => {
    const title = screen.getByTestId("guide-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain("Electric Bill Doubled?");
    expect(title.textContent).toContain("2026");
  });

  it("renders the subtitle with crisis stats", () => {
    const subtitle = screen.getByTestId("guide-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("$163/month");
    expect(subtitle.textContent).toContain("35%");
    expect(subtitle.textContent).toContain("$1,000");
  });

  it("renders the primary upload CTA with correct data-testid", () => {
    const cta = screen.getByTestId("cta-upload-doubled");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/upload");
    expect(cta.textContent).toContain("Upload Your Bill");
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb")).toBeInTheDocument();
    expect(screen.getByTestId("breadcrumb-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("breadcrumb-guides")).toHaveAttribute(
      "href",
      "/guides/electric-bill-high"
    );
  });

  it("renders table of contents with all sections", () => {
    expect(screen.getByTestId("table-of-contents")).toBeInTheDocument();
    expect(screen.getByTestId("toc-crisis-stats")).toBeInTheDocument();
    expect(screen.getByTestId("toc-emergency-actions")).toBeInTheDocument();
    expect(screen.getByTestId("toc-causes")).toBeInTheDocument();
    expect(screen.getByTestId("toc-self-check")).toBeInTheDocument();
    expect(screen.getByTestId("toc-faq")).toBeInTheDocument();
  });

  it("renders 2026 crisis stats section with all 4 stats", () => {
    expect(screen.getByTestId("crisis-stats-section")).toBeInTheDocument();

    const avgIncrease = screen.getByTestId("stat-avg-increase");
    expect(avgIncrease.textContent).toContain("+35%");

    const fortuneBills = screen.getByTestId("stat-fortune-bills");
    expect(fortuneBills.textContent).toContain("$1,000+");

    const pittsburgh = screen.getByTestId("stat-pittsburgh");
    expect(pittsburgh.textContent).toContain("$800+");

    const virginia = screen.getByTestId("stat-virginia");
    expect(virginia.textContent).toContain("2x");
    expect(virginia.textContent).toContain("$343");
  });

  it("renders emergency actions section with all 4 steps", () => {
    expect(screen.getByTestId("emergency-actions-section")).toBeInTheDocument();
    expect(screen.getByTestId("emergency-check-meter")).toBeInTheDocument();
    expect(screen.getByTestId("emergency-call-utility")).toBeInTheDocument();
    expect(screen.getByTestId("emergency-billing-audit")).toBeInTheDocument();
    expect(screen.getByTestId("emergency-puc-complaint")).toBeInTheDocument();
  });

  it("renders emergency actions with PUC complaint filing info", () => {
    const pucAction = screen.getByTestId("emergency-puc-complaint");
    expect(pucAction.textContent).toContain("Public Utility Commission");
    expect(pucAction.textContent).toContain("free");
  });

  it("renders all 7 causes with symptoms, verify, and action", () => {
    expect(screen.getByTestId("causes-section")).toBeInTheDocument();
    expect(screen.getByTestId("cause-rate-increase")).toBeInTheDocument();
    expect(screen.getByTestId("cause-broken-meter")).toBeInTheDocument();
    expect(screen.getByTestId("cause-hvac-failure")).toBeInTheDocument();
    expect(screen.getByTestId("cause-phantom-loads")).toBeInTheDocument();
    expect(screen.getByTestId("cause-seasonal-shift")).toBeInTheDocument();
    expect(screen.getByTestId("cause-billing-error")).toBeInTheDocument();
    expect(screen.getByTestId("cause-rate-plan-change")).toBeInTheDocument();
  });

  it("each cause has symptoms, verify, and action subsections", () => {
    const rateIncrease = screen.getByTestId("cause-rate-increase");
    expect(rateIncrease.textContent).toContain("Symptoms");
    expect(rateIncrease.textContent).toContain("How to Verify");
    expect(rateIncrease.textContent).toContain("What to Do");
  });

  it("renders self-check (HowTo) section with 6 steps", () => {
    expect(screen.getByTestId("self-check-section")).toBeInTheDocument();
    for (let i = 1; i <= 6; i++) {
      expect(screen.getByTestId(`howto-step-${i}`)).toBeInTheDocument();
    }
  });

  it("renders related guides section with internal links", () => {
    expect(screen.getByTestId("related-guides-section")).toBeInTheDocument();
    const headTermLink = screen.getByTestId("link-electric-bill-high");
    expect(headTermLink).toHaveAttribute("href", "/guides/electric-bill-high");
    const stateLink = screen.getByTestId("link-state-guide-example");
    expect(stateLink).toHaveAttribute("href", "/guides/texas");
  });

  it("renders FAQ section with 5 items", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    for (let i = 0; i < 5; i++) {
      expect(screen.getByTestId(`faq-item-${i}`)).toBeInTheDocument();
    }
  });

  it("renders FAQ with expected questions", () => {
    expect(screen.getByTestId("faq-item-0").textContent).toContain(
      "Why did my electric bill double for no apparent reason?"
    );
    expect(screen.getByTestId("faq-item-3").textContent).toContain(
      "dispute a doubled electric bill"
    );
    expect(screen.getByTestId("faq-item-4").textContent).toContain(
      "2026"
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
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(4);
    expect(howTo).toBeDefined();
    expect(howTo.name).toContain("electric bill doubled");
    expect(howTo.step.length).toBe(6);
    expect(breadcrumb).toBeDefined();
    expect(breadcrumb.itemListElement).toHaveLength(3);
  });
});

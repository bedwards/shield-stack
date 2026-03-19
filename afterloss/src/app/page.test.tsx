import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the landing page container", () => {
    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("renders the hero section with empathetic messaging", () => {
    expect(screen.getByTestId("hero-section")).toBeInTheDocument();
    expect(screen.getByTestId("hero-heading")).toBeInTheDocument();
    expect(screen.getByTestId("hero-heading")).toHaveTextContent(
      /sorry for your loss/
    );
    expect(screen.getByTestId("hero-heading")).toHaveTextContent(
      /Let us help with what comes next/
    );
  });

  it("renders the hero eyebrow and reassurance text", () => {
    expect(screen.getByTestId("hero-eyebrow")).toHaveTextContent(
      "Free. Compassionate. Step-by-step."
    );
    expect(screen.getByTestId("hero-reassurance")).toHaveTextContent(
      "No account required"
    );
  });

  it("renders the Start Your Checklist CTA button linking to /onboard", () => {
    const cta = screen.getByTestId("cta-start-button");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveTextContent("Start Your Checklist");
    expect(cta).toHaveAttribute("href", "/onboard");
  });

  it("renders the Find Your State button", () => {
    const statesBtn = screen.getByTestId("cta-states-button");
    expect(statesBtn).toBeInTheDocument();
    expect(statesBtn).toHaveAttribute("href", "/states");
  });

  it("renders the value proposition section", () => {
    expect(screen.getByTestId("value-prop-section")).toBeInTheDocument();
    expect(screen.getByTestId("value-prop-heading")).toHaveTextContent(
      "Free. Step-by-step. Personalized to your state."
    );
    expect(screen.getByTestId("stat-states")).toBeInTheDocument();
    expect(screen.getByTestId("stat-documents")).toBeInTheDocument();
    expect(screen.getByTestId("stat-price")).toBeInTheDocument();
  });

  it("renders the how-it-works section with 3 steps", () => {
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("how-it-works-heading")).toHaveTextContent(
      "How AfterLoss helps"
    );
    expect(screen.getByTestId("step-situation")).toBeInTheDocument();
    expect(screen.getByTestId("step-checklist")).toBeInTheDocument();
    expect(screen.getByTestId("step-documents")).toBeInTheDocument();
  });

  it("renders the trust section with 4 trust points", () => {
    expect(screen.getByTestId("trust-section")).toBeInTheDocument();
    expect(screen.getByTestId("trust-heading")).toHaveTextContent(
      "Built with care for families like yours"
    );
    expect(screen.getByTestId("trust-free")).toBeInTheDocument();
    expect(screen.getByTestId("trust-no-account")).toBeInTheDocument();
    expect(screen.getByTestId("trust-private")).toBeInTheDocument();
    expect(screen.getByTestId("trust-pace")).toBeInTheDocument();
  });

  it("renders the FAQ section with questions", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-heading")).toHaveTextContent(
      "Frequently asked questions"
    );
    expect(screen.getByTestId("faq-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("faq-item-5")).toBeInTheDocument();
  });

  it("renders the bottom CTA section", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-heading")).toHaveTextContent(
      /You don.t have to figure this out alone/
    );
    const bottomCta = screen.getByTestId("cta-bottom-button");
    expect(bottomCta).toBeInTheDocument();
    expect(bottomCta).toHaveAttribute("href", "/onboard");
  });

  it("includes JSON-LD structured data scripts", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    );
    expect(scripts.length).toBeGreaterThanOrEqual(2);

    const schemas = Array.from(scripts).map((s) =>
      JSON.parse(s.innerHTML)
    );
    const webApp = schemas.find((s) => s["@type"] === "WebApplication");
    expect(webApp).toBeDefined();
    expect(webApp.name).toBe("AfterLoss");
    expect(webApp.offers.price).toBe("0");

    const faqPage = schemas.find((s) => s["@type"] === "FAQPage");
    expect(faqPage).toBeDefined();
    expect(faqPage.mainEntity.length).toBeGreaterThan(0);
  });
});

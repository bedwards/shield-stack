import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import FaqPage from "./page";

describe("FAQ Page", () => {
  beforeEach(() => {
    render(<FaqPage />);
  });

  it("renders the FAQ title", () => {
    expect(screen.getByTestId("faq-title")).toBeInTheDocument();
  });

  it("renders FAQ categories", () => {
    expect(screen.getByTestId("faq-category-0")).toBeInTheDocument();
    expect(screen.getByTestId("faq-category-1")).toBeInTheDocument();
    expect(screen.getByTestId("faq-category-2")).toBeInTheDocument();
    expect(screen.getByTestId("faq-category-3")).toBeInTheDocument();
  });

  it("renders FAQ items within categories", () => {
    // About BillWatch category has 3 items
    expect(screen.getByTestId("faq-item-0-0")).toBeInTheDocument();
    expect(screen.getByTestId("faq-item-0-1")).toBeInTheDocument();
    expect(screen.getByTestId("faq-item-0-2")).toBeInTheDocument();
  });

  it("renders bottom CTA section", () => {
    expect(screen.getByTestId("faq-cta")).toBeInTheDocument();
    expect(screen.getByTestId("faq-cta-upload")).toBeInTheDocument();
  });

  it("contains JSON-LD structured data", () => {
    const scripts = document.querySelectorAll(
      'script[type="application/ld+json"]',
    );
    expect(scripts.length).toBeGreaterThan(0);
    const jsonLd = JSON.parse(scripts[0].textContent || "{}");
    expect(jsonLd["@type"]).toBe("FAQPage");
    expect(jsonLd.mainEntity.length).toBeGreaterThan(0);
  });
});

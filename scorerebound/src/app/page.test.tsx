import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn() }),
  useParams: () => ({}),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));

describe("Home page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the hero title", () => {
    const heading = screen.getByTestId("hero-title");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain("credit score");
  });

  it("renders the primary CTA button", () => {
    const cta = screen.getByTestId("hero-cta-primary");
    expect(cta).toBeInTheDocument();
    expect(cta.textContent).toContain("Start My Free Recovery Plan");
  });

  it("renders the stats section", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-borrowers")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-1")).toBeInTheDocument();
    expect(screen.getByTestId("step-2")).toBeInTheDocument();
    expect(screen.getByTestId("step-3")).toBeInTheDocument();
  });

  it("renders the recovery paths section", () => {
    expect(screen.getByTestId("recovery-paths-section")).toBeInTheDocument();
    expect(screen.getByTestId("path-ibr")).toBeInTheDocument();
    expect(screen.getByTestId("path-rehabilitation")).toBeInTheDocument();
    expect(screen.getByTestId("path-consolidation")).toBeInTheDocument();
  });

  it("renders the FAQ section with questions", () => {
    expect(screen.getByTestId("faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("faq-item-0")).toBeInTheDocument();
    expect(screen.getByTestId("faq-question-0")).toBeInTheDocument();
    expect(screen.getByTestId("faq-answer-0")).toBeInTheDocument();
    // Should have multiple FAQ items
    expect(screen.getByTestId("faq-item-5")).toBeInTheDocument();
  });

  it("renders the view all FAQs link", () => {
    const link = screen.getByTestId("faq-view-all");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/faq");
  });

  it("renders the quiz funnel in CTA section", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("quiz-funnel")).toBeInTheDocument();
  });

  it("renders FAQ structured data script", () => {
    const script = document.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeTruthy();
    const data = JSON.parse(script!.textContent!);
    expect(data["@type"]).toBe("FAQPage");
    expect(data.mainEntity.length).toBeGreaterThan(0);
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("Pricing Page", () => {
  beforeEach(() => {
    render(<PricingPage />);
  });

  it("renders page title", () => {
    expect(screen.getByTestId("pricing-title")).toHaveTextContent(
      "Simple, Transparent Pricing",
    );
  });

  it("renders free plan card", () => {
    const freeCard = screen.getByTestId("plan-free");
    expect(freeCard).toBeInTheDocument();
    expect(freeCard).toHaveTextContent("$0");
    expect(freeCard).toHaveTextContent("Free");
  });

  it("renders premium plan card", () => {
    const premiumCard = screen.getByTestId("plan-premium");
    expect(premiumCard).toBeInTheDocument();
    expect(premiumCard).toHaveTextContent("$3.99");
    expect(premiumCard).toHaveTextContent("Premium");
  });

  it("renders premium badge", () => {
    expect(screen.getByTestId("premium-badge")).toHaveTextContent(
      "Most Popular",
    );
  });

  it("renders free plan CTA", () => {
    const cta = screen.getByTestId("cta-free-plan");
    expect(cta).toHaveTextContent("Get Started Free");
    expect(cta).toHaveAttribute("href", "/upload");
  });

  it("renders premium plan CTA", () => {
    const cta = screen.getByTestId("cta-premium-plan");
    expect(cta).toHaveTextContent("Start Premium");
  });

  it("renders pricing FAQ", () => {
    expect(screen.getByTestId("pricing-faq-title")).toHaveTextContent(
      "Frequently Asked Questions",
    );
    expect(screen.getByTestId("faq-cancel")).toBeInTheDocument();
    expect(screen.getByTestId("faq-free-limit")).toBeInTheDocument();
    expect(screen.getByTestId("faq-payment")).toBeInTheDocument();
  });

  it("lists all pricing features", () => {
    // Check that key features are mentioned in the page
    const page = screen.getByTestId("pricing-page");
    expect(page).toHaveTextContent("Utility accounts");
    expect(page).toHaveTextContent("Bill history");
    expect(page).toHaveTextContent("Household benchmarking");
    expect(page).toHaveTextContent("Rate benchmarking");
    expect(page).toHaveTextContent("Provider comparison");
    expect(page).toHaveTextContent("CSV export");
  });
});

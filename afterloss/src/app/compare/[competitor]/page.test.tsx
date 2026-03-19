import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ComparisonPage from "./page";

describe("Comparison Page — Sunset", () => {
  beforeEach(async () => {
    const Page = await ComparisonPage({
      params: Promise.resolve({ competitor: "sunset" }),
    });
    render(Page);
  });

  it("renders the comparison page container", () => {
    expect(screen.getByTestId("comparison-page")).toBeInTheDocument();
  });

  it("renders the hero with competitor name", () => {
    expect(screen.getByTestId("comparison-hero")).toBeInTheDocument();
    expect(screen.getByTestId("comparison-title")).toHaveTextContent(
      /AfterLoss vs Sunset/
    );
  });

  it("renders the pricing comparison section", () => {
    expect(screen.getByTestId("pricing-comparison")).toBeInTheDocument();
    expect(screen.getByTestId("pricing-afterloss")).toBeInTheDocument();
    expect(screen.getByTestId("pricing-competitor")).toBeInTheDocument();
  });

  it("renders the feature comparison table", () => {
    expect(screen.getByTestId("feature-comparison")).toBeInTheDocument();
    expect(screen.getByTestId("feature-comparison-table")).toBeInTheDocument();
  });

  it("renders pros and cons sections", () => {
    expect(screen.getByTestId("pros-cons")).toBeInTheDocument();
    expect(screen.getByTestId("competitor-pros")).toBeInTheDocument();
    expect(screen.getByTestId("competitor-cons")).toBeInTheDocument();
  });

  it("renders the why-afterloss section", () => {
    expect(screen.getByTestId("why-afterloss")).toBeInTheDocument();
  });

  it("renders the when-competitor-better section for fairness", () => {
    expect(screen.getByTestId("when-competitor-better")).toBeInTheDocument();
    expect(screen.getByTestId("competitor-better-text")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    expect(screen.getByTestId("cta-start-guide")).toBeInTheDocument();
    expect(screen.getByTestId("cta-state-guides")).toBeInTheDocument();
  });

  it("renders links to other comparison pages", () => {
    expect(screen.getByTestId("other-comparisons")).toBeInTheDocument();
    expect(screen.getByTestId("compare-link-atticus")).toBeInTheDocument();
    expect(screen.getByTestId("compare-link-swiftprobate")).toBeInTheDocument();
    expect(screen.getByTestId("compare-link-elayne")).toBeInTheDocument();
    expect(screen.getByTestId("compare-link-eversettled")).toBeInTheDocument();
    // Should NOT link to self
    expect(screen.queryByTestId("compare-link-sunset")).not.toBeInTheDocument();
  });

  it("renders breadcrumb navigation", () => {
    expect(screen.getByTestId("breadcrumb-home")).toBeInTheDocument();
  });
});

describe("Comparison Page — All competitors render", () => {
  const competitors = ["sunset", "atticus", "swiftprobate", "elayne", "eversettled"];

  it.each(competitors)("renders comparison page for %s", async (slug) => {
    const Page = await ComparisonPage({
      params: Promise.resolve({ competitor: slug }),
    });
    const { container } = render(Page);
    expect(container.querySelector('[data-testid="comparison-page"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="feature-comparison-table"]')).toBeInTheDocument();
  });
});

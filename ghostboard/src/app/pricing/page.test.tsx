import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import PricingPage from "./page";

describe("Pricing Page", () => {
  beforeEach(() => {
    render(<PricingPage />);
  });

  it("renders pricing title", () => {
    expect(screen.getByTestId("pricing-title")).toBeInTheDocument();
    expect(screen.getByTestId("pricing-title")).toHaveTextContent("Pricing");
  });

  it("renders all three plans", () => {
    expect(screen.getByTestId("plan-free")).toBeInTheDocument();
    expect(screen.getByTestId("plan-premium")).toBeInTheDocument();
    expect(screen.getByTestId("plan-recruiter")).toBeInTheDocument();
  });

  it("renders plan CTAs", () => {
    expect(screen.getByTestId("plan-free-cta")).toBeInTheDocument();
    expect(screen.getByTestId("plan-premium-cta")).toBeInTheDocument();
    expect(screen.getByTestId("plan-recruiter-cta")).toBeInTheDocument();
  });

  it("shows popular badge on premium plan", () => {
    expect(screen.getByTestId("popular-badge")).toBeInTheDocument();
  });

  it("renders FAQ section", () => {
    expect(screen.getByTestId("pricing-faq")).toBeInTheDocument();
    expect(screen.getByTestId("faq-cancel")).toBeInTheDocument();
    expect(screen.getByTestId("faq-free-limit")).toBeInTheDocument();
    expect(screen.getByTestId("faq-recruiter")).toBeInTheDocument();
  });

  it("displays correct prices", () => {
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("$4.99")).toBeInTheDocument();
    expect(screen.getByText("$49")).toBeInTheDocument();
  });
});

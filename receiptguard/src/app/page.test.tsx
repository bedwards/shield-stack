import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
  });

  it("renders the hero subtitle", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-subtitle")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-scan-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-demo-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-receipts-scanned")).toBeInTheDocument();
    expect(screen.getByTestId("stat-overcharges-found")).toBeInTheDocument();
    expect(screen.getByTestId("stat-money-saved")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-scan")).toBeInTheDocument();
    expect(screen.getByTestId("step-detect")).toBeInTheDocument();
    expect(screen.getByTestId("step-save")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<Home />);
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-ocr")).toBeInTheDocument();
    expect(screen.getByTestId("feature-price-check")).toBeInTheDocument();
    expect(screen.getByTestId("feature-overcharge-alerts")).toBeInTheDocument();
    expect(screen.getByTestId("feature-store-policies")).toBeInTheDocument();
  });

  it("renders the CTA section with start button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-start-button")).toBeInTheDocument();
  });
});

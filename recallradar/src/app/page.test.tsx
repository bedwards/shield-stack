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
    expect(screen.getByTestId("cta-browse-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-products-scanned")).toBeInTheDocument();
    expect(screen.getByTestId("stat-recalls-tracked")).toBeInTheDocument();
    expect(screen.getByTestId("stat-families-protected")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-scan")).toBeInTheDocument();
    expect(screen.getByTestId("step-check")).toBeInTheDocument();
    expect(screen.getByTestId("step-protect")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<Home />);
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-scanner")).toBeInTheDocument();
    expect(screen.getByTestId("feature-cpsc")).toBeInTheDocument();
    expect(screen.getByTestId("feature-inventory")).toBeInTheDocument();
    expect(screen.getByTestId("feature-alerts")).toBeInTheDocument();
  });

  it("renders the CTA section with start button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-start-button")).toBeInTheDocument();
  });
});

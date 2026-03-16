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
    expect(screen.getByTestId("cta-upload-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-demo-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-bills-analyzed")).toBeInTheDocument();
    expect(screen.getByTestId("stat-anomalies-found")).toBeInTheDocument();
    expect(screen.getByTestId("stat-money-saved")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-upload")).toBeInTheDocument();
    expect(screen.getByTestId("step-analyze")).toBeInTheDocument();
    expect(screen.getByTestId("step-save")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<Home />);
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-ocr")).toBeInTheDocument();
    expect(screen.getByTestId("feature-trends")).toBeInTheDocument();
    expect(screen.getByTestId("feature-anomalies")).toBeInTheDocument();
    expect(screen.getByTestId("feature-benchmark")).toBeInTheDocument();
  });

  it("renders the CTA section with start button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-start-button")).toBeInTheDocument();
  });
});

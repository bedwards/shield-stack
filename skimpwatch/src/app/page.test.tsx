import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
  });

  it("renders the hero CTA buttons", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-scan-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-brands-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-products")).toBeInTheDocument();
    expect(screen.getByTestId("stat-changes")).toBeInTheDocument();
    expect(screen.getByTestId("stat-reports")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-scan")).toBeInTheDocument();
    expect(screen.getByTestId("step-compare")).toBeInTheDocument();
    expect(screen.getByTestId("step-alert")).toBeInTheDocument();
  });

  it("renders the CTA section", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

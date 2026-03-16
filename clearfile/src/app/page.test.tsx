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
    expect(screen.getByTestId("cta-start-review")).toBeInTheDocument();
    expect(screen.getByTestId("cta-learn-rights")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-errors-found")).toBeInTheDocument();
    expect(screen.getByTestId("stat-disputes-filed")).toBeInTheDocument();
    expect(screen.getByTestId("stat-companies-covered")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-request")).toBeInTheDocument();
    expect(screen.getByTestId("step-flag")).toBeInTheDocument();
    expect(screen.getByTestId("step-dispute")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<Home />);
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-letters")).toBeInTheDocument();
    expect(screen.getByTestId("feature-directory")).toBeInTheDocument();
    expect(screen.getByTestId("feature-tracker")).toBeInTheDocument();
    expect(screen.getByTestId("feature-upload")).toBeInTheDocument();
    expect(screen.getByTestId("feature-monitoring")).toBeInTheDocument();
    expect(screen.getByTestId("feature-encryption")).toBeInTheDocument();
  });

  it("renders the CTA section with start button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-start-button")).toBeInTheDocument();
  });
});

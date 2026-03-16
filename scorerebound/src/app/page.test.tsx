import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    const heading = screen.getByTestId("hero-title");
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toContain("credit score");
  });

  it("renders the primary CTA button", () => {
    render(<Home />);
    const cta = screen.getByTestId("hero-cta-primary");
    expect(cta).toBeInTheDocument();
    expect(cta.textContent).toContain("Start My Free Recovery Plan");
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-borrowers")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-1")).toBeInTheDocument();
    expect(screen.getByTestId("step-2")).toBeInTheDocument();
    expect(screen.getByTestId("step-3")).toBeInTheDocument();
  });

  it("renders the recovery paths section", () => {
    render(<Home />);
    expect(screen.getByTestId("recovery-paths-section")).toBeInTheDocument();
    expect(screen.getByTestId("path-ibr")).toBeInTheDocument();
    expect(screen.getByTestId("path-rehabilitation")).toBeInTheDocument();
    expect(screen.getByTestId("path-consolidation")).toBeInTheDocument();
  });
});

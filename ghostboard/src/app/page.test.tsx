import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  it("renders the hero title", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
  });

  it("renders the search form", () => {
    render(<Home />);
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-companies")).toBeInTheDocument();
    expect(screen.getByTestId("stat-reports")).toBeInTheDocument();
    expect(screen.getByTestId("stat-ghosting-rate")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-search")).toBeInTheDocument();
    expect(screen.getByTestId("step-report")).toBeInTheDocument();
    expect(screen.getByTestId("step-decide")).toBeInTheDocument();
  });

  it("renders the CTA section with report button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-report-button")).toBeInTheDocument();
  });
});

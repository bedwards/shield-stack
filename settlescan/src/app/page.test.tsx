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
    expect(screen.getByTestId("cta-match-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-browse-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-settlements")).toBeInTheDocument();
    expect(screen.getByTestId("stat-claims")).toBeInTheDocument();
    expect(screen.getByTestId("stat-recovered")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-match")).toBeInTheDocument();
    expect(screen.getByTestId("step-file")).toBeInTheDocument();
    expect(screen.getByTestId("step-collect")).toBeInTheDocument();
  });

  it("renders the CTA section", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

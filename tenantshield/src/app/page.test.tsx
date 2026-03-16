import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home page", () => {
  it("renders the hero section with title", () => {
    render(<Home />);
    const title = screen.getByTestId("hero-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain("Document habitability issues");
  });

  it("renders the hero subtitle", () => {
    render(<Home />);
    const subtitle = screen.getByTestId("hero-subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle.textContent).toContain("timestamped photos");
  });

  it("renders CTA buttons", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-document-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-states-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-renters")).toBeInTheDocument();
    expect(screen.getByTestId("stat-complaints")).toBeInTheDocument();
    expect(screen.getByTestId("stat-letters")).toBeInTheDocument();
  });

  it("renders the how-it-works section with three steps", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-document")).toBeInTheDocument();
    expect(screen.getByTestId("step-generate")).toBeInTheDocument();
    expect(screen.getByTestId("step-track")).toBeInTheDocument();
  });

  it("renders the bottom CTA section", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

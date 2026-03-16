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
    expect(screen.getByTestId("cta-start-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-states-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    render(<Home />);
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-states")).toBeInTheDocument();
    expect(screen.getByTestId("stat-documents")).toBeInTheDocument();
    expect(screen.getByTestId("stat-price")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    render(<Home />);
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-describe")).toBeInTheDocument();
    expect(screen.getByTestId("step-generate")).toBeInTheDocument();
    expect(screen.getByTestId("step-file")).toBeInTheDocument();
    expect(screen.getByTestId("step-win")).toBeInTheDocument();
  });

  it("renders the features section", () => {
    render(<Home />);
    expect(screen.getByTestId("features-section")).toBeInTheDocument();
    expect(screen.getByTestId("feature-documents")).toBeInTheDocument();
    expect(screen.getByTestId("feature-state-rules")).toBeInTheDocument();
    expect(screen.getByTestId("feature-hearing-prep")).toBeInTheDocument();
  });

  it("renders the CTA section with bottom button", () => {
    render(<Home />);
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home Page", () => {
  beforeEach(() => {
    render(<Home />);
  });

  it("renders the hero title", () => {
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
  });

  it("renders the hero CTA buttons", () => {
    expect(screen.getByTestId("cta-guide-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-states-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-states")).toBeInTheDocument();
    expect(screen.getByTestId("stat-tasks")).toBeInTheDocument();
    expect(screen.getByTestId("stat-price")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-start")).toBeInTheDocument();
    expect(screen.getByTestId("step-follow")).toBeInTheDocument();
    expect(screen.getByTestId("step-complete")).toBeInTheDocument();
  });

  it("renders the CTA section", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

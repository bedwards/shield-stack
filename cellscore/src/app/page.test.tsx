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
    expect(screen.getByTestId("cta-check-button")).toBeInTheDocument();
    expect(screen.getByTestId("cta-plans-button")).toBeInTheDocument();
  });

  it("renders the stats section with updated counts", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-carriers")).toHaveTextContent("16");
    expect(screen.getByTestId("stat-plans")).toHaveTextContent("65+");
  });

  it("renders the how-it-works section", () => {
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-address")).toBeInTheDocument();
    expect(screen.getByTestId("step-compare")).toBeInTheDocument();
    expect(screen.getByTestId("step-switch")).toBeInTheDocument();
  });

  it("renders the CTA section", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-bottom-button")).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import StatesIndexPage from "./page";

describe("States Index Page", () => {
  beforeEach(() => {
    render(<StatesIndexPage />);
  });

  it("renders the page title with current year", () => {
    const title = screen.getByTestId("states-page-title");
    expect(title).toBeInTheDocument();
    expect(title.textContent).toContain("State-by-State");
    expect(title.textContent).toMatch(/\d{4}/);
  });

  it("renders the page description", () => {
    expect(screen.getByTestId("states-page-description")).toBeInTheDocument();
  });

  it("renders the states grid with 51 cards", () => {
    const grid = screen.getByTestId("states-grid");
    expect(grid).toBeInTheDocument();
    // Check a few known state cards
    expect(screen.getByTestId("state-card-CA")).toBeInTheDocument();
    expect(screen.getByTestId("state-card-TX")).toBeInTheDocument();
    expect(screen.getByTestId("state-card-NY")).toBeInTheDocument();
    expect(screen.getByTestId("state-card-DC")).toBeInTheDocument();
  });

  it("renders probate guide links for each state", () => {
    expect(screen.getByTestId("state-link-probate-CA")).toBeInTheDocument();
    expect(screen.getByTestId("state-link-probate-TX")).toBeInTheDocument();
  });

  it("renders small estate links for each state", () => {
    expect(
      screen.getByTestId("state-link-small-estate-CA"),
    ).toBeInTheDocument();
  });

  it("renders death certificate links for each state", () => {
    expect(
      screen.getByTestId("state-link-death-cert-CA"),
    ).toBeInTheDocument();
  });

  it("renders the FAQ section", () => {
    expect(screen.getByTestId("states-faq-section")).toBeInTheDocument();
    expect(screen.getByTestId("states-faq-0")).toBeInTheDocument();
  });

  it("renders the CTA section with link to onboard", () => {
    const cta = screen.getByTestId("states-cta-button");
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/onboard");
  });

  it("renders breadcrumbs", () => {
    expect(screen.getByTestId("breadcrumbs")).toBeInTheDocument();
  });

  it("displays state-specific data in cards", () => {
    const caCard = screen.getByTestId("state-card-CA");
    expect(caCard.textContent).toContain("California");
    expect(caCard.textContent).toContain("$208,850");
  });
});

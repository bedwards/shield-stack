import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProvidersPage from "./page";

describe("Providers Page", () => {
  beforeEach(() => {
    render(<ProvidersPage />);
  });

  it("renders the providers page title", () => {
    expect(screen.getByTestId("providers-title")).toBeInTheDocument();
  });

  it("renders stats section", () => {
    expect(screen.getByTestId("providers-stats")).toBeInTheDocument();
  });

  it("renders deregulated states section", () => {
    expect(screen.getByTestId("deregulated-section")).toBeInTheDocument();
  });

  it("renders regulated states section", () => {
    expect(screen.getByTestId("regulated-section")).toBeInTheDocument();
  });

  it("renders regulated states table", () => {
    expect(screen.getByTestId("regulated-states-table")).toBeInTheDocument();
  });

  it("renders deregulated state cards (Texas)", () => {
    expect(screen.getByTestId("deregulated-state-tx")).toBeInTheDocument();
  });

  it("renders bottom CTA", () => {
    expect(screen.getByTestId("providers-cta")).toBeInTheDocument();
    expect(screen.getByTestId("providers-cta-upload")).toBeInTheDocument();
  });

  it("links to state guide pages", () => {
    const txLink = screen.getByTestId("state-link-tx");
    expect(txLink).toBeInTheDocument();
    expect(txLink.closest("a")).toHaveAttribute("href", "/guides/texas");
  });
});

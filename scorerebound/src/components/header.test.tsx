import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders the logo link", () => {
    render(<Header />);
    const logo = screen.getByTestId("header-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent("ScoreRebound");
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByTestId("nav-quiz")).toBeInTheDocument();
    expect(screen.getByTestId("nav-cta")).toBeInTheDocument();
  });

  it("has data-testid on header element", () => {
    render(<Header />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});

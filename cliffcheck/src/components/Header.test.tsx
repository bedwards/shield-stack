import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders the logo link", () => {
    render(<Header />);
    const logo = screen.getByTestId("header-logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveTextContent("CliffCheck");
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByTestId("nav-calculator")).toBeInTheDocument();
    expect(screen.getByTestId("nav-cta")).toBeInTheDocument();
  });
});

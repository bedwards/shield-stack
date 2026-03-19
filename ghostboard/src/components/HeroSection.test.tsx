import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "./HeroSection";

describe("HeroSection", () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  it("renders hero title with ghosting text", () => {
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
    expect(screen.getByTestId("hero-title")).toHaveTextContent(
      "ghost applicants",
    );
  });

  it("renders search form", () => {
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("renders example company links", () => {
    expect(screen.getByTestId("hero-example-google")).toBeInTheDocument();
    expect(screen.getByTestId("hero-example-amazon")).toBeInTheDocument();
    expect(screen.getByTestId("hero-example-meta")).toBeInTheDocument();
    expect(screen.getByTestId("hero-example-microsoft")).toBeInTheDocument();
  });
});

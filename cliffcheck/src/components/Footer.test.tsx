import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the brand name", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-brand")).toHaveTextContent("CliffCheck");
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-calculator-link")).toBeInTheDocument();
    expect(screen.getByTestId("footer-faq-link")).toBeInTheDocument();
    expect(screen.getByTestId("footer-about-link")).toBeInTheDocument();
  });

  it("renders the disclaimer", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-disclaimer")).toHaveTextContent(
      "Not financial or legal advice"
    );
  });
});

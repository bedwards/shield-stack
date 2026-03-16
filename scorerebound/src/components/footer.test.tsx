import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  it("renders the brand text", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-brand")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Footer />);
    expect(screen.getByTestId("footer-about")).toBeInTheDocument();
    expect(screen.getByTestId("footer-faq")).toBeInTheDocument();
  });

  it("includes disclaimer text", () => {
    render(<Footer />);
    expect(
      screen.getByText(/educational information only/i)
    ).toBeInTheDocument();
  });
});

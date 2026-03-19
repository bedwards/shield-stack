import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import BlogIndex from "./page";

describe("Blog Index Page", () => {
  beforeEach(() => {
    render(<BlogIndex />);
  });

  it("renders blog title", () => {
    expect(screen.getByTestId("blog-title")).toBeInTheDocument();
    expect(screen.getByTestId("blog-title")).toHaveTextContent("Blog");
  });

  it("renders blog posts list", () => {
    expect(screen.getByTestId("blog-posts")).toBeInTheDocument();
  });

  it("renders all blog posts with links", () => {
    expect(
      screen.getByTestId("blog-post-what-is-employer-ghosting"),
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("blog-link-what-is-employer-ghosting"),
    ).toBeInTheDocument();
  });
});

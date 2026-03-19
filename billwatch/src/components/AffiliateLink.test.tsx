import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AffiliateLink from "./AffiliateLink";

describe("AffiliateLink", () => {
  it("renders link with correct href and data-testid", () => {
    render(
      <AffiliateLink slug="chooseenergy" referrer="/guides/texas">
        Switch providers
      </AffiliateLink>,
    );

    const link = screen.getByTestId("affiliate-link-chooseenergy");
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute(
      "href",
      "/api/affiliate/click?slug=chooseenergy&referrer=%2Fguides%2Ftexas",
    );
    expect(link).toHaveTextContent("Switch providers");
  });

  it("includes state parameter when provided", () => {
    render(
      <AffiliateLink slug="energysage" referrer="/guides/solar" state="CA">
        Get solar quotes
      </AffiliateLink>,
    );

    const link = screen.getByTestId("affiliate-link-energysage");
    const href = link.getAttribute("href")!;
    expect(href).toContain("state=CA");
  });

  it("omits state parameter when not provided", () => {
    render(
      <AffiliateLink slug="homedepot" referrer="/dashboard">
        Shop products
      </AffiliateLink>,
    );

    const link = screen.getByTestId("affiliate-link-homedepot");
    const href = link.getAttribute("href")!;
    expect(href).not.toContain("state=");
  });

  it("has rel=noopener noreferrer sponsored", () => {
    render(
      <AffiliateLink slug="sunpower" referrer="/guides/solar">
        Learn more
      </AffiliateLink>,
    );

    const link = screen.getByTestId("affiliate-link-sunpower");
    expect(link).toHaveAttribute("rel", "noopener noreferrer sponsored");
  });

  it("applies custom className", () => {
    render(
      <AffiliateLink
        slug="arcadia"
        referrer="/guides/community-solar"
        className="text-blue-500 underline"
      >
        Join Arcadia
      </AffiliateLink>,
    );

    const link = screen.getByTestId("affiliate-link-arcadia");
    expect(link).toHaveClass("text-blue-500", "underline");
  });
});

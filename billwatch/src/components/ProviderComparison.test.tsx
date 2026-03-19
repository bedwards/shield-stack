import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import ProviderComparison from "./ProviderComparison";

describe("ProviderComparison", () => {
  describe("deregulated state (TX)", () => {
    beforeEach(() => {
      render(<ProviderComparison stateCode="TX" referrer="/guides/texas" />);
    });

    it("renders the provider comparison section", () => {
      expect(screen.getByTestId("provider-comparison")).toBeInTheDocument();
    });

    it("renders the title", () => {
      expect(
        screen.getByTestId("provider-comparison-title"),
      ).toHaveTextContent("Switch and Save on Your Electric Bill");
    });

    it("renders cta-switch-provider", () => {
      expect(screen.getByTestId("cta-switch-provider")).toBeInTheDocument();
    });

    it("renders provider cards", () => {
      expect(screen.getByTestId("provider-list")).toBeInTheDocument();
      expect(
        screen.getByTestId("provider-card-tx-txu-energy"),
      ).toBeInTheDocument();
    });

    it("renders affiliate links not hardcoded URLs", () => {
      const links = screen
        .getByTestId("switching-partners")
        .querySelectorAll("a");
      for (const link of links) {
        expect(link.getAttribute("href")).toMatch(
          /^\/api\/affiliate\/click\?/,
        );
      }
    });

    it("shows fully deregulated message", () => {
      expect(
        screen.getByText(/fully deregulated electricity market/),
      ).toBeInTheDocument();
    });
  });

  describe("partially deregulated state (DC)", () => {
    beforeEach(() => {
      render(
        <ProviderComparison stateCode="DC" referrer="/guides/dc" />,
      );
    });

    it("renders the provider comparison section", () => {
      expect(screen.getByTestId("provider-comparison")).toBeInTheDocument();
    });

    it("shows partially deregulated message", () => {
      expect(
        screen.getByText(/partially deregulated electricity market/),
      ).toBeInTheDocument();
    });
  });

  describe("regulated state (CA)", () => {
    it("returns null — does not render", () => {
      const { container } = render(
        <ProviderComparison stateCode="CA" referrer="/guides/california" />,
      );
      expect(container.innerHTML).toBe("");
    });

    it("returns null for FL", () => {
      const { container } = render(
        <ProviderComparison stateCode="FL" referrer="/guides/florida" />,
      );
      expect(container.innerHTML).toBe("");
    });
  });

  describe("case insensitivity", () => {
    it("renders for lowercase state code", () => {
      render(
        <ProviderComparison stateCode="tx" referrer="/guides/texas" />,
      );
      expect(screen.getByTestId("provider-comparison")).toBeInTheDocument();
    });
  });
});

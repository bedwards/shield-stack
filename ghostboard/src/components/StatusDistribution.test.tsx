import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusDistribution from "./StatusDistribution";

describe("StatusDistribution", () => {
  describe("with data", () => {
    beforeEach(() => {
      render(
        <StatusDistribution
          distribution={{
            ghosted: 4,
            heard_back: 2,
            interviewed: 1,
            offered: 1,
            rejected: 2,
          }}
          totalReports={10}
        />,
      );
    });

    it("renders the distribution section", () => {
      expect(screen.getByTestId("status-distribution")).toBeInTheDocument();
    });

    it("renders bars for each status", () => {
      expect(screen.getByTestId("status-bar-ghosted")).toBeInTheDocument();
      expect(screen.getByTestId("status-bar-heard_back")).toBeInTheDocument();
      expect(screen.getByTestId("status-bar-interviewed")).toBeInTheDocument();
    });

    it("shows correct percentages", () => {
      expect(screen.getByTestId("status-bar-ghosted")).toHaveTextContent("4 (40%)");
    });
  });

  describe("with no reports", () => {
    it("renders nothing", () => {
      const { container } = render(
        <StatusDistribution distribution={{}} totalReports={0} />,
      );
      expect(container.firstChild).toBeNull();
    });
  });
});

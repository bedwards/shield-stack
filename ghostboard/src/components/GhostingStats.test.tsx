import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GhostingStats from "./GhostingStats";

describe("GhostingStats", () => {
  describe("when there are enough reports", () => {
    beforeEach(() => {
      render(
        <GhostingStats
          ghostingRate={45.5}
          avgResponseDays={12.3}
          interviewToOfferRatio={33.3}
          totalReports={25}
          hasEnoughReports={true}
        />,
      );
    });

    it("renders the stats panel", () => {
      expect(screen.getByTestId("stats-panel")).toBeInTheDocument();
    });

    it("displays ghosting rate", () => {
      expect(screen.getByTestId("stat-ghosting-rate-card")).toHaveTextContent("45.5%");
    });

    it("displays average response time", () => {
      expect(screen.getByTestId("stat-response-time-card")).toHaveTextContent("12.3d");
    });

    it("displays interview-to-offer ratio", () => {
      expect(screen.getByTestId("stat-offer-ratio-card")).toHaveTextContent("33.3%");
    });

    it("displays total reports", () => {
      expect(screen.getByTestId("stat-total-reports-card")).toHaveTextContent("25");
    });
  });

  describe("when there are not enough reports", () => {
    beforeEach(() => {
      render(
        <GhostingStats
          ghostingRate={null}
          avgResponseDays={null}
          interviewToOfferRatio={null}
          totalReports={3}
          hasEnoughReports={false}
        />,
      );
    });

    it("shows insufficient data message", () => {
      expect(screen.getByTestId("stats-insufficient")).toBeInTheDocument();
      expect(screen.getByTestId("stats-insufficient")).toHaveTextContent("3 reports");
    });

    it("does not render stats panel", () => {
      expect(screen.queryByTestId("stats-panel")).not.toBeInTheDocument();
    });
  });
});

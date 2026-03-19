import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import CompanyCard from "./CompanyCard";

describe("CompanyCard", () => {
  describe("with stats", () => {
    beforeEach(() => {
      render(
        <CompanyCard
          slug="amazon"
          name="Amazon"
          industry="Technology"
          headquarters="Seattle, WA"
          company_size="enterprise"
          stats={{
            total_reports: 25,
            ghosting_rate: 50,
            avg_response_days: 14,
            interview_to_offer_ratio: 33,
          }}
        />,
      );
    });

    it("renders company name", () => {
      expect(screen.getByTestId("company-name-amazon")).toHaveTextContent("Amazon");
    });

    it("renders industry", () => {
      expect(screen.getByTestId("company-industry-amazon")).toHaveTextContent("Technology");
    });

    it("renders location", () => {
      expect(screen.getByTestId("company-location-amazon")).toHaveTextContent("Seattle, WA");
    });

    it("renders ghosting rate", () => {
      expect(screen.getByTestId("company-stats-amazon")).toHaveTextContent("50%");
    });

    it("renders total reports", () => {
      expect(screen.getByTestId("company-stats-amazon")).toHaveTextContent("25 reports");
    });
  });

  describe("without enough stats", () => {
    beforeEach(() => {
      render(
        <CompanyCard
          slug="small-co"
          name="Small Co"
          industry={null}
          headquarters={null}
          company_size={null}
          stats={{ total_reports: 2, ghosting_rate: null, avg_response_days: null, interview_to_offer_ratio: null }}
        />,
      );
    });

    it("shows reports needed", () => {
      expect(screen.getByTestId("company-no-stats-small-co")).toHaveTextContent("2/5 reports");
    });
  });
});

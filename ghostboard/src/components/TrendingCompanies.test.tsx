import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrendingCompanies } from "./TrendingCompanies";

describe("TrendingCompanies", () => {
  it("renders placeholder when no companies", () => {
    render(<TrendingCompanies companies={[]} />);
    expect(screen.getByTestId("trending-section")).toBeInTheDocument();
    expect(screen.getByTestId("trending-placeholder")).toBeInTheDocument();
  });

  it("renders company list when companies provided", () => {
    const companies = [
      { slug: "acme-corp", name: "Acme Corp", ghostingRate: 0.42, totalReports: 15 },
      { slug: "test-inc", name: "Test Inc", ghostingRate: null, totalReports: 8 },
    ];
    render(<TrendingCompanies companies={companies} />);
    expect(screen.getByTestId("trending-list")).toBeInTheDocument();
    expect(screen.getByTestId("trending-acme-corp")).toBeInTheDocument();
    expect(screen.getByTestId("trending-test-inc")).toBeInTheDocument();
  });

  it("displays ghosting rate percentage", () => {
    const companies = [
      { slug: "acme", name: "Acme", ghostingRate: 0.42, totalReports: 10 },
    ];
    render(<TrendingCompanies companies={companies} />);
    expect(screen.getByText("42%")).toBeInTheDocument();
  });
});

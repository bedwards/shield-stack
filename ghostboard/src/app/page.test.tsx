import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock the data fetching functions
vi.mock("@/lib/companies", () => ({
  getTrendingCompanies: vi.fn().mockResolvedValue([]),
  getRecentReports: vi.fn().mockResolvedValue([]),
}));

// Must import after mocking
import Home from "./page";

describe("Home Page", () => {
  beforeEach(async () => {
    const Component = await Home();
    render(Component);
  });

  it("renders the hero section", () => {
    expect(screen.getByTestId("hero-title")).toBeInTheDocument();
    expect(screen.getByTestId("hero-subtitle")).toBeInTheDocument();
  });

  it("renders the search form", () => {
    expect(screen.getByTestId("search-form")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-button")).toBeInTheDocument();
  });

  it("renders the stats section", () => {
    expect(screen.getByTestId("stats-section")).toBeInTheDocument();
    expect(screen.getByTestId("stat-companies")).toBeInTheDocument();
    expect(screen.getByTestId("stat-reports")).toBeInTheDocument();
    expect(screen.getByTestId("stat-ghosting-rate")).toBeInTheDocument();
  });

  it("renders trending companies section", () => {
    expect(screen.getByTestId("trending-section")).toBeInTheDocument();
  });

  it("renders recent reports section", () => {
    expect(screen.getByTestId("recent-reports-section")).toBeInTheDocument();
  });

  it("renders the how-it-works section", () => {
    expect(screen.getByTestId("how-it-works-section")).toBeInTheDocument();
    expect(screen.getByTestId("step-search")).toBeInTheDocument();
    expect(screen.getByTestId("step-report")).toBeInTheDocument();
    expect(screen.getByTestId("step-decide")).toBeInTheDocument();
  });

  it("renders the CTA section with report button", () => {
    expect(screen.getByTestId("cta-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta-report-button")).toBeInTheDocument();
  });
});

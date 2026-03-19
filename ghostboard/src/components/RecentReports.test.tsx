import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentReports } from "./RecentReports";

describe("RecentReports", () => {
  it("renders empty state when no reports", () => {
    render(<RecentReports reports={[]} />);
    expect(screen.getByTestId("recent-reports-section")).toBeInTheDocument();
    expect(screen.getByTestId("recent-reports-cta")).toBeInTheDocument();
  });

  it("renders report list when reports provided", () => {
    const reports = [
      {
        id: "r1",
        status: "ghosted",
        role_level: "Senior",
        created_at: "2026-03-15",
        company: { name: "Test Corp", slug: "test-corp" },
      },
      {
        id: "r2",
        status: "interviewed",
        role_level: null,
        created_at: "2026-03-14",
        company: { name: "Other Inc", slug: "other-inc" },
      },
    ];
    render(<RecentReports reports={reports} />);
    expect(screen.getByTestId("recent-reports-list")).toBeInTheDocument();
    expect(screen.getByTestId("report-r1")).toBeInTheDocument();
    expect(screen.getByTestId("report-r2")).toBeInTheDocument();
    expect(screen.getByText("Ghosted")).toBeInTheDocument();
    expect(screen.getByText("Interviewed")).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import GhostingTrend from "./GhostingTrend";

describe("GhostingTrend", () => {
  it("renders nothing when all months have zero reports", () => {
    const { container } = render(<GhostingTrend reports={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("renders trend chart when reports exist", () => {
    const reports = [
      { status: "ghosted", created_at: new Date().toISOString() },
      { status: "heard_back", created_at: new Date().toISOString() },
      { status: "ghosted", created_at: new Date().toISOString() },
    ];

    render(<GhostingTrend reports={reports} />);
    expect(screen.getByTestId("ghosting-trend")).toBeInTheDocument();
    expect(screen.getByTestId("trend-chart")).toBeInTheDocument();
    expect(screen.getByText("Ghosting Rate Trend")).toBeInTheDocument();
    expect(screen.getByText("Last 6 months")).toBeInTheDocument();
  });

  it("renders 6 month bars", () => {
    const reports = [
      { status: "ghosted", created_at: new Date().toISOString() },
    ];

    render(<GhostingTrend reports={reports} />);
    const chart = screen.getByTestId("trend-chart");
    // Should have 6 children (one per month)
    expect(chart.children.length).toBe(6);
  });

  it("computes correct ghosting rate for current month", () => {
    const now = new Date();
    const reports = [
      { status: "ghosted", created_at: now.toISOString() },
      { status: "ghosted", created_at: now.toISOString() },
      { status: "heard_back", created_at: now.toISOString() },
      { status: "offered", created_at: now.toISOString() },
    ];

    render(<GhostingTrend reports={reports} />);
    // 2 out of 4 = 50%
    expect(screen.getByText("50%")).toBeInTheDocument();
  });

  it("renders color legend", () => {
    const reports = [
      { status: "ghosted", created_at: new Date().toISOString() },
    ];

    render(<GhostingTrend reports={reports} />);
    expect(screen.getByText("0-20% (Responsive)")).toBeInTheDocument();
    expect(screen.getByText("21-50% (Average)")).toBeInTheDocument();
    expect(screen.getByText("51%+ (High Ghosting)")).toBeInTheDocument();
  });
});

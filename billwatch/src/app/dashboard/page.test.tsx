import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

describe("Dashboard Page", () => {
  beforeEach(() => {
    render(<DashboardPage />);
  });

  it("renders the dashboard title", () => {
    expect(screen.getByTestId("dashboard-title")).toBeInTheDocument();
  });

  it("renders the demo banner", () => {
    expect(screen.getByTestId("dashboard-demo-banner")).toBeInTheDocument();
  });

  it("renders bill history section", () => {
    expect(screen.getByTestId("dashboard-bill-history")).toBeInTheDocument();
  });

  it("renders anomaly alerts section", () => {
    expect(screen.getByTestId("dashboard-anomaly-alerts")).toBeInTheDocument();
  });

  it("renders benchmarks section", () => {
    expect(screen.getByTestId("dashboard-benchmarks")).toBeInTheDocument();
  });

  it("renders benchmark bars", () => {
    expect(screen.getByTestId("benchmark-yours")).toBeInTheDocument();
    expect(screen.getByTestId("benchmark-neighborhood")).toBeInTheDocument();
    expect(screen.getByTestId("benchmark-state")).toBeInTheDocument();
    expect(screen.getByTestId("benchmark-national")).toBeInTheDocument();
  });

  it("renders anomaly items", () => {
    expect(screen.getByTestId("anomaly-1")).toBeInTheDocument();
    expect(screen.getByTestId("anomaly-2")).toBeInTheDocument();
  });

  it("renders upload CTA button", () => {
    expect(screen.getByTestId("dashboard-upload-cta")).toBeInTheDocument();
  });

  it("renders bottom CTA section", () => {
    expect(screen.getByTestId("dashboard-bottom-cta")).toBeInTheDocument();
  });
});

"use client";

interface TrendDataPoint {
  month: string;
  ghostingRate: number;
  totalReports: number;
}

interface GhostingTrendProps {
  reports: Array<{
    status: string;
    created_at: string;
  }>;
}

function computeMonthlyTrend(
  reports: GhostingTrendProps["reports"],
): TrendDataPoint[] {
  // Group reports by month (last 6 months)
  const now = new Date();
  const months: Map<string, { ghosted: number; total: number }> = new Map();

  // Initialize last 6 months
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    months.set(key, { ghosted: 0, total: 0 });
  }

  for (const report of reports) {
    const d = new Date(report.created_at);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const bucket = months.get(key);
    if (bucket) {
      bucket.total++;
      if (report.status === "ghosted") bucket.ghosted++;
    }
  }

  return Array.from(months.entries()).map(([key, val]) => {
    const [year, month] = key.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return {
      month: date.toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      }),
      ghostingRate: val.total > 0 ? Math.round((val.ghosted / val.total) * 100) : 0,
      totalReports: val.total,
    };
  });
}

export default function GhostingTrend({ reports }: GhostingTrendProps) {
  const trend = computeMonthlyTrend(reports);
  const maxRate = Math.max(...trend.map((t) => t.ghostingRate), 10);

  // If no data at all, don't render
  if (trend.every((t) => t.totalReports === 0)) {
    return null;
  }

  return (
    <div data-testid="ghosting-trend" className="rounded-lg border border-[var(--border)] p-6">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">
        Ghosting Rate Trend
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">Last 6 months</p>

      <div className="mt-4 flex items-end gap-2 h-40" data-testid="trend-chart">
        {trend.map((point) => {
          const height = maxRate > 0 ? (point.ghostingRate / maxRate) * 100 : 0;
          return (
            <div
              key={point.month}
              data-testid={`trend-bar-${point.month.replace(/\s/g, "-")}`}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <span className="text-xs text-[var(--muted)]">
                {point.ghostingRate > 0 ? `${point.ghostingRate}%` : ""}
              </span>
              <div className="w-full flex items-end justify-center" style={{ height: "100px" }}>
                <div
                  className={`w-full max-w-8 rounded-t transition-all ${
                    point.ghostingRate > 50
                      ? "bg-[var(--destructive)]"
                      : point.ghostingRate > 20
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--primary)]"
                  }`}
                  style={{
                    height: `${Math.max(height, point.totalReports > 0 ? 4 : 0)}%`,
                    minHeight: point.totalReports > 0 ? "4px" : "0px",
                  }}
                />
              </div>
              <span className="text-xs text-[var(--muted)]">{point.month}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex items-center gap-4 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--primary)]" />
          0-20% (Responsive)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--accent)]" />
          21-50% (Average)
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--destructive)]" />
          51%+ (High Ghosting)
        </span>
      </div>
    </div>
  );
}

interface StatusDistributionProps {
  distribution: Record<string, number>;
  totalReports: number;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  ghosted: { label: "Ghosted", color: "bg-[var(--destructive)]" },
  heard_back: { label: "Heard Back", color: "bg-green-500" },
  interviewed: { label: "Interviewed", color: "bg-blue-500" },
  offered: { label: "Offered", color: "bg-emerald-500" },
  rejected: { label: "Rejected", color: "bg-orange-500" },
  applied: { label: "Applied", color: "bg-gray-400" },
};

export default function StatusDistribution({ distribution, totalReports }: StatusDistributionProps) {
  if (totalReports === 0) return null;

  const entries = Object.entries(distribution)
    .map(([status, count]) => ({
      status,
      count,
      percentage: Math.round((count / totalReports) * 100),
      ...STATUS_LABELS[status],
    }))
    .sort((a, b) => b.count - a.count);

  return (
    <div data-testid="status-distribution" className="space-y-3">
      <h3 className="text-lg font-semibold text-[var(--foreground)]">Report Breakdown</h3>
      {entries.map(({ status, count, percentage, label, color }) => (
        <div key={status} data-testid={`status-bar-${status}`} className="space-y-1">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--foreground)]">{label || status}</span>
            <span className="text-[var(--muted)]">{count} ({percentage}%)</span>
          </div>
          <div className="h-2 rounded-full bg-[var(--secondary)]">
            <div
              className={`h-2 rounded-full ${color || "bg-gray-400"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

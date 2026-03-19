interface GhostingStatsProps {
  ghostingRate: number | null;
  avgResponseDays: number | null;
  interviewToOfferRatio: number | null;
  totalReports: number;
  hasEnoughReports: boolean;
}

function getGhostingColor(rate: number | null): string {
  if (rate === null) return "text-[var(--muted)]";
  if (rate <= 20) return "text-green-600 dark:text-green-400";
  if (rate <= 50) return "text-[var(--accent)]";
  return "text-[var(--destructive)]";
}

function getGhostingLabel(rate: number | null): string {
  if (rate === null) return "Not enough data";
  if (rate <= 20) return "Responsive";
  if (rate <= 40) return "Average";
  if (rate <= 60) return "Below Average";
  return "High Ghosting";
}

export default function GhostingStats({
  ghostingRate,
  avgResponseDays,
  interviewToOfferRatio,
  totalReports,
  hasEnoughReports,
}: GhostingStatsProps) {
  if (!hasEnoughReports) {
    return (
      <div data-testid="stats-insufficient" className="rounded-lg border border-[var(--border)] bg-[var(--secondary)] p-6 text-center">
        <p className="text-lg font-semibold text-[var(--foreground)]">Not Enough Data</p>
        <p className="mt-2 text-sm text-[var(--muted)]">
          This company needs at least 5 reports before stats are displayed.
          Currently has {totalReports} report{totalReports !== 1 ? "s" : ""}.
        </p>
      </div>
    );
  }

  return (
    <div data-testid="stats-panel" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div data-testid="stat-ghosting-rate-card" className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center">
        <p className={`text-3xl font-bold ${getGhostingColor(ghostingRate)}`}>
          {ghostingRate !== null ? `${ghostingRate}%` : "—"}
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Ghosting Rate</p>
        <p className={`mt-1 text-xs ${getGhostingColor(ghostingRate)}`}>
          {getGhostingLabel(ghostingRate)}
        </p>
      </div>

      <div data-testid="stat-response-time-card" className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center">
        <p className="text-3xl font-bold text-[var(--primary)]">
          {avgResponseDays !== null ? `${avgResponseDays}d` : "—"}
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Avg Response Time</p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {avgResponseDays !== null ? (avgResponseDays <= 7 ? "Fast" : avgResponseDays <= 14 ? "Moderate" : "Slow") : "No data"}
        </p>
      </div>

      <div data-testid="stat-offer-ratio-card" className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center">
        <p className="text-3xl font-bold text-[var(--primary)]">
          {interviewToOfferRatio !== null ? `${interviewToOfferRatio}%` : "—"}
        </p>
        <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Interview-to-Offer</p>
        <p className="mt-1 text-xs text-[var(--muted)]">Ratio</p>
      </div>

      <div data-testid="stat-total-reports-card" className="rounded-lg border border-[var(--border)] bg-[var(--background)] p-4 text-center">
        <p className="text-3xl font-bold text-[var(--foreground)]">{totalReports}</p>
        <p className="mt-1 text-sm font-medium text-[var(--foreground)]">Total Reports</p>
        <p className="mt-1 text-xs text-[var(--muted)]">From job seekers</p>
      </div>
    </div>
  );
}

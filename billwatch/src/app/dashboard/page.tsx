import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard — BillWatch",
  description:
    "View your utility bill history, anomaly alerts, and household benchmarks. Track electric, gas, and water costs in one place.",
};

/* ------------------------------------------------------------------ */
/*  Sample data for demo dashboard                                      */
/* ------------------------------------------------------------------ */

const SAMPLE_BILLS = [
  { month: "Oct 2025", amount: 142, usage: 980, rate: 14.49 },
  { month: "Nov 2025", amount: 158, usage: 1090, rate: 14.50 },
  { month: "Dec 2025", amount: 189, usage: 1302, rate: 14.52 },
  { month: "Jan 2026", amount: 201, usage: 1385, rate: 14.50 },
  { month: "Feb 2026", amount: 178, usage: 1227, rate: 14.51 },
  { month: "Mar 2026", amount: 152, usage: 1048, rate: 14.51 },
];

const SAMPLE_ANOMALIES = [
  {
    id: 1,
    date: "Jan 2026",
    type: "spike" as const,
    severity: "high" as const,
    message:
      "Your January bill of $201 was 27% higher than your 6-month average of $158.",
    suggestion:
      "This spike coincides with the cold snap in late January. Check for air leaks around windows and doors.",
  },
  {
    id: 2,
    date: "Dec 2025",
    type: "rate" as const,
    severity: "medium" as const,
    message:
      "Your electricity rate increased from 14.49¢ to 14.52¢/kWh in December.",
    suggestion:
      "Your utility applied a seasonal fuel cost adjustment. This is typical but worth monitoring.",
  },
];

const SAMPLE_BENCHMARKS = {
  yourAvg: 170,
  neighborhoodAvg: 155,
  stateAvg: 163,
  nationalAvg: 163,
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function BillHistorySection() {
  const maxAmount = Math.max(...SAMPLE_BILLS.map((b) => b.amount));

  return (
    <section data-testid="dashboard-bill-history" className="mb-8">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
        Bill History
      </h2>
      <div className="rounded-lg border border-[var(--border)] p-6">
        <div className="flex items-end gap-2 h-48">
          {SAMPLE_BILLS.map((bill) => (
            <div
              key={bill.month}
              data-testid={`bill-bar-${bill.month.replace(/\s/g, "-").toLowerCase()}`}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <span className="text-xs font-medium text-[var(--foreground)]">
                ${bill.amount}
              </span>
              <div
                className="w-full rounded-t bg-[var(--primary)] transition-all"
                style={{
                  height: `${(bill.amount / maxAmount) * 140}px`,
                }}
              />
              <span className="text-xs text-[var(--muted)] whitespace-nowrap">
                {bill.month.split(" ")[0]}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--border)] grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              ${Math.round(SAMPLE_BILLS.reduce((sum, b) => sum + b.amount, 0) / SAMPLE_BILLS.length)}
            </p>
            <p className="text-xs text-[var(--muted)]">Avg. monthly bill</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--primary)]">
              {Math.round(SAMPLE_BILLS.reduce((sum, b) => sum + b.usage, 0) / SAMPLE_BILLS.length)} kWh
            </p>
            <p className="text-xs text-[var(--muted)]">Avg. monthly usage</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-[var(--foreground)]">
              {(SAMPLE_BILLS.reduce((sum, b) => sum + b.rate, 0) / SAMPLE_BILLS.length).toFixed(2)}¢
            </p>
            <p className="text-xs text-[var(--muted)]">Avg. rate per kWh</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnomalyAlertsSection() {
  return (
    <section data-testid="dashboard-anomaly-alerts" className="mb-8">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
        Anomaly Alerts
      </h2>
      <div className="space-y-4">
        {SAMPLE_ANOMALIES.map((anomaly) => (
          <div
            key={anomaly.id}
            data-testid={`anomaly-${anomaly.id}`}
            className={`rounded-lg border p-5 ${
              anomaly.severity === "high"
                ? "border-[var(--anomaly)] bg-red-50 dark:bg-red-950/20"
                : "border-[var(--warning)] bg-amber-50 dark:bg-amber-950/20"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span
                  data-testid={`anomaly-severity-${anomaly.id}`}
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    anomaly.severity === "high"
                      ? "bg-[var(--anomaly)] text-white"
                      : "bg-[var(--warning)] text-white"
                  }`}
                >
                  {anomaly.severity === "high" ? "High" : "Medium"}
                </span>
                <span className="text-xs text-[var(--muted)]">
                  {anomaly.date}
                </span>
              </div>
              <span className="text-xs text-[var(--muted)] uppercase">
                {anomaly.type === "spike" ? "Usage Spike" : "Rate Change"}
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {anomaly.message}
            </p>
            <p className="mt-2 text-xs text-[var(--muted)] italic">
              {anomaly.suggestion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function BenchmarksSection() {
  const max = Math.max(
    SAMPLE_BENCHMARKS.yourAvg,
    SAMPLE_BENCHMARKS.neighborhoodAvg,
    SAMPLE_BENCHMARKS.stateAvg,
    SAMPLE_BENCHMARKS.nationalAvg,
  );

  const benchmarks = [
    {
      label: "Your Average",
      value: SAMPLE_BENCHMARKS.yourAvg,
      color: "bg-[var(--primary)]",
      testId: "benchmark-yours",
    },
    {
      label: "Neighborhood Avg.",
      value: SAMPLE_BENCHMARKS.neighborhoodAvg,
      color: "bg-[var(--success)]",
      testId: "benchmark-neighborhood",
    },
    {
      label: "State Average",
      value: SAMPLE_BENCHMARKS.stateAvg,
      color: "bg-[var(--warning)]",
      testId: "benchmark-state",
    },
    {
      label: "National Average",
      value: SAMPLE_BENCHMARKS.nationalAvg,
      color: "bg-[var(--muted)]",
      testId: "benchmark-national",
    },
  ];

  return (
    <section data-testid="dashboard-benchmarks" className="mb-8">
      <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">
        Household Benchmarks
      </h2>
      <div className="rounded-lg border border-[var(--border)] p-6">
        <div className="space-y-4">
          {benchmarks.map((b) => (
            <div key={b.testId} data-testid={b.testId}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[var(--foreground)]">
                  {b.label}
                </span>
                <span className="text-sm font-medium text-[var(--foreground)]">
                  ${b.value}/mo
                </span>
              </div>
              <div className="h-3 rounded-full bg-[var(--secondary)]">
                <div
                  className={`h-3 rounded-full ${b.color} transition-all`}
                  style={{ width: `${(b.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        {SAMPLE_BENCHMARKS.yourAvg > SAMPLE_BENCHMARKS.neighborhoodAvg && (
          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <p
              data-testid="benchmark-insight"
              className="text-sm text-[var(--anomaly)]"
            >
              Your average bill is $
              {SAMPLE_BENCHMARKS.yourAvg - SAMPLE_BENCHMARKS.neighborhoodAvg}
              /mo higher than your neighbors. Upload your latest bill to find out
              why.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page component                                                      */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  return (
    <div data-testid="dashboard-page" className="py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1
              data-testid="dashboard-title"
              className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]"
            >
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Track your utility bills, anomalies, and savings opportunities.
            </p>
          </div>
          <Link
            href="/upload"
            data-testid="dashboard-upload-cta"
            className="mt-4 sm:mt-0 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Upload New Bill
          </Link>
        </div>

        {/* Demo banner */}
        <div
          data-testid="dashboard-demo-banner"
          className="rounded-lg border border-[var(--primary)] bg-[var(--secondary)] p-4 mb-8"
        >
          <p className="text-sm text-[var(--foreground)]">
            <strong>Demo Mode</strong> — This is sample data showing what your
            dashboard will look like.{" "}
            <Link
              href="/upload"
              data-testid="demo-upload-link"
              className="text-[var(--primary)] underline hover:no-underline"
            >
              Upload your first bill
            </Link>{" "}
            to see your real data.
          </p>
        </div>

        {/* Dashboard content */}
        <BillHistorySection />
        <AnomalyAlertsSection />
        <BenchmarksSection />

        {/* Bottom CTA */}
        <div
          data-testid="dashboard-bottom-cta"
          className="rounded-lg bg-[var(--secondary)] border border-[var(--border)] p-6 text-center"
        >
          <h2 className="text-lg font-bold text-[var(--foreground)]">
            See Your Real Data
          </h2>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Upload your utility bills to get personalized anomaly detection,
            benchmarks, and savings tips.
          </p>
          <Link
            href="/upload"
            data-testid="dashboard-cta-upload"
            className="mt-4 inline-block rounded-lg bg-[var(--primary)] px-6 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] transition-colors"
          >
            Upload Your First Bill
          </Link>
        </div>
      </div>
    </div>
  );
}

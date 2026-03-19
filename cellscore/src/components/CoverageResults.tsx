"use client";

import type { MockCoverageResult } from "@/lib/mock-data";
import { signalStrengthPercent } from "@/lib/coverage";

interface CoverageResultsProps {
  carriers: MockCoverageResult[];
  address: string;
}

function signalColor(strength: string): string {
  switch (strength) {
    case "excellent": return "bg-green-500";
    case "good": return "bg-blue-500";
    case "fair": return "bg-yellow-500";
    case "poor": return "bg-red-500";
    default: return "bg-gray-400";
  }
}

export default function CoverageResults({ carriers, address }: CoverageResultsProps) {
  if (carriers.length === 0) {
    return (
      <div data-testid="coverage-no-data" className="text-center py-12 text-muted">
        <p>No coverage data available for this location yet.</p>
        <p className="text-sm mt-2">Coverage data is sourced from FCC reports and crowdsourced submissions.</p>
      </div>
    );
  }

  return (
    <div data-testid="coverage-results" className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground">
        Coverage at <span className="text-primary">{address}</span>
      </h2>
      <div className="grid gap-4">
        {carriers.map((carrier) => (
          <div
            key={carrier.carrier_slug}
            data-testid={`coverage-card-${carrier.carrier_slug}`}
            className="border border-border rounded-lg p-4 bg-background"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 data-testid={`carrier-name-${carrier.carrier_slug}`} className="font-semibold text-foreground">
                  {carrier.carrier_name}
                </h3>
                <span data-testid={`carrier-tech-${carrier.carrier_slug}`} className="text-sm text-muted">
                  {carrier.technology}
                </span>
              </div>
              <span
                data-testid={`signal-badge-${carrier.carrier_slug}`}
                className={`px-3 py-1 rounded-full text-sm font-medium text-white capitalize ${signalColor(carrier.signal_strength)}`}
              >
                {carrier.signal_strength}
              </span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm text-muted mb-1">
                <span>Signal Strength</span>
                <span>{carrier.signal_dbm} dBm</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  data-testid={`signal-bar-${carrier.carrier_slug}`}
                  className={`h-2 rounded-full ${signalColor(carrier.signal_strength)}`}
                  style={{ width: `${signalStrengthPercent(carrier.signal_dbm)}%` }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted">Download: </span>
                <span data-testid={`download-speed-${carrier.carrier_slug}`} className="font-medium text-foreground">
                  {carrier.download_mbps} Mbps
                </span>
              </div>
              <div>
                <span className="text-muted">Upload: </span>
                <span data-testid={`upload-speed-${carrier.carrier_slug}`} className="font-medium text-foreground">
                  {carrier.upload_mbps} Mbps
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

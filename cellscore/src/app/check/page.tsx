"use client";

import { useState } from "react";
import CoverageResults from "@/components/CoverageResults";
import type { MockCoverageResult } from "@/lib/mock-data";
import type { GeocodedLocation } from "@/lib/coverage";

interface CoverageState {
  loading: boolean;
  error: string | null;
  carriers: MockCoverageResult[] | null;
  location: GeocodedLocation | null;
}

export default function CheckCoveragePage() {
  const [address, setAddress] = useState("");
  const [state, setState] = useState<CoverageState>({
    loading: false,
    error: null,
    carriers: null,
    location: null,
  });

  async function handleCheck() {
    if (!address.trim()) return;

    setState({ loading: true, error: null, carriers: null, location: null });

    try {
      const response = await fetch("/api/coverage/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setState({ loading: false, error: data.error || "Coverage check failed", carriers: null, location: null });
        return;
      }

      setState({
        loading: false,
        error: null,
        carriers: data.carriers,
        location: data.location,
      });
    } catch {
      setState({ loading: false, error: "Network error. Please try again.", carriers: null, location: null });
    }
  }

  return (
    <div data-testid="check-page" className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 data-testid="check-title" className="text-3xl font-bold text-foreground mb-2">
        Check Coverage at Your Address
      </h1>
      <p className="text-muted mb-8">
        Enter your address to see real signal strength data for all carriers at your location.
      </p>

      <div data-testid="address-search" className="flex gap-3 mb-8">
        <input
          data-testid="address-input"
          type="text"
          placeholder="Enter your address (e.g., 123 Main St, New York, NY)"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCheck()}
          className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          data-testid="search-button"
          onClick={handleCheck}
          disabled={state.loading || !address.trim()}
          className="rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.loading ? "Checking..." : "Check Coverage"}
        </button>
      </div>

      {state.error && (
        <div data-testid="coverage-error" className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 mb-8 text-destructive">
          {state.error}
        </div>
      )}

      {state.carriers && state.location && (
        <CoverageResults carriers={state.carriers} address={state.location.formatted} />
      )}
    </div>
  );
}

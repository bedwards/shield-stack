/**
 * Deregulated electricity market helpers for BillWatch.
 *
 * Deregulated states allow consumers to choose their electricity supplier,
 * meaning they can shop for a cheaper rate instead of being locked into
 * the default utility rate.
 */

import { PROVIDERS, type Provider } from "./data";

/** Deregulation status for a state */
export type DeregulationStatus = "full" | "partial" | "none";

interface DeregulatedStateInfo {
  /** Two-letter state abbreviation */
  code: string;
  /** Full state name */
  name: string;
  /** Whether the state has full or partial deregulation */
  status: DeregulationStatus;
}

/**
 * All states with deregulated or partially deregulated electricity markets.
 *
 * Full: Consumers can freely choose their electricity supplier.
 * Partial: Some degree of choice, often limited to certain customer classes
 *          or regions within the state.
 */
export const DEREGULATED_STATES: readonly DeregulatedStateInfo[] = [
  // Fully deregulated
  { code: "TX", name: "Texas", status: "full" },
  { code: "CT", name: "Connecticut", status: "full" },
  { code: "DE", name: "Delaware", status: "full" },
  { code: "ME", name: "Maine", status: "full" },
  { code: "MD", name: "Maryland", status: "full" },
  { code: "NH", name: "New Hampshire", status: "full" },
  { code: "NJ", name: "New Jersey", status: "full" },
  { code: "NY", name: "New York", status: "full" },
  { code: "RI", name: "Rhode Island", status: "full" },
  { code: "IL", name: "Illinois", status: "full" },
  { code: "OH", name: "Ohio", status: "full" },
  { code: "PA", name: "Pennsylvania", status: "full" },
  { code: "MA", name: "Massachusetts", status: "full" },
  // Partially deregulated
  { code: "DC", name: "District of Columbia", status: "partial" },
  { code: "MI", name: "Michigan", status: "partial" },
  { code: "MT", name: "Montana", status: "partial" },
  { code: "NV", name: "Nevada", status: "partial" },
  { code: "OR", name: "Oregon", status: "partial" },
  { code: "VA", name: "Virginia", status: "partial" },
] as const;

/** Set for O(1) lookup */
const DEREGULATED_CODES = new Set(DEREGULATED_STATES.map((s) => s.code));

/**
 * Check whether a state has a deregulated (or partially deregulated)
 * electricity market.
 */
export function isDeregulatedState(stateCode: string): boolean {
  return DEREGULATED_CODES.has(stateCode.toUpperCase());
}

/**
 * Get the deregulation status for a state.
 * Returns "none" if the state is fully regulated.
 */
export function getDeregulationStatus(stateCode: string): DeregulationStatus {
  const upper = stateCode.toUpperCase();
  const info = DEREGULATED_STATES.find((s) => s.code === upper);
  return info?.status ?? "none";
}

/**
 * Get all providers that serve a specific state from the provider registry.
 * Includes both incumbent utilities and competitive retail providers.
 */
export function getProvidersForState(stateCode: string): Provider[] {
  const upper = stateCode.toUpperCase();
  return PROVIDERS.filter((p) => p.states_served.includes(upper));
}

/**
 * Get only deregulated-market providers for a specific state.
 */
export function getDeregulatedProvidersForState(
  stateCode: string,
): Provider[] {
  const upper = stateCode.toUpperCase();
  return PROVIDERS.filter(
    (p) => p.is_deregulated_market && p.states_served.includes(upper),
  );
}

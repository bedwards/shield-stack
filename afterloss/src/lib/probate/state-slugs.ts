/**
 * State slug utilities for programmatic SEO pages.
 *
 * Maps between URL-friendly slugs (e.g., "new-york") and state codes ("NY").
 * Used by /states/[state]/ routes for `generateStaticParams()` and data lookup.
 */

import { STATE_PROBATE_RULES, type StateProbateRule } from "./state-data";

/**
 * Convert a state name to a URL-friendly slug.
 * "New York" → "new-york", "District of Columbia" → "district-of-columbia"
 */
export function stateNameToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}

/**
 * Convert a URL slug back to a state code.
 * "new-york" → "NY", "district-of-columbia" → "DC"
 * Returns undefined if the slug doesn't match any state.
 */
export function slugToStateCode(slug: string): string | undefined {
  return SLUG_TO_STATE_MAP.get(slug);
}

/**
 * Get a state's probate rules by URL slug.
 * Returns undefined if the slug doesn't match any state.
 */
export function getStateBySlug(slug: string): StateProbateRule | undefined {
  const code = slugToStateCode(slug);
  if (!code) return undefined;
  return STATE_PROBATE_RULES.find((s) => s.stateCode === code);
}

/**
 * Get all state slugs for `generateStaticParams()`.
 */
export function getAllStateSlugs(): string[] {
  return STATE_PROBATE_RULES.map((s) => stateNameToSlug(s.stateName));
}

/** Map from URL slug → 2-letter state code */
const SLUG_TO_STATE_MAP: ReadonlyMap<string, string> = new Map(
  STATE_PROBATE_RULES.map((s) => [stateNameToSlug(s.stateName), s.stateCode]),
);

/**
 * Format a dollar amount for display. $208,850 → "$208,850"
 */
export function formatDollars(amount: number): string {
  return `$${amount.toLocaleString("en-US")}`;
}

/**
 * Get the current year at build time for SEO-fresh titles.
 * Safe for SSG — called at build time, not client-side.
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

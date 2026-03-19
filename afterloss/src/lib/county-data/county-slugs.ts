/**
 * County slug utilities for programmatic SEO pages.
 *
 * Maps between URL-friendly slugs (e.g., "los-angeles") and county data.
 * Used by /probate/[state]/[county]/ routes for `generateStaticParams()`
 * and data lookup.
 *
 * @see https://github.com/bedwards/shield-stack/issues/266
 */

import { COUNTY_DATA_PHASE1 } from "./counties-phase1";
import type { CountyData } from "./types";
import { stateNameToSlug } from "@/lib/probate/state-slugs";
import { STATE_PROBATE_RULES } from "@/lib/probate/state-data";

/**
 * Convert a county name to a URL-friendly slug.
 * "Los Angeles" -> "los-angeles", "St. Louis" -> "st-louis"
 */
export function countyNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/'/g, "")
    .replace(/\s+/g, "-");
}

/**
 * Get all county static params for `generateStaticParams()`.
 * Returns array of { state, county } tuples for SSG.
 */
export function getAllCountyParams(): { state: string; county: string }[] {
  return COUNTY_DATA_PHASE1.map((c) => {
    const stateRule = STATE_PROBATE_RULES.find(
      (s) => s.stateCode === c.state_code,
    );
    return {
      state: stateRule ? stateNameToSlug(stateRule.stateName) : c.state_code.toLowerCase(),
      county: countyNameToSlug(c.county_name),
    };
  });
}

/**
 * Get a county's data by state slug and county slug.
 * Returns undefined if no match.
 */
export function getCountyBySlug(
  stateSlug: string,
  countySlug: string,
): CountyData | undefined {
  const stateRule = STATE_PROBATE_RULES.find(
    (s) => stateNameToSlug(s.stateName) === stateSlug,
  );
  if (!stateRule) return undefined;

  return COUNTY_DATA_PHASE1.find(
    (c) =>
      c.state_code === stateRule.stateCode &&
      countyNameToSlug(c.county_name) === countySlug,
  );
}

/**
 * Get all counties in a given state (by state code).
 * Returns empty array if no counties match.
 */
export function getCountiesByState(stateCode: string): CountyData[] {
  return COUNTY_DATA_PHASE1.filter((c) => c.state_code === stateCode);
}

/**
 * Get all counties in a given state (by state slug).
 */
export function getCountiesByStateSlug(stateSlug: string): CountyData[] {
  const stateRule = STATE_PROBATE_RULES.find(
    (s) => stateNameToSlug(s.stateName) === stateSlug,
  );
  if (!stateRule) return [];
  return getCountiesByState(stateRule.stateCode);
}

/**
 * Get the total number of Phase 1 counties.
 */
export function getCountyCount(): number {
  return COUNTY_DATA_PHASE1.length;
}

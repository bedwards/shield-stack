/**
 * County-level probate court data for programmatic SEO pages.
 *
 * Each record represents one US county's probate court with contact info,
 * filing fees, and estimated timelines. Used by /probate/[state]/[county]/
 * routes for `generateStaticParams()` and page rendering.
 *
 * Phase 1: Top 200 counties by population (~50% of US population).
 * Phase 2: Expand to all 3,200+ counties.
 *
 * @see https://github.com/bedwards/shield-stack/issues/266
 */

/**
 * Probate court data for a single US county.
 */
export interface CountyData {
  /** County name without "County" suffix (e.g. "Los Angeles", "Cook") */
  county_name: string;

  /** 2-letter USPS state code (e.g. "CA", "IL") */
  state_code: string;

  /** 5-digit FIPS county code (e.g. "06037" for Los Angeles, CA) */
  fips_code: string;

  /** Official name of the probate court (e.g. "Los Angeles County Superior Court — Probate Division") */
  probate_court_name: string;

  /** Street address of the probate court */
  court_address: string;

  /** Phone number of the probate court (e.g. "(213) 830-0803") */
  court_phone: string;

  /** URL of the county probate court website, or null if not available */
  court_website: string | null;

  /** Court filing fees in dollars, or null if not publicly listed */
  filing_fees: number | null;

  /** Estimated probate timeline in months, or null if unknown */
  estimated_timeline: string | null;

  /** 2020 Census population for prioritization and display */
  population: number;

  /** ISO 8601 date when this record was last verified (e.g. "2026-03-19") */
  last_verified_date: string;
}

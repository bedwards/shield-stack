/**
 * In-memory click log — interim until database is available (see #274).
 * Each entry records timestamp, slug, referrer, state, and user_agent.
 */

export interface AffiliateClick {
  /** ISO 8601 timestamp */
  timestamp: string;
  slug: string;
  referrer: string | null;
  state: string | null;
  user_agent: string | null;
}

const clickLog: AffiliateClick[] = [];

/** Record a click. */
export function logClick(click: AffiliateClick): void {
  clickLog.push(click);
}

/** Returns a shallow copy of the click log. */
export function getClickLog(): AffiliateClick[] {
  return [...clickLog];
}

/** Clears the click log. */
export function clearClickLog(): void {
  clickLog.length = 0;
}

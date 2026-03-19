"use client";

import type { ReactNode } from "react";

interface AffiliateLinkProps {
  /** Partner slug — must match a registered partner in partners.ts */
  slug: string;
  /** Page that triggered the click, for attribution (e.g., "/guides/texas") */
  referrer: string;
  /** Optional state code for geo-targeting */
  state?: string;
  /** Link content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Routes all affiliate clicks through /api/affiliate/click for tracking.
 *
 * Usage:
 * ```tsx
 * <AffiliateLink slug="chooseenergy" referrer="/guides/texas" state="TX">
 *   Switch providers now
 * </AffiliateLink>
 * ```
 */
export default function AffiliateLink({
  slug,
  referrer,
  state,
  children,
  className,
}: AffiliateLinkProps) {
  const params = new URLSearchParams({ slug, referrer });
  if (state) {
    params.set("state", state);
  }
  const href = `/api/affiliate/click?${params.toString()}`;

  return (
    <a
      href={href}
      data-testid={`affiliate-link-${slug}`}
      className={className}
      rel="noopener noreferrer sponsored"
    >
      {children}
    </a>
  );
}

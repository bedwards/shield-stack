"use client";

import { trackAndRedirect } from "@/lib/affiliate/track-click";

interface AffiliateLinkProps {
  slug: string;
  checklistStepId?: string;
  caseId?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Tracked affiliate link component.
 *
 * All affiliate links MUST use this component — never link directly
 * to an affiliate URL. Clicks are logged server-side via /api/affiliate/click
 * before the user is redirected.
 *
 * Renders as a button styled as a link. Opens in a new tab.
 */
export function AffiliateLink({
  slug,
  checklistStepId,
  caseId,
  className,
  children,
}: AffiliateLinkProps) {
  const handleClick = () => {
    trackAndRedirect({
      slug,
      checklistStepId,
      caseId,
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className}
      data-testid={`affiliate-link-${slug}`}
      aria-label={`Visit affiliate partner: ${slug}`}
    >
      {children}
    </button>
  );
}

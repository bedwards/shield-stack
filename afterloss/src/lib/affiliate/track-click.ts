/**
 * Client-side affiliate click tracking utility.
 *
 * Logs click to /api/affiliate/click before redirecting the user.
 * All affiliate links MUST use this function — never link directly
 * to an affiliate URL from client-side code.
 */

interface TrackClickParams {
  slug: string;
  referrerPage?: string;
  checklistStepId?: string;
  caseId?: string;
}

interface TrackClickResult {
  redirect_url: string;
}

/**
 * Track an affiliate click and get the redirect URL.
 * Opens the redirect URL in a new tab after logging.
 *
 * @returns The redirect URL, or null if tracking failed.
 */
export async function trackAffiliateClick(
  params: TrackClickParams
): Promise<string | null> {
  try {
    const response = await fetch("/api/affiliate/click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: params.slug,
        referrer_page: params.referrerPage || window.location.pathname,
        checklist_step_id: params.checklistStepId,
        case_id: params.caseId,
      }),
    });

    if (!response.ok) {
      console.error("Affiliate click tracking failed:", response.status);
      return null;
    }

    const data: TrackClickResult = await response.json();
    return data.redirect_url;
  } catch (error) {
    console.error("Affiliate click tracking error:", error);
    return null;
  }
}

/**
 * Track a click and open the affiliate URL in a new tab.
 * Falls back gracefully if tracking fails.
 */
export async function trackAndRedirect(
  params: TrackClickParams
): Promise<void> {
  const url = await trackAffiliateClick(params);
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

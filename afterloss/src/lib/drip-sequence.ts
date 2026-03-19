/**
 * Gentle drip email sequence for AfterLoss.
 *
 * This defines the 5-email sequence sent to subscribers who aren't ready
 * to start the checklist. The tone is empathetic, never pushy, and respects
 * that recipients are grieving.
 *
 * Sending is initially manual via the Resend dashboard. Automation will be
 * added later. Each email includes an unsubscribe link (CAN-SPAM compliance).
 */

export interface DripEmail {
  /** Zero-based step index */
  step: number;
  /** Days after subscription to send */
  delayDays: number;
  /** Email subject line */
  subject: string;
  /** Brief description of the email's purpose */
  purpose: string;
  /** Internal link to include in the email */
  ctaUrl: string;
  /** CTA button text */
  ctaText: string;
  /** Affiliate partner slug to reference, if any */
  affiliateSlug?: string;
}

export const DRIP_SEQUENCE: DripEmail[] = [
  {
    step: 0,
    delayDays: 0,
    subject: "Welcome — here's what AfterLoss can help with",
    purpose:
      "Gentle welcome. Introduce what AfterLoss offers without pressure to start.",
    ctaUrl: "/onboard",
    ctaText: "See the checklist when you're ready",
  },
  {
    step: 1,
    delayDays: 3,
    subject: "The first week: what matters most",
    purpose:
      "Link to the 2026 guide. Focus on the most time-sensitive tasks without creating anxiety.",
    ctaUrl: "/guides/what-to-do-when-someone-dies-checklist",
    ctaText: "Read the first-week guide",
  },
  {
    step: 2,
    delayDays: 7,
    subject: "Protecting your loved one's identity",
    purpose:
      "Link to identity theft prevention guide. Contextual Aura affiliate recommendation.",
    ctaUrl: "/guides/protect-identity-after-death-2026",
    ctaText: "Learn how to protect their identity",
    affiliateSlug: "aura",
  },
  {
    step: 3,
    delayDays: 14,
    subject: "Taking care of yourself matters too",
    purpose:
      "Link to grief counseling resource page. Contextual Talkspace affiliate recommendation.",
    ctaUrl: "/resources/grief-counseling",
    ctaText: "Explore grief support options",
    affiliateSlug: "talkspace",
  },
  {
    step: 4,
    delayDays: 30,
    subject: "Financial steps for the months ahead",
    purpose:
      "Link to life insurance resource page. Contextual Policygenius affiliate recommendation.",
    ctaUrl: "/resources/life-insurance-after-loss",
    ctaText: "Review your financial protection",
    affiliateSlug: "policygenius",
  },
];

/**
 * Returns the next drip email to send for a subscriber at a given step,
 * or null if the sequence is complete.
 */
export function getNextDripEmail(currentStep: number): DripEmail | null {
  return DRIP_SEQUENCE.find((e) => e.step === currentStep) ?? null;
}

/**
 * Returns whether a subscriber is eligible for the next drip email
 * based on their subscription date and current step.
 */
export function isDripEligible(
  subscribedAt: Date,
  currentStep: number,
  now: Date = new Date()
): boolean {
  const email = getNextDripEmail(currentStep);
  if (!email) return false;

  const eligibleDate = new Date(subscribedAt);
  eligibleDate.setDate(eligibleDate.getDate() + email.delayDays);

  return now >= eligibleDate;
}

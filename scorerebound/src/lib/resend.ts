import { Resend } from "resend";

/**
 * Check if Resend email service is configured.
 */
export function isResendConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

/**
 * Create a Resend client for sending transactional emails.
 * @remarks Server-side only — do not import in client components.
 */
export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

/**
 * Get the "from" address for outbound emails.
 */
export function getFromEmail(): string {
  return (
    process.env.RESEND_FROM_EMAIL ||
    "ScoreRebound <noreply@scorerebound.com>"
  );
}

/**
 * Get the site URL for constructing absolute links in emails.
 */
export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

/**
 * Subscription cancellation template types.
 * Matches the subscription_templates table schema (post-migration #256).
 */

export type SubscriptionCategory =
  | "streaming"
  | "utility"
  | "insurance"
  | "membership"
  | "financial"
  | "social_media"
  | "email"
  | "cloud_storage"
  | "government";

export type CancellationMethod = "online" | "phone" | "mail" | "email";

export type DifficultyRating = "easy" | "medium" | "hard";

export interface SubscriptionTemplate {
  id: number;
  service_name: string;
  category: SubscriptionCategory;
  cancellation_method: CancellationMethod;
  cancellation_contact: string | null;
  template_text: string | null;
  required_documents: string[];
  estimated_processing_time: string | null;
  difficulty_rating: DifficultyRating | null;
  /** ISO 8601 date string */
  last_verified_date: string | null;
  direct_url: string | null;
}

/** All valid subscription categories */
export const SUBSCRIPTION_CATEGORIES: readonly SubscriptionCategory[] = [
  "streaming",
  "social_media",
  "financial",
  "insurance",
  "utility",
  "government",
  "membership",
  "email",
  "cloud_storage",
] as const;

/** Minimum required records per category (from issue #256) */
export const CATEGORY_MINIMUMS: Partial<Record<SubscriptionCategory, number>> =
  {
    streaming: 10,
    social_media: 6,
    financial: 10,
    insurance: 5,
    utility: 5,
    government: 5,
    membership: 10,
  };

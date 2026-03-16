/**
 * Shared type definitions for {{PRODUCT_NAME}}.
 */

/** Common status type for records */
export type Status = "active" | "inactive" | "pending" | "archived";

/** Base record with common fields */
export interface BaseRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
}

/** User profile */
export interface UserProfile extends BaseRecord {
  email: string;
  displayName: string | null;
  subscriptionTier: "free" | "premium";
}

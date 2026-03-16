/**
 * Shared type definitions for RecallRadar.
 */

/** Recall status after scanning a product */
export type RecallStatus = "safe" | "recalled" | "unknown";

/** Subscription tiers */
export type SubscriptionTier = "free" | "premium" | "facility";

/** Barcode format types supported by the scanner */
export type BarcodeFormat = "UPC-A" | "UPC-E" | "EAN-13" | "EAN-8";

/** A product identified by its barcode */
export interface Product {
  id: string;
  upc: string;
  name: string | null;
  brand: string | null;
  category: string | null;
  imageUrl: string | null;
  firstScannedAt: string;
}

/** A CPSC recall record */
export interface Recall {
  id: string;
  cpscRecallId: string;
  title: string;
  description: string | null;
  remedy: string | null;
  productName: string | null;
  manufacturer: string | null;
  publishedDate: string | null;
  hazard: string | null;
  images: string[];
  syncedAt: string;
}

/** Link between a recall and a product UPC */
export interface RecallProduct {
  id: string;
  recallId: string;
  productId: string | null;
  upc: string;
}

/** A product saved to a user's inventory */
export interface InventoryItem {
  id: string;
  userId: string;
  productId: string;
  nickname: string | null;
  room: string | null;
  notes: string | null;
  addedAt: string;
}

/** A scan history entry */
export interface ScanRecord {
  id: string;
  userId: string | null;
  upc: string;
  productId: string | null;
  recallStatus: RecallStatus;
  scannedAt: string;
}

/** A web push subscription */
export interface PushSubscription {
  id: string;
  userId: string;
  endpoint: string;
  keysP256dh: string;
  keysAuth: string;
  createdAt: string;
}

/** An alert sent to a user */
export interface Alert {
  id: string;
  userId: string;
  recallId: string;
  productId: string;
  sentAt: string;
  readAt: string | null;
}

/** Result from a scan/recall lookup */
export interface ScanResult {
  upc: string;
  status: RecallStatus;
  product: Product | null;
  recalls: Recall[];
}

/** User profile */
export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId: string | null;
  createdAt: string;
}

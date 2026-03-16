/**
 * Shared type definitions for ReceiptGuard.
 */

/** Subscription tier for users */
export type SubscriptionTier = "free" | "premium" | "family";

/** Overcharge claim status */
export type ClaimStatus = "pending" | "submitted" | "approved" | "denied";

/** A user profile */
export interface UserProfile {
  id: string;
  email: string;
  displayName: string | null;
  subscriptionTier: SubscriptionTier;
  stripeCustomerId: string | null;
  totalSavings: number;
  createdAt: string;
}

/** A scanned receipt */
export interface Receipt {
  id: string;
  userId: string;
  storeId: string | null;
  imagePath: string | null;
  ocrText: string | null;
  receiptDate: string | null;
  subtotal: number | null;
  tax: number | null;
  total: number | null;
  itemCount: number;
  overchargeCount: number;
  overchargeTotal: number;
  scannedAt: string;
}

/** An extracted line item from a receipt */
export interface ReceiptItem {
  id: string;
  receiptId: string;
  rawText: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxFlag: boolean;
  category: string | null;
  upc: string | null;
  isOvercharge: boolean;
  expectedPrice: number | null;
  overchargeAmount: number | null;
}

/** A store location */
export interface Store {
  id: string;
  chainName: string;
  storeNumber: string | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  lat: number | null;
  lng: number | null;
  scannerGuaranteePolicy: string | null;
  createdAt: string;
}

/** A crowdsourced price entry */
export interface StorePrice {
  id: string;
  storeId: string;
  productName: string;
  upc: string | null;
  price: number;
  unit: string | null;
  source: string;
  observedDate: string;
  reportedByCount: number;
}

/** An overcharge claim */
export interface OverchargeClaim {
  id: string;
  userId: string;
  receiptId: string;
  receiptItemId: string;
  storeId: string;
  claimAmount: number;
  status: ClaimStatus;
  submittedDate: string | null;
  resolvedDate: string | null;
  resolutionNotes: string | null;
}

/** A savings log entry */
export interface SavingsEntry {
  id: string;
  userId: string;
  receiptId: string;
  amountSaved: number;
  source: string;
  loggedAt: string;
}

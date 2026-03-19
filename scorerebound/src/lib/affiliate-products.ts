/**
 * Affiliate product catalog — re-exports from affiliates.ts
 *
 * This module provides the public API for affiliate product recommendations.
 * The issue spec names this file explicitly; the implementation lives in affiliates.ts.
 */
export type { AffiliateProduct, AffiliateCategory } from "./affiliates";
export {
  AFFILIATE_PRODUCTS,
  getAffiliateRecommendations,
  getAffiliateProduct,
  getAffiliateUrl,
  getAffiliateSlugs,
} from "./affiliates";

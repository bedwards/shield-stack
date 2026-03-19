/**
 * Plan filtering, sorting, and comparison logic.
 */
import type { MockPlan } from "./mock-data";

export interface PlanFilters {
  carrier?: string;
  minPrice?: number;
  maxPrice?: number;
  minData?: number;
  features?: string[];
  sort?: "price_asc" | "price_desc" | "data_desc" | "carrier";
}

export function filterPlans(plans: MockPlan[], filters: PlanFilters): MockPlan[] {
  let result = [...plans];

  if (filters.carrier) {
    result = result.filter((p) => p.carrier_slug === filters.carrier);
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.monthly_price >= filters.minPrice!);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.monthly_price <= filters.maxPrice!);
  }

  if (filters.minData !== undefined) {
    result = result.filter((p) => p.data_limit_gb === null || p.data_limit_gb >= filters.minData!);
  }

  if (filters.features && filters.features.length > 0) {
    result = result.filter((p) => {
      return filters.features!.every((feat) => {
        const val = p.features[feat];
        return val === true || (typeof val === "string" && val.length > 0);
      });
    });
  }

  return sortPlans(result, filters.sort);
}

export function sortPlans(plans: MockPlan[], sort?: PlanFilters["sort"]): MockPlan[] {
  const sorted = [...plans];

  switch (sort) {
    case "price_asc":
      sorted.sort((a, b) => a.monthly_price - b.monthly_price);
      break;
    case "price_desc":
      sorted.sort((a, b) => b.monthly_price - a.monthly_price);
      break;
    case "data_desc":
      sorted.sort((a, b) => {
        const aData = a.data_limit_gb ?? Infinity;
        const bData = b.data_limit_gb ?? Infinity;
        return bData - aData;
      });
      break;
    case "carrier":
      sorted.sort((a, b) => a.carrier_name.localeCompare(b.carrier_name));
      break;
    default:
      sorted.sort((a, b) => a.monthly_price - b.monthly_price);
      break;
  }

  return sorted;
}

export function formatDataLimit(gb: number | null): string {
  if (gb === null) return "Unlimited";
  return `${gb} GB`;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`;
}

export function formatHotspot(gb: number | null): string {
  if (gb === null) return "Unlimited";
  if (gb === 0) return "None";
  return `${gb} GB`;
}

export function getFeatureLabels(features: Record<string, boolean | string | undefined>): string[] {
  const labels: string[] = [];
  if (features.five_g) labels.push("5G");
  if (features.five_g_plus || features.five_g_uw) labels.push("5G Ultra");
  if (features.wifi_calling) labels.push("Wi-Fi Calling");
  if (features.international) labels.push("International");
  if (features.hotspot) labels.push("Hotspot");
  if (features.streaming_perks && typeof features.streaming_perks === "string") {
    labels.push(features.streaming_perks);
  }
  if (features.contract_required === false) labels.push("No Contract");
  return labels;
}

export const AVAILABLE_CARRIERS = [
  { slug: "att", name: "AT&T" },
  { slug: "verizon", name: "Verizon" },
  { slug: "tmobile", name: "T-Mobile" },
  { slug: "mint-mobile", name: "Mint Mobile" },
  { slug: "visible", name: "Visible" },
  { slug: "cricket", name: "Cricket Wireless" },
  { slug: "us-mobile", name: "US Mobile" },
  { slug: "google-fi", name: "Google Fi" },
  { slug: "boost-mobile", name: "Boost Mobile" },
  { slug: "metro", name: "Metro by T-Mobile" },
  { slug: "straight-talk", name: "Straight Talk" },
  { slug: "consumer-cellular", name: "Consumer Cellular" },
  { slug: "tello", name: "Tello" },
  { slug: "xfinity-mobile", name: "Xfinity Mobile" },
  { slug: "spectrum-mobile", name: "Spectrum Mobile" },
  { slug: "total-by-verizon", name: "Total by Verizon" },
];

export const FILTERABLE_FEATURES = [
  { key: "five_g", label: "5G" },
  { key: "hotspot", label: "Hotspot" },
  { key: "international", label: "International" },
  { key: "wifi_calling", label: "Wi-Fi Calling" },
];

/**
 * Maps raw Supabase plan+carrier join results to the MockPlan shape
 * used across the application.
 */
import type { MockPlan } from "./mock-data";

interface SupabasePlanRow {
  id: string;
  carrier_id: string;
  plan_name: string;
  monthly_price: number | string;
  data_limit_gb: number | string | null;
  throttle_speed_after: string | null;
  hotspot_gb: number | string | null;
  num_lines_min: number;
  num_lines_max: number | null;
  features: Record<string, boolean | string | undefined>;
  data_priority_level: string | null;
  affiliate_url: string | null;
  last_verified_at: string;
  carriers: {
    name: string;
    slug: string;
    affiliate_url: string | null;
  };
}

export function mapSupabasePlanRow(row: SupabasePlanRow): MockPlan {
  return {
    id: row.id,
    carrier_id: row.carrier_id,
    carrier_name: row.carriers.name,
    carrier_slug: row.carriers.slug,
    plan_name: row.plan_name,
    monthly_price: Number(row.monthly_price),
    data_limit_gb: row.data_limit_gb ? Number(row.data_limit_gb) : null,
    throttle_speed_after: row.throttle_speed_after,
    hotspot_gb: row.hotspot_gb ? Number(row.hotspot_gb) : null,
    num_lines_min: row.num_lines_min,
    num_lines_max: row.num_lines_max,
    features: row.features || {},
    data_priority_level: row.data_priority_level,
    affiliate_url: row.affiliate_url || row.carriers.affiliate_url,
    last_verified_at: row.last_verified_at,
  };
}

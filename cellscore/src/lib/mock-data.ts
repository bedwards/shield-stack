/**
 * Mock data for TEST_MODE=true — bypasses Mapbox and Supabase with deterministic data.
 */

export interface MockCarrier {
  id: string;
  name: string;
  slug: string;
  type: "mno" | "mvno";
  parent_carrier_id: string | null;
  website: string;
  affiliate_url: string | null;
}

export interface MockPlan {
  id: string;
  carrier_id: string;
  carrier_name: string;
  carrier_slug: string;
  plan_name: string;
  monthly_price: number;
  data_limit_gb: number | null;
  throttle_speed_after: string | null;
  hotspot_gb: number | null;
  num_lines_min: number;
  num_lines_max: number | null;
  features: Record<string, boolean | string | undefined>;
  data_priority_level: string | null;
  affiliate_url: string | null;
  last_verified_at: string;
}

export interface MockCoverageResult {
  carrier_name: string;
  carrier_slug: string;
  technology: string;
  signal_strength: "excellent" | "good" | "fair" | "poor";
  signal_dbm: number;
  download_mbps: number;
  upload_mbps: number;
  has_5g: boolean;
}

export const MOCK_CARRIERS: MockCarrier[] = [
  { id: "c-att", name: "AT&T", slug: "att", type: "mno", parent_carrier_id: null, website: "https://www.att.com", affiliate_url: null },
  { id: "c-verizon", name: "Verizon", slug: "verizon", type: "mno", parent_carrier_id: null, website: "https://www.verizon.com", affiliate_url: null },
  { id: "c-tmobile", name: "T-Mobile", slug: "tmobile", type: "mno", parent_carrier_id: null, website: "https://www.t-mobile.com", affiliate_url: null },
  { id: "c-mint", name: "Mint Mobile", slug: "mint-mobile", type: "mvno", parent_carrier_id: "c-tmobile", website: "https://www.mintmobile.com", affiliate_url: "https://www.mintmobile.com/?utm_source=cellscore" },
  { id: "c-visible", name: "Visible", slug: "visible", type: "mvno", parent_carrier_id: "c-verizon", website: "https://www.visible.com", affiliate_url: "https://www.visible.com/?utm_source=cellscore" },
  { id: "c-cricket", name: "Cricket Wireless", slug: "cricket", type: "mvno", parent_carrier_id: "c-att", website: "https://www.cricketwireless.com", affiliate_url: "https://www.cricketwireless.com/?utm_source=cellscore" },
];

export const MOCK_PLANS: MockPlan[] = [
  {
    id: "p-att-value", carrier_id: "c-att", carrier_name: "AT&T", carrier_slug: "att",
    plan_name: "Value Plus", monthly_price: 50, data_limit_gb: null, throttle_speed_after: "1 Mbps after deprioritization",
    hotspot_gb: 5, num_lines_min: 1, num_lines_max: 5,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: true, streaming_quality: "SD" },
    data_priority_level: "QCI 9", affiliate_url: null, last_verified_at: "2026-03-15",
  },
  {
    id: "p-att-premium", carrier_id: "c-att", carrier_name: "AT&T", carrier_slug: "att",
    plan_name: "Unlimited Premium PL", monthly_price: 85.99, data_limit_gb: null, throttle_speed_after: null,
    hotspot_gb: 60, num_lines_min: 1, num_lines_max: 5,
    features: { five_g: true, five_g_plus: true, wifi_calling: true, international: true, hotspot: true, streaming_quality: "4K" },
    data_priority_level: "QCI 7", affiliate_url: null, last_verified_at: "2026-03-15",
  },
  {
    id: "p-verizon-welcome", carrier_id: "c-verizon", carrier_name: "Verizon", carrier_slug: "verizon",
    plan_name: "Unlimited Welcome", monthly_price: 65, data_limit_gb: null, throttle_speed_after: "1 Mbps after deprioritization",
    hotspot_gb: 0, num_lines_min: 1, num_lines_max: 5,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: false, streaming_quality: "SD" },
    data_priority_level: "QCI 9", affiliate_url: null, last_verified_at: "2026-03-15",
  },
  {
    id: "p-verizon-ultimate", carrier_id: "c-verizon", carrier_name: "Verizon", carrier_slug: "verizon",
    plan_name: "Unlimited Ultimate", monthly_price: 90, data_limit_gb: null, throttle_speed_after: null,
    hotspot_gb: 60, num_lines_min: 1, num_lines_max: 5,
    features: { five_g: true, five_g_uw: true, wifi_calling: true, international: true, hotspot: true, streaming_quality: "4K" },
    data_priority_level: "QCI 7", affiliate_url: null, last_verified_at: "2026-03-15",
  },
  {
    id: "p-tmobile-go5g", carrier_id: "c-tmobile", carrier_name: "T-Mobile", carrier_slug: "tmobile",
    plan_name: "Go5G", monthly_price: 75, data_limit_gb: null, throttle_speed_after: "1 Mbps after 100GB",
    hotspot_gb: 15, num_lines_min: 1, num_lines_max: 6,
    features: { five_g: true, wifi_calling: true, international: true, hotspot: true, streaming_quality: "HD" },
    data_priority_level: "QCI 6", affiliate_url: null, last_verified_at: "2026-03-15",
  },
  {
    id: "p-mint-5gb", carrier_id: "c-mint", carrier_name: "Mint Mobile", carrier_slug: "mint-mobile",
    plan_name: "5GB", monthly_price: 15, data_limit_gb: 5, throttle_speed_after: "128 kbps after 5GB",
    hotspot_gb: 5, num_lines_min: 1, num_lines_max: 1,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: true, contract_required: false, annual_billing: true },
    data_priority_level: "QCI 9", affiliate_url: "https://www.mintmobile.com/plans/?utm_source=cellscore", last_verified_at: "2026-03-15",
  },
  {
    id: "p-mint-unlimited", carrier_id: "c-mint", carrier_name: "Mint Mobile", carrier_slug: "mint-mobile",
    plan_name: "Unlimited", monthly_price: 30, data_limit_gb: null, throttle_speed_after: "128 kbps after 40GB",
    hotspot_gb: 10, num_lines_min: 1, num_lines_max: 1,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: true, contract_required: false, annual_billing: true },
    data_priority_level: "QCI 9", affiliate_url: "https://www.mintmobile.com/plans/?utm_source=cellscore", last_verified_at: "2026-03-15",
  },
  {
    id: "p-visible-base", carrier_id: "c-visible", carrier_name: "Visible", carrier_slug: "visible",
    plan_name: "Visible", monthly_price: 25, data_limit_gb: null, throttle_speed_after: "200 Mbps cap, deprioritized",
    hotspot_gb: 5, num_lines_min: 1, num_lines_max: 1,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: true, contract_required: false },
    data_priority_level: "QCI 9", affiliate_url: "https://www.visible.com/?utm_source=cellscore", last_verified_at: "2026-03-15",
  },
  {
    id: "p-visible-plus", carrier_id: "c-visible", carrier_name: "Visible", carrier_slug: "visible",
    plan_name: "Visible+", monthly_price: 45, data_limit_gb: null, throttle_speed_after: null,
    hotspot_gb: null, num_lines_min: 1, num_lines_max: 1,
    features: { five_g: true, five_g_uw: true, wifi_calling: true, international: true, hotspot: true, contract_required: false },
    data_priority_level: "QCI 8", affiliate_url: "https://www.visible.com/?utm_source=cellscore", last_verified_at: "2026-03-15",
  },
  {
    id: "p-cricket-unlimited", carrier_id: "c-cricket", carrier_name: "Cricket Wireless", carrier_slug: "cricket",
    plan_name: "Unlimited", monthly_price: 55, data_limit_gb: null, throttle_speed_after: "128 kbps after deprioritization",
    hotspot_gb: 15, num_lines_min: 1, num_lines_max: 5,
    features: { five_g: true, wifi_calling: true, international: false, hotspot: true, streaming_quality: "SD", contract_required: false },
    data_priority_level: "QCI 9", affiliate_url: "https://www.cricketwireless.com/?utm_source=cellscore", last_verified_at: "2026-03-15",
  },
];

export function getMockCoverageForAddress(_address: string): MockCoverageResult[] {
  return [
    { carrier_name: "T-Mobile", carrier_slug: "tmobile", technology: "5G", signal_strength: "excellent", signal_dbm: -65, download_mbps: 245, upload_mbps: 35, has_5g: true },
    { carrier_name: "Verizon", carrier_slug: "verizon", technology: "5G", signal_strength: "good", signal_dbm: -78, download_mbps: 180, upload_mbps: 25, has_5g: true },
    { carrier_name: "AT&T", carrier_slug: "att", technology: "5G", signal_strength: "good", signal_dbm: -82, download_mbps: 150, upload_mbps: 20, has_5g: true },
    { carrier_name: "Mint Mobile", carrier_slug: "mint-mobile", technology: "5G", signal_strength: "excellent", signal_dbm: -65, download_mbps: 245, upload_mbps: 35, has_5g: true },
    { carrier_name: "Visible", carrier_slug: "visible", technology: "5G", signal_strength: "good", signal_dbm: -78, download_mbps: 180, upload_mbps: 25, has_5g: true },
    { carrier_name: "Cricket Wireless", carrier_slug: "cricket", technology: "4G LTE", signal_strength: "fair", signal_dbm: -95, download_mbps: 45, upload_mbps: 8, has_5g: false },
  ];
}

export function getMockGeocode(_address: string): { lat: number; lng: number; formatted: string } {
  return { lat: 40.7128, lng: -74.006, formatted: "New York, NY 10001" };
}

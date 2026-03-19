/**
 * TypeScript types generated from BillWatch Supabase schema.
 *
 * When the Supabase project is running, regenerate with:
 *   bunx supabase gen types typescript --local > src/lib/database.types.ts
 *
 * These types match supabase/migrations/00001_create_schema.sql exactly.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      providers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          service_area_states: string[] | null;
          utility_types: string[] | null;
          is_deregulated: boolean;
          website_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          service_area_states?: string[] | null;
          utility_types?: string[] | null;
          is_deregulated?: boolean;
          website_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          service_area_states?: string[] | null;
          utility_types?: string[] | null;
          is_deregulated?: boolean;
          website_url?: string | null;
          created_at?: string;
        };
      };
      user_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          zip_code: string | null;
          home_sqft: number | null;
          household_size: number | null;
          home_type: "apartment" | "condo" | "townhouse" | "single_family" | "other" | null;
          heating_type: "gas" | "electric" | "oil" | "propane" | "heat_pump" | "other" | null;
          cooling_type: "central_ac" | "window_ac" | "heat_pump" | "none" | "other" | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          zip_code?: string | null;
          home_sqft?: number | null;
          household_size?: number | null;
          home_type?: "apartment" | "condo" | "townhouse" | "single_family" | "other" | null;
          heating_type?: "gas" | "electric" | "oil" | "propane" | "heat_pump" | "other" | null;
          cooling_type?: "central_ac" | "window_ac" | "heat_pump" | "none" | "other" | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          zip_code?: string | null;
          home_sqft?: number | null;
          household_size?: number | null;
          home_type?: "apartment" | "condo" | "townhouse" | "single_family" | "other" | null;
          heating_type?: "gas" | "electric" | "oil" | "propane" | "heat_pump" | "other" | null;
          cooling_type?: "central_ac" | "window_ac" | "heat_pump" | "none" | "other" | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      utility_accounts: {
        Row: {
          id: string;
          user_id: string;
          provider_id: string | null;
          provider_name: string;
          account_type: "electric" | "gas" | "water" | "sewer" | "trash" | "internet";
          account_nickname: string | null;
          account_number_last4: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          provider_id?: string | null;
          provider_name: string;
          account_type: "electric" | "gas" | "water" | "sewer" | "trash" | "internet";
          account_nickname?: string | null;
          account_number_last4?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          provider_id?: string | null;
          provider_name?: string;
          account_type?: "electric" | "gas" | "water" | "sewer" | "trash" | "internet";
          account_nickname?: string | null;
          account_number_last4?: string | null;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      bills: {
        Row: {
          id: string;
          account_id: string;
          user_id: string;
          amount_cents: number;
          usage_quantity: number | null;
          usage_unit: "kWh" | "therms" | "gallons" | "ccf" | null;
          rate_per_unit: number | null;
          period_start: string;
          period_end: string;
          period_days: number | null;
          due_date: string | null;
          image_url: string | null;
          ocr_confidence: number | null;
          ocr_raw_text: string | null;
          is_manually_entered: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          account_id: string;
          user_id: string;
          amount_cents: number;
          usage_quantity?: number | null;
          usage_unit?: "kWh" | "therms" | "gallons" | "ccf" | null;
          rate_per_unit?: number | null;
          period_start: string;
          period_end: string;
          period_days?: number | null;
          due_date?: string | null;
          image_url?: string | null;
          ocr_confidence?: number | null;
          ocr_raw_text?: string | null;
          is_manually_entered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          account_id?: string;
          user_id?: string;
          amount_cents?: number;
          usage_quantity?: number | null;
          usage_unit?: "kWh" | "therms" | "gallons" | "ccf" | null;
          rate_per_unit?: number | null;
          period_start?: string;
          period_end?: string;
          period_days?: number | null;
          due_date?: string | null;
          image_url?: string | null;
          ocr_confidence?: number | null;
          ocr_raw_text?: string | null;
          is_manually_entered?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      anomalies: {
        Row: {
          id: string;
          bill_id: string;
          account_id: string;
          user_id: string;
          anomaly_type: "usage_spike" | "rate_change" | "billing_error" | "seasonal_unexpected" | "provider_wide";
          severity: "low" | "medium" | "high";
          description: string;
          expected_amount_cents: number | null;
          actual_amount_cents: number | null;
          z_score: number | null;
          is_dismissed: boolean;
          dismissed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          bill_id: string;
          account_id: string;
          user_id: string;
          anomaly_type: "usage_spike" | "rate_change" | "billing_error" | "seasonal_unexpected" | "provider_wide";
          severity: "low" | "medium" | "high";
          description: string;
          expected_amount_cents?: number | null;
          actual_amount_cents?: number | null;
          z_score?: number | null;
          is_dismissed?: boolean;
          dismissed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          bill_id?: string;
          account_id?: string;
          user_id?: string;
          anomaly_type?: "usage_spike" | "rate_change" | "billing_error" | "seasonal_unexpected" | "provider_wide";
          severity?: "low" | "medium" | "high";
          description?: string;
          expected_amount_cents?: number | null;
          actual_amount_cents?: number | null;
          z_score?: number | null;
          is_dismissed?: boolean;
          dismissed_at?: string | null;
          created_at?: string;
        };
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          plan: "free" | "premium";
          status: "active" | "cancelled" | "past_due";
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: "free" | "premium";
          status: "active" | "cancelled" | "past_due";
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string | null;
          stripe_subscription_id?: string | null;
          plan?: "free" | "premium";
          status?: "active" | "cancelled" | "past_due";
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      provider_alerts: {
        Row: {
          id: string;
          provider_id: string;
          alert_type: "rate_increase" | "widespread_spike" | "outage" | "billing_issue";
          severity: "low" | "medium" | "high";
          description: string;
          affected_account_types: string[] | null;
          affected_states: string[] | null;
          user_count: number | null;
          start_date: string | null;
          end_date: string | null;
          is_resolved: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          provider_id: string;
          alert_type: "rate_increase" | "widespread_spike" | "outage" | "billing_issue";
          severity: "low" | "medium" | "high";
          description: string;
          affected_account_types?: string[] | null;
          affected_states?: string[] | null;
          user_count?: number | null;
          start_date?: string | null;
          end_date?: string | null;
          is_resolved?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          provider_id?: string;
          alert_type?: "rate_increase" | "widespread_spike" | "outage" | "billing_issue";
          severity?: "low" | "medium" | "high";
          description?: string;
          affected_account_types?: string[] | null;
          affected_states?: string[] | null;
          user_count?: number | null;
          start_date?: string | null;
          end_date?: string | null;
          is_resolved?: boolean;
          created_at?: string;
        };
      };
    };
    Views: {
      benchmarks: {
        Row: {
          zip_prefix: string | null;
          account_type: "electric" | "gas" | "water" | "sewer" | "trash" | "internet" | null;
          home_size_bucket: string | null;
          household_size: number | null;
          bill_month: number | null;
          avg_amount_cents: number | null;
          median_amount_cents: number | null;
          avg_usage: number | null;
          sample_size: number | null;
        };
      };
    };
    Functions: {
      home_size_bucket: {
        Args: { sqft: number };
        Returns: string;
      };
      refresh_benchmarks: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
  };
}

/** Convenience type aliases */
export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

/** Row types for each table */
export type Provider = Tables<"providers">;
export type UserProfile = Tables<"user_profiles">;
export type UtilityAccount = Tables<"utility_accounts">;
export type Bill = Tables<"bills">;
export type Anomaly = Tables<"anomalies">;
export type Subscription = Tables<"subscriptions">;
export type ProviderAlert = Tables<"provider_alerts">;

/** Benchmark view row type */
export type Benchmark = Database["public"]["Views"]["benchmarks"]["Row"];

/**
 * Supabase database types for CellScore.
 * Generated manually from migration 20260319060051_create_core_tables.sql.
 * Regenerate with: bunx supabase gen types typescript --local > src/lib/database.types.ts
 */

export type CarrierType = "mno" | "mvno";

/** ISO 8601 date string */
type ISODateString = string;

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface PlanFeatures {
  five_g?: boolean;
  five_g_plus?: boolean;
  five_g_uw?: boolean;
  wifi_calling?: boolean;
  international?: boolean;
  hotspot?: boolean;
  streaming_quality?: string;
  streaming_perks?: string;
  contract_required?: boolean;
  annual_billing?: boolean;
  pay_per_use_data?: boolean;
  international_data?: boolean;
  vpn_included?: boolean;
  network_choice?: boolean;
  requires_xfinity_internet?: boolean;
  requires_spectrum_internet?: boolean;
  aarp_discount?: boolean;
  family_plan?: boolean;
  phone_upgrade?: string;
}

export interface Database {
  public: {
    Tables: {
      carriers: {
        Row: {
          id: string;
          name: string;
          slug: string;
          type: CarrierType;
          parent_carrier_id: string | null;
          logo_url: string | null;
          website: string;
          affiliate_url: string | null;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          type: CarrierType;
          parent_carrier_id?: string | null;
          logo_url?: string | null;
          website: string;
          affiliate_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          type?: CarrierType;
          parent_carrier_id?: string | null;
          logo_url?: string | null;
          website?: string;
          affiliate_url?: string | null;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
      };
      plans: {
        Row: {
          id: string;
          carrier_id: string;
          plan_name: string;
          monthly_price: number;
          data_limit_gb: number | null;
          throttle_speed_after: string | null;
          hotspot_gb: number | null;
          num_lines_min: number;
          num_lines_max: number | null;
          features: PlanFeatures;
          data_priority_level: string | null;
          affiliate_url: string | null;
          last_verified_at: ISODateString;
          created_at: ISODateString;
          updated_at: ISODateString;
        };
        Insert: {
          id?: string;
          carrier_id: string;
          plan_name: string;
          monthly_price: number;
          data_limit_gb?: number | null;
          throttle_speed_after?: string | null;
          hotspot_gb?: number | null;
          num_lines_min?: number;
          num_lines_max?: number | null;
          features?: PlanFeatures;
          data_priority_level?: string | null;
          affiliate_url?: string | null;
          last_verified_at?: ISODateString;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
        Update: {
          id?: string;
          carrier_id?: string;
          plan_name?: string;
          monthly_price?: number;
          data_limit_gb?: number | null;
          throttle_speed_after?: string | null;
          hotspot_gb?: number | null;
          num_lines_min?: number;
          num_lines_max?: number | null;
          features?: PlanFeatures;
          data_priority_level?: string | null;
          affiliate_url?: string | null;
          last_verified_at?: ISODateString;
          created_at?: ISODateString;
          updated_at?: ISODateString;
        };
      };
      fcc_coverage: {
        Row: {
          id: string;
          provider_id: string;
          technology: string;
          max_download: number;
          max_upload: number;
          imported_at: ISODateString;
        };
        Insert: {
          id?: string;
          provider_id: string;
          technology: string;
          max_download: number;
          max_upload: number;
          imported_at?: ISODateString;
        };
        Update: {
          id?: string;
          provider_id?: string;
          technology?: string;
          max_download?: number;
          max_upload?: number;
          imported_at?: ISODateString;
        };
      };
      crowdsource_reports: {
        Row: {
          id: string;
          user_id: string | null;
          lat: number;
          lng: number;
          carrier: string;
          signal_dbm: number;
          download_mbps: number | null;
          upload_mbps: number | null;
          technology: string;
          reported_at: ISODateString;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          lat: number;
          lng: number;
          carrier: string;
          signal_dbm: number;
          download_mbps?: number | null;
          upload_mbps?: number | null;
          technology: string;
          reported_at?: ISODateString;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          lat?: number;
          lng?: number;
          carrier?: string;
          signal_dbm?: number;
          download_mbps?: number | null;
          upload_mbps?: number | null;
          technology?: string;
          reported_at?: ISODateString;
        };
      };
      searches: {
        Row: {
          id: string;
          user_id: string | null;
          address: string;
          lat: number;
          lng: number;
          results: Json | null;
          searched_at: ISODateString;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          address: string;
          lat: number;
          lng: number;
          results?: Json | null;
          searched_at?: ISODateString;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          address?: string;
          lat?: number;
          lng?: number;
          results?: Json | null;
          searched_at?: ISODateString;
        };
      };
      affiliate_clicks: {
        Row: {
          id: string;
          search_id: string | null;
          plan_id: string;
          carrier_id: string;
          clicked_at: ISODateString;
        };
        Insert: {
          id?: string;
          search_id?: string | null;
          plan_id: string;
          carrier_id: string;
          clicked_at?: ISODateString;
        };
        Update: {
          id?: string;
          search_id?: string | null;
          plan_id?: string;
          carrier_id?: string;
          clicked_at?: ISODateString;
        };
      };
      cities: {
        Row: {
          id: string;
          name: string;
          state: string;
          slug: string;
          lat: number;
          lng: number;
          population: number;
          created_at: ISODateString;
        };
        Insert: {
          id?: string;
          name: string;
          state: string;
          slug: string;
          lat: number;
          lng: number;
          population: number;
          created_at?: ISODateString;
        };
        Update: {
          id?: string;
          name?: string;
          state?: string;
          slug?: string;
          lat?: number;
          lng?: number;
          population?: number;
          created_at?: ISODateString;
        };
      };
    };
    Views: {
      coverage_aggregates: {
        Row: {
          carrier_slug: string;
          city: string;
          state: string;
          zip: string | null;
          avg_signal: number;
          avg_download: number;
          sample_count: number;
          technology: string;
        };
      };
    };
    Functions: {
      refresh_coverage_aggregates: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: {
      carrier_type: CarrierType;
    };
  };
}

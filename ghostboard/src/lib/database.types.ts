/**
 * TypeScript types for the GhostBoard Supabase database schema.
 * Generated to match supabase/migrations/00001_create_schema.sql.
 *
 * Regenerate with: bunx supabase gen types typescript --local > src/lib/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          id: string;
          slug: string;
          name: string;
          domain: string | null;
          industry: string | null;
          company_size: string | null;
          headquarters: string | null;
          logo_url: string | null;
          is_claimed: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          domain?: string | null;
          industry?: string | null;
          company_size?: string | null;
          headquarters?: string | null;
          logo_url?: string | null;
          is_claimed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          domain?: string | null;
          industry?: string | null;
          company_size?: string | null;
          headquarters?: string | null;
          logo_url?: string | null;
          is_claimed?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reports: {
        Row: {
          id: string;
          user_id: string | null;
          company_id: string;
          status: "applied" | "heard_back" | "interviewed" | "offered" | "rejected" | "ghosted";
          applied_date: string;
          response_date: string | null;
          response_days: number | null;
          role_level: string | null;
          application_method: string | null;
          is_verified: boolean;
          is_flagged: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          company_id: string;
          status: "applied" | "heard_back" | "interviewed" | "offered" | "rejected" | "ghosted";
          applied_date: string;
          response_date?: string | null;
          response_days?: number | null;
          role_level?: string | null;
          application_method?: string | null;
          is_verified?: boolean;
          is_flagged?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          company_id?: string;
          status?: "applied" | "heard_back" | "interviewed" | "offered" | "rejected" | "ghosted";
          applied_date?: string;
          response_date?: string | null;
          response_days?: number | null;
          role_level?: string | null;
          application_method?: string | null;
          is_verified?: boolean;
          is_flagged?: boolean;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_profiles: {
        Row: {
          id: string;
          display_name: string | null;
          user_type: "job_seeker" | "recruiter";
          reports_submitted: number;
          reports_remaining_today: number;
          rate_limit_reset_at: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          user_type?: "job_seeker" | "recruiter";
          reports_submitted?: number;
          reports_remaining_today?: number;
          rate_limit_reset_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          user_type?: "job_seeker" | "recruiter";
          reports_submitted?: number;
          reports_remaining_today?: number;
          rate_limit_reset_at?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          id: string;
          user_id: string;
          stripe_customer_id: string | null;
          plan: "free" | "premium" | "recruiter";
          status: "active" | "cancelled" | "past_due";
          current_period_start: string | null;
          current_period_end: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          stripe_customer_id?: string | null;
          plan: "free" | "premium" | "recruiter";
          status: "active" | "cancelled" | "past_due";
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          stripe_customer_id?: string | null;
          plan?: "free" | "premium" | "recruiter";
          status?: "active" | "cancelled" | "past_due";
          current_period_start?: string | null;
          current_period_end?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          },
        ];
      };
      company_claims: {
        Row: {
          id: string;
          company_id: string;
          user_id: string;
          verification_method: string | null;
          status: "pending" | "approved" | "rejected";
          created_at: string;
        };
        Insert: {
          id?: string;
          company_id: string;
          user_id: string;
          verification_method?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Update: {
          id?: string;
          company_id?: string;
          user_id?: string;
          verification_method?: string | null;
          status?: "pending" | "approved" | "rejected";
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "company_claims_company_id_fkey";
            columns: ["company_id"];
            isOneToOne: false;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "company_claims_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      company_stats: {
        Row: {
          company_id: string;
          total_reports: number;
          ghosting_rate: number | null;
          avg_response_days: number | null;
          interview_to_offer_ratio: number | null;
          last_report_at: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "company_stats_company_id";
            columns: ["company_id"];
            isOneToOne: true;
            referencedRelation: "companies";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Functions: {
      refresh_company_stats: {
        Args: Record<string, never>;
        Returns: undefined;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

/** Convenience type aliases */
export type Company = Database["public"]["Tables"]["companies"]["Row"];
export type CompanyInsert = Database["public"]["Tables"]["companies"]["Insert"];
export type CompanyUpdate = Database["public"]["Tables"]["companies"]["Update"];

export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type ReportInsert = Database["public"]["Tables"]["reports"]["Insert"];
export type ReportUpdate = Database["public"]["Tables"]["reports"]["Update"];

export type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];
export type UserProfileInsert = Database["public"]["Tables"]["user_profiles"]["Insert"];
export type UserProfileUpdate = Database["public"]["Tables"]["user_profiles"]["Update"];

export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type SubscriptionInsert = Database["public"]["Tables"]["subscriptions"]["Insert"];
export type SubscriptionUpdate = Database["public"]["Tables"]["subscriptions"]["Update"];

export type CompanyClaim = Database["public"]["Tables"]["company_claims"]["Row"];
export type CompanyClaimInsert = Database["public"]["Tables"]["company_claims"]["Insert"];
export type CompanyClaimUpdate = Database["public"]["Tables"]["company_claims"]["Update"];

export type CompanyStats = Database["public"]["Views"]["company_stats"]["Row"];

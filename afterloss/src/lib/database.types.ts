/**
 * TypeScript types for the AfterLoss Supabase database schema.
 *
 * These types are a placeholder matching the initial migration schema.
 * Regenerate with `supabase gen types typescript` once linked to a
 * Supabase project for fully accurate types including RLS context.
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
      state_probate_rules: {
        Row: {
          /** 2-letter US state code (e.g. "CA", "NY") */
          state_code: string;
          state_name: string;
          /** Dollar threshold above which full probate is required */
          probate_threshold: number | null;
          /** Dollar limit for small estate affidavit */
          small_estate_affidavit_limit: number | null;
          simplified_probate_available: boolean;
          /** Days after death to file for probate */
          filing_deadline_days: number | null;
          probate_court_website_url: string | null;
          /** JSON array of required document names */
          required_documents: Json;
          estimated_timeline_months: number | null;
          filing_fees_min: number | null;
          filing_fees_max: number | null;
          /** Whether this data has been manually verified */
          data_verified: boolean;
          source_url: string | null;
          /** ISO 8601 date string — when data was last verified */
          last_verified_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          state_code: string;
          state_name: string;
          probate_threshold?: number | null;
          small_estate_affidavit_limit?: number | null;
          simplified_probate_available?: boolean;
          filing_deadline_days?: number | null;
          probate_court_website_url?: string | null;
          required_documents?: Json;
          estimated_timeline_months?: number | null;
          filing_fees_min?: number | null;
          filing_fees_max?: number | null;
          data_verified?: boolean;
          source_url?: string | null;
          last_verified_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          state_code?: string;
          state_name?: string;
          probate_threshold?: number | null;
          small_estate_affidavit_limit?: number | null;
          simplified_probate_available?: boolean;
          filing_deadline_days?: number | null;
          probate_court_website_url?: string | null;
          required_documents?: Json;
          estimated_timeline_months?: number | null;
          filing_fees_min?: number | null;
          filing_fees_max?: number | null;
          data_verified?: boolean;
          source_url?: string | null;
          last_verified_date?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      checklist_templates: {
        Row: {
          step_id: string;
          /** Timeline category for this checklist step */
          category:
            | "immediate"
            | "first_week"
            | "first_month"
            | "first_quarter"
            | "first_year";
          title: string;
          description: string | null;
          /** Whether this step only applies to certain states */
          state_specific: boolean;
          /** Array of 2-letter state codes this step applies to (empty = all states) */
          applicable_states: string[];
          estimated_time_minutes: number | null;
          required_documents: string[];
          /** Rule for computing deadline from date of death (e.g. "+30 days") */
          deadline_rule: string | null;
          sort_order: number;
        };
        Insert: {
          step_id: string;
          category:
            | "immediate"
            | "first_week"
            | "first_month"
            | "first_quarter"
            | "first_year";
          title: string;
          description?: string | null;
          state_specific?: boolean;
          applicable_states?: string[];
          estimated_time_minutes?: number | null;
          required_documents?: string[];
          deadline_rule?: string | null;
          sort_order?: number;
        };
        Update: {
          step_id?: string;
          category?:
            | "immediate"
            | "first_week"
            | "first_month"
            | "first_quarter"
            | "first_year";
          title?: string;
          description?: string | null;
          state_specific?: boolean;
          applicable_states?: string[];
          estimated_time_minutes?: number | null;
          required_documents?: string[];
          deadline_rule?: string | null;
          sort_order?: number;
        };
        Relationships: [];
      };
      subscription_templates: {
        Row: {
          id: number;
          service_name: string;
          category:
            | "streaming"
            | "utility"
            | "insurance"
            | "membership"
            | "financial"
            | "social_media"
            | "email"
            | "cloud_storage"
            | "government";
          cancellation_method: "online" | "phone" | "mail" | "email";
          cancellation_contact: string | null;
          template_text: string | null;
          required_documents: string[];
          estimated_processing_time: string | null;
          difficulty_rating: "easy" | "medium" | "hard" | null;
          /** ISO 8601 date string */
          last_verified_date: string | null;
          direct_url: string | null;
        };
        Insert: {
          id?: number;
          service_name: string;
          category:
            | "streaming"
            | "utility"
            | "insurance"
            | "membership"
            | "financial"
            | "social_media"
            | "email"
            | "cloud_storage"
            | "government";
          cancellation_method: "online" | "phone" | "mail" | "email";
          cancellation_contact?: string | null;
          template_text?: string | null;
          required_documents?: string[];
          estimated_processing_time?: string | null;
          difficulty_rating?: "easy" | "medium" | "hard" | null;
          last_verified_date?: string | null;
          direct_url?: string | null;
        };
        Update: {
          id?: number;
          service_name?: string;
          category?:
            | "streaming"
            | "utility"
            | "insurance"
            | "membership"
            | "financial"
            | "social_media"
            | "email"
            | "cloud_storage"
            | "government";
          cancellation_method?: "online" | "phone" | "mail" | "email";
          cancellation_contact?: string | null;
          template_text?: string | null;
          required_documents?: string[];
          estimated_processing_time?: string | null;
          difficulty_rating?: "easy" | "medium" | "hard" | null;
          last_verified_date?: string | null;
          direct_url?: string | null;
        };
        Relationships: [];
      };
      cases: {
        Row: {
          id: string;
          /** Nullable — anonymous-first architecture */
          user_id: string | null;
          /** 2-letter state code FK to state_probate_rules */
          state: string | null;
          /** ISO 8601 date string */
          date_of_death: string | null;
          relationship_to_deceased:
            | "spouse"
            | "child"
            | "sibling"
            | "parent"
            | "other"
            | null;
          estate_complexity: "simple" | "moderate" | "complex" | null;
          deceased_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          state?: string | null;
          date_of_death?: string | null;
          relationship_to_deceased?:
            | "spouse"
            | "child"
            | "sibling"
            | "parent"
            | "other"
            | null;
          estate_complexity?: "simple" | "moderate" | "complex" | null;
          deceased_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          state?: string | null;
          date_of_death?: string | null;
          relationship_to_deceased?:
            | "spouse"
            | "child"
            | "sibling"
            | "parent"
            | "other"
            | null;
          estate_complexity?: "simple" | "moderate" | "complex" | null;
          deceased_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cases_state_fkey";
            columns: ["state"];
            isOneToOne: false;
            referencedRelation: "state_probate_rules";
            referencedColumns: ["state_code"];
          },
        ];
      };
      case_checklist_items: {
        Row: {
          id: string;
          case_id: string;
          template_step_id: string;
          status: "pending" | "in_progress" | "completed" | "skipped";
          completed_at: string | null;
          notes: string | null;
          /** ISO 8601 date string */
          deadline_date: string | null;
        };
        Insert: {
          id?: string;
          case_id: string;
          template_step_id: string;
          status?: "pending" | "in_progress" | "completed" | "skipped";
          completed_at?: string | null;
          notes?: string | null;
          deadline_date?: string | null;
        };
        Update: {
          id?: string;
          case_id?: string;
          template_step_id?: string;
          status?: "pending" | "in_progress" | "completed" | "skipped";
          completed_at?: string | null;
          notes?: string | null;
          deadline_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "case_checklist_items_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "case_checklist_items_template_step_id_fkey";
            columns: ["template_step_id"];
            isOneToOne: false;
            referencedRelation: "checklist_templates";
            referencedColumns: ["step_id"];
          },
        ];
      };
      generated_documents: {
        Row: {
          id: string;
          case_id: string;
          document_type: string;
          template_name: string | null;
          generated_content: string;
          pdf_storage_path: string | null;
          generated_at: string;
        };
        Insert: {
          id?: string;
          case_id: string;
          document_type: string;
          template_name?: string | null;
          generated_content: string;
          pdf_storage_path?: string | null;
          generated_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string;
          document_type?: string;
          template_name?: string | null;
          generated_content?: string;
          pdf_storage_path?: string | null;
          generated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "generated_documents_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
        ];
      };
      affiliate_partners: {
        Row: {
          id: number;
          partner_name: string;
          slug: string | null;
          category: string;
          url: string;
          affiliate_url: string | null;
          description: string | null;
          commission_type: string | null;
          commission_value: string | null;
          cookie_days: number | null;
          network: string | null;
          /** Array of checklist step_ids where this partner is shown */
          display_context: string[];
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id?: number;
          partner_name: string;
          slug?: string | null;
          category: string;
          url: string;
          affiliate_url?: string | null;
          description?: string | null;
          commission_type?: string | null;
          commission_value?: string | null;
          cookie_days?: number | null;
          network?: string | null;
          display_context?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Update: {
          id?: number;
          partner_name?: string;
          slug?: string | null;
          category?: string;
          url?: string;
          affiliate_url?: string | null;
          description?: string | null;
          commission_type?: string | null;
          commission_value?: string | null;
          cookie_days?: number | null;
          network?: string | null;
          display_context?: string[];
          is_active?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
      affiliate_clicks: {
        Row: {
          id: string;
          /** Nullable — anonymous users can click affiliate links */
          case_id: string | null;
          partner_id: number;
          checklist_step_id: string | null;
          referrer_page: string | null;
          user_agent: string | null;
          clicked_at: string;
        };
        Insert: {
          id?: string;
          case_id?: string | null;
          partner_id: number;
          checklist_step_id?: string | null;
          referrer_page?: string | null;
          user_agent?: string | null;
          clicked_at?: string;
        };
        Update: {
          id?: string;
          case_id?: string | null;
          partner_id?: number;
          checklist_step_id?: string | null;
          referrer_page?: string | null;
          user_agent?: string | null;
          clicked_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "affiliate_clicks_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "affiliate_clicks_partner_id_fkey";
            columns: ["partner_id"];
            isOneToOne: false;
            referencedRelation: "affiliate_partners";
            referencedColumns: ["id"];
          },
        ];
      };
      email_subscribers: {
        Row: {
          id: string;
          email: string;
          source_page: string | null;
          /** ISO 8601 date string */
          subscribed_at: string;
          /** ISO 8601 date string — null if still subscribed */
          unsubscribed_at: string | null;
          /** ISO 8601 date string — null if not yet confirmed (double opt-in) */
          confirmed_at: string | null;
          drip_step: number;
          /** ISO 8601 date string */
          last_drip_sent_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          source_page?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          confirmed_at?: string | null;
          drip_step?: number;
          last_drip_sent_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          source_page?: string | null;
          subscribed_at?: string;
          unsubscribed_at?: string | null;
          confirmed_at?: string | null;
          drip_step?: number;
          last_drip_sent_at?: string | null;
        };
        Relationships: [];
      };
      deadline_reminders: {
        Row: {
          id: string;
          case_id: string;
          checklist_item_id: string;
          reminder_date: string;
          sent_at: string | null;
        };
        Insert: {
          id?: string;
          case_id: string;
          checklist_item_id: string;
          reminder_date: string;
          sent_at?: string | null;
        };
        Update: {
          id?: string;
          case_id?: string;
          checklist_item_id?: string;
          reminder_date?: string;
          sent_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "deadline_reminders_case_id_fkey";
            columns: ["case_id"];
            isOneToOne: false;
            referencedRelation: "cases";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "deadline_reminders_checklist_item_id_fkey";
            columns: ["checklist_item_id"];
            isOneToOne: false;
            referencedRelation: "case_checklist_items";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

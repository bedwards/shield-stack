/**
 * TypeScript types for the ScoreRebound Supabase database schema.
 *
 * These types mirror the SQL schema defined in supabase/migrations/.
 * Regenerate from a running Supabase instance with:
 *   bunx supabase gen types typescript --local > src/lib/database.types.ts
 */

// ============================================================================
// Enum types
// ============================================================================

export type LoanType =
  | "federal_direct"
  | "federal_ffel"
  | "federal_perkins"
  | "parent_plus"
  | "private";

export type RecoveryPath =
  | "ibr_enrollment"
  | "rehabilitation"
  | "consolidation"
  | "credit_building"
  | "mixed";

export type DelinquencyStatus =
  | "current"
  | "30_days"
  | "60_days"
  | "90_plus"
  | "default"
  | "collections";

export type ScoreRange =
  | "300_499"
  | "500_579"
  | "580_619"
  | "620_659"
  | "660_699"
  | "700_749"
  | "750_plus";

export type EmailSequenceStatus =
  | "active"
  | "paused"
  | "completed"
  | "unsubscribed";

// ============================================================================
// Table row types
// ============================================================================

export interface Profile {
  id: string;
  display_name: string | null;
  score_range: ScoreRange | null;
  notification_prefs: { email: boolean; push: boolean };
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizResponse {
  id: string;
  user_id: string | null;
  loan_type: LoanType;
  servicer: string;
  delinquency_status: DelinquencyStatus;
  current_score_range: ScoreRange;
  goals: string[];
  created_at: string;
}

export interface RecoveryPlan {
  id: string;
  quiz_response_id: string;
  user_id: string | null;
  plan_json: RecoveryPlanJson;
  recovery_path: RecoveryPath;
  estimated_months: number;
  created_at: string;
}

export interface RecoveryPlanJson {
  title: string;
  summary: string;
  steps_overview: string[];
  estimated_score_improvement: string;
  warnings: string[];
}

export interface PlanStep {
  id: string;
  plan_id: string;
  step_order: number;
  title: string;
  description: string;
  action_url: string | null;
  is_completed: boolean;
  completed_at: string | null;
  created_at: string;
}

export interface ProgressEntry {
  id: string;
  user_id: string;
  plan_id: string;
  action_type: string;
  action_description: string | null;
  score_snapshot: number | null;
  completed_at: string;
}

export interface AffiliateClick {
  id: string;
  user_id: string | null;
  product_slug: string;
  affiliate_url: string;
  referrer_page: string | null;
  clicked_at: string;
}

export interface EmailSequence {
  id: string;
  user_id: string;
  sequence_name: string;
  current_step: number;
  status: EmailSequenceStatus;
  last_sent_at: string | null;
  next_send_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Insert types (omit auto-generated fields)
// ============================================================================

export type ProfileInsert = Omit<Profile, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type QuizResponseInsert = Omit<QuizResponse, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type RecoveryPlanInsert = Omit<RecoveryPlan, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type PlanStepInsert = Omit<
  PlanStep,
  "id" | "is_completed" | "completed_at" | "created_at"
> & {
  id?: string;
  is_completed?: boolean;
  completed_at?: string | null;
  created_at?: string;
};

export type ProgressEntryInsert = Omit<
  ProgressEntry,
  "id" | "completed_at"
> & {
  id?: string;
  completed_at?: string;
};

export type AffiliateClickInsert = Omit<
  AffiliateClick,
  "id" | "clicked_at"
> & {
  id?: string;
  clicked_at?: string;
};

export type EmailSequenceInsert = Omit<
  EmailSequence,
  | "id"
  | "current_step"
  | "status"
  | "last_sent_at"
  | "next_send_at"
  | "metadata"
  | "created_at"
  | "updated_at"
> & {
  id?: string;
  current_step?: number;
  status?: EmailSequenceStatus;
  last_sent_at?: string | null;
  next_send_at?: string | null;
  metadata?: Record<string, unknown>;
  created_at?: string;
  updated_at?: string;
};

// ============================================================================
// Update types (all fields optional except id)
// ============================================================================

export type ProfileUpdate = Partial<Omit<Profile, "id" | "created_at">>;

export type QuizResponseUpdate = Partial<Omit<QuizResponse, "id" | "created_at">>;

export type RecoveryPlanUpdate = Partial<Omit<RecoveryPlan, "id" | "created_at">>;

export type PlanStepUpdate = Partial<Omit<PlanStep, "id" | "created_at">>;

export type ProgressEntryUpdate = Partial<Omit<ProgressEntry, "id">>;

export type AffiliateClickUpdate = Partial<Omit<AffiliateClick, "id">>;

export type EmailSequenceUpdate = Partial<
  Omit<EmailSequence, "id" | "created_at">
>;

// ============================================================================
// Supabase Database type (compatible with @supabase/supabase-js generics)
// ============================================================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: ProfileInsert;
        Update: ProfileUpdate;
        Relationships: [];
      };
      quiz_responses: {
        Row: QuizResponse;
        Insert: QuizResponseInsert;
        Update: QuizResponseUpdate;
        Relationships: [];
      };
      recovery_plans: {
        Row: RecoveryPlan;
        Insert: RecoveryPlanInsert;
        Update: RecoveryPlanUpdate;
        Relationships: [];
      };
      plan_steps: {
        Row: PlanStep;
        Insert: PlanStepInsert;
        Update: PlanStepUpdate;
        Relationships: [];
      };
      progress_entries: {
        Row: ProgressEntry;
        Insert: ProgressEntryInsert;
        Update: ProgressEntryUpdate;
        Relationships: [];
      };
      affiliate_clicks: {
        Row: AffiliateClick;
        Insert: AffiliateClickInsert;
        Update: AffiliateClickUpdate;
        Relationships: [];
      };
      email_sequences: {
        Row: EmailSequence;
        Insert: EmailSequenceInsert;
        Update: EmailSequenceUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      loan_type: LoanType;
      recovery_path: RecoveryPath;
      delinquency_status: DelinquencyStatus;
      score_range: ScoreRange;
      email_sequence_status: EmailSequenceStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}

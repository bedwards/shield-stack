-- Migration: Create recovery_plans table
-- Generated recovery plans linked to quiz responses

CREATE TABLE recovery_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_response_id uuid NOT NULL REFERENCES quiz_responses(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  plan_json jsonb NOT NULL,
  recovery_path recovery_path NOT NULL,
  estimated_months integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_recovery_plans_user_id ON recovery_plans (user_id);
CREATE INDEX idx_recovery_plans_quiz_response_id ON recovery_plans (quiz_response_id);
CREATE INDEX idx_recovery_plans_created_at ON recovery_plans (created_at);

-- RLS: authenticated users see own rows, anon role can insert
ALTER TABLE recovery_plans ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own plans
CREATE POLICY "Users can view own recovery plans"
  ON recovery_plans FOR SELECT
  USING (auth.uid() = user_id);

-- Authenticated users can insert with their user_id
CREATE POLICY "Authenticated users can create recovery plans"
  ON recovery_plans FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Anonymous (unauthenticated) users can insert with null user_id
CREATE POLICY "Anonymous users can create recovery plans"
  ON recovery_plans FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Users can update their own plans (e.g., to claim after signup)
CREATE POLICY "Users can update own recovery plans"
  ON recovery_plans FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

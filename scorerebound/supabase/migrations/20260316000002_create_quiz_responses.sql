-- Migration: Create quiz_responses table
-- Stores the 5-question quiz answers: loan_type, servicer, delinquency_status, current_score_range, goals

CREATE TABLE quiz_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  loan_type loan_type NOT NULL,
  servicer text NOT NULL,
  delinquency_status delinquency_status NOT NULL,
  current_score_range score_range NOT NULL,
  goals text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_quiz_responses_user_id ON quiz_responses (user_id);
CREATE INDEX idx_quiz_responses_created_at ON quiz_responses (created_at);

-- RLS: authenticated users see own rows, anon role can insert
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;

-- Authenticated users can read their own responses
CREATE POLICY "Users can view own quiz responses"
  ON quiz_responses FOR SELECT
  USING (auth.uid() = user_id);

-- Authenticated users can insert with their user_id
CREATE POLICY "Authenticated users can create quiz responses"
  ON quiz_responses FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Anonymous (unauthenticated) users can insert with null user_id
CREATE POLICY "Anonymous users can create quiz responses"
  ON quiz_responses FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

-- Users can update their own responses (e.g., to claim anonymous responses after signup)
CREATE POLICY "Users can update own quiz responses"
  ON quiz_responses FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

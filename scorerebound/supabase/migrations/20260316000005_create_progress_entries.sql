-- Migration: Create progress_entries table
-- Credit score snapshots and milestone logs for tracking recovery progress

CREATE TABLE progress_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_id uuid NOT NULL REFERENCES recovery_plans(id) ON DELETE CASCADE,
  action_type text NOT NULL,
  action_description text,
  score_snapshot integer CHECK (score_snapshot IS NULL OR (score_snapshot >= 300 AND score_snapshot <= 850)),
  completed_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_progress_entries_user_id ON progress_entries (user_id);
CREATE INDEX idx_progress_entries_plan_id ON progress_entries (plan_id);
CREATE INDEX idx_progress_entries_completed_at ON progress_entries (completed_at);

-- RLS: user-owns-row pattern (requires authentication)
ALTER TABLE progress_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress entries"
  ON progress_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress entries"
  ON progress_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress entries"
  ON progress_entries FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own progress entries"
  ON progress_entries FOR DELETE
  USING (auth.uid() = user_id);

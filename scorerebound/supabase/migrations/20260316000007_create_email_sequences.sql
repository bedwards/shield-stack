-- Migration: Create email_sequences table
-- Drip campaign state per user for recovery guidance emails

CREATE TABLE email_sequences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  sequence_name text NOT NULL,
  current_step integer NOT NULL DEFAULT 0,
  status email_sequence_status NOT NULL DEFAULT 'active',
  last_sent_at timestamptz,
  next_send_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_email_sequences_user_id ON email_sequences (user_id);
CREATE INDEX idx_email_sequences_status ON email_sequences (status);
CREATE INDEX idx_email_sequences_next_send_at ON email_sequences (next_send_at)
  WHERE status = 'active';

-- Unique constraint: one sequence per user per sequence_name
CREATE UNIQUE INDEX idx_email_sequences_user_sequence
  ON email_sequences (user_id, sequence_name);

-- Auto-update updated_at
CREATE TRIGGER email_sequences_updated_at
  BEFORE UPDATE ON email_sequences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS: user-owns-row pattern
ALTER TABLE email_sequences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own email sequences"
  ON email_sequences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own email sequences"
  ON email_sequences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own email sequences"
  ON email_sequences FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

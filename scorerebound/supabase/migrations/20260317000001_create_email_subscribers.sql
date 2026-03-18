-- Migration: Create email_subscribers table
-- Anonymous email capture for drip campaign (no auth.users FK required)

CREATE TABLE email_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  plan_id uuid REFERENCES recovery_plans(id) ON DELETE SET NULL,
  recovery_path text,
  unsubscribe_token uuid NOT NULL DEFAULT gen_random_uuid(),
  drip_step integer NOT NULL DEFAULT 0,
  drip_status text NOT NULL DEFAULT 'active'
    CHECK (drip_status IN ('active', 'paused', 'completed', 'unsubscribed')),
  last_sent_at timestamptz,
  next_send_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- One subscription per email address
CREATE UNIQUE INDEX idx_email_subscribers_email
  ON email_subscribers (email);

-- Fast lookup for drip processor: active subscribers due for next email
CREATE INDEX idx_email_subscribers_drip_pending
  ON email_subscribers (next_send_at)
  WHERE drip_status = 'active';

-- Fast lookup for unsubscribe by token
CREATE UNIQUE INDEX idx_email_subscribers_unsubscribe_token
  ON email_subscribers (unsubscribe_token);

-- Auto-update updated_at (reuses function from profiles migration)
CREATE TRIGGER email_subscribers_updated_at
  BEFORE UPDATE ON email_subscribers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS: enabled but no public policies — all access via service role key in API routes
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Email subscribers table for email capture and gentle drip sequence (#300)
CREATE TABLE IF NOT EXISTS email_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text NOT NULL,
  source_page text,
  subscribed_at timestamptz DEFAULT now() NOT NULL,
  unsubscribed_at timestamptz,
  confirmed_at timestamptz,
  drip_step integer DEFAULT 0 NOT NULL,
  last_drip_sent_at timestamptz,
  CONSTRAINT email_subscribers_email_unique UNIQUE (email)
);

-- Index for drip sequence processing (active, confirmed subscribers)
CREATE INDEX IF NOT EXISTS idx_email_subscribers_drip
  ON email_subscribers (drip_step, last_drip_sent_at)
  WHERE unsubscribed_at IS NULL AND confirmed_at IS NOT NULL;

-- RLS
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;

-- Anonymous users can subscribe (INSERT only)
CREATE POLICY "anon_can_subscribe" ON email_subscribers
  FOR INSERT TO anon
  WITH CHECK (true);

-- Authenticated users get full access (admin dashboard)
CREATE POLICY "authenticated_full_access" ON email_subscribers
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

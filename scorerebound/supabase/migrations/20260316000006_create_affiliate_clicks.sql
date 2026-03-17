-- Migration: Create affiliate_clicks table
-- Tracks referral clicks to credit-builder products, secured cards, monitoring, refinancing

CREATE TABLE affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  product_slug text NOT NULL,
  affiliate_url text NOT NULL,
  referrer_page text,
  clicked_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for analytics queries
CREATE INDEX idx_affiliate_clicks_user_id ON affiliate_clicks (user_id);
CREATE INDEX idx_affiliate_clicks_product_slug ON affiliate_clicks (product_slug);
CREATE INDEX idx_affiliate_clicks_clicked_at ON affiliate_clicks (clicked_at);

-- RLS: anyone can insert, authenticated users can view their own
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;

-- Authenticated users can view their own clicks
CREATE POLICY "Users can view own affiliate clicks"
  ON affiliate_clicks FOR SELECT
  USING (auth.uid() = user_id);

-- Authenticated users can insert clicks
CREATE POLICY "Authenticated users can create affiliate clicks"
  ON affiliate_clicks FOR INSERT
  TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

-- Anonymous users can insert clicks with null user_id
CREATE POLICY "Anonymous users can create affiliate clicks"
  ON affiliate_clicks FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

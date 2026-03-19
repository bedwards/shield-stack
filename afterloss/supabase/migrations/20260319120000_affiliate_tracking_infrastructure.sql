-- AfterLoss Affiliate Click Tracking Infrastructure
-- Issue #304: Add missing columns to affiliate_partners and affiliate_clicks
-- for full click tracking, analytics, and revenue attribution.
--
-- This migration is ADDITIVE ONLY — no DROP or destructive changes.

-- =============================================================================
-- ALTER TABLE: affiliate_partners
-- Add slug (unique identifier for URL routing), affiliate_url, commission_value,
-- cookie_days, network, is_active, and created_at for tracking infrastructure.
-- =============================================================================
ALTER TABLE affiliate_partners
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS affiliate_url TEXT,
  ADD COLUMN IF NOT EXISTS commission_value TEXT,
  ADD COLUMN IF NOT EXISTS cookie_days INTEGER,
  ADD COLUMN IF NOT EXISTS network TEXT,
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT now();

-- =============================================================================
-- ALTER TABLE: affiliate_clicks
-- Add referrer_page and user_agent for analytics and attribution.
-- =============================================================================
ALTER TABLE affiliate_clicks
  ADD COLUMN IF NOT EXISTS referrer_page TEXT,
  ADD COLUMN IF NOT EXISTS user_agent TEXT;

-- =============================================================================
-- INDEXES for affiliate analytics queries
-- =============================================================================
CREATE INDEX IF NOT EXISTS idx_affiliate_partners_slug ON affiliate_partners(slug);
CREATE INDEX IF NOT EXISTS idx_affiliate_partners_is_active ON affiliate_partners(is_active);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_referrer_page ON affiliate_clicks(referrer_page);

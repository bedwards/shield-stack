-- GhostBoard Database Schema
-- Migration: 00001_create_schema
-- Creates: companies, reports, company_stats (materialized view),
--          user_profiles, subscriptions, company_claims
-- Enables: pg_trgm extension, RLS on all tables

-- =============================================================================
-- Extensions
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================================================
-- Tables
-- =============================================================================

-- Companies table: employer profiles
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  company_size TEXT,
  headquarters TEXT,
  logo_url TEXT,
  is_claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_companies_name_trgm ON companies USING gin (name gin_trgm_ops);
CREATE INDEX idx_companies_industry ON companies(industry);

-- Reports table: user-submitted application outcomes
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  company_id UUID NOT NULL REFERENCES companies(id),
  status TEXT NOT NULL CHECK (status IN ('applied', 'heard_back', 'interviewed', 'offered', 'rejected', 'ghosted')),
  applied_date DATE NOT NULL,
  response_date DATE,
  response_days INTEGER,
  role_level TEXT,
  application_method TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_flagged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Compound index for company page queries (reports by company, newest first)
CREATE INDEX idx_reports_company_created ON reports(company_id, created_at DESC);
-- Index for user dashboard (reports by user, newest first)
CREATE INDEX idx_reports_user_created ON reports(user_id, created_at DESC);

-- User profiles table: extended user data
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  display_name TEXT,
  user_type TEXT DEFAULT 'job_seeker' CHECK (user_type IN ('job_seeker', 'recruiter')),
  reports_submitted INTEGER DEFAULT 0,
  reports_remaining_today INTEGER DEFAULT 3,
  rate_limit_reset_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table: Stripe subscription tracking
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_customer_id TEXT,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'premium', 'recruiter')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);

-- Company claims table: recruiter company profile claims
CREATE TABLE company_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES companies(id),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  verification_method TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_company_claims_company ON company_claims(company_id);

-- =============================================================================
-- Materialized View: company_stats
-- Only includes companies with >= 5 reports (anti-gaming threshold).
-- Reports older than 2 years are weighted less via CASE expression.
-- =============================================================================

CREATE MATERIALIZED VIEW company_stats AS
SELECT
  c.id AS company_id,
  COUNT(r.id) AS total_reports,
  ROUND(
    COUNT(r.id) FILTER (WHERE r.status = 'ghosted')::NUMERIC
    / NULLIF(COUNT(r.id), 0) * 100, 1
  ) AS ghosting_rate,
  ROUND(
    AVG(
      CASE
        WHEN r.response_days IS NOT NULL AND r.created_at >= NOW() - INTERVAL '2 years' THEN r.response_days
        WHEN r.response_days IS NOT NULL THEN r.response_days * 0.5
        ELSE NULL
      END
    )::NUMERIC, 1
  ) AS avg_response_days,
  ROUND(
    COUNT(r.id) FILTER (WHERE r.status = 'offered')::NUMERIC
    / NULLIF(COUNT(r.id) FILTER (WHERE r.status = 'interviewed'), 0) * 100, 1
  ) AS interview_to_offer_ratio,
  MAX(r.created_at) AS last_report_at
FROM companies c
JOIN reports r ON r.company_id = c.id AND r.is_flagged = FALSE
GROUP BY c.id
HAVING COUNT(r.id) >= 5
WITH DATA;

CREATE UNIQUE INDEX idx_company_stats_company_id ON company_stats(company_id);

-- =============================================================================
-- Function: refresh_company_stats()
-- Refreshes the materialized view concurrently (non-blocking)
-- =============================================================================

CREATE OR REPLACE FUNCTION refresh_company_stats()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY company_stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================================================
-- Trigger: auto-update updated_at on companies
-- =============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- Row Level Security
-- =============================================================================

-- Companies: publicly readable
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "companies_select_public"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "companies_insert_auth"
  ON companies FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "companies_update_auth"
  ON companies FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Reports: anon can INSERT (anonymous-first), anon can SELECT aggregate/own data
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "reports_select_public"
  ON reports FOR SELECT
  USING (true);

CREATE POLICY "reports_insert_anon"
  ON reports FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "reports_insert_auth"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "reports_update_own"
  ON reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- User profiles: owner only
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "user_profiles_select_own"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "user_profiles_insert_own"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "user_profiles_update_own"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Subscriptions: owner only
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "subscriptions_select_own"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "subscriptions_insert_own"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "subscriptions_update_own"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Company claims: owner only
ALTER TABLE company_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "company_claims_select_own"
  ON company_claims FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "company_claims_insert_auth"
  ON company_claims FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "company_claims_update_own"
  ON company_claims FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

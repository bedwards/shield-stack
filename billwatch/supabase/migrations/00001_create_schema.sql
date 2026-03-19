-- BillWatch Database Schema
-- Migration: 00001_create_schema
-- Creates all core tables for utility bill tracking, anomaly detection,
-- household benchmarking, and subscription management.

-- =============================================================================
-- TABLES
-- =============================================================================

-- Utility providers database
CREATE TABLE providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  service_area_states TEXT[],
  utility_types TEXT[],
  is_deregulated BOOLEAN DEFAULT FALSE,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Extended user profiles (household info for benchmarking)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  zip_code TEXT,
  home_sqft INTEGER,
  household_size INTEGER,
  home_type TEXT CHECK (home_type IN ('apartment', 'condo', 'townhouse', 'single_family', 'other')),
  heating_type TEXT CHECK (heating_type IN ('gas', 'electric', 'oil', 'propane', 'heat_pump', 'other')),
  cooling_type TEXT CHECK (cooling_type IN ('central_ac', 'window_ac', 'heat_pump', 'none', 'other')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tracked utility accounts per user
CREATE TABLE utility_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES providers(id),
  provider_name TEXT NOT NULL,
  account_type TEXT NOT NULL CHECK (account_type IN ('electric', 'gas', 'water', 'sewer', 'trash', 'internet')),
  account_nickname TEXT,
  account_number_last4 TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual bill records
CREATE TABLE bills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES utility_accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_cents INTEGER NOT NULL,
  usage_quantity NUMERIC,
  usage_unit TEXT CHECK (usage_unit IN ('kWh', 'therms', 'gallons', 'ccf')),
  rate_per_unit NUMERIC,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  period_days INTEGER,
  due_date DATE,
  image_url TEXT,
  ocr_confidence NUMERIC,
  ocr_raw_text TEXT,
  is_manually_entered BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Detected anomalies linked to bills
CREATE TABLE anomalies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bill_id UUID NOT NULL REFERENCES bills(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES utility_accounts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  anomaly_type TEXT NOT NULL CHECK (anomaly_type IN ('usage_spike', 'rate_change', 'billing_error', 'seasonal_unexpected', 'provider_wide')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  description TEXT NOT NULL,
  expected_amount_cents INTEGER,
  actual_amount_cents INTEGER,
  z_score NUMERIC,
  is_dismissed BOOLEAN DEFAULT FALSE,
  dismissed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stripe subscription tracking
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  status TEXT NOT NULL CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Provider-wide anomaly alerts (SHOULD)
CREATE TABLE provider_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL CHECK (alert_type IN ('rate_increase', 'widespread_spike', 'outage', 'billing_issue')),
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  description TEXT NOT NULL,
  affected_account_types TEXT[],
  affected_states TEXT[],
  user_count INTEGER,
  start_date DATE,
  end_date DATE,
  is_resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Bills: query by account + period (most common dashboard query)
CREATE INDEX idx_bills_account_period ON bills(account_id, period_start DESC);

-- Bills: query by user + created_at (recent bills list)
CREATE INDEX idx_bills_user_created ON bills(user_id, created_at DESC);

-- Anomalies: lookup by bill
CREATE INDEX idx_anomalies_bill ON anomalies(bill_id);

-- Utility accounts: lookup by user
CREATE INDEX idx_utility_accounts_user ON utility_accounts(user_id);

-- Providers: lookup by slug (for SEO pages)
CREATE INDEX idx_providers_slug ON providers(slug);

-- Anomalies: filter by user and severity
CREATE INDEX idx_anomalies_user ON anomalies(user_id);

-- Subscriptions: lookup by user
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);

-- Provider alerts: lookup by provider
CREATE INDEX idx_provider_alerts_provider ON provider_alerts(provider_id);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

ALTER TABLE providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE utility_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE anomalies ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE provider_alerts ENABLE ROW LEVEL SECURITY;

-- Providers: publicly readable (for dropdowns, SEO pages)
CREATE POLICY "providers_select_public"
  ON providers FOR SELECT
  TO anon, authenticated
  USING (true);

-- User profiles: owners only
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

-- Utility accounts: owners only
CREATE POLICY "utility_accounts_select_own"
  ON utility_accounts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "utility_accounts_insert_own"
  ON utility_accounts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "utility_accounts_update_own"
  ON utility_accounts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "utility_accounts_delete_own"
  ON utility_accounts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Bills: owners only
CREATE POLICY "bills_select_own"
  ON bills FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "bills_insert_own"
  ON bills FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bills_update_own"
  ON bills FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "bills_delete_own"
  ON bills FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Anomalies: owners only
CREATE POLICY "anomalies_select_own"
  ON anomalies FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "anomalies_insert_own"
  ON anomalies FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "anomalies_update_own"
  ON anomalies FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Subscriptions: owners only
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

-- Provider alerts: publicly readable
CREATE POLICY "provider_alerts_select_public"
  ON provider_alerts FOR SELECT
  TO anon, authenticated
  USING (true);

-- =============================================================================
-- BENCHMARKS MATERIALIZED VIEW
-- =============================================================================

-- Home size bucket function (SHOULD)
CREATE OR REPLACE FUNCTION home_size_bucket(sqft INTEGER)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
AS $$
  SELECT CASE
    WHEN sqft < 1000 THEN '<1000'
    WHEN sqft < 1500 THEN '1000-1500'
    WHEN sqft < 2000 THEN '1500-2000'
    WHEN sqft < 2500 THEN '2000-2500'
    WHEN sqft < 3000 THEN '2500-3000'
    ELSE '3000+'
  END;
$$;

-- Aggregated anonymous benchmarks for household comparison
-- Only includes buckets with >= 10 data points for privacy
CREATE MATERIALIZED VIEW benchmarks AS
SELECT
  LEFT(up.zip_code, 3) AS zip_prefix,
  ua.account_type,
  home_size_bucket(up.home_sqft) AS home_size_bucket,
  up.household_size,
  EXTRACT(MONTH FROM b.period_start)::INTEGER AS bill_month,
  AVG(b.amount_cents)::INTEGER AS avg_amount_cents,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY b.amount_cents)::INTEGER AS median_amount_cents,
  AVG(b.usage_quantity)::NUMERIC(10,2) AS avg_usage,
  COUNT(DISTINCT b.user_id) AS sample_size
FROM bills b
JOIN utility_accounts ua ON ua.id = b.account_id
JOIN user_profiles up ON up.id = b.user_id
WHERE up.zip_code IS NOT NULL
  AND up.home_sqft IS NOT NULL
GROUP BY
  zip_prefix,
  ua.account_type,
  home_size_bucket(up.home_sqft),
  up.household_size,
  EXTRACT(MONTH FROM b.period_start)
HAVING COUNT(DISTINCT b.user_id) >= 10;

-- Index on materialized view for fast lookups
CREATE UNIQUE INDEX idx_benchmarks_lookup
  ON benchmarks(zip_prefix, account_type, home_size_bucket, household_size, bill_month);

-- =============================================================================
-- REFRESH BENCHMARKS FUNCTION (SHOULD)
-- =============================================================================

-- Function to refresh the benchmarks materialized view
-- Called on a schedule (e.g., daily via cron) or manually
CREATE OR REPLACE FUNCTION refresh_benchmarks()
RETURNS VOID
LANGUAGE SQL
SECURITY DEFINER
AS $$
  REFRESH MATERIALIZED VIEW CONCURRENTLY benchmarks;
$$;

-- =============================================================================
-- GRANTS
-- =============================================================================

-- Benchmarks materialized view: publicly readable (for household comparison)
GRANT SELECT ON benchmarks TO anon, authenticated;

-- =============================================================================
-- HELPER TRIGGERS
-- =============================================================================

-- Auto-compute period_days on bill insert/update
CREATE OR REPLACE FUNCTION compute_period_days()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.period_days := NEW.period_end - NEW.period_start;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_bills_compute_period_days
  BEFORE INSERT OR UPDATE ON bills
  FOR EACH ROW
  EXECUTE FUNCTION compute_period_days();

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_utility_accounts_updated_at
  BEFORE UPDATE ON utility_accounts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_bills_updated_at
  BEFORE UPDATE ON bills
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

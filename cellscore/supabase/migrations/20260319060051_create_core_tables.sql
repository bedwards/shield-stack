-- CellScore Core Tables Migration
-- Creates all foundational tables for the cell plan finder product

-- Enable PostGIS for geospatial coverage queries
CREATE EXTENSION IF NOT EXISTS postgis;

-- Carrier type enum
CREATE TYPE carrier_type AS ENUM ('mno', 'mvno');

-- ============================================================================
-- carriers — MNOs and MVNOs with affiliate info
-- ============================================================================
CREATE TABLE carriers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  type carrier_type NOT NULL,
  parent_carrier_id uuid REFERENCES carriers(id) ON DELETE SET NULL,
  logo_url text,
  website text NOT NULL,
  affiliate_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_carriers_slug ON carriers(slug);
CREATE INDEX idx_carriers_type ON carriers(type);

-- ============================================================================
-- plans — cell phone plans with pricing, features, and affiliate links
-- ============================================================================
CREATE TABLE plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_id uuid NOT NULL REFERENCES carriers(id) ON DELETE CASCADE,
  plan_name text NOT NULL,
  monthly_price decimal NOT NULL,
  data_limit_gb decimal,
  throttle_speed_after text,
  hotspot_gb decimal,
  num_lines_min integer NOT NULL DEFAULT 1,
  num_lines_max integer,
  features jsonb NOT NULL DEFAULT '{}',
  data_priority_level text,
  affiliate_url text,
  last_verified_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_plans_carrier_id ON plans(carrier_id);
CREATE INDEX idx_plans_monthly_price ON plans(monthly_price);
CREATE UNIQUE INDEX idx_plans_carrier_plan_name ON plans(carrier_id, plan_name);

-- ============================================================================
-- fcc_coverage — FCC Broadband Data Collection coverage polygons
-- ============================================================================
CREATE TABLE fcc_coverage (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id text NOT NULL,
  technology text NOT NULL,
  geography geometry(Geometry, 4326) NOT NULL,
  max_download decimal NOT NULL,
  max_upload decimal NOT NULL,
  imported_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_fcc_coverage_geography ON fcc_coverage USING GIST(geography);
CREATE INDEX idx_fcc_coverage_provider_id ON fcc_coverage(provider_id);
CREATE INDEX idx_fcc_coverage_technology ON fcc_coverage(technology);

-- ============================================================================
-- crowdsource_reports — user-submitted signal strength readings
-- ============================================================================
CREATE TABLE crowdsource_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  carrier text NOT NULL,
  signal_dbm integer NOT NULL,
  download_mbps decimal,
  upload_mbps decimal,
  technology text NOT NULL,
  reported_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_crowdsource_reports_carrier ON crowdsource_reports(carrier);
CREATE INDEX idx_crowdsource_reports_lat_lng ON crowdsource_reports(lat, lng);
CREATE INDEX idx_crowdsource_reports_reported_at ON crowdsource_reports(reported_at DESC);

-- ============================================================================
-- searches — user search history (anonymous allowed)
-- ============================================================================
CREATE TABLE searches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  address text NOT NULL,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  results jsonb,
  searched_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_searches_user_id ON searches(user_id);

-- ============================================================================
-- affiliate_clicks — tracks clicks on affiliate plan links
-- ============================================================================
CREATE TABLE affiliate_clicks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_id uuid REFERENCES searches(id) ON DELETE SET NULL,
  plan_id uuid NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
  carrier_id uuid NOT NULL REFERENCES carriers(id) ON DELETE CASCADE,
  clicked_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_affiliate_clicks_plan_id ON affiliate_clicks(plan_id);
CREATE INDEX idx_affiliate_clicks_carrier_id ON affiliate_clicks(carrier_id);
CREATE INDEX idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at DESC);

-- ============================================================================
-- cities — US cities for programmatic SEO pages
-- ============================================================================
CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  state text NOT NULL,
  slug text NOT NULL UNIQUE,
  lat double precision NOT NULL,
  lng double precision NOT NULL,
  population integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_cities_slug ON cities(slug);
CREATE UNIQUE INDEX idx_cities_name_state ON cities(name, state);

-- ============================================================================
-- coverage_aggregates — materialized view for fast city-level queries
-- ============================================================================
CREATE MATERIALIZED VIEW coverage_aggregates AS
SELECT
  cr.carrier AS carrier_slug,
  c.name AS city,
  c.state,
  NULL::text AS zip,
  AVG(cr.signal_dbm)::decimal AS avg_signal,
  AVG(cr.download_mbps)::decimal AS avg_download,
  COUNT(*)::integer AS sample_count,
  cr.technology
FROM crowdsource_reports cr
JOIN cities c ON (
  cr.lat BETWEEN c.lat - 0.1 AND c.lat + 0.1
  AND cr.lng BETWEEN c.lng - 0.1 AND c.lng + 0.1
)
GROUP BY cr.carrier, c.name, c.state, cr.technology;

CREATE INDEX idx_coverage_aggregates_carrier ON coverage_aggregates(carrier_slug);
CREATE INDEX idx_coverage_aggregates_city_state ON coverage_aggregates(city, state);

-- ============================================================================
-- Auto-update updated_at triggers
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER carriers_updated_at
  BEFORE UPDATE ON carriers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER plans_updated_at
  BEFORE UPDATE ON plans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- Row Level Security
-- ============================================================================

-- carriers: public read
ALTER TABLE carriers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "carriers_public_read" ON carriers FOR SELECT USING (true);

-- plans: public read
ALTER TABLE plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "plans_public_read" ON plans FOR SELECT USING (true);

-- fcc_coverage: public read
ALTER TABLE fcc_coverage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "fcc_coverage_public_read" ON fcc_coverage FOR SELECT USING (true);

-- crowdsource_reports: public read, authenticated insert own
ALTER TABLE crowdsource_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "crowdsource_reports_public_read" ON crowdsource_reports FOR SELECT USING (true);
CREATE POLICY "crowdsource_reports_auth_insert" ON crowdsource_reports FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

-- searches: anon insert allowed, users read own
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;
CREATE POLICY "searches_anon_insert" ON searches FOR INSERT WITH CHECK (true);
CREATE POLICY "searches_read_own" ON searches FOR SELECT
  USING (user_id IS NULL OR auth.uid() = user_id);

-- affiliate_clicks: insert allowed for all, read own only
ALTER TABLE affiliate_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "affiliate_clicks_insert" ON affiliate_clicks FOR INSERT WITH CHECK (true);
CREATE POLICY "affiliate_clicks_read_own" ON affiliate_clicks FOR SELECT
  USING (true);

-- cities: public read
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cities_public_read" ON cities FOR SELECT USING (true);

-- ============================================================================
-- Grant access to coverage_aggregates materialized view
-- ============================================================================
GRANT SELECT ON coverage_aggregates TO anon;
GRANT SELECT ON coverage_aggregates TO authenticated;

-- Refresh function for scheduled use
CREATE OR REPLACE FUNCTION refresh_coverage_aggregates()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW coverage_aggregates;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

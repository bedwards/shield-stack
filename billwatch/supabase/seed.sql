-- BillWatch Seed Data
-- Idempotent: safe to run multiple times (INSERT ... ON CONFLICT DO NOTHING)
--
-- Seeds:
--   1. 20 major US utility providers with realistic service area data
--   2. Test user with profile, accounts, bills, and anomalies
--
-- Usage:
--   psql $DATABASE_URL -f supabase/seed.sql
--   OR via Supabase Dashboard > SQL Editor
--   OR automatically via `supabase db reset` (runs after migrations)

-- =============================================================================
-- PROVIDERS (20 major US utilities)
-- =============================================================================

INSERT INTO providers (id, name, slug, service_area_states, utility_types, is_deregulated, website_url)
VALUES
  -- Top 10 US electric utilities by customer count
  ('a0000000-0000-0000-0000-000000000001', 'Pacific Gas & Electric', 'pge',
   ARRAY['CA'], ARRAY['electric', 'gas'], false, 'https://www.pge.com'),

  ('a0000000-0000-0000-0000-000000000002', 'Southern California Edison', 'sce',
   ARRAY['CA'], ARRAY['electric'], false, 'https://www.sce.com'),

  ('a0000000-0000-0000-0000-000000000003', 'Florida Power & Light', 'fpl',
   ARRAY['FL'], ARRAY['electric'], false, 'https://www.fpl.com'),

  ('a0000000-0000-0000-0000-000000000004', 'Duke Energy', 'duke-energy',
   ARRAY['NC', 'SC', 'FL', 'IN', 'OH', 'KY'], ARRAY['electric', 'gas'], false, 'https://www.duke-energy.com'),

  ('a0000000-0000-0000-0000-000000000005', 'Consolidated Edison', 'con-edison',
   ARRAY['NY'], ARRAY['electric', 'gas'], true, 'https://www.coned.com'),

  ('a0000000-0000-0000-0000-000000000006', 'Dominion Energy', 'dominion-energy',
   ARRAY['VA', 'NC', 'SC', 'OH'], ARRAY['electric', 'gas'], false, 'https://www.dominionenergy.com'),

  ('a0000000-0000-0000-0000-000000000007', 'Exelon (ComEd)', 'comed',
   ARRAY['IL'], ARRAY['electric'], true, 'https://www.comed.com'),

  ('a0000000-0000-0000-0000-000000000008', 'National Grid', 'national-grid',
   ARRAY['NY', 'MA', 'RI'], ARRAY['electric', 'gas'], true, 'https://www.nationalgridus.com'),

  ('a0000000-0000-0000-0000-000000000009', 'AEP (American Electric Power)', 'aep',
   ARRAY['OH', 'TX', 'WV', 'VA', 'IN', 'MI', 'OK', 'AR', 'LA', 'KY', 'TN'], ARRAY['electric'], false, 'https://www.aep.com'),

  ('a0000000-0000-0000-0000-000000000010', 'Entergy', 'entergy',
   ARRAY['AR', 'LA', 'MS', 'TX'], ARRAY['electric'], false, 'https://www.entergy.com'),

  -- Major gas utilities
  ('a0000000-0000-0000-0000-000000000011', 'SoCalGas', 'socal-gas',
   ARRAY['CA'], ARRAY['gas'], false, 'https://www.socalgas.com'),

  ('a0000000-0000-0000-0000-000000000012', 'Atmos Energy', 'atmos-energy',
   ARRAY['TX', 'LA', 'MS', 'KY', 'TN', 'CO', 'KS', 'VA'], ARRAY['gas'], false, 'https://www.atmosenergy.com'),

  -- Deregulated market providers (TX, OH, PA)
  ('a0000000-0000-0000-0000-000000000013', 'TXU Energy', 'txu-energy',
   ARRAY['TX'], ARRAY['electric'], true, 'https://www.txu.com'),

  ('a0000000-0000-0000-0000-000000000014', 'Reliant Energy', 'reliant-energy',
   ARRAY['TX'], ARRAY['electric'], true, 'https://www.reliant.com'),

  ('a0000000-0000-0000-0000-000000000015', 'PECO Energy', 'peco-energy',
   ARRAY['PA'], ARRAY['electric', 'gas'], true, 'https://www.peco.com'),

  -- Major water utilities
  ('a0000000-0000-0000-0000-000000000016', 'American Water Works', 'american-water',
   ARRAY['NJ', 'PA', 'IL', 'IN', 'CA', 'WV', 'MO', 'VA', 'MD', 'IA', 'TN', 'KY', 'GA', 'HI'], ARRAY['water', 'sewer'], false, 'https://www.amwater.com'),

  -- Other large utilities
  ('a0000000-0000-0000-0000-000000000017', 'Xcel Energy', 'xcel-energy',
   ARRAY['CO', 'MN', 'WI', 'TX', 'NM', 'ND', 'SD', 'MI'], ARRAY['electric', 'gas'], false, 'https://www.xcelenergy.com'),

  ('a0000000-0000-0000-0000-000000000018', 'Eversource', 'eversource',
   ARRAY['CT', 'MA', 'NH'], ARRAY['electric', 'gas'], true, 'https://www.eversource.com'),

  ('a0000000-0000-0000-0000-000000000019', 'PPL Electric', 'ppl-electric',
   ARRAY['PA', 'KY'], ARRAY['electric'], true, 'https://www.pplelectric.com'),

  ('a0000000-0000-0000-0000-000000000020', 'Georgia Power', 'georgia-power',
   ARRAY['GA'], ARRAY['electric'], false, 'https://www.georgiapower.com')

ON CONFLICT (id) DO NOTHING;

-- =============================================================================
-- TEST USER & SAMPLE DATA
-- Seeds a test user with profile, utility accounts, 12 months of bills,
-- and a detected anomaly. Used for development and E2E testing.
--
-- The test user is created directly in auth.users (seed.sql runs with
-- superuser privileges via `supabase db reset`).
-- =============================================================================

-- Create test user in auth.users
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  aud,
  role,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  recovery_token
)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'testuser@billwatch.test',
  crypt('testpassword123', gen_salt('bf')),
  NOW(),
  'authenticated',
  'authenticated',
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{"display_name": "Test User"}'::jsonb,
  NOW(),
  NOW(),
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Create identity for the test user (required for Supabase Auth login)
INSERT INTO auth.identities (
  id,
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
VALUES (
  'e0000000-0000-0000-0000-000000000001',
  'e0000000-0000-0000-0000-000000000001',
  'e0000000-0000-0000-0000-000000000001',
  '{"sub": "e0000000-0000-0000-0000-000000000001", "email": "testuser@billwatch.test"}'::jsonb,
  'email',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (id, provider) DO NOTHING;

-- Test user profile
INSERT INTO user_profiles (id, zip_code, home_sqft, household_size, home_type, heating_type, cooling_type)
VALUES ('e0000000-0000-0000-0000-000000000001', '10001', 1200, 3, 'apartment', 'gas', 'central_ac')
ON CONFLICT (id) DO NOTHING;

-- Test user utility accounts (electric + gas with Con Edison)
INSERT INTO utility_accounts (id, user_id, provider_id, provider_name, account_type, account_nickname, account_number_last4)
VALUES
  ('b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Consolidated Edison', 'electric', 'Main Electric', '4567'),
  ('b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000005', 'Consolidated Edison', 'gas', 'Main Gas', '8901')
ON CONFLICT (id) DO NOTHING;

-- 12 months of electric bills (Mar 2025 – Feb 2026) for anomaly detection testing
-- Realistic NYC apartment pattern: low spring/fall, high summer (AC), moderate winter
INSERT INTO bills (id, account_id, user_id, amount_cents, usage_quantity, usage_unit, rate_per_unit, period_start, period_end)
VALUES
  ('c0000000-0000-0000-0000-000000000001', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 8500, 650, 'kWh', 0.1308, '2025-03-01', '2025-03-31'),
  ('c0000000-0000-0000-0000-000000000002', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 9200, 710, 'kWh', 0.1296, '2025-04-01', '2025-04-30'),
  ('c0000000-0000-0000-0000-000000000003', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 12500, 950, 'kWh', 0.1316, '2025-05-01', '2025-05-31'),
  ('c0000000-0000-0000-0000-000000000004', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 16800, 1280, 'kWh', 0.1313, '2025-06-01', '2025-06-30'),
  ('c0000000-0000-0000-0000-000000000005', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 19500, 1490, 'kWh', 0.1309, '2025-07-01', '2025-07-31'),
  ('c0000000-0000-0000-0000-000000000006', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 18200, 1390, 'kWh', 0.1309, '2025-08-01', '2025-08-31'),
  ('c0000000-0000-0000-0000-000000000007', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 13100, 1000, 'kWh', 0.1310, '2025-09-01', '2025-09-30'),
  ('c0000000-0000-0000-0000-000000000008', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 9800, 750, 'kWh', 0.1307, '2025-10-01', '2025-10-31'),
  ('c0000000-0000-0000-0000-000000000009', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 10200, 780, 'kWh', 0.1308, '2025-11-01', '2025-11-30'),
  ('c0000000-0000-0000-0000-000000000010', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 11500, 880, 'kWh', 0.1307, '2025-12-01', '2025-12-31'),
  ('c0000000-0000-0000-0000-000000000011', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 10800, 825, 'kWh', 0.1309, '2026-01-01', '2026-01-31'),
  -- Anomalous bill: sudden spike (z-score > 2) — triggers anomaly detection
  ('c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 28500, 2180, 'kWh', 0.1308, '2026-02-01', '2026-02-28')
ON CONFLICT (id) DO NOTHING;

-- 6 months of gas bills for the gas account
INSERT INTO bills (id, account_id, user_id, amount_cents, usage_quantity, usage_unit, rate_per_unit, period_start, period_end)
VALUES
  ('c0000000-0000-0000-0000-000000000101', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 4500, 30, 'therms', 1.50, '2025-09-01', '2025-09-30'),
  ('c0000000-0000-0000-0000-000000000102', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 7200, 48, 'therms', 1.50, '2025-10-01', '2025-10-31'),
  ('c0000000-0000-0000-0000-000000000103', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 10800, 72, 'therms', 1.50, '2025-11-01', '2025-11-30'),
  ('c0000000-0000-0000-0000-000000000104', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 13500, 90, 'therms', 1.50, '2025-12-01', '2025-12-31'),
  ('c0000000-0000-0000-0000-000000000105', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 12000, 80, 'therms', 1.50, '2026-01-01', '2026-01-31'),
  ('c0000000-0000-0000-0000-000000000106', 'b0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 9000, 60, 'therms', 1.50, '2026-02-01', '2026-02-28')
ON CONFLICT (id) DO NOTHING;

-- Sample anomaly for the spike bill (February electric)
INSERT INTO anomalies (id, bill_id, account_id, user_id, anomaly_type, severity, description, expected_amount_cents, actual_amount_cents, z_score)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'c0000000-0000-0000-0000-000000000012', 'b0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'usage_spike', 'high', 'Your February electric bill is 163% higher than your 12-month average. Usage jumped from ~900 kWh/mo to 2,180 kWh. This may indicate a faulty appliance, meter error, or unusually heavy heating usage.', 12800, 28500, 3.2)
ON CONFLICT (id) DO NOTHING;

-- Test user subscription (free plan)
INSERT INTO subscriptions (id, user_id, plan, status, current_period_start, current_period_end)
VALUES
  ('f0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 'free', 'active', NOW(), NOW() + INTERVAL '30 days')
ON CONFLICT (id) DO NOTHING;

-- GhostBoard Seed Data
-- Idempotent: uses INSERT ... ON CONFLICT DO NOTHING
-- Contains top 50 companies by hiring volume and sample reports

-- =============================================================================
-- Companies (top 50 by hiring volume)
-- =============================================================================

INSERT INTO companies (slug, name, domain, industry, company_size, headquarters) VALUES
  ('amazon', 'Amazon', 'amazon.com', 'Technology', 'enterprise', 'Seattle, WA'),
  ('google', 'Google', 'google.com', 'Technology', 'enterprise', 'Mountain View, CA'),
  ('meta', 'Meta', 'meta.com', 'Technology', 'enterprise', 'Menlo Park, CA'),
  ('apple', 'Apple', 'apple.com', 'Technology', 'enterprise', 'Cupertino, CA'),
  ('microsoft', 'Microsoft', 'microsoft.com', 'Technology', 'enterprise', 'Redmond, WA'),
  ('netflix', 'Netflix', 'netflix.com', 'Technology', 'large', 'Los Gatos, CA'),
  ('tesla', 'Tesla', 'tesla.com', 'Automotive', 'enterprise', 'Austin, TX'),
  ('nvidia', 'NVIDIA', 'nvidia.com', 'Technology', 'large', 'Santa Clara, CA'),
  ('salesforce', 'Salesforce', 'salesforce.com', 'Technology', 'enterprise', 'San Francisco, CA'),
  ('adobe', 'Adobe', 'adobe.com', 'Technology', 'large', 'San Jose, CA'),
  ('oracle', 'Oracle', 'oracle.com', 'Technology', 'enterprise', 'Austin, TX'),
  ('ibm', 'IBM', 'ibm.com', 'Technology', 'enterprise', 'Armonk, NY'),
  ('intel', 'Intel', 'intel.com', 'Technology', 'enterprise', 'Santa Clara, CA'),
  ('uber', 'Uber', 'uber.com', 'Transportation', 'large', 'San Francisco, CA'),
  ('airbnb', 'Airbnb', 'airbnb.com', 'Hospitality', 'large', 'San Francisco, CA'),
  ('spotify', 'Spotify', 'spotify.com', 'Media', 'large', 'Stockholm, Sweden'),
  ('stripe', 'Stripe', 'stripe.com', 'Fintech', 'large', 'San Francisco, CA'),
  ('shopify', 'Shopify', 'shopify.com', 'E-commerce', 'large', 'Ottawa, Canada'),
  ('twitter', 'X (Twitter)', 'x.com', 'Technology', 'large', 'San Francisco, CA'),
  ('linkedin', 'LinkedIn', 'linkedin.com', 'Technology', 'enterprise', 'Sunnyvale, CA'),
  ('jpmorgan', 'JPMorgan Chase', 'jpmorganchase.com', 'Finance', 'enterprise', 'New York, NY'),
  ('goldman-sachs', 'Goldman Sachs', 'goldmansachs.com', 'Finance', 'enterprise', 'New York, NY'),
  ('morgan-stanley', 'Morgan Stanley', 'morganstanley.com', 'Finance', 'enterprise', 'New York, NY'),
  ('bank-of-america', 'Bank of America', 'bankofamerica.com', 'Finance', 'enterprise', 'Charlotte, NC'),
  ('wells-fargo', 'Wells Fargo', 'wellsfargo.com', 'Finance', 'enterprise', 'San Francisco, CA'),
  ('deloitte', 'Deloitte', 'deloitte.com', 'Consulting', 'enterprise', 'London, UK'),
  ('mckinsey', 'McKinsey & Company', 'mckinsey.com', 'Consulting', 'large', 'New York, NY'),
  ('accenture', 'Accenture', 'accenture.com', 'Consulting', 'enterprise', 'Dublin, Ireland'),
  ('walmart', 'Walmart', 'walmart.com', 'Retail', 'enterprise', 'Bentonville, AR'),
  ('target', 'Target', 'target.com', 'Retail', 'enterprise', 'Minneapolis, MN'),
  ('johnson-johnson', 'Johnson & Johnson', 'jnj.com', 'Healthcare', 'enterprise', 'New Brunswick, NJ'),
  ('pfizer', 'Pfizer', 'pfizer.com', 'Healthcare', 'enterprise', 'New York, NY'),
  ('unitedhealth', 'UnitedHealth Group', 'unitedhealthgroup.com', 'Healthcare', 'enterprise', 'Minnetonka, MN'),
  ('boeing', 'Boeing', 'boeing.com', 'Aerospace', 'enterprise', 'Arlington, VA'),
  ('lockheed-martin', 'Lockheed Martin', 'lockheedmartin.com', 'Aerospace', 'enterprise', 'Bethesda, MD'),
  ('general-motors', 'General Motors', 'gm.com', 'Automotive', 'enterprise', 'Detroit, MI'),
  ('ford', 'Ford Motor Company', 'ford.com', 'Automotive', 'enterprise', 'Dearborn, MI'),
  ('att', 'AT&T', 'att.com', 'Telecommunications', 'enterprise', 'Dallas, TX'),
  ('verizon', 'Verizon', 'verizon.com', 'Telecommunications', 'enterprise', 'New York, NY'),
  ('comcast', 'Comcast', 'comcast.com', 'Telecommunications', 'enterprise', 'Philadelphia, PA'),
  ('disney', 'The Walt Disney Company', 'disney.com', 'Entertainment', 'enterprise', 'Burbank, CA'),
  ('coca-cola', 'Coca-Cola', 'coca-cola.com', 'Consumer Goods', 'enterprise', 'Atlanta, GA'),
  ('procter-gamble', 'Procter & Gamble', 'pg.com', 'Consumer Goods', 'enterprise', 'Cincinnati, OH'),
  ('exxonmobil', 'ExxonMobil', 'exxonmobil.com', 'Energy', 'enterprise', 'Spring, TX'),
  ('chevron', 'Chevron', 'chevron.com', 'Energy', 'enterprise', 'San Ramon, CA'),
  ('snap', 'Snap Inc.', 'snap.com', 'Technology', 'medium', 'Santa Monica, CA'),
  ('palantir', 'Palantir Technologies', 'palantir.com', 'Technology', 'large', 'Denver, CO'),
  ('databricks', 'Databricks', 'databricks.com', 'Technology', 'large', 'San Francisco, CA'),
  ('snowflake', 'Snowflake', 'snowflake.com', 'Technology', 'large', 'Bozeman, MT'),
  ('coinbase', 'Coinbase', 'coinbase.com', 'Fintech', 'large', 'Remote')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- Sample reports (anonymous — user_id IS NULL)
-- Using subqueries to reference companies by slug for idempotency
-- =============================================================================

-- We use a DO block to insert sample reports only if the reports table is empty,
-- making this idempotent for repeated runs.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM reports LIMIT 1) THEN
    -- Amazon reports (8 reports — enough for stats)
    INSERT INTO reports (company_id, status, applied_date, response_date, response_days, role_level, application_method) VALUES
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'ghosted', '2025-11-01', NULL, NULL, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'ghosted', '2025-11-15', NULL, NULL, 'senior', 'online'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'heard_back', '2025-12-01', '2025-12-15', 14, 'entry', 'online'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'interviewed', '2025-12-10', '2025-12-20', 10, 'mid', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'ghosted', '2026-01-05', NULL, NULL, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'rejected', '2026-01-10', '2026-02-01', 22, 'senior', 'online'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'offered', '2026-01-15', '2026-02-10', 26, 'mid', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'amazon'), 'ghosted', '2026-02-01', NULL, NULL, 'entry', 'online');

    -- Google reports (7 reports)
    INSERT INTO reports (company_id, status, applied_date, response_date, response_days, role_level, application_method) VALUES
      ((SELECT id FROM companies WHERE slug = 'google'), 'heard_back', '2025-10-01', '2025-10-08', 7, 'senior', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'interviewed', '2025-11-01', '2025-11-10', 9, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'ghosted', '2025-12-01', NULL, NULL, 'entry', 'online'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'offered', '2026-01-01', '2026-01-20', 19, 'senior', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'rejected', '2026-01-15', '2026-02-15', 31, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'ghosted', '2026-02-01', NULL, NULL, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'google'), 'heard_back', '2026-02-10', '2026-02-17', 7, 'entry', 'career_fair');

    -- Meta reports (6 reports)
    INSERT INTO reports (company_id, status, applied_date, response_date, response_days, role_level, application_method) VALUES
      ((SELECT id FROM companies WHERE slug = 'meta'), 'ghosted', '2025-10-15', NULL, NULL, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'meta'), 'ghosted', '2025-11-01', NULL, NULL, 'senior', 'online'),
      ((SELECT id FROM companies WHERE slug = 'meta'), 'ghosted', '2025-12-01', NULL, NULL, 'entry', 'online'),
      ((SELECT id FROM companies WHERE slug = 'meta'), 'interviewed', '2026-01-01', '2026-01-14', 13, 'senior', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'meta'), 'rejected', '2026-01-20', '2026-02-20', 31, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'meta'), 'ghosted', '2026-02-15', NULL, NULL, 'mid', 'online');

    -- Microsoft reports (6 reports)
    INSERT INTO reports (company_id, status, applied_date, response_date, response_days, role_level, application_method) VALUES
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'heard_back', '2025-10-01', '2025-10-05', 4, 'mid', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'interviewed', '2025-11-01', '2025-11-08', 7, 'senior', 'recruiter'),
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'offered', '2025-12-01', '2025-12-20', 19, 'mid', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'ghosted', '2026-01-15', NULL, NULL, 'entry', 'online'),
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'heard_back', '2026-02-01', '2026-02-08', 7, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'microsoft'), 'rejected', '2026-02-10', '2026-03-01', 19, 'senior', 'online');

    -- Tesla reports (5 reports — minimum threshold)
    INSERT INTO reports (company_id, status, applied_date, response_date, response_days, role_level, application_method) VALUES
      ((SELECT id FROM companies WHERE slug = 'tesla'), 'ghosted', '2025-11-01', NULL, NULL, 'mid', 'online'),
      ((SELECT id FROM companies WHERE slug = 'tesla'), 'ghosted', '2025-12-01', NULL, NULL, 'entry', 'online'),
      ((SELECT id FROM companies WHERE slug = 'tesla'), 'ghosted', '2026-01-01', NULL, NULL, 'senior', 'online'),
      ((SELECT id FROM companies WHERE slug = 'tesla'), 'heard_back', '2026-01-15', '2026-02-01', 17, 'mid', 'referral'),
      ((SELECT id FROM companies WHERE slug = 'tesla'), 'rejected', '2026-02-01', '2026-03-01', 28, 'mid', 'online');
  END IF;
END $$;

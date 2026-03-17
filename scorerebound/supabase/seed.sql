-- Seed data for ScoreRebound development and testing
-- Idempotent: uses ON CONFLICT DO NOTHING so running twice is safe
--
-- Test accounts use predictable UUIDs so Playwright tests can reference them.
-- These are only inserted in local/test environments via `supabase db reset`.

-- ============================================================================
-- Test user UUIDs (predictable for Playwright/CI)
-- ============================================================================
-- test-user-1: test@scorerebound.dev / password: testpass123
-- test-user-2: test2@scorerebound.dev / password: testpass123
-- test-anon:   anonymous session user

-- Insert test users into auth.users (Supabase Auth)
-- The on_auth_user_created trigger will auto-create profiles
INSERT INTO auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'test@scorerebound.dev',
  crypt('testpass123', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{"display_name": "Test User"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
), (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'test2@scorerebound.dev',
  crypt('testpass123', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{"display_name": "Test User 2"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
), (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'anon@scorerebound.dev',
  crypt('testpass123', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"]}'::jsonb,
  '{"display_name": "Anonymous Test"}'::jsonb,
  now(),
  now(),
  '',
  '',
  '',
  ''
)
ON CONFLICT (id) DO NOTHING;

-- Insert identities for test users (required by Supabase Auth)
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'test@scorerebound.dev',
  '{"sub": "00000000-0000-0000-0000-000000000001", "email": "test@scorerebound.dev"}'::jsonb,
  'email',
  now(),
  now(),
  now()
), (
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'test2@scorerebound.dev',
  '{"sub": "00000000-0000-0000-0000-000000000002", "email": "test2@scorerebound.dev"}'::jsonb,
  'email',
  now(),
  now(),
  now()
), (
  '00000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000003',
  'anon@scorerebound.dev',
  '{"sub": "00000000-0000-0000-0000-000000000003", "email": "anon@scorerebound.dev"}'::jsonb,
  'email',
  now(),
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Update profiles created by the trigger with display names
-- ============================================================================
UPDATE profiles SET
  display_name = 'Test User',
  score_range = '500_579',
  is_anonymous = false
WHERE id = '00000000-0000-0000-0000-000000000001';

UPDATE profiles SET
  display_name = 'Test User 2',
  score_range = '620_659',
  is_anonymous = false
WHERE id = '00000000-0000-0000-0000-000000000002';

UPDATE profiles SET
  display_name = 'Anonymous Test',
  is_anonymous = true
WHERE id = '00000000-0000-0000-0000-000000000003';

-- ============================================================================
-- Sample quiz responses
-- ============================================================================
INSERT INTO quiz_responses (id, user_id, loan_type, servicer, delinquency_status, current_score_range, goals) VALUES
(
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'federal_direct',
  'MOHELA',
  '90_plus',
  '500_579',
  ARRAY['improve_credit_score', 'get_out_of_default', 'qualify_for_mortgage']
),
(
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'parent_plus',
  'Nelnet',
  '60_days',
  '620_659',
  ARRAY['lower_monthly_payment', 'improve_credit_score']
),
-- Anonymous quiz response (no user_id)
(
  '10000000-0000-0000-0000-000000000003',
  NULL,
  'federal_ffel',
  'Aidvantage',
  'default',
  '300_499',
  ARRAY['get_out_of_default', 'stop_wage_garnishment']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample recovery plans
-- ============================================================================
INSERT INTO recovery_plans (id, quiz_response_id, user_id, plan_json, recovery_path, estimated_months) VALUES
(
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  '{
    "title": "Federal Direct Loan Recovery via Rehabilitation",
    "summary": "Your best path is loan rehabilitation: 9 consecutive on-time payments to remove the default from your credit report.",
    "steps_overview": ["Contact MOHELA", "Enroll in rehabilitation", "Set up auto-pay", "Apply for IBR after rehabilitation", "Monitor credit score"],
    "estimated_score_improvement": "80-120 points",
    "warnings": ["Do not consolidate before rehabilitation if you want the default removed from credit report"]
  }'::jsonb,
  'rehabilitation',
  12
),
(
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  '{
    "title": "Parent PLUS Loan IBR Enrollment",
    "summary": "Consolidate your Parent PLUS loan to access IBR repayment plans and lower your monthly payment.",
    "steps_overview": ["Apply for Direct Consolidation", "Enroll in ICR plan", "Set up auto-pay for 0.25% rate reduction", "Monitor payment status"],
    "estimated_score_improvement": "40-60 points",
    "warnings": ["Parent PLUS loans only qualify for ICR, not other IBR plans, unless consolidated"]
  }'::jsonb,
  'ibr_enrollment',
  9
),
-- Anonymous recovery plan
(
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000003',
  NULL,
  '{
    "title": "FFEL Loan Default Recovery",
    "summary": "Consolidation is your fastest path out of default for FFEL loans. This will stop collections and give you access to IBR.",
    "steps_overview": ["Request consolidation application", "Choose IBR plan during consolidation", "Set up auto-pay", "Apply for credit-builder loan"],
    "estimated_score_improvement": "60-100 points",
    "warnings": ["Consolidation does NOT remove the default from your credit report (only rehabilitation does)"]
  }'::jsonb,
  'consolidation',
  6
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample plan steps
-- ============================================================================
INSERT INTO plan_steps (id, plan_id, step_order, title, description, action_url, is_completed, completed_at) VALUES
-- Steps for Plan 1 (Rehabilitation)
(
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  1,
  'Contact MOHELA',
  'Call MOHELA at 1-888-866-4352 and request loan rehabilitation. Ask about your rehabilitation payment amount.',
  'https://www.mohela.com/DL/resourceCenter/ContactUs.aspx',
  true,
  now() - interval '30 days'
),
(
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  2,
  'Sign Rehabilitation Agreement',
  'Review and sign the rehabilitation agreement. Your payment will be 15% of discretionary income divided by 12.',
  NULL,
  true,
  now() - interval '25 days'
),
(
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  3,
  'Make 9 Consecutive Payments',
  'Make 9 on-time monthly payments within 20 days of the due date. Set up auto-pay to avoid missing any.',
  NULL,
  false,
  NULL
),
(
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  4,
  'Apply for IBR After Rehabilitation',
  'Once rehabilitation is complete, apply for an Income-Based Repayment plan to keep payments affordable.',
  'https://studentaid.gov/idr/',
  false,
  NULL
),
(
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  5,
  'Monitor Credit Score Recovery',
  'Check your credit report 30-60 days after rehabilitation completes. The default should be removed.',
  NULL,
  false,
  NULL
),
-- Steps for Plan 2 (IBR Enrollment)
(
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000002',
  1,
  'Apply for Direct Consolidation',
  'Apply at studentaid.gov to consolidate your Parent PLUS loan into a Direct Consolidation Loan.',
  'https://studentaid.gov/app/launchConsolidation.action',
  false,
  NULL
),
(
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000002',
  2,
  'Select ICR Repayment Plan',
  'During consolidation, select Income-Contingent Repayment (ICR). This is the only income-driven plan available for consolidated Parent PLUS loans.',
  NULL,
  false,
  NULL
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample progress entries
-- ============================================================================
INSERT INTO progress_entries (id, user_id, plan_id, action_type, action_description, score_snapshot, completed_at) VALUES
(
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'score_check',
  'Initial credit score check before starting rehabilitation',
  520,
  now() - interval '35 days'
),
(
  '40000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'milestone',
  'Contacted MOHELA and started rehabilitation process',
  NULL,
  now() - interval '30 days'
),
(
  '40000000-0000-0000-0000-000000000003',
  '00000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'score_check',
  'Monthly credit score check - slight improvement after starting rehab',
  535,
  now() - interval '5 days'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample affiliate clicks
-- ============================================================================
INSERT INTO affiliate_clicks (id, user_id, product_slug, affiliate_url, referrer_page, clicked_at) VALUES
(
  '50000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'self-credit-builder',
  'https://www.self.inc/refer/scorerebound',
  '/recovery-plan',
  now() - interval '10 days'
),
(
  '50000000-0000-0000-0000-000000000002',
  NULL,
  'discover-secured-card',
  'https://www.discover.com/credit-cards/secured/',
  '/recovery-paths/credit-building',
  now() - interval '3 days'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================================
-- Sample email sequences
-- ============================================================================
INSERT INTO email_sequences (id, user_id, sequence_name, current_step, status, last_sent_at, next_send_at, metadata) VALUES
(
  '60000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000001',
  'rehabilitation_drip',
  3,
  'active',
  now() - interval '3 days',
  now() + interval '4 days',
  '{"quiz_response_id": "10000000-0000-0000-0000-000000000001", "recovery_path": "rehabilitation"}'::jsonb
),
(
  '60000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000002',
  'ibr_enrollment_drip',
  1,
  'active',
  now() - interval '1 day',
  now() + interval '6 days',
  '{"quiz_response_id": "10000000-0000-0000-0000-000000000002", "recovery_path": "ibr_enrollment"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

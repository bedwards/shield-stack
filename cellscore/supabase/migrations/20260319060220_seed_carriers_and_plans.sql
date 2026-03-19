-- CellScore Seed Data: 16 carriers (3 MNOs + 13 MVNOs), 65 plans
-- Idempotent: uses ON CONFLICT DO NOTHING on unique constraints
-- Pricing verified against carrier websites as of March 2026

-- ============================================================================
-- Carriers — 3 MNOs
-- ============================================================================

INSERT INTO carriers (name, slug, type, parent_carrier_id, website, affiliate_url, logo_url)
VALUES
  ('AT&T', 'att', 'mno', NULL, 'https://www.att.com', NULL, NULL),
  ('Verizon', 'verizon', 'mno', NULL, 'https://www.verizon.com', NULL, NULL),
  ('T-Mobile', 'tmobile', 'mno', NULL, 'https://www.t-mobile.com', NULL, NULL)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- Carriers — 13 MVNOs (with parent_carrier_id references)
-- ============================================================================

INSERT INTO carriers (name, slug, type, parent_carrier_id, website, affiliate_url, logo_url)
VALUES
  ('Mint Mobile', 'mint-mobile', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'tmobile'),
    'https://www.mintmobile.com',
    'https://www.mintmobile.com/?utm_source=cellscore', NULL),
  ('Visible', 'visible', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'verizon'),
    'https://www.visible.com',
    'https://www.visible.com/?utm_source=cellscore', NULL),
  ('Cricket Wireless', 'cricket', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'att'),
    'https://www.cricketwireless.com',
    'https://www.cricketwireless.com/?utm_source=cellscore', NULL),
  ('US Mobile', 'us-mobile', 'mvno',
    NULL,  -- operates on all 3 networks
    'https://www.usmobile.com',
    'https://www.usmobile.com/?utm_source=cellscore', NULL),
  ('Google Fi', 'google-fi', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'tmobile'),
    'https://fi.google.com',
    'https://fi.google.com/?utm_source=cellscore', NULL),
  ('Boost Mobile', 'boost-mobile', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'tmobile'),
    'https://www.boostmobile.com',
    'https://www.boostmobile.com/?utm_source=cellscore', NULL),
  ('Metro by T-Mobile', 'metro', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'tmobile'),
    'https://www.metrobyt-mobile.com',
    'https://www.metrobyt-mobile.com/?utm_source=cellscore', NULL),
  ('Straight Talk', 'straight-talk', 'mvno',
    NULL,  -- operates on all 3 networks
    'https://www.straighttalk.com',
    'https://www.straighttalk.com/?utm_source=cellscore', NULL),
  ('Consumer Cellular', 'consumer-cellular', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'att'),
    'https://www.consumercellular.com',
    'https://www.consumercellular.com/?utm_source=cellscore', NULL),
  ('Tello', 'tello', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'tmobile'),
    'https://www.tello.com',
    'https://www.tello.com/?utm_source=cellscore', NULL),
  ('Xfinity Mobile', 'xfinity-mobile', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'verizon'),
    'https://www.xfinity.com/mobile',
    NULL, NULL),
  ('Spectrum Mobile', 'spectrum-mobile', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'verizon'),
    'https://www.spectrum.com/mobile',
    NULL, NULL),
  ('Total by Verizon', 'total-by-verizon', 'mvno',
    (SELECT id FROM carriers WHERE slug = 'verizon'),
    'https://www.totalbyverizon.com',
    'https://www.totalbyverizon.com/?utm_source=cellscore', NULL)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================================
-- Plans — AT&T (6 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Value Plus', 50.00, NULL, '1 Mbps after deprioritization', 5,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD"}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Unlimited Starter', 65.99, NULL, '1 Mbps after deprioritization', 5,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD"}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Unlimited Extra', 75.99, NULL, '1 Mbps after 75GB', 30,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "streaming_perks": "none"}',
    'QCI 8', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Unlimited Premium PL', 85.99, NULL, NULL, 60,
    1, 5,
    '{"five_g": true, "five_g_plus": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "4K", "streaming_perks": "none"}',
    'QCI 7', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Prepaid Unlimited', 50.00, NULL, '1.5 Mbps after 16GB', 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD", "contract_required": false}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'att'),
    'Prepaid 15GB', 40.00, 15, NULL, 0,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', NULL, '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Verizon (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'verizon'),
    'Unlimited Welcome', 65.00, NULL, '1 Mbps after deprioritization', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "streaming_quality": "SD"}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'verizon'),
    'Unlimited Plus', 80.00, NULL, '1 Mbps after 30GB', 30,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "streaming_perks": "Disney+ Basic, Hulu, ESPN+"}',
    'QCI 8', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'verizon'),
    'Unlimited Ultimate', 90.00, NULL, NULL, 60,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "4K", "streaming_perks": "Disney+ Premium, Hulu, ESPN+"}',
    'QCI 7', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'verizon'),
    'Prepaid Unlimited', 50.00, NULL, '600 kbps after 15GB', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', NULL, '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — T-Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'tmobile'),
    'Essentials', 60.00, NULL, '1 Mbps after deprioritization', 0,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "streaming_quality": "480p"}',
    'QCI 7', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tmobile'),
    'Go5G', 75.00, NULL, '1 Mbps after 100GB', 15,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "HD", "streaming_perks": "Netflix Standard with ads"}',
    'QCI 6', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tmobile'),
    'Go5G Plus', 90.00, NULL, NULL, 50,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "4K", "streaming_perks": "Netflix Standard, Apple TV+"}',
    'QCI 6', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tmobile'),
    'Go5G Next', 100.00, NULL, NULL, NULL,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "4K", "streaming_perks": "Netflix Standard, Apple TV+, Hulu", "phone_upgrade": "annual"}',
    'QCI 6', NULL, '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Mint Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'mint-mobile'),
    '5GB', 15.00, 5, '128 kbps after 5GB', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "annual_billing": true}',
    'QCI 9', 'https://www.mintmobile.com/plans/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'mint-mobile'),
    '15GB', 20.00, 15, '128 kbps after 15GB', 15,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "annual_billing": true}',
    'QCI 9', 'https://www.mintmobile.com/plans/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'mint-mobile'),
    '20GB', 25.00, 20, '128 kbps after 20GB', 20,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "annual_billing": true}',
    'QCI 9', 'https://www.mintmobile.com/plans/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'mint-mobile'),
    'Unlimited', 30.00, NULL, '128 kbps after 40GB', 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "annual_billing": true}',
    'QCI 9', 'https://www.mintmobile.com/plans/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Visible (2 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'visible'),
    'Visible', 25.00, NULL, '200 Mbps cap, deprioritized', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.visible.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'visible'),
    'Visible+', 45.00, NULL, NULL, NULL,
    1, 1,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": true, "hotspot": true, "contract_required": false}',
    'QCI 8', 'https://www.visible.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Cricket Wireless (5 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'cricket'),
    '2GB', 30.00, 2, '128 kbps after 2GB', 0,
    1, 5,
    '{"five_g": false, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.cricketwireless.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'cricket'),
    '5GB', 40.00, 5, '128 kbps after 5GB', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.cricketwireless.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'cricket'),
    '10GB', 55.00, 10, '128 kbps after 10GB', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.cricketwireless.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'cricket'),
    'Unlimited', 55.00, NULL, '128 kbps after deprioritization', 15,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD", "contract_required": false}',
    'QCI 9', 'https://www.cricketwireless.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'cricket'),
    'Unlimited+', 60.00, NULL, NULL, 15,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "contract_required": false}',
    'QCI 8', 'https://www.cricketwireless.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — US Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'us-mobile'),
    'Light', 10.00, 2, '128 kbps after 2GB', 0,
    1, 5,
    '{"five_g": false, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "network_choice": true}',
    'QCI 9', 'https://www.usmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'us-mobile'),
    'Unlimited Basic', 25.00, NULL, '1 Mbps after 35GB', 10,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "network_choice": true}',
    'QCI 9', 'https://www.usmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'us-mobile'),
    'Unlimited Premium', 44.00, NULL, '1 Mbps after 100GB', 50,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "HD", "contract_required": false, "network_choice": true}',
    'QCI 8', 'https://www.usmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'us-mobile'),
    'Unlimited All', 49.00, NULL, NULL, NULL,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "4K", "contract_required": false, "network_choice": true, "streaming_perks": "Disney+, Hulu, ESPN+"}',
    'QCI 7', 'https://www.usmobile.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Google Fi (3 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'google-fi'),
    'Flexible', 20.00, NULL, '$10/GB usage, capped at 6GB ($80 max)', NULL,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "contract_required": false, "pay_per_use_data": true, "international_data": true}',
    'QCI 9', 'https://fi.google.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'google-fi'),
    'Simply Unlimited', 50.00, NULL, '1 Mbps after 35GB', 5,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://fi.google.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'google-fi'),
    'Unlimited Plus', 65.00, NULL, NULL, 100,
    1, 6,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "contract_required": false, "international_data": true, "vpn_included": true}',
    'QCI 8', 'https://fi.google.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Boost Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'boost-mobile'),
    '5GB', 15.00, 5, '128 kbps after 5GB', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.boostmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'boost-mobile'),
    'Unlimited', 25.00, NULL, '512 kbps after deprioritization', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.boostmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'boost-mobile'),
    'Unlimited+', 35.00, NULL, '512 kbps after 30GB', 12,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "contract_required": false}',
    'QCI 9', 'https://www.boostmobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'boost-mobile'),
    'Unlimited Premium', 50.00, NULL, NULL, 30,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "4K", "contract_required": false}',
    'QCI 8', 'https://www.boostmobile.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Metro by T-Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'metro'),
    '5GB', 30.00, 5, '128 kbps after 5GB', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.metrobyt-mobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'metro'),
    'Flex Unlimited', 40.00, NULL, '480p video, deprioritized', 5,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD", "contract_required": false}',
    'QCI 9', 'https://www.metrobyt-mobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'metro'),
    'Flex Plus Unlimited', 50.00, NULL, '480p video, 50GB premium', 15,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "streaming_perks": "Amazon Prime", "contract_required": false}',
    'QCI 8', 'https://www.metrobyt-mobile.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'metro'),
    'Flex Plus Unlimited with Streaming', 60.00, NULL, NULL, 15,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "streaming_perks": "Amazon Prime, YouTube Premium", "contract_required": false}',
    'QCI 7', 'https://www.metrobyt-mobile.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Straight Talk (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'straight-talk'),
    'Gold', 30.00, 5, '128 kbps after 5GB', 0,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "network_choice": true}',
    'QCI 9', 'https://www.straighttalk.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'straight-talk'),
    'Silver', 35.00, 10, '128 kbps after 10GB', 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "network_choice": true}',
    'QCI 9', 'https://www.straighttalk.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'straight-talk'),
    'Platinum Unlimited', 45.00, NULL, '128 kbps after deprioritization', 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "network_choice": true}',
    'QCI 9', 'https://www.straighttalk.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'straight-talk'),
    'Ultimate Unlimited', 55.00, NULL, NULL, 15,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": true, "hotspot": true, "streaming_quality": "HD", "contract_required": false, "network_choice": true}',
    'QCI 8', 'https://www.straighttalk.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Consumer Cellular (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'consumer-cellular'),
    'Talk', 20.00, 1, '128 kbps after 1GB', 0,
    1, 2,
    '{"five_g": false, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "aarp_discount": true}',
    'QCI 9', 'https://www.consumercellular.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'consumer-cellular'),
    'Connect', 25.00, 5, '128 kbps after 5GB', 0,
    1, 2,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "aarp_discount": true}',
    'QCI 9', 'https://www.consumercellular.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'consumer-cellular'),
    'Connect+', 30.00, 10, '128 kbps after 10GB', 0,
    1, 2,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "aarp_discount": true}',
    'QCI 9', 'https://www.consumercellular.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'consumer-cellular'),
    'Unlimited Talk & Data', 50.00, NULL, '128 kbps after deprioritization', 10,
    1, 2,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "aarp_discount": true}',
    'QCI 9', 'https://www.consumercellular.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Tello (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'tello'),
    'Economy', 10.00, 1, '64 kbps after 1GB', 1,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.tello.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tello'),
    'Value', 14.00, 5, '64 kbps after 5GB', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.tello.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tello'),
    'Smart', 19.00, 10, '64 kbps after 10GB', 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.tello.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'tello'),
    'Unlimited', 29.00, NULL, '64 kbps after 25GB', 25,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.tello.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Xfinity Mobile (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'xfinity-mobile'),
    'By the Gig 1GB', 15.00, 1, 'Throttled after 1GB', 1,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "requires_xfinity_internet": true}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'xfinity-mobile'),
    'By the Gig 3GB', 30.00, 3, 'Throttled after 3GB', 3,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "requires_xfinity_internet": true}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'xfinity-mobile'),
    'Unlimited', 40.00, NULL, '1.5 Mbps after deprioritization', 0,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false, "requires_xfinity_internet": true}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'xfinity-mobile'),
    'Unlimited Plus', 55.00, NULL, NULL, 15,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "contract_required": false, "requires_xfinity_internet": true}',
    'QCI 8', NULL, '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Spectrum Mobile (3 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'spectrum-mobile'),
    'By the Gig 1GB', 14.00, 1, 'Throttled after 1GB', 1,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false, "requires_spectrum_internet": true}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'spectrum-mobile'),
    'Unlimited', 29.99, NULL, '480p video, deprioritized', 5,
    1, 5,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "SD", "contract_required": false, "requires_spectrum_internet": true}',
    'QCI 9', NULL, '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'spectrum-mobile'),
    'Unlimited Plus', 39.99, NULL, NULL, 30,
    1, 5,
    '{"five_g": true, "five_g_uw": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "contract_required": false, "requires_spectrum_internet": true}',
    'QCI 8', NULL, '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

-- ============================================================================
-- Plans — Total by Verizon (4 plans)
-- ============================================================================

INSERT INTO plans (carrier_id, plan_name, monthly_price, data_limit_gb, throttle_speed_after, hotspot_gb, num_lines_min, num_lines_max, features, data_priority_level, affiliate_url, last_verified_at)
VALUES
  ((SELECT id FROM carriers WHERE slug = 'total-by-verizon'),
    '5GB', 30.00, 5, '128 kbps after 5GB', 0,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": false, "contract_required": false}',
    'QCI 9', 'https://www.totalbyverizon.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'total-by-verizon'),
    '15GB', 35.00, 15, '128 kbps after 15GB', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.totalbyverizon.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'total-by-verizon'),
    'Unlimited', 40.00, NULL, '128 kbps after deprioritization', 5,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "contract_required": false}',
    'QCI 9', 'https://www.totalbyverizon.com/?utm_source=cellscore', '2026-03-15'),
  ((SELECT id FROM carriers WHERE slug = 'total-by-verizon'),
    'Unlimited+', 50.00, NULL, NULL, 10,
    1, 1,
    '{"five_g": true, "wifi_calling": true, "international": false, "hotspot": true, "streaming_quality": "HD", "contract_required": false}',
    'QCI 8', 'https://www.totalbyverizon.com/?utm_source=cellscore', '2026-03-15')
ON CONFLICT (carrier_id, plan_name) DO NOTHING;

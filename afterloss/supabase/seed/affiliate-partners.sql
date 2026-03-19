-- Idempotent seed: Phase 1 affiliate partners for AfterLoss
-- Issue #304: Affiliate click tracking infrastructure
--
-- Uses ON CONFLICT DO UPDATE so re-running updates existing rows
-- without creating duplicates. Safe to run multiple times.
--
-- Source: afterloss/CLAUDE.md "Validated Affiliate Programs" section

INSERT INTO affiliate_partners (
  partner_name, slug, category, url, affiliate_url,
  description, commission_type, commission_value,
  cookie_days, network, display_context, is_active
) VALUES
  (
    'Rocket Lawyer',
    'rocket-lawyer',
    'legal',
    'https://www.rocketlawyer.com',
    'https://www.rocketlawyer.com',
    'Estate planning documents, attorney consultations, and legal forms. Highest commission affiliate partner.',
    'percentage',
    '30%',
    NULL,
    'yazing',
    ARRAY['estate_planning', 'attorney_referral', 'will_creation'],
    true
  ),
  (
    'Trust & Will',
    'trust-and-will',
    'legal',
    'https://trustandwill.com',
    'https://trustandwill.com',
    'Online will and trust creation platform. Average sale $80, up to $180.',
    'percentage',
    '20%',
    30,
    'impact',
    ARRAY['will_creation', 'estate_planning', 'trust_setup'],
    true
  ),
  (
    'LegalZoom',
    'legalzoom',
    'legal',
    'https://www.legalzoom.com',
    'https://www.legalzoom.com',
    'Legal documents, attorney services, and business formation. $125+ average sale.',
    'percentage',
    '15%',
    30,
    'cj',
    ARRAY['estate_planning', 'attorney_referral', 'probate_help'],
    true
  ),
  (
    'Nolo',
    'nolo',
    'legal',
    'https://www.nolo.com',
    'https://www.nolo.com',
    'Legal self-help books and guides. 120-day cookie ideal for grief users who delay purchase.',
    'percentage',
    'Up to 15%',
    120,
    'direct',
    ARRAY['probate_guide', 'legal_self_help', 'estate_planning'],
    true
  ),
  (
    'BetterHelp',
    'betterhelp',
    'counseling',
    'https://www.betterhelp.com',
    'https://www.betterhelp.com',
    'Online grief counseling and therapy. $10-$150 per referral, higher commissions at scale.',
    'per_lead',
    '$10-$150',
    NULL,
    'impact',
    ARRAY['grief_support', 'emotional_support', 'counseling_referral'],
    true
  ),
  (
    'VitalChek',
    'vitalchek',
    'documents',
    'https://www.vitalchek.com',
    'https://www.vitalchek.com',
    'Official death certificate ordering service. Essential for the first steps after a death.',
    'per_lead',
    'TBD',
    NULL,
    NULL,
    ARRAY['death_certificate', 'immediate_steps', 'document_ordering'],
    true
  ),
  (
    'Ever Loved',
    'ever-loved',
    'funeral',
    'https://www.everloved.com',
    'https://www.everloved.com',
    'Funeral products, memorial fundraising, and obituary creation.',
    'per_lead',
    'TBD',
    NULL,
    'direct',
    ARRAY['funeral_planning', 'memorial', 'obituary'],
    true
  ),
  (
    'Titan Casket',
    'titan-casket',
    'funeral',
    'https://www.titancasket.com',
    'https://www.titancasket.com',
    'Direct-to-consumer caskets at significant savings over funeral home prices.',
    'per_lead',
    'TBD',
    NULL,
    'refersion',
    ARRAY['funeral_planning', 'casket_purchase'],
    true
  )
ON CONFLICT (slug) DO UPDATE SET
  partner_name = EXCLUDED.partner_name,
  category = EXCLUDED.category,
  url = EXCLUDED.url,
  affiliate_url = EXCLUDED.affiliate_url,
  description = EXCLUDED.description,
  commission_type = EXCLUDED.commission_type,
  commission_value = EXCLUDED.commission_value,
  cookie_days = EXCLUDED.cookie_days,
  network = EXCLUDED.network,
  display_context = EXCLUDED.display_context,
  is_active = EXCLUDED.is_active;

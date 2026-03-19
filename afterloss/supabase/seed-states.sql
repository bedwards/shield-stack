-- AfterLoss State Probate Rules Seed Data
-- 50 US states + DC = 51 total records
-- All inserts are idempotent: ON CONFLICT (state_code) DO NOTHING
-- Run with: supabase db seed
--
-- Data sources:
--   VERIFIED (10 states): CA, TX, FL, NY, PA, IL, OH, GA, NC, MI
--     — State court websites, primary legal sources (March 2026)
--   SECONDARY (41 states):
--     — SmallEstateAffidavit.com, Justia 50-state survey, Nolo guides
--
-- See GitHub issue #253 for full curation methodology.
-- See afterloss/CLAUDE.md "Key State Probate Threshold Changes" for recent updates.

INSERT INTO state_probate_rules (
  state_code, state_name,
  probate_threshold, small_estate_affidavit_limit,
  simplified_probate_available, filing_deadline_days,
  probate_court_website_url, required_documents,
  estimated_timeline_months, filing_fees_min, filing_fees_max,
  data_verified, source_url, last_verified_date
) VALUES
  -- Alabama
  ('AL', 'Alabama',
   25000, 25000, true, 30,
   'https://judicial.alabama.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 50, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Alaska
  ('AK', 'Alaska',
   150000, 150000, true, 30,
   'https://courts.alaska.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   6, 75, 350,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Arizona (HB2116 effective Sept 2025: personal $200K, real $300K)
  ('AZ', 'Arizona',
   300000, 200000, true, 30,
   'https://www.azcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   6, 285, 500,
   false, 'https://gottlieblawaz.com/2025/08/21/arizona-new-small-estate-affidavit-limits-hb-2116/', '2026-03-19'),

  -- Arkansas
  ('AR', 'Arkansas',
   100000, 100000, true, 30,
   'https://www.arcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 175,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- California (AB 2016 effective Apr 1, 2025: $208,850)
  ('CA', 'California',
   208850, 208850, true, 30,
   'https://www.courts.ca.gov/8865.htm',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate affidavit (DE-310)", "Proof of identity of successor"]',
   12, 435, 435,
   true, 'https://selfhelp.courts.ca.gov/probate/small-estate', '2026-03-19'),

  -- Colorado
  ('CO', 'Colorado',
   74000, 74000, true, 10,
   'https://www.courts.state.co.us/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 199, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Connecticut
  ('CT', 'Connecticut',
   40000, 40000, true, 30,
   'https://www.ctprobate.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 150, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Delaware
  ('DE', 'Delaware',
   30000, 30000, true, 30,
   'https://courts.delaware.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 350,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- District of Columbia
  ('DC', 'District of Columbia',
   40000, 40000, true, 20,
   'https://www.dccourts.gov/services/probate-matters',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 80, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Florida (will must be filed within 10 days of death)
  ('FL', 'Florida',
   75000, 75000, true, 10,
   'https://www.flcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Petition for Summary Administration", "Surviving spouse affidavit (if applicable)"]',
   6, 235, 400,
   true, 'https://www.oberdorferlaw.com/blog/how-long-do-you-have-to-file-probate-after-death-in-florida/', '2026-03-19'),

  -- Georgia (lowest threshold in the nation at $10K)
  ('GA', 'Georgia',
   10000, 10000, true, 30,
   'https://www.gaprobate.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Year''s Support petition (if surviving spouse/children)"]',
   9, 200, 350,
   true, 'https://www.gaprobate.gov/', '2026-03-19'),

  -- Hawaii
  ('HI', 'Hawaii',
   100000, 100000, true, 30,
   'https://www.courts.state.hi.us/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Idaho
  ('ID', 'Idaho',
   100000, 100000, true, 30,
   'https://isc.idaho.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 266,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Illinois (raised from $100K to $150K effective Aug 15, 2025; vehicles excluded)
  ('IL', 'Illinois',
   150000, 150000, true, 30,
   'https://www.illinoiscourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate affidavit (vehicles excluded from limit calculation)"]',
   9, 250, 400,
   true, 'https://jwcolelaw.com/illinois-raises-small-estate-affidavit-threshold-to-150000-what-it-means-for-probate-and-estate-planning/', '2026-03-19'),

  -- Indiana (must wait 45 days after death for affidavit)
  ('IN', 'Indiana',
   50000, 50000, true, 45,
   'https://www.in.gov/courts/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 150, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Iowa
  ('IA', 'Iowa',
   100000, 100000, true, 30,
   'https://www.iowacourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Kansas
  ('KS', 'Kansas',
   40000, 40000, true, 30,
   'https://www.kscourts.org/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 173, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Kentucky
  ('KY', 'Kentucky',
   15000, 15000, true, 30,
   'https://courts.ky.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Dispensing with administration affidavit"]',
   9, 80, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Louisiana (uses "succession" not "probate")
  ('LA', 'Louisiana',
   75000, 75000, true, 30,
   'https://www.lasc.org/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Affidavit of small succession"]',
   6, 250, 450,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Maine
  ('ME', 'Maine',
   40000, 40000, true, 30,
   'https://www.courts.maine.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Maryland (small estate $50K, modified administration $100K)
  ('MD', 'Maryland',
   100000, 50000, true, 30,
   'https://registers.maryland.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate petition (under $50K) or Modified Administration ($50K-$100K)"]',
   9, 200, 700,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Massachusetts
  ('MA', 'Massachusetts',
   25000, 25000, true, 30,
   'https://www.mass.gov/orgs/massachusetts-probate-and-family-court',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Voluntary administration affidavit"]',
   12, 375, 560,
   false, 'https://www.mass.gov/info-details/probate-and-family-court-filing-fees', '2026-03-19'),

  -- Michigan (2026 CPI-adjusted: $53K; must wait 28 days for affidavit)
  ('MI', 'Michigan',
   53000, 53000, true, 28,
   'https://www.courts.michigan.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Assignment of property petition", "Affidavit of decedent''s successor (must wait 28 days after death)"]',
   9, 150, 350,
   true, 'https://michiganlegalhelp.org/', '2026-03-19'),

  -- Minnesota
  ('MN', 'Minnesota',
   75000, 75000, true, 30,
   'https://www.mncourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 280, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Mississippi
  ('MS', 'Mississippi',
   50000, 50000, true, 30,
   'https://courts.ms.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Missouri
  ('MO', 'Missouri',
   40000, 40000, true, 30,
   'https://www.courts.mo.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 150, 200,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Montana
  ('MT', 'Montana',
   50000, 50000, true, 30,
   'https://courts.mt.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Nebraska
  ('NE', 'Nebraska',
   50000, 50000, true, 30,
   'https://supremecourt.nebraska.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Nevada (affidavit $25K, summary administration $100K)
  ('NV', 'Nevada',
   100000, 25000, true, 40,
   'https://nvcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Affidavit (under $25K) or Petition for Summary Administration ($25K-$100K)"]',
   9, 200, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- New Hampshire
  ('NH', 'New Hampshire',
   10000, 10000, true, 30,
   'https://www.courts.nh.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Voluntary administration affidavit"]',
   9, 150, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- New Jersey (must wait at least 10 days after death to file)
  ('NJ', 'New Jersey',
   50000, 50000, true, 10,
   'https://www.njcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 150, 350,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- New Mexico
  ('NM', 'New Mexico',
   50000, 50000, true, 30,
   'https://www.nmcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 133, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- New York
  ('NY', 'New York',
   50000, 50000, true, 30,
   'https://www.nycourts.gov/courts/nyc/surrogates/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Voluntary administration petition (under $50K)", "Kinship affidavit (if no will)"]',
   12, 215, 1250,
   true, 'https://www.nycourts.gov/courthelp/WhenSomeoneDies/probateProcess.shtml', '2026-03-19'),

  -- North Carolina (affidavit $20K personal property, summary admin $30K)
  ('NC', 'North Carolina',
   30000, 20000, true, 60,
   'https://www.nccourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Collection by affidavit (personal property under $20K)", "Summary administration petition ($20K-$30K)"]',
   9, 120, 300,
   true, 'https://www.nccourts.gov/help-topics/estates-and-trusts/estates', '2026-03-19'),

  -- North Dakota
  ('ND', 'North Dakota',
   50000, 50000, true, 30,
   'https://www.ndcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 70, 200,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Ohio (Release from Administration for estates under $100K)
  ('OH', 'Ohio',
   100000, 100000, true, 30,
   'https://www.supremecourt.ohio.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Release from Administration application (under $100K)", "Summary release affidavit"]',
   6, 45, 200,
   true, 'https://www.ohiobar.org/', '2026-03-19'),

  -- Oklahoma
  ('OK', 'Oklahoma',
   50000, 50000, true, 30,
   'https://www.oscn.net/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Oregon (one of the highest thresholds nationally at $275K)
  ('OR', 'Oregon',
   275000, 275000, true, 30,
   'https://www.courts.oregon.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 200, 570,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Pennsylvania
  ('PA', 'Pennsylvania',
   50000, 50000, true, 30,
   'https://www.pacourts.us/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Petition for settlement of small estate", "Register of Wills filing"]',
   9, 150, 450,
   true, 'https://www.pacourts.us/learn/register-of-wills', '2026-03-19'),

  -- Rhode Island
  ('RI', 'Rhode Island',
   15000, 15000, true, 30,
   'https://www.courts.ri.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Voluntary administration affidavit"]',
   9, 100, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- South Carolina (raised to $45K in May 2025 via HB 3472)
  ('SC', 'South Carolina',
   45000, 45000, true, 30,
   'https://www.sccourts.org/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 25, 300,
   false, 'https://wileslawfirm.com/blog/how-long-do-you-have-to-file-probate-after-death-in-south-carolina/', '2026-03-19'),

  -- South Dakota
  ('SD', 'South Dakota',
   50000, 50000, true, 30,
   'https://ujs.sd.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   6, 50, 200,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Tennessee (must wait 45 days after death for small estate affidavit)
  ('TN', 'Tennessee',
   25000, 25000, true, 45,
   'https://www.tncourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate affidavit (must wait 45 days after death)"]',
   9, 200, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Texas
  ('TX', 'Texas',
   75000, 75000, true, 30,
   'https://www.txcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate affidavit (heirship affidavit)", "Muniment of title application (will but no debts)"]',
   6, 200, 400,
   true, 'https://www.txcourts.gov/', '2026-03-19'),

  -- Utah
  ('UT', 'Utah',
   100000, 100000, true, 30,
   'https://www.utcourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 75, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Vermont (one of the lowest thresholds at $10K)
  ('VT', 'Vermont',
   10000, 10000, true, 30,
   'https://www.vermontjudiciary.org/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 200, 350,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Virginia
  ('VA', 'Virginia',
   50000, 50000, true, 30,
   'https://www.vacourts.gov/courts/circuit/home.html',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 50, 300,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- Washington (must wait 40 days after death for affidavit)
  ('WA', 'Washington',
   100000, 100000, true, 40,
   'https://www.courts.wa.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Small estate affidavit (must wait 40 days after death)"]',
   9, 200, 400,
   false, 'https://smallestateaffidavit.com/small-estate-affidavit-limits/', '2026-03-19'),

  -- West Virginia
  ('WV', 'West Virginia',
   100000, 100000, true, 30,
   'https://www.courtswv.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   9, 100, 250,
   false, 'https://www.hewittelderlaw.com/how-long-to-file-probate-after-death-in-west-virginia/', '2026-03-19'),

  -- Wisconsin
  ('WI', 'Wisconsin',
   50000, 50000, true, 30,
   'https://www.wicourts.gov/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory", "Transfer by affidavit application"]',
   9, 200, 350,
   false, 'https://giffcollinslaw.com/small-estate-administration-in-wisconsin/', '2026-03-19'),

  -- Wyoming (raised from $200K to $400K effective July 1, 2025)
  ('WY', 'Wyoming',
   400000, 400000, true, 30,
   'https://www.courts.state.wy.us/',
   '["Certified death certificate", "Original will (if exists)", "Petition for probate", "Government-issued photo ID", "Asset inventory"]',
   4, 70, 200,
   false, 'https://www.nolo.com/legal-encyclopedia/wyoming-probate-shortcuts-31692.html', '2026-03-19')

ON CONFLICT (state_code) DO NOTHING;

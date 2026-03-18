# GhostBoard Revenue Model

## Research Date: 2026-03-18

## Overview

GhostBoard monetizes through two primary channels:
1. **Job board affiliate links** — earn commissions when users click through to apply on partner job boards
2. **Recruiter premium tier** — companies pay monthly to claim profiles, respond to reports, and improve their scores

## Channel 1: Job Board Affiliate Programs

### Indeed Publisher Program

| Attribute | Details |
|-----------|---------|
| Commission Model | CPC (cost per click) |
| Rate | $0.05–$0.10 per click |
| Cookie Duration | 30 days |
| Minimum Payout | $100, paid quarterly |
| Enrollment | Contact-based — must email affiliate team, no self-serve signup |
| Requirements | 10,000+ unique daily visitors |
| Network | Direct partnership |

**Notes:**
- Indeed is the largest job board by volume (350M+ monthly visits)
- The Publisher Program lets job aggregators display Indeed job listings and earn per click
- High traffic requirement means GhostBoard needs ~300K monthly visitors before qualifying
- Best suited as a long-term partner once traffic scales

### ZipRecruiter Partner Program

| Attribute | Details |
|-----------|---------|
| Commission Model | CPC + CPA hybrid |
| Rate | $0.75–$2.00 per application submitted |
| Revenue Split | 50/50 |
| Cookie Duration | 30 days |
| Minimum Payout | $100, paid within 40 days |
| Enrollment | Via Impact affiliate platform |
| Requirements | Lower barrier than Indeed — accepts smaller publishers |
| Network | Impact (also available via FlexOffers, CJ) |

**Products:**
- **ZipSearch**: Import and display ZipRecruiter job listings on GhostBoard company pages
- **ZipAlerts**: Email job alerts with ZipRecruiter affiliate links
- **ZipPost**: Refer employers to post jobs on ZipRecruiter (higher CPA)

**Notes:**
- Best first partner — lowest barrier to entry, highest per-action payout
- ZipSearch is the most natural fit: display relevant job listings on company profile pages alongside ghosting data
- Users searching a company's ghosting rate are likely actively job hunting — high conversion intent

### LinkedIn Jobs

| Attribute | Details |
|-----------|---------|
| Commission Model | Unclear / limited |
| Rate | Not publicly documented |
| Enrollment | Application-based |
| Requirements | Unknown |
| Network | Direct |

**Notes:**
- LinkedIn has an affiliate program but details are opaque
- LinkedIn Learning affiliate is separate ($5/lead, 35%/sale) — not relevant
- Not recommended as a primary partner due to lack of transparency
- Consider as a secondary link target using standard job URL linking (no commission but adds user value)

### Glassdoor

| Attribute | Details |
|-----------|---------|
| Status | **No active affiliate program** |

**Notes:**
- Previously offered 10% recurring commissions (discontinued)
- Glassdoor is a competitor, not a partner — they monetize the same employer attention
- Link to Glassdoor reviews as a value-add for users but don't expect commission revenue

### Other Potential Partners

| Partner | Model | Est. Rate | Notes |
|---------|-------|-----------|-------|
| Adzuna | CPC | $0.04–$0.08/click | UK-based job aggregator with global reach |
| Jooble | CPC | $0.03–$0.06/click | Lower rates but high international volume |
| Talent.com | CPC | $0.05–$0.15/click | Growing platform, competitive rates |
| CareerJet | CPC | $0.02–$0.05/click | Legacy platform, lower rates |

### Affiliate Integration Strategy

**Where to place affiliate links on GhostBoard:**

1. **Company profile pages** (`/company/[slug]`): "See open jobs at [Company]" section with ZipRecruiter/Indeed listings
2. **Search results** (`/search`): Job listing cards alongside company ghosting data
3. **Post-report CTA**: After submitting a ghosting report, suggest "Apply to responsive companies instead" with affiliate job links
4. **Email alerts**: Weekly digest of tracked companies' new job listings with affiliate links
5. **Comparison pages** (`/compare`): Job listings from the more responsive company

**Expected Revenue Per 1,000 Company Page Views:**
- Assume 5% click-through rate to job listings
- 50 clicks × $0.75 avg CPA (ZipRecruiter) = **$37.50 per 1,000 views**
- At 100K monthly page views: **~$3,750/month**
- At 1M monthly page views: **~$37,500/month**

## Channel 2: Recruiter Premium Tier

### Competitive Landscape

| Platform | Free Tier | Paid Tier | Price |
|----------|-----------|-----------|-------|
| Glassdoor | Claim profile, respond to reviews | Enhanced branding, analytics, job ads | ~$15,000/year (enterprise), $249/job post |
| Comparably | Basic profile | Premium analytics, employer branding | Custom pricing (sales inquiry) |
| Indeed | Post jobs organically | Sponsored listings | $5–$499/day, $15–$50/application |
| Blind | None | Employer insights | Custom pricing |

**Key Insight:** Glassdoor charges $15K+/year. Most SMBs and startups can't afford that. GhostBoard targets the gap below Glassdoor — affordable employer accountability tools for companies that care about responsiveness but don't have a $15K/year employer branding budget.

### GhostBoard Pricing Tiers

#### Free Tier (Job Seekers)
- Search companies, view ghosting rates
- Submit up to 3 reports per month
- View aggregate stats (ghosting rate, avg response time)

#### Premium — $4.99/month (Job Seekers)
- Unlimited report submissions
- Detailed analytics (trends over time, by role level, by application method)
- Email alerts when tracked companies' scores change
- Ad-free experience
- Priority support

#### Recruiter — $49/month (Employers)
- **Claim company profile**: Verified "Official" badge on company page
- **Respond to reports**: Public or private responses to ghosting reports
- **Analytics dashboard**: Application funnel metrics, response time benchmarks, industry comparison
- **Responsiveness badge**: Earned badge displayed on company page when response rate > 80%
- **Suppress affiliate job ads**: Replace competitor job links with direct "Apply" link to company's own career page
- **Report notifications**: Real-time alerts when new reports are submitted about your company
- **Monthly report**: PDF export of company metrics and trends

#### Enterprise — $199/month (Large Employers / Staffing Agencies)
- Everything in Recruiter tier
- Multiple company profiles under one account
- API access for integrating GhostBoard score into ATS/career pages
- Custom branded response templates
- Dedicated account manager (at scale)
- Bulk data export

### Recruiter Tier Revenue Projections

**Assumptions:**
- 10,000 companies with profiles on GhostBoard
- 2% conversion to Recruiter tier = 200 paying companies
- 0.2% conversion to Enterprise tier = 20 paying companies

**Monthly Revenue:**
- 200 × $49 = $9,800/month (Recruiter)
- 20 × $199 = $3,980/month (Enterprise)
- Total: **~$13,780/month**

### Why Recruiters Will Pay

1. **Reputation management**: Companies care about their employer brand — a high ghosting rate deters top talent
2. **Response capability**: Free users can't respond to reports; recruiters need to defend themselves
3. **Competitive pressure**: Once competitors claim profiles, others follow (network effect)
4. **Affordable**: $49/month is negligible compared to Glassdoor ($1,250+/month) or recruiting costs ($4,000+ per hire)
5. **Badge incentive**: "Responsive Employer" badge provides tangible ROI for job postings

## Implementation Priority

### Phase 1: Affiliate Links (Fastest Path to Revenue)
1. Integrate ZipRecruiter ZipSearch via Impact affiliate platform
2. Display job listings on company profile pages
3. Add affiliate links to search results and comparison pages
4. Track click-through rates and optimize placement

### Phase 2: Recruiter Free Claim
1. Build company profile claim flow (email domain verification)
2. Allow claimed profiles to add company logo, description, career page URL
3. Show "Claimed by [Company]" badge on profile
4. This is free — it builds the funnel for paid conversion

### Phase 3: Recruiter Paid Tier
1. Stripe subscription integration for Recruiter ($49/mo) and Enterprise ($199/mo)
2. Build analytics dashboard for claimed companies
3. Enable report responses (public + private)
4. Responsiveness badge algorithm and display
5. Ad suppression toggle for recruiter profiles

### Phase 4: Premium Job Seeker Tier
1. Stripe subscription for Premium ($4.99/mo)
2. Unlimited reports, detailed analytics, email alerts
3. Ad-free experience toggle

## Key Metrics to Track

| Metric | Target | Notes |
|--------|--------|-------|
| Affiliate CTR | 5%+ | Click-through rate on job listing links |
| Affiliate EPC | $0.50+ | Earnings per click |
| RPM | $30+ | Revenue per 1,000 page views |
| Recruiter claim rate | 5% | % of company profiles claimed |
| Recruiter conversion | 2% | % of claimed profiles converting to paid |
| Churn rate | <5%/month | Monthly recruiter tier churn |
| Premium conversion | 1% | % of free job seekers converting to Premium |

## Technical Requirements

### Affiliate Integration
- Affiliate link middleware: append tracking parameters to outbound job board links
- Click tracking table in Supabase for analytics
- A/B testing framework for link placement optimization
- Server-side affiliate link generation (never expose raw affiliate IDs client-side)

### Stripe Integration
- Products: `ghostboard_premium`, `ghostboard_recruiter`, `ghostboard_enterprise`
- Webhook handler: `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- Subscription status cached in `subscriptions` table with RLS
- Feature gating middleware checks subscription tier on protected routes

### Database Additions
- `affiliate_clicks` table: track outbound clicks per company/user/partner
- `company_responses` table: recruiter responses to reports
- `responsiveness_scores` materialized view: calculated from response rate + time

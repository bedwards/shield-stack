-- GhostBoard Schema Fix: RLS policies and materialized view calculations
-- Migration: 00002_fix_rls_and_stats
-- Fixes HIGH findings from PR #377 review:
--   1. companies UPDATE policy too permissive (any authenticated user could update any company)
--   2. Materialized view ghosting_rate/avg_response_days don't properly weight old reports

-- =============================================================================
-- Fix 1: Restrict companies UPDATE to users with approved claims
-- Previously: any authenticated user could update any company
-- Now: only users with an approved company_claim can update
-- =============================================================================

DROP POLICY IF EXISTS "companies_update_auth" ON companies;

CREATE POLICY "companies_update_claimed"
  ON companies FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM company_claims
      WHERE company_claims.company_id = companies.id
      AND company_claims.user_id = auth.uid()
      AND company_claims.status = 'approved'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM company_claims
      WHERE company_claims.company_id = companies.id
      AND company_claims.user_id = auth.uid()
      AND company_claims.status = 'approved'
    )
  );

-- =============================================================================
-- Fix 2: Rebuild materialized view with proper weighted calculations
-- Old reports (>2 years) get 0.5 weight in both ghosting_rate and avg_response_days.
-- Uses weighted sum / weight total instead of halving the raw values.
-- =============================================================================

DROP MATERIALIZED VIEW IF EXISTS company_stats;

CREATE MATERIALIZED VIEW company_stats AS
SELECT
  c.id AS company_id,
  COUNT(r.id) AS total_reports,
  -- Weighted ghosting rate: old reports count half
  ROUND(
    SUM(
      CASE
        WHEN r.status = 'ghosted' AND r.created_at >= NOW() - INTERVAL '2 years' THEN 1.0
        WHEN r.status = 'ghosted' THEN 0.5
        ELSE 0
      END
    ) / NULLIF(
      SUM(
        CASE
          WHEN r.created_at >= NOW() - INTERVAL '2 years' THEN 1.0
          ELSE 0.5
        END
      ), 0
    ) * 100, 1
  ) AS ghosting_rate,
  -- Weighted avg response days: old reports count half
  ROUND(
    (
      SUM(
        CASE
          WHEN r.response_days IS NOT NULL AND r.created_at >= NOW() - INTERVAL '2 years' THEN r.response_days * 1.0
          WHEN r.response_days IS NOT NULL THEN r.response_days * 0.5
          ELSE 0
        END
      ) / NULLIF(
        SUM(
          CASE
            WHEN r.response_days IS NOT NULL AND r.created_at >= NOW() - INTERVAL '2 years' THEN 1.0
            WHEN r.response_days IS NOT NULL THEN 0.5
            ELSE 0
          END
        ), 0
      )
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

-- Recreate refresh function (references the view)
CREATE OR REPLACE FUNCTION refresh_company_stats()
RETURNS VOID AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY company_stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

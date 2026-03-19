-- GhostBoard: Auto-refresh company_stats after report inserts
-- Migration: 00003_report_trigger
-- Creates a trigger on the reports table that refreshes the
-- company_stats materialized view after new reports are inserted.

CREATE OR REPLACE FUNCTION trigger_refresh_company_stats()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM refresh_company_stats();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Use FOR EACH STATEMENT (not ROW) to avoid multiple refreshes on batch inserts
CREATE TRIGGER after_report_insert
  AFTER INSERT ON reports
  FOR EACH STATEMENT
  EXECUTE FUNCTION trigger_refresh_company_stats();

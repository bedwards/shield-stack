-- GhostBoard: Trigram similarity search RPC
-- Migration: 00004_search_rpc
-- Creates an RPC function for fuzzy company search using pg_trgm similarity().
-- Returns companies ordered by similarity score (best match first).
-- Also joins company_stats to include ghosting stats in results.

CREATE OR REPLACE FUNCTION search_companies(
  search_query TEXT,
  result_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  id UUID,
  slug TEXT,
  name TEXT,
  domain TEXT,
  industry TEXT,
  company_size TEXT,
  headquarters TEXT,
  similarity_score REAL,
  total_reports BIGINT,
  ghosting_rate NUMERIC,
  avg_response_days NUMERIC,
  interview_to_offer_ratio NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    c.id,
    c.slug,
    c.name,
    c.domain,
    c.industry,
    c.company_size,
    c.headquarters,
    similarity(c.name, search_query) AS similarity_score,
    cs.total_reports,
    cs.ghosting_rate,
    cs.avg_response_days,
    cs.interview_to_offer_ratio
  FROM companies c
  LEFT JOIN company_stats cs ON cs.company_id = c.id
  WHERE c.name % search_query
     OR c.name ILIKE '%' || search_query || '%'
  ORDER BY similarity(c.name, search_query) DESC
  LIMIT result_limit;
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Grant access to anon and authenticated roles
GRANT EXECUTE ON FUNCTION search_companies(TEXT, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION search_companies(TEXT, INTEGER) TO authenticated;

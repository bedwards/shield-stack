-- Migration: Fix RLS policies for anonymous-first UX
-- Adds SELECT policies for anon role and fixes UPDATE policies for claim flow.
--
-- Issues fixed:
-- 1. Anonymous users can INSERT quiz_responses/recovery_plans but cannot SELECT them back
-- 2. UPDATE policies use auth.uid() = user_id which never matches NULL rows (SQL NULL != NULL)
-- 3. Anonymous rows cannot be claimed by authenticated users after signup
--
-- See learnings from PRs #257: "When implementing anonymous-first UX with Supabase RLS,
-- always add matching SELECT policies for every INSERT policy granted to the anon role."

-- ============================================================================
-- quiz_responses: Add anon SELECT and fix claim UPDATE
-- ============================================================================

-- Allow anonymous users to read their own quiz responses (matched by ID, not user_id)
-- The plan page needs to read the quiz response to show the plan
CREATE POLICY "Anonymous users can read quiz responses"
  ON quiz_responses FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Drop the broken UPDATE policy and replace with one that supports claiming
DROP POLICY IF EXISTS "Users can update own quiz responses" ON quiz_responses;

-- Authenticated users can claim anonymous rows (user_id IS NULL) or update their own
CREATE POLICY "Users can claim or update quiz responses"
  ON quiz_responses FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- recovery_plans: Add anon SELECT and fix claim UPDATE
-- ============================================================================

-- Allow anonymous users to read their own recovery plans
CREATE POLICY "Anonymous users can read recovery plans"
  ON recovery_plans FOR SELECT
  TO anon
  USING (user_id IS NULL);

-- Drop the broken UPDATE policy and replace with one that supports claiming
DROP POLICY IF EXISTS "Users can update own recovery plans" ON recovery_plans;

-- Authenticated users can claim anonymous rows or update their own
CREATE POLICY "Users can claim or update recovery plans"
  ON recovery_plans FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id OR user_id IS NULL)
  WITH CHECK (auth.uid() = user_id);

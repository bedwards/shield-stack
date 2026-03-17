-- Migration: Create plan_steps table
-- Individual actionable steps within a recovery plan with completion tracking

CREATE TABLE plan_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES recovery_plans(id) ON DELETE CASCADE,
  step_order integer NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  action_url text,
  is_completed boolean NOT NULL DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_plan_steps_plan_id ON plan_steps (plan_id);
CREATE INDEX idx_plan_steps_plan_id_order ON plan_steps (plan_id, step_order);

-- RLS: access through parent recovery_plan ownership
ALTER TABLE plan_steps ENABLE ROW LEVEL SECURITY;

-- Users can view steps for plans they own
CREATE POLICY "Users can view own plan steps"
  ON plan_steps FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM recovery_plans
      WHERE recovery_plans.id = plan_steps.plan_id
        AND recovery_plans.user_id = auth.uid()
    )
  );

-- Users can insert steps for plans they own
CREATE POLICY "Users can insert own plan steps"
  ON plan_steps FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recovery_plans
      WHERE recovery_plans.id = plan_steps.plan_id
        AND recovery_plans.user_id = auth.uid()
    )
  );

-- Users can update steps for plans they own (mark completed, etc.)
CREATE POLICY "Users can update own plan steps"
  ON plan_steps FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM recovery_plans
      WHERE recovery_plans.id = plan_steps.plan_id
        AND recovery_plans.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recovery_plans
      WHERE recovery_plans.id = plan_steps.plan_id
        AND recovery_plans.user_id = auth.uid()
    )
  );

-- Anonymous users can insert steps for anonymous plans (null user_id)
CREATE POLICY "Anonymous users can insert plan steps for anonymous plans"
  ON plan_steps FOR INSERT
  TO anon
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM recovery_plans
      WHERE recovery_plans.id = plan_steps.plan_id
        AND recovery_plans.user_id IS NULL
    )
  );

-- Migration: Expand subscription_templates for issue #256
-- Adds columns: estimated_processing_time, difficulty_rating, last_verified_date, direct_url
-- Adds 'government' to category CHECK constraint
-- Adds UNIQUE constraint on service_name for idempotent seeding
-- Forward-only, additive changes only

-- Add new columns
ALTER TABLE subscription_templates ADD COLUMN IF NOT EXISTS estimated_processing_time TEXT;
ALTER TABLE subscription_templates ADD COLUMN IF NOT EXISTS difficulty_rating TEXT;
ALTER TABLE subscription_templates ADD COLUMN IF NOT EXISTS last_verified_date DATE;
ALTER TABLE subscription_templates ADD COLUMN IF NOT EXISTS direct_url TEXT;

-- Add difficulty_rating CHECK constraint
ALTER TABLE subscription_templates
  ADD CONSTRAINT subscription_templates_difficulty_rating_check
  CHECK (difficulty_rating IN ('easy', 'medium', 'hard'));

-- Expand category CHECK to include 'government'
ALTER TABLE subscription_templates DROP CONSTRAINT IF EXISTS subscription_templates_category_check;
ALTER TABLE subscription_templates
  ADD CONSTRAINT subscription_templates_category_check
  CHECK (category IN (
    'streaming', 'utility', 'insurance', 'membership',
    'financial', 'social_media', 'email', 'cloud_storage', 'government'
  ));

-- Add UNIQUE constraint on service_name for idempotent ON CONFLICT DO NOTHING
ALTER TABLE subscription_templates
  ADD CONSTRAINT subscription_templates_service_name_key UNIQUE (service_name);

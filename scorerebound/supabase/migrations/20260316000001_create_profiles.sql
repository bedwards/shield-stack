-- Migration: Create custom enums and profiles table
-- Profiles extend Supabase Auth users with app-specific data

-- Custom enum types used across the schema
CREATE TYPE loan_type AS ENUM (
  'federal_direct',
  'federal_ffel',
  'federal_perkins',
  'parent_plus',
  'private'
);

CREATE TYPE recovery_path AS ENUM (
  'ibr_enrollment',
  'rehabilitation',
  'consolidation',
  'credit_building',
  'mixed'
);

CREATE TYPE delinquency_status AS ENUM (
  'current',
  '30_days',
  '60_days',
  '90_plus',
  'default',
  'collections'
);

CREATE TYPE score_range AS ENUM (
  '300_499',
  '500_579',
  '580_619',
  '620_659',
  '660_699',
  '700_749',
  '750_plus'
);

CREATE TYPE email_sequence_status AS ENUM (
  'active',
  'paused',
  'completed',
  'unsubscribed'
);

-- Profiles table: extends auth.users with ScoreRebound-specific data
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  score_range score_range,
  notification_prefs jsonb NOT NULL DEFAULT '{"email": true, "push": false}'::jsonb,
  is_anonymous boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Index on created_at for sorting
CREATE INDEX idx_profiles_created_at ON profiles (created_at);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Auto-create profile when a new user signs up via auth
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, is_anonymous)
  VALUES (
    NEW.id,
    COALESCE(NEW.is_anonymous, false)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- RLS: user-owns-row pattern
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

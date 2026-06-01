-- Brand Module V1 Foundation Migration
-- Task: Brand Module V1 Migration File Creation
-- Date: 2026-05-31
-- Status: DO NOT RUN WITHOUT EXPLICIT APPROVAL
--
-- WARNING:
-- - This migration creates V1 required objects only
-- - No OAuth tokens are included in V1
-- - No V1.5 deferred tables are included
-- - Do not run without stakeholder approval
-- - Do not run without security review of RLS policies
-- - Do not run without security review of storage policies
-- - Test in development environment first
-- - Backup database before execution
--
-- V1 Objects Included:
-- - public.brands table
-- - public.brand_core_profiles table
-- - public.connected_channels table
-- - brand-logos storage bucket
-- - brand-logos storage policies
--
-- V1.5 Objects Excluded:
-- - public.brand_assets table
-- - public.brand_identity_versions table
-- - public.connected_channel_credentials table
-- - brand-assets storage bucket
-- - OAuth token storage
-- - AI Brain tables

-- ============================================================================
-- Section 1: Extension
-- ============================================================================

-- Extension for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- Section 2: Helper Function
-- ============================================================================

-- Reusable updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- Section 3: brands Table
-- ============================================================================

CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  industry text NOT NULL,
  description text NOT NULL,
  website text NULL,
  logo_url text NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'deleted')),
  onboarding_status text NOT NULL DEFAULT 'created' CHECK (onboarding_status IN ('created', 'profile_complete', 'channels_connected', 'ready')),
  settings jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_brands_user_status ON public.brands(user_id, status);
CREATE INDEX idx_brands_user_created ON public.brands(user_id, created_at DESC);

-- Case-insensitive unique index for brand name (handles Arabic/English, case variations, whitespace)
CREATE UNIQUE INDEX idx_brands_user_name_normalized
ON public.brands(user_id, lower(trim(name)));

-- Enable RLS
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own brands"
ON public.brands FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create brands for themselves"
ON public.brands FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own brands"
ON public.brands FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own brands"
ON public.brands FOR DELETE
USING (user_id = auth.uid());

-- Updated at trigger
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- Section 4: brand_core_profiles Table
-- ============================================================================

CREATE TABLE public.brand_core_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mission text NULL,
  vision text NULL,
  values jsonb DEFAULT '{}'::jsonb,
  voice jsonb DEFAULT '{}'::jsonb,
  brand_dna jsonb DEFAULT '{}'::jsonb,
  visual_identity jsonb DEFAULT '{}'::jsonb,
  identity_paths jsonb DEFAULT '{}'::jsonb,
  logo_analysis jsonb DEFAULT '{}'::jsonb,
  social_analysis jsonb DEFAULT '{}'::jsonb,
  creative_direction_rules jsonb DEFAULT '{}'::jsonb,
  version integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_brand_core_profiles_brand ON public.brand_core_profiles(brand_id);
CREATE INDEX idx_brand_core_profiles_user_brand ON public.brand_core_profiles(user_id, brand_id);
CREATE UNIQUE INDEX idx_brand_core_profiles_brand_unique ON public.brand_core_profiles(brand_id);

-- Enable RLS
ALTER TABLE public.brand_core_profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own brand profiles"
ON public.brand_core_profiles FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create brand profiles for their brands"
ON public.brand_core_profiles FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own brand profiles"
ON public.brand_core_profiles FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own brand profiles"
ON public.brand_core_profiles FOR DELETE
USING (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

-- Updated at trigger
CREATE TRIGGER update_brand_core_profiles_updated_at BEFORE UPDATE ON public.brand_core_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- Section 5: connected_channels Table
-- ============================================================================

CREATE TABLE public.connected_channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid NOT NULL REFERENCES public.brands(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('facebook', 'instagram', 'tiktok', 'whatsapp')),
  status text NOT NULL DEFAULT 'disconnected' CHECK (status IN ('disconnected', 'connecting', 'connected', 'error', 'pending', 'syncing')),
  connection_type text NOT NULL DEFAULT 'oauth' CHECK (connection_type IN ('oauth', 'api_key', 'manual')),
  external_account_id text NULL,
  display_name text NULL,
  last_sync_at timestamptz NULL,
  capabilities jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Note: access_token_encrypted NOT in V1 - deferred to V1.5 connected_channel_credentials table

-- Indexes
CREATE INDEX idx_connected_channels_brand_platform ON public.connected_channels(brand_id, platform);
CREATE INDEX idx_connected_channels_user_brand ON public.connected_channels(user_id, brand_id);
CREATE INDEX idx_connected_channels_status ON public.connected_channels(status);
CREATE UNIQUE INDEX idx_connected_channels_brand_platform_unique ON public.connected_channels(brand_id, platform);

-- Enable RLS
ALTER TABLE public.connected_channels ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own connected channels"
ON public.connected_channels FOR SELECT
USING (user_id = auth.uid());

CREATE POLICY "Users can create channels for their brands"
ON public.connected_channels FOR INSERT
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Users can update their own connected channels"
ON public.connected_channels FOR UPDATE
USING (user_id = auth.uid())
WITH CHECK (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Users can delete their own connected channels"
ON public.connected_channels FOR DELETE
USING (
  user_id = auth.uid() AND
  EXISTS (
    SELECT 1 FROM public.brands b
    WHERE b.id = brand_id
    AND b.user_id = auth.uid()
  )
);

-- Updated at trigger
CREATE TRIGGER update_connected_channels_updated_at BEFORE UPDATE ON public.connected_channels
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- Section 6: Storage Bucket - brand-logos
-- ============================================================================

-- Create storage bucket
-- Note: Using INSERT with ON CONFLICT DO NOTHING to handle case where bucket already exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-logos', 'brand-logos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies with unique names to avoid conflicts

-- Public read access for logos (logos are public brand assets)
CREATE POLICY "brand_logos_public_read"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-logos');

-- Users can upload to their own folder (user_id/brand_id/)
-- Note: Brand ownership check via foldername(name)[2] is NOT included in storage policy
-- because Supabase storage policies have limited SQL support and cannot reliably
-- perform EXISTS checks against database tables. Brand ownership should be enforced
-- in the server action before upload.
CREATE POLICY "brand_logos_insert_own_folder"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'brand-logos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can update their own files
CREATE POLICY "brand_logos_update_own_folder"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'brand-logos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can delete their own files
CREATE POLICY "brand_logos_delete_own_folder"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'brand-logos' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- ============================================================================
-- End of Migration
-- ============================================================================

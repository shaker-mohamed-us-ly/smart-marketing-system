/**
 * Brand Module TypeScript Types
 * 
 * This file contains all TypeScript interfaces and types for the Brand Module V1.
 * Types match the actual migration columns and check constraints from:
 * supabase/migrations/20260531_brand_module_v1_foundation.sql
 */

// ============================================================================
// Database Row Types (match migration columns exactly)
// ============================================================================

/**
 * brands table row
 * Matches migration lines 55-68
 */
export interface Brand {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  description: string;
  website: string | null;
  logo_url: string | null;
  status: BrandStatus;
  onboarding_status: BrandOnboardingStatus;
  settings: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

/**
 * brand_core_profiles table row
 * Matches migration lines 107-124
 */
export interface BrandCoreProfile {
  id: string;
  brand_id: string;
  user_id: string;
  mission: string | null;
  vision: string | null;
  values: Record<string, unknown>;
  voice: Record<string, unknown>;
  brand_dna: Record<string, unknown>;
  visual_identity: Record<string, unknown>;
  identity_paths: Record<string, unknown>;
  logo_analysis: Record<string, unknown>;
  social_analysis: Record<string, unknown>;
  creative_direction_rules: Record<string, unknown>;
  version: number;
  created_at: string;
  updated_at: string;
}

/**
 * connected_channels table row
 * Matches migration lines 181-195
 * Note: access_token_encrypted NOT in V1 - deferred to V1.5
 */
export interface ConnectedChannel {
  id: string;
  brand_id: string;
  user_id: string;
  platform: ConnectedChannelPlatform;
  status: ConnectedChannelStatus;
  connection_type: ConnectedChannelConnectionType;
  external_account_id: string | null;
  display_name: string | null;
  last_sync_at: string | null;
  capabilities: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Status Unions (match migration check constraints exactly)
// ============================================================================

/**
 * brands.status check constraint
 * Matches migration line 63: CHECK (status IN ('active', 'archived', 'deleted'))
 */
export type BrandStatus = 'active' | 'archived' | 'deleted';

/**
 * brands.onboarding_status check constraint
 * Matches migration line 64: CHECK (onboarding_status IN ('created', 'profile_complete', 'channels_connected', 'ready'))
 */
export type BrandOnboardingStatus = 'created' | 'profile_complete' | 'channels_connected' | 'ready';

/**
 * connected_channels.platform check constraint
 * Matches migration line 185: CHECK (platform IN ('facebook', 'instagram', 'tiktok', 'whatsapp'))
 */
export type ConnectedChannelPlatform = 'facebook' | 'instagram' | 'tiktok' | 'whatsapp';

/**
 * connected_channels.status check constraint
 * Matches migration line 186: CHECK (status IN ('disconnected', 'connecting', 'connected', 'error', 'pending', 'syncing'))
 */
export type ConnectedChannelStatus = 'disconnected' | 'connecting' | 'connected' | 'error' | 'pending' | 'syncing';

/**
 * connected_channels.connection_type check constraint
 * Matches migration line 187: CHECK (connection_type IN ('oauth', 'api_key', 'manual'))
 */
export type ConnectedChannelConnectionType = 'oauth' | 'api_key' | 'manual';

// ============================================================================
// Input Types (for validation and server actions)
// ============================================================================

/**
 * Input for creating a brand
 * Does NOT include user_id (comes from auth)
 * Does NOT include social URLs (handled by Connected Channels)
 */
export interface BrandCreateInput {
  name: string;
  industry: string;
  description: string;
  website?: string;
  logo?: File;
}

/**
 * Input for updating a brand
 * All fields optional
 */
export interface BrandUpdateInput {
  name?: string;
  industry?: string;
  description?: string;
  website?: string;
  logo_url?: string;
}

/**
 * Input for updating brand core profile
 * All JSONB fields optional
 */
export interface BrandCoreProfileUpdateInput {
  mission?: string;
  vision?: string;
  values?: Record<string, unknown>;
  voice?: Record<string, unknown>;
  brand_dna?: Record<string, unknown>;
  visual_identity?: Record<string, unknown>;
  identity_paths?: Record<string, unknown>;
  logo_analysis?: Record<string, unknown>;
  social_analysis?: Record<string, unknown>;
  creative_direction_rules?: Record<string, unknown>;
}

/**
 * Input for upserting connected channel placeholder (V1 only)
 * No OAuth tokens in V1
 */
export interface ConnectedChannelPlaceholderInput {
  brandId: string;
  platform: ConnectedChannelPlatform;
  status: ConnectedChannelStatus;
}

/**
 * Input for uploading brand logo
 */
export interface BrandLogoUploadInput {
  brandId: string;
  file: File;
}

/**
 * Result of brand logo upload
 */
export interface BrandLogoUploadResult {
  publicUrl: string;
  path: string;
}

// ============================================================================
// Action Result Types (for server actions)
// ============================================================================

/**
 * Generic action result type
 * Used for all server action responses
 */
export interface BrandActionResult<T> {
  success: boolean;
  data?: T;
  error?: BrandOSError;
}

/**
 * Success result
 */
export interface BrandActionSuccess<T> {
  success: true;
  data: T;
}

/**
 * Failure result
 */
export interface BrandActionFailure {
  success: false;
  error: BrandOSError;
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * Brand error codes
 * Used for typed error handling and i18n mapping
 */
export type BrandErrorCode =
  | 'BRAND_AUTH_REQUIRED'
  | 'BRAND_CREATE_VALIDATION'
  | 'BRAND_DUPLICATE_NAME'
  | 'BRAND_CREATE_DB_FAILED'
  | 'BRAND_PROFILE_CREATE_FAILED'
  | 'BRAND_UPDATE_FAILED'
  | 'BRAND_NOT_FOUND'
  | 'BRAND_RLS_DENIED'
  | 'BRAND_LOGO_UPLOAD_FAILED'
  | 'BRAND_LOGO_DELETE_FAILED'
  | 'BRAND_CHANNELS_LOAD_FAILED'
  | 'BRAND_UNKNOWN'
  | 'BRAND_INVALID_INPUT'
  | 'BRAND_STORAGE_PATH_INVALID'
  | 'BRAND_PROFILE_UPDATE_FAILED'
  | 'BRAND_CHANNEL_UPDATE_FAILED';

/**
 * Custom error class for brand operations
 * Includes error code, user message, dev message, and optional cause
 */
export class BrandOSError extends Error {
  code: BrandErrorCode;
  userMessage: string;
  devMessage?: string;
  operation?: string;
  cause?: unknown;

  constructor(
    code: BrandErrorCode,
    userMessage: string,
    devMessage?: string,
    operation?: string,
    cause?: unknown
  ) {
    super(userMessage);
    this.name = 'BrandOSError';
    this.code = code;
    this.userMessage = userMessage;
    this.devMessage = devMessage;
    this.operation = operation;
    this.cause = cause;
  }
}

// ============================================================================
// Utility Types
// ============================================================================

/**
 * Type guard for BrandOSError
 */
export function isBrandOSError(error: unknown): error is BrandOSError {
  return error instanceof BrandOSError;
}

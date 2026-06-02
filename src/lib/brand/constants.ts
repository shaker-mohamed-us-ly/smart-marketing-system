/**
 * Brand Module Constants
 * 
 * This file contains constants for the Brand Module V1.
 * Constants are used for validation, storage configuration, and default values.
 */

// ============================================================================
// Platform Constants
// ============================================================================

/**
 * Supported social media platforms
 * Matches migration check constraint: CHECK (platform IN ('facebook', 'instagram', 'tiktok', 'whatsapp'))
 */
export const PLATFORMS = {
  FACEBOOK: 'facebook' as const,
  INSTAGRAM: 'instagram' as const,
  TIKTOK: 'tiktok' as const,
  WHATSAPP: 'whatsapp' as const,
} as const;

/**
 * Array of all supported platforms
 */
export const PLATFORM_VALUES = Object.values(PLATFORMS) as readonly ('facebook' | 'instagram' | 'tiktok' | 'whatsapp')[];

// ============================================================================
// Brand Status Constants
// ============================================================================

/**
 * Brand status values
 * Matches migration check constraint: CHECK (status IN ('active', 'archived', 'deleted'))
 */
export const BRAND_STATUS = {
  ACTIVE: 'active' as const,
  ARCHIVED: 'archived' as const,
  DELETED: 'deleted' as const,
} as const;

/**
 * Default brand status
 */
export const DEFAULT_BRAND_STATUS = BRAND_STATUS.ACTIVE;

// ============================================================================
// Brand Onboarding Status Constants
// ============================================================================

/**
 * Brand onboarding status values
 * Matches migration check constraint: CHECK (onboarding_status IN ('created', 'profile_complete', 'channels_connected', 'ready'))
 */
export const BRAND_ONBOARDING_STATUS = {
  CREATED: 'created' as const,
  PROFILE_COMPLETE: 'profile_complete' as const,
  CHANNELS_CONNECTED: 'channels_connected' as const,
  READY: 'ready' as const,
} as const;

/**
 * Default brand onboarding status
 */
export const DEFAULT_ONBOARDING_STATUS = BRAND_ONBOARDING_STATUS.CREATED;

// ============================================================================
// Connected Channel Status Constants
// ============================================================================

/**
 * Connected channel status values
 * Matches migration check constraint: CHECK (status IN ('disconnected', 'connecting', 'connected', 'error', 'pending', 'syncing'))
 */
export const CHANNEL_STATUS = {
  DISCONNECTED: 'disconnected' as const,
  CONNECTING: 'connecting' as const,
  CONNECTED: 'connected' as const,
  ERROR: 'error' as const,
  PENDING: 'pending' as const,
  SYNCING: 'syncing' as const,
} as const;

/**
 * Default channel status
 */
export const DEFAULT_CHANNEL_STATUS = CHANNEL_STATUS.DISCONNECTED;

// ============================================================================
// Connection Type Constants
// ============================================================================

/**
 * Connection type values
 * Matches migration check constraint: CHECK (connection_type IN ('oauth', 'api_key', 'manual'))
 */
export const CONNECTION_TYPE = {
  OAUTH: 'oauth' as const,
  API_KEY: 'api_key' as const,
  MANUAL: 'manual' as const,
} as const;

/**
 * Default connection type
 */
export const DEFAULT_CONNECTION_TYPE = CONNECTION_TYPE.OAUTH;

// ============================================================================
// Storage Constants
// ============================================================================

/**
 * Storage bucket name for brand logos
 */
export const STORAGE_BUCKET = 'brand-logos';

/**
 * Allowed MIME types for logo upload
 */
export const ALLOWED_LOGO_MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
] as const;

/**
 * Maximum logo file size in bytes (5MB)
 */
export const MAX_LOGO_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Maximum logo file size in human-readable format
 */
export const MAX_LOGO_SIZE_MB = 5;

// ============================================================================
// Validation Constants
// ============================================================================

/**
 * Minimum brand name length
 */
export const MIN_BRAND_NAME_LENGTH = 3;

/**
 * Maximum brand name length
 */
export const MAX_BRAND_NAME_LENGTH = 100;

/**
 * Minimum brand description length
 */
export const MIN_BRAND_DESCRIPTION_LENGTH = 10;

/**
 * Maximum brand description length
 */
export const MAX_BRAND_DESCRIPTION_LENGTH = 500;

// ============================================================================
// Storage Path Constants
// ============================================================================

/**
 * Storage path pattern for brand logos
 * Pattern: {user_id}/{brand_id}/{filename}
 */
export const LOGO_PATH_PATTERN = '{userId}/{brandId}/{filename}';

/**
 * Storage path pattern for brand logos with extension
 * Pattern: {user_id}/{brand_id}/logo.{ext}
 */
export const LOGO_PATH_PATTERN_WITH_EXT = '{userId}/{brandId}/logo.{ext}';

// ============================================================================
// Brand Type Constants
// ============================================================================

/**
 * Brand type options
 * Stored in brand_core_profiles.brand_dna.metadata.brandType
 */
export const BRAND_TYPES = {
  ECOMMERCE_STORE: 'ecommerce_store',
  LOCAL_STORE: 'local_store',
  COMPANY: 'company',
  SERVICE: 'service',
  PERSONAL_BRAND: 'personal_brand',
  RESTAURANT_CAFE: 'restaurant_cafe',
  CLINIC_HEALTH_CENTER: 'clinic_health_center',
  AGENCY_SERVICE_OFFICE: 'agency_service_office',
  SINGLE_PRODUCT: 'single_product',
  STARTUP: 'startup',
  OTHER: 'other',
} as const;

/**
 * Array of all brand type values
 */
export const BRAND_TYPE_VALUES = Object.values(BRAND_TYPES) as readonly (typeof BRAND_TYPES)[keyof typeof BRAND_TYPES][];

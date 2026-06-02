/**
 * Brand Module Validation
 * 
 * This file contains Zod validation schemas for the Brand Module V1.
 * Uses existing zod package (v4.4.3) - no new installation required.
 */

import { z } from 'zod';
import {
  MIN_BRAND_NAME_LENGTH,
  MAX_BRAND_NAME_LENGTH,
  MIN_BRAND_DESCRIPTION_LENGTH,
  MAX_BRAND_DESCRIPTION_LENGTH,
  ALLOWED_LOGO_MIME_TYPES,
  MAX_LOGO_SIZE_BYTES,
  PLATFORM_VALUES,
  BRAND_TYPE_VALUES,
} from './constants';
import type {
  BrandCreateInput,
  BrandUpdateInput,
  BrandCoreProfileUpdateInput,
  ConnectedChannelPlaceholderInput,
} from './types';

// ============================================================================
// UUID Validation
// ============================================================================

/**
 * UUID schema
 */
export const BrandIdSchema = z.string().uuid('Invalid brand ID format');

// ============================================================================
// Brand Validation Schemas
// ============================================================================

/**
 * Brand create input schema
 * - name: required, trimmed, 3-100 characters
 * - brandType: required, must be one of allowed brand types
 * - industry: required
 * - description: required, 10-500 characters
 * - website: optional, valid URL if present
 * - logo: optional, validated separately
 */
export const BrandCreateInputSchema = z.object({
  name: z
    .string()
    .min(MIN_BRAND_NAME_LENGTH, `Brand name must be at least ${MIN_BRAND_NAME_LENGTH} characters`)
    .max(MAX_BRAND_NAME_LENGTH, `Brand name must be at most ${MAX_BRAND_NAME_LENGTH} characters`)
    .trim(),
  brandType: z.enum([
    'ecommerce_store',
    'local_store',
    'company',
    'service',
    'personal_brand',
    'restaurant_cafe',
    'clinic_health_center',
    'agency_service_office',
    'single_product',
    'startup',
    'other',
  ]),
  industry: z.string().min(1, 'Industry is required'),
  description: z
    .string()
    .min(MIN_BRAND_DESCRIPTION_LENGTH, `Description must be at least ${MIN_BRAND_DESCRIPTION_LENGTH} characters`)
    .max(MAX_BRAND_DESCRIPTION_LENGTH, `Description must be at most ${MAX_BRAND_DESCRIPTION_LENGTH} characters`)
    .trim(),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  logo: z.any().optional(), // File validation handled separately
});

/**
 * Brand update input schema
 * All fields optional
 */
export const BrandUpdateInputSchema = z.object({
  name: z
    .string()
    .min(MIN_BRAND_NAME_LENGTH)
    .max(MAX_BRAND_NAME_LENGTH)
    .trim()
    .optional(),
  industry: z.string().min(1).optional(),
  description: z
    .string()
    .min(MIN_BRAND_DESCRIPTION_LENGTH)
    .max(MAX_BRAND_DESCRIPTION_LENGTH)
    .trim()
    .optional(),
  website: z.string().url().optional().or(z.literal('')),
  logo_url: z.string().url().optional().or(z.literal('')),
});

// ============================================================================
// Brand Core Profile Validation Schemas
// ============================================================================

/**
 * Brand core profile update input schema
 * All JSONB fields optional
 */
export const BrandCoreProfileUpdateInputSchema = z.object({
  mission: z.string().optional(),
  vision: z.string().optional(),
  values: z.record(z.string(), z.unknown()).optional(),
  voice: z.record(z.string(), z.unknown()).optional(),
  brand_dna: z.record(z.string(), z.unknown()).optional(),
  visual_identity: z.record(z.string(), z.unknown()).optional(),
  identity_paths: z.record(z.string(), z.unknown()).optional(),
  logo_analysis: z.record(z.string(), z.unknown()).optional(),
  social_analysis: z.record(z.string(), z.unknown()).optional(),
  creative_direction_rules: z.record(z.string(), z.unknown()).optional(),
});

// ============================================================================
// Connected Channel Validation Schemas
// ============================================================================

/**
 * Connected channel placeholder input schema (V1 only)
 * - brandId: required, valid UUID
 * - platform: required, must be one of allowed platforms
 * - status: required, must be valid status
 */
export const ConnectedChannelPlaceholderInputSchema = z.object({
  brandId: BrandIdSchema,
  platform: z.enum(['facebook', 'instagram', 'tiktok', 'whatsapp'], {
    message: 'Invalid platform',
  }),
  status: z.enum(['disconnected', 'connecting', 'connected', 'error', 'pending', 'syncing'], {
    message: 'Invalid channel status',
  }),
});

// ============================================================================
// Logo Validation Helpers
// ============================================================================

/**
 * Validate brand logo file
 * - Must be allowed MIME type
 * - Must be within size limit
 */
export function validateBrandLogoFile(file: File): { valid: boolean; error?: string } {
  // Check MIME type
  if (!ALLOWED_LOGO_MIME_TYPES.includes(file.type as (typeof ALLOWED_LOGO_MIME_TYPES)[number])) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${ALLOWED_LOGO_MIME_TYPES.join(', ')}`,
    };
  }

  // Check file size
  if (file.size > MAX_LOGO_SIZE_BYTES) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_LOGO_SIZE_BYTES / (1024 * 1024)}MB`,
    };
  }

  return { valid: true };
}

// ============================================================================
// Validation Result Types
// ============================================================================

/**
 * Validation result type
 */
export type ValidationResult<T> = {
  success: true;
  data: T;
} | {
  success: false;
  errors: z.ZodError;
};

// ============================================================================
// Validation Helper Functions
// ============================================================================

/**
 * Validate brand create input
 */
export function validateBrandCreateInput(input: unknown): ValidationResult<BrandCreateInput> {
  const result = BrandCreateInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Validate brand update input
 */
export function validateBrandUpdateInput(input: unknown): ValidationResult<BrandUpdateInput> {
  const result = BrandUpdateInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Validate brand ID
 */
export function validateBrandId(id: unknown): ValidationResult<string> {
  const result = BrandIdSchema.safeParse(id);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Validate connected channel placeholder input
 */
export function validateConnectedChannelPlaceholderInput(
  input: unknown
): ValidationResult<ConnectedChannelPlaceholderInput> {
  const result = ConnectedChannelPlaceholderInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

/**
 * Validate brand core profile update input
 */
export function validateBrandCoreProfileUpdateInput(
  input: unknown
): ValidationResult<BrandCoreProfileUpdateInput> {
  const result = BrandCoreProfileUpdateInputSchema.safeParse(input);
  if (result.success) {
    return { success: true, data: result.data };
  }
  return { success: false, errors: result.error };
}

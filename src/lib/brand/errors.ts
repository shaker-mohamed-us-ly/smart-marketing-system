/**
 * Brand Module Error System
 * 
 * This file contains the BrandOSError class, error mapping utilities,
 * and Arabic/English error message mappings for the Brand Module V1.
 */

import { z } from 'zod';
import { BrandOSError, isBrandOSError, type BrandErrorCode, type BrandOSError as BrandOSErrorType } from './types';

// Re-export for convenience
export { BrandOSError, isBrandOSError };
export type { BrandOSError as BrandOSErrorType };

// ============================================================================
// Error Message Mapping (Fallback - i18n preferred)
// ============================================================================

/**
 * Fallback error messages in English
 * Used when i18n is unavailable or as fallback
 */
const ERROR_MESSAGES_EN: Record<BrandErrorCode, string> = {
  BRAND_AUTH_REQUIRED: 'You must be logged in to perform this action',
  BRAND_CREATE_VALIDATION: 'Invalid input. Please check your data and try again',
  BRAND_DUPLICATE_NAME: 'A brand with this name already exists',
  BRAND_CREATE_DB_FAILED: 'Failed to create brand. Please try again',
  BRAND_PROFILE_CREATE_FAILED: 'Failed to create brand profile. Please try again',
  BRAND_UPDATE_FAILED: 'Failed to update brand. Please try again',
  BRAND_NOT_FOUND: 'Brand not found',
  BRAND_RLS_DENIED: 'You do not have permission to access this brand',
  BRAND_LOGO_UPLOAD_FAILED: 'Failed to upload logo. Please try again',
  BRAND_LOGO_DELETE_FAILED: 'Failed to delete logo. Please try again',
  BRAND_CHANNELS_LOAD_FAILED: 'Failed to load connected channels. Please try again',
  BRAND_UNKNOWN: 'An unexpected error occurred. Please try again',
  BRAND_INVALID_INPUT: 'Invalid input provided',
  BRAND_STORAGE_PATH_INVALID: 'Invalid storage path',
  BRAND_PROFILE_UPDATE_FAILED: 'Failed to update brand profile. Please try again',
  BRAND_CHANNEL_UPDATE_FAILED: 'Failed to update channel. Please try again',
};

/**
 * Fallback error messages in Arabic
 * Used when i18n is unavailable or as fallback
 */
const ERROR_MESSAGES_AR: Record<BrandErrorCode, string> = {
  BRAND_AUTH_REQUIRED: 'يجب تسجيل الدخول لتنفيذ هذا الإجراء',
  BRAND_CREATE_VALIDATION: 'إدخال غير صالح. يرجى التحقق من البيانات والمحاولة مرة أخرى',
  BRAND_DUPLICATE_NAME: 'علامة تجارية بهذا الاسم موجودة بالفعل',
  BRAND_CREATE_DB_FAILED: 'فشل إنشاء العلامة التجارية. يرجى المحاولة مرة أخرى',
  BRAND_PROFILE_CREATE_FAILED: 'فشل إنشاء ملف العلامة التجارية. يرجى المحاولة مرة أخرى',
  BRAND_UPDATE_FAILED: 'فشل تحديث العلامة التجارية. يرجى المحاولة مرة أخرى',
  BRAND_NOT_FOUND: 'العلامة التجارية غير موجودة',
  BRAND_RLS_DENIED: 'ليس لديك صلاحية الوصول إلى هذه العلامة التجارية',
  BRAND_LOGO_UPLOAD_FAILED: 'فشل رفع الشعار. يرجى المحاولة مرة أخرى',
  BRAND_LOGO_DELETE_FAILED: 'فشل حذف الشعار. يرجى المحاولة مرة أخرى',
  BRAND_CHANNELS_LOAD_FAILED: 'فشل تحميل القنوات المتصلة. يرجى المحاولة مرة أخرى',
  BRAND_UNKNOWN: 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى',
  BRAND_INVALID_INPUT: 'إدخال غير صالح',
  BRAND_STORAGE_PATH_INVALID: 'مسار تخزين غير صالح',
  BRAND_PROFILE_UPDATE_FAILED: 'فشل تحديث ملف العلامة التجارية. يرجى المحاولة مرة أخرى',
  BRAND_CHANNEL_UPDATE_FAILED: 'فشل تحديث القناة. يرجى المحاولة مرة أخرى',
};

/**
 * Get error message by code and locale
 * @param code - Error code
 * @param locale - Locale ('ar' or 'en', defaults to 'en')
 * @returns Error message string
 */
export function getErrorMessage(code: BrandErrorCode, locale: 'ar' | 'en' = 'en'): string {
  const messages = locale === 'ar' ? ERROR_MESSAGES_AR : ERROR_MESSAGES_EN;
  return messages[code] || ERROR_MESSAGES_EN.BRAND_UNKNOWN;
}

// ============================================================================
// Supabase Error Mapping
// ============================================================================

/**
 * Map Supabase error to BrandOSError
 * @param error - Supabase error
 * @param operation - Operation being performed (for dev context)
 * @returns BrandOSError
 */
export function mapSupabaseErrorToBrandError(
  error: unknown,
  operation?: string
): BrandOSError {
  // Handle Postgres constraint violations
  if (error && typeof error === 'object' && 'code' in error) {
    const pgCode = (error as { code: string }).code;

    // Unique constraint violation (duplicate name)
    if (pgCode === '23505') {
      return new BrandOSError(
        'BRAND_DUPLICATE_NAME',
        getErrorMessage('BRAND_DUPLICATE_NAME'),
        `Postgres unique constraint violation: ${pgCode}`,
        operation,
        error
      );
    }

    // Foreign key violation
    if (pgCode === '23503') {
      return new BrandOSError(
        'BRAND_NOT_FOUND',
        getErrorMessage('BRAND_NOT_FOUND'),
        `Postgres foreign key violation: ${pgCode}`,
        operation,
        error
      );
    }
  }

  // Handle generic Supabase errors
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message: string }).message;

    // RLS denial
    if (message.includes('RLS') || message.includes('permission denied')) {
      return new BrandOSError(
        'BRAND_RLS_DENIED',
        getErrorMessage('BRAND_RLS_DENIED'),
        `RLS denial: ${message}`,
        operation,
        error
      );
    }
  }

  // Unknown error
  return new BrandOSError(
    'BRAND_UNKNOWN',
    getErrorMessage('BRAND_UNKNOWN'),
    'Unknown Supabase error',
    operation,
    error
  );
}

/**
 * Map duplicate brand name error specifically
 * @param error - Error from Supabase
 * @param operation - Operation being performed
 * @returns BrandOSError
 */
export function mapDuplicateBrandNameError(
  error: unknown,
  operation?: string
): BrandOSError {
  return new BrandOSError(
    'BRAND_DUPLICATE_NAME',
    getErrorMessage('BRAND_DUPLICATE_NAME'),
    'Duplicate brand name constraint violation',
    operation,
    error
  );
}

// ============================================================================
// Action Result Helpers
// ============================================================================

/**
 * Create a successful action result
 * @param data - Success data
 * @returns BrandActionSuccess
 */
export function makeBrandActionSuccess<T>(data: T): { success: true; data: T } {
  return { success: true, data };
}

/**
 * Create a failed action result
 * @param error - BrandOSError
 * @param operation - Operation being performed (for dev context, optional)
 * @param zodError - Optional Zod validation error
 * @returns BrandActionFailure
 */
export function makeBrandActionFailure(
  error: BrandOSError,
  operation?: string,
  zodError?: z.ZodError
): { success: false; error: BrandOSError } {
  // If operation provided, set it
  if (operation) {
    error.operation = operation;
  }
  // If zodError provided, set as cause
  if (zodError) {
    error.cause = zodError;
  }
  return { success: false, error };
}

/**
 * Convert any error to BrandActionFailure
 * @param error - Any error
 * @param operation - Operation being performed
 * @param locale - Locale for error message (optional)
 * @returns BrandActionFailure
 */
export function toBrandActionFailure(
  error: unknown,
  operation?: string,
  locale?: 'ar' | 'en'
): { success: false; error: BrandOSError } {
  // If already BrandOSError, use it
  if (isBrandOSError(error)) {
    return makeBrandActionFailure(error, locale);
  }

  // If Zod validation error
  if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
    return makeBrandActionFailure(
      new BrandOSError(
        'BRAND_CREATE_VALIDATION',
        getErrorMessage('BRAND_CREATE_VALIDATION', locale),
        'Zod validation error',
        operation,
        error
      ),
      locale
    );
  }

  // If Supabase error, map it
  if (error && typeof error === 'object' && ('code' in error || 'message' in error)) {
    return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, operation), locale);
  }

  // Unknown error
  return makeBrandActionFailure(
    new BrandOSError(
      'BRAND_UNKNOWN',
      getErrorMessage('BRAND_UNKNOWN', locale),
      'Unknown error',
      operation,
      error
    ),
    locale
  );
}

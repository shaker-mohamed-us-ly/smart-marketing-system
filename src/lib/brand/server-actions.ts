/**
 * Brand Module Server Actions
 * 
 * This file contains server actions for the Brand Module V1.
 * All actions check auth, validate input, rely on RLS, and return typed results.
 * 
 * Security:
 * - Never trust client-supplied user_id
 * - Always use auth.uid() from Supabase auth context
 * - Rely on RLS for database access
 * - Add extra ownership checks for child rows and logo upload
 * - Enforce storage folder structure before upload
 */

'use server';

import { createClient } from '../supabase/server';
import {
  validateBrandCreateInput,
  validateBrandUpdateInput,
  validateBrandId,
  validateConnectedChannelPlaceholderInput,
  validateBrandCoreProfileUpdateInput,
  validateBrandLogoFile,
} from './validation';
import {
  BrandOSError,
  makeBrandActionSuccess,
  makeBrandActionFailure,
  toBrandActionFailure,
  mapSupabaseErrorToBrandError,
  mapDuplicateBrandNameError,
} from './errors';
import type { BrandOSError as BrandOSErrorType } from './types';
import {
  STORAGE_BUCKET,
  LOGO_PATH_PATTERN_WITH_EXT,
  DEFAULT_BRAND_STATUS,
  DEFAULT_ONBOARDING_STATUS,
  DEFAULT_CHANNEL_STATUS,
  DEFAULT_CONNECTION_TYPE,
} from './constants';
import type {
  Brand,
  BrandCoreProfile,
  ConnectedChannel,
  BrandActionResult,
  BrandCreateInput,
  BrandUpdateInput,
  BrandCoreProfileUpdateInput,
  ConnectedChannelPlaceholderInput,
  BrandLogoUploadResult,
} from './types';

// ============================================================================
// Brand Actions
// ============================================================================

/**
 * Get all brands for the authenticated user
 * Requires auth, relies on RLS for user isolation
 */
export async function getBrands(): Promise<BrandActionResult<Brand[]>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to view brands')
      );
    }

    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'getBrands'));
    }

    return makeBrandActionSuccess(data || []);
  } catch (error) {
    // Detect missing env vars using duck typing (instanceof may fail in bundled code)
    const errorMessage = error && typeof error === 'object' && 'message' in error
      ? String((error as { message: unknown }).message)
      : '';
    if (errorMessage.toLowerCase().includes('supabase') && errorMessage.toLowerCase().includes('missing')) {
      return makeBrandActionFailure(
        new BrandOSError(
          'BRAND_ENV_MISSING',
          'Supabase environment settings are incomplete in development. Check your environment file and try again.',
          errorMessage,
          'getBrands',
          error
        )
      );
    }
    return toBrandActionFailure(error, 'getBrands');
  }
}

/**
 * Get a single brand by ID
 * Requires auth, validates UUID, relies on RLS for access control
 */
export async function getBrand(id: string): Promise<BrandActionResult<Brand>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to view this brand')
      );
    }

    const idValidation = validateBrandId(id);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('id', idValidation.data)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'getBrand'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'getBrand');
  }
}

/**
 * Create a new brand
 * Requires auth, validates input, inserts with user_id from auth only
 * Creates brand_core_profile after brand insert
 */
export async function createBrand(input: BrandCreateInput): Promise<BrandActionResult<Brand>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Dev-safe auth diagnostics (no tokens, no env values, no sensitive data)
    console.log(`[createBrand] auth check: user=${user ? 'PRESENT' : 'MISSING'}`);

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to create a brand')
      );
    }

    const validation = validateBrandCreateInput(input);
    if (!validation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_CREATE_VALIDATION', 'Invalid input'),
        'createBrand',
        validation.errors
      );
    }

    const { name, brandType, industry, description, website } = validation.data;

    // Insert brand with user_id from auth only
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .insert({
        user_id: user.id,
        name,
        industry,
        description,
        website: website || null,
        status: DEFAULT_BRAND_STATUS,
        onboarding_status: DEFAULT_ONBOARDING_STATUS,
      })
      .select()
      .single();

    if (brandError) {
      if (brandError.code === '23505') {
        return makeBrandActionFailure(mapDuplicateBrandNameError(brandError, 'createBrand'));
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'createBrand'));
    }

    // Create brand_core_profile after brand insert
    // Store brandType in brand_dna.metadata.brandType
    const { error: profileError } = await supabase
      .from('brand_core_profiles')
      .insert({
        brand_id: brand.id,
        user_id: user.id,
        brand_dna: {
          metadata: {
            brandType,
          },
        },
      });

    if (profileError) {
      // Attempt compensating delete of created brand
      await supabase.from('brands').delete().eq('id', brand.id);
      return makeBrandActionFailure(
        new BrandOSError('BRAND_PROFILE_CREATE_FAILED', 'Failed to create brand profile'),
        'createBrand'
      );
    }

    return makeBrandActionSuccess(brand);
  } catch (error) {
    return toBrandActionFailure(error, 'createBrand');
  }
}

/**
 * Update a brand
 * Requires auth, validates input, verifies ownership via RLS select
 * Updates allowed fields only, does not update user_id
 */
export async function updateBrand(id: string, input: BrandUpdateInput): Promise<BrandActionResult<Brand>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to update a brand')
      );
    }

    const idValidation = validateBrandId(id);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    const validation = validateBrandUpdateInput(input);
    if (!validation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_CREATE_VALIDATION', 'Invalid input'),
        'updateBrand',
        validation.errors
      );
    }

    // Verify ownership via RLS select
    const { data: existingBrand, error: selectError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (selectError) {
      if (selectError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(selectError, 'updateBrand'));
    }

    // Update allowed fields only
    const { data, error } = await supabase
      .from('brands')
      .update(validation.data)
      .eq('id', idValidation.data)
      .select()
      .single();

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'updateBrand'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'updateBrand');
  }
}

/**
 * Archive a brand (soft delete)
 * Requires auth, validates id, verifies ownership
 * Updates status to archived, does not hard delete
 */
export async function archiveBrand(id: string): Promise<BrandActionResult<Brand>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to archive a brand')
      );
    }

    const idValidation = validateBrandId(id);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    // Verify ownership via RLS select
    const { data: existingBrand, error: selectError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (selectError) {
      if (selectError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(selectError, 'archiveBrand'));
    }

    // Update status to archived
    const { data, error } = await supabase
      .from('brands')
      .update({ status: 'archived' })
      .eq('id', idValidation.data)
      .select()
      .single();

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'archiveBrand'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'archiveBrand');
  }
}

// ============================================================================
// Brand Core Profile Actions
// ============================================================================

/**
 * Create brand core profile
 * Requires auth, validates brandId, verifies brand ownership
 * Inserts profile with user_id from auth
 */
export async function createBrandCoreProfile(brandId: string): Promise<BrandActionResult<BrandCoreProfile>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to create a brand profile')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    // Verify brand ownership via RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'createBrandCoreProfile'));
    }

    // Insert profile with user_id from auth
    const { data, error } = await supabase
      .from('brand_core_profiles')
      .insert({
        brand_id: idValidation.data,
        user_id: user.id,
      })
      .select()
      .single();

    if (error) {
      // Handle unique brand_id duplicate gracefully
      if (error.code === '23505') {
        // Profile already exists, fetch it
        const { data: existingProfile, error: fetchError } = await supabase
          .from('brand_core_profiles')
          .select('*')
          .eq('brand_id', idValidation.data)
          .single();

        if (fetchError) {
          return makeBrandActionFailure(mapSupabaseErrorToBrandError(fetchError, 'createBrandCoreProfile'));
        }
        return makeBrandActionSuccess(existingProfile);
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'createBrandCoreProfile'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'createBrandCoreProfile');
  }
}

/**
 * Update brand core profile
 * Requires auth, verifies brand ownership
 * Updates JSONB profile fields
 */
export async function updateBrandCoreProfile(
  brandId: string,
  input: BrandCoreProfileUpdateInput
): Promise<BrandActionResult<BrandCoreProfile>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to update a brand profile')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    const validation = validateBrandCoreProfileUpdateInput(input);
    if (!validation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_CREATE_VALIDATION', 'Invalid input'),
        'updateBrandCoreProfile',
        validation.errors
      );
    }

    // Verify brand ownership via RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'updateBrandCoreProfile'));
    }

    // Update profile fields
    const { data, error } = await supabase
      .from('brand_core_profiles')
      .update(validation.data)
      .eq('brand_id', idValidation.data)
      .select()
      .single();

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'updateBrandCoreProfile'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'updateBrandCoreProfile');
  }
}

// ============================================================================
// Connected Channels Actions
// ============================================================================

/**
 * Get connected channels for a brand
 * Requires auth, verifies brand exists through RLS
 * Returns existing rows
 */
export async function getConnectedChannels(brandId: string): Promise<BrandActionResult<ConnectedChannel[]>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to view connected channels')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    // Verify brand exists through RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'getConnectedChannels'));
    }

    // Get connected channels
    const { data, error } = await supabase
      .from('connected_channels')
      .select('*')
      .eq('brand_id', idValidation.data)
      .order('created_at', { ascending: false });

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'getConnectedChannels'));
    }

    return makeBrandActionSuccess(data || []);
  } catch (error) {
    return toBrandActionFailure(error, 'getConnectedChannels');
  }
}

/**
 * Upsert connected channel placeholder (V1 only)
 * Requires auth, verifies brand ownership, validates platform/status
 * Upserts status only, does not store tokens, does not implement OAuth
 */
export async function upsertConnectedChannelPlaceholder(
  brandId: string,
  platform: string,
  status: string
): Promise<BrandActionResult<ConnectedChannel>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to update channels')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    const validation = validateConnectedChannelPlaceholderInput({ brandId, platform, status });
    if (!validation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_CREATE_VALIDATION', 'Invalid input'),
        'upsertConnectedChannelPlaceholder',
        validation.errors
      );
    }

    // Verify brand ownership via RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'upsertConnectedChannelPlaceholder'));
    }

    // Upsert channel status only
    const { data, error } = await supabase
      .from('connected_channels')
      .upsert({
        brand_id: idValidation.data,
        user_id: user.id,
        platform: validation.data.platform,
        status: validation.data.status,
        connection_type: DEFAULT_CONNECTION_TYPE,
      })
      .select()
      .single();

    if (error) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(error, 'upsertConnectedChannelPlaceholder'));
    }

    return makeBrandActionSuccess(data);
  } catch (error) {
    return toBrandActionFailure(error, 'upsertConnectedChannelPlaceholder');
  }
}

// ============================================================================
// Logo Upload Actions
// ============================================================================

/**
 * Upload brand logo
 * Requires auth, verifies brand ownership before upload
 * Validates file type/size, enforces folder structure
 * Uploads to brand-logos, updates brands.logo_url
 * 
 * NOTE: File upload handling in Server Actions requires FormData.
 * This implementation is a stub - actual file upload needs FormData handling.
 * Returns typed failure with clear TODO blocker.
 */
export async function uploadBrandLogo(brandId: string, file: File): Promise<BrandActionResult<BrandLogoUploadResult>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to upload a logo')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    // Verify brand ownership via RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'uploadBrandLogo'));
    }

    // Validate file
    const fileValidation = validateBrandLogoFile(file);
    if (!fileValidation.valid) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_CREATE_VALIDATION', fileValidation.error || 'Invalid file')
      );
    }

    // Generate safe filename and storage path
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const timestamp = Date.now();
    const path = `${user.id}/${idValidation.data}/${timestamp}-${safeFileName}`;

    // Convert File to buffer for Supabase Storage upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .upload(path, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return makeBrandActionFailure(
        new BrandOSError(
          'BRAND_LOGO_UPLOAD_FAILED',
          uploadError.message || 'Failed to upload logo to storage',
          uploadError.message,
          'uploadBrandLogo'
        )
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase
      .storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(path);

    const publicUrl = publicUrlData.publicUrl;

    // Update brand with new logo_url
    const { error: updateError } = await supabase
      .from('brands')
      .update({ logo_url: publicUrl })
      .eq('id', idValidation.data)
      .select()
      .single();

    if (updateError) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(updateError, 'uploadBrandLogo'));
    }

    return makeBrandActionSuccess<BrandLogoUploadResult>({ publicUrl, path });
  } catch (error) {
    return toBrandActionFailure(error, 'uploadBrandLogo');
  }
}

/**
 * Delete brand logo
 * Requires auth, verifies brand ownership
 * Validates path belongs to user_id/brand_id
 * Deletes from brand-logos, clears brands.logo_url if matching
 * Does not delete arbitrary paths
 */
export async function deleteBrandLogo(brandId: string, path: string): Promise<BrandActionResult<void>> {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_AUTH_REQUIRED', 'You must be logged in to delete a logo')
      );
    }

    const idValidation = validateBrandId(brandId);
    if (!idValidation.success) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_INVALID_INPUT', 'Invalid brand ID format')
      );
    }

    // Verify brand ownership via RLS select
    const { data: brand, error: brandError } = await supabase
      .from('brands')
      .select('id, logo_url')
      .eq('id', idValidation.data)
      .single();

    if (brandError) {
      if (brandError.code === 'PGRST116') {
        return makeBrandActionFailure(
          new BrandOSError('BRAND_NOT_FOUND', 'Brand not found')
        );
      }
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(brandError, 'deleteBrandLogo'));
    }

    // Validate path belongs to user_id/brand_id
    const expectedPathPrefix = `${user.id}/${idValidation.data}/`;
    if (!path.startsWith(expectedPathPrefix)) {
      return makeBrandActionFailure(
        new BrandOSError('BRAND_STORAGE_PATH_INVALID', 'Invalid storage path')
      );
    }

    // Delete from storage
    const { error: deleteError } = await supabase
      .storage
      .from(STORAGE_BUCKET)
      .remove([path]);

    if (deleteError) {
      return makeBrandActionFailure(mapSupabaseErrorToBrandError(deleteError, 'deleteBrandLogo'));
    }

    // Clear brands.logo_url if matching
    if (brand.logo_url && brand.logo_url.includes(path)) {
      const { error: updateError } = await supabase
        .from('brands')
        .update({ logo_url: null })
        .eq('id', idValidation.data);

      if (updateError) {
        return makeBrandActionFailure(mapSupabaseErrorToBrandError(updateError, 'deleteBrandLogo'));
      }
    }

    return makeBrandActionSuccess(undefined);
  } catch (error) {
    return toBrandActionFailure(error, 'deleteBrandLogo');
  }
}

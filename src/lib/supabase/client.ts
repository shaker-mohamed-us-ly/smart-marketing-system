/**
 * Supabase Browser Client
 *
 * This file creates a Supabase client for use in browser/client components.
 * Uses @supabase/ssr createBrowserClient for cookie-based session persistence,
 * ensuring the server can read the session from cookies on subsequent requests.
 *
 * Security:
 * - Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY only
 * - No service_role key
 * - No secrets in source
 */

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseAnonKey) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable');
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

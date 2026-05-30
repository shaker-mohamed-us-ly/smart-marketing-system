import { cookies } from "next/headers";
import { Locale, localeCookieName, legacyLocaleCookieName, normalizeLocale, isValidLocale } from "./config";
import { getLegacyDictionary, createLegacyTranslator } from "./legacy-adapter";

/**
 * Server-side locale utilities for Next.js App Router
 * Reads locale from cookies for Server Components
 * 
 * @deprecated This is a transitional compatibility layer
 * New code should use next-intl's getLocale() and getTranslations() directly
 */

const COOKIE_MAX_AGE = 31536000; // 1 year

/**
 * Get the current locale from cookies
 * Checks NEXT_LOCALE first, then legacy locale, defaults to "ar"
 * @returns The current locale
 */
export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  
  // Check NEXT_LOCALE first (new standard)
  let locale = cookieStore.get(localeCookieName)?.value;
  
  // Fall back to legacy locale cookie
  if (!locale || !isValidLocale(locale)) {
    locale = cookieStore.get(legacyLocaleCookieName)?.value;
  }
  
  // Normalize to valid locale or default
  return normalizeLocale(locale);
}

/**
 * Get the dictionary for the current locale
 * Uses the new next-intl messages source
 * @returns The dictionary for the current locale
 * @deprecated Use next-intl's getTranslations() instead
 */
export async function getServerDictionary() {
  const locale = await getServerLocale();
  return getLegacyDictionary(locale);
}

/**
 * Create a server-side translator function
 * Returns a function that translates keys using the dictionary
 * @returns A translation function
 * @deprecated Use next-intl's getTranslations() instead
 */
export async function createServerTranslator() {
  const dictionary = await getServerDictionary();
  return createLegacyTranslator(dictionary);
}

/**
 * Legacy adapter for backward compatibility with old i18n system
 * This provides read access to next-intl messages for old APIs
 * 
 * @deprecated This is a transitional compatibility layer
 * New code should use next-intl's useTranslations() or getTranslations() directly
 */

import { Locale } from "./config";
import arMessages from "./messages/ar";
import enMessages from "./messages/en";

// Message type (using any for legacy compatibility since this is deprecated)
// @deprecated Use next-intl's useTranslations() or getTranslations() directly
type Messages = any;

/**
 * Get messages for a locale (for legacy compatibility)
 * @param locale - The locale to get messages for
 * @returns The messages for the locale
 */
export function getLegacyMessages(locale: Locale): Messages {
  if (locale === "en") {
    return enMessages;
  }
  return arMessages;
}

/**
 * Legacy dictionary type (for backward compatibility)
 * This matches the old Dictionary type structure
 */
export type LegacyDictionary = Messages;

/**
 * Create a legacy translator function from messages
 * @param messages - The messages to translate from
 * @returns A translation function compatible with old t() API
 */
export function createLegacyTranslator(messages: Messages) {
  return function t(key: string): string {
    const keys = key.split(".");
    let value: any = messages;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    // Return empty string if translation not found to prevent raw key leakage
    // This is safer than returning the key which would show in the UI
    return value || "";
  };
}

/**
 * Get legacy dictionary for a locale
 * @param locale - The locale to get dictionary for
 * @returns The dictionary for the locale
 */
export function getLegacyDictionary(locale: Locale): LegacyDictionary {
  return getLegacyMessages(locale);
}

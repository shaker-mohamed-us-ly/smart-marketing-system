import { Dictionary } from "./types";
import { getDictionarySafe, t as translate } from "./translator";
import { Locale } from "./config";

/**
 * Get dictionary for a locale (for use in Server Components)
 * @param locale - The locale to get dictionary for (default: "ar")
 * @returns The dictionary for the locale
 */
export function useDictionary(locale: Locale = "ar"): Dictionary {
  return getDictionarySafe(locale);
}

/**
 * Translate a key from a dictionary
 * @param dictionary - The dictionary to translate from
 * @param key - The translation key (dot notation)
 * @returns The translated string or the key if not found
 */
export { t as translate };

// Re-export t for backward compatibility
export const t = translate;

import { Dictionary } from "./types";
import { getDictionary } from "./get-dictionary";
import { Locale } from "./config";

/**
 * Get dictionary for a locale
 * @param locale - The locale to get dictionary for (default: "ar")
 * @returns The dictionary for the locale
 */
export function getDictionarySafe(locale: Locale = "ar"): Dictionary {
  return getDictionary(locale);
}

/**
 * Create a translator function for a dictionary
 * @param dictionary - The dictionary to translate from
 * @returns A translation function
 */
export function createTranslator(dictionary: Dictionary) {
  return function t(key: string): string {
    const keys = key.split(".");
    let value: any = dictionary;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };
}

/**
 * Translate a key from a dictionary
 * @param dictionary - The dictionary to translate from
 * @param key - The translation key (dot notation)
 * @returns The translated string or the key if not found
 */
export function t(dictionary: Dictionary, key: string): string {
  const keys = key.split(".");
  let value: any = dictionary;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

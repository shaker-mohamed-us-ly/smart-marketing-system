// next-intl configuration
export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

// Cookie names
export const localeCookieName = "NEXT_LOCALE";
export const legacyLocaleCookieName = "locale";

// Locale direction mapping
export const localeDirectionMap: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

// Validate locale
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Normalize locale to valid locale or default
export function normalizeLocale(locale: string | null | undefined): Locale {
  if (!locale) return defaultLocale;
  if (isValidLocale(locale)) return locale;
  return defaultLocale;
}

// Legacy config for backward compatibility
export const i18n = {
  defaultLocale,
  locales,
} as const;

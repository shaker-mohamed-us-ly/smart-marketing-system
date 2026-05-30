import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { Locale, defaultLocale, localeCookieName, legacyLocaleCookieName, normalizeLocale, isValidLocale } from "./config";
import arMessages from "./messages/ar";
import enMessages from "./messages/en";

// Message type for next-intl
type Messages = typeof arMessages;

/**
 * next-intl request configuration
 * Reads locale from cookies and loads appropriate messages
 */
export default getRequestConfig(async () => {
  // Read locale from cookies
  const cookieStore = await cookies();
  
  // Check NEXT_LOCALE first (new standard)
  let locale = cookieStore.get(localeCookieName)?.value;
  
  // Fall back to legacy locale cookie
  if (!locale || !isValidLocale(locale)) {
    locale = cookieStore.get(legacyLocaleCookieName)?.value;
  }
  
  // Normalize to valid locale or default
  locale = normalizeLocale(locale);
  
  // Load messages based on locale
  let messages: Messages;
  if (locale === "en") {
    messages = enMessages;
  } else {
    messages = arMessages;
  }
  
  return {
    locale,
    messages,
    timeZone: "Asia/Riyadh", // Set appropriate timezone
    now: new Date(),
  };
});

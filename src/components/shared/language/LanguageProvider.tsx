"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Locale } from "@/i18n/config";
import { getLegacyDictionary, createLegacyTranslator } from "@/i18n/legacy-adapter";

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  direction: "rtl" | "ltr";
  dictionary: any;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider - Transitional compatibility layer
 * 
 * This provider maintains the old useLanguage() API while internally
 * aligning with the new next-intl messages source.
 * 
 * @deprecated This is a transitional compatibility layer
 * New code should use next-intl's useTranslations() hook directly
 */
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [dictionary, setDictionary] = useState<any>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialize from document attributes (set by pre-hydration script)
    const html = document.documentElement;
    const docLang = html.getAttribute("lang");
    const docDir = html.getAttribute("dir");
    
    if (docLang === "en" && docDir === "ltr") {
      setLocaleState("en");
    } else if (docLang === "ar" && docDir === "rtl") {
      setLocaleState("ar");
    } else {
      // Fall back to localStorage
      const savedLocale = localStorage.getItem("locale") as Locale | null;
      if (savedLocale && (savedLocale === "ar" || savedLocale === "en")) {
        setLocaleState(savedLocale);
      } else {
        setLocaleState("ar");
      }
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("locale", locale);
      // Load dictionary from new messages source
      const dict = getLegacyDictionary(locale);
      setDictionary(dict);
      
      // Apply direction to document only if changed
      const html = document.documentElement;
      const currentLang = html.getAttribute("lang");
      const currentDir = html.getAttribute("dir");
      const newLang = locale;
      const newDir = locale === "ar" ? "rtl" : "ltr";
      
      if (currentLang !== newLang || currentDir !== newDir) {
        html.setAttribute("lang", newLang);
        html.setAttribute("dir", newDir);
      }
    }
  }, [locale, mounted]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const direction: "rtl" | "ltr" = locale === "ar" ? "rtl" : "ltr";

  const t = useCallback((key: string): string => {
    const keys = key.split(".");
    let value: any = dictionary;
    for (const k of keys) {
      value = value?.[k];
    }
    // Return empty string if translation not found to prevent raw key leakage
    return value || "";
  }, [dictionary]);

  const value: LanguageContextType = useMemo(() => ({ 
    locale, 
    setLocale, 
    direction, 
    dictionary, 
    t 
  }), [locale, setLocale, direction, dictionary, t]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useLanguage hook - Transitional compatibility layer
 * 
 * @deprecated This is a transitional compatibility layer
 * New code should use next-intl's useTranslations() hook directly
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // Return fallback for SSR
    return {
      locale: "ar" as Locale,
      setLocale: () => {},
      direction: "rtl" as "rtl" | "ltr",
      dictionary: {} as any,
      t: (key: string) => key,
    };
  }
  return context;
}

"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { localeCookieName, legacyLocaleCookieName } from "@/i18n/config";

export interface LanguageSwitcherProps extends HTMLAttributes<HTMLDivElement> {}

export function LanguageSwitcher({ className, ...props }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('common');

  const locales = useMemo(() => [
    { code: "ar" as const, label: t('languageArabic'), nativeLabel: t('languageArabicNative') },
    { code: "en" as const, label: t('languageEnglish'), nativeLabel: t('languageEnglishNative') },
  ], [t]);

  const handleLocaleChange = (newLocale: "ar" | "en") => {
    // Skip if same locale
    if (locale === newLocale) return;

    // Update localStorage for client-side
    localStorage.setItem("locale", newLocale);
    
    // Update document lang/dir
    const html = document.documentElement;
    html.setAttribute("lang", newLocale);
    html.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
    
    // Set NEXT_LOCALE cookie (new standard)
    document.cookie = `${localeCookieName}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Set legacy locale cookie for backward compatibility
    document.cookie = `${legacyLocaleCookieName}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    
    // Refresh to update Server Components
    router.refresh();
  };

  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex items-center gap-1">
        {locales.map((loc) => (
          <button
            key={loc.code}
            onClick={() => handleLocaleChange(loc.code)}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              locale === loc.code
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            )}
          >
            {loc.nativeLabel}
          </button>
        ))}
      </div>
    </div>
  );
}

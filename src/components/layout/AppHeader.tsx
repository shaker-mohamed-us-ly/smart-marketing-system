"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useMemo, useRef, useState, useEffect } from "react";
import { Bell, User, LogIn, Sun, Moon, Plus, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useTheme } from "@/components/shared/theme/ThemeProvider";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { localeCookieName, legacyLocaleCookieName } from "@/i18n/config";
import styles from "./AppShell.module.css";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { getBrands } from "@/lib/brand/server-actions";
import type { Brand } from "@/lib/brand/types";

export interface AppHeaderProps extends HTMLAttributes<HTMLDivElement> {
  platform?: "client" | "control";
}

interface BrandContextProps {
  brands: Brand[] | null;
  loading: boolean;
  hasMultiple: boolean;
  activeBrand: Brand | null;
  t: ReturnType<typeof useTranslations>;
}

function BrandContext({ brands, loading, hasMultiple, activeBrand, t }: BrandContextProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dropdownOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  if (loading) {
    return (
      <div className={styles.brandContext}>
        <div className={styles.brandSkeleton} />
      </div>
    );
  }

  if (!activeBrand) {
    return (
      <Link href="/client/brand" className={styles.brandCta} aria-label={t("addBrand")}>
        <span className={styles.brandCtaIcon}>
          <Plus style={{ width: 16, height: 16 }} />
        </span>
        <span>{t("addBrand")}</span>
      </Link>
    );
  }

  const logoSrc = activeBrand.logo_url || null;
  const initials = activeBrand.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className={styles.brandContext} ref={dropdownRef}>
      <button
        type="button"
        className={styles.brandCapsule}
        onClick={() => hasMultiple && setDropdownOpen((v) => !v)}
        aria-haspopup={hasMultiple ? "listbox" : undefined}
        aria-expanded={hasMultiple ? dropdownOpen : undefined}
      >
        {logoSrc ? (
          <img src={logoSrc} alt="" className={styles.brandLogo} />
        ) : (
          <span className={styles.brandInitials}>{initials}</span>
        )}
        <div className={styles.brandMeta}>
          <span className={styles.brandName}>{activeBrand.name}</span>
          <span className={styles.brandMetaTag}>{t("brandMetaTag")}</span>
        </div>
        {hasMultiple && (
          <ChevronDown
            style={{ width: 14, height: 14 }}
            className={cn(styles.brandChevron, dropdownOpen && styles.brandChevronOpen)}
          />
        )}
      </button>

      {hasMultiple && dropdownOpen && brands && (
        <div className={styles.brandDropdown} role="listbox">
          <div className={styles.brandDropdownHeader}>{t("brands")}</div>
          {brands.map((b) => (
            <div
              key={b.id}
              className={cn(styles.brandDropdownItem, b.id === activeBrand.id && styles.brandDropdownItemActive)}
              role="option"
              aria-selected={b.id === activeBrand.id}
            >
              {b.logo_url ? (
                <img src={b.logo_url} alt="" className={styles.brandDropdownLogo} />
              ) : (
                <span className={styles.brandDropdownInitials}>
                  {b.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
                </span>
              )}
              <span>{b.name}</span>
            </div>
          ))}
          <Link href="/client/brand" className={styles.brandDropdownAdd} onClick={() => setDropdownOpen(false)}>
            <Plus style={{ width: 14, height: 14 }} />
            <span>{t("addBrand")}</span>
          </Link>
        </div>
      )}
    </div>
  );
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ platform = "client", className, ...props }, ref) => {
    const t = useTranslations('common');
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [brands, setBrands] = useState<Brand[] | null>(null);
    const [brandLoading, setBrandLoading] = useState(true);
    const { theme, toggleTheme } = useTheme();
    const locale = useLocale();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
      supabase.auth.getUser().then(({ data }) => {
        setUser(data.user || null);
      });
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
      });
      return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
      if (platform !== "client") {
        setBrandLoading(false);
        return;
      }
      let cancelled = false;
      getBrands().then((result) => {
        if (cancelled) return;
        setBrandLoading(false);
        if (result.success && result.data) {
          setBrands(result.data);
        } else {
          setBrands([]);
        }
      }).catch(() => {
        if (cancelled) return;
        setBrandLoading(false);
        setBrands([]);
      });
      return () => { cancelled = true; };
    }, [platform]);

    const displayName = useMemo(() => {
      if (!user) return t("firstNameFallback");
      const fullName = user.user_metadata?.full_name as string | undefined;
      if (fullName) return fullName.split(" ")[0];
      const name = user.user_metadata?.name as string | undefined;
      if (name) return name.split(" ")[0];
      const email = user.email;
      if (email) {
        const local = email.split("@")[0];
        const cleaned = local.replace(/^[0-9_]+/, "").replace(/[._]/g, " ").split(" ")[0];
        return cleaned || t("firstNameFallback");
      }
      return t("firstNameFallback");
    }, [user, t]);

    const userEmail = user?.email || null;
    const hasMultipleBrands = brands ? brands.length > 1 : false;
    const activeBrand = brands && brands.length > 0 ? brands[0] : null;

    const handleLocaleChange = (newLocale: "ar" | "en") => {
      if (locale === newLocale) return;
      localStorage.setItem("locale", newLocale);
      const html = document.documentElement;
      html.setAttribute("lang", newLocale);
      html.setAttribute("dir", newLocale === "ar" ? "rtl" : "ltr");
      document.cookie = `${localeCookieName}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      document.cookie = `${legacyLocaleCookieName}=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.refresh();
    };

    return (
      <header
        ref={ref}
        className={cn(styles.topbar, className)}
        {...props}
      >
        {/* Right (RTL start): Brand Context */}
        {platform === "client" ? (
          <BrandContext
            brands={brands}
            loading={brandLoading}
            hasMultiple={hasMultipleBrands}
            activeBrand={activeBrand}
            t={t}
          />
        ) : (
          <div className={styles.brandContext}>
            <span className={styles.platformLabel}>{t("controlPlatform")}</span>
          </div>
        )}

        {/* Left (RTL end): Controls Cluster */}
        <div className={styles.controlsCluster}>
          {/* Language */}
          <div className={styles.langSwitcher}>
            <button
              type="button"
              onClick={() => handleLocaleChange("ar")}
              className={cn(styles.langBtn, locale === "ar" && styles.langBtnActive)}
              aria-label="Arabic"
            >
              {t('languageArabicNative')}
            </button>
            <button
              type="button"
              onClick={() => handleLocaleChange("en")}
              className={cn(styles.langBtn, locale === "en" && styles.langBtnActive)}
              aria-label="English"
            >
              EN
            </button>
          </div>

          {/* Theme */}
          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className={styles.controlBtn}
              aria-label={t("toggleTheme")}
            >
              {theme === "light" ? (
                <Sun style={{ width: 16, height: 16 }} />
              ) : (
                <Moon style={{ width: 16, height: 16 }} />
              )}
            </button>
          ) : (
            <button type="button" disabled className={styles.controlBtn} aria-label={t("toggleTheme")}>
              <Sun style={{ width: 16, height: 16 }} />
            </button>
          )}

          {/* Notifications */}
          <button type="button" className={styles.controlBtn} aria-label={t('notifications')}>
            <Bell style={{ width: 16, height: 16 }} />
            <span className={styles.notifyDot} />
          </button>

          {/* User */}
          {userEmail ? (
            <Link
              href="/client/account"
              className={styles.userCapsule}
              aria-label={t('profile')}
            >
              <User style={{ width: 16, height: 16 }} />
              <span>{displayName}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className={styles.userCapsule}
              aria-label={t('signIn')}
            >
              <LogIn style={{ width: 16, height: 16 }} />
              <span>{t('signIn')}</span>
            </Link>
          )}

        </div>
      </header>
    );
  }
);

AppHeader.displayName = "AppHeader";

export { AppHeader };

"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useMemo } from "react";
import { NavItem } from "./NavItem";
import { Cpu } from "lucide-react";
import { useTranslations } from "next-intl";
import { getIconForRoute } from "@/components/shared/icons/icon-registry";
import { useTheme } from "@/components/shared/theme/ThemeProvider";
import { usePathname } from "next/navigation";
import styles from "./AppShell.module.css";

export interface SidebarItem {
  href: string;
  label: string;
  icon?: any;
}

export interface AppSidebarProps extends HTMLAttributes<HTMLDivElement> {
  platform: "client" | "control";
  items?: SidebarItem[];
  activeItem?: string;
}

export interface SidebarSection {
  sectionKey: string;
  items: SidebarItem[];
}

const clientNavigationSections: SidebarSection[] = [
  {
    sectionKey: "sectionCommand",
    items: [
      { href: "/client/dashboard", label: "dashboard", icon: getIconForRoute("/client/dashboard") },
      { href: "/client/brand", label: "brands", icon: getIconForRoute("/client/brand") },
      { href: "/client/brand-dna", label: "brandDNA", icon: getIconForRoute("/client/brand-dna") },
      { href: "/client/campaigns", label: "campaigns", icon: getIconForRoute("/client/campaigns") },
    ],
  },
  {
    sectionKey: "sectionStudio",
    items: [
      { href: "/client/content-studio", label: "contentStudio", icon: getIconForRoute("/client/content-studio") },
      { href: "/client/analytics", label: "analytics", icon: getIconForRoute("/client/analytics") },
      { href: "/client/recommendations", label: "recommendations", icon: getIconForRoute("/client/recommendations") },
    ],
  },
  {
    sectionKey: "sectionSystem",
    items: [
      { href: "/client/settings", label: "settings", icon: getIconForRoute("/client/settings") },
      { href: "/client/account", label: "account", icon: getIconForRoute("/client/account") },
    ],
  },
];

const controlNavigationSections: SidebarSection[] = [
  {
    sectionKey: "sectionCommand",
    items: [
      { href: "/control/overview", label: "overview", icon: getIconForRoute("/control/overview") },
      { href: "/control/clients", label: "clients", icon: getIconForRoute("/control/clients") },
      { href: "/control/ai-brain", label: "aiBrain", icon: getIconForRoute("/control/ai-brain") },
      { href: "/control/integrations", label: "integrations", icon: getIconForRoute("/control/integrations") },
    ],
  },
  {
    sectionKey: "sectionStudio",
    items: [
      { href: "/control/learning-center", label: "learningCenter", icon: getIconForRoute("/control/learning-center") },
      { href: "/control/monitoring", label: "monitoring", icon: getIconForRoute("/control/monitoring") },
      { href: "/control/billing", label: "billing", icon: getIconForRoute("/control/billing") },
    ],
  },
  {
    sectionKey: "sectionSystem",
    items: [
      { href: "/control/backup", label: "backup", icon: getIconForRoute("/control/backup") },
      { href: "/control/system-settings", label: "systemSettings", icon: getIconForRoute("/control/system-settings") },
    ],
  },
];

const LogoImg = () => {
  const { theme } = useTheme();
  const t = useTranslations('common');
  return (
    <img
      src={theme === "dark" ? "/brand/sms-logo-light.svg" : "/brand/sms-logo-dark.svg"}
      alt={t("logoAlt")}
      className={styles.sidebarLogo}
    />
  );
};

const AppSidebar = forwardRef<HTMLDivElement, AppSidebarProps>(
  ({ platform, items, activeItem, className, ...props }, ref) => {
    const t = useTranslations('common');
    const tSidebar = useTranslations('sidebar');
    const pathname = usePathname();
    const effectiveActiveItem = activeItem ?? pathname;

    const navigationSections = useMemo(() => {
      const baseSections = platform === "client" ? clientNavigationSections : controlNavigationSections;
      return baseSections.map(section => ({
        sectionKey: section.sectionKey,
        sectionLabel: tSidebar(section.sectionKey),
        items: section.items.map(item => ({
          ...item,
          label: t(item.label)
        }))
      }));
    }, [platform, t, tSidebar]);

    return (
      <aside
        ref={ref}
        className={cn(styles.sidebar, className)}
        {...props}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarBrand}>
            <div className={styles.sidebarBrandIcon}>
              <LogoImg />
            </div>
          </div>
        </div>

        <nav className={styles.sidebarNav}>
          {navigationSections.map((section) => (
            <div key={section.sectionKey} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className={styles.navSectionLabel}>{section.sectionLabel}</div>
              {section.items.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  active={effectiveActiveItem === item.href}
                />
              ))}
            </div>
          ))}
        </nav>

        <div className={styles.sidebarWidget}>
            <div className={styles.widgetHeader}>
              <div className={styles.widgetIcon}>
                <Cpu style={{ width: 15, height: 15 }} strokeWidth={1.75} />
              </div>
              <div>
                <div className={styles.widgetTitle}>{tSidebar("systemIntelligence")}</div>
                <div className={styles.widgetSubtitle}>{tSidebar("learningActive")}</div>
              </div>
            </div>
            <div className={styles.widgetRow} style={{ marginBottom: 8 }}>
              <span className={styles.widgetLabel}>{tSidebar("health")}</span>
              <span className={styles.widgetValue}>98%</span>
            </div>
            <div className={styles.widgetBarTrack} style={{ marginBottom: 10 }}>
              <div className={styles.widgetBarFill} style={{ width: "98%" }} />
            </div>
            <div className={styles.widgetRow}>
              <span className={styles.widgetLabel}>{tSidebar("learning")}</span>
              <span className={styles.widgetValue}>{tSidebar("active")}</span>
            </div>
          </div>
      </aside>
    );
  }
);

AppSidebar.displayName = "AppSidebar";

export { AppSidebar };

"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useState, useMemo } from "react";
import { NavItem } from "./NavItem";
import { Button } from "@/components/shared/Button";
import { ChevronLeft, ChevronRight, Sparkles, Cpu, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { getIconForRoute } from "@/components/shared/icons/icon-registry";
import { AppIcon } from "@/components/shared/icons/AppIcon";

export interface SidebarItem {
  href: string;
  label: string;
  icon?: any;
}

export interface AppSidebarProps extends HTMLAttributes<HTMLDivElement> {
  platform: "client" | "control";
  items?: SidebarItem[];
  activeItem?: string;
  collapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

const clientNavigationBase: SidebarItem[] = [
  { href: "/client/dashboard", label: "dashboard", icon: getIconForRoute("/client/dashboard") },
  { href: "/client/brand", label: "brands", icon: getIconForRoute("/client/brand") },
  { href: "/client/brand-dna", label: "brandDNA", icon: getIconForRoute("/client/brand-dna") },
  { href: "/client/campaigns", label: "campaigns", icon: getIconForRoute("/client/campaigns") },
  { href: "/client/content-studio", label: "contentStudio", icon: getIconForRoute("/client/content-studio") },
  { href: "/client/analytics", label: "analytics", icon: getIconForRoute("/client/analytics") },
  { href: "/client/recommendations", label: "recommendations", icon: getIconForRoute("/client/recommendations") },
  { href: "/client/settings", label: "settings", icon: getIconForRoute("/client/settings") },
  { href: "/client/account", label: "account", icon: getIconForRoute("/client/account") },
];

const controlNavigationBase: SidebarItem[] = [
  { href: "/control/overview", label: "overview", icon: getIconForRoute("/control/overview") },
  { href: "/control/clients", label: "clients", icon: getIconForRoute("/control/clients") },
  { href: "/control/ai-brain", label: "aiBrain", icon: getIconForRoute("/control/ai-brain") },
  { href: "/control/integrations", label: "integrations", icon: getIconForRoute("/control/integrations") },
  { href: "/control/learning-center", label: "learningCenter", icon: getIconForRoute("/control/learning-center") },
  { href: "/control/monitoring", label: "monitoring", icon: getIconForRoute("/control/monitoring") },
  { href: "/control/billing", label: "billing", icon: getIconForRoute("/control/billing") },
  { href: "/control/backup", label: "backup", icon: getIconForRoute("/control/backup") },
  { href: "/control/system-settings", label: "systemSettings", icon: getIconForRoute("/control/system-settings") },
];

const AppSidebar = forwardRef<HTMLDivElement, AppSidebarProps>(
  ({ platform, items, activeItem, collapsed = false, onCollapseChange, className, ...props }, ref) => {
    const [isCollapsed, setIsCollapsed] = useState(collapsed);
    const t = useTranslations('common');
    const tSidebar = useTranslations('sidebar');

    const handleCollapse = () => {
      const newCollapsed = !isCollapsed;
      setIsCollapsed(newCollapsed);
      onCollapseChange?.(newCollapsed);
    };

    const navigationItems = useMemo(() => {
      const baseItems = platform === "client" ? clientNavigationBase : controlNavigationBase;
      return baseItems.map(item => ({
        ...item,
        label: t(item.label)
      }));
    }, [platform, t]);

    return (
      <aside
        ref={ref}
        className={cn(
          "flex flex-col border-r border-border/60 bg-card/80",
          "transition-all duration-300",
          isCollapsed ? "w-20" : "w-64",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-between p-6 border-b border-border/60">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center">
                {platform === "client" ? (
                  <Globe className="h-5 w-5 text-white" />
                ) : (
                  <Cpu className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-sm">
                  {platform === "client" ? tSidebar("client") : tSidebar("control")}
                </h2>
                <p className="text-xs text-muted-foreground">{tSidebar("platform")}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCollapse}
            aria-label={isCollapsed ? tSidebar('expandSidebar') : tSidebar('collapseSidebar')}
            className={cn("ml-auto", isCollapsed && "mx-auto")}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={activeItem === item.href}
              collapsed={isCollapsed}
            />
          ))}
        </nav>

        {!isCollapsed && (
          <div className="p-4 border-t border-border/60">
            <div className="relative overflow-hidden p-3 rounded-xl bg-gradient-to-br from-violet-600/10 to-cyan-500/10 border border-border/60">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                    <Cpu className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{tSidebar("systemIntelligence")}</p>
                    <p className="text-xs text-muted-foreground">{tSidebar("learningActive")}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{tSidebar("health")}</span>
                    <span className="text-success font-medium">98%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary/50 overflow-hidden">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-violet-600 to-cyan-500" />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{tSidebar("learning")}</span>
                    <span className="text-primary font-medium">{tSidebar("active")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>
    );
  }
);

AppSidebar.displayName = "AppSidebar";

export { AppSidebar };

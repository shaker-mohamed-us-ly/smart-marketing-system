"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef, useMemo } from "react";
import { Button } from "@/components/shared/Button";
import { Search, Bell, User, TrendingUp, Activity } from "lucide-react";
import { SystemStatus } from "./SystemStatus";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { ThemeToggle } from "@/components/shared/theme/ThemeToggle";
import { useTranslations } from "next-intl";

export interface AppHeaderProps extends HTMLAttributes<HTMLDivElement> {
  platform?: "client" | "control";
}

const AppHeader = forwardRef<HTMLDivElement, AppHeaderProps>(
  ({ platform = "client", className, ...props }, ref) => {
    const t = useTranslations('common');
    const hour = new Date().getHours();
    const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
    
    const smartGreeting = useMemo(() => {
      // Use dictionary greetings based on time of day
      return t(`greetings.${timeOfDay}`);
    }, [timeOfDay, t]);
    
    const subtitle = useMemo(() => {
      if (platform === "client") {
        return t("clientPlatform");
      } else {
        return t("controlPlatform");
      }
    }, [platform, t]);

    return (
      <header
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-4 px-6 py-4 border-b border-border/60",
          "bg-card/80",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center",
              "bg-gradient-to-br from-indigo-600 to-emerald-500",
              platform === "control" && "from-blue-600 to-violet-600"
            )}>
              {platform === "client" ? (
                <TrendingUp className="h-5 w-5 text-white" />
              ) : (
                <Activity className="h-5 w-5 text-white" />
              )}
            </div>
            <div>
              <h1 className="text-lg font-semibold">{smartGreeting}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <input
              type="text"
              placeholder={platform === "client" ? t("searchCampaigns") : t("searchSystem")}
              className="w-64 pl-10 pr-4 py-2 rounded-xl bg-secondary/50 border border-border/60 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all focus:border-primary/30"
            />
          </div>

          <LanguageSwitcher />

          <ThemeToggle />

          <Button variant="ghost" size="sm" className="relative hover-elevation">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error" />
          </Button>

          <Button variant="ghost" size="sm" className="hover-elevation">
            <User className="h-5 w-5" />
          </Button>

          <SystemStatus status="operational" showIndicator />
        </div>
      </header>
    );
  }
);

AppHeader.displayName = "AppHeader";

export { AppHeader };

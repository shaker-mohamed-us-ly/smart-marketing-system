"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";

export interface DashboardHeroProps extends HTMLAttributes<HTMLDivElement> {
  subtitle?: string;
}

export function DashboardHero({ subtitle, className, ...props }: DashboardHeroProps) {
  const t = useTranslations('common');
  const hour = new Date().getHours();
  const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";
  
  const greeting = t(`greetings.${timeOfDay}`);
  const defaultSubtitle = subtitle || t("clientDashboardHeroSubtitle");

  return (
    <div className={cn("mb-8", className)} {...props}>
      <h1 className="text-3xl font-semibold mb-2 relative inline-block">
        {greeting}
        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 to-transparent animate-pulse" />
      </h1>
      <p className="text-muted-foreground text-lg">{defaultSubtitle}</p>
    </div>
  );
}

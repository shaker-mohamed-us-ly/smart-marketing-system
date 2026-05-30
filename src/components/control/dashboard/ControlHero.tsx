import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";

export interface ControlHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  executiveStatus?: string;
}

export function ControlHero({ 
  title: titleProp,
  subtitle: subtitleProp,
  executiveStatus: executiveStatusProp,
  className, 
  ...props 
}: ControlHeroProps) {
  const t = useTranslations('controlOverview.hero');
  const displayTitle = titleProp ?? t('title');
  const displaySubtitle = subtitleProp ?? t('subtitle');
  const displayStatus = executiveStatusProp ?? t('executiveStatus');
  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-start justify-between mb-2">
        <h1 className="text-3xl font-semibold relative inline-block">
          {displayTitle}
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary/60 to-transparent animate-pulse" />
        </h1>
        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          {displayStatus}
        </span>
      </div>
      <p className="text-muted-foreground text-lg">{displaySubtitle}</p>
    </div>
  );
}

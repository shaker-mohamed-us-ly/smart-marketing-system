import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Download, Sparkles } from "lucide-react";

export interface AnalyticsHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: {
    title: string;
    subtitle: string;
    exportReport: string;
    generateInsights: string;
  };
}

export function AnalyticsHero({ 
  title,
  subtitle,
  labels,
  className, 
  ...props 
}: AnalyticsHeroProps) {
  const t = useTranslations('clientAnalytics');
  const defaultTitle = t('hero.title');
  const defaultSubtitle = t('hero.subtitle');
  const titleValue = title || defaultTitle;
  const subtitleValue = subtitle || defaultSubtitle;
  const l = labels || {
    title: t('hero.title'),
    subtitle: t('hero.subtitle'),
    exportReport: t('hero.exportReport'),
    generateInsights: t('hero.generateInsights'),
  };

  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{titleValue}</h1>
          <p className="text-muted-foreground max-w-2xl">{subtitleValue}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {l.exportReport}
          </SmartButton>
          <SmartButton className="gap-2">
            <Sparkles className="h-4 w-4" />
            {l.generateInsights}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

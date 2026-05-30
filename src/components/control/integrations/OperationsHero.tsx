import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Plus, Scan } from "lucide-react";

export interface OperationsHeroLabels {
  title: string;
  subtitle: string;
  runDailyScan: string;
  addProvider: string;
}

export interface OperationsHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: OperationsHeroLabels;
}

export function OperationsHero({ 
  title,
  subtitle,
  labels,
  className, 
  ...props 
}: OperationsHeroProps) {
  const t = useTranslations('controlIntegrations.hero');
  const displayTitle = title ?? labels?.title ?? t('title');
  const displaySubtitle = subtitle ?? labels?.subtitle ?? t('subtitle');

  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{displayTitle}</h1>
          <p className="text-muted-foreground max-w-2xl">{displaySubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Scan className="h-4 w-4" />
            {labels?.runDailyScan || t('runDailyScan')}
          </SmartButton>
          <SmartButton className="gap-2">
            <Plus className="h-4 w-4" />
            {labels?.addProvider || t('addProvider')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

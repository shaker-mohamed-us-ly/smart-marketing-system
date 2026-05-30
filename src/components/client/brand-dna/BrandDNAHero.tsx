import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Download, Sparkles } from "lucide-react";

export interface BrandDNAHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: {
    exportReport: string;
    aiAnalyzeBrand: string;
  };
}

export function BrandDNAHero({ 
  title: titleProp,
  subtitle: subtitleProp,
  labels,
  className, 
  ...props 
}: BrandDNAHeroProps) {
  const t = useTranslations('clientBrandDNA.hero');
  const title = titleProp ?? t('title');
  const subtitle = subtitleProp ?? t('subtitle');
  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {labels?.exportReport || t('exportReport')}
          </SmartButton>
          <SmartButton className="gap-2">
            <Sparkles className="h-4 w-4" />
            {labels?.aiAnalyzeBrand || t('aiAnalyzeBrand')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

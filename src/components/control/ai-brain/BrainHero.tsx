import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Brain, FileText, Sparkles } from "lucide-react";

export interface BrainHeroLabels {
  title: string;
  subtitle: string;
  runBrainAnalysis: string;
  generateIntelligenceReport: string;
}

export interface BrainHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: BrainHeroLabels;
}

export function BrainHero({ 
  title,
  subtitle,
  labels,
  className, 
  ...props 
}: BrainHeroProps) {
  const t = useTranslations('controlAIBrain.hero');
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
            <Sparkles className="h-4 w-4" />
            {labels?.runBrainAnalysis || t('runBrainAnalysis')}
          </SmartButton>
          <SmartButton className="gap-2">
            <FileText className="h-4 w-4" />
            {labels?.generateIntelligenceReport || t('generateIntelligenceReport')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

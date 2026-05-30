import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Video, Sparkles, Copy } from "lucide-react";

export interface ProductionDirectorPromptPanelProps extends HTMLAttributes<HTMLDivElement> {
  productionPrompt?: string;
  labels?: {
    title: string;
    professionalProductionInstructions: string;
    description: string;
  };
}

export function ProductionDirectorPromptPanel({ 
  productionPrompt: productionPromptProp,
  labels,
  className, 
  ...props 
}: ProductionDirectorPromptPanelProps) {
  const t = useTranslations('clientContentStudio.productionDirector');
  const productionPrompt = productionPromptProp || t('prompt');
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 mb-4">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm font-medium text-primary">{labels?.professionalProductionInstructions || t('professionalProductionInstructions')}</p>
          </div>
          <p className="text-sm leading-relaxed text-foreground">
            {productionPrompt}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {labels?.description || t('description')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

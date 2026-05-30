import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Palette, Heart, Layout, X, Shield } from "lucide-react";

export interface CreativeDirectorInstructionsProps extends HTMLAttributes<HTMLDivElement> {
  visualObjective?: string;
  emotionalObjective?: string;
  compositionDirection?: string;
  whatToAvoid?: string;
  brandConsistencyNotes?: string;
  labels?: {
    title: string;
    visualObjective: string;
    emotionalObjective: string;
    compositionDirection: string;
    whatToAvoid: string;
    brandConsistencyNotes: string;
  };
}

export function CreativeDirectorInstructions({ 
  visualObjective: visualObjectiveProp,
  emotionalObjective: emotionalObjectiveProp,
  compositionDirection: compositionDirectionProp,
  whatToAvoid: whatToAvoidProp,
  brandConsistencyNotes: brandConsistencyNotesProp,
  labels,
  className, 
  ...props 
}: CreativeDirectorInstructionsProps) {
  const t = useTranslations('clientContentStudio.creativeDirector');
  const visualObjective = visualObjectiveProp || t('defaultVisualObjective');
  const emotionalObjective = emotionalObjectiveProp || t('defaultEmotionalObjective');
  const compositionDirection = compositionDirectionProp || t('defaultCompositionDirection');
  const whatToAvoid = whatToAvoidProp || t('defaultWhatToAvoid');
  const brandConsistencyNotes = brandConsistencyNotesProp || t('defaultBrandConsistencyNotes');
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.visualObjective || t('visualObjective')}</p>
              <p className="font-medium">{visualObjective}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.emotionalObjective || t('emotionalObjective')}</p>
              <p className="font-medium">{emotionalObjective}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Layout className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.compositionDirection || t('compositionDirection')}</p>
              <p className="font-medium">{compositionDirection}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20">
            <X className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.whatToAvoid || t('whatToAvoid')}</p>
              <p className="font-medium text-red-600">{whatToAvoid}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.brandConsistencyNotes || t('brandConsistencyNotes')}</p>
              <p className="font-medium text-primary">{brandConsistencyNotes}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

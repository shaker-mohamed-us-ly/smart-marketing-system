import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, Users, Heart, ArrowRight } from "lucide-react";

export interface ProductionBriefPanelProps extends HTMLAttributes<HTMLDivElement> {
  campaign?: string;
  goal?: string;
  audience?: string;
  mainEmotion?: string;
  cta?: string;
  labels?: {
    title: string;
    campaign: string;
    goal: string;
    audience: string;
    mainEmotion: string;
    cta: string;
  };
}

export function ProductionBriefPanel({ 
  campaign: campaignProp,
  goal: goalProp,
  audience: audienceProp,
  mainEmotion: mainEmotionProp,
  cta: ctaProp,
  labels,
  className, 
  ...props 
}: ProductionBriefPanelProps) {
  const t = useTranslations('clientContentStudio.productionBrief');
  const campaign = campaignProp || t('defaultCampaign');
  const goal = goalProp || t('defaultGoal');
  const audience = audienceProp || t('defaultAudience');
  const mainEmotion = mainEmotionProp || t('defaultMainEmotion');
  const cta = ctaProp || t('defaultCta');
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.campaign || t('campaign')}</p>
              <p className="font-semibold text-primary">{campaign}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.goal || t('goal')}</p>
              <p className="font-medium">{goal}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.audience || t('audience')}</p>
              <p className="font-medium">{audience}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30">
            <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.mainEmotion || t('mainEmotion')}</p>
              <p className="font-medium">{mainEmotion}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.cta || t('cta')}</p>
              <p className="font-semibold text-primary">{cta}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

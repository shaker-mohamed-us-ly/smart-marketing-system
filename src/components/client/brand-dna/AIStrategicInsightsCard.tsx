import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Lightbulb, ArrowRight } from "lucide-react";

export interface AIStrategicInsightsCardProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: string[];
  labels?: {
    title: string;
    viewAllRecommendations: string;
  };
}

export function AIStrategicInsightsCard({ 
  recommendations,
  labels,
  className, 
  ...props 
}: AIStrategicInsightsCardProps) {
  const t = useTranslations('clientBrandDNA.aiStrategicInsights');
  const defaultRecommendations = [t('recommendationsList.focusCamera'), t('recommendationsList.emphasizeDesign'), t('recommendationsList.targetTech')];
  const recommendationsList = recommendations || defaultRecommendations;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3 mb-6">
          {recommendationsList.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-transparent border border-primary/10 hover:border-primary/20 transition-colors"
            >
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">{index + 1}</span>
              </div>
              <p className="text-sm font-medium">{recommendation}</p>
            </div>
          ))}
        </div>

        <SmartButton variant="outline" className="w-full gap-2">
          {labels?.viewAllRecommendations || t('viewAllRecommendations')}
          <ArrowRight className="h-4 w-4" />
        </SmartButton>
      </div>
    </StaticCard>
  );
}

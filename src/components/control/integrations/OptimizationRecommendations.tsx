import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Lightbulb, TrendingDown, TrendingUp, ArrowRight } from "lucide-react";

export interface OptimizationRecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: { 
    title: string; 
    savings?: string; 
    qualityLift?: string; 
    reason: string;
    type: "savings" | "quality" | "strategy";
  }[];
  labels?: {
    title: string;
    recommendations: string;
    optimization: string;
    savings: string;
    efficiency: string;
  };
}

export function OptimizationRecommendations({ 
  recommendations: recommendationsProp,
  labels,
  className, 
  ...props 
}: OptimizationRecommendationsProps) {
  const t = useTranslations('controlIntegrations.optimizationRecommendations');
  const recommendations = recommendationsProp || t.raw('items') as any[];
  const l = labels || {
    title: t('title'),
    recommendations: t('recommendations'),
    optimization: t('optimization'),
    savings: t('savings'),
    efficiency: t('efficiency'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold flex-1">{rec.title}</p>
                {rec.type === "savings" && (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <TrendingDown className="h-4 w-4" />
                    <span className="text-sm font-medium">{rec.savings}</span>
                  </div>
                )}
                {rec.type === "quality" && (
                  <div className="flex items-center gap-2 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{rec.qualityLift}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ArrowRight className="h-4 w-4" />
                <span>{rec.reason}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

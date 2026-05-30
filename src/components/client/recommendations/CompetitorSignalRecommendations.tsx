import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Eye, TrendingUp, DollarSign, Layers, Plus } from "lucide-react";

export interface CompetitorSignalRecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: { 
    recommendation: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
    subtitle: string;
  };
}

export function CompetitorSignalRecommendations({ 
  recommendations: recommendationsProp,
  labels,
  className, 
  ...props 
}: CompetitorSignalRecommendationsProps) {
  const t = useTranslations('clientRecommendations.competitorSignals');
  const recommendations = recommendationsProp || [
    { 
      recommendation: t('recommendation0'), 
      icon: Eye,
    },
    { 
      recommendation: t('recommendation1'), 
      icon: TrendingUp,
    },
    { 
      recommendation: t('recommendation2'), 
      icon: DollarSign,
    },
    { 
      recommendation: t('recommendation3'), 
      icon: Layers,
    },
    { 
      recommendation: t('recommendation4'), 
      icon: Plus,
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Eye className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-xs text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
        </div>

        <div className="space-y-3">
          {recommendations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium">{item.recommendation}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

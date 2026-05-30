import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { TrendingUp, CheckCircle } from "lucide-react";

export interface GrowthOpportunitiesPanelProps extends HTMLAttributes<HTMLDivElement> {
  opportunities?: { 
    opportunity: string; 
    growth: string;
  }[];
  labels?: {
    title: string;
  };
}

export function GrowthOpportunitiesPanel({ 
  opportunities: opportunitiesProp,
  labels,
  className, 
  ...props 
}: GrowthOpportunitiesPanelProps) {
  const t = useTranslations('clientRecommendations.growthOpportunities');
  const opportunities = opportunitiesProp || [
    { 
      opportunity: t('opportunity0'), 
      growth: t('growth0'),
    },
    { 
      opportunity: t('opportunity1'), 
      growth: t('growth1'),
    },
    { 
      opportunity: t('opportunity2'), 
      growth: t('growth2'),
    },
    { 
      opportunity: t('opportunity3'), 
      growth: t('growth3'),
    },
    { 
      opportunity: t('opportunity4'), 
      growth: t('growth4'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {opportunities.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <p className="text-sm font-medium">{item.opportunity}</p>
              </div>
              <div className="flex items-center gap-1 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-semibold">{item.growth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

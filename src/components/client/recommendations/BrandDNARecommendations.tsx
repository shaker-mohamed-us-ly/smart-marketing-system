import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Dna, Type, Layers, CheckCircle, TrendingUp } from "lucide-react";

export interface BrandDNARecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: { 
    recommendation: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
  };
}

export function BrandDNARecommendations({ 
  recommendations: recommendationsProp,
  labels,
  className, 
  ...props 
}: BrandDNARecommendationsProps) {
  const t = useTranslations('clientRecommendations.brandDNARecommendations');
  const recommendations = recommendationsProp || [
    { 
      recommendation: t('recommendation0'), 
      icon: Layers,
    },
    { 
      recommendation: t('recommendation1'), 
      icon: CheckCircle,
    },
    { 
      recommendation: t('recommendation2'), 
      icon: Dna,
    },
    { 
      recommendation: t('recommendation3'), 
      icon: Type,
    },
    { 
      recommendation: t('recommendation4'), 
      icon: TrendingUp,
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>

        <div className="space-y-3">
          {recommendations.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
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

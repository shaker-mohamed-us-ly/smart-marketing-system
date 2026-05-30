"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { Users, TrendingUp, Target } from "lucide-react";

export interface AudienceInsightsProps extends HTMLAttributes<HTMLDivElement> {
  insights?: {
    label: string;
    value: string;
    change: string;
  }[];
  labels?: {
    title: string;
    subtitle: string;
    thisMonth: string;
    insights?: {
      totalAudience: string;
      activeUsers: string;
      engagementRate: string;
    };
  };
}

export function AudienceInsights({ 
  insights,
  labels,
  className, 
  ...props 
}: AudienceInsightsProps) {
  const t = useTranslations('clientDashboard.audienceInsights');
  const defaultInsights = [
    { label: t('insights.totalAudience'), value: "1.42M", change: "+12%" },
    { label: t('insights.activeUsers'), value: "845K", change: "+8%" },
    { label: t('insights.engagementRate'), value: "8.7%", change: "+3%" },
  ];
  const insightsList = insights || defaultInsights;
  // Map hardcoded insight labels to labels
  const translatedInsights = insightsList.map(insight => {
    let translatedLabel = insight.label;
    if (insight.label.includes(t('insights.totalAudience'))) {
      translatedLabel = labels?.insights?.totalAudience || insight.label;
    } else if (insight.label.includes(t('insights.activeUsers'))) {
      translatedLabel = labels?.insights?.activeUsers || insight.label;
    } else if (insight.label.includes(t('insights.engagementRate'))) {
      translatedLabel = labels?.insights?.engagementRate || insight.label;
    }
    return { ...insight, label: translatedLabel };
  });

  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <AnimatedIcon icon={Users} size={20} state="idle" magnetic />
      </div>
      <div className="space-y-4">
        {translatedInsights.map((insight, index) => (
          <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <AnimatedIcon icon={index === 0 ? Users : index === 1 ? Target : TrendingUp} size={18} state="idle" />
              </div>
              <div>
                <p className="text-sm font-medium">{insight.label}</p>
                <p className="text-xs text-muted-foreground">{labels?.thisMonth || t('thisMonth')}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{insight.value}</p>
              <p className="text-xs text-emerald-600 font-medium">{insight.change}</p>
            </div>
          </div>
        ))}
      </div>
    </InteractiveCard>
  );
}

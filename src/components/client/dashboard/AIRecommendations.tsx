"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { Lightbulb, ArrowRight, TrendingUp, Video, Mail, Users } from "lucide-react";

export interface AIRecommendationsProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: {
    icon: any;
    text: string;
    impact: string;
  }[];
  labels?: {
    title: string;
    subtitle: string;
    recommendations?: {
      increaseBudget: string;
      optimizeContent: string;
      launchEmailCampaign: string;
      targetAudienceSegments: string;
    };
  };
}

export function AIRecommendations({ 
  recommendations,
  labels,
  className, 
  ...props 
}: AIRecommendationsProps) {
  const t = useTranslations('clientDashboard.aiRecommendations');
  const defaultRecommendations = [
    { icon: TrendingUp, text: t('recommendations.increaseBudget'), impact: t('impact.increaseBudget') },
    { icon: Video, text: t('recommendations.optimizeContent'), impact: t('impact.optimizeContent') },
    { icon: Mail, text: t('recommendations.launchEmailCampaign'), impact: t('impact.launchEmailCampaign') },
    { icon: Users, text: t('recommendations.targetAudienceSegments'), impact: t('impact.targetAudienceSegments') },
  ];
  const recommendationsList = recommendations || defaultRecommendations;
  // Map hardcoded recommendation texts to labels
  const translatedRecommendations = recommendationsList.map(rec => {
    let translatedText = rec.text;
    if (rec.text.includes(t('recommendations.increaseBudget'))) {
      translatedText = labels?.recommendations?.increaseBudget || rec.text;
    } else if (rec.text.includes(t('recommendations.optimizeContent'))) {
      translatedText = labels?.recommendations?.optimizeContent || rec.text;
    } else if (rec.text.includes(t('recommendations.launchEmailCampaign'))) {
      translatedText = labels?.recommendations?.launchEmailCampaign || rec.text;
    } else if (rec.text.includes(t('recommendations.targetAudienceSegments'))) {
      translatedText = labels?.recommendations?.targetAudienceSegments || rec.text;
    }
    return { ...rec, text: translatedText };
  });

  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <AnimatedIcon icon={Lightbulb} size={20} state="idle" magnetic />
      </div>
      <div className="space-y-3">
        {translatedRecommendations.map((rec, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <AnimatedIcon icon={rec.icon} size={18} state="idle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{rec.text}</p>
              <p className="text-xs text-primary font-medium">{rec.impact}</p>
            </div>
            <AnimatedIcon icon={ArrowRight} size={16} state="idle" className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </InteractiveCard>
  );
}

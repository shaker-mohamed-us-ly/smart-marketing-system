import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Clock, Send, MessageSquare, RefreshCw, MessageCircle } from "lucide-react";

export interface PublishingRecommendationsPanelProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: { 
    label: string; 
    value: string;
    icon: any;
  }[];
  labels?: {
    title: string;
  };
}

export function PublishingRecommendationsPanel({ 
  recommendations: recommendationsProp,
  labels,
  className, 
  ...props 
}: PublishingRecommendationsPanelProps) {
  const t = useTranslations('clientRecommendations.publishing');
  const recommendations = recommendationsProp || [
    { 
      label: t('label0'), 
      value: t('value0'),
      icon: Clock,
    },
    { 
      label: t('label1'), 
      value: t('value1'),
      icon: Send,
    },
    { 
      label: t('label2'), 
      value: t('value2'),
      icon: MessageSquare,
    },
    { 
      label: t('label3'), 
      value: t('value3'),
      icon: RefreshCw,
    },
    { 
      label: t('label4'), 
      value: t('value4'),
      icon: MessageCircle,
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
                className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{item.label}</p>
                </div>
                <p className="text-sm font-semibold text-primary">{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

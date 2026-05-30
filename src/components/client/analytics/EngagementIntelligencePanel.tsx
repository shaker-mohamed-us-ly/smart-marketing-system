import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Heart, MessageCircle, Share2, Bookmark, MessageSquare, Phone, MessageCircle as WhatsApp } from "lucide-react";

export interface EngagementIntelligencePanelProps extends HTMLAttributes<HTMLDivElement> {
  metrics?: { 
    name: string; 
    value: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
    engagement: string;
    reach: string;
    interactions: string;
    sentiment: string;
  };
}

export function EngagementIntelligencePanel({ 
  metrics,
  labels,
  className, 
  ...props 
}: EngagementIntelligencePanelProps) {
  const t = useTranslations('clientAnalytics');
  const defaultMetrics = [
    { 
      name: t('engagementIntelligence.metrics.likes'), 
      value: "12.4K", 
      icon: Heart,
    },
    { 
      name: t('engagementIntelligence.metrics.comments'), 
      value: "3.2K", 
      icon: MessageCircle,
    },
    { 
      name: t('engagementIntelligence.metrics.shares'), 
      value: "1.8K", 
      icon: Share2,
    },
    { 
      name: t('engagementIntelligence.metrics.saves'), 
      value: "2.1K", 
      icon: Bookmark,
    },
    { 
      name: t('engagementIntelligence.metrics.messages'), 
      value: "892", 
      icon: MessageSquare,
    },
    { 
      name: t('engagementIntelligence.metrics.whatsappClicks'), 
      value: "654", 
      icon: WhatsApp,
    },
    { 
      name: t('engagementIntelligence.metrics.phoneClicks'), 
      value: "312", 
      icon: Phone,
    },
  ];
  const metricsList = metrics || defaultMetrics;
  const l = labels || {
    title: t('engagementIntelligence.title'),
    engagement: t('engagementIntelligence.engagement'),
    reach: t('engagementIntelligence.reach'),
    interactions: t('engagementIntelligence.interactions'),
    sentiment: t('engagementIntelligence.sentiment'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {t('engagementIntelligence.communicationIncluded')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {metricsList.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

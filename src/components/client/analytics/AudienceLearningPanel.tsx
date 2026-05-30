import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Brain, Lightbulb, TrendingUp, Clock, Heart, Users, MessageCircle } from "lucide-react";

export interface AudienceLearningPanelProps extends HTMLAttributes<HTMLDivElement> {
  insights?: { 
    insight: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
    audience: string;
    demographics: string;
    behavior: string;
    segments: string;
  };
}

export function AudienceLearningPanel({ 
  insights,
  labels,
  className, 
  ...props 
}: AudienceLearningPanelProps) {
  const t = useTranslations('clientAnalytics.audienceLearning');
  const defaultInsights = [
    { 
      insight: t('insightsList.luxuryVisuals'), 
      icon: Heart,
    },
    { 
      insight: t('insightsList.shortVideos'), 
      icon: TrendingUp,
    },
    { 
      insight: t('insightsList.whatsappCTA'), 
      icon: MessageCircle,
    },
    { 
      insight: t('insightsList.eveningPosts'), 
      icon: Clock,
    },
    { 
      insight: t('insightsList.emotionalComfort'), 
      icon: Users,
    },
  ];
  const insightsList = insights || defaultInsights;
  const l = labels || {
    title: t('title'),
    audience: t('audience'),
    demographics: t('demographics'),
    behavior: t('behavior'),
    segments: t('segments'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {insightsList.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-sm font-medium flex-1">{item.insight}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Brain, MessageCircle, Video, Heart, Clock, Sparkles, ArrowRight } from "lucide-react";

export interface SelfLearningSignalsPanelProps extends HTMLAttributes<HTMLDivElement> {
  signals?: { 
    category: string; 
    best: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
    signals: string;
    learning: string;
    patterns: string;
    insights: string;
    description?: string;
    bestCta?: string;
    bestContentType?: string;
    bestEmotion?: string;
    bestTime?: string;
    bestServiceAngle?: string;
    bestProductAngle?: string;
    orderViaWhatsApp?: string;
    reel?: string;
    statusTrust?: string;
    beforeAfter?: string;
    officeLifestyle?: string;
  };
}

export function SelfLearningSignalsPanel({ 
  signals = [
    { 
      category: "bestCta", 
      best: "orderViaWhatsApp", 
      icon: MessageCircle,
    },
    { 
      category: "bestContentType", 
      best: "reel", 
      icon: Video,
    },
    { 
      category: "bestEmotion", 
      best: "statusTrust", 
      icon: Heart,
    },
    { 
      category: "bestTime", 
      best: "8:15 PM", 
      icon: Clock,
    },
    { 
      category: "bestServiceAngle", 
      best: "beforeAfter", 
      icon: Sparkles,
    },
    { 
      category: "bestProductAngle", 
      best: "officeLifestyle", 
      icon: ArrowRight,
    },
  ],
  labels,
  className, 
  ...props 
}: SelfLearningSignalsPanelProps) {
  const t = useTranslations('clientAnalytics.selfLearningSignals');
  const l = labels || {
    title: t('title'),
    signals: t('signals'),
    learning: t('learning'),
    patterns: t('patterns'),
    insights: t('insights'),
    description: t('description'),
    bestCta: t('bestCta'),
    bestContentType: t('bestContentType'),
    bestEmotion: t('bestEmotion'),
    bestTime: t('bestTime'),
    bestServiceAngle: t('bestServiceAngle'),
    bestProductAngle: t('bestProductAngle'),
    orderViaWhatsApp: t('orderViaWhatsApp'),
    reel: t('reel'),
    statusTrust: t('statusTrust'),
    beforeAfter: t('beforeAfter'),
    officeLifestyle: t('officeLifestyle'),
  };

  const getSignalText = (key: string): string => {
    return l[key as keyof typeof l] || key;
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

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {l.description}
          </p>
        </div>

        <div className="space-y-3">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{getSignalText(signal.category)}</p>
                  <p className="text-sm font-semibold">{signal.best === "8:15 PM" ? signal.best : getSignalText(signal.best)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

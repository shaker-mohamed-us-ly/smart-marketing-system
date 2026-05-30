import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Brain, Activity, Target, TrendingUp, Shield, Zap } from "lucide-react";

export interface BrainHealthOverviewProps extends HTMLAttributes<HTMLDivElement> {
  metrics?: { 
    name: string; 
    value: string; 
    icon: any;
    color: string;
  }[];
  labels?: {
    title: string;
    health: string;
    status: string;
    operational: string;
    learning: string;
    optimizing: string;
  };
}

export function BrainHealthOverview({ 
  metrics: metricsProp,
  labels,
  className, 
  ...props 
}: BrainHealthOverviewProps) {
  const t = useTranslations('controlAIBrain.healthOverview');
  const metrics = metricsProp || [
    { 
      name: t('brainHealth'), 
      value: "96%", 
      icon: Brain,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    { 
      name: t('learningStatus'), 
      value: t('valueActive'), 
      icon: Activity,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    { 
      name: t('decisionConfidence'), 
      value: "92%", 
      icon: Target,
      color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
    },
    { 
      name: t('campaignIntelligence'), 
      value: t('valueStrong'), 
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    { 
      name: t('systemStability'), 
      value: t('valueExcellent'), 
      icon: Shield,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    { 
      name: t('providerIntelligence'), 
      value: t('valueHealthy'), 
      icon: Zap,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
  ];
  const l = labels || {
    title: t('title'),
    health: t('health'),
    status: t('status'),
    operational: t('operational'),
    learning: t('learning'),
    optimizing: t('optimizing'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center mb-3 border",
                  metric.color
                )}>
                  <Icon className="h-5 w-5" />
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

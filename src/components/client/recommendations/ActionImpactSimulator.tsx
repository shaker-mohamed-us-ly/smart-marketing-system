import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { TrendingUp, Play } from "lucide-react";

export interface ActionImpactSimulatorProps extends HTMLAttributes<HTMLDivElement> {
  scenarios?: { 
    action: string; 
    impact: string;
  }[];
  labels?: {
    title: string;
  };
}

export function ActionImpactSimulator({ 
  scenarios: scenariosProp,
  labels,
  className, 
  ...props 
}: ActionImpactSimulatorProps) {
  const t = useTranslations('clientRecommendations.actionImpactSimulator');
  const scenarios = scenariosProp || [
    { 
      action: t('action0'), 
      impact: t('impact0'),
    },
    { 
      action: t('action1'), 
      impact: t('impact1'),
    },
    { 
      action: t('action2'), 
      impact: t('impact2'),
    },
    { 
      action: t('action3'), 
      impact: t('impact3'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Play className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <p className="text-sm font-medium mb-2">{scenario.action}</p>
              <div className="flex items-center gap-2 text-emerald-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm font-semibold">{scenario.impact}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

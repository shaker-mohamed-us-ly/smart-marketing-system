import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { GitBranch, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export interface WhatIfSimulatorProps extends HTMLAttributes<HTMLDivElement> {
  scenarios?: { 
    name: string; 
    description: string; 
    savings?: string; 
    qualityImpact?: string; 
    costIncrease?: string; 
    qualityIncrease?: string; 
    costControlled?: boolean;
  }[];
  labels?: {
    title: string;
    simulator: string;
    scenarios: string;
    simulation: string;
    prediction: string;
  };
}

export function WhatIfSimulator({ 
  scenarios: scenariosProp,
  labels,
  className, 
  ...props 
}: WhatIfSimulatorProps) {
  const t = useTranslations('controlIntegrations.whatIfSimulator');
  const scenarios = scenariosProp || [
    { 
      name: t('scenarioA.name'), 
      description: t('scenarioA.description'), 
      savings: t('scenarioA.savings'), 
      qualityImpact: t('scenarioA.qualityImpact'), 
    },
    { 
      name: t('scenarioB.name'), 
      description: t('scenarioB.description'), 
      qualityIncrease: t('scenarioB.qualityIncrease'), 
      costIncrease: t('scenarioB.costIncrease'), 
    },
    { 
      name: t('scenarioC.name'), 
      description: t('scenarioC.description'), 
      qualityIncrease: t('scenarioC.qualityIncrease'), 
      costControlled: true,
    },
  ];
  const l = labels || {
    title: t('title'),
    simulator: t('simulator'),
    scenarios: t('scenarios'),
    simulation: t('simulation'),
    prediction: t('prediction'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">{scenario.name}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
              <div className="flex flex-wrap gap-2">
                {scenario.savings && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingDown className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">{scenario.savings}</span>
                  </div>
                )}
                {scenario.qualityImpact && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <TrendingUp className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-600">{scenario.qualityImpact}</span>
                  </div>
                )}
                {scenario.qualityIncrease && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">{scenario.qualityIncrease}</span>
                  </div>
                )}
                {scenario.costIncrease && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <DollarSign className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-600">{scenario.costIncrease}</span>
                  </div>
                )}
                {scenario.costControlled && (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <DollarSign className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-600">{t('costControlled')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

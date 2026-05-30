"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";
import { BrainCircuit, Activity, Zap } from "lucide-react";

export interface AIBrainActivityProps extends HTMLAttributes<HTMLDivElement> {
  status?: "excellent" | "good" | "warning";
  healthScore?: number;
  labels?: {
    title: string;
    subtitle: string;
    status: {
      excellent: string;
      good: string;
      warning: string;
    };
    allSystemsOperational: string;
    healthScore: string;
    processing: string;
    learning: string;
    optimizing: string;
  };
}

export function AIBrainActivity({ 
  status = "excellent", 
  healthScore = 98,
  labels,
  className, 
  ...props 
}: AIBrainActivityProps) {
  const t = useTranslations('clientDashboard.aiBrainActivity');
  const statusColors = {
    excellent: "text-emerald-600 bg-emerald-500/10",
    good: "text-blue-600 bg-blue-500/10",
    warning: "text-amber-600 bg-amber-500/10",
  };

  const statusText = labels?.status || {
    excellent: "Excellent",
    good: "Good",
    warning: "Warning",
  };

  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <AnimatedIcon icon={BrainCircuit} size={20} state="idle" magnetic />
      </div>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <AIThinkingIndicator state="thinking" size="lg" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[status])}>
              {statusText[status]}
            </span>
            <span className="text-xs text-muted-foreground">{labels?.allSystemsOperational || t('allSystemsOperational')}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-semibold">{healthScore}%</span>
            <span className="text-sm text-muted-foreground">{labels?.healthScore || t('healthScore')}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
          <AnimatedIcon icon={Activity} size={18} state="idle" />
          <span className="text-xs font-medium">{labels?.processing || t('processing')}</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
          <AnimatedIcon icon={Zap} size={18} state="idle" />
          <span className="text-xs font-medium">{labels?.learning || t('learning')}</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
          <AnimatedIcon icon={BrainCircuit} size={18} state="idle" />
          <span className="text-xs font-medium">{labels?.optimizing || t('optimizing')}</span>
        </div>
      </div>
    </InteractiveCard>
  );
}

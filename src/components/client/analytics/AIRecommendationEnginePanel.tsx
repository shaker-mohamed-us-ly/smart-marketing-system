import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Sparkles, TrendingUp, AlertCircle, ArrowRight } from "lucide-react";

export interface AIRecommendationEnginePanelProps extends HTMLAttributes<HTMLDivElement> {
  recommendations?: { 
    recommendation: string; 
    impact: string; 
    reason: string; 
    priority: "High" | "Medium" | "Low";
  }[];
  labels?: {
    title: string;
    recommendations: string;
    ai: string;
    optimization: string;
    impact: string;
    priorities?: {
      high: string;
      medium: string;
      low: string;
    };
  };
}

export function AIRecommendationEnginePanel({ 
  recommendations: recommendationsProp,
  labels,
  className, 
  ...props 
}: AIRecommendationEnginePanelProps) {
  const t = useTranslations('clientAnalytics.aiRecommendationEngine');
  const recommendations = recommendationsProp || [
    { 
      recommendation: t('recommendation0'), 
      impact: "+18%", 
      reason: t('reason0'), 
      priority: "High",
    },
    { 
      recommendation: t('recommendation1'), 
      impact: "+12%", 
      reason: t('reason1'), 
      priority: "High",
    },
    { 
      recommendation: t('recommendation2'), 
      impact: "+32%", 
      reason: t('reason2'), 
      priority: "High",
    },
    { 
      recommendation: t('recommendation3'), 
      impact: "+8%", 
      reason: t('reason3'), 
      priority: "Medium",
    },
    { 
      recommendation: t('recommendation4'), 
      impact: "+15%", 
      reason: t('reason4'), 
      priority: "Medium",
    },
    { 
      recommendation: t('recommendation5'), 
      impact: "+22%", 
      reason: t('reason5'), 
      priority: "Medium",
    },
  ];
  const l = labels || {
    title: t('title'),
    recommendations: t('recommendations'),
    ai: t('ai'),
    optimization: t('optimization'),
    impact: t('impact'),
    priorities: {
      high: t('priorities.high'),
      medium: t('priorities.medium'),
      low: t('priorities.low'),
    },
  };

  const getPriorityLabel = (priority: string) => {
    return l.priorities?.[priority.toLowerCase() as keyof typeof l.priorities] || priority;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      case "Medium":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "Low":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-semibold flex-1">{rec.recommendation}</p>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">{rec.impact}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{rec.reason}</span>
                </div>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium border",
                  getPriorityColor(rec.priority)
                )}>
                  {getPriorityLabel(rec.priority)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

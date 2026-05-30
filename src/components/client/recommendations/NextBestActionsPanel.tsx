import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { TrendingUp, ArrowRight, User } from "lucide-react";

export interface NextBestActionsPanelProps extends HTMLAttributes<HTMLDivElement> {
  actions?: { 
    action: string; 
    priority: "Critical" | "High" | "Medium" | "Low";
    impact: string;
    reason: string;
    director: string;
  }[];
  labels?: {
    title: string;
    recommendations: string;
    priorities?: {
      critical: string;
      high: string;
      medium: string;
      low: string;
    };
  };
}

export function NextBestActionsPanel({ 
  actions: actionsProp,
  labels,
  className, 
  ...props 
}: NextBestActionsPanelProps) {
  const t = useTranslations('clientRecommendations.nextBestActionsPanel');
  const actions = actionsProp || [
    { 
      action: t('action0'), 
      priority: "Critical",
      impact: "+18%",
      reason: t('reason0'),
      director: t('director0'),
    },
    { 
      action: t('action1'), 
      priority: "Critical",
      impact: "+32%",
      reason: t('reason1'),
      director: t('director1'),
    },
    { 
      action: t('action2'), 
      priority: "High",
      impact: "+12%",
      reason: t('reason2'),
      director: t('director2'),
    },
    { 
      action: t('action3'), 
      priority: "High",
      impact: "+15%",
      reason: t('reason3'),
      director: t('director3'),
    },
    { 
      action: t('action4'), 
      priority: "Medium",
      impact: "+8%",
      reason: t('reason4'),
      director: t('director4'),
    },
  ];
  const l = labels || {
    title: t('title'),
    recommendations: t('recommendations'),
    priorities: {
      critical: t('priorities.critical'),
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
      case "Critical":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      case "High":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "Medium":
        return "text-blue-600 bg-blue-500/10 border-blue-500/20";
      case "Low":
        return "text-muted-foreground bg-secondary/30 border-border/40";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>

        <div className="space-y-4">
          {actions.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-xs font-medium border",
                      getPriorityColor(item.priority)
                    )}>
                      {getPriorityLabel(item.priority)}
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-semibold">{item.impact}</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium mb-1">{item.action}</p>
                  <p className="text-xs text-muted-foreground">{item.reason}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4">
                  <User className="h-3 w-3" />
                  <span>{item.director}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

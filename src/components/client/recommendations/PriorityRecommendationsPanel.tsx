import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { AlertTriangle, TrendingUp, AlertCircle, Info } from "lucide-react";

export interface PriorityRecommendationsPanelProps extends HTMLAttributes<HTMLDivElement> {
  priorities?: { 
    level: "Critical" | "High" | "Medium" | "Low";
    count: number;
    examples: string[];
    urgency: string;
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

export function PriorityRecommendationsPanel({ 
  priorities: prioritiesProp,
  labels,
  className, 
  ...props 
}: PriorityRecommendationsPanelProps) {
  const t = useTranslations('clientRecommendations.priorityRecommendationsPanel');
  const priorities = prioritiesProp || [
    { 
      level: "Critical",
      count: 3,
      examples: [t('examples0_0'), t('examples0_1'), t('examples0_2')],
      urgency: t('urgency0'),
    },
    { 
      level: "High",
      count: 5,
      examples: [t('examples1_0'), t('examples1_1'), t('examples1_2')],
      urgency: t('urgency1'),
    },
    { 
      level: "Medium",
      count: 8,
      examples: [t('examples2_0'), t('examples2_1'), t('examples2_2')],
      urgency: t('urgency2'),
    },
    { 
      level: "Low",
      count: 4,
      examples: [t('examples3_0'), t('examples3_1'), t('examples3_2')],
      urgency: t('urgency3'),
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

  const getPriorityLabel = (level: string) => {
    return l.priorities?.[level.toLowerCase() as keyof typeof l.priorities] || level;
  };
  const getPriorityColor = (level: string) => {
    switch (level) {
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

  const getPriorityIcon = (level: string) => {
    switch (level) {
      case "Critical":
        return <AlertTriangle className="h-5 w-5" />;
      case "High":
        return <TrendingUp className="h-5 w-5" />;
      case "Medium":
        return <AlertCircle className="h-5 w-5" />;
      case "Low":
        return <Info className="h-5 w-5" />;
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>

        <div className="space-y-4">
          {priorities.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center border",
                    getPriorityColor(item.level)
                  )}>
                    {getPriorityIcon(item.level)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-xs font-medium border",
                        getPriorityColor(item.level)
                      )}>
                        {getPriorityLabel(item.level)}
                      </span>
                      <span className="text-sm font-semibold">{item.count} {labels?.recommendations || t('recommendations')}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.urgency}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.examples.map((example, exIndex) => (
                  <span
                    key={exIndex}
                    className="px-2 py-1 rounded-md bg-background text-xs text-muted-foreground"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

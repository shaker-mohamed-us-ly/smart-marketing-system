import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { TrendingUp, Target, Users, Zap, BarChart3 } from "lucide-react";

export interface PerformanceCommandOverviewProps extends HTMLAttributes<HTMLDivElement> {
  metrics?: { 
    name: string; 
    value: string; 
    icon: any;
    color: string;
  }[];
  labels?: {
    title: string;
    overview: string;
    metrics: string;
    trends: string;
    campaignPerformanceScore?: string;
    conversionReadiness?: string;
    audienceLearning?: string;
    brandIdentityGrowth?: string;
    monthlyGrowthMomentum?: string;
  };
}

export function PerformanceCommandOverview({ 
  metrics = [
    { 
      name: "campaignPerformanceScore", 
      value: "91%", 
      icon: BarChart3,
      color: "text-primary bg-primary/10 border-primary/20",
    },
    { 
      name: "conversionReadiness", 
      value: "87%", 
      icon: Target,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
    { 
      name: "audienceLearning", 
      value: "94%", 
      icon: Users,
      color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
    },
    { 
      name: "brandIdentityGrowth", 
      value: "+18%", 
      icon: Zap,
      color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
    },
    { 
      name: "monthlyGrowthMomentum", 
      value: "+24%", 
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
    },
  ],
  labels,
  className, 
  ...props 
}: PerformanceCommandOverviewProps) {
  const t = useTranslations('clientAnalytics.performanceOverview');
  const l = labels || {
    title: t('title'),
    overview: t('overview'),
    metrics: t('metrics'),
    trends: t('trends'),
    campaignPerformanceScore: t('campaignPerformanceScore'),
    conversionReadiness: t('conversionReadiness'),
    audienceLearning: t('audienceLearning'),
    brandIdentityGrowth: t('brandIdentityGrowth'),
    monthlyGrowthMomentum: t('monthlyGrowthMomentum'),
  };

  const getMetricName = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{getMetricName(metric.name)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Dna, TrendingUp, CheckCircle, Target, Users, Calendar } from "lucide-react";

export interface BrandDNAEvolutionPanelProps extends HTMLAttributes<HTMLDivElement> {
  dnaConfidence?: number;
  metrics?: { 
    name: string; 
    value: string; 
    icon: any;
  }[];
  timeline?: { event: string; date: string }[];
  labels?: {
    title: string;
    brandDNA: string;
    evolution: string;
    consistency: string;
    impact: string;
    dnaConfidence: string;
    evolutionMetrics: string;
    dnaTimeline: string;
    visualLanguageImprovement?: string;
    toneConsistency?: string;
    toneConsistencyValue?: string;
    productReadiness?: string;
    audienceFit?: string;
    brandIdentityInitialization?: string;
    visualLanguageRefinement?: string;
    tonePatternDiscovery?: string;
    audienceFitOptimization?: string;
    week?: string;
  };
}

export function BrandDNAEvolutionPanel({ 
  dnaConfidence = 94,
  timeline = [
    { event: "brandIdentityInitialization", date: "week 1" },
    { event: "visualLanguageRefinement", date: "week 3" },
    { event: "tonePatternDiscovery", date: "week 5" },
    { event: "audienceFitOptimization", date: "week 7" },
  ],
  labels,
  className, 
  ...props 
}: BrandDNAEvolutionPanelProps) {
  const t = useTranslations('clientAnalytics.brandDNATimeline');
  const l = labels || {
    title: t('title'),
    brandDNA: t('brandDNA'),
    evolution: t('evolution'),
    consistency: t('consistency'),
    impact: t('impact'),
    dnaConfidence: t('dnaConfidence'),
    evolutionMetrics: t('evolutionMetrics'),
    dnaTimeline: t('dnaTimeline'),
    visualLanguageImprovement: t('visualLanguageImprovement'),
    toneConsistency: t('toneConsistency'),
    toneConsistencyValue: t('toneConsistencyValue') || "ممتاز",
    productReadiness: t('productReadiness'),
    audienceFit: t('audienceFit'),
    brandIdentityInitialization: t('brandIdentityInitialization'),
    visualLanguageRefinement: t('visualLanguageRefinement'),
    tonePatternDiscovery: t('tonePatternDiscovery'),
    audienceFitOptimization: t('audienceFitOptimization'),
    week: t('week'),
  };

  const metrics = [
    { 
      name: "visualLanguageImprovement", 
      value: "+16%", 
      icon: TrendingUp,
    },
    { 
      name: "toneConsistency", 
      value: labels?.toneConsistencyValue || l.toneConsistencyValue || "ممتاز", 
      icon: CheckCircle,
    },
    { 
      name: "productReadiness", 
      value: "82%", 
      icon: Target,
    },
    { 
      name: "audienceFit", 
      value: "89%", 
      icon: Users,
    },
  ];

  const getMetricName = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  const getTimelineText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Dna className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{l.dnaConfidence}</p>
            <p className="text-3xl font-bold text-primary">{dnaConfidence}%</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{l.evolutionMetrics}</p>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{getMetricName(metric.name)}</p>
                    <p className="text-sm font-semibold">{metric.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">{l.dnaTimeline}</p>
          <div className="space-y-2">
            {timeline.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{getTimelineText(item.event)}</p>
                  <p className="text-xs text-muted-foreground">{item.date.replace("week ", l.week + " ")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

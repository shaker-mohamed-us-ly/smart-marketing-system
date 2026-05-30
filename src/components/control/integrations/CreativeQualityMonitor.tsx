import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Eye, Type, Award, Shield, Video, Layers } from "lucide-react";

export interface CreativeQualityMonitorProps extends HTMLAttributes<HTMLDivElement> {
  metrics?: { 
    name: string; 
    score: number; 
    insight: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
    quality: string;
    consistency: string;
    brand: string;
    standards: string;
  };
}

export function CreativeQualityMonitor({ 
  metrics: metricsProp,
  labels,
  className, 
  ...props 
}: CreativeQualityMonitorProps) {
  const t = useTranslations('controlIntegrations.creativeQualityMonitor');
  const metrics = metricsProp || [
    { 
      name: t('metrics.visualQuality'), 
      score: 89, 
      insight: t('metrics.strongComposition'),
      icon: Eye,
    },
    { 
      name: t('metrics.printQuality'), 
      score: 85, 
      insight: t('metrics.goodTextRendering'),
      icon: Type,
    },
    { 
      name: t('metrics.commercialQuality'), 
      score: 92, 
      insight: t('metrics.premiumOutput'),
      icon: Award,
    },
    { 
      name: t('metrics.brandConsistency'), 
      score: 87, 
      insight: t('metrics.stableAcrossProviders'),
      icon: Shield,
    },
    { 
      name: t('metrics.videoRealism'), 
      score: 84, 
      insight: t('metrics.runwayLeads'),
      icon: Video,
    },
    { 
      name: t('metrics.outputConsistency'), 
      score: 86, 
      insight: t('metrics.reliablePatterns'),
      icon: Layers,
    },
  ];
  const l = labels || {
    title: t('title'),
    quality: t('quality'),
    consistency: t('consistency'),
    brand: t('brand'),
    standards: t('standards'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{metric.name}</p>
                    <span className="text-sm font-semibold">{metric.score}%</span>
                  </div>
                  <div className="h-2 bg-secondary/50 rounded-full overflow-hidden mb-2">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        metric.score >= 90 ? "bg-emerald-500" : metric.score >= 80 ? "bg-primary/60" : "bg-amber-500"
                      )}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.insight}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

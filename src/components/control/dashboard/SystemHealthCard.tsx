import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Activity, Clock, Zap, Server } from "lucide-react";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";

export interface SystemHealthCardLabels {
  title: string;
  subtitle: string;
  healthy: string;
  excellent: string;
  good: string;
  warning: string;
  uptime: string;
  queue: string;
  latency: string;
}

export interface SystemHealthCardProps extends HTMLAttributes<HTMLDivElement> {
  overallHealth?: number;
  status?: "excellent" | "good" | "warning";
  uptime?: string;
  queue?: string;
  apiLatency?: string;
  labels?: SystemHealthCardLabels;
}

export function SystemHealthCard({ 
  overallHealth = 98, 
  status = "excellent", 
  uptime = "99.9%", 
  queue = "Stable", 
  apiLatency = "124ms",
  labels,
  className, 
  ...props 
}: SystemHealthCardProps) {
  const t = useTranslations('controlDashboard.systemHealth');
  const statusColors = {
    excellent: "text-emerald-600 bg-emerald-500/10",
    good: "text-blue-600 bg-blue-500/10",
    warning: "text-amber-600 bg-amber-500/10",
  };

  const statusText = {
    excellent: labels?.excellent || t('excellent'),
    good: labels?.good || t('good'),
    warning: labels?.warning || t('warning'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
          <div className="relative h-14 w-14">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <AIThinkingIndicator state="thinking" size="md" />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[status])}>
                {statusText[status]}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold">{overallHealth}%</span>
              <span className="text-sm text-muted-foreground">{labels?.healthy || t('healthy')}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
            <Activity className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{uptime}</span>
            <span className="text-xs text-muted-foreground">{labels?.uptime || t('uptime')}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
            <Server className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{queue}</span>
            <span className="text-xs text-muted-foreground">{labels?.queue || t('queue')}</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-xs font-medium">{apiLatency}</span>
            <span className="text-xs text-muted-foreground">{labels?.latency || t('latency')}</span>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

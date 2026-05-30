import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Calendar, Clock, TrendingUp } from "lucide-react";

export interface SchedulePlannerPanelProps extends HTMLAttributes<HTMLDivElement> {
  schedules?: { 
    platform: string; 
    time: string; 
    reason: string;
  }[];
  timeframes?: string[];
  labels?: {
    title: string;
    bestPublishingTime: string;
    timeframe: string;
    visualSchedulingOnly: string;
  };
}

export function SchedulePlannerPanel({ 
  schedules: schedulesProp,
  timeframes: timeframesProp,
  labels,
  className, 
  ...props 
}: SchedulePlannerPanelProps) {
  const t = useTranslations('clientPublishing.schedulePlanner');
  const schedules = schedulesProp || [
    { 
      platform: t('schedule0Platform'), 
      time: t('schedule0Time'), 
      reason: t('schedule0Reason'),
    },
    { 
      platform: t('schedule1Platform'), 
      time: t('schedule1Time'), 
      reason: t('schedule1Reason'),
    },
    { 
      platform: t('schedule2Platform'), 
      time: t('schedule2Time'), 
      reason: t('schedule2Reason'),
    },
  ];
  const timeframes = timeframesProp || [t('timeframe0'), t('timeframe1'), t('timeframe2')];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium mb-3">{labels?.bestPublishingTime || t('bestPublishingTime')}</p>
          <div className="space-y-3">
            {schedules.map((schedule, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{schedule.platform}</p>
                    <p className="text-sm font-medium text-primary">{schedule.time}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{schedule.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">{labels?.timeframe || t('timeframe')}</p>
          <div className="flex gap-2">
            {timeframes.map((timeframe, index) => (
              <div
                key={index}
                className={cn(
                  "px-4 py-2 rounded-lg border cursor-pointer transition-all",
                  index === 0
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/40 bg-secondary/20 hover:bg-secondary/30"
                )}
              >
                <span className={cn(
                  "text-sm font-medium",
                  index === 0 && "text-primary"
                )}>
                  {timeframe}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {labels?.visualSchedulingOnly || t('visualSchedulingOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

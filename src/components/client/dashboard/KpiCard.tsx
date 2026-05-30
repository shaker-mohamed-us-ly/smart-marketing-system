"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import * as Icons from "lucide-react";

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: keyof typeof Icons;
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  sparkline?: number[];
}

export const KpiCard = forwardRef<HTMLDivElement, KpiCardProps>(
  ({ icon: iconName, label, value, trend, trendUp = true, sparkline = [10, 15, 12, 18, 14, 20, 16], className, ...props }, ref) => {
    const Icon = (Icons as any)[iconName] as LucideIcon;
    const maxSparkline = Math.max(...sparkline);
    const minSparkline = Math.min(...sparkline);
    const range = maxSparkline - minSparkline || 1;

    return (
      <InteractiveCard ref={ref} depth="subtle" lightSweep className={cn("p-5", className)} {...props}>
        <div className="flex items-start justify-between mb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <AnimatedIcon icon={Icon} size={20} state="idle" magnetic />
          </div>
          <span className={cn(
            "text-xs font-medium flex items-center gap-1",
            trendUp ? "text-emerald-600" : "text-rose-600"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        </div>
        <div className="mb-2">
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <div className="h-8 flex items-end gap-0.5">
          {sparkline.map((value, index) => {
            const height = ((value - minSparkline) / range) * 100;
            return (
              <div
                key={index}
                className="flex-1 bg-primary/20 rounded-sm transition-all duration-300 hover:bg-primary/40"
                style={{ height: `${Math.max(height, 10)}%` }}
              />
            );
          })}
        </div>
      </InteractiveCard>
    );
  }
);

KpiCard.displayName = "KpiCard";

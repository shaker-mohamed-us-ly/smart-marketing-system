import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MagneticHover } from "@/components/shared/cards/MagneticHover";
import * as Icons from "lucide-react";

export interface AdminMetricCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: keyof typeof Icons;
  label: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  sparkline?: number[];
}

export function AdminMetricCard({ 
  icon: iconName, 
  label, 
  value, 
  trend, 
  trendUp = true, 
  sparkline = [10, 15, 12, 18, 14, 20, 16], 
  className, 
  ...props 
}: AdminMetricCardProps) {
  const Icon = (Icons as any)[iconName] as LucideIcon;
  const maxSparkline = Math.max(...sparkline);
  const minSparkline = Math.min(...sparkline);
  const range = maxSparkline - minSparkline || 1;

  return (
    <StaticCard depth="subtle" className={cn("p-5", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <MagneticHover strength={0.3}>
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          </MagneticHover>
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
        </div>
        <div className="mb-2">
          <p className="text-2xl font-semibold">{value}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-xs font-medium flex items-center gap-1",
            trendUp ? "text-emerald-600" : "text-rose-600"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        </div>
      </div>
    </StaticCard>
  );
}

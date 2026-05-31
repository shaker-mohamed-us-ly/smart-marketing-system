import { cn } from "@/lib/utils/cn";
import { PremiumMetricCard } from "./PremiumMetricCard";
import { LucideIcon } from "lucide-react";

export interface MetricItem {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  description: string;
  tone: "orange" | "emerald" | "blue" | "violet";
}

export interface PremiumScoreboardStripProps {
  metrics: MetricItem[];
  vsLastMonthLabel: string;
  className?: string;
}

/**
 * PremiumScoreboardStrip - 4 metric cards in one strong strip
 * 
 * Features:
 * - Full-width grid layout
 * - Wider, more premium cards
 * - Semantic color per metric
 * - Consistent spacing
 */
export function PremiumScoreboardStrip({
  metrics,
  vsLastMonthLabel,
  className,
}: PremiumScoreboardStripProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {metrics.map((metric, index) => (
        <PremiumMetricCard
          key={index}
          icon={metric.icon}
          title={metric.title}
          value={metric.value}
          trend={metric.trend}
          trendUp={metric.trendUp}
          description={metric.description}
          tone={metric.tone}
          vsLastMonth={vsLastMonthLabel}
          surface="neutral"
        />
      ))}
    </div>
  );
}

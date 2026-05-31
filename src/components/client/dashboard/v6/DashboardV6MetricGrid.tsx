/**
 * Dashboard V6.3 Metric Grid
 *
 * 4 larger metric cards with:
 * - Luxury graphite dark mode
 * - 48px icon tile
 * - Value very visible
 * - Title and supporting text clean
 * - Semantic color bar
 * - Signal rail with gradient
 * - Optional trend chip
 *
 * Semantic colors:
 * - campaign = orange
 * - brand health = emerald
 * - content = blue
 * - AI = violet
 */

import { V6IconFrame } from "./DashboardV6Icon";
import styles from "./DashboardV6Motion.module.css";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

export interface V6Metric {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  tone: "orange" | "emerald" | "blue" | "violet";
}

export interface DashboardV6MetricGridProps {
  metrics: V6Metric[];
  className?: string;
}

const toneColors = {
  orange: "#F97316",
  emerald: "#10B981",
  blue: "#3B82F6",
  violet: "#8B5CF6",
};

const toneBackgrounds = {
  orange: "bg-orange-50 dark:bg-[#181C23]",
  emerald: "bg-emerald-50 dark:bg-[#181C23]",
  blue: "bg-blue-50 dark:bg-[#181C23]",
  violet: "bg-violet-50 dark:bg-[#181C23]",
};

const toneBorders = {
  orange: "border-orange-200 dark:border-white/[0.085]",
  emerald: "border-emerald-200 dark:border-white/[0.085]",
  blue: "border-blue-200 dark:border-white/[0.085]",
  violet: "border-violet-200 dark:border-white/[0.085]",
};

function getSignalGradient(tone: keyof typeof toneColors): string {
  const gradients = {
    orange: `linear-gradient(90deg, rgba(249,115,22,0.4) 0%, #F97316 100%)`,
    emerald: `linear-gradient(90deg, rgba(16,185,129,0.4) 0%, #10B981 100%)`,
    blue: `linear-gradient(90deg, rgba(59,130,246,0.4) 0%, #3B82F6 100%)`,
    violet: `linear-gradient(90deg, rgba(139,92,246,0.4) 0%, #8B5CF6 100%)`,
  };
  return gradients[tone];
}

export function DashboardV6MetricGrid({
  metrics,
  className,
}: DashboardV6MetricGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={cn(
            // Larger card
            "rounded-[22px] border p-4 lg:p-5",
            // Semantic tone
            toneBackgrounds[metric.tone],
            toneBorders[metric.tone],
            // Motion
            styles.v6MetricEnter,
            // Hover
            "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
          )}
          style={{
            animationDelay: `${index * 60}ms`,
          }}
        >
          {/* Icon Tile */}
          <div className="mb-3">
            <V6IconFrame iconKey="target" size="metric" tone={metric.tone} />
          </div>

          {/* Value */}
          <p className="text-2xl font-bold text-gray-900 dark:text-[#F4F6F8] mb-2">
            {metric.value}
          </p>

          {/* Title */}
          <p className="text-xs font-semibold text-gray-700 dark:text-[#C3CBD6] mb-2">
            {metric.title}
          </p>

          {/* Trend */}
          {metric.trend && (
            <div className="flex items-center gap-2 mb-3">
              <span
                className={cn(
                  "text-xs font-semibold",
                  metric.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"
                )}
              >
                {metric.trend}
              </span>
            </div>
          )}

          {/* Description */}
          {metric.description && (
            <p className="text-[11px] text-gray-500 dark:text-[#9AA3B2] mb-3">
              {metric.description}
            </p>
          )}

          {/* Signal Rail */}
          <div className="h-[5px] w-full rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
            <div
              className={cn("h-full rounded-full", styles.v6SignalReveal)}
              style={{
                width: metric.trendUp ? "75%" : "45%",
                background: getSignalGradient(metric.tone),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

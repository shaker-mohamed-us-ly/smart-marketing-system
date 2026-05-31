/**
 * Dashboard V7.2 Signal Strip
 * 
 * 4 metrics in connected strip with:
 * - Compact standard sizing
 * - Semantic rails
 * - Values readable
 * - Cards visually linked
 * - Not huge
 * - Not disconnected
 * - Metric icons routed through DashboardV7Icon
 * - Signal rail reveal animation
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { DashboardV7Icon } from "./DashboardV7Icon";
import { v7ToneMap, V7Tone, v7Typography, v7Layout, v7Motion } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV7Motion.module.css";

export interface V7SignalMetric {
  iconKey: string;
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  tone: V7Tone;
}

export interface DashboardV7SignalStripProps {
  metrics: V7SignalMetric[];
  className?: string;
}

function getSignalGradient(tone: V7Tone): string {
  const gradients = {
    emerald: "linear-gradient(90deg, rgba(16,185,129,0.4) 0%, #10B981 100%)",
    violet: "linear-gradient(90deg, rgba(139,92,246,0.4) 0%, #8B5CF6 100%)",
    amber: "linear-gradient(90deg, rgba(245,158,11,0.4) 0%, #F59E0B 100%)",
    orange: "linear-gradient(90deg, rgba(249,115,22,0.4) 0%, #F97316 100%)",
    blue: "linear-gradient(90deg, rgba(59,130,246,0.4) 0%, #3B82F6 100%)",
    slate: "linear-gradient(90deg, rgba(148,163,184,0.4) 0%, #94A3B8 100%)",
  };
  return gradients[tone];
}

export function DashboardV7SignalStrip({
  metrics,
  className,
}: DashboardV7SignalStripProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4",
        className
      )}
    >
      {metrics.map((metric, index) => {
        const toneConfig = v7ToneMap[metric.tone];
        
        return (
          <div
            key={index}
            className={cn(
              // Compact card
              "rounded-[22px] border p-4 lg:p-5",
              // Semantic tone
              "bg-white dark:bg-[#181D26]",
              "border-gray-200 dark:border-white/[0.085]",
              // Motion
              styles.v7SignalCardReveal,
              // Hover
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            )}
            style={{
              height: `${v7Layout.signalStrip.cardHeight}px`,
              animationDelay: `${index * v7Motion.stagger.normal}ms`,
              backgroundColor: toneConfig.bgDark,
              borderColor: toneConfig.borderDark,
            }}
          >
            {/* Icon Tile */}
            <div className="mb-3">
              <DashboardV7Icon 
                iconKey={metric.iconKey as any} 
                size="metric" 
                tone={metric.tone} 
                ariaHidden 
              />
            </div>

            {/* Value */}
            <p 
              className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-2"
              style={{
                fontSize: v7Typography.desktop.metricValue.fontSize,
                fontWeight: v7Typography.desktop.metricValue.fontWeight,
                lineHeight: v7Typography.desktop.metricValue.lineHeight,
              }}
            >
              {metric.value}
            </p>

            {/* Title */}
            <p 
              className="font-semibold text-gray-700 dark:text-[#C3CBD6] mb-2"
              style={{
                fontSize: v7Typography.desktop.cardTitle.fontSize,
                fontWeight: v7Typography.desktop.cardTitle.fontWeight,
                lineHeight: v7Typography.desktop.cardTitle.lineHeight,
              }}
            >
              {metric.title}
            </p>

            {/* Trend */}
            {metric.trend && (
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    "font-semibold",
                    metric.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"
                  )}
                  style={{
                    fontSize: v7Typography.desktop.chip.fontSize,
                    fontWeight: v7Typography.desktop.chip.fontWeight,
                  }}
                >
                  {metric.trend}
                </span>
              </div>
            )}

            {/* Description */}
            {metric.description && (
              <p 
                className="text-gray-500 dark:text-[#9AA3B2] mb-3"
                style={{
                  fontSize: v7Typography.desktop.caption.fontSize,
                  fontWeight: v7Typography.desktop.caption.fontWeight,
                  lineHeight: v7Typography.desktop.caption.lineHeight,
                }}
              >
                {metric.description}
              </p>
            )}

            {/* Signal Rail */}
            <div className="h-[5px] w-full rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
              <div
                className={cn("h-full rounded-full", styles.v7SignalRailReveal)}
                style={{
                  width: metric.trendUp ? "75%" : "45%",
                  background: getSignalGradient(metric.tone),
                  animationDelay: `${index * v7Motion.stagger.normal + 100}ms`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

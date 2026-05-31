/**
 * Dashboard V6.3 Command Hero
 *
 * Strong hero panel with:
 * - Large glass panel
 * - Arabic-first alignment
 * - AI badge
 * - System health chip
 * - Strong title
 * - Subtitle
 * - Primary CTA (liquid sweep)
 * - Secondary CTA (aurora border)
 * - Live status indicators
 * - Mini visual block (3 status pills)
 * - Luxury graphite dark mode
 */

import { V6IconFrame } from "./DashboardV6Icon";
import styles from "./DashboardV6Motion.module.css";
import { cn } from "@/lib/utils/cn";

export interface DashboardV6CommandHeroProps {
  aiBadgeLabel: string;
  systemHealthyLabel: string;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

export function DashboardV6CommandHero({
  aiBadgeLabel,
  systemHealthyLabel,
  title,
  subtitle,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: DashboardV6CommandHeroProps) {
  return (
    <div
      className={cn(
        // Large glass panel
        "rounded-[28px] border p-5 lg:p-6",
        // Light mode
        "bg-white border-gray-200",
        // Dark mode - luxury graphite
        "dark:bg-[#12151B] dark:border-white/[0.085]",
        styles.v6HeroEnter,
        className
      )}
    >
      {/* Top row: AI badge + System health */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
          <V6IconFrame iconKey="aiBadge" size="button" tone="violet" />
          <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
            {aiBadgeLabel}
          </span>
        </div>

        {/* System Health Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 styles.v6ConnectedBreathe" />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {systemHealthyLabel}
          </span>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 className="text-3xl lg:text-[36px] font-bold text-gray-900 dark:text-[#F4F6F8] mb-3 leading-tight">
          {title}
        </h1>
        <p className="text-base text-gray-600 dark:text-[#C3CBD6] leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* Primary CTA - Liquid Sweep */}
        <div className={cn("relative v6-liquid-sweep-trigger", styles.v6LiquidSweepTrigger)}>
          <button
            className={cn(
              "relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white",
              "transition-all duration-200 hover:-translate-y-0.5",
              styles.v6ButtonPress,
              "shadow-md hover:shadow-lg"
            )}
            style={{
              backgroundColor: "#3B82F6",
              height: "48px",
            }}
          >
            <V6IconFrame iconKey="quickAction" size="button" tone="violet" />
            <span>{primaryActionLabel}</span>
            <div className="v6-liquid-sweep" />
          </button>
        </div>

        {/* Secondary CTA - Aurora Border */}
        <div className={cn("relative v6-aurora-border-trigger", styles.v6AuroraBorderTrigger)}>
          <button
            className={cn(
              "relative inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold",
              "transition-all duration-200 hover:-translate-y-0.5",
              styles.v6ButtonPress,
              "shadow-md hover:shadow-lg"
            )}
            style={{
              backgroundColor: "white",
              color: "#374151",
              border: "1px solid #E4E7EC",
              height: "48px",
            }}
          >
            <V6IconFrame iconKey="analytics" size="button" tone="blue" />
            <span>{secondaryActionLabel}</span>
            <div className="v6-aurora-border" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Dashboard V7.2 Hero Command Header
 * 
 * Compact strong hero with:
 * - Title/subtitle visible
 * - AI badge
 * - System health chip
 * - Primary Liquid Sweep Button
 * - Secondary Aurora Border Button
 * - Small live status capsule
 * - No huge empty area
 * - Hero reveal animation
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { DashboardV7Icon } from "./DashboardV7Icon";
import { DashboardV7Button } from "./DashboardV7Button";
import { v7Typography, v7Layout } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV7Motion.module.css";

export interface DashboardV7HeroProps {
  aiBadgeLabel: string;
  systemHealthyLabel: string;
  title: string;
  subtitle: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  className?: string;
}

export function DashboardV7Hero({
  aiBadgeLabel,
  systemHealthyLabel,
  title,
  subtitle,
  primaryActionLabel,
  secondaryActionLabel,
  className,
}: DashboardV7HeroProps) {
  return (
    <div
      className={cn(
        // Large glass panel
        "rounded-[28px] border p-6 lg:p-7",
        // Light mode
        "bg-white border-gray-200",
        // Dark mode - luxury graphite
        "dark:bg-[#12161E] dark:border-white/[0.085]",
        styles.v7HeroReveal,
        className
      )}
      style={{
        minHeight: `${v7Layout.hero.minHeight}px`,
      }}
    >
      {/* Top row: AI badge + System health */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* AI Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20">
          <DashboardV7Icon iconKey="aiBadge" size="button" tone="violet" ariaHidden />
          <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
            {aiBadgeLabel}
          </span>
        </div>

        {/* System Health Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-500 styles.v7-status-breathe" />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {systemHealthyLabel}
          </span>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-6">
        <h1 
          className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-3 leading-tight"
          style={{
            fontSize: v7Typography.desktop.heroTitle.fontSize,
            fontWeight: v7Typography.desktop.heroTitle.fontWeight,
            lineHeight: v7Typography.desktop.heroTitle.lineHeight,
          }}
        >
          {title}
        </h1>
        <p 
          className="text-gray-600 dark:text-[#C3CBD6] leading-relaxed"
          style={{
            fontSize: v7Typography.desktop.heroSubtitle.fontSize,
            lineHeight: v7Typography.desktop.heroSubtitle.lineHeight,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Primary CTA - Liquid Sweep */}
        <DashboardV7Button variant="primary">
          {primaryActionLabel}
        </DashboardV7Button>

        {/* Secondary CTA - Aurora Border */}
        <DashboardV7Button variant="secondary">
          {secondaryActionLabel}
        </DashboardV7Button>
      </div>
    </div>
  );
}

/**
 * Dashboard V6.2 Icon System
 * 
 * Source: Untitled UI Icons - Line icon style, square frames, consistent sizing
 * 
 * Icon Sizes:
 * - Hero: 48px
 * - Metrics: 48px
 * - Operations rows: 48px
 * - Channels: 48px
 * - Buttons: 16px
 * 
 * Rules:
 * - Icons come from premium-dashboard-icons.ts
 * - No direct random imports in page.tsx
 * - No double arrows
 * - No text arrow "→"
 * - Icon animation: hover/focus translate 1px, active scale 0.96
 * - Reduced motion: color only
 * - Stronger contrast in dark mode
 * 
 * RSC Safety:
 * - Server Component (receives icon component)
 * - Client Components receive iconKey strings only
 */

import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { dashboardIcons } from "../premium/premium-dashboard-icons";
import styles from "./DashboardV6Motion.module.css";

export type V6IconKey = keyof typeof dashboardIcons;

export interface V6IconFrameProps {
  iconKey: V6IconKey;
  size?: "hero" | "metric" | "ops" | "channel" | "button";
  tone?: "violet" | "blue" | "emerald" | "amber" | "orange" | "slate";
  className?: string;
}

const sizeClasses = {
  hero: "h-12 w-12", // 48px
  metric: "h-12 w-12", // 48px
  ops: "h-12 w-12", // 48px
  channel: "h-12 w-12", // 48px
  button: "h-4 w-4", // 16px
};

const iconSizes = {
  hero: "w-6 h-6", // 24px
  metric: "w-6 h-6", // 24px
  ops: "w-6 h-6", // 24px
  channel: "w-6 h-6", // 24px
  button: "w-4 h-4", // 16px
};

const toneColors = {
  violet: "#8B5CF6",
  blue: "#3B82F6",
  emerald: "#10B981",
  amber: "#F59E0B",
  orange: "#F97316",
  slate: "#94A3B8",
};

const toneBackgrounds = {
  violet: "bg-violet-50 dark:bg-violet-500/10",
  blue: "bg-blue-50 dark:bg-blue-500/10",
  emerald: "bg-emerald-50 dark:bg-emerald-500/10",
  amber: "bg-amber-50 dark:bg-amber-500/10",
  orange: "bg-orange-50 dark:bg-orange-500/10",
  slate: "bg-slate-50 dark:bg-slate-500/10",
};

const toneBorders = {
  violet: "border-violet-200 dark:border-violet-500/20",
  blue: "border-blue-200 dark:border-blue-500/20",
  emerald: "border-emerald-200 dark:border-emerald-500/20",
  amber: "border-amber-200 dark:border-amber-500/20",
  orange: "border-orange-200 dark:border-orange-500/20",
  slate: "border-slate-200 dark:border-slate-500/20",
};

export function V6IconFrame({
  iconKey,
  size = "metric",
  tone = "slate",
  className,
}: V6IconFrameProps) {
  const Icon = dashboardIcons[iconKey];
  const iconColor = toneColors[tone] || toneColors.slate;
  const sizeClass = sizeClasses[size];
  const iconSize = iconSizes[size];
  const bgClass = toneBackgrounds[tone] || toneBackgrounds.slate;
  const borderClass = toneBorders[tone] || toneBorders.slate;

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl border",
        sizeClass,
        bgClass,
        borderClass,
        styles.v6IconFrame,
        styles.v6IconTap,
        className
      )}
      style={{
        color: iconColor,
      }}
    >
      {Icon && <Icon className={iconSize} />}
    </div>
  );
}

// Client-safe icon resolver for buttons
export function getV6Icon(iconKey: V6IconKey): LucideIcon {
  return dashboardIcons[iconKey];
}

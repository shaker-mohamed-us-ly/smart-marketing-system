/**
 * Dashboard V7.2 Icon Component
 * 
 * Unified icon system inspired by Untitled UI Icons
 * 
 * Responsibilities:
 * - One line-icon family (lucide-react)
 * - Consistent stroke weight
 * - Consistent square icon frames
 * - No mixed icon styles
 * - Client Components receive iconKey strings only
 * - Every interactive icon has hover/focus/tap micro-motion
 * - Icon-only controls have aria-label
 * - Decorative icons use aria-hidden
 * 
 * Sources:
 * - Untitled UI Icons
 * - WCAG Contrast Guidelines
 */

import { dashboardIcons, DashboardIconKey } from "../premium/premium-dashboard-icons";
import { v7IconSizes, V7IconSize } from "./DashboardV7Tokens";
import { v7ToneMap, V7Tone } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV7Motion.module.css";

export interface DashboardV7IconProps {
  iconKey: DashboardIconKey;
  size?: V7IconSize;
  tone?: V7Tone;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export function DashboardV7Icon({
  iconKey,
  size = "metric",
  tone = "slate",
  className,
  ariaLabel,
  ariaHidden = false,
}: DashboardV7IconProps) {
  const IconComponent = dashboardIcons[iconKey];
  const sizeConfig = v7IconSizes[size];
  const toneConfig = v7ToneMap[tone];

  if (!IconComponent) {
    console.warn(`Icon key "${iconKey}" not found in dashboardIcons`);
    return null;
  }

  return (
    <div
      className={cn(
        // Square icon frame
        "inline-flex items-center justify-center",
        "rounded-xl",
        // Tone-based background
        "bg-slate-50 dark:bg-slate-800/50",
        // Border
        "border border-slate-200 dark:border-white/10",
        // Icon micro-motion
        styles.v7IconMicro,
        className
      )}
      style={{
        width: `${sizeConfig.frame}px`,
        height: `${sizeConfig.frame}px`,
        backgroundColor: tone === "slate" 
          ? undefined 
          : toneConfig.bgDark,
        borderColor: tone === "slate"
          ? undefined
          : toneConfig.borderDark,
      }}
      aria-label={ariaLabel}
      aria-hidden={ariaHidden}
    >
      <IconComponent
        className={cn(
          "text-slate-600 dark:text-slate-300"
        )}
        style={{
          width: `${sizeConfig.icon}px`,
          height: `${sizeConfig.icon}px`,
          color: tone === "slate"
            ? undefined
            : toneConfig.textDark,
        }}
        strokeWidth={1.75}
      />
    </div>
  );
}

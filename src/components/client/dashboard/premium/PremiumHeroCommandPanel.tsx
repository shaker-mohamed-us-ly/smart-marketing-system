import { cn } from "@/lib/utils/cn";
import { PremiumAppIconFrame } from "./PremiumAppIconFrame";
import { PremiumButton } from "./PremiumButton";
import { dashboardIcons } from "./premium-dashboard-icons";
import { premiumColors } from "@/lib/design/premium-dashboard-tokens";
import styles from "./PremiumMotion.module.css";

export interface PremiumHeroCommandPanelProps {
  aiBadgeLabel: string;
  systemHealthyLabel: string;
  title: string;
  quickActionLabel: string;
  viewAnalyticsLabel: string;
  className?: string;
}

/**
 * PremiumHeroCommandPanel - Full-width hero with command center feel
 * 
 * Features:
 * - AI badge with icon
 * - System health chip with pulse
 * - Large title
 * - Two CTA buttons with motion
 * - Glass dark surface in dark mode
 * - Soft white/glass surface in light mode
 */
export function PremiumHeroCommandPanel({
  aiBadgeLabel,
  systemHealthyLabel,
  title,
  quickActionLabel,
  viewAnalyticsLabel,
  className,
}: PremiumHeroCommandPanelProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] p-6 lg:p-8",
        "transition-all duration-300",
        // Light mode: soft white with subtle gradient
        "bg-white",
        "border border-slate-200/60",
        // Dark mode: glass dark surface
        "dark:bg-[#0B0F19]",
        "dark:border-white/8",
        className
      )}
      style={{
        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Top row: AI badge + System health chip */}
      <div className="flex items-center gap-3 mb-5">
        {/* AI Badge */}
        <div className="flex items-center gap-2">
          <PremiumAppIconFrame icon={dashboardIcons.aiBadge} tone="violet" size="sm" />
          <span
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              backgroundColor: `${premiumColors.violet}12`,
              color: premiumColors.violet,
            }}
          >
            {aiBadgeLabel}
          </span>
        </div>

        {/* System Health Chip */}
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2"
            style={{
              backgroundColor: `${premiumColors.emerald}12`,
              color: premiumColors.emerald,
            }}
          >
            <span className="relative flex items-center justify-center">
              <span
                className="absolute inset-0 rounded-full motion-status-breathe"
                style={{
                  backgroundColor: premiumColors.emerald,
                }}
              />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            {systemHealthyLabel}
          </span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight tracking-tight mb-6">
        {title}
      </h1>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative motion-liquid-sweep-trigger">
          <PremiumButton variant="liquidPressFinal" className="motion-button-press">
            <dashboardIcons.quickAction className="w-4 h-4" />
            {quickActionLabel}
          </PremiumButton>
        </div>
        <div className="relative motion-aurora-border-trigger">
          <PremiumButton variant="auroraBorderPressFinal" style="secondary" className="motion-button-press">
            <dashboardIcons.analytics className="w-4 h-4" />
            {viewAnalyticsLabel}
          </PremiumButton>
        </div>
      </div>
    </div>
  );
}

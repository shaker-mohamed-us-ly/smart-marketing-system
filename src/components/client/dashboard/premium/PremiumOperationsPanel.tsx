import { cn } from "@/lib/utils/cn";
import { PremiumAppIconFrame, IconTone } from "./PremiumAppIconFrame";
import { PremiumMiniButton, MiniButtonTone } from "./PremiumMiniButton";
import { dashboardIcons, DashboardIconKey } from "./premium-dashboard-icons";
import { LucideIcon } from "lucide-react";
import styles from "./PremiumMotion.module.css";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "pending" | "alert" | "ai" | "neutral";
  icon?: LucideIcon;
  unread?: boolean;
}

export interface PremiumOperationsPanelProps {
  activities: ActivityItem[];
  viewAllLabel: string;
  className?: string;
}

/**
 * PremiumOperationsPanel - Large activity/event stream as main dashboard module
 * 
 * Features:
 * - Larger panel with strong visual hierarchy
 * - Horizontal rows with 42px icon frames
 * - Time chips with clock icon
 * - Unread dots
 * - Semantic tints
 * - No external timeline dots
 */
export function PremiumOperationsPanel({
  activities,
  viewAllLabel,
  className,
}: PremiumOperationsPanelProps) {
  const getStatusIcon = (status: ActivityItem["status"], customIcon?: LucideIcon): LucideIcon => {
    if (customIcon) return customIcon;
    switch (status) {
      case "completed":
        return dashboardIcons.statusConnected;
      case "pending":
        return dashboardIcons.statusOffline;
      case "alert":
        return dashboardIcons.statusWarning;
      case "ai":
        return dashboardIcons.aiActivity;
      case "neutral":
        return dashboardIcons.statusOffline;
    }
  };

  const getStatusTone = (status: ActivityItem["status"]): IconTone => {
    switch (status) {
      case "completed":
        return "emerald";
      case "pending":
        return "gray";
      case "alert":
        return "amber";
      case "ai":
        return "violet";
      case "neutral":
        return "gray";
    }
  };

  const getStatusColor = (status: ActivityItem["status"]): string => {
    switch (status) {
      case "completed":
        return "#10B981";
      case "pending":
        return "#6B7280";
      case "alert":
        return "#F59E0B";
      case "ai":
        return "#7C3AED";
      case "neutral":
        return "#6B7280";
    }
  };

  const getBackgroundTint = (status: ActivityItem["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-emerald-50/50 dark:bg-emerald-500/5";
      case "pending":
        return "bg-slate-50/50 dark:bg-slate-500/5";
      case "alert":
        return "bg-amber-50/50 dark:bg-amber-500/5";
      case "ai":
        return "bg-violet-50/50 dark:bg-violet-500/5";
      case "neutral":
        return "bg-slate-50/50 dark:bg-slate-500/5";
    }
  };

  return (
    <div
      className={cn(
        "relative rounded-[20px] p-5",
        "bg-white dark:bg-[#0B0F19]",
        "border border-slate-200/60 dark:border-white/8",
        className
      )}
      style={{
        boxShadow: "0 4px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      {/* Activity rows */}
      <div className="space-y-3">
        {activities.map((activity, index) => {
          const Icon = getStatusIcon(activity.status, activity.icon);
          const tone = getStatusTone(activity.status);
          const statusColor = getStatusColor(activity.status);
          const backgroundTint = getBackgroundTint(activity.status);
          const isLatest = index === 0;
          const isUnread = activity.unread !== false && isLatest;

          return (
            <div
              key={activity.id}
              className={cn(
                "relative flex items-center gap-4 p-4 rounded-[16px]",
                "transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-sm",
                backgroundTint,
                "motion-card-enter"
              )}
              style={{
                animationDelay: `${index * 40}ms`,
              }}
            >
              {/* Icon frame - 42px */}
              <div className="flex-shrink-0">
                <PremiumAppIconFrame
                  icon={Icon}
                  tone={tone}
                  size="lg"
                  className="motion-icon-frame-glow motion-icon-tap-pop"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                      {activity.title}
                    </h4>
                    {/* Unread indicator */}
                    {isUnread && (
                      <span className="relative flex items-center justify-center flex-shrink-0">
                        <span
                          className="absolute inset-0 rounded-full motion-unread-pulse"
                          style={{
                            backgroundColor: statusColor,
                          }}
                        />
                        <span
                          className="relative w-2 h-2 rounded-full"
                          style={{ backgroundColor: statusColor }}
                        />
                      </span>
                    )}
                  </div>
                  {/* Time chip */}
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-400 flex-shrink-0">
                    <span className="w-3 h-3 flex items-center justify-center">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </span>
                    {activity.time}
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-300 line-clamp-1">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View all button */}
      <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/5">
        <PremiumMiniButton
          tone="violet"
          iconKey="viewAll"
          iconPosition="end"
          className="motion-button-press"
        >
          {viewAllLabel}
        </PremiumMiniButton>
      </div>
    </div>
  );
}

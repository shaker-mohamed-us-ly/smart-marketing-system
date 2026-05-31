/**
 * Dashboard V6.3 Operations Board
 *
 * Main dashboard module with:
 * - Luxury graphite dark mode
 * - Large dominant panel
 * - Header with icon and title
 * - Mini summary strip (today activity, pending approvals, AI updates, channel health)
 * - Event stream rows
 * - 48px icon tile per row
 * - Title one line
 * - Description one line with ellipsis
 * - Time chip with clock icon
 * - Unread dot/status
 * - Action icon based on RTL
 * - Dark glass row in dark mode
 */

import { V6IconFrame } from "./DashboardV6Icon";
import styles from "./DashboardV6Motion.module.css";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { Clock } from "lucide-react";

export interface V6Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "pending" | "alert" | "ai" | "neutral";
  icon: LucideIcon;
  unread?: boolean;
}

export interface DashboardV6OperationsBoardProps {
  activities: V6Activity[];
  title: string;
  viewAllLabel: string;
  todayActivityLabel: string;
  pendingApprovalsLabel: string;
  aiUpdatesLabel: string;
  channelHealthLabel: string;
  channelHealthValue: string;
  todayActivityCount: string;
  pendingApprovalsCount: string;
  aiUpdatesCount: string;
  className?: string;
}

const statusColors = {
  completed: "bg-emerald-500",
  pending: "bg-amber-500",
  alert: "bg-orange-500",
  ai: "bg-violet-500",
  neutral: "bg-slate-400",
};

const rowTints = {
  completed: "bg-emerald-50/50 dark:bg-emerald-500/5",
  pending: "bg-amber-50/50 dark:bg-amber-500/5",
  alert: "bg-orange-50/50 dark:bg-orange-500/5",
  ai: "bg-violet-50/50 dark:bg-violet-500/5",
  neutral: "bg-transparent",
};

export function DashboardV6OperationsBoard({
  activities,
  title,
  viewAllLabel,
  todayActivityLabel,
  pendingApprovalsLabel,
  aiUpdatesLabel,
  channelHealthLabel,
  channelHealthValue,
  todayActivityCount,
  pendingApprovalsCount,
  aiUpdatesCount,
  className,
}: DashboardV6OperationsBoardProps) {
  return (
    <div
      className={cn(
        // Large dominant panel
        "rounded-[28px] border p-5 lg:p-6",
        // Light mode
        "bg-white border-gray-200",
        // Dark mode - luxury graphite
        "dark:bg-[#12151B] dark:border-white/[0.085]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <V6IconFrame iconKey="activity" size="metric" tone="blue" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-[#F4F6F8]">
            {title}
          </h2>
        </div>
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
          {viewAllLabel}
        </button>
      </div>

      {/* Mini Summary Strip */}
      <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-white/[0.085]">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-[#9AA3B2]">{todayActivityLabel}:</span>
          <span className="text-xs font-semibold text-gray-900 dark:text-[#F4F6F8]">{todayActivityCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-[#9AA3B2]">{pendingApprovalsLabel}:</span>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{pendingApprovalsCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-[#9AA3B2]">{aiUpdatesLabel}:</span>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">{aiUpdatesCount}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500 dark:text-[#9AA3B2]">{channelHealthLabel}:</span>
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{channelHealthValue}</span>
        </div>
      </div>

      {/* Event Stream Rows */}
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={cn(
              // Horizontal row
              "flex items-start gap-4 p-4 rounded-xl border",
              // Semantic tint
              rowTints[activity.status],
              // Border
              "border-gray-100 dark:border-white/5",
              // Motion
              styles.v6OpsRowEnter,
              // Hover/tap
              "transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/5"
            )}
            style={{
              animationDelay: `${index * 40}ms`,
            }}
          >
            {/* 48px Icon Tile */}
            <div className="flex-shrink-0">
              <V6IconFrame iconKey="campaignActivity" size="ops" tone="slate" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <p className="text-xs font-semibold text-gray-900 dark:text-[#F4F6F8] mb-1 line-clamp-1">
                {activity.title}
              </p>
              {/* Description */}
              <p className="text-[11px] text-gray-600 dark:text-[#C3CBD6] line-clamp-1">
                {activity.description}
              </p>
            </div>

            {/* Time Chip */}
            <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-[#202630] border border-slate-200 dark:border-white/[0.085]">
              <Clock className="w-2.5 h-2.5 text-slate-400" />
              <span className="text-[11px] text-slate-500 dark:text-[#9AA3B2]">
                {activity.time}
              </span>
            </div>

            {/* Status/Unread */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {activity.unread && (
                <div className="relative">
                  <div className={cn("w-2 h-2 rounded-full", statusColors[activity.status])} />
                  <div className={cn("absolute inset-0 w-2 h-2 rounded-full", statusColors[activity.status], styles.v6UnreadPulse)} />
                </div>
              )}
              {/* Action icon based on RTL would go here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Dashboard V7.2 Command Board
 * 
 * Main dashboard module with:
 * - Luxury graphite dark mode
 * - Large dominant panel
 * - Header with icon and title
 * - Mini summary strip
 * - Event stream rows
 * - Icon tiles per row
 * - Title one line
 * - Description one line with ellipsis
 * - Time chip with clock icon
 * - Unread dot/status
 * - Dark glass row in dark mode
 * - Command row reveal animation
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { DashboardV7Icon } from "./DashboardV7Icon";
import { v7Typography, v7Layout, v7Motion } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import { Clock } from "lucide-react";
import styles from "./DashboardV7Motion.module.css";

export type V7ActivityStatus = "completed" | "pending" | "alert" | "ai" | "neutral";

export interface V7Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  status: V7ActivityStatus;
  iconKey: string;
  unread?: boolean;
}

export interface DashboardV7CommandBoardProps {
  activities: V7Activity[];
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

export function DashboardV7CommandBoard({
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
}: DashboardV7CommandBoardProps) {
  return (
    <div
      className={cn(
        // Large dominant panel
        "rounded-[28px] border p-5 lg:p-6",
        // Light mode
        "bg-white border-gray-200",
        // Dark mode - luxury graphite
        "dark:bg-[#12161E] dark:border-white/[0.085]",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <DashboardV7Icon iconKey="activity" size="metric" tone="blue" ariaHidden />
          <h2 
            className="font-bold text-gray-900 dark:text-[#F4F6F8]"
            style={{
              fontSize: v7Typography.desktop.sectionTitle.fontSize,
              fontWeight: v7Typography.desktop.sectionTitle.fontWeight,
              lineHeight: v7Typography.desktop.sectionTitle.lineHeight,
            }}
          >
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
          <span 
            className="text-gray-500 dark:text-[#9AA3B2]"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {todayActivityLabel}:
          </span>
          <span 
            className="font-semibold text-gray-900 dark:text-[#F4F6F8]"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {todayActivityCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-gray-500 dark:text-[#9AA3B2]"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {pendingApprovalsLabel}:
          </span>
          <span 
            className="font-semibold text-amber-600 dark:text-amber-400"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {pendingApprovalsCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-gray-500 dark:text-[#9AA3B2]"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {aiUpdatesLabel}:
          </span>
          <span 
            className="font-semibold text-violet-600 dark:text-violet-400"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {aiUpdatesCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span 
            className="text-gray-500 dark:text-[#9AA3B2]"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {channelHealthLabel}:
          </span>
          <span 
            className="font-semibold text-emerald-600 dark:text-emerald-400"
            style={{
              fontSize: v7Typography.desktop.chip.fontSize,
              fontWeight: v7Typography.desktop.chip.fontWeight,
            }}
          >
            {channelHealthValue}
          </span>
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
              styles.v7CommandRowReveal,
              // Hover/tap
              "transition-all duration-200 hover:bg-gray-50 dark:hover:bg-white/5"
            )}
            style={{
              animationDelay: `${index * v7Motion.stagger.fast}ms`,
            }}
          >
            {/* Icon Tile */}
            <div className="flex-shrink-0">
              <DashboardV7Icon 
                iconKey={activity.iconKey as any} 
                size="ops" 
                tone="slate" 
                ariaHidden 
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Title */}
              <p 
                className="font-semibold text-gray-900 dark:text-[#F4F6F8] mb-1 line-clamp-1"
                style={{
                  fontSize: v7Typography.desktop.cardTitle.fontSize,
                  fontWeight: v7Typography.desktop.cardTitle.fontWeight,
                  lineHeight: v7Typography.desktop.cardTitle.lineHeight,
                }}
              >
                {activity.title}
              </p>
              {/* Description */}
              <p 
                className="text-gray-600 dark:text-[#C3CBD6] line-clamp-1"
                style={{
                  fontSize: v7Typography.desktop.caption.fontSize,
                  fontWeight: v7Typography.desktop.caption.fontWeight,
                  lineHeight: v7Typography.desktop.caption.lineHeight,
                }}
              >
                {activity.description}
              </p>
            </div>

            {/* Time Chip */}
            <div className="flex-shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-50 dark:bg-[#202630] border border-slate-200 dark:border-white/[0.085]">
              <Clock className="w-2.5 h-2.5 text-slate-400" />
              <span 
                className="text-slate-500 dark:text-[#9AA3B2]"
                style={{
                  fontSize: v7Typography.desktop.caption.fontSize,
                  fontWeight: v7Typography.desktop.caption.fontWeight,
                }}
              >
                {activity.time}
              </span>
            </div>

            {/* Status/Unread */}
            <div className="flex-shrink-0 flex items-center gap-2">
              {activity.unread && (
                <div className="relative">
                  <div className={cn("w-2 h-2 rounded-full", statusColors[activity.status])} />
                  <div className={cn("absolute inset-0 w-2 h-2 rounded-full", statusColors[activity.status], styles.v7StatusBreathe)} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

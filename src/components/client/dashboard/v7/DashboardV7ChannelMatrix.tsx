/**
 * Dashboard V7.2 Channel Matrix
 * 
 * Strong module with:
 * - 3 channels + add/connect card
 * - 48px icon tile per card
 * - Channel name
 * - Translated status label
 * - Animated status dot
 * - Signal rail
 * - Small action affordance
 * - Dark mode card backgrounds
 * - Connected = emerald
 * - Offline = slate
 * - Syncing = amber
 * - No oversized logos
 * - No white backgrounds in dark mode
 * - Channel card reveal animation
 * - Status breathe only for live/connected states
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { DashboardV7Icon } from "./DashboardV7Icon";
import { v7Typography, v7Layout, v7Motion } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV7Motion.module.css";

export type V7ChannelStatus = "connected" | "offline" | "syncing";

export interface V7Channel {
  id: string;
  name: string;
  iconKey: string;
  status: V7ChannelStatus;
  statusLabel: string;
}

export interface DashboardV7ChannelMatrixProps {
  channels: V7Channel[];
  title: string;
  addChannelLabel: string;
  manageLabel: string;
  className?: string;
}

const statusColors = {
  connected: "bg-emerald-500",
  offline: "bg-slate-400",
  syncing: "bg-amber-500",
};

const statusAnimations = {
  connected: styles.v7StatusBreathe,
  offline: "",
  syncing: styles.v7StatusBreathe,
};

const signalGradients = {
  connected: "linear-gradient(90deg, rgba(16,185,129,0.4) 0%, #10B981 100%)",
  offline: "linear-gradient(90deg, rgba(148,163,184,0.4) 0%, #94A3B8 100%)",
  syncing: "linear-gradient(90deg, rgba(245,158,11,0.4) 0%, #F59E0B 100%)",
};

const cardBackgrounds = {
  connected: "bg-emerald-50/50 dark:bg-[#181D26]",
  offline: "bg-slate-50/50 dark:bg-[#181D26]",
  syncing: "bg-amber-50/50 dark:bg-[#181D26]",
};

const cardBorders = {
  connected: "border-emerald-100 dark:border-white/[0.085]",
  offline: "border-slate-100 dark:border-white/[0.085]",
  syncing: "border-amber-100 dark:border-white/[0.085]",
};

export function DashboardV7ChannelMatrix({
  channels,
  title,
  addChannelLabel,
  manageLabel,
  className,
}: DashboardV7ChannelMatrixProps) {
  return (
    <div
      className={cn(
        // Strong module
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
          <DashboardV7Icon iconKey="channels" size="metric" tone="emerald" ariaHidden />
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
          {addChannelLabel}
        </button>
      </div>

      {/* Channel Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((channel, index) => (
          <div
            key={channel.id}
            className={cn(
              // Channel card
              "rounded-2xl border p-5",
              // Status-based styling
              cardBackgrounds[channel.status],
              cardBorders[channel.status],
              // Motion
              styles.v7ChannelCardReveal,
              // Hover/tap
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            )}
            style={{
              height: `${v7Layout.channelMatrix.cardHeight}px`,
              animationDelay: `${index * v7Motion.stagger.normal}ms`,
            }}
          >
            {/* Icon Tile */}
            <div className="mb-3">
              <DashboardV7Icon 
                iconKey={channel.iconKey as any} 
                size="channel" 
                tone="slate" 
                ariaHidden 
              />
            </div>

            {/* Channel Name */}
            <h3 
              className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-2"
              style={{
                fontSize: v7Typography.desktop.cardTitle.fontSize,
                fontWeight: v7Typography.desktop.cardTitle.fontWeight,
                lineHeight: v7Typography.desktop.cardTitle.lineHeight,
              }}
            >
              {channel.name}
            </h3>

            {/* Status Label with Dot */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative">
                <div className={cn("w-2 h-2 rounded-full", statusColors[channel.status])} />
                {statusAnimations[channel.status] && (
                  <div className={cn("absolute inset-0 w-2 h-2 rounded-full", statusColors[channel.status], statusAnimations[channel.status])} />
                )}
              </div>
              <span 
                className="font-medium text-gray-600 dark:text-[#C3CBD6]"
                style={{
                  fontSize: v7Typography.desktop.caption.fontSize,
                  fontWeight: v7Typography.desktop.caption.fontWeight,
                  lineHeight: v7Typography.desktop.caption.lineHeight,
                }}
              >
                {channel.statusLabel}
              </span>
            </div>

            {/* Signal Rail */}
            <div className="h-[3px] w-full rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: channel.status === "connected" ? "100%" : channel.status === "syncing" ? "60%" : "0%",
                  background: signalGradients[channel.status],
                }}
              />
            </div>

            {/* Action Affordance */}
            <button 
              className="mt-4 w-full py-2 rounded-lg font-medium text-gray-600 dark:text-slate-300 bg-slate-50 dark:bg-[#0B0F19] border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              style={{
                fontSize: v7Typography.desktop.chip.fontSize,
                fontWeight: v7Typography.desktop.chip.fontWeight,
              }}
            >
              {manageLabel}
            </button>
          </div>
        ))}

        {/* Add/Connect Card */}
        <div
          className={cn(
            "rounded-2xl border border-dashed p-5 flex flex-col items-center justify-center min-h-[180px]",
            "bg-slate-50 dark:bg-[#101624] border-slate-200 dark:border-white/10",
            "transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-500/30 hover:bg-slate-100 dark:hover:bg-white/5 cursor-pointer"
          )}
          style={{
            height: `${v7Layout.channelMatrix.cardHeight}px`,
          }}
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-[#141B2B] flex items-center justify-center mb-3">
            <DashboardV7Icon iconKey="openAction" size="metric" tone="slate" ariaHidden />
          </div>
          <span 
            className="font-medium text-gray-600 dark:text-slate-300"
            style={{
              fontSize: v7Typography.desktop.body.fontSize,
              fontWeight: v7Typography.desktop.body.fontWeight,
              lineHeight: v7Typography.desktop.body.lineHeight,
            }}
          >
            {addChannelLabel}
          </span>
        </div>
      </div>
    </div>
  );
}

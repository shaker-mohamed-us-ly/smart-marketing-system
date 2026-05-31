import { cn } from "@/lib/utils/cn";
import { PremiumAppIconFrame, IconTone } from "./PremiumAppIconFrame";
import { PremiumConnectionStatus } from "./PremiumConnectionStatus";
import { dashboardIcons, DashboardIconKey } from "./premium-dashboard-icons";
import styles from "./PremiumMotion.module.css";

export interface ChannelItem {
  id: string;
  name: string;
  iconKey: DashboardIconKey;
  tone: IconTone;
  status: "connected" | "offline" | "syncing";
  stateLabel?: string;
}

export interface PremiumChannelsCommandDockProps {
  channels: ChannelItem[];
  className?: string;
}

/**
 * PremiumChannelsCommandDock - Strong connected channels module
 * 
 * Features:
 * - Visually strong module with section title
 * - 3 or 4 channel cards
 * - 44px icon frames
 * - Connection status with signal rail
 * - State label or percentage
 * - Dark mode cards
 * - Light mode cards neutral
 * - Status breathe animation
 * - Signal rail subtle reveal
 */
export function PremiumChannelsCommandDock({
  channels,
  className,
}: PremiumChannelsCommandDockProps) {
  const getStatusRailColor = (status: ChannelItem["status"]): string => {
    switch (status) {
      case "connected":
        return "#10B981"; // emerald
      case "syncing":
        return "#F59E0B"; // amber
      case "offline":
        return "#6B7280"; // gray
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
      {/* Channel cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className={cn(
              "relative flex items-center justify-between p-4 rounded-[16px]",
              "bg-slate-50/50 dark:bg-[#101624]",
              "border border-slate-100 dark:border-white/5",
              "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm",
              "group motion-card-enter"
            )}
            style={{
              boxShadow: "0 2px 12px rgba(15, 23, 42, 0.03)",
            }}
          >
            {/* Signal Rail - left border indicating connection state */}
            <div
              className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-[16px]"
              style={{
                backgroundColor: getStatusRailColor(channel.status),
                opacity: channel.status === "offline" ? "0.3" : "0.8",
              }}
            />

            {/* Channel Info */}
            <div className="flex items-center gap-3 pl-3 flex-1 min-w-0">
              {/* 44px icon frame */}
              <PremiumAppIconFrame
                icon={dashboardIcons[channel.iconKey]}
                tone={channel.tone}
                size="lg"
                className="motion-icon-frame-glow motion-icon-tap-pop"
              />
              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-gray-900 dark:text-white block truncate">
                  {channel.name}
                </span>
                {channel.stateLabel && (
                  <span className="text-xs text-gray-500 dark:text-slate-400 block">
                    {channel.stateLabel}
                  </span>
                )}
              </div>
            </div>

            {/* Connection Status */}
            <div className="flex-shrink-0 ml-2">
              <PremiumConnectionStatus status={channel.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

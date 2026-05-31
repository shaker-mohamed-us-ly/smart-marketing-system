/**
 * Dashboard V8 Operations Connection Strip — compact horizontal platform nodes
 *
 * Horizontal strip under Operations Command Center showing connected platforms with:
 * - Connection/network icon (not generic share icon)
 * - Status summary (online count, offline count, pending count)
 * - Compact horizontal platform connection nodes with online/offline/pending/syncing states
 * - Signal/readiness indicators
 * - Action affordances (Manage/Connect/Review/Sync)
 * - Add Channel CTA
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8PlatformGlyph, V8PlatformKey } from "./DashboardV8PlatformGlyph";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export type V8ConnectionState = "online" | "offline" | "pending" | "syncing";

export interface DashboardV8Channel {
  id: string;
  platformKey: V8PlatformKey;
  name: string;
  state: V8ConnectionState;
  tone: V8Tone;
  signalLevel: number; // 0-100 for signal line
  actionLabel: string;
}

export interface DashboardV8ChannelDockProps {
  title: string;
  addChannelLabel: string;
  onlineCount: number;
  offlineCount: number;
  pendingCount: number;
  onlineLabel: string;
  offlineLabel: string;
  pendingStatusLabel: string;
  syncingLabel: string;
  channels: DashboardV8Channel[];
}

export function DashboardV8ChannelDock({
  title,
  addChannelLabel,
  onlineCount,
  offlineCount,
  pendingCount,
  onlineLabel,
  offlineLabel,
  pendingStatusLabel,
  syncingLabel,
  channels,
}: DashboardV8ChannelDockProps) {
  return (
    <section className={cn(styles.connectionStrip, styles.reveal, styles.r4)}>
      <div className={styles.connectionStripHeader}>
        <div className={styles.connectionStripTitle}>
          <DashboardV8Icon iconKey="channels" size="panel" tone="sky" />
          <span>{title}</span>
        </div>
        <div className={styles.connectionStripStatus}>
          <div className={styles.connectionStripStatusItem} data-tone="emerald">
            <DashboardV8Icon iconKey="online" size="chip" tone="emerald" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />
            <span>{onlineCount}</span>
          </div>
          <div className={styles.connectionStripStatusItem} data-tone="slate">
            <DashboardV8Icon iconKey="offlineState" size="chip" tone="slate" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />
            <span>{offlineCount}</span>
          </div>
          <div className={styles.connectionStripStatusItem} data-tone="amber">
            <DashboardV8Icon iconKey="pending" size="chip" tone="amber" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />
            <span>{pendingCount}</span>
          </div>
        </div>
      </div>

      <div className={styles.connectionStripGrid}>
        {channels.map((channel) => (
          <button
            key={channel.id}
            data-state={channel.state}
            data-tone={channel.tone}
            className={cn(styles.connectionNode, styles.iconHoverHost)}
            aria-label={`${channel.name} - ${channel.state} - ${channel.actionLabel}`}
          >
            <div className={styles.connectionNodeIcon} data-tone={channel.tone}>
              <DashboardV8PlatformGlyph
                platformKey={channel.platformKey}
                tone={channel.tone}
              />
            </div>
            <div className={styles.connectionNodeMeta}>
              <span className={styles.connectionNodeName}>{channel.name}</span>
              <div className={styles.connectionNodeStatus}>
                {channel.state === "online" && <DashboardV8Icon iconKey="online" size="chip" tone="emerald" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />}
                {channel.state === "offline" && <DashboardV8Icon iconKey="offlineState" size="chip" tone="slate" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />}
                {channel.state === "pending" && <DashboardV8Icon iconKey="pending" size="chip" tone="amber" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />}
                {channel.state === "syncing" && <DashboardV8Icon iconKey="syncing" size="chip" tone="violet" className="!h-3 !w-3 !border-0 !bg-transparent !shadow-none" />}
                <span>{channel.state === "online" ? onlineLabel : channel.state === "offline" ? offlineLabel : channel.state === "pending" ? pendingStatusLabel : syncingLabel}</span>
              </div>
            </div>
            <div className={styles.connectionNodeSignal}>
              <div
                className={styles.connectionNodeSignalFill}
                style={{ width: `${channel.signalLevel}%`, "--tone-solid": `var(--tone-${channel.tone}-solid)` } as React.CSSProperties}
                data-tone={channel.tone}
              />
            </div>
            <span className={styles.connectionNodeAction}>{channel.actionLabel}</span>
          </button>
        ))}

        <button className={cn(styles.connectionNodeAdd, styles.iconHoverHost)} data-tone="sky" aria-label={addChannelLabel}>
          <div className={styles.connectionNodeAddIcon} data-tone="sky">
            <DashboardV8PlatformGlyph platformKey="add" tone="sky" />
          </div>
          <span>{addChannelLabel}</span>
        </button>
      </div>
    </section>
  );
}

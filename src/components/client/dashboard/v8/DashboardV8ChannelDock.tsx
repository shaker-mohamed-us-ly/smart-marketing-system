"use client";



/**

 * Dashboard V8 Channel Intelligence Hub

 *

 * Premium Brand-Aware Channel Control Module.

 * Presents connected channels, brand context, and management CTAs in a

 * cohesive panel that feels like a command center, not a technical widget.

 *

 * Presentational only; all content arrives as plain serializable props.

 */



import { cn } from "@/lib/utils/cn";

import { CheckCircle2, Clock, XCircle, RefreshCw } from "lucide-react";

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

  metaLabel: string; // short metadata line for channel card

  actionLabel: string;

}



export interface DashboardV8ChannelDockProps {

  title: string;

  subtitle?: string;

  settingsLabel: string;

  manageChannelsLabel: string;

  onlineCount: number;

  offlineCount: number;

  pendingCount: number;

  onlineLabel: string;

  offlineLabel: string;

  pendingStatusLabel: string;

  syncingLabel: string;

  groupOnlineLabel: string;

  groupOfflineLabel: string;

  groupPendingLabel: string;

  groupSyncingLabel: string;

  brandName: string;

  brandMeta: string;

  brandActionLabel: string;

  brandLogoUrl?: string;

  channels: DashboardV8Channel[];

}



const groupTone: Record<V8ConnectionState, V8Tone> = {

  online: "emerald",

  offline: "slate",

  pending: "amber",

  syncing: "violet",

};



const statusIconMap: Record<V8ConnectionState, React.ElementType> = {

  online: CheckCircle2,

  pending: Clock,

  offline: XCircle,

  syncing: RefreshCw,

};



function StatusIcon({

  state,

  label,

}: {

  state: V8ConnectionState;

  label: string;

}) {

  const Icon = statusIconMap[state];

  return (

    <span

      className={styles.channelStatusIcon}

      data-tone={groupTone[state]}

      aria-label={label}

      title={label}

    >

      <Icon style={{ width: 14, height: 14 }} strokeWidth={2} />

    </span>

  );

}



function ChannelCard({

  channel,

  onlineLabel,

  offlineLabel,

  pendingStatusLabel,

  syncingLabel,

}: {

  channel: DashboardV8Channel;

  onlineLabel: string;

  offlineLabel: string;

  pendingStatusLabel: string;

  syncingLabel: string;

}) {

  const statusLabel =

    channel.state === "online"

      ? onlineLabel

      : channel.state === "offline"

        ? offlineLabel

        : channel.state === "pending"

          ? pendingStatusLabel

          : syncingLabel;



  return (

    <button

      key={channel.id}

      data-state={channel.state}

      data-tone={channel.tone}

      className={cn(styles.channelCommandCard, styles.iconHoverHost)}

      aria-label={`${channel.name} - ${channel.state} - ${channel.actionLabel}`}

    >

      <div className={styles.channelCommandCardIcon} data-tone={channel.tone}>

        <DashboardV8PlatformGlyph platformKey={channel.platformKey} tone={channel.tone} />

      </div>



      <div className={styles.channelCommandCardBody}>

        <span className={styles.channelCommandCardName}>{channel.name}</span>

        <span className={styles.channelCommandCardMeta}>{channel.metaLabel}</span>

      </div>



      <div className={styles.channelCommandCardRight}>

        <StatusIcon state={channel.state} label={statusLabel} />

        <span className={styles.channelCommandCardAction}>{channel.actionLabel}</span>

      </div>

    </button>

  );

}



export function DashboardV8ChannelDock({

  title,

  subtitle,

  settingsLabel,

  manageChannelsLabel,

  onlineCount,

  offlineCount,

  pendingCount,

  onlineLabel,

  offlineLabel,

  pendingStatusLabel,

  syncingLabel,

  groupOnlineLabel,

  groupOfflineLabel,

  groupPendingLabel,

  groupSyncingLabel,

  brandName,

  brandMeta,

  brandActionLabel,

  brandLogoUrl,

  channels,

}: DashboardV8ChannelDockProps) {

  return (

    <section className={cn(styles.channelCommandCenter, styles.reveal, styles.r5)}>

      {/* Header */}

      <div className={styles.channelCommandHeader}>

        <div className={styles.channelCommandMeta}>

          <div className={styles.channelCommandTitleRow}>

            <DashboardV8Icon iconKey="channels" size="panel" tone="sky" />

            <h2 className={styles.sectionTitle}>{title}</h2>

          </div>

          {subtitle && <p className={styles.channelCommandSubtitle}>{subtitle}</p>}

          <div className={styles.channelCommandBadges}>

            {onlineCount > 0 && (

              <span className={styles.channelStatusBadge} data-tone="emerald">

                <span className={styles.channelBadgeDot} />

                {onlineCount} {onlineLabel}

              </span>

            )}

            {offlineCount > 0 && (

              <span className={styles.channelStatusBadge} data-tone="slate">

                <span className={styles.channelBadgeDot} />

                {offlineCount} {offlineLabel}

              </span>

            )}

            {pendingCount > 0 && (

              <span className={styles.channelStatusBadge} data-tone="amber">

                <span className={styles.channelBadgeDot} />

                {pendingCount} {pendingStatusLabel}

              </span>

            )}

          </div>

        </div>



        <button className={styles.channelSettingsCta} data-tone="slate" aria-label={settingsLabel}>

          <DashboardV8Icon iconKey="manage" size="chip" tone="slate" />

          <span>{settingsLabel}</span>

        </button>

      </div>



      {/* Brand Context Capsule */}

      <div className={styles.brandContextCapsule} data-tone="violet">

        {brandLogoUrl ? (

          <img

            src={brandLogoUrl}

            alt={brandName}

            className={styles.brandContextImage}

          />

        ) : (

          <div className={styles.brandContextFrame} data-tone="violet">

            <span className={styles.brandContextInitials}>{brandName.charAt(0)}</span>

          </div>

        )}

        <div className={styles.brandContextMeta}>

          <span className={styles.brandContextName}>{brandName}</span>

          <span className={styles.brandContextLine}>{brandMeta}</span>

        </div>

        <button className={styles.brandContextAction} data-tone="violet" aria-label={brandActionLabel}>

          {brandActionLabel}

        </button>

      </div>



      {/* Flat Channel Grid */}

      <div className={styles.channelCommandGrid}>

        {channels.map((channel) => (

          <ChannelCard

            key={channel.id}

            channel={channel}

            onlineLabel={onlineLabel}

            offlineLabel={offlineLabel}

            pendingStatusLabel={pendingStatusLabel}

            syncingLabel={syncingLabel}

          />

        ))}

      </div>



      {/* Manage Channels CTA */}

      <button className={styles.channelManageCta} data-tone="sky" aria-label={manageChannelsLabel}>

        <DashboardV8Icon iconKey="channels" size="chip" tone="sky" />

        <span>{manageChannelsLabel}</span>

      </button>

    </section>

  );

}


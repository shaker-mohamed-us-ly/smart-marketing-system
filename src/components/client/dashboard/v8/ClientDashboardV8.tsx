/**
 * Client Dashboard V8 — Browser-first Prototype Reset
 *
 * Premium Centered Canvas command center for the AI Brand & Marketing OS.
 *
 * Architecture / RSC safety:
 * - Server Component. Reads i18n via createServerTranslator and passes ONLY
 *   plain serializable props (strings, arrays of plain objects, `iconKey`
 *   strings) into the presentational V8 sections. No event handlers and no
 *   icon component objects cross any boundary.
 *
 * i18n:
 * - Uses the dedicated `clientDashboard.premium.v8.*` namespace (NOT v6).
 * - Every visible string is sourced from i18n; the legacy translator returns
 *   "" for missing keys, so the V8 namespace provides complete coverage in
 *   both Arabic and English (preserving the V6.6 "no empty text" fix).
 */

import { createServerTranslator } from "@/i18n/server";
import { DashboardV8Shell } from "./DashboardV8Shell";
import { DashboardV8Hero } from "./DashboardV8Hero";
import { DashboardV8MetricCard } from "./DashboardV8MetricCard";
import { DashboardV8CommandCenter } from "./DashboardV8CommandCenter";
import { DashboardV8InsightRail } from "./DashboardV8InsightRail";
import { DashboardV8ChannelDock, V8ConnectionState } from "./DashboardV8ChannelDock";
import { V8PlatformKey } from "./DashboardV8PlatformGlyph";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

const NS = "clientDashboard.premium.v8";

export default async function ClientDashboardV8() {
  const t = await createServerTranslator();
  const tr = (key: string) => t(`${NS}.${key}`);

  const metrics = [
    { iconKey: "readiness", tone: "orange", progress: 92, key: "campaignReadiness" },
    { iconKey: "brandHealth", tone: "emerald", progress: 88, key: "brandHealth" },
    { iconKey: "performance", tone: "sky", progress: 87, key: "contentPerformance" },
    { iconKey: "recommendations", tone: "violet", progress: 75, key: "aiRecommendations" },
  ] as const;

  const stats = [
    { label: tr("commandCenter.stats.today.label"), value: tr("commandCenter.stats.today.value") },
    { label: tr("commandCenter.stats.pending.label"), value: tr("commandCenter.stats.pending.value") },
    { label: tr("commandCenter.stats.ai.label"), value: tr("commandCenter.stats.ai.value") },
    { label: tr("commandCenter.stats.channels.label"), value: tr("commandCenter.stats.channels.value") },
  ];

  const activities = [
    { id: "1", iconKey: "campaign", tone: "orange", unread: true, key: "campaignLaunched" },
    { id: "2", iconKey: "aiSpark", tone: "violet", unread: true, key: "aiOptimization" },
    { id: "3", iconKey: "alert", tone: "amber", unread: false, key: "budgetAlert" },
    { id: "4", iconKey: "audience", tone: "emerald", unread: false, key: "audienceUpdate" },
  ] as const;

  const insights = [
    { iconKey: "trendUp", tone: "emerald", key: "audienceGrowth" },
    { iconKey: "magic", tone: "violet", key: "contentOptimization" },
    { iconKey: "timing", tone: "amber", key: "campaignTiming" },
  ] as const;

  const quickActions = [
    { iconKey: "brandDNA", tone: "violet", key: "brandDNA" },
    { iconKey: "studio", tone: "orange", key: "campaignStudio" },
    { iconKey: "analytics", tone: "emerald", key: "analyticsHub" },
  ] as const;

  const channels: Array<{
    id: string;
    platformKey: V8PlatformKey;
    tone: V8Tone;
    state: V8ConnectionState;
    signalLevel: number;
    key: string;
  }> = [
    { id: "whatsapp", platformKey: "whatsapp", tone: "emerald", state: "online", signalLevel: 92, key: "whatsapp" },
    { id: "instagram", platformKey: "instagram", tone: "violet", state: "online", signalLevel: 88, key: "instagram" },
    { id: "tiktok", platformKey: "tiktok", tone: "slate", state: "offline", signalLevel: 0, key: "tiktok" },
    { id: "facebook", platformKey: "facebook", tone: "sky", state: "pending", signalLevel: 72, key: "facebook" },
  ];

  return (
    <DashboardV8Shell>
      <DashboardV8Hero
        badgeLabel={tr("hero.badgeLabel")}
        title={tr("hero.title")}
        subtitle={tr("hero.subtitle")}
        primaryActionLabel={tr("hero.primaryActionLabel")}
        secondaryActionLabel={tr("hero.secondaryActionLabel")}
        statusLabel={tr("hero.statusLabel")}
        healthLabel={tr("hero.healthLabel")}
        healthValue={tr("hero.healthValue")}
        learningLabel={tr("hero.learningLabel")}
        learningValue={tr("hero.learningValue")}
      />

      <div className={`${styles.metricGrid} ${styles.reveal} ${styles.r2}`}>
        {metrics.map((metric) => (
          <DashboardV8MetricCard
            key={metric.key}
            iconKey={metric.iconKey}
            tone={metric.tone}
            progress={metric.progress}
            title={tr(`metrics.${metric.key}.title`)}
            value={tr(`metrics.${metric.key}.value`)}
            trend={tr(`metrics.${metric.key}.trend`)}
            description={tr(`metrics.${metric.key}.description`)}
            trendUp
          />
        ))}
      </div>

      <div className={styles.workbench}>
        <div className={styles.colMain}>
          <DashboardV8CommandCenter
            title={tr("commandCenter.title")}
            viewAllLabel={tr("commandCenter.viewAllLabel")}
            commandTitle={tr("commandCenter.commandTitle")}
            commandDescription={tr("commandCenter.commandDescription")}
            stats={stats}
            activities={activities.map((activity) => ({
              id: activity.id,
              iconKey: activity.iconKey,
              tone: activity.tone,
              unread: activity.unread,
              title: tr(`commandCenter.activities.${activity.key}.title`),
              description: tr(`commandCenter.activities.${activity.key}.description`),
              time: tr(`commandCenter.activities.${activity.key}.time`),
            }))}
          />

          <DashboardV8ChannelDock
            title={tr("channels.title")}
            subtitle={tr("channels.subtitle")}
            settingsLabel={tr("channels.settingsLabel")}
            manageChannelsLabel={tr("channels.manageChannelsLabel")}
            onlineCount={2}
            offlineCount={1}
            pendingCount={1}
            onlineLabel={tr("channels.onlineLabel")}
            offlineLabel={tr("channels.offlineLabel")}
            pendingStatusLabel={tr("channels.pendingStatusLabel")}
            syncingLabel={tr("channels.syncingLabel")}
            groupOnlineLabel={tr("channels.groupOnlineLabel")}
            groupOfflineLabel={tr("channels.groupOfflineLabel")}
            groupPendingLabel={tr("channels.groupPendingLabel")}
            groupSyncingLabel={tr("channels.groupSyncingLabel")}
            brandName={tr("channels.brandName")}
            brandMeta={tr("channels.brandMeta")}
            brandActionLabel={tr("channels.viewBrandInfo")}
            brandLogoUrl={undefined}
            channels={channels.map((channel) => {
              let actionLabel: string;
              if (channel.state === "online") {
                actionLabel = tr("channels.manageLabel");
              } else if (channel.state === "pending") {
                actionLabel = tr("channels.reviewLabel");
              } else if (channel.state === "syncing") {
                actionLabel = tr("channels.syncLabel");
              } else {
                actionLabel = tr("channels.connectLabel");
              }
              return {
                id: channel.id,
                platformKey: channel.platformKey,
                tone: channel.tone,
                state: channel.state,
                name: tr(`channels.items.${channel.key}.name`),
                metaLabel: tr(`channels.items.${channel.key}.meta`),
                actionLabel,
              };
            })}
          />
        </div>

        <div className={styles.colRail}>
          <DashboardV8InsightRail
            insightsTitle={tr("insights.title")}
            quickActionsTitle={tr("insights.quickActionsTitle")}
            aiRecommendationTitle={tr("insights.aiRecommendation.title")}
            aiRecommendationDescription={tr("insights.aiRecommendation.description")}
            insights={insights.map((insight) => ({
              iconKey: insight.iconKey,
              tone: insight.tone,
              title: tr(`insights.items.${insight.key}.title`),
              description: tr(`insights.items.${insight.key}.description`),
              badge: tr(`insights.items.${insight.key}.badge`),
              actionLabel: tr(`insights.items.${insight.key}.actionLabel`),
            }))}
            quickActions={quickActions.map((action) => ({
              iconKey: action.iconKey,
              tone: action.tone,
              title: tr(`insights.quickActions.${action.key}.title`),
              subtitle: tr(`insights.quickActions.${action.key}.subtitle`),
              actionLabel: tr(`insights.quickActions.${action.key}.actionLabel`),
            }))}
          />
        </div>
      </div>
    </DashboardV8Shell>
  );
}

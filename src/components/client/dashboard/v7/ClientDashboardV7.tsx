/**
 * Client Dashboard V7.2
 * 
 * Main dashboard component using new V7.2 visual system.
 * 
 * Layout:
 * - DashboardV7Stage (centered stage with route background)
 * - DashboardV7Hero (hero command center)
 * - DashboardV7SignalStrip (4 metric cards)
 * - Main workbench: DashboardV7CommandBoard (7 cols) + DashboardV7DecisionRail (5 cols)
 * - DashboardV7ChannelMatrix (strong channel module)
 * 
 * Translation Strategy:
 * - Reuse existing clientDashboard.premium.v6.* keys
 * - No new v7 namespace needed
 * - Preserves V6.6 text fix
 */

import { DashboardV7Stage } from "./DashboardV7Stage";
import { DashboardV7Hero } from "./DashboardV7Hero";
import { DashboardV7SignalStrip } from "./DashboardV7SignalStrip";
import { DashboardV7CommandBoard } from "./DashboardV7CommandBoard";
import { DashboardV7DecisionRail } from "./DashboardV7DecisionRail";
import { DashboardV7ChannelMatrix } from "./DashboardV7ChannelMatrix";
import { dashboardIcons } from "../premium/premium-dashboard-icons";
import { createServerTranslator } from "@/i18n/server";
import { V7Tone } from "./DashboardV7Tokens";

export interface ClientDashboardV7Props {
  locale?: string;
}

export default async function ClientDashboardV7() {
  const t = await createServerTranslator();

  // Metrics data - reuse V6 keys
  const metrics = [
    {
      iconKey: "target",
      title: t("clientDashboard.premium.v6.metrics.campaignReadiness.title"),
      value: t("clientDashboard.premium.v6.metrics.campaignReadiness.value"),
      trend: t("clientDashboard.premium.v6.metrics.campaignReadiness.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.campaignReadiness.description"),
      tone: "orange" as V7Tone,
    },
    {
      iconKey: "health",
      title: t("clientDashboard.premium.v6.metrics.brandHealth.title"),
      value: t("clientDashboard.premium.v6.metrics.brandHealth.value"),
      trend: t("clientDashboard.premium.v6.metrics.brandHealth.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.brandHealth.description"),
      tone: "emerald" as V7Tone,
    },
    {
      iconKey: "analytics",
      title: t("clientDashboard.premium.v6.metrics.contentPerformance.title"),
      value: t("clientDashboard.premium.v6.metrics.contentPerformance.value"),
      trend: t("clientDashboard.premium.v6.metrics.contentPerformance.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.contentPerformance.description"),
      tone: "blue" as V7Tone,
    },
    {
      iconKey: "aiActivity",
      title: t("clientDashboard.premium.v6.metrics.aiRecommendations.title"),
      value: t("clientDashboard.premium.v6.metrics.aiRecommendations.value"),
      trend: t("clientDashboard.premium.v6.metrics.aiRecommendations.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.aiRecommendations.description"),
      tone: "violet" as V7Tone,
    },
  ];

  // Operations activities data - reuse V6 keys
  const activities = [
    {
      id: "1",
      iconKey: "campaignActivity",
      title: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.title"),
      description: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.description"),
      time: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.time"),
      status: "completed" as const,
      unread: true,
    },
    {
      id: "2",
      iconKey: "aiActivity",
      title: t("clientDashboard.premium.v6.operations.activities.aiOptimization.title"),
      description: t("clientDashboard.premium.v6.operations.activities.aiOptimization.description"),
      time: t("clientDashboard.premium.v6.operations.activities.aiOptimization.time"),
      status: "ai" as const,
      unread: true,
    },
    {
      id: "3",
      iconKey: "warningActivity",
      title: t("clientDashboard.premium.v6.operations.activities.budgetAlert.title"),
      description: t("clientDashboard.premium.v6.operations.activities.budgetAlert.description"),
      time: t("clientDashboard.premium.v6.operations.activities.budgetAlert.time"),
      status: "alert" as const,
      unread: false,
    },
    {
      id: "4",
      iconKey: "audienceActivity",
      title: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.title"),
      description: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.description"),
      time: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.time"),
      status: "completed" as const,
      unread: false,
    },
  ];

  // Insights data - reuse V6 keys
  const insights = [
    {
      iconKey: "growth",
      title: t("clientDashboard.premium.v6.insights.items.audienceGrowth.title"),
      description: t("clientDashboard.premium.v6.insights.items.audienceGrowth.description"),
      badge: t("clientDashboard.premium.v6.insights.items.audienceGrowth.badge"),
      badgeTone: "emerald" as V7Tone,
      actionLabel: t("clientDashboard.premium.v6.insights.items.audienceGrowth.actionLabel"),
      tone: "emerald" as V7Tone,
    },
    {
      iconKey: "magic",
      title: t("clientDashboard.premium.v6.insights.items.contentOptimization.title"),
      description: t("clientDashboard.premium.v6.insights.items.contentOptimization.description"),
      badge: t("clientDashboard.premium.v6.insights.items.contentOptimization.badge"),
      badgeTone: "violet" as V7Tone,
      actionLabel: t("clientDashboard.premium.v6.insights.items.contentOptimization.actionLabel"),
      tone: "violet" as V7Tone,
    },
    {
      iconKey: "timing",
      title: t("clientDashboard.premium.v6.insights.items.campaignTiming.title"),
      description: t("clientDashboard.premium.v6.insights.items.campaignTiming.description"),
      badge: t("clientDashboard.premium.v6.insights.items.campaignTiming.badge"),
      badgeTone: "amber" as V7Tone,
      actionLabel: t("clientDashboard.premium.v6.insights.items.campaignTiming.actionLabel"),
      tone: "amber" as V7Tone,
    },
  ];

  // Quick actions data - reuse V6 keys
  const quickActions = [
    {
      iconKey: "brandIdentity",
      title: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.actionLabel"),
      tone: "violet" as V7Tone,
    },
    {
      iconKey: "campaignStudio",
      title: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.actionLabel"),
      tone: "orange" as V7Tone,
    },
    {
      iconKey: "audience",
      title: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.actionLabel"),
      tone: "emerald" as V7Tone,
    },
  ];

  // Channels data - reuse V6 keys
  const channels = [
    {
      id: "whatsapp",
      name: t("clientDashboard.premium.v6.channels.items.whatsapp.name"),
      iconKey: "whatsapp",
      status: "connected" as const,
      statusLabel: t("clientDashboard.premium.v6.channels.items.whatsapp.statusLabel"),
    },
    {
      id: "instagram",
      name: t("clientDashboard.premium.v6.channels.items.instagram.name"),
      iconKey: "instagram",
      status: "connected" as const,
      statusLabel: t("clientDashboard.premium.v6.channels.items.instagram.statusLabel"),
    },
    {
      id: "tiktok",
      name: t("clientDashboard.premium.v6.channels.items.tiktok.name"),
      iconKey: "tiktok",
      status: "offline" as const,
      statusLabel: t("clientDashboard.premium.v6.channels.items.tiktok.statusLabel"),
    },
  ];

  return (
    <DashboardV7Stage>
      <div className="space-y-5">
        {/* Hero Command Center */}
        <DashboardV7Hero
          aiBadgeLabel={t("clientDashboard.premium.v6.hero.aiBadgeLabel")}
          systemHealthyLabel={t("clientDashboard.premium.v6.hero.systemHealthyLabel")}
          title={t("clientDashboard.premium.v6.hero.title")}
          subtitle={t("clientDashboard.premium.v6.hero.subtitle")}
          primaryActionLabel={t("clientDashboard.premium.v6.hero.primaryActionLabel")}
          secondaryActionLabel={t("clientDashboard.premium.v6.hero.secondaryActionLabel")}
        />

        {/* Signal Strip */}
        <DashboardV7SignalStrip metrics={metrics} />

        {/* Main Workbench: 7-column Command Board + 5-column Decision Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Command Board - 7 columns */}
          <div className="lg:col-span-7">
            <DashboardV7CommandBoard
              activities={activities}
              title={t("clientDashboard.premium.v6.operations.title")}
              viewAllLabel={t("clientDashboard.premium.v6.operations.viewAllLabel")}
              todayActivityLabel={t("clientDashboard.premium.v6.operations.todayActivityLabel")}
              pendingApprovalsLabel={t("clientDashboard.premium.v6.operations.pendingApprovalsLabel")}
              aiUpdatesLabel={t("clientDashboard.premium.v6.operations.aiUpdatesLabel")}
              channelHealthLabel={t("clientDashboard.premium.v6.operations.channelHealthLabel")}
              channelHealthValue={t("status.healthy")}
              todayActivityCount={t("clientDashboard.premium.v6.operations.todayActivityCount")}
              pendingApprovalsCount={t("clientDashboard.premium.v6.operations.pendingApprovalsCount")}
              aiUpdatesCount={t("clientDashboard.premium.v6.operations.aiUpdatesCount")}
            />
          </div>

          {/* Decision Rail - 5 columns */}
          <div className="lg:col-span-5">
            <DashboardV7DecisionRail
              insights={insights}
              quickActions={quickActions}
              insightsTitle={t("clientDashboard.premium.v6.insights.title")}
              quickActionsTitle={t("clientDashboard.premium.v6.insights.quickActionsTitle")}
              aiRecommendationTitle={t("clientDashboard.premium.v6.insights.aiRecommendation.title")}
              aiRecommendationDescription={t("clientDashboard.premium.v6.insights.aiRecommendation.description")}
            />
          </div>
        </div>

        {/* Channel Matrix */}
        <DashboardV7ChannelMatrix
          channels={channels}
          title={t("clientDashboard.premium.v6.channels.title")}
          addChannelLabel={t("clientDashboard.premium.v6.channels.addChannelLabel")}
          manageLabel={t("clientDashboard.premium.v6.channels.manageLabel")}
        />
      </div>
    </DashboardV7Stage>
  );
}

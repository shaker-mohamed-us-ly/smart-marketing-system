/**
 * Client Dashboard V6.2
 * 
 * Main dashboard component using new V6.2 visual system.
 * 
 * Layout:
 * - DashboardV6Shell (full-screen shell with clamped width)
 * - DashboardV6CommandHero (hero command center)
 * - DashboardV6MetricGrid (4 metric cards)
 * - Main workbench: DashboardV6OperationsBoard (8 cols) + DashboardV6InsightRail (4 cols)
 * - DashboardV6ChannelDock (strong channel module)
 */

import { DashboardV6Shell } from "./DashboardV6Shell";
import { DashboardV6CommandHero } from "./DashboardV6CommandHero";
import { DashboardV6MetricGrid } from "./DashboardV6MetricGrid";
import { DashboardV6OperationsBoard } from "./DashboardV6OperationsBoard";
import { DashboardV6InsightRail } from "./DashboardV6InsightRail";
import { DashboardV6ChannelDock } from "./DashboardV6ChannelDock";
import { dashboardIcons } from "../premium/premium-dashboard-icons";
import { createServerTranslator } from "@/i18n/server";

export interface ClientDashboardV6Props {
  locale?: string;
}

export default async function ClientDashboardV6() {
  const t = await createServerTranslator();

  // Metrics data
  const metrics = [
    {
      icon: dashboardIcons.target,
      title: t("clientDashboard.premium.v6.metrics.campaignReadiness.title"),
      value: t("clientDashboard.premium.v6.metrics.campaignReadiness.value"),
      trend: t("clientDashboard.premium.v6.metrics.campaignReadiness.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.campaignReadiness.description"),
      tone: "orange" as const,
    },
    {
      icon: dashboardIcons.health,
      title: t("clientDashboard.premium.v6.metrics.brandHealth.title"),
      value: t("clientDashboard.premium.v6.metrics.brandHealth.value"),
      trend: t("clientDashboard.premium.v6.metrics.brandHealth.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.brandHealth.description"),
      tone: "emerald" as const,
    },
    {
      icon: dashboardIcons.analytics,
      title: t("clientDashboard.premium.v6.metrics.contentPerformance.title"),
      value: t("clientDashboard.premium.v6.metrics.contentPerformance.value"),
      trend: t("clientDashboard.premium.v6.metrics.contentPerformance.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.contentPerformance.description"),
      tone: "blue" as const,
    },
    {
      icon: dashboardIcons.aiActivity,
      title: t("clientDashboard.premium.v6.metrics.aiRecommendations.title"),
      value: t("clientDashboard.premium.v6.metrics.aiRecommendations.value"),
      trend: t("clientDashboard.premium.v6.metrics.aiRecommendations.trend"),
      trendUp: true,
      description: t("clientDashboard.premium.v6.metrics.aiRecommendations.description"),
      tone: "violet" as const,
    },
  ];

  // Operations activities data
  const activities = [
    {
      id: "1",
      title: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.title"),
      description: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.description"),
      time: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.time"),
      status: t("clientDashboard.premium.v6.operations.activities.campaignLaunched.status") as "completed" | "pending" | "alert" | "ai" | "neutral",
      icon: dashboardIcons.campaignActivity,
      unread: true,
    },
    {
      id: "2",
      title: t("clientDashboard.premium.v6.operations.activities.aiOptimization.title"),
      description: t("clientDashboard.premium.v6.operations.activities.aiOptimization.description"),
      time: t("clientDashboard.premium.v6.operations.activities.aiOptimization.time"),
      status: t("clientDashboard.premium.v6.operations.activities.aiOptimization.status") as "completed" | "pending" | "alert" | "ai" | "neutral",
      icon: dashboardIcons.aiActivity,
      unread: true,
    },
    {
      id: "3",
      title: t("clientDashboard.premium.v6.operations.activities.budgetAlert.title"),
      description: t("clientDashboard.premium.v6.operations.activities.budgetAlert.description"),
      time: t("clientDashboard.premium.v6.operations.activities.budgetAlert.time"),
      status: t("clientDashboard.premium.v6.operations.activities.budgetAlert.status") as "completed" | "pending" | "alert" | "ai" | "neutral",
      icon: dashboardIcons.warningActivity,
      unread: false,
    },
    {
      id: "4",
      title: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.title"),
      description: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.description"),
      time: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.time"),
      status: t("clientDashboard.premium.v6.operations.activities.audienceUpdate.status") as "completed" | "pending" | "alert" | "ai" | "neutral",
      icon: dashboardIcons.audienceActivity,
      unread: false,
    },
  ];

  // Insights data
  const insights = [
    {
      icon: dashboardIcons.growth,
      title: t("clientDashboard.premium.v6.insights.items.audienceGrowth.title"),
      description: t("clientDashboard.premium.v6.insights.items.audienceGrowth.description"),
      badge: t("clientDashboard.premium.v6.insights.items.audienceGrowth.badge"),
      badgeTone: t("clientDashboard.premium.v6.insights.items.audienceGrowth.badgeTone") as "emerald" | "violet" | "amber",
      actionLabel: t("clientDashboard.premium.v6.insights.items.audienceGrowth.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.items.audienceGrowth.tone") as "emerald" | "violet" | "amber",
    },
    {
      icon: dashboardIcons.magic,
      title: t("clientDashboard.premium.v6.insights.items.contentOptimization.title"),
      description: t("clientDashboard.premium.v6.insights.items.contentOptimization.description"),
      badge: t("clientDashboard.premium.v6.insights.items.contentOptimization.badge"),
      badgeTone: t("clientDashboard.premium.v6.insights.items.contentOptimization.badgeTone") as "emerald" | "violet" | "amber",
      actionLabel: t("clientDashboard.premium.v6.insights.items.contentOptimization.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.items.contentOptimization.tone") as "emerald" | "violet" | "amber",
    },
    {
      icon: dashboardIcons.timing,
      title: t("clientDashboard.premium.v6.insights.items.campaignTiming.title"),
      description: t("clientDashboard.premium.v6.insights.items.campaignTiming.description"),
      badge: t("clientDashboard.premium.v6.insights.items.campaignTiming.badge"),
      badgeTone: t("clientDashboard.premium.v6.insights.items.campaignTiming.badgeTone") as "emerald" | "violet" | "amber",
      actionLabel: t("clientDashboard.premium.v6.insights.items.campaignTiming.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.items.campaignTiming.tone") as "emerald" | "violet" | "amber",
    },
  ];

  // Quick actions data
  const quickActions = [
    {
      icon: dashboardIcons.brandIdentity,
      title: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.quickActions.brandDNA.tone") as "violet" | "orange" | "emerald",
    },
    {
      icon: dashboardIcons.campaignStudio,
      title: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.quickActions.campaignStudio.tone") as "violet" | "orange" | "emerald",
    },
    {
      icon: dashboardIcons.audience,
      title: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.title"),
      subtitle: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.subtitle"),
      actionLabel: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.actionLabel"),
      tone: t("clientDashboard.premium.v6.insights.quickActions.analyticsHub.tone") as "violet" | "orange" | "emerald",
    },
  ];

  // Channels data
  const channels = [
    {
      id: "whatsapp",
      name: t("clientDashboard.premium.v6.channels.items.whatsapp.name"),
      iconKey: "whatsapp" as const,
      status: t("clientDashboard.premium.v6.channels.items.whatsapp.status") as "connected" | "offline" | "syncing",
      statusLabel: t("clientDashboard.premium.v6.channels.items.whatsapp.statusLabel"),
    },
    {
      id: "instagram",
      name: t("clientDashboard.premium.v6.channels.items.instagram.name"),
      iconKey: "instagram" as const,
      status: t("clientDashboard.premium.v6.channels.items.instagram.status") as "connected" | "offline" | "syncing",
      statusLabel: t("clientDashboard.premium.v6.channels.items.instagram.statusLabel"),
    },
    {
      id: "tiktok",
      name: t("clientDashboard.premium.v6.channels.items.tiktok.name"),
      iconKey: "tiktok" as const,
      status: t("clientDashboard.premium.v6.channels.items.tiktok.status") as "connected" | "offline" | "syncing",
      statusLabel: t("clientDashboard.premium.v6.channels.items.tiktok.statusLabel"),
    },
  ];

  return (
    <DashboardV6Shell>
      <div className="space-y-5">
        {/* Hero Command Center */}
        <DashboardV6CommandHero
          aiBadgeLabel={t("clientDashboard.premium.v6.hero.aiBadgeLabel")}
          systemHealthyLabel={t("clientDashboard.premium.v6.hero.systemHealthyLabel")}
          title={t("clientDashboard.premium.v6.hero.title")}
          subtitle={t("clientDashboard.premium.v6.hero.subtitle")}
          primaryActionLabel={t("clientDashboard.premium.v6.hero.primaryActionLabel")}
          secondaryActionLabel={t("clientDashboard.premium.v6.hero.secondaryActionLabel")}
        />

        {/* Metric Grid */}
        <DashboardV6MetricGrid metrics={metrics} />

        {/* Main Workbench: 7-column Operations + 5-column Insight Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Operations Board - 7 columns */}
          <div className="lg:col-span-7">
            <DashboardV6OperationsBoard
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

          {/* Insight Rail - 5 columns */}
          <div className="lg:col-span-5">
            <DashboardV6InsightRail
              insights={insights}
              quickActions={quickActions}
              insightsTitle={t("clientDashboard.premium.v6.insights.title")}
              quickActionsTitle={t("clientDashboard.premium.v6.insights.quickActionsTitle")}
              aiRecommendationTitle={t("clientDashboard.premium.v6.insights.aiRecommendation.title")}
              aiRecommendationDescription={t("clientDashboard.premium.v6.insights.aiRecommendation.description")}
            />
          </div>
        </div>

        {/* Channel Dock */}
        <DashboardV6ChannelDock
          channels={channels}
          title={t("clientDashboard.premium.v6.channels.title")}
          addChannelLabel={t("clientDashboard.premium.v6.channels.addChannelLabel")}
          manageLabel={t("clientDashboard.premium.v6.channels.manageLabel")}
        />
      </div>
    </DashboardV6Shell>
  );
}

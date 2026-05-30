import { DashboardHero } from "@/components/client/dashboard/DashboardHero";
import { KpiCard } from "@/components/client/dashboard/KpiCard";
import { PerformanceOverview } from "@/components/client/dashboard/PerformanceOverview";
import { TopCampaigns } from "@/components/client/dashboard/TopCampaigns";
import { AIRecommendations } from "@/components/client/dashboard/AIRecommendations";
import { FeatureQuickCard } from "@/components/client/dashboard/FeatureQuickCard";
import { RecentActivity } from "@/components/client/dashboard/RecentActivity";
import { AudienceInsights } from "@/components/client/dashboard/AudienceInsights";
import { AIBrainActivity } from "@/components/client/dashboard/AIBrainActivity";
import { DarkModePreviewPanel } from "@/components/client/dashboard/DarkModePreviewPanel";
import { centeredPlatformCanvas, pageSectionGap, cardGridGap, goldenMain, goldenSupport } from "@/lib/layout/layout-classes";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("clientDashboard.title"),
    description: t("clientDashboard.subtitle"),
  };
}

export default async function ClientDashboardPage() {
  const t = await createServerTranslator();
  const dashboardLabels = {
    performanceOverview: {
      title: t("clientDashboard.performanceOverview.title"),
      subtitle: t("clientDashboard.performanceOverview.subtitle"),
      revenue: t("clientDashboard.performanceOverview.revenue"),
      target: t("clientDashboard.performanceOverview.target"),
      jan: t("clientDashboard.performanceOverview.jan"),
      feb: t("clientDashboard.performanceOverview.feb"),
      mar: t("clientDashboard.performanceOverview.mar"),
      apr: t("clientDashboard.performanceOverview.apr"),
      may: t("clientDashboard.performanceOverview.may"),
      jun: t("clientDashboard.performanceOverview.jun"),
      jul: t("clientDashboard.performanceOverview.jul"),
      aug: t("clientDashboard.performanceOverview.aug"),
      sep: t("clientDashboard.performanceOverview.sep"),
      oct: t("clientDashboard.performanceOverview.oct"),
      nov: t("clientDashboard.performanceOverview.nov"),
      dec: t("clientDashboard.performanceOverview.dec"),
    },
    topCampaigns: {
      title: t("clientDashboard.topCampaigns.title"),
      subtitle: t("clientDashboard.topCampaigns.subtitle"),
      summerCollection: t("clientDashboard.topCampaigns.summerCollection"),
      newProductLaunch: t("clientDashboard.topCampaigns.newProductLaunch"),
      brandAwarenessCampaign: t("clientDashboard.topCampaigns.brandAwarenessCampaign"),
      holidayPromotion: t("clientDashboard.topCampaigns.holidayPromotion"),
    },
    aiRecommendations: {
      title: t("clientDashboard.aiRecommendations.title"),
      subtitle: t("clientDashboard.aiRecommendations.subtitle"),
      recommendations: {
        increaseBudget: t("clientDashboard.aiRecommendations.recommendations.increaseBudget"),
        optimizeContent: t("clientDashboard.aiRecommendations.recommendations.optimizeContent"),
        launchEmailCampaign: t("clientDashboard.aiRecommendations.recommendations.launchEmailCampaign"),
        targetAudienceSegments: t("clientDashboard.aiRecommendations.recommendations.targetAudienceSegments"),
      },
    },
    recentActivity: {
      title: t("clientDashboard.recentActivity.title"),
      subtitle: t("clientDashboard.recentActivity.subtitle"),
      activities: {
        campaignLaunched: t("clientDashboard.recentActivity.activities.campaignLaunched"),
        aiOptimizationCompleted: t("clientDashboard.recentActivity.activities.aiOptimizationCompleted"),
        budgetThresholdReached: t("clientDashboard.recentActivity.activities.budgetThresholdReached"),
        audienceSegmentCreated: t("clientDashboard.recentActivity.activities.audienceSegmentCreated"),
      },
      timeLabels: {
        twoHoursAgo: t("clientDashboard.recentActivity.timeLabels.twoHoursAgo"),
        fiveHoursAgo: t("clientDashboard.recentActivity.timeLabels.fiveHoursAgo"),
        oneDayAgo: t("clientDashboard.recentActivity.timeLabels.oneDayAgo"),
        twoDaysAgo: t("clientDashboard.recentActivity.timeLabels.twoDaysAgo"),
      },
    },
    audienceInsights: {
      title: t("clientDashboard.audienceInsights.title"),
      subtitle: t("clientDashboard.audienceInsights.subtitle"),
      thisMonth: t("clientDashboard.audienceInsights.thisMonth"),
      insights: {
        totalAudience: t("clientDashboard.audienceInsights.insights.totalAudience"),
        activeUsers: t("clientDashboard.audienceInsights.insights.activeUsers"),
        engagementRate: t("clientDashboard.audienceInsights.insights.engagementRate"),
      },
    },
    aiBrainActivity: {
      title: t("clientDashboard.aiBrainActivity.title"),
      subtitle: t("clientDashboard.aiBrainActivity.subtitle"),
      status: {
        excellent: t("clientDashboard.aiBrainActivity.status.excellent"),
        good: t("clientDashboard.aiBrainActivity.status.good"),
        warning: t("clientDashboard.aiBrainActivity.status.warning"),
      },
      allSystemsOperational: t("clientDashboard.aiBrainActivity.allSystemsOperational"),
      healthScore: t("clientDashboard.aiBrainActivity.healthScore"),
      processing: t("clientDashboard.aiBrainActivity.processing"),
      learning: t("clientDashboard.aiBrainActivity.learning"),
      optimizing: t("clientDashboard.aiBrainActivity.optimizing"),
    },
    previewPanel: {
      title: t("clientDashboard.previewPanel.title"),
      dashboard: t("clientDashboard.previewPanel.dashboard"),
      aiBrain: t("clientDashboard.previewPanel.aiBrain"),
      health: t("clientDashboard.previewPanel.health"),
      summerCollection: t("clientDashboard.previewPanel.summerCollection"),
      increaseBudget: t("clientDashboard.previewPanel.increaseBudget"),
      systems: t("clientDashboard.previewPanel.systems"),
      operational: t("clientDashboard.previewPanel.operational"),
    },
    featureCards: {
      open: t("clientDashboard.featureCards.open"),
    },
  };
  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <DashboardHero 
          subtitle={t("clientDashboard.hero.subtitleText")}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 12 columns for stronger internal composition */}
          <div className="lg:col-span-12">
            <div className={pageSectionGap}>
              {/* Top Command Area: AI Brain Status + KPI Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* AI Brain Status Card - 3 columns */}
                <div className="lg:col-span-3">
                  <AIBrainActivity labels={dashboardLabels.aiBrainActivity} />
                </div>
                
                {/* KPI Cards - 9 columns, 5 cards evenly distributed */}
                <div className="lg:col-span-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                    <KpiCard
                      icon="DollarSign"
                      label={t("clientDashboard.totalRevenue")}
                      value="$28,450"
                      trend="12%"
                      trendUp={true}
                      sparkline={[10, 15, 12, 18, 14, 20, 16]}
                    />
                    <KpiCard
                      icon="Target"
                      label={t("common.campaigns")}
                      value="12"
                      trend="8%"
                      trendUp={true}
                      sparkline={[8, 10, 9, 12, 11, 14, 12]}
                    />
                    <KpiCard
                      icon="Users"
                      label={t("clientDashboard.totalReach")}
                      value="1.42M"
                      trend="24%"
                      trendUp={true}
                      sparkline={[5, 8, 6, 10, 9, 12, 11]}
                    />
                    <KpiCard
                      icon="TrendingUp"
                      label={t("metrics.engagement")}
                      value="8.7%"
                      trend="3%"
                      trendUp={true}
                      sparkline={[6, 7, 6, 8, 7, 9, 8]}
                    />
                    <KpiCard
                      icon="BrainCircuit"
                      label={t("clientDashboard.aiScore")}
                      value="92/100"
                      trend="5%"
                      trendUp={true}
                      sparkline={[7, 8, 7, 9, 8, 10, 9]}
                    />
                  </div>
                </div>
              </div>

              {/* Feature Quick Cards - Full width row */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-6">
                <FeatureQuickCard
                  icon="Globe"
                  title={t("clientDashboard.featureCards.brandDNA")}
                  subtitle={t("clientDashboard.featureCards.brandDNASubtitle")}
                  actionLabel={dashboardLabels.featureCards.open}
                  gradient="from-indigo-600 to-emerald-500"
                />
                <FeatureQuickCard
                  icon="PenTool"
                  title={t("clientDashboard.featureCards.contentStudio")}
                  subtitle={t("clientDashboard.featureCards.contentStudioSubtitle")}
                  actionLabel={dashboardLabels.featureCards.open}
                  gradient="from-blue-600 to-violet-600"
                />
                <FeatureQuickCard
                  icon="Target"
                  title={t("clientDashboard.featureCards.campaignStudio")}
                  subtitle={t("clientDashboard.featureCards.campaignStudioSubtitle")}
                  actionLabel={dashboardLabels.featureCards.open}
                  gradient="from-emerald-600 to-cyan-600"
                />
                <FeatureQuickCard
                  icon="BarChart3"
                  title={t("clientDashboard.featureCards.analyticsHub")}
                  subtitle={t("clientDashboard.featureCards.analyticsHubSubtitle")}
                  actionLabel={dashboardLabels.featureCards.open}
                  gradient="from-orange-600 to-red-600"
                />
                <FeatureQuickCard
                  icon="Search"
                  title={t("clientDashboard.featureCards.competitorIntel")}
                  subtitle={t("clientDashboard.featureCards.competitorIntelSubtitle")}
                  actionLabel={dashboardLabels.featureCards.open}
                  gradient="from-purple-600 to-pink-600"
                />
              </div>

              {/* Main Content Grid with Side Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Content - 8 columns */}
                <div className="lg:col-span-8">
                  <div className={pageSectionGap}>
                    <PerformanceOverview labels={dashboardLabels.performanceOverview} />
                    <TopCampaigns labels={dashboardLabels.topCampaigns} />
                    <AIRecommendations labels={dashboardLabels.aiRecommendations} />
                  </div>
                </div>

                {/* Right Sidebar - 4 columns */}
                <div className="lg:col-span-4">
                  <div className="sticky top-6">
                    <DarkModePreviewPanel labels={dashboardLabels.previewPanel} />
                  </div>
                </div>
              </div>

              {/* Bottom Panels - Full width row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RecentActivity labels={dashboardLabels.recentActivity} />
                <AudienceInsights labels={dashboardLabels.audienceInsights} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

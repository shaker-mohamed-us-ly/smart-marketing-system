import { AnalyticsHero } from "@/components/client/analytics/AnalyticsHero";
import { PerformanceCommandOverview } from "@/components/client/analytics/PerformanceCommandOverview";
import { CampaignPerformancePanel } from "@/components/client/analytics/CampaignPerformancePanel";
import { EngagementIntelligencePanel } from "@/components/client/analytics/EngagementIntelligencePanel";
import { ConversionIntelligencePanel } from "@/components/client/analytics/ConversionIntelligencePanel";
import { AudienceLearningPanel } from "@/components/client/analytics/AudienceLearningPanel";
import { BrandDNAEvolutionPanel } from "@/components/client/analytics/BrandDNAEvolutionPanel";
import { ContentPerformanceMatrix } from "@/components/client/analytics/ContentPerformanceMatrix";
import { OfferPerformancePanel } from "@/components/client/analytics/OfferPerformancePanel";
import { ChannelAttributionPanel } from "@/components/client/analytics/ChannelAttributionPanel";
import { SelfLearningSignalsPanel } from "@/components/client/analytics/SelfLearningSignalsPanel";
import { AIRecommendationEnginePanel } from "@/components/client/analytics/AIRecommendationEnginePanel";
import { LearningReadinessScore } from "@/components/client/analytics/LearningReadinessScore";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("clientAnalytics.title"),
    description: t("clientAnalytics.subtitle"),
  };
}

export default async function AnalyticsPage() {
  const t = await createServerTranslator();
  
  const analyticsLabels = {
    hero: {
      title: t("clientAnalytics.hero.title"),
      subtitle: t("clientAnalytics.hero.subtitle"),
      exportReport: t("clientAnalytics.hero.exportReport"),
      generateInsights: t("clientAnalytics.hero.generateInsights"),
    },
    performanceCommand: {
      title: t("clientAnalytics.performanceCommand.title"),
      overview: t("clientAnalytics.performanceCommand.overview"),
      metrics: t("clientAnalytics.performanceCommand.metrics"),
      trends: t("clientAnalytics.performanceCommand.trends"),
      campaignPerformanceScore: t("clientAnalytics.performanceCommand.campaignPerformanceScore"),
      conversionReadiness: t("clientAnalytics.performanceCommand.conversionReadiness"),
      audienceLearning: t("clientAnalytics.performanceCommand.audienceLearning"),
      brandIdentityGrowth: t("clientAnalytics.performanceCommand.brandIdentityGrowth"),
      monthlyGrowthMomentum: t("clientAnalytics.performanceCommand.monthlyGrowthMomentum"),
    },
    campaignPerformance: {
      title: t("clientAnalytics.campaignPerformance.title"),
      campaigns: t("clientAnalytics.campaignPerformance.campaigns"),
      performance: t("clientAnalytics.campaignPerformance.performance"),
      roi: t("clientAnalytics.campaignPerformance.roi"),
      engagement: t("clientAnalytics.campaignPerformance.engagement"),
      reach: t("clientAnalytics.campaignPerformance.reach"),
      conversions: t("clientAnalytics.campaignPerformance.conversions"),
      score: t("clientAnalytics.campaignPerformance.score"),
      campaign1: t("clientAnalytics.campaignPerformance.campaign1"),
      campaign2: t("clientAnalytics.campaignPerformance.campaign2"),
      campaign3: t("clientAnalytics.campaignPerformance.campaign3"),
      campaign4: t("clientAnalytics.campaignPerformance.campaign4"),
      active: t("clientAnalytics.campaignPerformance.active"),
      completed: t("clientAnalytics.campaignPerformance.completed"),
    },
    engagementIntelligence: {
      title: t("clientAnalytics.engagementIntelligence.title"),
      engagement: t("clientAnalytics.engagementIntelligence.engagement"),
      reach: t("clientAnalytics.engagementIntelligence.reach"),
      interactions: t("clientAnalytics.engagementIntelligence.interactions"),
      sentiment: t("clientAnalytics.engagementIntelligence.sentiment"),
    },
    conversionIntelligence: {
      title: t("clientAnalytics.conversionIntelligence.title"),
      conversions: t("clientAnalytics.conversionIntelligence.conversions"),
      funnel: t("clientAnalytics.conversionIntelligence.funnel"),
      rate: t("clientAnalytics.conversionIntelligence.rate"),
      value: t("clientAnalytics.conversionIntelligence.value"),
      conversionFunnel: t("clientAnalytics.conversionIntelligence.conversionFunnel"),
      leadConversionReadiness: t("clientAnalytics.conversionIntelligence.leadConversionReadiness"),
      bestConvertingChannel: t("clientAnalytics.conversionIntelligence.bestConvertingChannel"),
      weakPoint: t("clientAnalytics.conversionIntelligence.weakPoint"),
      postView: t("clientAnalytics.conversionIntelligence.postView"),
      engagement: t("clientAnalytics.conversionIntelligence.engagement"),
      messageWhatsAppPhone: t("clientAnalytics.conversionIntelligence.messageWhatsAppPhone"),
      lead: t("clientAnalytics.conversionIntelligence.lead"),
      sale: t("clientAnalytics.conversionIntelligence.sale"),
    },
    audienceLearning: {
      title: t("clientAnalytics.audienceLearning.title"),
      audience: t("clientAnalytics.audienceLearning.audience"),
      demographics: t("clientAnalytics.audienceLearning.demographics"),
      behavior: t("clientAnalytics.audienceLearning.behavior"),
      segments: t("clientAnalytics.audienceLearning.segments"),
    },
    brandDNAAvolution: {
      title: t("clientAnalytics.brandDNAAvolution.title"),
      brandDNA: t("clientAnalytics.brandDNAAvolution.brandDNA"),
      evolution: t("clientAnalytics.brandDNAAvolution.evolution"),
      consistency: t("clientAnalytics.brandDNAAvolution.consistency"),
      impact: t("clientAnalytics.brandDNAAvolution.impact"),
      dnaConfidence: t("clientAnalytics.brandDNAAvolution.dnaConfidence"),
      evolutionMetrics: t("clientAnalytics.brandDNAAvolution.evolutionMetrics"),
      dnaTimeline: t("clientAnalytics.brandDNAAvolution.dnaTimeline"),
      visualLanguageImprovement: t("clientAnalytics.brandDNAAvolution.visualLanguageImprovement"),
      toneConsistency: t("clientAnalytics.brandDNAAvolution.toneConsistency"),
      toneConsistencyValue: t("clientAnalytics.brandDNAAvolution.toneConsistencyValue"),
      productReadiness: t("clientAnalytics.brandDNAAvolution.productReadiness"),
      audienceFit: t("clientAnalytics.brandDNAAvolution.audienceFit"),
      brandIdentityInitialization: t("clientAnalytics.brandDNAAvolution.brandIdentityInitialization"),
      visualLanguageRefinement: t("clientAnalytics.brandDNAAvolution.visualLanguageRefinement"),
      tonePatternDiscovery: t("clientAnalytics.brandDNAAvolution.tonePatternDiscovery"),
      audienceFitOptimization: t("clientAnalytics.brandDNAAvolution.audienceFitOptimization"),
      week: t("clientAnalytics.brandDNAAvolution.week"),
    },
    contentPerformance: {
      title: t("clientAnalytics.contentPerformance.title"),
      content: t("clientAnalytics.contentPerformance.content"),
      performance: t("clientAnalytics.contentPerformance.performance"),
      topAssets: t("clientAnalytics.contentPerformance.topAssets"),
      optimization: t("clientAnalytics.contentPerformance.optimization"),
      poster: t("clientAnalytics.contentPerformance.poster"),
      reel: t("clientAnalytics.contentPerformance.reel"),
      story: t("clientAnalytics.contentPerformance.story"),
      carousel: t("clientAnalytics.contentPerformance.carousel"),
      textPack: t("clientAnalytics.contentPerformance.textPack"),
      videoAd: t("clientAnalytics.contentPerformance.videoAd"),
      high: t("clientAnalytics.contentPerformance.high"),
      medium: t("clientAnalytics.contentPerformance.medium"),
      veryHigh: t("clientAnalytics.contentPerformance.veryHigh"),
      low: t("clientAnalytics.contentPerformance.low"),
      all: t("clientAnalytics.contentPerformance.all"),
      assetType: t("clientAnalytics.contentPerformanceMatrix.assetType"),
      engagement: t("clientAnalytics.contentPerformanceMatrix.engagement"),
      conversion: t("clientAnalytics.contentPerformanceMatrix.conversion"),
      costEfficiency: t("clientAnalytics.contentPerformanceMatrix.costEfficiency"),
      bestPlatform: t("clientAnalytics.contentPerformanceMatrix.bestPlatform"),
    },
    offerPerformance: {
      title: t("clientAnalytics.offerPerformance.title"),
      offers: t("clientAnalytics.offerPerformance.offers"),
      performance: t("clientAnalytics.offerPerformance.performance"),
      conversion: t("clientAnalytics.offerPerformance.conversion"),
      revenue: t("clientAnalytics.offerPerformance.revenue"),
      twentyFourHourFlashOffer: t("clientAnalytics.offerPerformance.twentyFourHourFlashOffer"),
      highUrgencyFatigue: t("clientAnalytics.offerPerformance.highUrgencyFatigue"),
      launchCampaigns: t("clientAnalytics.offerPerformance.launchCampaigns"),
      bundleOffer: t("clientAnalytics.offerPerformance.bundleOffer"),
      low: t("clientAnalytics.offerPerformance.low"),
      productLaunches: t("clientAnalytics.offerPerformance.productLaunches"),
      limitedTimeDiscount: t("clientAnalytics.offerPerformance.limitedTimeDiscount"),
      medium: t("clientAnalytics.offerPerformance.medium"),
      seasonalCampaigns: t("clientAnalytics.offerPerformance.seasonalCampaigns"),
      premiumPositioningNoPrice: t("clientAnalytics.offerPerformance.premiumPositioningNoPrice"),
      premiumProducts: t("clientAnalytics.offerPerformance.premiumProducts"),
      twentyFourHourOffersInsight: t("clientAnalytics.offerPerformance.twentyFourHourOffersInsight"),
    },
    channelAttribution: {
      title: t("clientAnalytics.channelAttribution.title"),
      channels: t("clientAnalytics.channelAttribution.channels"),
      attribution: t("clientAnalytics.channelAttribution.attribution"),
      contribution: t("clientAnalytics.channelAttribution.contribution"),
      roi: t("clientAnalytics.channelAttribution.roi"),
      ofLeads: t("clientAnalytics.channelAttribution.ofLeads"),
      conversationStartDescription: t("clientAnalytics.channelAttribution.conversationStartDescription"),
    },
    selfLearningSignals: {
      title: t("clientAnalytics.selfLearningSignals.title"),
      signals: t("clientAnalytics.selfLearningSignals.signals"),
      learning: t("clientAnalytics.selfLearningSignals.learning"),
      patterns: t("clientAnalytics.selfLearningSignals.patterns"),
      insights: t("clientAnalytics.selfLearningSignals.insights"),
      description: t("clientAnalytics.selfLearningSignals.description"),
      bestCta: t("clientAnalytics.selfLearningSignals.bestCta"),
      bestContentType: t("clientAnalytics.selfLearningSignals.bestContentType"),
      bestEmotion: t("clientAnalytics.selfLearningSignals.bestEmotion"),
      bestTime: t("clientAnalytics.selfLearningSignals.bestTime"),
      bestServiceAngle: t("clientAnalytics.selfLearningSignals.bestServiceAngle"),
      bestProductAngle: t("clientAnalytics.selfLearningSignals.bestProductAngle"),
      orderViaWhatsApp: t("clientAnalytics.selfLearningSignals.orderViaWhatsApp"),
      reel: t("clientAnalytics.selfLearningSignals.reel"),
      statusTrust: t("clientAnalytics.selfLearningSignals.statusTrust"),
      beforeAfter: t("clientAnalytics.selfLearningSignals.beforeAfter"),
      officeLifestyle: t("clientAnalytics.selfLearningSignals.officeLifestyle"),
    },
    aiRecommendationEngine: {
      title: t("clientAnalytics.aiRecommendationEngine.title"),
      recommendations: t("clientAnalytics.aiRecommendationEngine.recommendations"),
      ai: t("clientAnalytics.aiRecommendationEngine.ai"),
      optimization: t("clientAnalytics.aiRecommendationEngine.optimization"),
      impact: t("clientAnalytics.aiRecommendationEngine.impact"),
      priorities: {
        high: t("clientAnalytics.aiRecommendationEngine.priorities.high"),
        medium: t("clientAnalytics.aiRecommendationEngine.priorities.medium"),
        low: t("clientAnalytics.aiRecommendationEngine.priorities.low"),
      },
    },
    learningReadiness: {
      title: t("clientAnalytics.learningReadiness.title"),
      readiness: t("clientAnalytics.learningReadiness.readiness"),
      data: t("clientAnalytics.learningReadiness.data"),
      models: t("clientAnalytics.learningReadiness.models"),
      accuracy: t("clientAnalytics.learningReadiness.accuracy"),
      overallScore: t("clientAnalytics.learningReadiness.overallScore"),
      checklist: t("clientAnalytics.learningReadiness.checklist"),
      missing: t("clientAnalytics.learningReadiness.missing"),
      campaignDataAvailable: t("clientAnalytics.learningReadiness.campaignDataAvailable"),
      engagementSignalsDiscovered: t("clientAnalytics.learningReadiness.engagementSignalsDiscovered"),
      conversionChannelsTracked: t("clientAnalytics.learningReadiness.conversionChannelsTracked"),
      brandIdentityUpdated: t("clientAnalytics.learningReadiness.brandIdentityUpdated"),
      audiencePatternDiscovered: t("clientAnalytics.learningReadiness.audiencePatternDiscovered"),
      offerPerformanceMeasured: t("clientAnalytics.learningReadiness.offerPerformanceMeasured"),
      competitorResponseData: t("clientAnalytics.learningReadiness.competitorResponseData"),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <AnalyticsHero labels={analyticsLabels.hero} />
        <PerformanceCommandOverview labels={analyticsLabels.performanceCommand} />
        <CampaignPerformancePanel labels={analyticsLabels.campaignPerformance} />
        <EngagementIntelligencePanel labels={analyticsLabels.engagementIntelligence} />
        <ConversionIntelligencePanel labels={analyticsLabels.conversionIntelligence} />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <AudienceLearningPanel labels={analyticsLabels.audienceLearning} />
            <BrandDNAEvolutionPanel labels={analyticsLabels.brandDNAAvolution} />
            <ContentPerformanceMatrix labels={analyticsLabels.contentPerformance} />
            <OfferPerformancePanel labels={analyticsLabels.offerPerformance} />
            <ChannelAttributionPanel labels={analyticsLabels.channelAttribution} />
            <SelfLearningSignalsPanel labels={analyticsLabels.selfLearningSignals} />
            <AIRecommendationEnginePanel labels={analyticsLabels.aiRecommendationEngine} />
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <LearningReadinessScore labels={analyticsLabels.learningReadiness} />
          </div>
        </div>
      </div>
    </div>
  );
}

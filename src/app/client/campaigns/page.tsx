import { CampaignStudioHero } from "@/components/client/campaigns/CampaignStudioHero";
import { CampaignModeSelector } from "@/components/client/campaigns/CampaignModeSelector";
import { BusinessModelRouter } from "@/components/client/campaigns/BusinessModelRouter";
import { ProductCampaignPanel } from "@/components/client/campaigns/ProductCampaignPanel";
import { ServiceCampaignPanel } from "@/components/client/campaigns/ServiceCampaignPanel";
import { HybridCampaignPanel } from "@/components/client/campaigns/HybridCampaignPanel";
import { ProductIntelligencePipeline } from "@/components/client/campaigns/ProductIntelligencePipeline";
import { ServiceMarketingEngine } from "@/components/client/campaigns/ServiceMarketingEngine";
import { MultiAgentDirectorPanel } from "@/components/client/campaigns/MultiAgentDirectorPanel";
import { CreativeBattleMode } from "@/components/client/campaigns/CreativeBattleMode";
import { CampaignPlanPreview } from "@/components/client/campaigns/CampaignPlanPreview";
import { UrgentLaunchPanel } from "@/components/client/campaigns/UrgentLaunchPanel";
import { ScheduleOrPublishPanel } from "@/components/client/campaigns/ScheduleOrPublishPanel";
import { CampaignReadinessScore } from "@/components/client/campaigns/CampaignReadinessScore";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("clientCampaigns.title"),
    description: t("clientCampaigns.subtitle"),
  };
}

export default async function CampaignsPage() {
  const t = await createServerTranslator();
  
  const campaignLabels = {
    hero: {
      title: t("clientCampaigns.hero.title"),
      subtitle: t("clientCampaigns.hero.subtitle"),
      newCampaign: t("clientCampaigns.hero.newCampaign"),
      urgentLaunch: t("clientCampaigns.hero.urgentLaunch"),
    },
    modeSelector: {
      smartCampaign: t("clientCampaigns.modeSelector.smartCampaign"),
      manualCampaign: t("clientCampaigns.modeSelector.manualCampaign"),
      smartDescription: t("clientCampaigns.modeSelector.smartDescription"),
      smartBestFor: t("clientCampaigns.modeSelector.smartBestFor"),
      productCampaign: t("clientCampaigns.modeSelector.productCampaign"),
      productDescription: t("clientCampaigns.modeSelector.productDescription"),
      productBestFor: t("clientCampaigns.modeSelector.productBestFor"),
      serviceCampaign: t("clientCampaigns.modeSelector.serviceCampaign"),
      serviceDescription: t("clientCampaigns.modeSelector.serviceDescription"),
      serviceBestFor: t("clientCampaigns.modeSelector.serviceBestFor"),
      urgentLaunch: t("clientCampaigns.modeSelector.urgentLaunch"),
      urgentDescription: t("clientCampaigns.modeSelector.urgentDescription"),
      urgentBestFor: t("clientCampaigns.modeSelector.urgentBestFor"),
    },
    businessModel: {
      product: t("clientCampaigns.businessModel.product"),
      service: t("clientCampaigns.businessModel.service"),
      hybrid: t("clientCampaigns.businessModel.hybrid"),
      title: t("clientCampaigns.businessModel.title"),
      productDescription: t("clientCampaigns.businessModel.productDescription"),
      productImageRequired: t("clientCampaigns.businessModel.productImageRequired"),
      visualFocusedCampaigns: t("clientCampaigns.businessModel.visualFocusedCampaigns"),
      studioPhotographyDirection: t("clientCampaigns.businessModel.studioPhotographyDirection"),
      productVideoConcepts: t("clientCampaigns.businessModel.productVideoConcepts"),
      serviceDescription: t("clientCampaigns.businessModel.serviceDescription"),
      trustBasedMarketing: t("clientCampaigns.businessModel.trustBasedMarketing"),
      beforeAfterTransformations: t("clientCampaigns.businessModel.beforeAfterTransformations"),
      emotionalComfortFocus: t("clientCampaigns.businessModel.emotionalComfortFocus"),
      customerOutcomeStories: t("clientCampaigns.businessModel.customerOutcomeStories"),
      hybridDescription: t("clientCampaigns.businessModel.hybridDescription"),
      productServiceCampaigns: t("clientCampaigns.businessModel.productServiceCampaigns"),
      bundleOffers: t("clientCampaigns.businessModel.bundleOffers"),
      afterSalesConfidence: t("clientCampaigns.businessModel.afterSalesConfidence"),
      multiAngleStorytelling: t("clientCampaigns.businessModel.multiAngleStorytelling"),
    },
    productPanel: {
      title: t("clientCampaigns.productPanel.title"),
      productName: t("clientCampaigns.productPanel.productName"),
      readiness: t("clientCampaigns.productPanel.readiness"),
      detectedCategory: t("clientCampaigns.productPanel.detectedCategory"),
      autoDetected: t("clientCampaigns.productPanel.autoDetected"),
      imageStatus: t("clientCampaigns.productPanel.imageStatus"),
      required: t("clientCampaigns.productPanel.required"),
      uploadImage: t("clientCampaigns.productPanel.uploadImage"),
      uploadDescription: t("clientCampaigns.productPanel.uploadDescription"),
      generatedDirections: t("clientCampaigns.productPanel.generatedDirections"),
      premiumStudioShot: t("clientCampaigns.productPanel.premiumStudioShot"),
      backAngleView: t("clientCampaigns.productPanel.backAngleView"),
      fortyFiveDegreeAngleShot: t("clientCampaigns.productPanel.fortyFiveDegreeAngleShot"),
      productOnExecutiveDesk: t("clientCampaigns.productPanel.productOnExecutiveDesk"),
      personUsingPhone: t("clientCampaigns.productPanel.personUsingPhone"),
      personListeningToMusic: t("clientCampaigns.productPanel.personListeningToMusic"),
      cameraFocusedLifestyleShot: t("clientCampaigns.productPanel.cameraFocusedLifestyleShot"),
      tenSecondProductVideo: t("clientCampaigns.productPanel.tenSecondProductVideo"),
      defaultImageStatus: t("clientCampaigns.productPanel.defaultImageStatus"),
    },
    servicePanel: {
      title: t("clientCampaigns.servicePanel.title"),
      serviceName: t("clientCampaigns.servicePanel.serviceName"),
      businessType: t("clientCampaigns.servicePanel.businessType"),
      contentStrategy: t("clientCampaigns.servicePanel.contentStrategy"),
      trustScore: t("clientCampaigns.servicePanel.trustScore"),
      autoDetected: t("clientCampaigns.servicePanel.autoDetected"),
      uploadBrief: t("clientCampaigns.servicePanel.uploadBrief"),
      uploadDescription: t("clientCampaigns.servicePanel.uploadDescription"),
      generatedContent: t("clientCampaigns.servicePanel.generatedContent"),
      example: t("clientCampaigns.servicePanel.example"),
      marketingStrategy: t("clientCampaigns.servicePanel.marketingStrategy"),
      problemSolution: t("clientCampaigns.servicePanel.problemSolution"),
      trustBuilding: t("clientCampaigns.servicePanel.trustBuilding"),
      beforeAfter: t("clientCampaigns.servicePanel.beforeAfter"),
      emotionalComfort: t("clientCampaigns.servicePanel.emotionalComfort"),
      campaignAngles: t("clientCampaigns.servicePanel.campaignAngles"),
      beforeAfterTransformation: t("clientCampaigns.servicePanel.beforeAfterTransformation"),
      showDramaticImprovement: t("clientCampaigns.servicePanel.showDramaticImprovement"),
      familyComfort: t("clientCampaigns.servicePanel.familyComfort"),
      focusOnPeaceOfMind: t("clientCampaigns.servicePanel.focusOnPeaceOfMind"),
      timeSaving: t("clientCampaigns.servicePanel.timeSaving"),
      emphasizeConvenience: t("clientCampaigns.servicePanel.emphasizeConvenience"),
      trustAndGuarantee: t("clientCampaigns.servicePanel.trustAndGuarantee"),
      buildTrust: t("clientCampaigns.servicePanel.buildTrust"),
      seasonalOffer: t("clientCampaigns.servicePanel.seasonalOffer"),
      limitedTimeUrgency: t("clientCampaigns.servicePanel.limitedTimeUrgency"),
      emergencyBooking: t("clientCampaigns.servicePanel.emergencyBooking"),
      available247: t("clientCampaigns.servicePanel.available247"),
      defaultServiceName: t("clientCampaigns.serviceStory.defaultServiceName"),
      defaultTagline: t("clientCampaigns.serviceStory.defaultTagline"),
    },
    hybridPanel: {
      title: t("clientCampaigns.hybridPanel.title"),
      productName: t("clientCampaigns.hybridPanel.productName"),
      serviceName: t("clientCampaigns.hybridPanel.serviceName"),
      balance: t("clientCampaigns.hybridPanel.balance"),
      readiness: t("clientCampaigns.hybridPanel.readiness"),
      autoDetected: t("clientCampaigns.hybridPanel.autoDetected"),
      uploadAssets: t("clientCampaigns.hybridPanel.uploadAssets"),
      uploadDescription: t("clientCampaigns.hybridPanel.uploadDescription"),
      generatedAssets: t("clientCampaigns.hybridPanel.generatedAssets"),
      example: t("clientCampaigns.hybridPanel.example"),
      systemCreates: t("clientCampaigns.hybridPanel.systemCreates"),
      productOffer: t("clientCampaigns.hybridPanel.productOffer"),
      premiumPhoneOffers: t("clientCampaigns.hybridPanel.premiumPhoneOffers"),
      repairTrustCampaign: t("clientCampaigns.hybridPanel.repairTrustCampaign"),
      focusOnServiceReliability: t("clientCampaigns.hybridPanel.focusOnServiceReliability"),
      bundleCampaign: t("clientCampaigns.hybridPanel.bundleCampaign"),
      productAndServiceBundles: t("clientCampaigns.hybridPanel.productAndServiceBundles"),
      deliveryServiceMessage: t("clientCampaigns.hybridPanel.deliveryServiceMessage"),
      highlightConvenience: t("clientCampaigns.hybridPanel.highlightConvenience"),
      postSaleTrust: t("clientCampaigns.hybridPanel.postSaleTrust"),
      supportGuarantee: t("clientCampaigns.hybridPanel.supportGuarantee"),
    },
    productIntelligence: {
      title: t("clientCampaigns.productIntelligence.title"),
      analyzing: t("clientCampaigns.productIntelligence.analyzing"),
      category: t("clientCampaigns.productIntelligence.category"),
      audience: t("clientCampaigns.productIntelligence.audience"),
      market: t("clientCampaigns.productIntelligence.market"),
      trends: t("clientCampaigns.productIntelligence.trends"),
      productInspection: t("clientCampaigns.productIntelligence.productInspection"),
      marketResearch: t("clientCampaigns.productIntelligence.marketResearch"),
      competitorDiscovery: t("clientCampaigns.productIntelligence.competitorDiscovery"),
      imageQualityAnalysis: t("clientCampaigns.productIntelligence.imageQualityAnalysis"),
      creativeDirection: t("clientCampaigns.productIntelligence.creativeDirection"),
      posterCreation: t("clientCampaigns.productIntelligence.posterCreation"),
      videoConcept: t("clientCampaigns.productIntelligence.videoConcept"),
      platformAdaptation: t("clientCampaigns.productIntelligence.platformAdaptation"),
      complete: t("clientCampaigns.productIntelligence.complete"),
      inProgress: t("clientCampaigns.productIntelligence.inProgress"),
      pending: t("clientCampaigns.productIntelligence.pending"),
      visualPreviewOnly: t("clientCampaigns.productIntelligence.visualPreviewOnly"),
    },
    serviceMarketing: {
      title: t("clientCampaigns.serviceMarketing.title"),
      analyzing: t("clientCampaigns.serviceMarketing.analyzing"),
      trust: t("clientCampaigns.serviceMarketing.trust"),
      storytelling: t("clientCampaigns.serviceMarketing.storytelling"),
      expertise: t("clientCampaigns.serviceMarketing.expertise"),
      differentiation: t("clientCampaigns.serviceMarketing.differentiation"),
      problemSolution: t("clientCampaigns.serviceMarketing.problemSolution"),
      addressCustomerPainPoints: t("clientCampaigns.serviceMarketing.addressCustomerPainPoints"),
      trustBuilding: t("clientCampaigns.serviceMarketing.trustBuilding"),
      establishCredibility: t("clientCampaigns.serviceMarketing.establishCredibility"),
      beforeAfter: t("clientCampaigns.serviceMarketing.beforeAfter"),
      showTransformation: t("clientCampaigns.serviceMarketing.showTransformation"),
      emotionalComfort: t("clientCampaigns.serviceMarketing.emotionalComfort"),
      appealToEmotions: t("clientCampaigns.serviceMarketing.appealToEmotions"),
      customerResult: t("clientCampaigns.serviceMarketing.customerResult"),
      highlightResults: t("clientCampaigns.serviceMarketing.highlightResults"),
      urgency: t("clientCampaigns.serviceMarketing.urgency"),
      createActionTrigger: t("clientCampaigns.serviceMarketing.createActionTrigger"),
    },
    multiAgentDirector: {
      title: t("clientCampaigns.multiAgentDirector.title"),
      marketingDirector: t("clientCampaigns.multiAgentDirector.marketingDirector"),
      creativeDirector: t("clientCampaigns.multiAgentDirector.creativeDirector"),
      productionDirector: t("clientCampaigns.multiAgentDirector.productionDirector"),
      publishingDirector: t("clientCampaigns.multiAgentDirector.publishingDirector"),
      learningDirector: t("clientCampaigns.multiAgentDirector.learningDirector"),
      collaboration: t("clientCampaigns.multiAgentDirector.collaboration"),
      decision: t("clientCampaigns.multiAgentDirector.decision"),
      consumerPsychologyDirector: t("clientCampaigns.multiAgentDirector.consumerPsychologyDirector"),
      brandGuardian: t("clientCampaigns.multiAgentDirector.brandGuardian"),
      growthDirector: t("clientCampaigns.multiAgentDirector.growthDirector"),
      active: t("clientCampaigns.multiAgentDirector.active"),
      targetTechEnthusiasts: t("clientCampaigns.multiAgentDirector.targetTechEnthusiasts"),
      emphasizeInnovation: t("clientCampaigns.multiAgentDirector.emphasizeInnovation"),
      simplePremiumVisual: t("clientCampaigns.multiAgentDirector.simplePremiumVisual"),
      createPremiumCinematic: t("clientCampaigns.multiAgentDirector.createPremiumCinematic"),
      ensureConsistency: t("clientCampaigns.multiAgentDirector.ensureConsistency"),
      multiPlatformLaunch: t("clientCampaigns.multiAgentDirector.multiPlatformLaunch"),
      optimizeConversion: t("clientCampaigns.multiAgentDirector.optimizeConversion"),
    },
    creativeBattle: {
      title: t("clientCampaigns.creativeBattle.title"),
      battleMode: t("clientCampaigns.creativeBattle.battleMode"),
      variants: t("clientCampaigns.creativeBattle.variants"),
      winner: t("clientCampaigns.creativeBattle.winner"),
      testing: t("clientCampaigns.creativeBattle.testing"),
      platform: t("clientCampaigns.creativeBattle.platform"),
      asset: t("clientCampaigns.creativeBattle.asset"),
      impact: t("clientCampaigns.creativeBattle.impact"),
      conceptALuxury: t("clientCampaigns.creativeBattle.conceptALuxury"),
      premiumAestheticsAttractTargetAudience: t("clientCampaigns.creativeBattle.premiumAestheticsAttractTargetAudience"),
      conceptBEmotional: t("clientCampaigns.creativeBattle.conceptBEmotional"),
      storytellingIncreasesEngagement: t("clientCampaigns.creativeBattle.storytellingIncreasesEngagement"),
      conceptCConversionFocus: t("clientCampaigns.creativeBattle.conceptCConversionFocus"),
      clearCallToActionAndValueProposition: t("clientCampaigns.creativeBattle.clearCallToActionAndValueProposition"),
      conceptDViral: t("clientCampaigns.creativeBattle.conceptDViral"),
      trendBasedContentPotential: t("clientCampaigns.creativeBattle.trendBasedContentPotential"),
    },
    campaignPlan: {
      title: t("clientCampaigns.campaignPlan.title"),
      timeline: t("clientCampaigns.campaignPlan.timeline"),
      budget: t("clientCampaigns.campaignPlan.budget"),
      channels: t("clientCampaigns.campaignPlan.channels"),
      kpis: t("clientCampaigns.campaignPlan.kpis"),
      campaignGoal: t("clientCampaigns.campaignPlan.campaignGoal"),
      audience: t("clientCampaigns.campaignPlan.audience"),
      creativeAngle: t("clientCampaigns.campaignPlan.creativeAngle"),
      outputAssets: t("clientCampaigns.campaignPlan.outputAssets"),
      platformVersions: t("clientCampaigns.campaignPlan.platformVersions"),
      recommendedSchedule: t("clientCampaigns.campaignPlan.recommendedSchedule"),
      cta: t("clientCampaigns.campaignPlan.cta"),
      week: t("clientCampaigns.campaignPlan.week"),
      awareness: t("clientCampaigns.campaignPlan.awareness"),
      engagement: t("clientCampaigns.campaignPlan.engagement"),
      conversion: t("clientCampaigns.campaignPlan.conversion"),
      poster: t("clientCampaigns.campaignPlan.poster"),
      tenSecondVideo: t("clientCampaigns.campaignPlan.tenSecondVideo"),
      socialStory: t("clientCampaigns.campaignPlan.socialStory"),
      offerAd: t("clientCampaigns.campaignPlan.offerAd"),
    },
    urgentLaunch: {
      title: t("clientCampaigns.urgentLaunch.title"),
      fastTrack: t("clientCampaigns.urgentLaunch.fastTrack"),
      immediate: t("clientCampaigns.urgentLaunch.immediate"),
      priority: t("clientCampaigns.urgentLaunch.priority"),
      launch: t("clientCampaigns.urgentLaunch.launch"),
      launchNow: t("clientCampaigns.urgentLaunch.launchNow"),
      createPosterNow: t("clientCampaigns.urgentLaunch.createPosterNow"),
      instantPosterCreation: t("clientCampaigns.urgentLaunch.instantPosterCreation"),
      create10SecondVideo: t("clientCampaigns.urgentLaunch.create10SecondVideo"),
      quickVideoConcept: t("clientCampaigns.urgentLaunch.quickVideoConcept"),
      launchOfferToday: t("clientCampaigns.urgentLaunch.launchOfferToday"),
      sameDayCampaign: t("clientCampaigns.urgentLaunch.sameDayCampaign"),
      createSocialCopy: t("clientCampaigns.urgentLaunch.createSocialCopy"),
      aiPoweredCopy: t("clientCampaigns.urgentLaunch.aiPoweredCopy"),
      prepareCampaignPack: t("clientCampaigns.urgentLaunch.prepareCampaignPack"),
      fullAssetPack: t("clientCampaigns.urgentLaunch.fullAssetPack"),
      previewOnly: t("clientCampaigns.urgentLaunch.previewOnly"),
    },
    schedulePublish: {
      title: t("clientCampaigns.schedulePublish.title"),
      schedule: t("clientCampaigns.schedulePublish.schedule"),
      publish: t("clientCampaigns.schedulePublish.publish"),
      calendar: t("clientCampaigns.schedulePublish.calendar"),
      queue: t("clientCampaigns.schedulePublish.queue"),
      saveDraft: t("clientCampaigns.schedulePublish.saveDraft"),
      publishCampaign: t("clientCampaigns.schedulePublish.publishCampaign"),
      saveAsDraft: t("clientCampaigns.schedulePublish.saveAsDraft"),
      saveForLater: t("clientCampaigns.schedulePublish.saveForLater"),
      scheduleCampaign: t("clientCampaigns.schedulePublish.scheduleCampaign"),
      setLaunchDate: t("clientCampaigns.schedulePublish.setLaunchDate"),
      prepareForPublishing: t("clientCampaigns.schedulePublish.prepareForPublishing"),
      prepareAssets: t("clientCampaigns.schedulePublish.prepareAssets"),
      urgentLaunch: t("clientCampaigns.schedulePublish.urgentLaunch"),
      launchNow: t("clientCampaigns.schedulePublish.launchNow"),
      previewOnly: t("clientCampaigns.schedulePublish.previewOnly"),
    },
    readinessScore: {
      title: t("clientCampaigns.readinessScore.title"),
      overall: t("clientCampaigns.readinessScore.overall"),
      assets: t("clientCampaigns.readinessScore.assets"),
      content: t("clientCampaigns.readinessScore.content"),
      targeting: t("clientCampaigns.readinessScore.targeting"),
      ready: t("clientCampaigns.readinessScore.ready"),
      brandIdentityQuality: t("clientCampaigns.readinessScore.brandIdentityQuality"),
      productServiceData: t("clientCampaigns.readinessScore.productServiceData"),
      visualReadiness: t("clientCampaigns.readinessScore.visualReadiness"),
      audienceFit: t("clientCampaigns.readinessScore.audienceFit"),
      creativeStrength: t("clientCampaigns.readinessScore.creativeStrength"),
      platformReadiness: t("clientCampaigns.readinessScore.platformReadiness"),
      excellent: t("clientCampaigns.readinessScore.excellent"),
      good: t("clientCampaigns.readinessScore.good"),
      statusExcellent: t("clientCampaigns.readinessScore.statusExcellent"),
      statusGood: t("clientCampaigns.readinessScore.statusGood"),
    },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <CampaignStudioHero 
          title={campaignLabels.hero.title}
          subtitle={campaignLabels.hero.subtitle}
          newCampaign={campaignLabels.hero.newCampaign}
          urgentLaunch={campaignLabels.hero.urgentLaunch}
        />
        <CampaignModeSelector activeMode={campaignLabels.modeSelector.smartCampaign} labels={campaignLabels.modeSelector} />
        <BusinessModelRouter activeModel={campaignLabels.businessModel.product} labels={campaignLabels.businessModel} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 columns (75% extended main) */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductCampaignPanel labels={campaignLabels.productPanel} />
                <ServiceCampaignPanel labels={campaignLabels.servicePanel} />
              </div>

              <HybridCampaignPanel labels={campaignLabels.hybridPanel} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProductIntelligencePipeline labels={campaignLabels.productIntelligence} />
                <ServiceMarketingEngine labels={campaignLabels.serviceMarketing} />
              </div>

              <MultiAgentDirectorPanel labels={campaignLabels.multiAgentDirector} />
              <CreativeBattleMode labels={campaignLabels.creativeBattle} />
              <CampaignPlanPreview labels={campaignLabels.campaignPlan} />
            </div>
          </div>

          {/* Right Side Panels - 3 columns (25% compact support) */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <UrgentLaunchPanel labels={campaignLabels.urgentLaunch} />
              <ScheduleOrPublishPanel labels={campaignLabels.schedulePublish} />
              <CampaignReadinessScore labels={campaignLabels.readinessScore} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

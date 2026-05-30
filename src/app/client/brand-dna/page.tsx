import { BrandDNAHero } from "@/components/client/brand-dna/BrandDNAHero";
import { BrandDNASummary } from "@/components/client/brand-dna/BrandDNASummary";
import { DNATabs } from "@/components/client/brand-dna/DNATabs";
import { BrandProfileCard } from "@/components/client/brand-dna/BrandProfileCard";
import { AudienceIntelligenceCard } from "@/components/client/brand-dna/AudienceIntelligenceCard";
import { BrandPersonalityCard } from "@/components/client/brand-dna/BrandPersonalityCard";
import { ProductIntelligenceCard } from "@/components/client/brand-dna/ProductIntelligenceCard";
import { CompetitorIntelligenceCard } from "@/components/client/brand-dna/CompetitorIntelligenceCard";
import { BrandVoiceToneCard } from "@/components/client/brand-dna/BrandVoiceToneCard";
import { VisualLanguageCard } from "@/components/client/brand-dna/VisualLanguageCard";
import { AIStrategicInsightsCard } from "@/components/client/brand-dna/AIStrategicInsightsCard";
import { DNATimelinePanel } from "@/components/client/brand-dna/DNATimelinePanel";
import { LearningSourcesPanel } from "@/components/client/brand-dna/LearningSourcesPanel";
import { AIBrainStatusPanel } from "@/components/client/brand-dna/AIBrainStatusPanel";

import { getTranslations } from "next-intl/server";

export default async function BrandDnaPage() {
  const t = await getTranslations();

  const brandDNALabels = {
    hero: {
      exportReport: t("clientBrandDNA.exportReport"),
      aiAnalyzeBrand: t("clientBrandDNA.aiAnalyzeBrand"),
    },
    summary: {
      brandDNAScore: t("clientBrandDNA.brandDNAScore"),
      updated: t("common.updated"),
      sources: t("common.sources"),
    },
    brandProfile: {
      title: t("clientBrandDNA.brandProfile"),
      brandName: t("clientBrandDNA.brandName"),
      website: t("clientBrandDNA.website"),
      founded: t("clientBrandDNA.founded"),
      mission: t("clientBrandDNA.mission"),
      defaultMission: t("clientBrandDNA.defaultMission"),
    },
    audienceIntelligence: {
      title: t("clientBrandDNA.audienceIntelligence.title"),
      primaryAudience: t("clientBrandDNA.audienceIntelligence.primaryAudience"),
      ageRange: t("clientBrandDNA.audienceIntelligence.ageRange"),
      location: t("clientBrandDNA.audienceIntelligence.location"),
      topInterests: t("clientBrandDNA.audienceIntelligence.topInterests"),
      purchaseDrivers: t("clientBrandDNA.audienceIntelligence.purchaseDrivers"),
    },
    brandPersonality: {
      title: t("clientBrandDNA.brandPersonality.title"),
    },
    productIntelligence: {
      title: t("clientBrandDNA.productIntelligence"),
      uploadProductImages: t("clientBrandDNA.uploadProductImages"),
      uploadDescription: t("clientBrandDNA.uploadDescription"),
      chooseImages: t("clientBrandDNA.chooseImages"),
      currentProductImages: t("clientBrandDNA.currentProductImages"),
      keyProducts: t("clientBrandDNA.keyProducts"),
      viewAllProducts: t("clientBrandDNA.viewAllProducts"),
    },
    competitorIntelligence: {
      title: t("clientBrandDNA.competitorIntelligence.title"),
      trackedCompetitors: t("clientBrandDNA.competitorIntelligence.trackedCompetitors"),
      identifiedMarketGaps: t("clientBrandDNA.competitorIntelligence.identifiedMarketGaps"),
      viewFullAnalysis: t("clientBrandDNA.competitorIntelligence.viewFullAnalysis"),
    },
    brandVoiceTone: {
      title: t("clientBrandDNA.brandVoiceTone.title"),
      voice: t("clientBrandDNA.brandVoiceTone.voice"),
      tone: t("clientBrandDNA.brandVoiceTone.tone"),
      language: t("clientBrandDNA.brandVoiceTone.language"),
      viewVoiceGuide: t("clientBrandDNA.brandVoiceTone.viewVoiceGuide"),
    },
    visualLanguage: {
      title: t("clientBrandDNA.visualLanguage.title"),
      visualMood: t("clientBrandDNA.visualLanguage.visualMood"),
      colorPalette: t("clientBrandDNA.visualLanguage.colorPalette"),
      fontFamily: t("clientBrandDNA.visualLanguage.fontFamily"),
      logoStatus: t("clientBrandDNA.visualLanguage.logoStatus"),
      viewGuidelines: t("clientBrandDNA.visualLanguage.viewGuidelines"),
    },
    aiStrategicInsights: {
      title: t("clientBrandDNA.aiStrategicInsights.title"),
      viewAllRecommendations: t("clientBrandDNA.aiStrategicInsights.viewAllRecommendations"),
    },
    dnaTimeline: {
      title: t("clientBrandDNA.dnaTimeline.title"),
      events: [
        { event: t("clientBrandDNA.dnaTimeline.event0"), time: t("clientBrandDNA.dnaTimeline.event0Time") },
        { event: t("clientBrandDNA.dnaTimeline.event1"), time: t("clientBrandDNA.dnaTimeline.event1Time") },
        { event: t("clientBrandDNA.dnaTimeline.event2"), time: t("clientBrandDNA.dnaTimeline.event2Time") },
        { event: t("clientBrandDNA.dnaTimeline.event3"), time: t("clientBrandDNA.dnaTimeline.event3Time") },
        { event: t("clientBrandDNA.dnaTimeline.event4"), time: t("clientBrandDNA.dnaTimeline.event4Time") },
      ],
    },
    learningSources: {
      title: t("clientBrandDNA.learningSources.title"),
    },
    aiBrainStatus: {
      title: t("clientBrandDNA.aiBrainStatus"),
      status: t("clientBrandDNA.status"),
      learningRate: t("clientBrandDNA.learningRate"),
      confidence: t("clientBrandDNA.confidence"),
      patternRecognition: t("clientBrandDNA.patternRecognition"),
      dataQuality: t("clientBrandDNA.dataQuality"),
      defaultDataQuality: t("clientBrandDNA.defaultDataQuality"),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <BrandDNAHero labels={brandDNALabels.hero} />
        <BrandDNASummary labels={brandDNALabels.summary} />
        <DNATabs activeTab="Overview" />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrandProfileCard labels={brandDNALabels.brandProfile} />
              <AudienceIntelligenceCard labels={brandDNALabels.audienceIntelligence} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BrandPersonalityCard labels={brandDNALabels.brandPersonality} />
              <ProductIntelligenceCard labels={brandDNALabels.productIntelligence} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CompetitorIntelligenceCard labels={brandDNALabels.competitorIntelligence} />
              <BrandVoiceToneCard labels={brandDNALabels.brandVoiceTone} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <VisualLanguageCard labels={brandDNALabels.visualLanguage} />
              <AIStrategicInsightsCard labels={brandDNALabels.aiStrategicInsights} />
            </div>
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <DNATimelinePanel labels={brandDNALabels.dnaTimeline} />
            <LearningSourcesPanel labels={brandDNALabels.learningSources} />
            <AIBrainStatusPanel labels={brandDNALabels.aiBrainStatus} />
          </div>
        </div>
      </div>
    </div>
  );
}

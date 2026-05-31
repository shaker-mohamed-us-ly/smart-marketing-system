import { RecommendationsHero } from "@/components/client/recommendations/RecommendationsHero";
import { NextBestActionsPanel } from "@/components/client/recommendations/NextBestActionsPanel";
import { PriorityRecommendationsPanel } from "@/components/client/recommendations/PriorityRecommendationsPanel";
import { GrowthOpportunitiesPanel } from "@/components/client/recommendations/GrowthOpportunitiesPanel";
import { CreativeImprovementPanel } from "@/components/client/recommendations/CreativeImprovementPanel";
import { OfferStrategyRecommendations } from "@/components/client/recommendations/OfferStrategyRecommendations";
import { PublishingRecommendationsPanel } from "@/components/client/recommendations/PublishingRecommendationsPanel";
import { ConversionFixesPanel } from "@/components/client/recommendations/ConversionFixesPanel";
import { AudienceLearningRecommendations } from "@/components/client/recommendations/AudienceLearningRecommendations";
import { BrandDNARecommendations } from "@/components/client/recommendations/BrandDNARecommendations";
import { CompetitorSignalRecommendations } from "@/components/client/recommendations/CompetitorSignalRecommendations";
import { RecommendationConfidencePanel } from "@/components/client/recommendations/RecommendationConfidencePanel";
import { ActionImpactSimulator } from "@/components/client/recommendations/ActionImpactSimulator";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { getTranslations } from "next-intl/server";

export default async function RecommendationsPage() {
  const t = await getTranslations();

  const recommendationsLabels = {
    actionImpactSimulator: {
      title: t("clientRecommendations.actionImpactSimulator.title"),
    },
    audienceLearningRecommendations: {
      title: t("clientRecommendations.audienceLearning.title"),
    },
    brandDNARecommendations: {
      title: t("clientRecommendations.brandDNARecommendations.title"),
    },
    competitorSignalRecommendations: {
      title: t("clientRecommendations.competitorSignalRecommendations"),
      subtitle: t("clientRecommendations.optionalNotMandatory"),
    },
    conversionFixes: {
      title: t("clientRecommendations.conversionFixes.title"),
    },
    creativeImprovements: {
      title: t("clientRecommendations.creativeImprovement.title"),
    },
    growthOpportunities: {
      title: t("clientRecommendations.growthOpportunities.title"),
    },
    nextBestActions: {
      title: t("clientRecommendations.nextBestActions"),
      recommendations: t("common.recommendations"),
      priorities: {
        critical: t("clientRecommendations.nextBestActionsPanel.priorities.critical"),
        high: t("clientRecommendations.nextBestActionsPanel.priorities.high"),
        medium: t("clientRecommendations.nextBestActionsPanel.priorities.medium"),
        low: t("clientRecommendations.nextBestActionsPanel.priorities.low"),
      },
    },
    offerStrategyRecommendations: {
      title: t("clientRecommendations.offerStrategyRecommendations"),
    },
    priorityRecommendations: {
      title: t("clientRecommendations.priorityRecommendations"),
      recommendations: t("common.recommendations"),
      priorities: {
        critical: t("clientRecommendations.priorityRecommendationsPanel.priorities.critical"),
        high: t("clientRecommendations.priorityRecommendationsPanel.priorities.high"),
        medium: t("clientRecommendations.priorityRecommendationsPanel.priorities.medium"),
        low: t("clientRecommendations.priorityRecommendationsPanel.priorities.low"),
      },
    },
    publishingRecommendations: {
      title: t("clientRecommendations.publishingRecommendations"),
    },
    recommendationConfidence: {
      title: t("clientRecommendations.recommendationConfidence"),
      overallConfidence: t("clientRecommendations.overallConfidence"),
      factors: t("clientRecommendations.factors"),
      statusStrong: t("clientRecommendations.confidencePanel.statusStrong"),
      statusExcellent: t("clientRecommendations.confidencePanel.statusExcellent"),
      statusGood: t("clientRecommendations.confidencePanel.statusGood"),
      statusMedium: t("clientRecommendations.confidencePanel.statusMedium"),
      statusMissing: t("clientRecommendations.confidencePanel.statusMissing"),
    },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <RecommendationsHero
          labels={{
            title: t("common.recommendations"),
            subtitle: t("clientRecommendations.heroSubtitle"),
            generateRecommendations: t("common.generateRecommendations"),
            exportActionPlan: t("common.exportActionPlan")
          }}
        />
        <NextBestActionsPanel labels={recommendationsLabels.nextBestActions} />
        <PriorityRecommendationsPanel labels={recommendationsLabels.priorityRecommendations} />
        <GrowthOpportunitiesPanel labels={recommendationsLabels.growthOpportunities} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <CreativeImprovementPanel labels={recommendationsLabels.creativeImprovements} />
              <OfferStrategyRecommendations labels={recommendationsLabels.offerStrategyRecommendations} />
              <PublishingRecommendationsPanel labels={recommendationsLabels.publishingRecommendations} />
              <ConversionFixesPanel labels={recommendationsLabels.conversionFixes} />
              <AudienceLearningRecommendations labels={recommendationsLabels.audienceLearningRecommendations} />
              <BrandDNARecommendations labels={recommendationsLabels.brandDNARecommendations} />
              <CompetitorSignalRecommendations labels={recommendationsLabels.competitorSignalRecommendations} />
            </div>
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <RecommendationConfidencePanel labels={recommendationsLabels.recommendationConfidence} />
              <ActionImpactSimulator labels={recommendationsLabels.actionImpactSimulator} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

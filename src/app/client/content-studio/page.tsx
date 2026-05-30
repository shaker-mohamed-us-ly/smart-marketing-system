import { ContentStudioHero } from "@/components/client/content-studio/ContentStudioHero";
import { CreativePipelineOverview } from "@/components/client/content-studio/CreativePipelineOverview";
import { ProductionBriefPanel } from "@/components/client/content-studio/ProductionBriefPanel";
import { AssetTypeSelector } from "@/components/client/content-studio/AssetTypeSelector";
import { ProductAssetWorkbench } from "@/components/client/content-studio/ProductAssetWorkbench";
import { ServiceStoryWorkbench } from "@/components/client/content-studio/ServiceStoryWorkbench";
import { CreativeDirectorInstructions } from "@/components/client/content-studio/CreativeDirectorInstructions";
import { ProductionDirectorPromptPanel } from "@/components/client/content-studio/ProductionDirectorPromptPanel";
import { AssetVariationGrid } from "@/components/client/content-studio/AssetVariationGrid";
import { VideoStoryboardPanel } from "@/components/client/content-studio/VideoStoryboardPanel";
import { CopywritingPanel } from "@/components/client/content-studio/CopywritingPanel";
import { PlatformAdaptationPanel } from "@/components/client/content-studio/PlatformAdaptationPanel";
import { BrandGuardianReview } from "@/components/client/content-studio/BrandGuardianReview";
import { ApprovalQueuePanel } from "@/components/client/content-studio/ApprovalQueuePanel";

import { getTranslations } from "next-intl/server";

export default async function ContentStudioPage() {
  const t = await getTranslations();

  const contentStudioLabels = {
    hero: {
      newCreative: t("clientContentStudio.hero.newCreative"),
      generateAssetPack: t("clientContentStudio.hero.generateAssetPack"),
    },
    creativePipeline: {
      title: t("clientContentStudio.creativePipeline.title"),
    },
    productionBrief: {
      title: t("clientContentStudio.productionBrief.title"),
      campaign: t("clientContentStudio.productionBrief.campaign"),
      goal: t("clientContentStudio.productionBrief.goal"),
      audience: t("clientContentStudio.productionBrief.audience"),
      mainEmotion: t("clientContentStudio.productionBrief.mainEmotion"),
      cta: t("clientContentStudio.productionBrief.cta"),
    },
    assetTypeSelector: {
      title: t("clientContentStudio.assetType.title"),
    },
    productAssetWorkbench: {
      title: t("clientContentStudio.productAssetWorkbench"),
      product: t("clientContentStudio.product"),
      readiness: t("clientContentStudio.readiness"),
      detectedCategory: t("clientContentStudio.detectedCategory"),
      autoDetected: t("clientContentStudio.autoDetected"),
      imageStatus: t("clientContentStudio.imageStatus"),
      required: t("clientContentStudio.required"),
      uploadProductImage: t("clientContentStudio.uploadProductImage"),
      uploadDescription: t("clientContentStudio.uploadDescription"),
      generatedVisualDirections: t("clientContentStudio.generatedVisualDirections"),
      defaultImageStatus: t("clientContentStudio.productAsset.defaultImageStatus"),
    },
    serviceStoryWorkbench: {
      title: t("clientContentStudio.serviceStoryWorkbench"),
      example: t("clientContentStudio.example"),
      storyDirections: t("clientContentStudio.storyDirections"),
      keyMessage: t("clientContentStudio.keyMessage"),
    },
    creativeDirectorInstructions: {
      title: t("clientContentStudio.creativeDirector.title"),
      visualObjective: t("clientContentStudio.creativeDirector.visualObjective"),
      emotionalObjective: t("clientContentStudio.creativeDirector.emotionalObjective"),
      compositionDirection: t("clientContentStudio.creativeDirector.compositionDirection"),
      whatToAvoid: t("clientContentStudio.creativeDirector.whatToAvoid"),
      brandConsistencyNotes: t("clientContentStudio.creativeDirector.brandConsistencyNotes"),
    },
    productionDirectorPrompt: {
      title: t("clientContentStudio.productionDirector.title"),
      professionalProductionInstructions: t("clientContentStudio.productionDirector.professionalProductionInstructions"),
      description: t("clientContentStudio.productionDirector.description"),
    },
    assetVariationGrid: {
      title: t("clientContentStudio.assetVariations.title"),
    },
    videoStoryboard: {
      title: t("clientContentStudio.videoStoryboard.title"),
      description: t("clientContentStudio.videoStoryboard.description"),
    },
    copywriting: {
      title: t("clientContentStudio.copywriting.title"),
      hook: t("clientContentStudio.copywriting.hook"),
      caption: t("clientContentStudio.copywriting.caption"),
      cta: t("clientContentStudio.copywriting.cta"),
      hashtags: t("clientContentStudio.copywriting.hashtags"),
      platformCopyVariants: t("clientContentStudio.copywriting.platformCopyVariants"),
    },
    platformAdaptation: {
      title: t("clientContentStudio.platformAdaptation.title"),
    },
    brandGuardianReview: {
      title: t("clientContentStudio.brandGuardian.title"),
      riskAssessment: t("clientContentStudio.brandGuardian.riskAssessment"),
    },
    approvalQueue: {
      title: t("clientContentStudio.approvalQueue.title"),
      approveAssetPack: t("clientContentStudio.approvalQueue.approveAssetPack"),
      requestChanges: t("clientContentStudio.approvalQueue.requestChanges"),
      saveDraft: t("clientContentStudio.approvalQueue.saveDraft"),
      visualOnly: t("clientContentStudio.approvalQueue.visualOnly"),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <ContentStudioHero labels={contentStudioLabels.hero} />
        <CreativePipelineOverview labels={contentStudioLabels.creativePipeline} />
        <ProductionBriefPanel labels={contentStudioLabels.productionBrief} />
        <AssetTypeSelector activeType={t("clientContentStudio.assetType.poster")} labels={contentStudioLabels.assetTypeSelector} />

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductAssetWorkbench labels={contentStudioLabels.productAssetWorkbench} />
              <ServiceStoryWorkbench labels={contentStudioLabels.serviceStoryWorkbench} />
            </div>

            <CreativeDirectorInstructions labels={contentStudioLabels.creativeDirectorInstructions} />
            <ProductionDirectorPromptPanel labels={contentStudioLabels.productionDirectorPrompt} />
            <AssetVariationGrid labels={contentStudioLabels.assetVariationGrid} />
            <VideoStoryboardPanel labels={contentStudioLabels.videoStoryboard} />
            <CopywritingPanel labels={contentStudioLabels.copywriting} />
            <PlatformAdaptationPanel labels={contentStudioLabels.platformAdaptation} />
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className="col-span-12 lg:col-span-3 space-y-6">
            <BrandGuardianReview labels={contentStudioLabels.brandGuardianReview} />
            <ApprovalQueuePanel labels={contentStudioLabels.approvalQueue} />
          </div>
        </div>
      </div>
    </div>
  );
}

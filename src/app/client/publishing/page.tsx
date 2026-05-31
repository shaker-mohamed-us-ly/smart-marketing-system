import { PublishingHero } from "@/components/client/publishing/PublishingHero";
import { CampaignPublishPreview } from "@/components/client/publishing/CampaignPublishPreview";
import { PlatformSelectionGrid } from "@/components/client/publishing/PlatformSelectionGrid";
import { ContactStrategyPanel } from "@/components/client/publishing/ContactStrategyPanel";
import { CTAEnginePanel } from "@/components/client/publishing/CTAEnginePanel";
import { DMConversationStrategy } from "@/components/client/publishing/DMConversationStrategy";
import { CommentConversionStrategy } from "@/components/client/publishing/CommentConversionStrategy";
import { WhatsAppFlowPreview } from "@/components/client/publishing/WhatsAppFlowPreview";
import { PhoneCallStrategyPanel } from "@/components/client/publishing/PhoneCallStrategyPanel";
import { SchedulePlannerPanel } from "@/components/client/publishing/SchedulePlannerPanel";
import { PublishingReadinessPanel } from "@/components/client/publishing/PublishingReadinessPanel";
import { ApprovalAndLaunchPanel } from "@/components/client/publishing/ApprovalAndLaunchPanel";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { getTranslations } from "next-intl/server";

export default async function PublishingPage() {
  const t = await getTranslations();

  const publishingLabels = {
    hero: {
      saveDraft: t("clientPublishing.hero.saveDraft"),
      publishCampaign: t("clientPublishing.hero.publishCampaign"),
    },
    campaignPublishPreview: {
      title: t("clientPublishing.campaignPublishPreview"),
      campaign: t("clientPublishing.campaign"),
      assetsReady: t("clientPublishing.assetsReady"),
      platforms: t("clientPublishing.platforms"),
      campaignStatus: t("clientPublishing.campaignStatus"),
    },
    platformSelection: {
      title: t("clientPublishing.platformSelection.title"),
      audienceMatch: t("clientPublishing.platformSelection.audienceMatch"),
    },
    contactStrategy: {
      title: t("clientPublishing.contactStrategy.title"),
      selectedStrategy: t("clientPublishing.contactStrategy.selectedStrategy"),
    },
    ctaEngine: {
      title: t("clientPublishing.ctaEngine.title"),
    },
    dmConversationStrategy: {
      title: t("clientPublishing.dmConversationStrategy"),
    },
    commentConversionStrategy: {
      title: t("clientPublishing.commentConversion.title"),
      description: t("clientPublishing.commentConversion.description"),
    },
    whatsappFlowPreview: {
      title: t("clientPublishing.whatsappFlow.title"),
      description: t("clientPublishing.whatsappFlow.description"),
      visualUXOnly: t("clientPublishing.whatsappFlow.visualUXOnly"),
    },
    phoneCallStrategy: {
      title: t("clientPublishing.phoneCallStrategy.title"),
      whenPhoneWorksBest: t("clientPublishing.phoneCallStrategy.whenPhoneWorksBest"),
      recommendedCallCTAExamples: t("clientPublishing.phoneCallStrategy.recommendedCallCTAExamples"),
    },
    schedulePlanner: {
      title: t("clientPublishing.schedulePlanner.title"),
      bestPublishingTime: t("clientPublishing.schedulePlanner.bestPublishingTime"),
      timeframe: t("clientPublishing.schedulePlanner.timeframe"),
      visualSchedulingOnly: t("clientPublishing.schedulePlanner.visualSchedulingOnly"),
    },
    publishingReadiness: {
      title: t("clientPublishing.readiness.title"),
      overallScore: t("clientPublishing.readiness.overallScore"),
      checklist: t("clientPublishing.readiness.checklist"),
      missing: t("clientPublishing.readiness.missing"),
    },
    approvalAndLaunch: {
      title: t("clientPublishing.approval.title"),
      status: t("clientPublishing.approval.status"),
      publishNow: t("clientPublishing.approval.publishNow"),
      scheduleCampaign: t("clientPublishing.approval.scheduleCampaign"),
      prepareForPublishing: t("clientPublishing.approval.prepareForPublishing"),
      saveDraft: t("clientPublishing.approval.saveDraft"),
    },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <PublishingHero labels={publishingLabels.hero} />
        <CampaignPublishPreview labels={publishingLabels.campaignPublishPreview} />
        <PlatformSelectionGrid labels={publishingLabels.platformSelection} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <ContactStrategyPanel labels={publishingLabels.contactStrategy} />
              <CTAEnginePanel labels={publishingLabels.ctaEngine} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DMConversationStrategy labels={publishingLabels.dmConversationStrategy} />
                <CommentConversionStrategy labels={publishingLabels.commentConversionStrategy} />
              </div>
              <WhatsAppFlowPreview labels={publishingLabels.whatsappFlowPreview} />
              <PhoneCallStrategyPanel labels={publishingLabels.phoneCallStrategy} />
              <SchedulePlannerPanel labels={publishingLabels.schedulePlanner} />
            </div>
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <PublishingReadinessPanel labels={publishingLabels.publishingReadiness} />
              <ApprovalAndLaunchPanel labels={publishingLabels.approvalAndLaunch} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { BrainHero } from "@/components/control/ai-brain/BrainHero";
import { BrainHealthOverview } from "@/components/control/ai-brain/BrainHealthOverview";
import { DirectorsGrid } from "@/components/control/ai-brain/DirectorsGrid";
import { DirectorCollaborationMap } from "@/components/control/ai-brain/DirectorCollaborationMap";
import { BrainDecisionTimeline } from "@/components/control/ai-brain/BrainDecisionTimeline";
import { BrainConfidencePanel } from "@/components/control/ai-brain/BrainConfidencePanel";
import { BrainMemoryPanel } from "@/components/control/ai-brain/BrainMemoryPanel";
import { BrainSignalsPanel } from "@/components/control/ai-brain/BrainSignalsPanel";
import { BrainThinkingStatus } from "@/components/control/ai-brain/BrainThinkingStatus";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("controlAIBrain.title"),
    description: t("controlAIBrain.subtitle"),
  };
}

export default async function ControlAiBrainPage() {
  const t = await createServerTranslator();
  
  const brainLabels = {
    hero: {
      title: t("controlAIBrain.hero.title"),
      subtitle: t("controlAIBrain.hero.subtitle"),
      runBrainAnalysis: t("common.runBrainAnalysis"),
      generateIntelligenceReport: t("common.generateIntelligenceReport"),
    },
    healthOverview: {
      title: t("controlAIBrain.healthOverview.title"),
      health: t("controlAIBrain.healthOverview.health"),
      status: t("controlAIBrain.healthOverview.status"),
      operational: t("controlAIBrain.healthOverview.operational"),
      learning: t("controlAIBrain.healthOverview.learning"),
      optimizing: t("controlAIBrain.healthOverview.optimizing"),
    },
    directors: {
      marketingDirector: t("controlAIBrain.directors.marketingDirector"),
      creativeDirector: t("controlAIBrain.directors.creativeDirector"),
      productionDirector: t("controlAIBrain.directors.productionDirector"),
      publishingDirector: t("controlAIBrain.directors.publishingDirector"),
      learningDirector: t("controlAIBrain.directors.learningDirector"),
    },
    collaboration: {
      title: t("controlAIBrain.collaboration.title"),
      collaboration: t("controlAIBrain.collaboration.collaboration"),
      coordination: t("controlAIBrain.collaboration.coordination"),
      sync: t("controlAIBrain.collaboration.sync"),
    },
    timeline: {
      title: t("controlAIBrain.timeline.title"),
      timeline: t("controlAIBrain.timeline.timeline"),
      decisions: t("controlAIBrain.timeline.decisions"),
      confidence: t("controlAIBrain.timeline.confidence"),
      execution: t("controlAIBrain.timeline.execution"),
    },
    confidence: {
      title: t("controlAIBrain.confidence.title"),
      confidence: t("controlAIBrain.confidence.confidence"),
      accuracy: t("controlAIBrain.confidence.accuracy"),
      prediction: t("controlAIBrain.confidence.prediction"),
      reliability: t("controlAIBrain.confidence.reliability"),
    },
    memory: {
      title: t("controlAIBrain.memory.title"),
      memory: t("controlAIBrain.memory.memory"),
      storage: t("controlAIBrain.memory.storage"),
      retrieval: t("controlAIBrain.memory.retrieval"),
      learning: t("controlAIBrain.memory.learning"),
    },
    signals: {
      title: t("controlAIBrain.signals.title"),
      signals: t("controlAIBrain.signals.signals"),
      input: t("controlAIBrain.signals.input"),
      processing: t("controlAIBrain.signals.processing"),
      output: t("controlAIBrain.signals.output"),
    },
    thinkingStatus: {
      title: t("controlAIBrain.thinkingStatus.title"),
      thinking: t("controlAIBrain.thinkingStatus.thinking"),
      status: t("controlAIBrain.thinkingStatus.status"),
      progress: t("controlAIBrain.thinkingStatus.progress"),
      completion: t("controlAIBrain.thinkingStatus.completion"),
    },
    directorCards: {
      thinking: t("controlAIBrain.directorCards.thinking"),
    },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <BrainHero 
          labels={brainLabels.hero}
        />
        <BrainHealthOverview labels={brainLabels.healthOverview} />
        <DirectorsGrid labels={brainLabels.directors} directorCards={brainLabels.directorCards} />
        <DirectorCollaborationMap labels={brainLabels.collaboration} />
        <BrainDecisionTimeline labels={brainLabels.timeline} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 columns (75% extended main) */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <BrainConfidencePanel labels={brainLabels.confidence} />
              <BrainMemoryPanel labels={brainLabels.memory} />
              <BrainSignalsPanel labels={brainLabels.signals} />
            </div>
          </div>

          {/* Right Side Panels - 3 columns (25% compact support) */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <BrainThinkingStatus labels={brainLabels.thinkingStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

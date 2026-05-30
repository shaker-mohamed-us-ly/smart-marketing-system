import { OperationsHero } from "@/components/control/integrations/OperationsHero";
import { MonthlyCostIntelligence } from "@/components/control/integrations/MonthlyCostIntelligence";
import { ProviderPerformanceTable } from "@/components/control/integrations/ProviderPerformanceTable";
import { OptimizationRecommendations } from "@/components/control/integrations/OptimizationRecommendations";
import { ProviderCardsGrid } from "@/components/control/integrations/ProviderCardsGrid";
import { GenerationRouterPreview } from "@/components/control/integrations/GenerationRouterPreview";
import { PromptObedienceScore } from "@/components/control/integrations/PromptObedienceScore";
import { CreativeQualityMonitor } from "@/components/control/integrations/CreativeQualityMonitor";
import { SmartKnowledgeSources } from "@/components/control/integrations/SmartKnowledgeSources";
import { InfrastructureRiskAlerts } from "@/components/control/integrations/InfrastructureRiskAlerts";
import { WhatIfSimulator } from "@/components/control/integrations/WhatIfSimulator";
import { ProviderSwitchingPanel } from "@/components/control/integrations/ProviderSwitchingPanel";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("controlIntegrations.title"),
    description: t("controlIntegrations.subtitle"),
  };
}

export default async function ControlIntegrationsPage() {
  const t = await createServerTranslator();
  
  const integrationsLabels = {
    hero: {
      title: t("controlIntegrations.hero.title"),
      subtitle: t("controlIntegrations.hero.subtitle"),
      runDailyScan: t("common.runDailyScan"),
      addProvider: t("common.addProvider"),
    },
    monthlyCostIntelligence: {
      title: t("controlIntegrations.monthlyCostIntelligence.title"),
      monthlyCost: t("controlIntegrations.monthlyCostIntelligence.monthlyCost"),
      currentMonthlyEstimate: t("controlIntegrations.monthlyCostIntelligence.currentMonthlyEstimate"),
      dailyBurnRate: t("controlIntegrations.monthlyCostIntelligence.dailyBurnRate"),
      costBreakdown: t("controlIntegrations.monthlyCostIntelligence.costBreakdown"),
      spend: t("controlIntegrations.monthlyCostIntelligence.spend"),
      budget: t("controlIntegrations.monthlyCostIntelligence.budget"),
      optimization: t("controlIntegrations.monthlyCostIntelligence.optimization"),
    },
    providerPerformance: {
      title: t("controlIntegrations.providerPerformance.title"),
      providers: t("controlIntegrations.providerPerformance.providers"),
      provider: t("controlIntegrations.providerPerformance.provider"),
      performance: t("controlIntegrations.providerPerformance.performance"),
      uptime: t("controlIntegrations.providerPerformance.uptime"),
      latency: t("controlIntegrations.providerPerformance.latency"),
      quality: t("controlIntegrations.providerPerformance.quality"),
      speed: t("controlIntegrations.providerPerformance.speed"),
      promptObedience: t("controlIntegrations.providerPerformance.promptObedience"),
      stability: t("controlIntegrations.providerPerformance.stability"),
      bestUse: t("controlIntegrations.providerPerformance.bestUse"),
    },
    optimizationRecommendations: {
      title: t("controlIntegrations.optimizationRecommendations.title"),
      recommendations: t("controlIntegrations.optimizationRecommendations.recommendations"),
      optimization: t("controlIntegrations.optimizationRecommendations.optimization"),
      savings: t("controlIntegrations.optimizationRecommendations.savings"),
      efficiency: t("controlIntegrations.optimizationRecommendations.efficiency"),
    },
    providerCards: {
      title: t("controlIntegrations.providerCards.title"),
      providers: t("controlIntegrations.providerCards.providers"),
      status: t("controlIntegrations.providerCards.status"),
      cost: t("controlIntegrations.providerCards.cost"),
      performance: t("controlIntegrations.providerCards.performance"),
    },
    generationRouter: {
      title: t("controlIntegrations.generationRouter.title"),
      router: t("controlIntegrations.generationRouter.router"),
      routing: t("controlIntegrations.generationRouter.routing"),
      loadBalancing: t("controlIntegrations.generationRouter.loadBalancing"),
      failover: t("controlIntegrations.generationRouter.failover"),
    },
    promptObedience: {
      title: t("controlIntegrations.promptObedience.title"),
      obedience: t("controlIntegrations.promptObedience.obedience"),
      compliance: t("controlIntegrations.promptObedience.compliance"),
      accuracy: t("controlIntegrations.promptObedience.accuracy"),
      consistency: t("controlIntegrations.promptObedience.consistency"),
    },
    creativeQualityMonitor: {
      title: t("controlIntegrations.creativeQualityMonitor.title"),
      quality: t("controlIntegrations.creativeQualityMonitor.quality"),
      consistency: t("controlIntegrations.creativeQualityMonitor.consistency"),
      brand: t("controlIntegrations.creativeQualityMonitor.brand"),
      standards: t("controlIntegrations.creativeQualityMonitor.standards"),
    },
    smartKnowledgeSources: {
      title: t("controlIntegrations.smartKnowledgeSources.title"),
      sources: t("controlIntegrations.smartKnowledgeSources.sources"),
      knowledge: t("controlIntegrations.smartKnowledgeSources.knowledge"),
      retrieval: t("controlIntegrations.smartKnowledgeSources.retrieval"),
      accuracy: t("controlIntegrations.smartKnowledgeSources.accuracy"),
      types: {
        visual: t("controlIntegrations.smartKnowledgeSources.types.visual"),
        marketing: t("controlIntegrations.smartKnowledgeSources.types.marketing"),
        competitor: t("controlIntegrations.smartKnowledgeSources.types.competitor"),
        trend: t("controlIntegrations.smartKnowledgeSources.types.trend"),
      },
      visualOnly: t("controlIntegrations.smartKnowledgeSources.visualOnly"),
    },
    infrastructureRiskAlerts: {
      title: t("controlIntegrations.infrastructureRiskAlerts.title"),
      risks: t("controlIntegrations.infrastructureRiskAlerts.risks"),
      alerts: t("controlIntegrations.infrastructureRiskAlerts.alerts"),
      monitoring: t("controlIntegrations.infrastructureRiskAlerts.monitoring"),
      mitigation: t("controlIntegrations.infrastructureRiskAlerts.mitigation"),
      infrastructureRiskAlerts: t("controlIntegrations.infrastructureRiskAlerts.infrastructureRiskAlerts"),
    },
    whatIfSimulator: {
      title: t("controlIntegrations.whatIfSimulator.title"),
      simulator: t("controlIntegrations.whatIfSimulator.simulator"),
      scenarios: t("controlIntegrations.whatIfSimulator.scenarios"),
      simulation: t("controlIntegrations.whatIfSimulator.simulation"),
      prediction: t("controlIntegrations.whatIfSimulator.prediction"),
    },
    providerSwitching: {
      title: t("controlIntegrations.providerSwitching.title"),
      switching: t("controlIntegrations.providerSwitching.switching"),
      providers: t("controlIntegrations.providerSwitching.providers"),
      transition: t("controlIntegrations.providerSwitching.transition"),
      backup: t("controlIntegrations.providerSwitching.backup"),
      changeDefaultImageProvider: t("controlIntegrations.providerSwitching.changeDefaultImageProvider"),
      changeDefaultVideoProvider: t("controlIntegrations.providerSwitching.changeDefaultVideoProvider"),
      reviewRoutingRules: t("controlIntegrations.providerSwitching.reviewRoutingRules"),
    },
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <OperationsHero 
          labels={integrationsLabels.hero}
        />
        <MonthlyCostIntelligence labels={integrationsLabels.monthlyCostIntelligence} />
        <ProviderPerformanceTable labels={integrationsLabels.providerPerformance} />
        <OptimizationRecommendations labels={integrationsLabels.optimizationRecommendations} />
        <ProviderCardsGrid labels={integrationsLabels.providerCards} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 columns (75% extended main) */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <GenerationRouterPreview labels={integrationsLabels.generationRouter} />
              <PromptObedienceScore labels={integrationsLabels.promptObedience} />
              <CreativeQualityMonitor labels={integrationsLabels.creativeQualityMonitor} />
              <SmartKnowledgeSources labels={integrationsLabels.smartKnowledgeSources} />
              <WhatIfSimulator labels={integrationsLabels.whatIfSimulator} />
            </div>
          </div>

          {/* Right Side Panels - 3 columns (25% compact support) */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <InfrastructureRiskAlerts labels={integrationsLabels.infrastructureRiskAlerts} />
              <ProviderSwitchingPanel labels={integrationsLabels.providerSwitching} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

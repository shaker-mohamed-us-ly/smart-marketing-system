import { ControlHero } from "@/components/control/dashboard/ControlHero";
import { SystemHealthCard } from "@/components/control/dashboard/SystemHealthCard";
import { AdminMetricCard } from "@/components/control/dashboard/AdminMetricCard";
import { AICommandStatus } from "@/components/control/dashboard/AICommandStatus";
import { ClientOverview } from "@/components/control/dashboard/ClientOverview";
import { IntegrationHealth } from "@/components/control/dashboard/IntegrationHealth";
import { LearningEnginePanel } from "@/components/control/dashboard/LearningEnginePanel";
import { SystemActivity } from "@/components/control/dashboard/SystemActivity";
import { BillingSnapshot } from "@/components/control/dashboard/BillingSnapshot";
import { UnifiedSourceConnectorPreview } from "@/components/control/dashboard/UnifiedSourceConnectorPreview";
import { createServerTranslator } from "@/i18n/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await createServerTranslator();
  return {
    title: t("controlOverview.title"),
    description: t("controlOverview.subtitle"),
  };
}

export default async function ControlOverviewPage() {
  const t = await createServerTranslator();
  
  const aiCommandStatusLabels = {
    title: t("common.aiCommandStatus"),
    subtitle: t("common.engineHealthActivity"),
    online: t("status.online"),
    learning: t("common.thinking"),
    ready: t("status.ready"),
    stable: t("status.stable"),
    active: t("common.active"),
  };
  
  const systemHealthLabels = {
    title: t("common.systemHealth"),
    subtitle: t("common.overallPlatformStatus"),
    healthy: t("status.healthy"),
    excellent: t("status.excellent"),
    good: t("status.good"),
    warning: t("status.warning"),
    uptime: t("common.uptime"),
    queue: t("common.queue"),
    latency: t("common.latency"),
  };

  const clientOverviewLabels = {
    title: t("controlOverview.clientOverview.title"),
    subtitle: t("controlOverview.clientOverview.subtitle"),
    health: t("controlOverview.clientOverview.health"),
    campaigns: t("controlOverview.clientOverview.campaigns"),
    activity: t("controlOverview.clientOverview.activity"),
  };

  const integrationHealthLabels = {
    title: t("controlOverview.integrationHealth.title"),
    subtitle: t("controlOverview.integrationHealth.subtitle"),
    latency: t("controlOverview.integrationHealth.latency"),
    usage: t("controlOverview.integrationHealth.usage"),
    online: t("controlOverview.integrationHealth.online"),
    degraded: t("controlOverview.integrationHealth.degraded"),
    offline: t("controlOverview.integrationHealth.offline"),
  };

  const learningEngineLabels = {
    title: t("controlOverview.learningEngine.title"),
    subtitle: t("controlOverview.learningEngine.subtitle"),
    sourcesScanned: t("controlOverview.learningEngine.sourcesScanned"),
    patternsDiscovered: t("controlOverview.learningEngine.patternsDiscovered"),
    recommendationsGenerated: t("controlOverview.learningEngine.recommendationsGenerated"),
    brandDnaUpdates: t("controlOverview.learningEngine.brandDnaUpdates"),
  };

  const systemActivityLabels = {
    title: t("controlOverview.systemActivity.title"),
    subtitle: t("controlOverview.systemActivity.subtitle"),
  };

  const billingSnapshotLabels = {
    title: t("controlOverview.billingSnapshot.title"),
    subtitle: t("controlOverview.billingSnapshot.subtitle"),
    mrr: t("controlOverview.billingSnapshot.mrr"),
    activeSubscriptions: t("controlOverview.billingSnapshot.activeSubscriptions"),
    failedPayments: t("controlOverview.billingSnapshot.failedPayments"),
    cashManualClients: t("controlOverview.billingSnapshot.cashManualClients"),
  };

  const unifiedSourceConnectorLabels = {
    connectorModes: t("controlOverview.unifiedSourceConnector.connectorModes"),
    openConnector: t("controlOverview.unifiedSourceConnector.openConnector"),
  };

  return (
    <div className="p-6 lg:p-8">
      <ControlHero 
        title={t("controlOverview.hero.title")}
        subtitle={t("controlOverview.hero.subtitle")}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          {/* System Health Card */}
          <SystemHealthCard labels={systemHealthLabels} />
          
          {/* Admin Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            <AdminMetricCard
              icon="BrainCircuit"
              label={t("controlOverview.adminMetrics.intelligenceLoad")}
              value="2,846"
              trend="24%"
              trendUp={true}
              sparkline={[5, 8, 6, 10, 9, 12, 11]}
            />
            <AdminMetricCard
              icon="Sparkles"
              label={t("controlOverview.adminMetrics.dnaLearningRate")}
              value="89"
              trend="18%"
              trendUp={true}
              sparkline={[8, 10, 9, 12, 11, 14, 12]}
            />
            <AdminMetricCard
              icon="TrendingUp"
              label={t("controlOverview.adminMetrics.growthMomentum")}
              value="128"
              trend="12%"
              trendUp={true}
              sparkline={[10, 15, 12, 18, 14, 20, 16]}
            />
            <AdminMetricCard
              icon="Send"
              label={t("controlOverview.adminMetrics.publishingStability")}
              value="18"
              trend="3%"
              trendUp={true}
              sparkline={[6, 7, 6, 8, 7, 9, 8]}
            />
            <AdminMetricCard
              icon="DollarSign"
              label={t("controlOverview.adminMetrics.revenueVelocity")}
              value="$42,850"
              trend="15%"
              trendUp={true}
              sparkline={[7, 8, 7, 9, 8, 10, 9]}
            />
          </div>

          {/* AI Command Status */}
          <AICommandStatus labels={aiCommandStatusLabels} />

          {/* Client Overview */}
          <ClientOverview labels={clientOverviewLabels} />

          {/* Integration Health */}
          <IntegrationHealth labels={integrationHealthLabels} />

          {/* Learning Engine Panel */}
          <LearningEnginePanel labels={learningEngineLabels} />

          {/* Bottom Panels */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SystemActivity labels={systemActivityLabels} />
            <BillingSnapshot labels={billingSnapshotLabels} />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-8 space-y-8">
            <UnifiedSourceConnectorPreview labels={unifiedSourceConnectorLabels} />
          </div>
        </div>
      </div>
    </div>
  );
}

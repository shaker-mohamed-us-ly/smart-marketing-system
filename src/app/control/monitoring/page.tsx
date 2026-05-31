import { OperationsMonitoringHero } from "@/components/control/monitoring/OperationsMonitoringHero";
import { ProviderChannelMap } from "@/components/control/monitoring/ProviderChannelMap";
import { ChannelRoutingRules } from "@/components/control/monitoring/ChannelRoutingRules";
import { OperationsTeamPanel } from "@/components/control/monitoring/OperationsTeamPanel";
import { RoleBasedAlertsPanel } from "@/components/control/monitoring/RoleBasedAlertsPanel";
import { SystemAlertsPanel } from "@/components/control/monitoring/SystemAlertsPanel";
import { BusinessAlertsPanel } from "@/components/control/monitoring/BusinessAlertsPanel";
import { SalesAlertsPanel } from "@/components/control/monitoring/SalesAlertsPanel";
import { FinancialAlertsPanel } from "@/components/control/monitoring/FinancialAlertsPanel";
import { CommunicationFailoverPanel } from "@/components/control/monitoring/CommunicationFailoverPanel";
import { MessagingCommandPreview } from "@/components/control/monitoring/MessagingCommandPreview";
import { AlertPreferencesPanel } from "@/components/control/monitoring/AlertPreferencesPanel";
import { centeredPlatformCanvas, pageSectionGap, extendedMain, compactSupport } from "@/lib/layout/layout-classes";
import { getTranslations } from "next-intl/server";

export default async function ControlMonitoringPage() {
  const t = await getTranslations();

  const providerChannelMapLabels = {
    title: t("controlMonitoring.providerChannelMap.title"),
    provider: t("controlMonitoring.providerChannelMap.provider"),
    channel: t("controlMonitoring.providerChannelMap.channel"),
    messagingServiceProvider: t("controlMonitoring.providerChannelMap.messagingServiceProvider"),
    communicationChannel: t("controlMonitoring.providerChannelMap.communicationChannel"),
  };

  const channelRoutingRulesLabels = {
    title: t("controlMonitoring.channelRoutingRules.title"),
    primary: t("controlMonitoring.channelRoutingRules.primary"),
    fallback: t("controlMonitoring.channelRoutingRules.fallback"),
    description: t("controlMonitoring.channelRoutingRules.description"),
  };

  const operationsTeamLabels = {
    title: t("controlMonitoring.operationsTeam.title"),
    active: t("controlMonitoring.operationsTeam.active"),
    channels: t("controlMonitoring.operationsTeam.channels"),
    alerts: t("controlMonitoring.operationsTeam.alerts"),
  };

  const roleBasedAlertsLabels = {
    title: t("controlMonitoring.roleBasedAlerts.title"),
  };

  const systemAlertsLabels = {
    title: t("controlMonitoring.systemAlerts.title"),
  };

  const businessAlertsLabels = {
    title: t("controlMonitoring.businessAlerts.title"),
  };

  const salesAlertsLabels = {
    title: t("controlMonitoring.salesAlerts.title"),
  };

  const financialAlertsLabels = {
    title: t("controlMonitoring.financialAlerts.title"),
  };

  const communicationFailoverLabels = {
    title: t("controlMonitoring.communicationFailover.title"),
    scenario: t("controlMonitoring.communicationFailover.scenario"),
    fallback: t("controlMonitoring.communicationFailover.fallback"),
    result: t("controlMonitoring.communicationFailover.result"),
  };

  const messagingCommandLabels = {
    title: t("controlMonitoring.messagingCommandPreview.title"),
    returns: t("controlMonitoring.messagingCommandPreview.returns"),
    visualOnly: t("controlMonitoring.messagingCommandPreview.visualOnly"),
  };

  const alertPreferencesLabels = {
    title: t("controlMonitoring.alertPreferences.title"),
    visualTogglesOnly: t("controlMonitoring.alertPreferences.visualTogglesOnly"),
  };

  return (
    <div className="p-6 lg:p-8">
      <div className={centeredPlatformCanvas}>
        <OperationsMonitoringHero
          labels={{
            title: t("common.monitoringHeroTitle"),
            subtitle: t("common.monitoringHeroSubtitle"),
            addTeamMember: t("common.addTeamMember"),
            testAlert: t("common.testAlert")
          }}
        />
        <ProviderChannelMap labels={providerChannelMapLabels} />
        <ChannelRoutingRules labels={channelRoutingRulesLabels} />
        <OperationsTeamPanel labels={operationsTeamLabels} />
        <RoleBasedAlertsPanel labels={roleBasedAlertsLabels} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content - 9 Columns */}
          <div className={extendedMain}>
            <div className={pageSectionGap}>
              <SystemAlertsPanel labels={systemAlertsLabels} />
              <BusinessAlertsPanel labels={businessAlertsLabels} />
              <SalesAlertsPanel labels={salesAlertsLabels} />
              <FinancialAlertsPanel labels={financialAlertsLabels} />
              <CommunicationFailoverPanel labels={communicationFailoverLabels} />
              <MessagingCommandPreview labels={messagingCommandLabels} />
            </div>
          </div>

          {/* Right Side Panels - 3 Columns */}
          <div className={compactSupport}>
            <div className={pageSectionGap}>
              <AlertPreferencesPanel labels={alertPreferencesLabels} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

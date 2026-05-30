import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

export interface InfrastructureRiskAlertsProps extends HTMLAttributes<HTMLDivElement> {
  alerts?: { 
    message: string; 
    severity: "Low" | "Medium" | "High";
  }[];
  labels?: {
    title: string;
    risks: string;
    alerts: string;
    monitoring: string;
    mitigation: string;
    infrastructureRiskAlerts: string;
    severities?: {
      high: string;
      medium: string;
      low: string;
    };
  };
}

export function InfrastructureRiskAlerts({ 
  alerts: alertsProp,
  labels,
  className, 
  ...props 
}: InfrastructureRiskAlertsProps) {
  const t = useTranslations('controlIntegrations.infrastructureRiskAlerts');
  const alerts = alertsProp || t.raw('alertsList') as any[];
  const l = labels || {
    title: t('title'),
    risks: t('risks'),
    alerts: t('alerts'),
    monitoring: t('monitoring'),
    mitigation: t('mitigation'),
    severities: {
      high: t('severities.high'),
      medium: t('severities.medium'),
      low: t('severities.low'),
    },
  };

  const getSeverityLabel = (severity: string) => {
    return l.severities?.[severity.toLowerCase() as keyof typeof l.severities] || severity;
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      case "Medium":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "Low":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High":
        return AlertTriangle;
      case "Medium":
        return AlertTriangle;
      case "Low":
        return Info;
      default:
        return Info;
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((alert, index) => {
            const Icon = getSeverityIcon(alert.severity);
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl border transition-colors",
                  getSeverityColor(alert.severity)
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <p className="text-sm font-medium flex-1">{alert.message}</p>
                <div className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium border",
                  getSeverityColor(alert.severity)
                )}>
                  {getSeverityLabel(alert.severity)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

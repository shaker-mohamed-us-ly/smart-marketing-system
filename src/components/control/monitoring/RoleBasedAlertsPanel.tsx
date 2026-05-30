import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Shield, CheckCircle } from "lucide-react";

export interface RoleBasedAlertsPanelProps extends HTMLAttributes<HTMLDivElement> {
  roles?: { 
    name: string; 
    alerts: string[];
  }[];
  labels?: {
    title: string;
  };
}

export function RoleBasedAlertsPanel({ 
  roles: rolesProp,
  labels,
  className, 
  ...props 
}: RoleBasedAlertsPanelProps) {
  const t = useTranslations('controlMonitoring.operationsTeam');
  const roles = rolesProp || [
    { 
      name: t('roles.owner'), 
      alerts: [t('alertPermissions.all')],
    },
    { 
      name: t('roles.salesManager'), 
      alerts: [t('alertPermissions.business'), t('alertPermissions.sales'), t('alertPermissions.financial')],
    },
    { 
      name: t('roles.technicalOperator'), 
      alerts: [t('alertPermissions.system'), t('alertPermissions.aiIntelligence')],
    },
    { 
      name: t('roles.developer'), 
      alerts: [t('alertPermissions.system'), t('alertPermissions.aiIntelligence')],
    },
    { 
      name: t('roles.aiOperationsManager'), 
      alerts: [t('alertPermissions.system'), t('alertPermissions.aiIntelligence'), t('alertPermissions.business')],
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {roles.map((role, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <p className="text-sm font-semibold">{role.name}</p>
                <CheckCircle className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex flex-wrap gap-2">
                {role.alerts.map((alert, aIndex) => (
                  <span
                    key={aIndex}
                    className="px-2 py-1 rounded-md bg-primary/10 text-xs text-primary"
                  >
                    {alert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Briefcase, UserPlus, Clock, TrendingUp, AlertCircle } from "lucide-react";

export interface BusinessAlertsPanelProps extends HTMLAttributes<HTMLDivElement> {
  alerts?: { 
    alert: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
  };
}

export function BusinessAlertsPanel({ 
  alerts: alertsProp,
  labels,
  className, 
  ...props 
}: BusinessAlertsPanelProps) {
  const t = useTranslations('controlMonitoring.businessAlerts');
  const alerts = alertsProp || [
    { 
      alert: t('newSubscription'), 
      icon: UserPlus,
    },
    { 
      alert: t('subscriptionExpiring'), 
      icon: Clock,
    },
    { 
      alert: t('highUsageClient'), 
      icon: TrendingUp,
    },
    { 
      alert: t('successfulCampaign'), 
      icon: TrendingUp,
    },
    { 
      alert: t('churnRisk'), 
      icon: AlertCircle,
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Briefcase className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 hover:bg-blue-500/10 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-sm font-medium">{item.alert}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { DollarSign, TrendingUp, AlertTriangle, Wallet, Users } from "lucide-react";

export interface FinancialAlertsPanelProps extends HTMLAttributes<HTMLDivElement> {
  alerts?: { 
    alert: string; 
    icon: any;
  }[];
  labels?: {
    title: string;
  };
}

export function FinancialAlertsPanel({ 
  alerts: alertsProp,
  labels,
  className, 
  ...props 
}: FinancialAlertsPanelProps) {
  const t = useTranslations('controlMonitoring.financialAlerts');
  const alerts = alertsProp || [
    { 
      alert: t('aiCostSpike'), 
      icon: TrendingUp,
    },
    { 
      alert: t('providerPriceIncrease'), 
      icon: DollarSign,
    },
    { 
      alert: t('monthlyBudgetWarning'), 
      icon: Wallet,
    },
    { 
      alert: t('recommendedProviderSwitch'), 
      icon: TrendingUp,
    },
    { 
      alert: t('highCostClientDetected'), 
      icon: Users,
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {alerts.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 hover:bg-purple-500/10 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-purple-600" />
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

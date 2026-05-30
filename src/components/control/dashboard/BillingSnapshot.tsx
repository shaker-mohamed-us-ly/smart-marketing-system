import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { DollarSign, CreditCard, AlertCircle, Users } from "lucide-react";
import * as Icons from "lucide-react";

export interface BillingSnapshotProps extends HTMLAttributes<HTMLDivElement> {
  mrr?: string;
  activeSubscriptions?: number;
  failedPayments?: number;
  cashClients?: number;
  labels?: {
    title: string;
    subtitle: string;
    mrr: string;
    activeSubscriptions: string;
    failedPayments: string;
    cashManualClients: string;
  };
}

export function BillingSnapshot({ 
  mrr = "$42,850",
  activeSubscriptions = 128,
  failedPayments = 3,
  cashClients = 12,
  labels,
  className, 
  ...props 
}: BillingSnapshotProps) {
  const t = useTranslations('controlDashboard.billingSnapshot');
  const metrics = [
    { label: labels?.mrr || t('mrr'), value: mrr, icon: "DollarSign", color: "text-emerald-600" },
    { label: labels?.activeSubscriptions || t('activeSubscriptions'), value: activeSubscriptions, icon: "CreditCard", color: "text-blue-600" },
    { label: labels?.failedPayments || t('failedPayments'), value: failedPayments, icon: "AlertCircle", color: "text-amber-600" },
    { label: labels?.cashManualClients || t('cashManualClients'), value: cashClients, icon: "Users", color: "text-purple-600" },
  ];

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
          <DollarSign className="h-5 w-5 text-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = (Icons as any)[metric.icon];
            return (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className={cn("text-lg font-semibold", metric.color)}>{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

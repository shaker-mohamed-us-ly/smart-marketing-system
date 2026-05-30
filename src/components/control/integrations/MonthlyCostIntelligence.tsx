import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { DollarSign, TrendingUp, Image as ImageIcon, Video, Brain, Send, AlertCircle } from "lucide-react";

export interface MonthlyCostIntelligenceProps extends HTMLAttributes<HTMLDivElement> {
  currentMonthlyEstimate?: number;
  dailyBurnRate?: number;
  breakdown?: { category: string; amount: number; icon: any }[];
  forecast?: { clients: number; estimated: number };
  labels?: {
    title: string;
    monthlyCost: string;
    currentMonthlyEstimate: string;
    dailyBurnRate: string;
    costBreakdown: string;
    spend: string;
    budget: string;
    optimization: string;
  };
}

export function MonthlyCostIntelligence({ 
  currentMonthlyEstimate = 1265,
  dailyBurnRate = 42,
  breakdown: breakdownProp,
  forecast = { clients: 500, estimated: 8900 },
  labels,
  className, 
  ...props 
}: MonthlyCostIntelligenceProps) {
  const t = useTranslations('controlIntegrations.monthlyCostIntelligence');
  const breakdown = breakdownProp || [
    { category: t('imageGeneration'), amount: 420, icon: ImageIcon },
    { category: t('videoGeneration'), amount: 680, icon: Video },
    { category: t('brainUsage'), amount: 95, icon: Brain },
    { category: t('publishingServices'), amount: 70, icon: Send },
  ];
  const l = labels || {
    title: t('title'),
    monthlyCost: t('monthlyCost'),
    spend: t('spend'),
    budget: t('budget'),
    optimization: t('optimization'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <DollarSign className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">{labels?.currentMonthlyEstimate || t('currentMonthlyEstimate')}</p>
            <p className="text-2xl font-bold text-primary">${currentMonthlyEstimate}</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
            <p className="text-sm text-muted-foreground mb-1">{labels?.dailyBurnRate || t('dailyBurnRate')}</p>
            <p className="text-2xl font-bold">${dailyBurnRate} <span className="text-sm font-normal text-muted-foreground">{t('perDay')}</span></p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.costBreakdown || t('costBreakdown')}</p>
          <div className="space-y-2">
            {breakdown.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <span className="text-sm font-semibold">${item.amount}/{t('month')}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <p className="text-sm font-medium text-emerald-600">{t('forecastAt')} {forecast.clients} {t('activeClients')}</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">${forecast.estimated}/{t('month')}</p>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t('estimatedValues')}</p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

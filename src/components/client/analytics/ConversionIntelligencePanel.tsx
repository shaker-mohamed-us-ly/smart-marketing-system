import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { ArrowDown, Target, MessageCircle, Phone, MessageSquare, AlertTriangle } from "lucide-react";

export interface ConversionIntelligencePanelProps extends HTMLAttributes<HTMLDivElement> {
  funnel?: { step: string; icon: any }[];
  leadConversionReadiness?: number;
  bestConvertingChannel?: string;
  weakPoint?: string;
  labels?: {
    title: string;
    conversions: string;
    funnel: string;
    rate: string;
    value: string;
    conversionFunnel: string;
    leadConversionReadiness: string;
    bestConvertingChannel: string;
    weakPoint: string;
    postView?: string;
    engagement?: string;
    messageWhatsAppPhone?: string;
    lead?: string;
    sale?: string;
  };
}

export function ConversionIntelligencePanel({ 
  funnel = [
    { step: "postView", icon: Target },
    { step: "engagement", icon: MessageCircle },
    { step: "messageWhatsAppPhone", icon: MessageSquare },
    { step: "lead", icon: Phone },
    { step: "sale", icon: Target },
  ],
  leadConversionReadiness = 89,
  bestConvertingChannel = "WhatsApp",
  weakPoint,
  labels,
  className, 
  ...props 
}: ConversionIntelligencePanelProps) {
  const t = useTranslations('clientAnalytics.conversionIntelligence');
  const l = labels || {
    title: t('title'),
    conversions: t('conversions'),
    funnel: t('funnel'),
    rate: t('rate'),
    value: t('value'),
    conversionFunnel: t('conversionFunnel'),
    leadConversionReadiness: t('leadConversionReadiness'),
    bestConvertingChannel: t('bestConvertingChannel'),
    weakPoint: t('weakPoint'),
    postView: t('postView'),
    engagement: t('engagement'),
    messageWhatsAppPhone: t('messageWhatsAppPhone'),
    lead: t('lead'),
    sale: t('sale'),
  };
  const defaultWeakPoint = t('weakPoint');
  const weakPointValue = weakPoint || defaultWeakPoint;

  const getFunnelText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{l.conversionFunnel}</p>
          <div className="space-y-2">
            {funnel.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{getFunnelText(item.step)}</p>
                  </div>
                  {index < funnel.length - 1 && (
                    <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20">
            <p className="text-xs text-muted-foreground mb-1">{l.leadConversionReadiness}</p>
            <p className="text-2xl font-bold text-emerald-600">{leadConversionReadiness}%</p>
          </div>
          <div className="p-4 rounded-xl bg-secondary/30 border border-border/40">
            <p className="text-xs text-muted-foreground mb-1">{l.bestConvertingChannel}</p>
            <p className="text-lg font-semibold">{bestConvertingChannel}</p>
          </div>
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <p className="text-xs text-muted-foreground">{l.weakPoint}</p>
            </div>
            <p className="text-sm font-medium text-amber-600">{weakPointValue}</p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

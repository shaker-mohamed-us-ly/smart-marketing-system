import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Tag, TrendingUp, AlertTriangle, Target } from "lucide-react";

export interface OfferPerformancePanelProps extends HTMLAttributes<HTMLDivElement> {
  offers?: { 
    name: string; 
    conversionImpact: string; 
    risk: string; 
    bestUse: string;
  }[];
  insight?: string;
  labels?: {
    title: string;
    offers: string;
    performance: string;
    conversion: string;
    revenue: string;
    twentyFourHourFlashOffer?: string;
    highUrgencyFatigue?: string;
    launchCampaigns?: string;
    bundleOffer?: string;
    low?: string;
    productLaunches?: string;
    limitedTimeDiscount?: string;
    medium?: string;
    seasonalCampaigns?: string;
    premiumPositioningNoPrice?: string;
    premiumProducts?: string;
    twentyFourHourOffersInsight?: string;
  };
}

export function OfferPerformancePanel({ 
  offers = [
    { 
      name: "twentyFourHourFlashOffer", 
      conversionImpact: "+42%", 
      risk: "highUrgencyFatigue", 
      bestUse: "launchCampaigns",
    },
    { 
      name: "bundleOffer", 
      conversionImpact: "+28%", 
      risk: "low", 
      bestUse: "productLaunches",
    },
    { 
      name: "limitedTimeDiscount", 
      conversionImpact: "+35%", 
      risk: "medium", 
      bestUse: "seasonalCampaigns",
    },
    { 
      name: "premiumPositioningNoPrice", 
      conversionImpact: "+18%", 
      risk: "low", 
      bestUse: "premiumProducts",
    },
  ],
  insight = "twentyFourHourOffersInsight",
  labels,
  className, 
  ...props 
}: OfferPerformancePanelProps) {
  const t = useTranslations('clientAnalytics.offerPerformance');
  const l = labels || {
    title: t('title'),
    offers: t('offers'),
    performance: t('performance'),
    conversion: t('conversion'),
    revenue: t('revenue'),
    twentyFourHourFlashOffer: t('twentyFourHourFlashOffer'),
    highUrgencyFatigue: t('highUrgencyFatigue'),
    launchCampaigns: t('launchCampaigns'),
    bundleOffer: t('bundleOffer'),
    low: t('low'),
    productLaunches: t('productLaunches'),
    limitedTimeDiscount: t('limitedTimeDiscount'),
    medium: t('medium'),
    seasonalCampaigns: t('seasonalCampaigns'),
    premiumPositioningNoPrice: t('premiumPositioningNoPrice'),
    premiumProducts: t('premiumProducts'),
    twentyFourHourOffersInsight: t('twentyFourHourOffersInsight'),
  };

  const getOfferText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Tag className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3 mb-4">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">{getOfferText(offer.name)}</p>
                <div className="flex items-center gap-2 text-emerald-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{offer.conversionImpact}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className={cn(
                    "h-4 w-4",
                    offer.risk === "highUrgencyFatigue" ? "text-red-500" : offer.risk === "medium" ? "text-amber-500" : "text-emerald-500"
                  )} />
                  <span className="text-sm text-muted-foreground">Risk: {getOfferText(offer.risk)}</span>
                </div>
                <span className="text-xs text-muted-foreground">{getOfferText(offer.bestUse)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{getOfferText(insight)}</p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

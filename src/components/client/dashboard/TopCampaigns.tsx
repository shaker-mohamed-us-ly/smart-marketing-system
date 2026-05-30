"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { TrendingUp, Image } from "lucide-react";

export interface TopCampaignsProps extends HTMLAttributes<HTMLDivElement> {
  campaigns?: {
    name: string;
    revenue: string;
    growth: number;
    thumbnail?: string;
  }[];
  labels?: {
    title: string;
    subtitle: string;
    summerCollection?: string;
    newProductLaunch?: string;
    brandAwarenessCampaign?: string;
    holidayPromotion?: string;
  };
}

export function TopCampaigns({ 
  campaigns = [
    { name: "summerCollection", revenue: "$12,450", growth: 24 },
    { name: "newProductLaunch", revenue: "$8,320", growth: 18 },
    { name: "brandAwarenessCampaign", revenue: "$5,180", growth: 12 },
    { name: "holidayPromotion", revenue: "$2,500", growth: 8 },
  ], 
  labels,
  className, 
  ...props 
}: TopCampaignsProps) {
  const t = useTranslations('clientDashboard.topCampaigns');
  const l = labels || {
    title: t('title'),
    subtitle: t('subtitle'),
    summerCollection: t('summerCollection'),
    newProductLaunch: t('newProductLaunch'),
    brandAwarenessCampaign: t('brandAwarenessCampaign'),
    holidayPromotion: t('holidayPromotion'),
  };

  const getCampaignName = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };
  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <AnimatedIcon icon={TrendingUp} size={20} state="idle" magnetic />
      </div>
      <div className="space-y-4">
        {campaigns.map((campaign, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
              <AnimatedIcon icon={Image} size={20} state="idle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{getCampaignName(campaign.name)}</p>
              <p className="text-xs text-muted-foreground">{campaign.revenue}</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
              <span>↑</span>
              <span>{campaign.growth}%</span>
            </div>
          </div>
        ))}
      </div>
    </InteractiveCard>
  );
}

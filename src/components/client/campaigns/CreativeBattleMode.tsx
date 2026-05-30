import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Zap, Heart, Target, TrendingUp, Trophy } from "lucide-react";

export interface CreativeBattleModeProps extends HTMLAttributes<HTMLDivElement> {
  concepts?: { 
    name: string; 
    icon: any; 
    performance: number; 
    platform: string; 
    assetType: string; 
    reason: string;
  }[];
  labels?: {
    title: string;
    battleMode: string;
    variants: string;
    winner: string;
    testing: string;
    platform: string;
    asset: string;
    impact: string;
    conceptALuxury?: string;
    premiumAestheticsAttractTargetAudience?: string;
    conceptBEmotional?: string;
    storytellingIncreasesEngagement?: string;
    conceptCConversionFocus?: string;
    clearCallToActionAndValueProposition?: string;
    conceptDViral?: string;
    trendBasedContentPotential?: string;
  };
}

export function CreativeBattleMode({ 
  concepts = [
    { 
      name: "conceptALuxury", 
      icon: Trophy, 
      performance: 87, 
      platform: "Instagram", 
      assetType: "Poster", 
      reason: "premiumAestheticsAttractTargetAudience",
    },
    { 
      name: "conceptBEmotional", 
      icon: Heart, 
      performance: 82, 
      platform: "Facebook", 
      assetType: "Video", 
      reason: "storytellingIncreasesEngagement",
    },
    { 
      name: "conceptCConversionFocus", 
      icon: Target, 
      performance: 91, 
      platform: "Google Ads", 
      assetType: "Poster", 
      reason: "clearCallToActionAndValueProposition",
    },
    { 
      name: "conceptDViral", 
      icon: TrendingUp, 
      performance: 78, 
      platform: "TikTok", 
      assetType: "Video", 
      reason: "trendBasedContentPotential",
    },
  ],
  labels,
  className, 
  ...props 
}: CreativeBattleModeProps) {
  const t = useTranslations('clientCampaigns.creativeBattle');
  const l = labels || {
    title: t('title'),
    battleMode: t('battleMode'),
    variants: t('variants'),
    winner: t('winner'),
    testing: t('testing'),
    platform: t('platform'),
    asset: t('asset'),
    impact: t('impact'),
    conceptALuxury: t('conceptALuxury'),
    premiumAestheticsAttractTargetAudience: t('premiumAestheticsAttractTargetAudience'),
    conceptBEmotional: t('conceptBEmotional'),
    storytellingIncreasesEngagement: t('storytellingIncreasesEngagement'),
    conceptCConversionFocus: t('conceptCConversionFocus'),
    clearCallToActionAndValueProposition: t('clearCallToActionAndValueProposition'),
    conceptDViral: t('conceptDViral'),
    trendBasedContentPotential: t('trendBasedContentPotential'),
  };

  const getConceptText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Zap className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {concepts.map((concept, index) => {
            const Icon = concept.icon;
            const isHighest = concept.performance === Math.max(...concepts.map(c => c.performance));
            return (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg transition-colors",
                  isHighest 
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30" 
                    : "bg-secondary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    isHighest ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      isHighest ? "text-primary" : "text-primary/70"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className={cn(
                        "font-semibold",
                        isHighest && "text-primary"
                      )}>
                        {getConceptText(concept.name)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "text-sm font-bold",
                          isHighest ? "text-primary" : "text-foreground"
                        )}>
                          {concept.performance}%
                        </span>
                        {isHighest && <Trophy className="h-4 w-4 text-primary" />}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      <div>
                        <p className="text-xs text-muted-foreground">{l.platform}</p>
                        <p className="text-sm font-medium">{concept.platform}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{l.asset}</p>
                        <p className="text-sm font-medium">{concept.assetType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{l.impact}</p>
                        <p className="text-sm font-medium">{concept.performance}%</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{getConceptText(concept.reason)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

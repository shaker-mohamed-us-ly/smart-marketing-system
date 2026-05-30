import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Users, Target, ArrowRight } from "lucide-react";

export interface CompetitorIntelligenceCardProps extends HTMLAttributes<HTMLDivElement> {
  competitors?: string[];
  marketGaps?: string[];
  labels?: {
    title: string;
    trackedCompetitors: string;
    identifiedMarketGaps: string;
    viewFullAnalysis: string;
  };
}

export function CompetitorIntelligenceCard({ 
  competitors,
  marketGaps,
  labels,
  className, 
  ...props 
}: CompetitorIntelligenceCardProps) {
  const t = useTranslations('clientBrandDNA.competitorIntelligence');
  const defaultCompetitors = [t('competitorsList.techCorp'), t('competitorsList.phoneX'), t('competitorsList.smartGear')];
  const defaultMarketGaps = [t('marketGapsList.affordablePremium'), t('marketGapsList.betterBattery'), t('marketGapsList.sustainableMaterials')];
  const competitorsList = competitors || defaultCompetitors;
  const marketGapsList = marketGaps || defaultMarketGaps;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        {/* Competitors - Optional */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.trackedCompetitors || t('trackedCompetitors')}</p>
          <div className="space-y-2">
            {competitorsList.map((competitor, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{competitor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Market Gaps */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <Target className="h-4 w-4" />
            {labels?.identifiedMarketGaps || t('identifiedMarketGaps')}
          </p>
          <div className="space-y-2">
            {marketGapsList.map((gap, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                <span className="text-sm font-medium text-emerald-700">{gap}</span>
              </div>
            ))}
          </div>
        </div>

        <SmartButton variant="outline" className="w-full gap-2">
          {labels?.viewFullAnalysis || t('viewFullAnalysis')}
          <ArrowRight className="h-4 w-4" />
        </SmartButton>
      </div>
    </StaticCard>
  );
}

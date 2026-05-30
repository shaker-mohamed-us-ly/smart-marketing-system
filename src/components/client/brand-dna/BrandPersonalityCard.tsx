import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Sparkles } from "lucide-react";

export interface BrandPersonalityCardProps extends HTMLAttributes<HTMLDivElement> {
  traits?: { label: string; left: string; right: string; value: number }[];
  labels?: {
    title: string;
  };
}

export function BrandPersonalityCard({ 
  traits,
  labels,
  className, 
  ...props 
}: BrandPersonalityCardProps) {
  const t = useTranslations('clientBrandDNA.brandPersonality');
  const defaultTraits = [
    { label: t('personalityTraits.innovation'), left: t('personalityTraits.traditional'), right: t('personalityTraits.innovative'), value: 85 },
    { label: t('personalityTraits.positioning'), left: t('personalityTraits.affordable'), right: t('personalityTraits.premium'), value: 72 },
    { label: t('personalityTraits.expression'), left: t('personalityTraits.subtle'), right: t('personalityTraits.bold'), value: 68 },
    { label: t('personalityTraits.style'), left: t('personalityTraits.classic'), right: t('personalityTraits.modern'), value: 90 },
    { label: t('personalityTraits.approach'), left: t('personalityTraits.human'), right: t('personalityTraits.technical'), value: 82 },
  ];
  const traitsList = traits || defaultTraits;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-6">
          {traitsList.map((trait, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{trait.label}</span>
              </div>
              <div className="relative">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>{trait.left}</span>
                  <span>{trait.right}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all duration-300"
                    style={{ width: `${trait.value}%` }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-primary/80 transition-all duration-300"
                    style={{ left: `${trait.value}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

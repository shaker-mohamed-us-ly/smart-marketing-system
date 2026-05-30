import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MessageCircle, ArrowRight, TrendingUp } from "lucide-react";

export interface CommentConversionStrategyProps extends HTMLAttributes<HTMLDivElement> {
  triggers?: { keyword: string; description: string; predictedImpact: number }[];
  labels?: {
    title: string;
    description: string;
  };
}

export function CommentConversionStrategy({ 
  triggers,
  labels,
  className, 
  ...props 
}: CommentConversionStrategyProps) {
  const t = useTranslations('clientPublishing');
  const defaultTriggers = [
    { keyword: t('commentConversion.triggers.priceComment'), description: t('commentConversion.triggers.priceCommentDescription'), predictedImpact: 89 },
    { keyword: t('commentConversion.triggers.offerComment'), description: t('commentConversion.triggers.offerCommentDescription'), predictedImpact: 87 },
    { keyword: t('commentConversion.triggers.infoComment'), description: t('commentConversion.triggers.infoCommentDescription'), predictedImpact: 85 },
  ];
  const triggersList = triggers || defaultTriggers;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('commentConversion.title')}</h3>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {labels?.description || t('commentConversion.description')}
          </p>
        </div>

        <div className="space-y-3">
          {triggersList.map((trigger, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{trigger.keyword}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{trigger.predictedImpact}%</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{trigger.description}</p>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground/50 flex-shrink-0 mt-2" />
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target } from "lucide-react";

export interface PromptObedienceScoreProps extends HTMLAttributes<HTMLDivElement> {
  scores?: { provider: string; score: number }[];
  labels?: {
    title: string;
    obedience: string;
    compliance: string;
    accuracy: string;
    consistency: string;
  };
}

export function PromptObedienceScore({ 
  scores = [
    { provider: "Nano Banana", score: 94 },
    { provider: "Runway", score: 92 },
    { provider: "Kling", score: 90 },
    { provider: "Ideogram", score: 91 },
    { provider: "Leonardo", score: 83 },
    { provider: "Flux Self-hosted", score: 78 },
  ],
  labels,
  className, 
  ...props 
}: PromptObedienceScoreProps) {
  const t = useTranslations('controlIntegrations.promptObedience');
  const l = labels || {
    title: t('title'),
    obedience: t('obedience'),
    compliance: t('compliance'),
    accuracy: t('accuracy'),
    consistency: t('consistency'),
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

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {t('description')}
          </p>
        </div>

        <div className="space-y-3">
          {scores.sort((a, b) => b.score - a.score).map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex-1">
                <p className="text-sm font-medium mb-2">{item.provider}</p>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      item.score >= 90 ? "bg-emerald-500" : item.score >= 80 ? "bg-primary/60" : "bg-amber-500"
                    )}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
              <span className="text-sm font-semibold min-w-[3rem] text-right">{item.score}%</span>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

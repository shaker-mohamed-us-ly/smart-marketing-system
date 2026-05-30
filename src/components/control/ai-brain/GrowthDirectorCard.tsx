import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { TrendingUp, ArrowUp } from "lucide-react";

export interface GrowthDirectorCardProps extends HTMLAttributes<HTMLDivElement> {
  name?: string;
  arabicName?: string;
  status?: string;
  thinking?: string[];
  confidence?: number;
  labels?: {
    thinking: string;
  };
}

export function GrowthDirectorCard({ 
  name: nameProp,
  arabicName: arabicNameProp,
  status: statusProp,
  thinking: thinkingProp,
  confidence = 90,
  labels,
  className, 
  ...props 
}: GrowthDirectorCardProps) {
  const t = useTranslations('controlAIBrain.growthDirector');
  const name = nameProp || t('name');
  const arabicName = arabicNameProp || t('arabicName');
  const status = statusProp || t('status');
  const thinking = thinkingProp || t.raw('thinking') as string[];
  return (
    <StaticCard depth="subtle" className={cn("p-5", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">{name}</p>
              <p className="text-xs text-muted-foreground">{arabicName}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-emerald-600">
              <ArrowUp className="h-4 w-4" />
              <span className="text-sm font-semibold">{confidence}%</span>
            </div>
          </div>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm font-medium">{status}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">{labels?.thinking || t('thinking')}</p>
          <div className="space-y-1">
            {thinking.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                <p className="text-sm text-muted-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

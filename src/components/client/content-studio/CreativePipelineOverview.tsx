import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { CheckCircle, Circle, ArrowRight } from "lucide-react";

export interface CreativePipelineOverviewProps extends HTMLAttributes<HTMLDivElement> {
  stages?: { name: string; status: "complete" | "in-progress" | "pending" }[];
  labels?: {
    title: string;
  };
}

export function CreativePipelineOverview({ 
  stages: stagesProp,
  labels,
  className, 
  ...props 
}: CreativePipelineOverviewProps) {
  const t = useTranslations('clientContentStudio.creativePipeline');
  const stages = stagesProp || [
    { name: t('stage0'), status: "complete" },
    { name: t('stage1'), status: "complete" },
    { name: t('stage2'), status: "in-progress" },
    { name: t('stage3'), status: "pending" },
    { name: t('stage4'), status: "pending" },
    { name: t('stage5'), status: "pending" },
    { name: t('stage6'), status: "pending" },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6 mb-8", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {stages.map((stage, index) => {
            const isComplete = stage.status === "complete";
            const isInProgress = stage.status === "in-progress";
            const isPending = stage.status === "pending";
            return (
              <div key={index} className="flex items-center gap-2 flex-shrink-0">
                <div className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full border transition-all",
                  isComplete && "bg-emerald-500/10 border-emerald-500/30",
                  isInProgress && "bg-primary/10 border-primary/30",
                  isPending && "bg-secondary/30 border-border/40"
                )}>
                  {isComplete && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                  {isInProgress && <Circle className="h-4 w-4 text-primary animate-pulse" />}
                  {isPending && <Circle className="h-4 w-4 text-muted-foreground" />}
                  <span className={cn(
                    "text-sm font-medium whitespace-nowrap",
                    isComplete && "text-emerald-600",
                    isInProgress && "text-primary",
                    isPending && "text-muted-foreground"
                  )}>
                    {stage.name}
                  </span>
                </div>
                {index < stages.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-muted-foreground/50 flex-shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

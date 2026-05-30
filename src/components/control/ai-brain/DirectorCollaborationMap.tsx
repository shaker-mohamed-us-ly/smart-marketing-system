import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { ArrowRight, Network } from "lucide-react";

export interface DirectorCollaborationMapProps extends HTMLAttributes<HTMLDivElement> {
  directors?: string[];
  explanation?: string;
  labels?: {
    title: string;
    collaboration: string;
    coordination: string;
    sync: string;
  };
}

export function DirectorCollaborationMap({ 
  directors: directorsProp,
  explanation: explanationProp,
  labels,
  className, 
  ...props 
}: DirectorCollaborationMapProps) {
  const t = useTranslations('controlAIBrain.collaborationMap');
  const directors = directorsProp || [
    t('directors0'),
    t('directors1'),
    t('directors2'),
    t('directors3'),
    t('directors4'),
    t('directors5'),
    t('directors6'),
  ];
  const explanation = explanationProp || t('explanation');
  const l = labels || {
    title: t('title'),
    collaboration: t('collaboration'),
    coordination: t('coordination'),
    sync: t('sync'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Network className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>

        <div className="space-y-3">
          {directors.map((director, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-1 p-3 rounded-lg bg-secondary/30">
                <p className="text-sm font-medium">{director}</p>
              </div>
              {index < directors.length - 1 && (
                <ArrowRight className="h-5 w-5 text-primary/60 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

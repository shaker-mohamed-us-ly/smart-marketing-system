import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { ArrowDown, Brain, GitBranch, Server } from "lucide-react";

export interface GenerationRouterPreviewProps extends HTMLAttributes<HTMLDivElement> {
  architecture?: { 
    layer: string; 
    description: string; 
    arabicTerm?: string;
  }[];
  labels?: {
    title: string;
    router: string;
    routing: string;
    loadBalancing: string;
    failover: string;
  };
}

export function GenerationRouterPreview({ 
  architecture: architectureProp,
  labels,
  className, 
  ...props 
}: GenerationRouterPreviewProps) {
  const t = useTranslations('controlIntegrations.generationRouter');
  const architecture = architectureProp || [
    { 
      layer: t('architecture.theBrain'), 
      description: t('architecture.brainDescription'),
      arabicTerm: t('architecture.productionSchema'),
    },
    { 
      layer: t('architecture.generationRouter'), 
      description: t('architecture.routerDescription'),
      arabicTerm: t('architecture.generationRouter'),
    },
    { 
      layer: t('architecture.providerAdapter'), 
      description: t('architecture.adapterDescription'),
      arabicTerm: t('architecture.providerAdapter'),
    },
    { 
      layer: t('architecture.aiPlatform'), 
      description: t('architecture.platformDescription'),
    },
  ];
  const l = labels || {
    title: t('title'),
    router: t('router'),
    routing: t('routing'),
    loadBalancing: t('loadBalancing'),
    failover: t('failover'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-4">
          {architecture.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {index === 0 && <Brain className="h-5 w-5 text-primary" />}
                  {index === 1 && <GitBranch className="h-5 w-5 text-primary" />}
                  {index === 2 && <Server className="h-5 w-5 text-primary" />}
                  {index === 3 && <Server className="h-5 w-5 text-primary" />}
                </div>
                {index < architecture.length - 1 && (
                  <ArrowDown className="h-4 w-4 text-muted-foreground/50 my-1" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className="font-semibold mb-1">{item.layer}</p>
                <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                {item.arabicTerm && (
                  <p className="text-xs text-muted-foreground italic">{item.arabicTerm}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground">
            {t('explanation')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

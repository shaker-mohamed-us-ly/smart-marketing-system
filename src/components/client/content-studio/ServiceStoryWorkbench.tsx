import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Heart, Sparkles, Info } from "lucide-react";

export interface ServiceStoryWorkbenchProps extends HTMLAttributes<HTMLDivElement> {
  serviceName?: string;
  storyDirections?: { title: string; description: string }[];
  labels?: {
    title: string;
    example: string;
    storyDirections: string;
    keyMessage: string;
  };
}

export function ServiceStoryWorkbench({ 
  serviceName: serviceNameProp,
  storyDirections: storyDirectionsProp,
  labels,
  className, 
  ...props 
}: ServiceStoryWorkbenchProps) {
  const t = useTranslations('clientContentStudio.serviceStory');
  const serviceName = serviceNameProp || t('defaultServiceName');
  const storyDirections = storyDirectionsProp || [
    { title: t('direction0Title'), description: t('direction0Description') },
    { title: t('direction1Title'), description: t('direction1Description') },
    { title: t('direction2Title'), description: t('direction2Description') },
    { title: t('direction3Title'), description: t('direction3Description') },
    { title: t('direction4Title'), description: t('direction4Description') },
    { title: t('direction5Title'), description: t('direction5Description') },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        {/* Service Example */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-primary">{labels?.example || t('example')}</p>
          </div>
          <p className="font-semibold">{serviceName}</p>
        </div>

        {/* Story Directions */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.storyDirections || t('storyDirections')}</p>
          <div className="space-y-2">
            {storyDirections.map((direction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{direction.title}</p>
                  <p className="text-xs text-muted-foreground">{direction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Message */}
        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {labels?.keyMessage || t('keyMessage')}
            </p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

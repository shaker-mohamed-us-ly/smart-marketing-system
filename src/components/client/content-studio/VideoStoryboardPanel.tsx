import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Video, Play, Clock } from "lucide-react";

export interface VideoStoryboardPanelProps extends HTMLAttributes<HTMLDivElement> {
  scenes?: { time: string; phase: string; notes: string }[];
  labels?: {
    title: string;
    description: string;
  };
}

export function VideoStoryboardPanel({ 
  scenes,
  labels,
  className, 
  ...props 
}: VideoStoryboardPanelProps) {
  const t = useTranslations('clientContentStudio.videoStoryboard');
  const defaultScenes = [
    { time: t('scenesList.scene0.time'), phase: t('scenesList.scene0.phase'), notes: t('scenesList.scene0.notes') },
    { time: t('scenesList.scene1.time'), phase: t('scenesList.scene1.phase'), notes: t('scenesList.scene1.notes') },
    { time: t('scenesList.scene2.time'), phase: t('scenesList.scene2.phase'), notes: t('scenesList.scene2.notes') },
    { time: t('scenesList.scene3.time'), phase: t('scenesList.scene3.phase'), notes: t('scenesList.scene3.notes') },
  ];
  const scenesList = scenes || defaultScenes;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Video className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {scenesList.map((scene, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Play className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{scene.time}</span>
                  </div>
                  <span className="text-sm font-semibold">{scene.phase}</span>
                </div>
                <p className="text-sm text-muted-foreground">{scene.notes}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {labels?.description || t('description')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

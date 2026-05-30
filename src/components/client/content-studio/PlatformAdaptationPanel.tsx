import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Share2, Image as ImageIcon, Video, Users, Briefcase } from "lucide-react";

export interface PlatformAdaptationPanelProps extends HTMLAttributes<HTMLDivElement> {
  adaptations?: { 
    platform: string; 
    icon: any; 
    strategy: string; 
    description: string;
  }[];
  labels?: {
    title: string;
  };
}

export function PlatformAdaptationPanel({ 
  adaptations,
  labels,
  className, 
  ...props 
}: PlatformAdaptationPanelProps) {
  const t = useTranslations('clientContentStudio.platformAdaptation');
  const defaultAdaptations = [
    { 
      platform: t('adaptationsList.instagram.platform'), 
      icon: ImageIcon, 
      strategy: t('adaptationsList.instagram.strategy'), 
      description: t('adaptationsList.instagram.description'),
    },
    { 
      platform: t('adaptationsList.tiktok.platform'), 
      icon: Video, 
      strategy: t('adaptationsList.tiktok.strategy'), 
      description: t('adaptationsList.tiktok.description'),
    },
    { 
      platform: t('adaptationsList.facebook.platform'), 
      icon: Users, 
      strategy: t('adaptationsList.facebook.strategy'), 
      description: t('adaptationsList.facebook.description'),
    },
    { 
      platform: t('adaptationsList.linkedin.platform'), 
      icon: Briefcase, 
      strategy: t('adaptationsList.linkedin.strategy'), 
      description: t('adaptationsList.linkedin.description'),
    },
  ];
  const adaptationsList = adaptations || defaultAdaptations;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Share2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {adaptationsList.map((adaptation, index) => {
            const Icon = adaptation.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold">{adaptation.platform}</p>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
                      {adaptation.strategy}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{adaptation.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

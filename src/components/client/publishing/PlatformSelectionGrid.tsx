import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Image as ImageIcon, Video, Layout, Briefcase, MessageCircle } from "lucide-react";

export interface PlatformSelectionGridProps extends HTMLAttributes<HTMLDivElement> {
  platforms?: { 
    name: string; 
    icon: any; 
    bestFormat: string; 
    postingStyle: string; 
    audienceMatch: number; 
    recommendedCTA: string;
  }[];
  labels?: {
    title: string;
    audienceMatch: string;
  };
}

export function PlatformSelectionGrid({ 
  platforms: platformsProp,
  labels,
  className, 
  ...props 
}: PlatformSelectionGridProps) {
  const t = useTranslations('clientPublishing.platformSelection');
  const platforms = platformsProp || [
    { 
      name: t('platform0Name'), 
      icon: ImageIcon, 
      bestFormat: t('platform0Format'), 
      postingStyle: t('platform0Style'), 
      audienceMatch: 94, 
      recommendedCTA: t('platform0CTA'),
    },
    { 
      name: t('platform1Name'), 
      icon: MessageCircle, 
      bestFormat: t('platform1Format'), 
      postingStyle: t('platform1Style'), 
      audienceMatch: 89, 
      recommendedCTA: t('platform1CTA'),
    },
    { 
      name: t('platform2Name'), 
      icon: Video, 
      bestFormat: t('platform2Format'), 
      postingStyle: t('platform2Style'), 
      audienceMatch: 87, 
      recommendedCTA: t('platform2CTA'),
    },
    { 
      name: t('platform3Name'), 
      icon: Briefcase, 
      bestFormat: t('platform3Format'), 
      postingStyle: t('platform3Style'), 
      audienceMatch: 82, 
      recommendedCTA: t('platform3CTA'),
    },
    { 
      name: t('platform4Name'), 
      icon: MessageCircle, 
      bestFormat: t('platform4Format'), 
      postingStyle: t('platform4Style'), 
      audienceMatch: 78, 
      recommendedCTA: t('platform4CTA'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{platform.name}</p>
                    <p className="text-xs text-muted-foreground">{platform.bestFormat}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{labels?.audienceMatch || t('audienceMatch')}</span>
                    <span className="text-xs font-medium">{platform.audienceMatch}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary/60 rounded-full transition-all duration-300"
                      style={{ width: `${platform.audienceMatch}%` }}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{platform.postingStyle}</p>
                <div className="p-2 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-xs font-medium text-primary">{platform.recommendedCTA}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

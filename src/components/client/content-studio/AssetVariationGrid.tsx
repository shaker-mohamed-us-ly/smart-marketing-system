import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Image as ImageIcon, Layout, Layers, Video, TrendingUp, CheckCircle, Clock } from "lucide-react";

export interface AssetVariationGridProps extends HTMLAttributes<HTMLDivElement> {
  variations?: { 
    name: string; 
    format: string; 
    predictedImpact: number; 
    status: string;
    icon: any;
  }[];
  labels?: {
    title: string;
  };
}

export function AssetVariationGrid({ 
  variations,
  labels,
  className, 
  ...props 
}: AssetVariationGridProps) {
  const t = useTranslations('clientContentStudio.assetVariation');
  const defaultVariations = [
    { 
      name: t('variationsList.premiumPoster'), 
      format: t('formatPoster'), 
      predictedImpact: 92, 
      status: "Ready",
      icon: ImageIcon,
    },
    { 
      name: t('variationsList.lifestylePoster'), 
      format: t('formatPoster'), 
      predictedImpact: 87, 
      status: "Ready",
      icon: ImageIcon,
    },
    { 
      name: t('variationsList.featurePoster'), 
      format: t('formatPoster'), 
      predictedImpact: 85, 
      status: "Ready",
      icon: ImageIcon,
    },
    { 
      name: t('variationsList.storyFormat'), 
      format: t('formatStory'), 
      predictedImpact: 89, 
      status: "Ready",
      icon: Layout,
    },
    { 
      name: t('variationsList.carouselCover'), 
      format: t('formatCarousel'), 
      predictedImpact: 91, 
      status: "Ready",
      icon: Layers,
    },
    { 
      name: t('variationsList.videoThumbnail'), 
      format: t('formatVideo'), 
      predictedImpact: 88, 
      status: "Ready",
      icon: Video,
    },
  ];
  const variationsList = variations || defaultVariations;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {variationsList.map((variation, index) => {
            const Icon = variation.icon;
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
                    <p className="font-semibold text-sm">{variation.name}</p>
                    <p className="text-xs text-muted-foreground">{variation.format}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{variation.predictedImpact}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {variation.status === "Ready" ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <Clock className="h-4 w-4 text-amber-500" />
                    )}
                    <span className="text-xs text-muted-foreground">{t('statusReady')}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all duration-300"
                    style={{ width: `${variation.predictedImpact}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

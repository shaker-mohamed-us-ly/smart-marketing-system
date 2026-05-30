import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Image as ImageIcon, Video, Layers, Layout, FileText, Sparkles } from "lucide-react";

export interface AssetTypeSelectorProps extends HTMLAttributes<HTMLDivElement> {
  activeType?: string;
  assetTypes?: { 
    id: string; 
    icon: any; 
    title: string; 
    description: string; 
    platform: string;
  }[];
  labels?: {
    title: string;
  };
}

export function AssetTypeSelector({ 
  activeType: activeTypeProp,
  assetTypes: assetTypesProp,
  labels,
  className, 
  ...props 
}: AssetTypeSelectorProps) {
  const t = useTranslations('clientContentStudio.assetType');
  const activeType = activeTypeProp || t('poster');
  const assetTypes = assetTypesProp || [
    { 
      id: "poster", 
      icon: ImageIcon, 
      title: t('poster'), 
      description: t('posterDescription'),
      platform: t('posterPlatform'),
    },
    { 
      id: "video", 
      icon: Video, 
      title: t('video'), 
      description: t('videoDescription'),
      platform: t('videoPlatform'),
    },
    { 
      id: "carousel", 
      icon: Layers, 
      title: t('carousel'), 
      description: t('carouselDescription'),
      platform: t('carouselPlatform'),
    },
    { 
      id: "story", 
      icon: Layout, 
      title: t('story'), 
      description: t('storyDescription'),
      platform: t('storyPlatform'),
    },
    { 
      id: "caption", 
      icon: FileText, 
      title: t('copyPack'), 
      description: t('copyPackDescription'),
      platform: t('copyPackPlatform'),
    },
    { 
      id: "ad", 
      icon: Sparkles, 
      title: t('adCreative'), 
      description: t('adCreativeDescription'),
      platform: t('adCreativePlatform'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6 mb-8", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assetTypes.map((type) => {
            const Icon = type.icon;
            const isActive = type.id === activeType;
            return (
              <div
                key={type.id}
                className={cn(
                  "p-4 rounded-xl border cursor-pointer transition-all",
                  isActive
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/40 bg-secondary/20 hover:bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    isActive ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-primary/70")} />
                  </div>
                  <h4 className={cn("font-semibold", isActive ? "text-primary" : "text-foreground")}>
                    {type.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                <p className="text-xs text-muted-foreground/70">{type.platform}</p>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

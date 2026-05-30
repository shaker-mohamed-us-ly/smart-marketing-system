import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Image as ImageIcon, Video, Layout, FileText, BarChart3, TrendingUp } from "lucide-react";

export interface ContentPerformanceMatrixProps extends HTMLAttributes<HTMLDivElement> {
  assets?: { 
    type: string; 
    engagement: string; 
    conversion: string; 
    costEfficiency: string; 
    bestPlatform: string;
    icon: any;
  }[];
  labels?: {
    title: string;
    content: string;
    performance: string;
    topAssets: string;
    optimization: string;
    assetType: string;
    engagement: string;
    conversion: string;
    costEfficiency: string;
    bestPlatform: string;
    poster?: string;
    reel?: string;
    story?: string;
    carousel?: string;
    textPack?: string;
    videoAd?: string;
    high?: string;
    medium?: string;
    veryHigh?: string;
    low?: string;
    all?: string;
    platforms?: {
      instagram?: string;
      tiktok?: string;
      facebook?: string;
      youtube?: string;
      all?: string;
    };
  };
}

export function ContentPerformanceMatrix({ 
  assets,
  labels,
  className, 
  ...props 
}: ContentPerformanceMatrixProps) {
  const t = useTranslations('clientAnalytics.contentPerformance');
  const defaultAssets = [
    { 
      type: "poster", 
      engagement: "8.2%", 
      conversion: "3.1%", 
      costEfficiency: "high", 
      bestPlatform: "instagram",
      icon: ImageIcon,
    },
    { 
      type: "reel", 
      engagement: "12.4%", 
      conversion: "4.8%", 
      costEfficiency: "medium", 
      bestPlatform: "tiktok",
      icon: Video,
    },
    { 
      type: "story", 
      engagement: "6.8%", 
      conversion: "2.9%", 
      costEfficiency: "high", 
      bestPlatform: "instagram",
      icon: Layout,
    },
    { 
      type: "carousel", 
      engagement: "9.1%", 
      conversion: "3.5%", 
      costEfficiency: "medium", 
      bestPlatform: "facebook",
      icon: Layout,
    },
    { 
      type: "textPack", 
      engagement: "5.4%", 
      conversion: "2.1%", 
      costEfficiency: "veryHigh", 
      bestPlatform: t('all'),
      icon: FileText,
    },
    { 
      type: "videoAd", 
      engagement: "10.2%", 
      conversion: "5.2%", 
      costEfficiency: "low", 
      bestPlatform: "youtube",
      icon: Video,
    },
  ];
  const assetsList = assets || defaultAssets;
  const l = labels || {
    title: t('title'),
    content: t('content'),
    performance: t('performance'),
    topAssets: t('topAssets'),
    optimization: t('optimization'),
    assetType: t('assetType'),
    engagement: t('engagement'),
    conversion: t('conversion'),
    costEfficiency: t('costEfficiency'),
    bestPlatform: t('bestPlatform'),
    poster: t('poster'),
    reel: t('reel'),
    story: t('story'),
    carousel: t('carousel'),
    textPack: t('textPack'),
    videoAd: t('videoAd'),
    high: t('high'),
    medium: t('medium'),
    veryHigh: t('veryHigh'),
    low: t('low'),
    all: t('all'),
    platforms: {
      instagram: t('platforms.instagram'),
      tiktok: t('platforms.tiktok'),
      facebook: t('platforms.facebook'),
      youtube: t('platforms.youtube'),
      all: t('platforms.all'),
    },
  };

  const getAssetText = (key: string): string => {
    if (key === 'instagram' || key === 'tiktok' || key === 'facebook' || key === 'youtube' || key === 'all') {
      return (l.platforms?.[key as keyof typeof l.platforms] as string) || key;
    }
    return (l[key as keyof typeof l] as string) || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 text-sm font-medium">{l.assetType}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{l.engagement}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{l.conversion}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{l.costEfficiency}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{l.bestPlatform}</th>
              </tr>
            </thead>
            <tbody>
              {assetsList.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <tr key={index} className="border-b border-border/20 hover:bg-secondary/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{getAssetText(asset.type)}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{asset.engagement}</td>
                    <td className="py-3 px-4 text-sm">{asset.conversion}</td>
                    <td className="py-3 px-4 text-sm">{getAssetText(asset.costEfficiency)}</td>
                    <td className="py-3 px-4 text-sm">{getAssetText(asset.bestPlatform)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </StaticCard>
  );
}

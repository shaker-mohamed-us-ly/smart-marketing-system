import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, Image as ImageIcon, Video, Layout, FileText, CheckCircle } from "lucide-react";

export interface CampaignPublishPreviewProps extends HTMLAttributes<HTMLDivElement> {
  campaign?: string;
  assets?: { name: string; icon: any }[];
  platforms?: string[];
  status?: string;
  labels?: {
    title: string;
    campaign: string;
    assetsReady: string;
    platforms: string;
    campaignStatus: string;
  };
}

export function CampaignPublishPreview({ 
  campaign,
  assets,
  platforms,
  status,
  labels,
  className, 
  ...props 
}: CampaignPublishPreviewProps) {
  const t = useTranslations('clientPublishing');
  const defaultCampaign = t('campaignPreview.defaultCampaign');
  const defaultAssets = [
    { name: t('campaignPreview.poster'), icon: ImageIcon },
    { name: t('campaignPreview.reel'), icon: Video },
    { name: t('campaignPreview.story'), icon: Layout },
    { name: t('campaignPreview.copyPack'), icon: FileText },
  ];
  const defaultPlatforms = [t('campaignPreview.instagram'), t('campaignPreview.facebook'), t('campaignPreview.tiktok')];
  const defaultStatus = t('campaignPreview.readyToPublish');
  const campaignValue = campaign || defaultCampaign;
  const assetsList = assets || defaultAssets;
  const platformsList = platforms || defaultPlatforms;
  const statusValue = status || defaultStatus;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('campaignPreview.title')}</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-1">{labels?.campaign || t('campaignPreview.campaign')}</p>
            <p className="font-semibold text-primary">{campaignValue}</p>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">{labels?.assetsReady || t('campaignPreview.assetsReady')}</p>
            <div className="flex flex-wrap gap-2">
              {assetsList.map((asset, index) => {
                const Icon = asset.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{asset.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">{labels?.platforms || t('campaignPreview.platforms')}</p>
            <div className="flex flex-wrap gap-2">
              {platformsList.map((platform, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/20"
                >
                  <span className="text-sm font-medium text-primary">{platform}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.campaignStatus || t('campaignPreview.campaignStatus')}</p>
              <p className="font-semibold text-emerald-600">{statusValue}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

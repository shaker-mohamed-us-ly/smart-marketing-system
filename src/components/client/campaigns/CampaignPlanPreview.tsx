import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, Users, Sparkles, Image as ImageIcon, Share2, Calendar, ArrowRight } from "lucide-react";

export interface CampaignPlanPreviewProps extends HTMLAttributes<HTMLDivElement> {
  campaignGoal?: string;
  audience?: string;
  creativeAngle?: string;
  outputAssets?: string[];
  platformVersions?: string[];
  recommendedSchedule?: string;
  cta?: string;
  labels?: {
    title: string;
    timeline: string;
    budget: string;
    channels: string;
    kpis: string;
    campaignGoal: string;
    audience: string;
    creativeAngle: string;
    outputAssets: string;
    platformVersions: string;
    recommendedSchedule: string;
    cta: string;
    week?: string;
    awareness?: string;
    engagement?: string;
    conversion?: string;
    poster?: string;
    tenSecondVideo?: string;
    socialStory?: string;
    offerAd?: string;
  };
}

export function CampaignPlanPreview({ 
  campaignGoal,
  audience,
  creativeAngle,
  outputAssets,
  platformVersions,
  recommendedSchedule,
  cta,
  labels,
  className, 
  ...props 
}: CampaignPlanPreviewProps) {
  const t = useTranslations('clientCampaigns.planPreview');
  const defaultCampaignGoal = t('defaultCampaignGoal');
  const defaultAudience = t('defaultAudience');
  const defaultCreativeAngle = t('defaultCreativeAngle');
  const defaultOutputAssets = ["poster", "tenSecondVideo", "socialStory", "offerAd"];
  const defaultPlatformVersions = ["Instagram", "Facebook", "Google Ads", "TikTok"];
  const defaultRecommendedSchedule = "week 1: awareness, week 2: engagement, week 3: conversion";
  const defaultCTA = t('defaultCTA');
  const campaignGoalValue = campaignGoal || defaultCampaignGoal;
  const audienceValue = audience || defaultAudience;
  const creativeAngleValue = creativeAngle || defaultCreativeAngle;
  const outputAssetsValue = outputAssets || defaultOutputAssets;
  const platformVersionsValue = platformVersions || defaultPlatformVersions;
  const recommendedScheduleValue = recommendedSchedule || defaultRecommendedSchedule;
  const ctaValue = cta || defaultCTA;
  const l = labels || {
    title: t('title'),
    timeline: t('timeline'),
    budget: t('budget'),
    channels: t('channels'),
    kpis: t('kpis'),
    campaignGoal: t('campaignGoal'),
    audience: t('audience'),
    creativeAngle: t('creativeAngle'),
    outputAssets: t('outputAssets'),
    platformVersions: t('platformVersions'),
    recommendedSchedule: t('recommendedSchedule'),
    cta: t('cta'),
    week: t('week'),
    awareness: t('awareness'),
    engagement: t('engagement'),
    conversion: t('conversion'),
    poster: t('poster'),
    tenSecondVideo: t('tenSecondVideo'),
    socialStory: t('socialStory'),
    offerAd: t('offerAd'),
  };

  const getAssetText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  const getScheduleText = (text: string): string => {
    return text
      .replace(/week/gi, l.week || "Week")
      .replace(/awareness/gi, l.awareness || "Awareness")
      .replace(/engagement/gi, l.engagement || "Engagement")
      .replace(/conversion/gi, l.conversion || "Conversion");
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <Target className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.campaignGoal}</p>
              <p className="text-sm font-medium">{campaignGoalValue}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.audience}</p>
              <p className="text-sm font-medium">{audienceValue}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.creativeAngle}</p>
              <p className="text-sm font-medium">{creativeAngleValue}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <ImageIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.outputAssets}</p>
              <div className="flex flex-wrap gap-2">
                {outputAssetsValue.map((asset, index) => (
                  <span key={index} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {getAssetText(asset)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <Share2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.platformVersions}</p>
              <div className="flex flex-wrap gap-2">
                {platformVersionsValue.map((platform, index) => (
                  <span key={index} className="text-xs font-medium px-2 py-1 rounded-full bg-secondary/50 text-foreground">
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30">
            <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.recommendedSchedule}</p>
              <p className="text-sm font-medium">{getScheduleText(recommendedScheduleValue)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.cta}</p>
              <p className="text-sm font-semibold text-primary">{ctaValue}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Rocket, Image as ImageIcon, Video, Calendar, MessageSquare, Package } from "lucide-react";

export interface UrgentLaunchPanelProps extends HTMLAttributes<HTMLDivElement> {
  quickActions?: { title: string; icon: any; description: string }[];
  labels?: {
    title: string;
    fastTrack: string;
    immediate: string;
    priority: string;
    launch: string;
    launchNow: string;
    createPosterNow?: string;
    instantPosterCreation?: string;
    create10SecondVideo?: string;
    quickVideoConcept?: string;
    launchOfferToday?: string;
    sameDayCampaign?: string;
    createSocialCopy?: string;
    aiPoweredCopy?: string;
    prepareCampaignPack?: string;
    fullAssetPack?: string;
    previewOnly?: string;
  };
}

export function UrgentLaunchPanel({ 
  quickActions = [
    { 
      title: "createPosterNow", 
      icon: ImageIcon, 
      description: "instantPosterCreation",
    },
    { 
      title: "create10SecondVideo", 
      icon: Video, 
      description: "quickVideoConcept",
    },
    { 
      title: "launchOfferToday", 
      icon: Calendar, 
      description: "sameDayCampaign",
    },
    { 
      title: "createSocialCopy", 
      icon: MessageSquare, 
      description: "aiPoweredCopy",
    },
    { 
      title: "prepareCampaignPack", 
      icon: Package, 
      description: "fullAssetPack",
    },
  ],
  labels,
  className, 
  ...props 
}: UrgentLaunchPanelProps) {
  const t = useTranslations('clientCampaigns.urgentLaunch');
  const l = labels || {
    title: t('title'),
    fastTrack: t('fastTrack'),
    immediate: t('immediate'),
    priority: t('priority'),
    launch: t('launch'),
    launchNow: t('launchNow'),
    createPosterNow: t('createPosterNow'),
    instantPosterCreation: t('instantPosterCreation'),
    create10SecondVideo: t('create10SecondVideo'),
    quickVideoConcept: t('quickVideoConcept'),
    launchOfferToday: t('launchOfferToday'),
    sameDayCampaign: t('sameDayCampaign'),
    createSocialCopy: t('createSocialCopy'),
    aiPoweredCopy: t('aiPoweredCopy'),
    prepareCampaignPack: t('prepareCampaignPack'),
    fullAssetPack: t('fullAssetPack'),
    previewOnly: t('previewOnly'),
  };

  const getActionText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-2 mb-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getActionText(action.title)}</p>
                  <p className="text-xs text-muted-foreground">{getActionText(action.description)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <SmartButton className="w-full gap-2">
          <Rocket className="h-4 w-4" />
          {l.launchNow}
        </SmartButton>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {l.previewOnly}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

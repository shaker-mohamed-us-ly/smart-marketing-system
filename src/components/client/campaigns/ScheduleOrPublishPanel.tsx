import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Save, Calendar, Rocket, Share2 } from "lucide-react";

export interface ScheduleOrPublishPanelProps extends HTMLAttributes<HTMLDivElement> {
  options?: { title: string; icon: any; description: string; variant?: "default" | "primary" }[];
  labels?: {
    title: string;
    schedule: string;
    publish: string;
    calendar: string;
    queue: string;
    saveDraft: string;
    publishCampaign: string;
    saveAsDraft?: string;
    saveForLater?: string;
    scheduleCampaign?: string;
    setLaunchDate?: string;
    prepareForPublishing?: string;
    prepareAssets?: string;
    urgentLaunch?: string;
    launchNow?: string;
    previewOnly?: string;
  };
}

export function ScheduleOrPublishPanel({ 
  options = [
    { 
      title: "saveAsDraft", 
      icon: Save, 
      description: "saveForLater",
      variant: "default",
    },
    { 
      title: "scheduleCampaign", 
      icon: Calendar, 
      description: "setLaunchDate",
      variant: "default",
    },
    { 
      title: "prepareForPublishing", 
      icon: Share2, 
      description: "prepareAssets",
      variant: "default",
    },
    { 
      title: "urgentLaunch", 
      icon: Rocket, 
      description: "launchNow",
      variant: "primary",
    },
  ],
  labels,
  className, 
  ...props 
}: ScheduleOrPublishPanelProps) {
  const t = useTranslations('clientCampaigns.schedulePublish');
  const l = labels || {
    title: t('title'),
    schedule: t('schedule'),
    publish: t('publish'),
    calendar: t('calendar'),
    queue: t('queue'),
    saveDraft: t('saveDraft'),
    publishCampaign: t('publishCampaign'),
    saveAsDraft: t('saveAsDraft'),
    saveForLater: t('saveForLater'),
    scheduleCampaign: t('scheduleCampaign'),
    setLaunchDate: t('setLaunchDate'),
    prepareForPublishing: t('prepareForPublishing'),
    prepareAssets: t('prepareAssets'),
    urgentLaunch: t('urgentLaunch'),
    launchNow: t('launchNow'),
    previewOnly: t('previewOnly'),
  };

  const getOptionText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Share2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-2 mb-6">
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer"
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  option.variant === "primary" ? "bg-primary/20" : "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    option.variant === "primary" ? "text-primary" : "text-primary/70"
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getOptionText(option.title)}</p>
                  <p className="text-xs text-muted-foreground">{getOptionText(option.description)}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <SmartButton variant="outline" className="w-full gap-2">
            <Save className="h-4 w-4" />
            {l.saveDraft}
          </SmartButton>
          <SmartButton className="w-full gap-2">
            <Rocket className="h-4 w-4" />
            {l.publishCampaign}
          </SmartButton>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {l.previewOnly}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

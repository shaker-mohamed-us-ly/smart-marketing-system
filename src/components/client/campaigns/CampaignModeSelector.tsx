import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Sparkles, Package, Heart, Rocket } from "lucide-react";

export interface CampaignModeSelectorProps extends HTMLAttributes<HTMLDivElement> {
  activeMode?: string;
  labels?: {
    smartCampaign: string;
    manualCampaign: string;
    smartDescription: string;
    smartBestFor: string;
    productCampaign: string;
    productDescription: string;
    productBestFor: string;
    serviceCampaign: string;
    serviceDescription: string;
    serviceBestFor: string;
    urgentLaunch: string;
    urgentDescription: string;
    urgentBestFor: string;
  };
}

export function CampaignModeSelector({ activeMode, labels, className, ...props }: CampaignModeSelectorProps) {
  const t = useTranslations('clientCampaigns.modeSelector');
  const modes = [
    {
      id: "smart",
      icon: Sparkles,
      title: labels?.smartCampaign || t('smartCampaign'),
      description: labels?.smartDescription || t('smartDescription'),
      bestFor: labels?.smartBestFor || t('smartBestFor'),
    },
    {
      id: "product",
      icon: Package,
      title: labels?.productCampaign || t('productCampaign'),
      description: labels?.productDescription || t('productDescription'),
      bestFor: labels?.productBestFor || t('productBestFor'),
    },
    {
      id: "service",
      icon: Heart,
      title: labels?.serviceCampaign || t('serviceCampaign'),
      description: labels?.serviceDescription || t('serviceDescription'),
      bestFor: labels?.serviceBestFor || t('serviceBestFor'),
    },
    {
      id: "urgent",
      icon: Rocket,
      title: labels?.urgentLaunch || t('urgentLaunch'),
      description: labels?.urgentDescription || t('urgentDescription'),
      bestFor: labels?.urgentBestFor || t('urgentBestFor'),
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8", className)} {...props}>
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = mode.title === activeMode;
        return (
          <StaticCard
            key={mode.id}
            depth={isActive ? "medium" : "subtle"}
            className={cn(
              "p-5 cursor-pointer transition-all",
              isActive && "border-primary/50"
            )}
          >
            <MotionLayer hoverLift lightSweep={!isActive} />
            <div className="relative z-10">
              <div className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                isActive ? "bg-primary/20" : "bg-primary/10"
              )}>
                <Icon className={cn("h-6 w-6", isActive ? "text-primary" : "text-primary/70")} />
              </div>
              <h3 className={cn("font-semibold mb-2", isActive ? "text-primary" : "text-foreground")}>
                {mode.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{mode.description}</p>
              <p className="text-xs text-muted-foreground/70">{mode.bestFor}</p>
            </div>
          </StaticCard>
        );
      })}
    </div>
  );
}

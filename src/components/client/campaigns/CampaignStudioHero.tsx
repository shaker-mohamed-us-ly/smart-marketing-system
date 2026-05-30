import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Plus, Rocket } from "lucide-react";

export interface CampaignStudioHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  newCampaign?: string;
  urgentLaunch?: string;
}

export function CampaignStudioHero({ 
  title,
  subtitle,
  newCampaign,
  urgentLaunch,
  className, 
  ...props 
}: CampaignStudioHeroProps) {
  const t = useTranslations('clientCampaigns.hero');
  const defaultTitle = t('title');
  const defaultSubtitle = t('subtitle');
  const defaultNewCampaign = t('newCampaign');
  const defaultUrgentLaunch = t('urgentLaunch');
  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{title || defaultTitle}</h1>
          <p className="text-muted-foreground max-w-2xl">{subtitle || defaultSubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            {newCampaign || defaultNewCampaign}
          </SmartButton>
          <SmartButton className="gap-2">
            <Rocket className="h-4 w-4" />
            {urgentLaunch || defaultUrgentLaunch}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Send, Save } from "lucide-react";

export interface PublishingHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: {
    saveDraft: string;
    publishCampaign: string;
  };
}

export function PublishingHero({ 
  title: titleProp,
  subtitle: subtitleProp,
  labels,
  className, 
  ...props 
}: PublishingHeroProps) {
  const t = useTranslations('clientPublishing.hero');
  const displayTitle = titleProp ?? t('title');
  const displaySubtitle = subtitleProp ?? t('subtitle');
  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{displayTitle}</h1>
          <p className="text-muted-foreground max-w-2xl">{displaySubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            {labels?.saveDraft || t('saveDraft')}
          </SmartButton>
          <SmartButton className="gap-2">
            <Send className="h-4 w-4" />
            {labels?.publishCampaign || t('publishCampaign')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

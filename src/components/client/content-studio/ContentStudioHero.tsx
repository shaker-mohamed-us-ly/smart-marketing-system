import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { Plus, Sparkles } from "lucide-react";

export interface ContentStudioHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: {
    newCreative: string;
    generateAssetPack: string;
  };
}

export function ContentStudioHero({ 
  title: titleProp,
  subtitle: subtitleProp,
  labels,
  className, 
  ...props 
}: ContentStudioHeroProps) {
  const t = useTranslations('clientContentStudio.hero');
  const title = titleProp || t('title');
  const subtitle = subtitleProp || t('subtitle');
  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{title}</h1>
          <p className="text-muted-foreground max-w-2xl">{subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            {labels?.newCreative || t('newCreative')}
          </SmartButton>
          <SmartButton className="gap-2">
            <Sparkles className="h-4 w-4" />
            {labels?.generateAssetPack || t('generateAssetPack')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

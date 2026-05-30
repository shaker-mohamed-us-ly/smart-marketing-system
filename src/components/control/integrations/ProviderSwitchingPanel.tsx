   import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { GitBranch, Settings, ArrowRight } from "lucide-react";

export interface ProviderSwitchingPanelProps extends HTMLAttributes<HTMLDivElement> {
  currentProviders?: { 
    role: string; 
    provider: string; 
  }[];
  labels?: {
    title: string;
    switching: string;
    providers: string;
    transition: string;
    backup: string;
    changeDefaultImageProvider: string;
    changeDefaultVideoProvider: string;
    reviewRoutingRules: string;
  };
}

export function ProviderSwitchingPanel({ 
  currentProviders: currentProvidersProp,
  labels,
  className, 
  ...props 
}: ProviderSwitchingPanelProps) {
  const t = useTranslations('controlIntegrations.providerSwitching');
  const currentProviders = currentProvidersProp || [
    { 
      role: t('roles.defaultImageProvider'), 
      provider: "Leonardo AI",
    },
    { 
      role: t('roles.defaultVideoProvider'), 
      provider: "Kling AI",
    },
    { 
      role: t('roles.premiumImageProvider'), 
      provider: "Nano Banana",
    },
    { 
      role: t('roles.printProvider'), 
      provider: "Ideogram",
    },
    { 
      role: t('roles.backupProvider'), 
      provider: "Flux Self-hosted",
    },
  ];
  const l = labels || {
    title: t('title'),
    switching: t('switching'),
    providers: t('providers'),
    transition: t('transition'),
    backup: t('backup'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GitBranch className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {t('explanation')}
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {currentProviders.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <div className="flex items-center gap-3">
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                  <p className="text-sm font-medium">{item.provider}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <SmartButton variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" />
            {labels?.changeDefaultImageProvider || t('changeDefaultImageProvider')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <Settings className="h-4 w-4" />
            {labels?.changeDefaultVideoProvider || t('changeDefaultVideoProvider')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <GitBranch className="h-4 w-4" />
            {labels?.reviewRoutingRules || t('reviewRoutingRules')}
          </SmartButton>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {t('visualOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

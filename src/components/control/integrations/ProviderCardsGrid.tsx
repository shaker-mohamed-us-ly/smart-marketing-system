import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { IconTile } from "@/components/shared/icons/IconTile";
import { CheckCircle, Plus, X, Settings, Zap, Image, Video, Palette, Server } from "lucide-react";

export interface ProviderCardsGridProps extends HTMLAttributes<HTMLDivElement> {
  providers?: {
    name: string;
    status: "Connected" | "Available" | "Suggested" | "Planning";
    bestFor: string;
    monthlySpend?: string;
    icon?: any;
    palette?: "violet" | "blue" | "green" | "rose" | "amber" | "slate";
  }[];
  labels?: {
    title: string;
    providers: string;
    status: string;
    cost: string;
    performance: string;
    visualOnly?: string;
  };
}

export function ProviderCardsGrid({ 
  providers: providersProp,
  labels,
  className, 
  ...props 
}: ProviderCardsGridProps) {
  const t = useTranslations('controlIntegrations.providerCards');
  const defaultProviders = [
    { 
      name: t('providersList.leonardo.name'), 
      status: "connected", 
      bestFor: t('providersList.leonardo.bestFor'),
      monthlySpend: t('providersList.leonardo.monthlySpend'),
      icon: Image,
      palette: "violet",
    },
    { 
      name: t('providersList.ideogram.name'), 
      status: "connected", 
      bestFor: t('providersList.ideogram.bestFor'),
      monthlySpend: t('providersList.ideogram.monthlySpend'),
      icon: Palette,
      palette: "rose",
    },
    { 
      name: t('providersList.kling.name'), 
      status: "available", 
      bestFor: t('providersList.kling.bestFor'),
      monthlySpend: t('providersList.kling.monthlySpend'),
      icon: Video,
      palette: "blue",
    },
    { 
      name: t('providersList.runway.name'), 
      status: "available", 
      bestFor: t('providersList.runway.bestFor'),
      monthlySpend: t('providersList.runway.monthlySpend'),
      icon: Video,
      palette: "violet",
    },
    { 
      name: t('providersList.nanoBanana.name'), 
      status: "suggested", 
      bestFor: t('providersList.nanoBanana.bestFor'),
      icon: Zap,
      palette: "amber",
    },
    { 
      name: t('providersList.flux.name'), 
      status: "planning", 
      bestFor: t('providersList.flux.bestFor'),
      icon: Server,
      palette: "slate",
    },
  ];
  const providers = providersProp || defaultProviders;
  const l = labels || {
    title: t('title'),
    providers: t('providers'),
    status: t('status'),
    cost: t('cost'),
    performance: t('performance'),
    visualOnly: t('visualOnly'),
  };

  const getActionForStatus = (status: string) => {
    switch (status) {
      case "connected":
        return { label: t('actions.disconnect'), icon: X, variant: "outline" as const };
      case "available":
        return { label: t('actions.connect'), icon: Plus, variant: "primary" as const };
      case "suggested":
        return { label: t('actions.review'), icon: Settings, variant: "outline" as const };
      case "planning":
        return { label: t('actions.setup'), icon: Plus, variant: "outline" as const };
      default:
        return { label: t('actions.connect'), icon: Plus, variant: "primary" as const };
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      case "available":
        return "text-primary bg-primary/10 border-primary/20";
      case "suggested":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "planning":
        return "text-muted-foreground bg-secondary/30 border-border/40";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer motionVariant="none" />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider, index) => {
            const action = getActionForStatus(provider.status);
            const ActionIcon = action.icon;
            const ProviderIcon = provider.icon || Image;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/40"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <IconTile icon={ProviderIcon} palette={provider.palette as "violet" | "blue" | "green" | "rose" | "amber" | "slate" || "violet"} size="sm" />
                    <p className="font-semibold">{provider.name}</p>
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium border",
                    getStatusColor(provider.status)
                  )}>
                    {provider.status === "connected" && <CheckCircle className="h-3 w-3 inline mr-1" />}
                    {t(`statuses.${provider.status}` as any)}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{provider.bestFor}</p>
                {provider.monthlySpend && (
                  <p className="text-xs text-muted-foreground mb-3">{provider.monthlySpend}</p>
                )}
                <SmartButton variant={action.variant} size="sm" className="w-full gap-2">
                  <ActionIcon className="h-4 w-4" />
                  {action.label}
                </SmartButton>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {l.visualOnly}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

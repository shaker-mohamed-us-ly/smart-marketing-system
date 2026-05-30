import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Layers, Package, Heart, Truck, Shield, Sparkles } from "lucide-react";

export interface HybridCampaignPanelProps extends HTMLAttributes<HTMLDivElement> {
  businessName?: string;
  campaignTypes?: { title: string; description: string; icon: any }[];
  labels?: {
    title: string;
    productName: string;
    serviceName: string;
    balance: string;
    readiness: string;
    autoDetected: string;
    uploadAssets: string;
    uploadDescription: string;
    generatedAssets: string;
    example: string;
    systemCreates: string;
    productOffer?: string;
    premiumPhoneOffers?: string;
    repairTrustCampaign?: string;
    focusOnServiceReliability?: string;
    bundleCampaign?: string;
    productAndServiceBundles?: string;
    deliveryServiceMessage?: string;
    highlightConvenience?: string;
    postSaleTrust?: string;
    supportGuarantee?: string;
  };
}

export function HybridCampaignPanel({ 
  businessName,
  campaignTypes,
  labels,
  className, 
  ...props 
}: HybridCampaignPanelProps) {
  const t = useTranslations('clientCampaigns.hybridCampaign');
  const defaultBusinessName = t('defaultBusinessName');
  const defaultCampaignTypes = [
    { 
      title: "productOffer", 
      description: "premiumPhoneOffers",
      icon: Package,
    },
    { 
      title: "repairTrustCampaign", 
      description: "focusOnServiceReliability",
      icon: Heart,
    },
    { 
      title: "bundleCampaign", 
      description: "productAndServiceBundles",
      icon: Layers,
    },
    { 
      title: "deliveryServiceMessage", 
      description: "highlightConvenience",
      icon: Truck,
    },
    { 
      title: "postSaleTrust", 
      description: "supportGuarantee",
      icon: Shield,
    },
  ];
  const businessNameValue = businessName || defaultBusinessName;
  const campaignTypesValue = campaignTypes || defaultCampaignTypes;
  const l = labels || {
    title: t('title'),
    productName: t('productName'),
    serviceName: t('serviceName'),
    balance: t('balance'),
    readiness: t('readiness'),
    autoDetected: t('autoDetected'),
    uploadAssets: t('uploadAssets'),
    uploadDescription: t('uploadDescription'),
    generatedAssets: t('generatedAssets'),
    example: t('example'),
    systemCreates: t('systemCreates'),
    productOffer: t('productOffer'),
    premiumPhoneOffers: t('premiumPhoneOffers'),
    repairTrustCampaign: t('repairTrustCampaign'),
    focusOnServiceReliability: t('focusOnServiceReliability'),
    bundleCampaign: t('bundleCampaign'),
    productAndServiceBundles: t('productAndServiceBundles'),
    deliveryServiceMessage: t('deliveryServiceMessage'),
    highlightConvenience: t('highlightConvenience'),
    postSaleTrust: t('postSaleTrust'),
    supportGuarantee: t('supportGuarantee'),
  };

  const getCampaignTypeText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Layers className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        {/* Hybrid Business Example */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-primary">{l.example}</p>
          </div>
          <p className="font-semibold">{businessNameValue}</p>
        </div>

        {/* Campaign Types */}
        <div>
          <p className="text-sm font-medium mb-3">{l.systemCreates}</p>
          <div className="space-y-2">
            {campaignTypesValue.map((type, index) => {
              const Icon = type.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{getCampaignTypeText(type.title)}</p>
                    <p className="text-xs text-muted-foreground">{getCampaignTypeText(type.description)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Package, Heart, Layers } from "lucide-react";

export interface BusinessModelRouterProps extends HTMLAttributes<HTMLDivElement> {
  activeModel?: string;
  labels?: {
    product: string;
    service: string;
    hybrid: string;
    title: string;
    productDescription: string;
    productImageRequired: string;
    visualFocusedCampaigns: string;
    studioPhotographyDirection: string;
    productVideoConcepts: string;
    serviceDescription: string;
    trustBasedMarketing: string;
    beforeAfterTransformations: string;
    emotionalComfortFocus: string;
    customerOutcomeStories: string;
    hybridDescription: string;
    productServiceCampaigns: string;
    bundleOffers: string;
    afterSalesConfidence: string;
    multiAngleStorytelling: string;
  };
}

export function BusinessModelRouter({ activeModel = "Product", labels, className, ...props }: BusinessModelRouterProps) {
  const t = useTranslations('clientCampaigns.businessModel');
  const l = labels || {
    product: t('product'),
    service: t('service'),
    hybrid: t('hybrid'),
    title: t('title'),
    productDescription: t('productDescription'),
    productImageRequired: t('productImageRequired'),
    visualFocusedCampaigns: t('visualFocusedCampaigns'),
    studioPhotographyDirection: t('studioPhotographyDirection'),
    productVideoConcepts: t('productVideoConcepts'),
    serviceDescription: t('serviceDescription'),
    trustBasedMarketing: t('trustBasedMarketing'),
    beforeAfterTransformations: t('beforeAfterTransformations'),
    emotionalComfortFocus: t('emotionalComfortFocus'),
    customerOutcomeStories: t('customerOutcomeStories'),
    hybridDescription: t('hybridDescription'),
    productServiceCampaigns: t('productServiceCampaigns'),
    bundleOffers: t('bundleOffers'),
    afterSalesConfidence: t('afterSalesConfidence'),
    multiAngleStorytelling: t('multiAngleStorytelling'),
  };

  const models = [
    {
      id: "product",
      icon: Package,
      title: l.product,
      description: l.productDescription,
      details: [
        l.productImageRequired,
        l.visualFocusedCampaigns,
        l.studioPhotographyDirection,
        l.productVideoConcepts,
      ],
    },
    {
      id: "service",
      icon: Heart,
      title: l.service,
      description: l.serviceDescription,
      details: [
        l.trustBasedMarketing,
        l.beforeAfterTransformations,
        l.emotionalComfortFocus,
        l.customerOutcomeStories,
      ],
    },
    {
      id: "hybrid",
      icon: Layers,
      title: l.hybrid,
      description: l.hybridDescription,
      details: [
        l.productServiceCampaigns,
        l.bundleOffers,
        l.afterSalesConfidence,
        l.multiAngleStorytelling,
      ],
    },
  ];

  return (
    <StaticCard depth="subtle" className={cn("p-6 mb-8", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model) => {
            const Icon = model.icon;
            const isActive = model.id === activeModel;
            return (
              <div
                key={model.id}
                className={cn(
                  "p-4 rounded-xl border transition-all cursor-pointer",
                  isActive
                    ? "border-primary/50 bg-primary/5"
                    : "border-border/40 bg-secondary/20 hover:bg-secondary/30"
                )}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center",
                    isActive ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-primary/70")} />
                  </div>
                  <h4 className={cn("font-semibold", isActive ? "text-primary" : "text-foreground")}>
                    {model.title}
                  </h4>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                <ul className="space-y-1">
                  {model.details.map((detail, index) => (
                    <li key={index} className="text-xs text-muted-foreground/70 flex items-start gap-2">
                      <span className="text-primary">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

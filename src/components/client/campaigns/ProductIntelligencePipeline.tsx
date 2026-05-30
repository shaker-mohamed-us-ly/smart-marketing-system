import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Package, Search, Eye, Sparkles, Image as ImageIcon, Video, Share2, CheckCircle } from "lucide-react";

export interface ProductIntelligencePipelineProps extends HTMLAttributes<HTMLDivElement> {
  stages?: { name: string; icon: any; status: string }[];
  labels?: {
    title: string;
    analyzing: string;
    category: string;
    audience: string;
    market: string;
    trends: string;
    productInspection?: string;
    marketResearch?: string;
    competitorDiscovery?: string;
    imageQualityAnalysis?: string;
    creativeDirection?: string;
    posterCreation?: string;
    videoConcept?: string;
    platformAdaptation?: string;
    complete?: string;
    inProgress?: string;
    pending?: string;
    visualPreviewOnly?: string;
  };
}

export function ProductIntelligencePipeline({ 
  stages = [
    { name: "productInspection", icon: Package, status: "complete" },
    { name: "marketResearch", icon: Search, status: "complete" },
    { name: "competitorDiscovery", icon: Eye, status: "complete" },
    { name: "imageQualityAnalysis", icon: ImageIcon, status: "inProgress" },
    { name: "creativeDirection", icon: Sparkles, status: "pending" },
    { name: "posterCreation", icon: ImageIcon, status: "pending" },
    { name: "videoConcept", icon: Video, status: "pending" },
    { name: "platformAdaptation", icon: Share2, status: "pending" },
  ],
  labels,
  className, 
  ...props 
}: ProductIntelligencePipelineProps) {
  const t = useTranslations('clientCampaigns.productIntelligence');
  const l = labels || {
    title: t('title'),
    analyzing: t('analyzing'),
    category: t('category'),
    audience: t('audience'),
    market: t('market'),
    trends: t('trends'),
    productInspection: t('productInspection'),
    marketResearch: t('marketResearch'),
    competitorDiscovery: t('competitorDiscovery'),
    imageQualityAnalysis: t('imageQualityAnalysis'),
    creativeDirection: t('creativeDirection'),
    posterCreation: t('posterCreation'),
    videoConcept: t('videoConcept'),
    platformAdaptation: t('platformAdaptation'),
    complete: t('complete'),
    inProgress: t('inProgress'),
    pending: t('pending'),
    visualPreviewOnly: t('visualPreviewOnly'),
  };

  const getStageName = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  const getStatusText = (key: string): string => {
    if (key === "complete") return l.complete || "Complete";
    if (key === "inProgress") return l.inProgress || "In progress";
    if (key === "pending") return l.pending || "Pending";
    return key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isComplete = stage.status === "complete";
            const isInProgress = stage.status === "inProgress";
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  isComplete && "bg-emerald-500/10 border border-emerald-500/20",
                  isInProgress && "bg-primary/10 border border-primary/20",
                  !isComplete && !isInProgress && "bg-secondary/30"
                )}
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  isComplete && "bg-emerald-500/20",
                  isInProgress && "bg-primary/20",
                  !isComplete && !isInProgress && "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "h-4 w-4",
                    isComplete && "text-emerald-600",
                    isInProgress && "text-primary",
                    !isComplete && !isInProgress && "text-primary/70"
                  )} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{getStageName(stage.name)}</p>
                </div>
                <div className="flex items-center gap-2">
                  {isComplete && (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-xs text-emerald-600">{getStatusText(stage.status)}</span>
                    </>
                  )}
                  {isInProgress && (
                    <>
                      <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-xs text-primary">{getStatusText(stage.status)}</span>
                    </>
                  )}
                  {!isComplete && !isInProgress && (
                    <span className="text-xs text-muted-foreground">{getStatusText(stage.status)}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {l.visualPreviewOnly}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

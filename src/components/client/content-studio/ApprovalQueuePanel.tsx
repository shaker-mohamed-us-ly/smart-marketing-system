import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { CheckCircle, Clock, AlertCircle, Save, X } from "lucide-react";

export interface ApprovalQueuePanelProps extends HTMLAttributes<HTMLDivElement> {
  queue?: { 
    name: string; 
    status: "ready" | "review" | "approved" | "scheduled";
  }[];
  labels?: {
    title: string;
    approveAssetPack: string;
    requestChanges: string;
    saveDraft: string;
    visualOnly: string;
  };
}

export function ApprovalQueuePanel({ 
  queue,
  labels,
  className, 
  ...props 
}: ApprovalQueuePanelProps) {
  const t = useTranslations('clientContentStudio.approvalQueue');
  const defaultQueue = [
    { name: t('queueList.premiumPoster'), status: "ready" },
    { name: t('queueList.lifestylePoster'), status: "ready" },
    { name: t('queueList.storyFormat'), status: "review" },
    { name: t('queueList.carouselCover'), status: "approved" },
    { name: t('queueList.videoThumbnail'), status: "scheduled" },
  ];
  const queueList = queue || defaultQueue;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CheckCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-2 mb-6">
          {queueList.map((item, index) => {
            const isReady = item.status === "ready";
            const isReview = item.status === "review";
            const isApproved = item.status === "approved";
            const isScheduled = item.status === "scheduled";
            return (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg transition-colors",
                  isReady && "bg-primary/10 border border-primary/20",
                  isReview && "bg-amber-500/10 border border-amber-500/20",
                  isApproved && "bg-emerald-500/10 border border-emerald-500/20",
                  isScheduled && "bg-secondary/30 border border-border/40"
                )}
              >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0">
                  {isReady && <Clock className="h-4 w-4 text-primary" />}
                  {isReview && <AlertCircle className="h-4 w-4 text-amber-500" />}
                  {isApproved && <CheckCircle className="h-4 w-4 text-emerald-500" />}
                  {isScheduled && <CheckCircle className="h-4 w-4 text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                </div>
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  isReady && "bg-primary/20 text-primary",
                  isReview && "bg-amber-500/20 text-amber-600",
                  isApproved && "bg-emerald-500/20 text-emerald-600",
                  isScheduled && "bg-secondary/50 text-muted-foreground"
                )}>
                  {isReady && t('statusReady')}
                  {isReview && t('statusReview')}
                  {isApproved && t('statusApproved')}
                  {isScheduled && t('statusScheduled')}
                </span>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <SmartButton className="w-full gap-2">
            <CheckCircle className="h-4 w-4" />
            {labels?.approveAssetPack || t('approveAssetPack')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <X className="h-4 w-4" />
            {labels?.requestChanges || t('requestChanges')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <Save className="h-4 w-4" />
            {labels?.saveDraft || t('saveDraft')}
          </SmartButton>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {labels?.visualOnly || t('visualOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

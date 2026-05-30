import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Save, Calendar, Send, Rocket, CheckCircle } from "lucide-react";

export interface ApprovalAndLaunchPanelProps extends HTMLAttributes<HTMLDivElement> {
  status?: string;
  labels?: {
    title: string;
    status: string;
    publishNow: string;
    scheduleCampaign: string;
    prepareForPublishing: string;
    saveDraft: string;
  };
}

export function ApprovalAndLaunchPanel({ 
  status,
  labels,
  className, 
  ...props 
}: ApprovalAndLaunchPanelProps) {
  const t = useTranslations('clientPublishing');
  const defaultStatus = t('approval.readyToLaunch');
  const statusValue = status || defaultStatus;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('approval.title')}</h3>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.status || t('approval.status')}</p>
              <p className="font-semibold text-emerald-600">{statusValue}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <SmartButton className="w-full gap-2">
            <Send className="h-4 w-4" />
            {labels?.publishNow || t('publishNow')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <Calendar className="h-4 w-4" />
            {labels?.scheduleCampaign || t('scheduleCampaign')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <CheckCircle className="h-4 w-4" />
            {labels?.prepareForPublishing || t('prepareForPublishing')}
          </SmartButton>
          <SmartButton variant="outline" className="w-full gap-2">
            <Save className="h-4 w-4" />
            {labels?.saveDraft || t('saveDraft')}
          </SmartButton>
        </div>
      </div>
    </StaticCard>
  );
}

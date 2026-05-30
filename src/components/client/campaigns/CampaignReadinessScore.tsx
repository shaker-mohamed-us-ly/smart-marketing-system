import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";
import { TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export interface CampaignReadinessScoreProps extends HTMLAttributes<HTMLDivElement> {
  score?: number;
  factors?: { label: string; value: number; status: string }[];
  labels?: {
    title: string;
    overall: string;
    assets: string;
    content: string;
    targeting: string;
    ready: string;
    brandIdentityQuality?: string;
    productServiceData?: string;
    visualReadiness?: string;
    audienceFit?: string;
    creativeStrength?: string;
    platformReadiness?: string;
    excellent?: string;
    good?: string;
    statusExcellent?: string;
    statusGood?: string;
  };
}

export function CampaignReadinessScore({ 
  score = 84,
  factors = [
    { label: "brandIdentityQuality", value: 92, status: "excellent" },
    { label: "productServiceData", value: 87, status: "good" },
    { label: "visualReadiness", value: 78, status: "good" },
    { label: "audienceFit", value: 89, status: "excellent" },
    { label: "creativeStrength", value: 85, status: "good" },
    { label: "platformReadiness", value: 82, status: "good" },
  ],
  labels,
  className, 
  ...props 
}: CampaignReadinessScoreProps) {
  const t = useTranslations('clientCampaigns.readiness');
  const l = labels || {
    title: t('title'),
    overall: t('overall'),
    assets: t('assets'),
    content: t('content'),
    targeting: t('targeting'),
    ready: t('ready'),
    brandIdentityQuality: t('brandIdentityQuality'),
    productServiceData: t('productServiceData'),
    visualReadiness: t('visualReadiness'),
    audienceFit: t('audienceFit'),
    creativeStrength: t('creativeStrength'),
    platformReadiness: t('platformReadiness'),
    excellent: t('excellent'),
    good: t('good'),
    statusExcellent: t('statusExcellent') || "ممتاز",
    statusGood: t('statusGood') || "جيد",
  };

  const getFactorText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        {/* Score Display */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">{score}%</p>
                <p className="text-xs text-muted-foreground">{l.ready}</p>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

        {/* Factors */}
        <div className="space-y-3">
          {factors.map((factor, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">{getFactorText(factor.label)}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{factor.value}%</span>
                  {factor.status === "excellent" && (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  )}
                  {factor.status === "good" && (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    factor.value >= 90 ? "bg-emerald-500" : "bg-primary/60"
                  )}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

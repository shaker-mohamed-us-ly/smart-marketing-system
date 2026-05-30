import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";
import { Brain, TrendingUp, CheckCircle, Activity } from "lucide-react";

export interface AIBrainStatusPanelProps extends HTMLAttributes<HTMLDivElement> {
  status?: string;
  learningRate?: number;
  confidence?: number;
  dataQuality?: string;
  defaultDataQuality?: string;
  patternRecognition?: string;
  labels?: {
    title: string;
    status: string;
    learningRate: string;
    confidence: string;
    patternRecognition: string;
    dataQuality: string;
    defaultDataQuality?: string;
  };
}

export function AIBrainStatusPanel({ 
  status = "Active",
  learningRate = 98,
  confidence = 94,
  dataQuality: dataQualityProp,
  defaultDataQuality: defaultDataQualityProp,
  patternRecognition = "Active",
  labels,
  className, 
  ...props 
}: AIBrainStatusPanelProps) {
  const t = useTranslations('clientBrandDNA.aiBrainStatus');
  const dataQuality = dataQualityProp || labels?.defaultDataQuality || t('defaultDataQuality');
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        {/* AI Orb Visual */}
        <div className="flex justify-center mb-6">
          <div className="relative h-20 w-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
              <AIThinkingIndicator state="thinking" size="md" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="text-sm font-medium">{labels?.status || t('status')}</span>
            <span className="text-sm font-medium text-emerald-600">{status}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{labels?.learningRate || t('learningRate')}</span>
            </div>
            <span className="text-sm font-medium">{learningRate}%</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{labels?.confidence || t('confidence')}</span>
            </div>
            <span className="text-sm font-medium">{confidence}%</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{labels?.patternRecognition || t('patternRecognition')}</span>
            </div>
            <span className="text-sm font-medium text-primary">{patternRecognition}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
            <span className="text-sm">{labels?.dataQuality || t('dataQuality')}</span>
            <span className="text-sm font-medium text-emerald-600">{dataQuality}</span>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

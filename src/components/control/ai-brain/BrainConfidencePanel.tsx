import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, Info } from "lucide-react";

export interface BrainConfidencePanelProps extends HTMLAttributes<HTMLDivElement> {
  metrics?: { 
    name: string; 
    value: string; 
  }[];
  explanation?: string;
  labels?: {
    title: string;
    confidence: string;
    accuracy: string;
    prediction: string;
    reliability: string;
  };
}

export function BrainConfidencePanel({ 
  metrics: metricsProp,
  explanation: explanationProp,
  labels,
  className, 
  ...props 
}: BrainConfidencePanelProps) {
  const t = useTranslations('controlAIBrain.confidence');
  const metrics = metricsProp || [
    { 
      name: t('metrics.campaignConfidence'), 
      value: "91%",
    },
    { 
      name: t('metrics.brandMatch'), 
      value: "94%",
    },
    { 
      name: t('metrics.audienceMatch'), 
      value: "89%",
    },
    { 
      name: t('metrics.creativeConfidence'), 
      value: "93%",
    },
    { 
      name: t('metrics.publishingReadiness'), 
      value: "90%",
    },
  ];
  const explanation = explanationProp || t('explanation');
  const l = labels || {
    title: t('title'),
    confidence: t('confidence'),
    accuracy: t('accuracy'),
    prediction: t('prediction'),
    reliability: t('reliability'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3 mb-4">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <span className="text-sm font-medium">{metric.name}</span>
              <span className="text-sm font-semibold text-primary">{metric.value}</span>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">{explanation}</p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

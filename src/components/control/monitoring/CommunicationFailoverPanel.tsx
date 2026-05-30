import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { RefreshCw, ArrowRight, CheckCircle, AlertTriangle } from "lucide-react";

export interface CommunicationFailoverPanelProps extends HTMLAttributes<HTMLDivElement> {
  scenarios?: { 
    scenario: string; 
    fallback: string;
    result: string;
  }[];
  labels?: {
    title: string;
    scenario: string;
    fallback: string;
    result: string;
  };
}

export function CommunicationFailoverPanel({ 
  scenarios: scenariosProp,
  labels,
  className, 
  ...props 
}: CommunicationFailoverPanelProps) {
  const t = useTranslations('controlMonitoring.communicationFailover');
  const scenarios = scenariosProp || t.raw('scenarios') as any[];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <RefreshCw className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {scenarios.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="mb-3">
                <p className="text-sm font-semibold mb-1">{labels?.scenario || t('scenario')}</p>
                <p className="text-sm text-muted-foreground">{item.scenario}</p>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{labels?.fallback || t('fallback')}</p>
                  <p className="text-sm font-medium text-amber-600">{item.fallback}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground mb-1">{labels?.result || t('result')}</p>
                  <div className="flex items-center gap-2">
                    {item.result === t('temporaryRoutingActive') ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-amber-500" />
                    )}
                    <p className="text-sm font-medium">{item.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

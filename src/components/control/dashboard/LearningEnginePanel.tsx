import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { BrainCircuit, BookOpen, Lightbulb, RefreshCw } from "lucide-react";
import * as Icons from "lucide-react";

export interface LearningEnginePanelProps extends HTMLAttributes<HTMLDivElement> {
  sourcesScanned?: number;
  patternsDiscovered?: number;
  recommendationsGenerated?: number;
  brandDnaUpdates?: number;
  labels?: {
    title: string;
    subtitle: string;
    sourcesScanned: string;
    patternsDiscovered: string;
    recommendationsGenerated: string;
    brandDnaUpdates: string;
  };
}

export function LearningEnginePanel({ 
  sourcesScanned = 1247,
  patternsDiscovered = 89,
  recommendationsGenerated = 342,
  brandDnaUpdates = 28,
  labels,
  className, 
  ...props 
}: LearningEnginePanelProps) {
  const t = useTranslations('controlDashboard.learningEngine');
  const metrics = [
    { label: labels?.sourcesScanned || t('sourcesScanned'), value: sourcesScanned, icon: "BookOpen" },
    { label: labels?.patternsDiscovered || t('patternsDiscovered'), value: patternsDiscovered, icon: "Lightbulb" },
    { label: labels?.recommendationsGenerated || t('recommendationsGenerated'), value: recommendationsGenerated, icon: "BrainCircuit" },
    { label: labels?.brandDnaUpdates || t('brandDnaUpdates'), value: brandDnaUpdates, icon: "RefreshCw" },
  ];

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        
        {/* Intelligence Wave Visual */}
        <div className="relative h-24 mb-6 overflow-hidden rounded-xl bg-gradient-to-r from-primary/5 to-primary/10">
          <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(79, 70, 229, 0.3)" />
                <stop offset="50%" stopColor="rgba(79, 70, 229, 0.6)" />
                <stop offset="100%" stopColor="rgba(79, 70, 229, 0.3)" />
              </linearGradient>
            </defs>
            <path
              d="M0,50 Q50,30 100,50 T200,50 T300,50 T400,50"
              fill="none"
              stroke="url(#waveGradient)"
              strokeWidth="3"
              className="animate-pulse"
            />
            <path
              d="M0,60 Q50,40 100,60 T200,60 T300,60 T400,60"
              fill="none"
              stroke="rgba(79, 70, 229, 0.2)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
            <path
              d="M0,70 Q50,50 100,70 T200,70 T300,70 T400,70"
              fill="none"
              stroke="rgba(79, 70, 229, 0.15)"
              strokeWidth="2"
              className="animate-pulse"
              style={{ animationDelay: "1s" }}
            />
          </svg>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => {
            const Icon = (Icons as any)[metric.icon];
            return (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold">{metric.value.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

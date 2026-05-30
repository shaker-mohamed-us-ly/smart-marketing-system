import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Users, Brain, Palette, Video, Shield, Share2, TrendingUp, CheckCircle, AlertCircle } from "lucide-react";

export interface MultiAgentDirectorPanelProps extends HTMLAttributes<HTMLDivElement> {
  directors?: { 
    role: string; 
    icon: any; 
    decision: string; 
    confidence: number; 
    status: string;
    isProduction?: boolean;
  }[];
  labels?: {
    title: string;
    marketingDirector: string;
    creativeDirector: string;
    productionDirector: string;
    publishingDirector: string;
    learningDirector: string;
    collaboration: string;
    decision: string;
    consumerPsychologyDirector?: string;
    brandGuardian?: string;
    growthDirector?: string;
    active?: string;
    targetTechEnthusiasts?: string;
    emphasizeInnovation?: string;
    simplePremiumVisual?: string;
    createPremiumCinematic?: string;
    ensureConsistency?: string;
    multiPlatformLaunch?: string;
    optimizeConversion?: string;
  };
}

export function MultiAgentDirectorPanel({ 
  directors = [
    { 
      role: "marketingDirector", 
      icon: Users, 
      decision: "targetTechEnthusiasts", 
      confidence: 94, 
      status: "active",
    },
    { 
      role: "consumerPsychologyDirector", 
      icon: Brain, 
      decision: "emphasizeInnovation", 
      confidence: 89, 
      status: "active",
    },
    { 
      role: "creativeDirector", 
      icon: Palette, 
      decision: "simplePremiumVisual", 
      confidence: 92, 
      status: "active",
    },
    { 
      role: "productionDirector", 
      icon: Video, 
      decision: "createPremiumCinematic", 
      confidence: 96, 
      status: "active",
      isProduction: true,
    },
    { 
      role: "brandGuardian", 
      icon: Shield, 
      decision: "ensureConsistency", 
      confidence: 98, 
      status: "active",
    },
    { 
      role: "publishingDirector", 
      icon: Share2, 
      decision: "multiPlatformLaunch", 
      confidence: 87, 
      status: "active",
    },
    { 
      role: "growthDirector", 
      icon: TrendingUp, 
      decision: "optimizeConversion", 
      confidence: 91, 
      status: "active",
    },
  ],
  labels,
  className, 
  ...props 
}: MultiAgentDirectorPanelProps) {
  const t = useTranslations('clientCampaigns.multiAgentDirector');
  const l = labels || {
    title: t('title'),
    marketingDirector: t('marketingDirector'),
    creativeDirector: t('creativeDirector'),
    productionDirector: t('productionDirector'),
    publishingDirector: t('publishingDirector'),
    learningDirector: t('learningDirector'),
    collaboration: t('collaboration'),
    decision: t('decision'),
    consumerPsychologyDirector: t('consumerPsychologyDirector'),
    brandGuardian: t('brandGuardian'),
    growthDirector: t('growthDirector'),
    active: t('active'),
    targetTechEnthusiasts: t('targetTechEnthusiasts'),
    emphasizeInnovation: t('emphasizeInnovation'),
    simplePremiumVisual: t('simplePremiumVisual'),
    createPremiumCinematic: t('createPremiumCinematic'),
    ensureConsistency: t('ensureConsistency'),
    multiPlatformLaunch: t('multiPlatformLaunch'),
    optimizeConversion: t('optimizeConversion'),
  };

  const getDirectorText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {directors.map((director, index) => {
            const Icon = director.icon;
            return (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg transition-colors",
                  director.isProduction 
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30" 
                    : "bg-secondary/30"
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    director.isProduction ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      director.isProduction ? "text-primary" : "text-primary/70"
                    )} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className={cn(
                        "font-semibold",
                        director.isProduction && "text-primary"
                      )}>
                        {getDirectorText(director.role)}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{director.confidence}%</span>
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                      </div>
                    </div>
                    <p className={cn(
                      "text-sm",
                      director.isProduction ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {getDirectorText(director.decision)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-emerald-600">{getDirectorText(director.status)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Heart, Sparkles, Users, Shield, Clock, CheckCircle } from "lucide-react";

export interface ServiceMarketingEngineProps extends HTMLAttributes<HTMLDivElement> {
  strategies?: { title: string; description: string; icon: any }[];
  labels?: {
    title: string;
    analyzing: string;
    trust: string;
    storytelling: string;
    expertise: string;
    differentiation: string;
    problemSolution?: string;
    addressCustomerPainPoints?: string;
    trustBuilding?: string;
    establishCredibility?: string;
    beforeAfter?: string;
    showTransformation?: string;
    emotionalComfort?: string;
    appealToEmotions?: string;
    customerResult?: string;
    highlightResults?: string;
    urgency?: string;
    createActionTrigger?: string;
  };
}

export function ServiceMarketingEngine({ 
  strategies = [
    { 
      title: "problemSolution", 
      description: "addressCustomerPainPoints",
      icon: Shield,
    },
    { 
      title: "trustBuilding", 
      description: "establishCredibility",
      icon: Heart,
    },
    { 
      title: "beforeAfter", 
      description: "showTransformation",
      icon: Sparkles,
    },
    { 
      title: "emotionalComfort", 
      description: "appealToEmotions",
      icon: Heart,
    },
    { 
      title: "customerResult", 
      description: "highlightResults",
      icon: Users,
    },
    { 
      title: "urgency", 
      description: "createActionTrigger",
      icon: Clock,
    },
  ],
  labels,
  className, 
  ...props 
}: ServiceMarketingEngineProps) {
  const t = useTranslations('clientCampaigns.serviceMarketing');
  const l = labels || {
    title: t('title'),
    analyzing: t('analyzing'),
    trust: t('trust'),
    storytelling: t('storytelling'),
    expertise: t('expertise'),
    differentiation: t('differentiation'),
    problemSolution: t('problemSolution'),
    addressCustomerPainPoints: t('addressCustomerPainPoints'),
    trustBuilding: t('trustBuilding'),
    establishCredibility: t('establishCredibility'),
    beforeAfter: t('beforeAfter'),
    showTransformation: t('showTransformation'),
    emotionalComfort: t('emotionalComfort'),
    appealToEmotions: t('appealToEmotions'),
    customerResult: t('customerResult'),
    highlightResults: t('highlightResults'),
    urgency: t('urgency'),
    createActionTrigger: t('createActionTrigger'),
  };

  const getStrategyText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-2">
          {strategies.map((strategy, index) => {
            const Icon = strategy.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{getStrategyText(strategy.title)}</p>
                  <p className="text-xs text-muted-foreground">{getStrategyText(strategy.description)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";

export interface ChannelRoutingRulesProps extends HTMLAttributes<HTMLDivElement> {
  rules?: { 
    channel: string; 
    primaryProvider: string;
    fallbackProvider: string;
  }[];
  labels?: {
    title: string;
    primary: string;
    fallback: string;
    description: string;
  };
}

export function ChannelRoutingRules({ 
  rules,
  labels,
  className, 
  ...props 
}: ChannelRoutingRulesProps) {
  const t = useTranslations('controlMonitoring.channelRoutingRules');
  const defaultRules = [
    { 
      channel: "WhatsApp", 
      primaryProvider: "WhatsApp Official API",
      fallbackProvider: "RelayAPI",
    },
    { 
      channel: "Telegram", 
      primaryProvider: "RelayAPI",
      fallbackProvider: "Telegram Bot API",
    },
    { 
      channel: "Instagram DM", 
      primaryProvider: "RelayAPI",
      fallbackProvider: "None",
    },
    { 
      channel: "Email", 
      primaryProvider: t('emailProvider'),
      fallbackProvider: "None",
    },
  ];
  const rulesList = rules || defaultRules;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>

        <div className="space-y-4">
          {rulesList.map((rule, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-2">{rule.channel}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{labels?.primary || t('primary')}:</span>
                    <span className="font-medium text-emerald-600">{rule.primaryProvider}</span>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-muted-foreground">{labels?.fallback || t('fallback')}:</span>
                    <span className={cn(
                      "font-medium",
                      rule.fallbackProvider === "None" ? "text-muted-foreground" : "text-amber-600"
                    )}>
                      {rule.fallbackProvider}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              {labels?.description || t('description')}
            </p>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

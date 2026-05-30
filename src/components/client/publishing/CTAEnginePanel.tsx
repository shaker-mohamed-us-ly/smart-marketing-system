import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MessageCircle, Phone, MessageSquare, TrendingUp, Sparkles } from "lucide-react";

export interface CTAEnginePanelProps extends HTMLAttributes<HTMLDivElement> {
  ctaSuggestions?: { 
    channel: string; 
    icon: any; 
    suggestions: string[]; 
    predictedImpact: number;
  }[];
  labels?: {
    title: string;
  };
}

export function CTAEnginePanel({ 
  ctaSuggestions,
  labels,
  className, 
  ...props 
}: CTAEnginePanelProps) {
  const t = useTranslations('clientPublishing');
  const defaultCtaSuggestions = [
    { 
      channel: t('ctaEngine.channels.whatsapp'), 
      icon: MessageCircle, 
      suggestions: [
        t('ctaEngine.suggestions.whatsapp.messageUsNow'),
        t('ctaEngine.suggestions.whatsapp.orderViaWhatsApp'),
        t('ctaEngine.suggestions.whatsapp.getYourOfferInstantly'),
      ], 
      predictedImpact: 92,
    },
    { 
      channel: t('ctaEngine.channels.phone'), 
      icon: Phone, 
      suggestions: [
        t('ctaEngine.suggestions.phone.callNow'),
        t('ctaEngine.suggestions.phone.bookYourAppointment'),
        t('ctaEngine.suggestions.phone.talkToAnExpert'),
      ], 
      predictedImpact: 89,
    },
    { 
      channel: t('ctaEngine.channels.dms'), 
      icon: MessageSquare, 
      suggestions: [
        t('ctaEngine.suggestions.dms.sendUsAMessage'),
        t('ctaEngine.suggestions.dms.commentInterested'),
        t('ctaEngine.suggestions.dms.messageUsToLearnMore'),
      ], 
      predictedImpact: 87,
    },
  ];
  const ctaSuggestionsList = ctaSuggestions || defaultCtaSuggestions;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('ctaEngine.title')}</h3>
        </div>

        <div className="space-y-4">
          {ctaSuggestionsList.map((suggestion, index) => {
            const Icon = suggestion.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-semibold">{suggestion.channel}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">{suggestion.predictedImpact}%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {suggestion.suggestions.map((cta, ctaIndex) => (
                    <div
                      key={ctaIndex}
                      className="p-2 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <p className="text-sm font-medium text-primary">{cta}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

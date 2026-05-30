import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MessageCircle, Phone, MessageSquare, Mail, Globe, CheckCircle } from "lucide-react";

export interface ContactStrategyPanelProps extends HTMLAttributes<HTMLDivElement> {
  question?: string;
  options?: { name: string; icon: any; selected: boolean; description: string }[];
  selectedStrategy?: string;
  strategyDescription?: string;
  labels?: {
    title: string;
    selectedStrategy: string;
  };
}

export function ContactStrategyPanel({ 
  question,
  options,
  selectedStrategy,
  strategyDescription,
  labels,
  className, 
  ...props 
}: ContactStrategyPanelProps) {
  const t = useTranslations('clientPublishing');
  const defaultQuestion = t('contactStrategy.question');
  const defaultOptions = [
    { name: t('contactStrategy.whatsapp'), icon: MessageCircle, selected: true, description: t('contactStrategy.whatsappDescription') },
    { name: t('contactStrategy.phone'), icon: Phone, selected: true, description: t('contactStrategy.phoneDescription') },
    { name: t('contactStrategy.instagramDMs'), icon: MessageSquare, selected: false, description: t('contactStrategy.instagramDMsDescription') },
    { name: t('contactStrategy.facebookMessenger'), icon: MessageCircle, selected: false, description: t('contactStrategy.facebookMessengerDescription') },
    { name: t('contactStrategy.tiktokMessages'), icon: MessageSquare, selected: false, description: t('contactStrategy.tiktokMessagesDescription') },
    { name: t('contactStrategy.websiteForm'), icon: Mail, selected: false, description: t('contactStrategy.websiteFormDescription') },
  ];
  const defaultSelectedStrategy = t('contactStrategy.whatsappPhoneStrategy');
  const defaultStrategyDescription = t('contactStrategy.whatsappPhoneDescription');
  const questionValue = question || defaultQuestion;
  const optionsList = options || defaultOptions;
  const selectedStrategyValue = selectedStrategy || defaultSelectedStrategy;
  const strategyDescriptionValue = strategyDescription || defaultStrategyDescription;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('contactStrategy.title')}</h3>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-4">{questionValue}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {optionsList.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-xl border transition-all",
                    option.selected
                      ? "border-primary/50 bg-primary/5"
                      : "border-border/40 bg-secondary/20 hover:bg-secondary/30"
                  )}
                >
                  <div className={cn(
                    "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    option.selected ? "bg-primary/20" : "bg-primary/10"
                  )}>
                    <Icon className={cn("h-5 w-5", option.selected ? "text-primary" : "text-primary/70")} />
                  </div>
                  <div className="flex-1">
                    <p className={cn("font-semibold text-sm", option.selected && "text-primary")}>
                      {option.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  {option.selected && (
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium text-primary">{labels?.selectedStrategy || t('contactStrategy.selectedStrategy')}</p>
          </div>
          <p className="font-semibold mb-1">{selectedStrategyValue}</p>
          <p className="text-sm text-muted-foreground">{strategyDescriptionValue}</p>
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MessageCircle, ArrowDown, User, Bot, Users } from "lucide-react";

export interface WhatsAppFlowPreviewProps extends HTMLAttributes<HTMLDivElement> {
  journey?: { step: string; description: string }[];
  labels?: {
    title: string;
    description: string;
    visualUXOnly: string;
  };
}

export function WhatsAppFlowPreview({ 
  journey: journeyProp,
  labels,
  className, 
  ...props 
}: WhatsAppFlowPreviewProps) {
  const t = useTranslations('clientPublishing.whatsappFlow');
  const journey = journeyProp || [
    { step: t('step0'), description: t('step0Desc') },
    { step: t('step1'), description: t('step1Desc') },
    { step: t('step2'), description: t('step2Desc') },
    { step: t('step3'), description: t('step3Desc') },
    { step: t('step4'), description: t('step4Desc') },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {labels?.description || t('description')}
          </p>
        </div>

        <div className="space-y-3">
          {journey.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {index === 0 && <User className="h-4 w-4 text-primary" />}
                  {index === 1 && <MessageCircle className="h-4 w-4 text-primary" />}
                  {index === 2 && <Bot className="h-4 w-4 text-primary" />}
                  {index === 3 && <User className="h-4 w-4 text-primary" />}
                  {index === 4 && <Users className="h-4 w-4 text-primary" />}
                </div>
                {index < journey.length - 1 && (
                  <ArrowDown className="h-4 w-4 text-muted-foreground/50 my-1" />
                )}
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium mb-1">{item.step}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {labels?.visualUXOnly || t('visualUXOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

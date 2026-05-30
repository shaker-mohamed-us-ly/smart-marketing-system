import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Phone, CheckCircle } from "lucide-react";

export interface PhoneCallStrategyPanelProps extends HTMLAttributes<HTMLDivElement> {
  bestFor?: string[];
  ctaExamples?: string[];
  labels?: {
    title: string;
    whenPhoneWorksBest: string;
    recommendedCallCTAExamples: string;
  };
}

export function PhoneCallStrategyPanel({ 
  bestFor,
  ctaExamples,
  labels,
  className, 
  ...props 
}: PhoneCallStrategyPanelProps) {
  const t = useTranslations('clientPublishing');
  const defaultBestFor = [
    t('phoneCallStrategy.bestFor.clinics'),
    t('phoneCallStrategy.bestFor.highValueServices'),
    t('phoneCallStrategy.bestFor.premiumProducts'),
    t('phoneCallStrategy.bestFor.urgentServices'),
  ];
  const defaultCtaExamples = [
    t('phoneCallStrategy.ctaExamples.callNow'),
    t('phoneCallStrategy.ctaExamples.bookYourAppointment'),
    t('phoneCallStrategy.ctaExamples.talkToAnExpert'),
  ];
  const bestForList = bestFor || defaultBestFor;
  const ctaExamplesList = ctaExamples || defaultCtaExamples;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('phoneCallStrategy.title')}</h3>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.whenPhoneWorksBest || t('phoneCallStrategy.whenPhoneWorksBest')}</p>
          <div className="space-y-2">
            {bestForList.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">{labels?.recommendedCallCTAExamples || t('phoneCallStrategy.recommendedCallCTAExamples')}</p>
          <div className="space-y-2">
            {ctaExamplesList.map((cta, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-primary/5 border border-primary/10"
              >
                <p className="text-sm font-medium text-primary">{cta}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

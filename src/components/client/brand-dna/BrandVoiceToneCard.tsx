import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { MessageSquare, ArrowRight } from "lucide-react";

export interface BrandVoiceToneCardProps extends HTMLAttributes<HTMLDivElement> {
  voice?: string[];
  tone?: string[];
  language?: string[];
  labels?: {
    title: string;
    voice: string;
    tone: string;
    language: string;
    viewVoiceGuide: string;
  };
}

export function BrandVoiceToneCard({ 
  voice,
  tone,
  language,
  labels,
  className, 
  ...props 
}: BrandVoiceToneCardProps) {
  const t = useTranslations('clientBrandDNA.brandVoiceTone');
  const defaultVoice = [t('voiceValues.confident'), t('voiceValues.innovative')];
  const defaultTone = [t('toneValues.professional'), t('toneValues.friendly')];
  const defaultLanguage = [t('languageValues.simple'), t('languageValues.clear'), t('languageValues.direct')];
  const voiceList = voice || defaultVoice;
  const toneList = tone || defaultTone;
  const languageList = language || defaultLanguage;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">{labels?.voice || t('voice')}</p>
            <div className="flex flex-wrap gap-2">
              {voiceList.map((item, index) => (
                <span key={index} className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">{labels?.tone || t('tone')}</p>
            <div className="flex flex-wrap gap-2">
              {toneList.map((item, index) => (
                <span key={index} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/50 text-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">{labels?.language || t('language')}</p>
            <div className="flex flex-wrap gap-2">
              {languageList.map((item, index) => (
                <span key={index} className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/50 text-foreground">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <SmartButton variant="outline" className="w-full gap-2">
          {labels?.viewVoiceGuide || t('viewVoiceGuide')}
          <ArrowRight className="h-4 w-4" />
        </SmartButton>
      </div>
    </StaticCard>
  );
}

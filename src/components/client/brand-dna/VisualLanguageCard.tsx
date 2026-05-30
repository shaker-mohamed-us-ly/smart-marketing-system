import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Palette, Type, CheckCircle, ArrowRight } from "lucide-react";

export interface VisualLanguageCardProps extends HTMLAttributes<HTMLDivElement> {
  colorPalette?: string[];
  fontFamily?: string;
  logoStatus?: string;
  labels?: {
    title: string;
    visualMood: string;
    colorPalette: string;
    fontFamily: string;
    logoStatus: string;
    viewGuidelines: string;
  };
}

export function VisualLanguageCard({ 
  colorPalette,
  fontFamily,
  logoStatus,
  labels,
  className, 
  ...props 
}: VisualLanguageCardProps) {
  const t = useTranslations('clientBrandDNA.visualLanguage');
  const defaultColorPalette = ["#6366f1", "#8b5cf6", "#a855f7", "#d946ef"];
  const defaultFontFamily = "Inter";
  const defaultLogoStatus = t('logoStatusValue');
  const colorPaletteList = colorPalette || defaultColorPalette;
  const fontFamilyList = fontFamily || defaultFontFamily;
  const logoStatusList = logoStatus || defaultLogoStatus;
  const defaultMoods = [t('visualMoods.simple'), t('visualMoods.clean'), t('visualMoods.modern')];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        {/* Visual Mood Cards */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">{labels?.visualMood || t('visualMood')}</p>
          <div className="grid grid-cols-3 gap-3">
            {defaultMoods.map((mood, index) => (
              <div
                key={index}
                className="aspect-square rounded-lg bg-gradient-to-br from-secondary/50 to-secondary/30 border border-border/40 flex items-center justify-center hover:border-primary/40 transition-colors cursor-pointer"
              >
                <span className="text-xs font-medium text-muted-foreground">{mood}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">{labels?.colorPalette || t('colorPalette')}</p>
          <div className="flex gap-2">
            {colorPaletteList.map((color, index) => (
              <div
                key={index}
                className="h-10 w-10 rounded-lg border border-border/40"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        {/* Font Family */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">{labels?.fontFamily || t('fontFamily')}</p>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
            <Type className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{fontFamilyList}</span>
          </div>
        </div>

        {/* Logo Status */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-3">{labels?.logoStatus || t('logoStatus')}</p>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="h-5 w-5 text-emerald-600" />
            <span className="font-medium text-emerald-700">{logoStatusList}</span>
          </div>
        </div>

        <SmartButton variant="outline" className="w-full gap-2">
          {labels?.viewGuidelines || t('viewGuidelines')}
          <ArrowRight className="h-4 w-4" />
        </SmartButton>
      </div>
    </StaticCard>
  );
}

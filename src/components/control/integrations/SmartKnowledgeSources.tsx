import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Lightbulb, Globe, TrendingUp, Search, Palette, Sparkles } from "lucide-react";

type KnowledgeSource = {
  name: string;
  typeKey: "visual" | "marketing" | "competitor" | "trend";
  suggestedUse: string;
  reason: string;
  iconKey: "globe" | "trendingUp" | "search" | "palette" | "sparkles" | "lightbulb";
};

const iconMap: Record<string, any> = {
  globe: Globe,
  trendingUp: TrendingUp,
  search: Search,
  palette: Palette,
  sparkles: Sparkles,
  lightbulb: Lightbulb,
};

export interface SmartKnowledgeSourcesProps extends HTMLAttributes<HTMLDivElement> {
  sources?: KnowledgeSource[];
  labels?: {
    title: string;
    sources: string;
    knowledge: string;
    retrieval: string;
    accuracy: string;
    types?: {
      visual: string;
      marketing: string;
      competitor: string;
      trend: string;
    };
    visualOnly?: string;
  };
}

export function SmartKnowledgeSources({ 
  sources: sourcesProp,
  labels,
  className, 
  ...props 
}: SmartKnowledgeSourcesProps) {
  const t = useTranslations('controlIntegrations.smartKnowledgeSources');
  const sources = sourcesProp || t.raw('sourcesList') as KnowledgeSource[];
  const l = labels || {
    title: t('title'),
    sources: t('sources'),
    knowledge: t('knowledge'),
    retrieval: t('retrieval'),
    accuracy: t('accuracy'),
    types: {
      visual: t('types.visual'),
      marketing: t('types.marketing'),
      competitor: t('types.competitor'),
      trend: t('types.trend'),
    },
    visualOnly: t('visualOnly'),
  };

  const getTypeColor = (typeKey: string) => {
    switch (typeKey) {
      case "visual":
        return "text-purple-600 bg-purple-500/10 border-purple-500/20";
      case "marketing":
        return "text-primary bg-primary/10 border-primary/20";
      case "competitor":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "trend":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  const getTypeLabel = (typeKey: string): string => {
    return l.types?.[typeKey as keyof typeof l.types] || typeKey;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {sources.map((source, index) => {
            const Icon = iconMap[source.iconKey] ?? Lightbulb;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-semibold">{source.name}</p>
                    <div className={cn(
                      "px-2 py-1 rounded-full text-xs font-medium border",
                      getTypeColor(source.typeKey)
                    )}>
                      {getTypeLabel(source.typeKey)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{source.suggestedUse}</p>
                  <p className="text-xs text-muted-foreground italic">{source.reason}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-secondary/20 border border-border/40">
          <p className="text-xs text-muted-foreground">
            {l.visualOnly}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

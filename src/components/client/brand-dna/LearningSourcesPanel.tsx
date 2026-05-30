import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Database, CheckCircle } from "lucide-react";

export interface LearningSourcesPanelProps extends HTMLAttributes<HTMLDivElement> {
  sources?: { name: string; status: string }[];
  labels?: {
    title: string;
  };
}

export function LearningSourcesPanel({ 
  sources,
  labels,
  className, 
  ...props 
}: LearningSourcesPanelProps) {
  const t = useTranslations('clientBrandDNA.learningSources');
  const defaultSources = [
    { name: t('sourcesList.website'), status: t('sourcesList.connected') },
    { name: t('sourcesList.socialMedia'), status: t('sourcesList.connected') },
    { name: t('sourcesList.marketData'), status: t('sourcesList.connected') },
    { name: t('sourcesList.competitors'), status: t('sourcesList.connected') },
    { name: t('sourcesList.reviews'), status: t('sourcesList.connected') },
    { name: t('sourcesList.trends'), status: t('sourcesList.connected') },
  ];
  const sourcesList = sources || defaultSources;
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-2">
          {sourcesList.map((source, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium">{source.name}</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span className="text-xs text-emerald-600">{source.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

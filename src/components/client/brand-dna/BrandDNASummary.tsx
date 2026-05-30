import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";
import { Building2, Globe, TrendingUp, Database, Clock } from "lucide-react";

export interface BrandDNASummaryProps extends HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  website?: string;
  status?: string;
  dnaScore?: number;
  scoreStatus?: string;
  lastUpdated?: string;
  dataSources?: number;
  labels?: {
    brandDNAScore: string;
    updated: string;
    sources: string;
  };
}

export function BrandDNASummary({ 
  brandName: brandNameProp,
  website: websiteProp,
  status: statusProp,
  dnaScore: dnaScoreProp,
  scoreStatus: scoreStatusProp,
  lastUpdated: lastUpdatedProp,
  dataSources: dataSourcesProp,
  labels,
  className, 
  ...props 
}: BrandDNASummaryProps) {
  const t = useTranslations('clientBrandDNA.dnaSummary');
  const brandName = brandNameProp || "Nova Phones";
  const website = websiteProp || "novaphones.com";
  const status = statusProp || t('status');
  const dnaScore = dnaScoreProp || 87;
  const scoreStatus = scoreStatusProp || t('scoreStatus');
  const lastUpdated = lastUpdatedProp || t('lastUpdated');
  const dataSources = dataSourcesProp || 24;
  const learningProgress = [65, 72, 78, 82, 85, 87];
  const maxProgress = Math.max(...learningProgress);
  const minProgress = Math.min(...learningProgress);
  const range = maxProgress - minProgress || 1;

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-start gap-6">
          {/* Brand Image Placeholder */}
          <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0 border border-border/40">
            <Building2 className="h-10 w-10 text-primary" />
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold mb-1">{brandName}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    {website}
                  </span>
                  <span>•</span>
                  <span className="text-primary font-medium">{status}</span>
                </div>
              </div>

              {/* AI Orb / DNA Visual */}
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                  <AIThinkingIndicator state="thinking" size="sm" />
                </div>
              </div>
            </div>

            {/* DNA Score */}
            <div className="flex items-center gap-6 mb-4">
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-primary">{dnaScore}%</span>
                  <span className="text-sm text-muted-foreground">{labels?.brandDNAScore || t('brandDNAScore')}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600">
                  {scoreStatus}
                </span>
              </div>

              <div className="h-12 w-px bg-border/40" />

              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{labels?.updated || t('updated')} {lastUpdated}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{dataSources} {labels?.sources || t('sources')}</span>
                </div>
              </div>
            </div>

            {/* Learning Progress Line Chart */}
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div className="flex-1 h-8 flex items-end gap-1">
                {learningProgress.map((value, index) => {
                  const height = ((value - minProgress) / range) * 100;
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-primary/20 rounded-sm transition-all duration-300 hover:bg-primary/40"
                      style={{ height: `${Math.max(height, 20)}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

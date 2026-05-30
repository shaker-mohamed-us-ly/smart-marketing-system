import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react";

export interface RecommendationConfidencePanelProps extends HTMLAttributes<HTMLDivElement> {
  overallConfidence?: number;
  factors?: { 
    name: string; 
    status: "Strong" | "Excellent" | "Good" | "Medium" | "Missing";
  }[];
  labels?: {
    title: string;
    overallConfidence: string;
    factors: string;
    statusStrong?: string;
    statusExcellent?: string;
    statusGood?: string;
    statusMedium?: string;
    statusMissing?: string;
  };
}

export function RecommendationConfidencePanel({ 
  overallConfidence = 92,
  factors: factorsProp,
  labels,
  className, 
  ...props 
}: RecommendationConfidencePanelProps) {
  const t = useTranslations('clientRecommendations.confidencePanel');
  const factors = factorsProp || [
    { 
      name: t('factor0'), 
      status: "Strong",
    },
    { 
      name: t('factor1'), 
      status: "Excellent",
    },
    { 
      name: t('factor2'), 
      status: "Good",
    },
    { 
      name: t('factor3'), 
      status: "Medium",
    },
    { 
      name: t('factor4'), 
      status: "Missing",
    },
  ];
  const l = labels || {
    title: t('title'),
    overallConfidence: t('overallConfidence'),
    factors: t('factors'),
    statusStrong: t('statusStrong') || "قوي",
    statusExcellent: t('statusExcellent') || "ممتاز",
    statusGood: t('statusGood') || "جيد",
    statusMedium: t('statusMedium') || "متوسط",
    statusMissing: t('statusMissing') || "مفقود",
  };

  const getStatusLabel = (status: string) => {
    const key = `status${status}` as keyof typeof l;
    return l[key] || status;
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Excellent":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      case "Strong":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      case "Good":
        return "text-blue-600 bg-blue-500/10 border-blue-500/20";
      case "Medium":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "Missing":
        return "text-muted-foreground bg-secondary/30 border-border/40";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Excellent":
        return <CheckCircle className="h-4 w-4" />;
      case "Strong":
        return <CheckCircle className="h-4 w-4" />;
      case "Good":
        return <Info className="h-4 w-4" />;
      case "Medium":
        return <AlertCircle className="h-4 w-4" />;
      case "Missing":
        return <XCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{labels?.overallConfidence || t('overallConfidence')}</p>
            <p className="text-3xl font-bold text-primary">{overallConfidence}%</p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">{labels?.factors || t('factors')}</p>
          <div className="space-y-2">
            {factors.map((factor, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <span className="text-sm font-medium">{factor.name}</span>
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border",
                  getStatusColor(factor.status)
                )}>
                  {getStatusIcon(factor.status)}
                  <span>{getStatusLabel(factor.status)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

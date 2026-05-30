import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { CheckCircle, AlertCircle, Shield } from "lucide-react";

export interface PublishingReadinessPanelProps extends HTMLAttributes<HTMLDivElement> {
  score?: number;
  checklist?: { item: string; status: "complete" | "missing" }[];
  missing?: string[];
  labels?: {
    title: string;
    overallScore: string;
    checklist: string;
    missing: string;
  };
}

export function PublishingReadinessPanel({ 
  score = 91,
  checklist: checklistProp,
  missing: missingProp,
  labels,
  className, 
  ...props 
}: PublishingReadinessPanelProps) {
  const t = useTranslations('clientPublishing.readiness');
  const checklist = checklistProp || [
    { item: t('item0'), status: "complete" },
    { item: t('item1'), status: "complete" },
    { item: t('item2'), status: "complete" },
    { item: t('item3'), status: "complete" },
    { item: t('item4'), status: "complete" },
    { item: t('item5'), status: "complete" },
  ];
  const missing = missingProp || [t('missing0')];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{labels?.overallScore || t('overallScore')}</p>
            <p className="text-3xl font-bold text-primary">{score}%</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.checklist || t('checklist')}</p>
          <div className="space-y-2">
            {checklist.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
              >
                {item.status === "complete" ? (
                  <CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0" />
                )}
                <span className="text-sm font-medium">{item.item}</span>
              </div>
            ))}
          </div>
        </div>

        {missing.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-600 mb-1">{labels?.missing || t('missing')}</p>
                {missing.map((item, index) => (
                  <p key={index} className="text-sm text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </StaticCard>
  );
}

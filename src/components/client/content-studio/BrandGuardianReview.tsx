import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Shield, CheckCircle, AlertTriangle } from "lucide-react";

export interface BrandGuardianReviewProps extends HTMLAttributes<HTMLDivElement> {
  checks?: { 
    label: string; 
    value: number; 
    status: string;
  }[];
  risk?: string;
  labels?: {
    title: string;
    riskAssessment: string;
  };
}

export function BrandGuardianReview({ 
  checks: checksProp,
  risk: riskProp,
  labels,
  className, 
  ...props 
}: BrandGuardianReviewProps) {
  const t = useTranslations('clientContentStudio.brandGuardian');
  const checks = checksProp || [
    { label: t('check0Label'), value: 94, status: t('statusExcellent') },
    { label: t('check1Label'), value: 92, status: t('statusExcellent') },
    { label: t('check2Label'), value: 89, status: t('statusStrong') },
    { label: t('check3Label'), value: 89, status: t('statusStrong') },
  ];
  const risk = riskProp || t('defaultRisk');
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

        <div className="space-y-4 mb-6">
          {checks.map((check, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{check.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{check.value}%</span>
                  {check.status === "Excellent" && (
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                  )}
                  {check.status === "Strong" && (
                    <CheckCircle className="h-4 w-4 text-primary" />
                  )}
                </div>
              </div>
              <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-300",
                    check.value >= 90 ? "bg-emerald-500" : "bg-primary/60"
                  )}
                  style={{ width: `${check.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.riskAssessment || t('riskAssessment')}</p>
              <p className="font-semibold text-emerald-600">{risk}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

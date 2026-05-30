import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Bell, Check } from "lucide-react";

export interface AlertPreferencesPanelProps extends HTMLAttributes<HTMLDivElement> {
  preferences?: { 
    name: string; 
    enabled: boolean;
  }[];
  labels?: {
    title: string;
    visualTogglesOnly: string;
  };
}

export function AlertPreferencesPanel({ 
  preferences: preferencesProp,
  labels,
  className, 
  ...props 
}: AlertPreferencesPanelProps) {
  const t = useTranslations('controlMonitoring.alertPreferences');
  const preferences = preferencesProp || t.raw('preferences') as any[];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-3">
          {preferences.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium">{item.name}</span>
              <div className={cn(
                "h-6 w-6 rounded-full flex items-center justify-center",
                item.enabled ? "bg-primary" : "bg-secondary"
              )}>
                {item.enabled && <Check className="h-4 w-4 text-white" />}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {labels?.visualTogglesOnly || t('visualTogglesOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

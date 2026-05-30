import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { SmartButton } from "@/components/shared/SmartButton";
import { UserPlus, Bell } from "lucide-react";

export interface OperationsMonitoringHeroLabels {
  title: string;
  subtitle: string;
  addTeamMember: string;
  testAlert: string;
}

export interface OperationsMonitoringHeroProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  labels?: OperationsMonitoringHeroLabels;
}

export function OperationsMonitoringHero({ 
  title,
  subtitle,
  labels,
  className, 
  ...props 
}: OperationsMonitoringHeroProps) {
  const t = useTranslations('controlMonitoring.hero');
  const displayTitle = title ?? labels?.title ?? t('title');
  const displaySubtitle = subtitle ?? labels?.subtitle ?? t('subtitle');

  return (
    <div className={cn("mb-8", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2">{displayTitle}</h1>
          <p className="text-muted-foreground max-w-2xl">{displaySubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <SmartButton variant="outline" className="gap-2">
            <UserPlus className="h-4 w-4" />
            {labels?.addTeamMember || t('addTeamMember')}
          </SmartButton>
          <SmartButton className="gap-2">
            <Bell className="h-4 w-4" />
            {labels?.testAlert || t('testAlert')}
          </SmartButton>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Clock, CheckCircle, AlertCircle, DollarSign, UserPlus, RefreshCw } from "lucide-react";
import * as Icons from "lucide-react";

export interface SystemActivityProps extends HTMLAttributes<HTMLDivElement> {
  activities?: {
    icon: keyof typeof Icons;
    text: string;
    time: string;
    status?: "success" | "warning" | "info";
  }[];
  labels?: {
    title: string;
    subtitle: string;
  };
}

export function SystemActivity({ 
  activities: activitiesProp,
  labels,
  className, 
  ...props 
}: SystemActivityProps) {
  const t = useTranslations('controlOverview.systemActivityPanel');
  const tCommon = useTranslations('common');
  const activities = activitiesProp || [
    { icon: "UserPlus", text: t('newClientOnboarded'), time: tCommon('time.2HoursAgo'), status: "success" },
    { icon: "RefreshCw", text: t('apiSyncCompleted'), time: tCommon('time.3HoursAgo'), status: "success" },
    { icon: "CheckCircle", text: t('learningTaskCompleted'), time: tCommon('time.5HoursAgo'), status: "success" },
    { icon: "RefreshCw", text: t('systemBackupCompleted'), time: tCommon('time.1DayAgo'), status: "info" },
    { icon: "DollarSign", text: t('paymentReceived'), time: tCommon('time.1DayAgo'), status: "success" },
  ];
  const statusColors = {
    success: "text-emerald-600 bg-emerald-500/10",
    warning: "text-amber-600 bg-amber-500/10",
    info: "text-blue-600 bg-blue-500/10",
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
          <Clock className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          {activities.map((activity, index) => {
            const Icon = (Icons as any)[activity.icon];
            return (
              <div key={index} className="flex items-start gap-3">
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  statusColors[activity.status || "info"]
                )}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

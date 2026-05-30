import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Building2 } from "lucide-react";

export interface ClientOverviewProps extends HTMLAttributes<HTMLDivElement> {
  clients?: {
    name: string;
    healthScore: number;
    subscription: string;
    campaignCount: number;
    lastActivity: string;
  }[];
  labels?: {
    title: string;
    subtitle: string;
    health: string;
    campaigns: string;
    activity: string;
  };
}

export function ClientOverview({ 
  clients: clientsProp,
  labels,
  className, 
  ...props 
}: ClientOverviewProps) {
  const t = useTranslations('controlDashboard.clientOverview');
  const tCommon = useTranslations('common');
  const clients = clientsProp || [
    { name: "Nova Phones", healthScore: 98, subscription: "Enterprise", campaignCount: 12, lastActivity: tCommon('time.2HoursAgo') },
    { name: "CleanPro Services", healthScore: 95, subscription: "Professional", campaignCount: 8, lastActivity: tCommon('time.5HoursAgo') },
    { name: "Luxe Perfumes", healthScore: 92, subscription: "Enterprise", campaignCount: 15, lastActivity: tCommon('time.1DayAgo') },
    { name: "HomeFix Experts", healthScore: 88, subscription: "Starter", campaignCount: 4, lastActivity: tCommon('time.2DaysAgo') },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
            <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
          </div>
          <Building2 className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          {clients.map((client, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{client.name}</p>
                <p className="text-xs text-muted-foreground">{client.subscription}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{labels?.health || t('health')}</p>
                  <p className="text-sm font-semibold">{client.healthScore}%</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{labels?.campaigns || t('campaigns')}</p>
                  <p className="text-sm font-semibold">{client.campaignCount}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{labels?.activity || t('activity')}</p>
                  <p className="text-sm font-medium">{client.lastActivity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

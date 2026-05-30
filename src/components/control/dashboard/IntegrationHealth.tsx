import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Link, Zap, Database, CreditCard, Mail } from "lucide-react";
import * as Icons from "lucide-react";

export interface IntegrationHealthProps extends HTMLAttributes<HTMLDivElement> {
  integrations?: {
    name: string;
    status: "online" | "degraded" | "offline";
    latency: string;
    usage: string;
    icon: keyof typeof Icons;
  }[];
  labels?: {
    title: string;
    subtitle: string;
    latency: string;
    usage: string;
    online: string;
    degraded: string;
    offline: string;
  };
}

export function IntegrationHealth({ 
  integrations: integrationsProp,
  labels,
  className, 
  ...props 
}: IntegrationHealthProps) {
  const t = useTranslations('controlOverview.integrationHealthPanel');
  const integrations = integrationsProp || [
    { name: t('openai'), status: "online", latency: "45ms", usage: "12.4K", icon: "Zap" },
    { name: t('socialPublishingGateway'), status: "online", latency: "82ms", usage: "8.2K", icon: "Link" },
    { name: t('designSourceReader'), status: "online", latency: "124ms", usage: "3.1K", icon: "Database" },
    { name: t('paymentProvider'), status: "online", latency: "156ms", usage: "1.8K", icon: "CreditCard" },
    { name: t('emailService'), status: "online", latency: "67ms", usage: "5.6K", icon: "Mail" },
  ];
  const statusColors = {
    online: "text-emerald-600 bg-emerald-500/10",
    degraded: "text-amber-600 bg-amber-500/10",
    offline: "text-rose-600 bg-rose-500/10",
  };

  const statusDot = {
    online: "bg-emerald-500",
    degraded: "bg-amber-500",
    offline: "bg-rose-500",
  };

  const statusText = {
    online: labels?.online || t('online'),
    degraded: labels?.degraded || t('degraded'),
    offline: labels?.offline || t('offline'),
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
          <Link className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          {integrations.map((integration, index) => {
            const Icon = (Icons as any)[integration.icon];
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{integration.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{labels?.latency || t('latency')}</p>
                    <p className="text-sm font-semibold">{integration.latency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{labels?.usage || t('usage')}</p>
                    <p className="text-sm font-semibold">{integration.usage}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn("h-2 w-2 rounded-full", statusDot[integration.status])} />
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[integration.status])}>
                      {statusText[integration.status]}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

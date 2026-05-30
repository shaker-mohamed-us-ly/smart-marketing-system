import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { BrainCircuit, Sparkles, PenTool, Send, Zap } from "lucide-react";
import * as Icons from "lucide-react";

export interface AICommandStatusLabels {
  title: string;
  subtitle: string;
  online: string;
  learning: string;
  ready: string;
  stable: string;
  active: string;
}

export interface AICommandStatusProps extends HTMLAttributes<HTMLDivElement> {
  engines?: {
    name: string;
    status: "online" | "learning" | "ready" | "stable" | "active";
    icon: keyof typeof Icons;
  }[];
  labels?: AICommandStatusLabels;
}

export function AICommandStatus({ 
  engines: enginesProp,
  labels,
  className, 
  ...props 
}: AICommandStatusProps) {
  const t = useTranslations('controlOverview.aiCommandStatusPanel');
  const engines = enginesProp || [
    { name: t('marketingBrain'), status: "online", icon: "BrainCircuit" },
    { name: t('dnaEngine'), status: "learning", icon: "Sparkles" },
    { name: t('creativeEngine'), status: "ready", icon: "PenTool" },
    { name: t('publishingEngine'), status: "stable", icon: "Send" },
    { name: t('learningEngine'), status: "active", icon: "Zap" },
  ];
  const statusColors = {
    online: "text-emerald-600 bg-emerald-500/10",
    learning: "text-blue-600 bg-blue-500/10",
    ready: "text-purple-600 bg-purple-500/10",
    stable: "text-cyan-600 bg-cyan-500/10",
    active: "text-amber-600 bg-amber-500/10",
  };

  const statusText = {
    online: labels?.online || t('online'),
    learning: labels?.learning || t('learning'),
    ready: labels?.ready || t('ready'),
    stable: labels?.stable || t('stable'),
    active: labels?.active || t('active'),
  };

  const statusPulse = {
    online: "animate-pulse",
    learning: "animate-pulse",
    ready: "",
    stable: "",
    active: "animate-pulse",
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
          <BrainCircuit className="h-5 w-5 text-primary" />
        </div>
        <div className="space-y-3">
          {engines.map((engine, index) => {
            const Icon = (Icons as any)[engine.icon];
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{engine.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn("relative flex h-2 w-2", statusPulse[engine.status])}>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusColors[engine.status])}>
                    {statusText[engine.status]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Terminal, ArrowRight } from "lucide-react";

export interface MessagingCommandPreviewProps extends HTMLAttributes<HTMLDivElement> {
  commands?: { 
    command: string; 
    returns: string;
  }[];
  labels?: {
    title: string;
    returns: string;
    visualOnly: string;
  };
}

export function MessagingCommandPreview({ 
  commands: commandsProp,
  labels,
  className, 
  ...props 
}: MessagingCommandPreviewProps) {
  const t = useTranslations('controlMonitoring.messagingCommand');
  const commands = commandsProp || [
    { 
      command: t('commands.status'), 
      returns: t('commandReturns.status'),
    },
    { 
      command: t('commands.costToday'), 
      returns: t('commandReturns.costToday'),
    },
    { 
      command: t('commands.campaignPerformance'), 
      returns: t('commandReturns.campaignPerformance'),
    },
    { 
      command: t('commands.providerHealth'), 
      returns: t('commandReturns.providerHealth'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Terminal className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {commands.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold mb-1">"{item.command}"</p>
                  <p className="text-xs text-muted-foreground">{labels?.returns || t('returns')}:</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.returns}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-sm text-muted-foreground">
            {labels?.visualOnly || t('visualOnly')}
          </p>
        </div>
      </div>
    </StaticCard>
  );
}

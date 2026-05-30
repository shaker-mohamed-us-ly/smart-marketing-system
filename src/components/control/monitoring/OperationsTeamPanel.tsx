import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Users, MessageSquare, Mail, CheckCircle } from "lucide-react";

export interface OperationsTeamPanelProps extends HTMLAttributes<HTMLDivElement> {
  team?: { 
    name: string; 
    role: string;
    channels: string[];
    alertPermissions: string[];
  }[];
  labels?: {
    title: string;
    active: string;
    channels: string;
    alerts: string;
  };
}

export function OperationsTeamPanel({ 
  team: teamProp,
  labels,
  className, 
  ...props 
}: OperationsTeamPanelProps) {
  const t = useTranslations('controlMonitoring.operationsTeam');
  const team = teamProp || [
    { 
      name: t('teamMembers.shaker'), 
      role: t('roles.owner'),
      channels: [t('channelNames.whatsapp'), t('channelNames.email')],
      alertPermissions: [t('alertPermissions.all')],
    },
    { 
      name: t('teamMembers.mahmoud'), 
      role: t('roles.salesManager'),
      channels: [t('channelNames.whatsapp')],
      alertPermissions: [t('alertPermissions.business'), t('alertPermissions.sales'), t('alertPermissions.financial')],
    },
    { 
      name: t('teamMembers.sara'), 
      role: t('roles.technicalOperator'),
      channels: [t('channelNames.telegram')],
      alertPermissions: [t('alertPermissions.system'), t('alertPermissions.aiIntelligence')],
    },
    { 
      name: t('teamMembers.omar'), 
      role: t('roles.developer'),
      channels: [t('channelNames.telegram'), t('channelNames.email')],
      alertPermissions: [t('alertPermissions.system'), t('alertPermissions.aiIntelligence')],
    },
  ];
  const getChannelIcon = (channel: string) => {
    const whatsapp = t('channelNames.whatsapp');
    const telegram = t('channelNames.telegram');
    const email = t('channelNames.email');
    if (channel === whatsapp || channel === "WhatsApp") {
      return <MessageSquare className="h-3 w-3" />;
    }
    if (channel === telegram || channel === "Telegram") {
      return <MessageSquare className="h-3 w-3" />;
    }
    if (channel === email || channel === "Email") {
      return <Mail className="h-3 w-3" />;
    }
    return <MessageSquare className="h-3 w-3" />;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold mb-1">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="h-3 w-3" />
                  <span>{labels?.active || t('active')}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{labels?.channels || t('channels')}:</span>
                  <div className="flex flex-wrap gap-1">
                    {member.channels.map((channel, chIndex) => (
                      <div
                        key={chIndex}
                        className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-background text-xs text-muted-foreground"
                      >
                        {getChannelIcon(channel)}
                        <span>{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{labels?.alerts || t('alerts')}:</span>
                  <div className="flex flex-wrap gap-1">
                    {member.alertPermissions.map((permission, pIndex) => (
                      <span
                        key={pIndex}
                        className="px-2 py-0.5 rounded-md bg-primary/10 text-xs text-primary"
                      >
                        {permission}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

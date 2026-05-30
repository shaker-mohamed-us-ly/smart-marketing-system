import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { MessageCircle, Phone, MessageSquare, Globe, Mail } from "lucide-react";

export interface ChannelAttributionPanelProps extends HTMLAttributes<HTMLDivElement> {
  channels?: { 
    name: string; 
    percentage: string; 
    icon: any;
  }[];
  explanation?: string;
  labels?: {
    title: string;
    channels: string;
    attribution: string;
    contribution: string;
    roi: string;
    ofLeads?: string;
    conversationStartDescription?: string;
  };
}

export function ChannelAttributionPanel({ 
  channels = [
    { 
      name: "WhatsApp", 
      percentage: "42%", 
      icon: MessageCircle,
    },
    { 
      name: "Phone", 
      percentage: "21%", 
      icon: Phone,
    },
    { 
      name: "Instagram DM", 
      percentage: "18%", 
      icon: MessageSquare,
    },
    { 
      name: "Comments", 
      percentage: "12%", 
      icon: MessageCircle,
    },
    { 
      name: "Website Form", 
      percentage: "7%", 
      icon: Globe,
    },
  ],
  explanation: explanationProp,
  labels,
  className, 
  ...props 
}: ChannelAttributionPanelProps) {
  const t = useTranslations('clientAnalytics.channelAttribution');
  const l = labels || {
    title: t('title'),
    channels: t('channels'),
    attribution: t('attribution'),
    contribution: t('contribution'),
    roi: t('roi'),
    conversationStartDescription: t('conversationStartDescription'),
  };
  const explanation = explanationProp || l.conversationStartDescription || "يوضح أين تبدأ محادثات العملاء الحقيقية.";

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageCircle className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3 mb-4">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{channel.name}</p>
                  <p className="text-sm text-muted-foreground">{channel.percentage} {l.ofLeads || "of leads"}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{channel.percentage}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
          <p className="text-xs text-muted-foreground">{explanation}</p>
        </div>
      </div>
    </StaticCard>
  );
}

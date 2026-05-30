import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { CheckCircle, AlertCircle, Zap, MessageSquare, Mail } from "lucide-react";

export interface ProviderChannelMapProps extends HTMLAttributes<HTMLDivElement> {
  providers?: { 
    name: string; 
    channels: string[];
    status: "Connected" | "Available" | "Disconnected";
  }[];
  labels?: {
    title: string;
    provider: string;
    channel: string;
    messagingServiceProvider: string;
    communicationChannel: string;
  };
}

export function ProviderChannelMap({ 
  providers,
  labels,
  className, 
  ...props 
}: ProviderChannelMapProps) {
  const t = useTranslations('controlMonitoring.providerChannelMap');
  const defaultProviders = [
    { 
      name: "RelayAPI", 
      channels: ["WhatsApp", "Telegram", "Instagram DM", "Facebook Messenger"],
      status: t('connected'),
    },
    { 
      name: "WhatsApp Official API", 
      channels: ["WhatsApp"],
      status: t('connected'),
    },
    { 
      name: "Telegram Bot API", 
      channels: ["Telegram"],
      status: t('available'),
    },
    { 
      name: t('emailProvider'), 
      channels: ["Email"],
      status: t('connected'),
    },
  ];
  const providersList = providers || defaultProviders;
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      case "Available":
        return "text-blue-600 bg-blue-500/10 border-blue-500/20";
      case "Disconnected":
        return "text-red-600 bg-red-500/10 border-red-500/20";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Connected":
        return <CheckCircle className="h-4 w-4" />;
      case "Available":
        return <Zap className="h-4 w-4" />;
      case "Disconnected":
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "WhatsApp":
        return <MessageSquare className="h-3 w-3" />;
      case "Telegram":
        return <MessageSquare className="h-3 w-3" />;
      case "Instagram DM":
        return <MessageSquare className="h-3 w-3" />;
      case "Facebook Messenger":
        return <MessageSquare className="h-3 w-3" />;
      case "Email":
        return <Mail className="h-3 w-3" />;
      default:
        return <MessageSquare className="h-3 w-3" />;
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{labels?.title || t('title')}</h3>

        <div className="space-y-4">
          {providersList.map((provider, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold mb-1">{provider.name}</p>
                  <div className="flex flex-wrap gap-2">
                    {provider.channels.map((channel, chIndex) => (
                      <div
                        key={chIndex}
                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-background text-xs text-muted-foreground"
                      >
                        {getChannelIcon(channel)}
                        <span>{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border",
                  getStatusColor(provider.status)
                )}>
                  {getStatusIcon(provider.status)}
                  <span>{provider.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium">{labels?.provider || t('provider')}</p>
              <p className="text-muted-foreground">{labels?.messagingServiceProvider || t('messagingServiceProvider')}</p>
            </div>
            <div>
              <p className="font-medium">{labels?.channel || t('channel')}</p>
              <p className="text-muted-foreground">{labels?.communicationChannel || t('communicationChannel')}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

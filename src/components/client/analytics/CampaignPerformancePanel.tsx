import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Target, Eye, Heart, MessageCircle, CheckCircle } from "lucide-react";

export interface CampaignPerformancePanelProps extends HTMLAttributes<HTMLDivElement> {
  campaigns?: { 
    name: string; 
    reach: string; 
    engagement: string; 
    conversions: string; 
    status: string; 
    performanceScore: number;
  }[];
  labels?: {
    title: string;
    campaigns: string;
    performance: string;
    roi: string;
    engagement: string;
    reach: string;
    conversions: string;
    score: string;
    campaign1?: string;
    campaign2?: string;
    campaign3?: string;
    campaign4?: string;
    active?: string;
    completed?: string;
  };
}

export function CampaignPerformancePanel({ 
  campaigns,
  labels,
  className, 
  ...props 
}: CampaignPerformancePanelProps) {
  const t = useTranslations('clientAnalytics.campaignPerformance');
  const defaultCampaigns = [
    { 
      name: "campaign1", 
      reach: "45.2K", 
      engagement: "8.7K", 
      conversions: "342", 
      status: "active", 
      performanceScore: 94,
    },
    { 
      name: "campaign2", 
      reach: "32.1K", 
      engagement: "6.2K", 
      conversions: "287", 
      status: "completed", 
      performanceScore: 89,
    },
    { 
      name: "campaign3", 
      reach: "28.5K", 
      engagement: "5.1K", 
      conversions: "198", 
      status: "active", 
      performanceScore: 82,
    },
    { 
      name: "campaign4", 
      reach: "22.3K", 
      engagement: "4.8K", 
      conversions: "156", 
      status: "completed", 
      performanceScore: 78,
    },
  ];
  const campaignsList = campaigns || defaultCampaigns;
  const l = labels || {
    title: t('title'),
    campaigns: t('campaigns'),
    performance: t('performance'),
    roi: t('roi'),
    engagement: t('engagement'),
    reach: t('reach'),
    conversions: t('conversions'),
    score: t('score'),
    campaign1: t('campaign1'),
    campaign2: t('campaign2'),
    campaign3: t('campaign3'),
    campaign4: t('campaign4'),
    active: t('active'),
    completed: t('completed'),
  };

  const getCampaignName = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  const getStatusText = (key: string): string => {
    if (key === "active") return l.active || "Active";
    if (key === "completed") return l.completed || "Completed";
    return key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        
        <div className="space-y-3">
          {campaignsList.map((campaign, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold">{getCampaignName(campaign.name)}</p>
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    campaign.status === "active" 
                      ? "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20"
                      : "text-muted-foreground bg-secondary/50 border border-border/40"
                  )}>
                    {campaign.status === "active" && <CheckCircle className="h-3 w-3 inline mr-1" />}
                    {getStatusText(campaign.status)}
                  </div>
                  <div className="text-sm font-semibold text-primary">{campaign.performanceScore}%</div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{l.reach}</p>
                    <p className="text-sm font-medium">{campaign.reach}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{l.engagement}</p>
                    <p className="text-sm font-medium">{campaign.engagement}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{l.conversions}</p>
                    <p className="text-sm font-medium">{campaign.conversions}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">{l.score}</p>
                    <p className="text-sm font-medium">{campaign.performanceScore}%</p>
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

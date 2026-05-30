"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { Clock, CheckCircle, AlertCircle } from "lucide-react";

export interface RecentActivityProps extends HTMLAttributes<HTMLDivElement> {
  activities?: {
    icon: any;
    text: string;
    time: string;
    status?: "success" | "warning";
  }[];
  labels?: {
    title: string;
    subtitle: string;
    activities?: {
      campaignLaunched: string;
      aiOptimizationCompleted: string;
      budgetThresholdReached: string;
      audienceSegmentCreated: string;
    };
    timeLabels?: {
      twoHoursAgo: string;
      fiveHoursAgo: string;
      oneDayAgo: string;
      twoDaysAgo: string;
    };
  };
}

export function RecentActivity({ 
  activities = [
    { icon: CheckCircle, text: "Summer Collection campaign launched", time: "2 hours ago", status: "success" },
    { icon: CheckCircle, text: "AI optimization completed", time: "5 hours ago", status: "success" },
    { icon: AlertCircle, text: "Budget threshold reached", time: "1 day ago", status: "warning" },
    { icon: CheckCircle, text: "New audience segment created", time: "2 days ago", status: "success" },
  ], 
  labels,
  className, 
  ...props 
}: RecentActivityProps) {
  const t = useTranslations('clientDashboard.recentActivity');
  // Map hardcoded activity texts to labels
  const translatedActivities = activities.map(activity => {
    let translatedText = activity.text;
    let translatedTime = activity.time;
    
    if (activity.text.includes("Summer Collection campaign launched")) {
      translatedText = labels?.activities?.campaignLaunched || activity.text;
    } else if (activity.text.includes("AI optimization completed")) {
      translatedText = labels?.activities?.aiOptimizationCompleted || activity.text;
    } else if (activity.text.includes("Budget threshold reached")) {
      translatedText = labels?.activities?.budgetThresholdReached || activity.text;
    } else if (activity.text.includes("New audience segment created")) {
      translatedText = labels?.activities?.audienceSegmentCreated || activity.text;
    }
    
    if (activity.time.includes("2 hours ago")) {
      translatedTime = labels?.timeLabels?.twoHoursAgo || activity.time;
    } else if (activity.time.includes("5 hours ago")) {
      translatedTime = labels?.timeLabels?.fiveHoursAgo || activity.time;
    } else if (activity.time.includes("1 day ago")) {
      translatedTime = labels?.timeLabels?.oneDayAgo || activity.time;
    } else if (activity.time.includes("2 days ago")) {
      translatedTime = labels?.timeLabels?.twoDaysAgo || activity.time;
    }
    
    return { ...activity, text: translatedText, time: translatedTime };
  });
  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <AnimatedIcon icon={Clock} size={20} state="idle" magnetic />
      </div>
      <div className="space-y-4">
        {translatedActivities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className={cn(
              "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
              activity.status === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
            )}>
              <AnimatedIcon icon={activity.icon} size={16} state="idle" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{activity.text}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </InteractiveCard>
  );
}

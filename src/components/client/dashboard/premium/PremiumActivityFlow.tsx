import { cn } from "@/lib/utils/cn";
import { CheckCircle, Clock, AlertCircle, LucideIcon } from "lucide-react";
import { PremiumAppIconFrame, IconTone } from "./PremiumAppIconFrame";

export interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  status: "completed" | "pending" | "alert";
  icon?: LucideIcon;
}

export interface PremiumActivityFlowProps {
  activities: ActivityItem[];
  className?: string;
}

export function PremiumActivityFlow({
  activities,
  className,
}: PremiumActivityFlowProps) {
  const getStatusIcon = (status: ActivityItem["status"], customIcon?: LucideIcon) => {
    if (customIcon) return customIcon;
    switch (status) {
      case "completed":
        return CheckCircle;
      case "pending":
        return Clock;
      case "alert":
        return AlertCircle;
    }
  };

  const getStatusTone = (status: ActivityItem["status"]): IconTone => {
    switch (status) {
      case "completed":
        return "emerald";
      case "pending":
        return "gray";
      case "alert":
        return "amber";
    }
  };

  return (
    <div className={cn("space-y-3", className)}>
      {activities.map((activity, index) => {
        const Icon = getStatusIcon(activity.status, activity.icon);
        const tone = getStatusTone(activity.status);

        return (
          <div
            key={activity.id}
            className="flex items-start gap-3 p-4 rounded-[12px] bg-white border hover:border-gray-200 transition-colors"
            style={{
              borderColor: "rgba(203, 213, 225, 0.7)",
            }}
          >
            <PremiumAppIconFrame icon={Icon} tone={tone} size="sm" />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 mb-1 leading-tight">
                {activity.title}
              </h4>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {activity.description}
              </p>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

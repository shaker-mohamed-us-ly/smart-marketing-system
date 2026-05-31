import { cn } from "@/lib/utils/cn";
import { PremiumActionCard } from "./PremiumActionCard";
import { PremiumInsightCard } from "./PremiumInsightCard";
import { LucideIcon } from "lucide-react";

export interface QuickActionItem {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel: string;
  tone: "violet" | "orange" | "emerald" | "rose";
}

export interface InsightItem {
  icon: LucideIcon;
  title: string;
  description: string;
  badge: string;
  badgeTone: "emerald" | "violet" | "amber";
  actionLabel: string;
  tone: "emerald" | "violet" | "amber";
}

export interface PremiumAICommandRailProps {
  quickActions: QuickActionItem[];
  insights: InsightItem[];
  quickActionsTitle: string;
  insightsTitle: string;
  className?: string;
}

/**
 * PremiumAICommandRail - 4-column AI Command Rail
 * 
 * Features:
 * - Strategic Insights (Decision Stack)
 * - Quick Actions (Action Dock)
 * - Compact but strong
 * - Dark mode ready
 */
export function PremiumAICommandRail({
  quickActions,
  insights,
  quickActionsTitle,
  insightsTitle,
  className,
}: PremiumAICommandRailProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Strategic Insights - Decision Stack */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
          {insightsTitle}
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <PremiumInsightCard
              key={index}
              icon={insight.icon}
              title={insight.title}
              description={insight.description}
              badge={insight.badge}
              badgeTone={insight.badgeTone}
              actionLabel={insight.actionLabel}
              tone={insight.tone}
              surface="neutral"
            />
          ))}
        </div>
      </div>

      {/* Quick Actions - Action Dock */}
      <div>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
          {quickActionsTitle}
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <PremiumActionCard
              key={index}
              icon={action.icon}
              title={action.title}
              subtitle={action.subtitle}
              actionLabel={action.actionLabel}
              tone={action.tone}
              surface="neutral"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

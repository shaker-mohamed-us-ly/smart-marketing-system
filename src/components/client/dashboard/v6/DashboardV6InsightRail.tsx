/**
 * Dashboard V6.3 Insight Rail
 *
 * Dashboard rail (not global sidebar) with:
 * - Luxury graphite dark mode
 * - Strategic insights
 * - Quick actions
 * - AI recommendation chip
 * - Stacked compact cards
 * - Dark mode surfaces
 * - Semantic accents
 * - 48px icon tiles
 * - One mini action button per item
 * - No duplicate arrows
 * - No random pastel blocks
 */

import { V6IconFrame } from "./DashboardV6Icon";
import styles from "./DashboardV6Motion.module.css";
import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";

export interface V6Insight {
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
  badgeTone?: "emerald" | "violet" | "amber";
  actionLabel: string;
  tone: "emerald" | "violet" | "amber";
}

export interface V6QuickAction {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel: string;
  tone: "violet" | "orange" | "emerald";
}

export interface DashboardV6InsightRailProps {
  insights: V6Insight[];
  quickActions: V6QuickAction[];
  insightsTitle: string;
  quickActionsTitle: string;
  aiRecommendationTitle: string;
  aiRecommendationDescription: string;
  className?: string;
}

export type V6Tone = "emerald" | "violet" | "amber" | "orange" | "blue" | "slate";

const toneTokens: Record<V6Tone, {
  badgeClass: string;
  cardClass: string;
  borderClass: string;
  actionBg: string;
  actionText: string;
}> = {
  emerald: {
    badgeClass: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/30",
    cardClass: "bg-emerald-50/50 dark:bg-[#181C23]",
    borderClass: "border-emerald-100 dark:border-white/[0.085]",
    actionBg: "rgba(16, 185, 129, 0.12)",
    actionText: "#10B981",
  },
  violet: {
    badgeClass: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-500/30",
    cardClass: "bg-violet-50/50 dark:bg-[#181C23]",
    borderClass: "border-violet-100 dark:border-white/[0.085]",
    actionBg: "rgba(139, 92, 246, 0.12)",
    actionText: "#8B5CF6",
  },
  amber: {
    badgeClass: "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-500/30",
    cardClass: "bg-amber-50/50 dark:bg-[#181C23]",
    borderClass: "border-amber-100 dark:border-white/[0.085]",
    actionBg: "rgba(245, 158, 11, 0.14)",
    actionText: "#F59E0B",
  },
  orange: {
    badgeClass: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-500/30",
    cardClass: "bg-orange-50/50 dark:bg-[#181C23]",
    borderClass: "border-orange-100 dark:border-white/[0.085]",
    actionBg: "rgba(249, 115, 22, 0.12)",
    actionText: "#F97316",
  },
  blue: {
    badgeClass: "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-500/30",
    cardClass: "bg-blue-50/50 dark:bg-[#181C23]",
    borderClass: "border-blue-100 dark:border-white/[0.085]",
    actionBg: "rgba(59, 130, 246, 0.12)",
    actionText: "#3B82F6",
  },
  slate: {
    badgeClass: "bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-500/30",
    cardClass: "bg-slate-50/50 dark:bg-[#181C23]",
    borderClass: "border-slate-100 dark:border-white/[0.085]",
    actionBg: "rgba(148, 163, 184, 0.12)",
    actionText: "#64748B",
  },
};

function getToneToken(tone?: string) {
  if (
    tone === "emerald" ||
    tone === "violet" ||
    tone === "amber" ||
    tone === "orange" ||
    tone === "blue" ||
    tone === "slate"
  ) {
    return toneTokens[tone];
  }

  return toneTokens.violet;
}

export function DashboardV6InsightRail({
  insights,
  quickActions,
  insightsTitle,
  quickActionsTitle,
  aiRecommendationTitle,
  aiRecommendationDescription,
  className,
}: DashboardV6InsightRailProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Strategic Insights */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-[#F4F6F8] mb-4">
          {insightsTitle}
        </h3>
        <div className="space-y-3">
          {insights.map((insight, index) => {
            const toneToken = getToneToken(insight.tone);
            const badgeToneToken = getToneToken(insight.badgeTone || insight.tone);

            return (
              <div
                key={index}
                className={cn(
                  // Compact card
                  "rounded-[22px] border p-4",
                  // Semantic tone
                  toneToken.cardClass,
                  toneToken.borderClass,
                  // Motion
                  styles.v6InsightEnter,
                  // Hover
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <V6IconFrame iconKey="growth" size="metric" tone={insight.tone} />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-[#F4F6F8] mb-1">
                        {insight.title}
                      </h4>
                      {insight.badge && (
                        <span
                          className={cn(
                            "inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold border",
                            badgeToneToken.badgeClass
                          )}
                        >
                          {insight.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-gray-600 dark:text-[#C3CBD6] mb-3 line-clamp-2">
                  {insight.description}
                </p>

                {/* Action Button */}
                <button
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                    styles.v6ButtonPress,
                    "hover:-translate-y-0.5"
                  )}
                  style={{
                    backgroundColor: toneToken.actionBg,
                    color: toneToken.actionText,
                  }}
                >
                  {insight.actionLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-base font-bold text-gray-900 dark:text-[#F4F6F8] mb-4">
          {quickActionsTitle}
        </h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => {
            const toneToken = getToneToken(action.tone);

            return (
              <div
                key={index}
                className={cn(
                  // Compact card
                  "rounded-[22px] border p-4",
                  // Semantic tone
                  toneToken.cardClass,
                  toneToken.borderClass,
                  // Motion
                  styles.v6InsightEnter,
                  // Hover
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                )}
                style={{
                  animationDelay: `${(insights.length + index) * 50}ms`,
                }}
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <V6IconFrame iconKey="brandIdentity" size="metric" tone={action.tone} />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-[#F4F6F8] mb-1">
                      {action.title}
                    </h4>
                    <p className="text-[11px] text-gray-500 dark:text-[#9AA3B2]">
                      {action.subtitle}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={cn(
                    "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
                    styles.v6ButtonPress,
                    "hover:-translate-y-0.5"
                  )}
                  style={{
                    backgroundColor: toneToken.actionBg,
                    color: toneToken.actionText,
                  }}
                >
                  {action.actionLabel}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation Chip */}
      <div className="rounded-2xl border p-4 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20">
        <div className="flex items-center gap-3">
          <V6IconFrame iconKey="aiBadge" size="metric" tone="violet" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-violet-900 dark:text-violet-200">
              {aiRecommendationTitle}
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-300">
              {aiRecommendationDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

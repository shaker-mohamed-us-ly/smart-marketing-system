/**
 * Dashboard V7.2 Decision Rail
 * 
 * Dashboard rail with:
 * - Luxury graphite dark mode
 * - Strategic insights
 * - Quick actions
 * - AI recommendation chip
 * - Stacked compact cards
 * - Dark mode surfaces
 * - Semantic accents
 * - Icon tiles
 * - Mini action buttons
 * - No duplicate arrows
 * - No random pastel blocks
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { DashboardV7Icon } from "./DashboardV7Icon";
import { DashboardV7Button } from "./DashboardV7Button";
import { v7ToneMap, V7Tone, v7Typography, v7Motion } from "./DashboardV7Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV7Motion.module.css";

export interface V7Insight {
  iconKey: string;
  title: string;
  description: string;
  badge?: string;
  badgeTone?: V7Tone;
  actionLabel: string;
  tone: V7Tone;
}

export interface V7QuickAction {
  iconKey: string;
  title: string;
  subtitle: string;
  actionLabel: string;
  tone: V7Tone;
}

export interface DashboardV7DecisionRailProps {
  insights: V7Insight[];
  quickActions: V7QuickAction[];
  insightsTitle: string;
  quickActionsTitle: string;
  aiRecommendationTitle: string;
  aiRecommendationDescription: string;
  className?: string;
}

function getToneToken(tone: V7Tone) {
  return v7ToneMap[tone];
}

export function DashboardV7DecisionRail({
  insights,
  quickActions,
  insightsTitle,
  quickActionsTitle,
  aiRecommendationTitle,
  aiRecommendationDescription,
  className,
}: DashboardV7DecisionRailProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* Strategic Insights */}
      <div>
        <h3 
          className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-4"
          style={{
            fontSize: v7Typography.desktop.sectionTitle.fontSize,
            fontWeight: v7Typography.desktop.sectionTitle.fontWeight,
            lineHeight: v7Typography.desktop.sectionTitle.lineHeight,
          }}
        >
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
                  "bg-white dark:bg-[#181D26]",
                  "border-gray-200 dark:border-white/[0.085]",
                  // Motion
                  styles.v7CommandRowReveal,
                  // Hover
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                )}
                style={{
                  animationDelay: `${index * v7Motion.stagger.normal}ms`,
                  backgroundColor: toneToken.bgDark,
                  borderColor: toneToken.borderDark,
                }}
              >
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <DashboardV7Icon 
                      iconKey={insight.iconKey as any} 
                      size="metric" 
                      tone={insight.tone} 
                      ariaHidden 
                    />
                    <div className="flex-1">
                      <h4 
                        className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-1"
                        style={{
                          fontSize: v7Typography.desktop.cardTitle.fontSize,
                          fontWeight: v7Typography.desktop.cardTitle.fontWeight,
                          lineHeight: v7Typography.desktop.cardTitle.lineHeight,
                        }}
                      >
                        {insight.title}
                      </h4>
                      {insight.badge && (
                        <span
                          className={cn(
                            "inline-block px-2 py-0.5 rounded-md font-semibold border"
                          )}
                          style={{
                            fontSize: v7Typography.desktop.chip.fontSize,
                            fontWeight: v7Typography.desktop.chip.fontWeight,
                            backgroundColor: badgeToneToken.bgDark,
                            borderColor: badgeToneToken.borderDark,
                            color: badgeToneToken.textDark,
                          }}
                        >
                          {insight.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p 
                  className="text-gray-600 dark:text-[#C3CBD6] mb-3 line-clamp-2"
                  style={{
                    fontSize: v7Typography.desktop.caption.fontSize,
                    fontWeight: v7Typography.desktop.caption.fontWeight,
                    lineHeight: v7Typography.desktop.caption.lineHeight,
                  }}
                >
                  {insight.description}
                </p>

                {/* Action Button */}
                <DashboardV7Button variant="mini">
                  {insight.actionLabel}
                </DashboardV7Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 
          className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-4"
          style={{
            fontSize: v7Typography.desktop.sectionTitle.fontSize,
            fontWeight: v7Typography.desktop.sectionTitle.fontWeight,
            lineHeight: v7Typography.desktop.sectionTitle.lineHeight,
          }}
        >
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
                  "bg-white dark:bg-[#181D26]",
                  "border-gray-200 dark:border-white/[0.085]",
                  // Motion
                  styles.v7CommandRowReveal,
                  // Hover
                  "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                )}
                style={{
                  animationDelay: `${(insights.length + index) * v7Motion.stagger.normal}ms`,
                  backgroundColor: toneToken.bgDark,
                  borderColor: toneToken.borderDark,
                }}
              >
                {/* Header with Icon */}
                <div className="flex items-center gap-3 mb-3">
                  <DashboardV7Icon 
                    iconKey={action.iconKey as any} 
                    size="metric" 
                    tone={action.tone} 
                    ariaHidden 
                  />
                  <div className="flex-1">
                    <h4 
                      className="font-bold text-gray-900 dark:text-[#F4F6F8] mb-1"
                      style={{
                        fontSize: v7Typography.desktop.cardTitle.fontSize,
                        fontWeight: v7Typography.desktop.cardTitle.fontWeight,
                        lineHeight: v7Typography.desktop.cardTitle.lineHeight,
                      }}
                    >
                      {action.title}
                    </h4>
                    <p 
                      className="text-gray-500 dark:text-[#9AA3B2]"
                      style={{
                        fontSize: v7Typography.desktop.caption.fontSize,
                        fontWeight: v7Typography.desktop.caption.fontWeight,
                        lineHeight: v7Typography.desktop.caption.lineHeight,
                      }}
                    >
                      {action.subtitle}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <DashboardV7Button variant="mini">
                  {action.actionLabel}
                </DashboardV7Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation Chip */}
      <div className="rounded-2xl border p-4 bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20">
        <div className="flex items-center gap-3">
          <DashboardV7Icon iconKey="aiBadge" size="metric" tone="violet" ariaHidden />
          <div className="flex-1">
            <p 
              className="font-semibold text-violet-900 dark:text-violet-200"
              style={{
                fontSize: v7Typography.desktop.body.fontSize,
                fontWeight: v7Typography.desktop.body.fontWeight,
                lineHeight: v7Typography.desktop.body.lineHeight,
              }}
            >
              {aiRecommendationTitle}
            </p>
            <p 
              className="text-violet-700 dark:text-violet-300"
              style={{
                fontSize: v7Typography.desktop.caption.fontSize,
                fontWeight: v7Typography.desktop.caption.fontWeight,
                lineHeight: v7Typography.desktop.caption.lineHeight,
              }}
            >
              {aiRecommendationDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

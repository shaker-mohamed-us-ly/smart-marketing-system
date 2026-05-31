/**
 * Dashboard V8 Insight Rail — supporting intelligence column.
 *
 * Strategic insight cards + quick actions + an AI recommendation footer.
 * Presentational; all content arrives as plain serializable props.
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8Button } from "./DashboardV8Button";
import { DashboardV8IconKey } from "./dashboard-v8-icons";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8Insight {
  iconKey: DashboardV8IconKey;
  title: string;
  description: string;
  badge: string;
  actionLabel: string;
  tone: V8Tone;
}

export interface DashboardV8QuickAction {
  iconKey: DashboardV8IconKey;
  title: string;
  subtitle: string;
  actionLabel: string;
  tone: V8Tone;
}

export interface DashboardV8InsightRailProps {
  insightsTitle: string;
  quickActionsTitle: string;
  insights: DashboardV8Insight[];
  quickActions: DashboardV8QuickAction[];
  aiRecommendationTitle: string;
  aiRecommendationDescription: string;
}

export function DashboardV8InsightRail({
  insightsTitle,
  quickActionsTitle,
  insights,
  quickActions,
  aiRecommendationTitle,
  aiRecommendationDescription,
}: DashboardV8InsightRailProps) {
  return (
    <div className={cn(styles.reveal, styles.r4, "flex flex-col gap-4")}>
      {/* Strategic insights */}
      <section className={cn(styles.panel, styles.panelPad)}>
        <div className={styles.panelHead}>
          <div className={cn(styles.panelHeadLeft, styles.iconHoverHost)}>
            <DashboardV8Icon iconKey="insight" size="panel" tone="amber" />
            <h2 className={cn(styles.sectionTitle, "text-base")}>{insightsTitle}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {insights.map((insight, index) => (
            <article key={index} data-tone={insight.tone} className={cn(styles.card, styles.cardInteractive, styles.insightCard, styles.iconHoverHost)}>
              <div className={styles.insightHead}>
                <DashboardV8Icon iconKey={insight.iconKey} size="row" tone={insight.tone} />
                <div className="flex flex-1 items-center justify-between gap-2">
                  <h3 className={styles.insightTitle}>{insight.title}</h3>
                  <span className={styles.badge}>{insight.badge}</span>
                </div>
              </div>
              <p className={styles.insightDesc}>{insight.description}</p>
              <DashboardV8Button variant="mini" tone={insight.tone} icon={<DashboardV8Icon iconKey="openAction" size="chip" tone={insight.tone} className="!h-4 !w-4 !border-0 !bg-transparent !shadow-none" />}>
                {insight.actionLabel}
              </DashboardV8Button>
            </article>
          ))}
        </div>
      </section>

      {/* Quick actions */}
      <section className={cn(styles.panel, styles.panelPad)}>
        <div className={styles.panelHead}>
          <div className={cn(styles.panelHeadLeft, styles.iconHoverHost)}>
            <DashboardV8Icon iconKey="aiSpark" size="panel" tone="violet" />
            <h2 className={cn(styles.sectionTitle, "text-base")}>{quickActionsTitle}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {quickActions.map((action, index) => (
            <article key={index} data-tone={action.tone} className={cn(styles.card, styles.cardInteractive, styles.insightCard, styles.iconHoverHost)}>
              <div className={styles.insightHead}>
                <DashboardV8Icon iconKey={action.iconKey} size="row" tone={action.tone} />
                <div className="flex flex-1 flex-col">
                  <h3 className={styles.insightTitle}>{action.title}</h3>
                  <span className={cn(styles.textFaint, "text-xs")}>{action.subtitle}</span>
                </div>
                <DashboardV8Button variant="mini" tone={action.tone}>
                  {action.actionLabel}
                </DashboardV8Button>
              </div>
            </article>
          ))}
        </div>

        {/* AI recommendation footer */}
        <div data-tone="violet" className={cn(styles.commandBanner, "mt-4")}>
          <DashboardV8Icon iconKey="magic" size="panel" tone="violet" />
          <div className="flex flex-col gap-1">
            <span className={cn(styles.sectionTitle, "text-sm")}>{aiRecommendationTitle}</span>
            <span className={cn(styles.textMuted, "text-[12.5px] leading-relaxed")}>{aiRecommendationDescription}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

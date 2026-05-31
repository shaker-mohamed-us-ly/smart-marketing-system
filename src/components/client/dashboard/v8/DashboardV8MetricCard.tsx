/**
 * Dashboard V8 Metric Card.
 *
 * Premium metric tile: tone-tinted icon frame, prominent value, title,
 * trend chip, description and an animated progress accent bar.
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8IconKey } from "./dashboard-v8-icons";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8MetricCardProps {
  iconKey: DashboardV8IconKey;
  title: string;
  value: string;
  trend: string;
  description: string;
  trendUp?: boolean;
  tone?: V8Tone;
  /** 0–100 progress fill for the accent bar */
  progress?: number;
  revealClass?: string;
}

export function DashboardV8MetricCard({
  iconKey,
  title,
  value,
  trend,
  description,
  trendUp = true,
  tone = "slate",
  progress = 70,
  revealClass,
}: DashboardV8MetricCardProps) {
  return (
    <article
      data-tone={tone}
      className={cn(styles.card, styles.cardInteractive, styles.metricCard, styles.iconHoverHost, styles.reveal, revealClass)}
    >
      <div className={styles.metricTopRow}>
        <DashboardV8Icon iconKey={iconKey} size="metric" tone={tone} />
        <span className={styles.trendChip}>
          <DashboardV8Icon iconKey={trendUp ? "up" : "down"} size="chip" tone={tone} className="!h-4 !w-4 !border-0 !bg-transparent !shadow-none" />
          {trend}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <div className={styles.metricValue}>{value}</div>
        <div className={styles.metricTitle}>{title}</div>
      </div>

      <div className={styles.metricBar} aria-hidden="true">
        <div className={styles.metricBarFill} style={{ width: `${Math.max(0, Math.min(100, progress))}%` }} />
      </div>

      <div className={styles.metricDesc}>{description}</div>
    </article>
  );
}

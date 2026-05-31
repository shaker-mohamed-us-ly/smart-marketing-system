/**
 * Dashboard V8 Command Center — central AI workbench panel.
 *
 * Contains the AI command banner, a compact operations stat row and the
 * recent activity flow. This is the visual centre of gravity of the canvas.
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8Button } from "./DashboardV8Button";
import { DashboardV8ActivityFlow, DashboardV8Activity } from "./DashboardV8ActivityFlow";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8CommandStat {
  label: string;
  value: string;
}

export interface DashboardV8CommandCenterProps {
  title: string;
  viewAllLabel: string;
  commandTitle: string;
  commandDescription: string;
  stats: DashboardV8CommandStat[];
  activities: DashboardV8Activity[];
}

export function DashboardV8CommandCenter({
  title,
  viewAllLabel,
  commandTitle,
  commandDescription,
  stats,
  activities,
}: DashboardV8CommandCenterProps) {
  return (
    <section className={cn(styles.panel, styles.panelPad, styles.reveal, styles.r3)}>
      <div className={styles.panelHead}>
        <div className={cn(styles.panelHeadLeft, styles.iconHoverHost)}>
          <DashboardV8Icon iconKey="operations" size="panel" tone="violet" />
          <h2 className={cn(styles.sectionTitle, "text-lg")}>{title}</h2>
        </div>
        <DashboardV8Button variant="mini" tone="slate">
          {viewAllLabel}
        </DashboardV8Button>
      </div>

      {/* AI command banner */}
      <div data-tone="violet" className={styles.commandBanner}>
        <DashboardV8Icon iconKey="brain" size="panel" tone="violet" />
        <div className="flex flex-col gap-1">
          <span className={cn(styles.sectionTitle, "text-sm")}>{commandTitle}</span>
          <span className={cn(styles.textMuted, "text-[12.5px] leading-relaxed")}>{commandDescription}</span>
        </div>
      </div>

      {/* Operations stat row */}
      <div className={styles.statRow}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.statCell}>
            <span className={styles.statLabel}>{stat.label}</span>
            <span className={styles.statValue}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Activity flow */}
      <div className="mt-2">
        <DashboardV8ActivityFlow activities={activities} />
      </div>
    </section>
  );
}

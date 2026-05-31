/**
 * Dashboard V8 Activity Flow.
 *
 * Vertical stream of recent operations activities with tone-coded icon
 * frames, unread markers and timestamps. Presentational only.
 */

import { cn } from "@/lib/utils/cn";
import { DashboardV8Icon } from "./DashboardV8Icon";
import { DashboardV8IconKey } from "./dashboard-v8-icons";
import { V8Tone } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8Activity {
  id: string;
  iconKey: DashboardV8IconKey;
  title: string;
  description: string;
  time: string;
  tone: V8Tone;
  unread?: boolean;
}

export interface DashboardV8ActivityFlowProps {
  activities: DashboardV8Activity[];
}

export function DashboardV8ActivityFlow({ activities }: DashboardV8ActivityFlowProps) {
  return (
    <div className={styles.activityList}>
      {activities.map((activity) => (
        <div key={activity.id} data-tone={activity.tone} className={cn(styles.activityRow, styles.iconHoverHost)}>
          <DashboardV8Icon iconKey={activity.iconKey} size="row" tone={activity.tone} />
          <div className={styles.activityBody}>
            <div className="flex items-center gap-2">
              {activity.unread && <span className={styles.unreadDot} aria-hidden="true" />}
              <span className={styles.activityTitle}>{activity.title}</span>
            </div>
            <p className={styles.activityDesc}>{activity.description}</p>
          </div>
          <span className={styles.activityTime}>{activity.time}</span>
        </div>
      ))}
    </div>
  );
}

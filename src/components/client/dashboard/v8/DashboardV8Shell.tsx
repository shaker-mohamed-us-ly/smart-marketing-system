/**
 * Dashboard V8 Shell
 *
 * Premium Centered Canvas wrapper:
 * - Defines the V8 theme-variable scope (`v8Root`).
 * - Warm off-white (light) / graphite (dark) background with a subtle,
 *   non-noisy radial accent.
 * - Centers content to a premium max-width (~1200px) so cards never become
 *   full-width and lifeless, and never collapse into a tiny vertical stack.
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { V8_CANVAS_MAX_WIDTH } from "./DashboardV8Tokens";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8ShellProps {
  children: ReactNode;
  className?: string;
}

export function DashboardV8Shell({ children, className }: DashboardV8ShellProps) {
  return (
    <div className={cn(styles.v8Root, styles.shell, className)}>
      <div className={styles.canvas} style={{ maxWidth: V8_CANVAS_MAX_WIDTH }}>
        {children}
      </div>
    </div>
  );
}

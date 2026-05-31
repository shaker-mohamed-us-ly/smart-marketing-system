/**
 * Dashboard V8 Icon
 *
 * - Single line-icon family (lucide-react), resolved from a serializable
 *   `iconKey` string so Server Components never pass icon component objects
 *   across a client boundary (RSC-safe).
 * - Icons sit inside soft, tone-tinted rounded-square frames with a subtle
 *   hover/active micro-motion (respects reduced motion via the CSS module).
 */

import { dashboardV8Icons, DashboardV8IconKey } from "./dashboard-v8-icons";
import { v8IconSizes, V8IconSize, V8Tone } from "./DashboardV8Tokens";
import { cn } from "@/lib/utils/cn";
import styles from "./DashboardV8Motion.module.css";

export interface DashboardV8IconProps {
  iconKey: DashboardV8IconKey;
  size?: V8IconSize;
  tone?: V8Tone;
  className?: string;
  ariaLabel?: string;
}

export function DashboardV8Icon({
  iconKey,
  size = "metric",
  tone = "slate",
  className,
  ariaLabel,
}: DashboardV8IconProps) {
  const IconComponent = dashboardV8Icons[iconKey];
  const { frame, icon } = v8IconSizes[size];

  if (!IconComponent) {
    return null;
  }

  const decorative = !ariaLabel;

  return (
    <span
      data-tone={tone}
      className={cn(styles.iconFrame, className)}
      style={{ width: frame, height: frame }}
      role={decorative ? undefined : "img"}
      aria-label={ariaLabel}
      aria-hidden={decorative ? true : undefined}
    >
      <IconComponent width={icon} height={icon} strokeWidth={1.85} aria-hidden="true" />
    </span>
  );
}

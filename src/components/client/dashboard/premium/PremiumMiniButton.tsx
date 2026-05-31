"use client";

import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import { premiumColors } from "@/lib/design/premium-dashboard-tokens";
import { dashboardIcons } from "./premium-dashboard-icons";
import styles from "./PremiumMotion.module.css";

export type MiniButtonTone = "violet" | "emerald" | "amber" | "orange" | "gray" | "blue";
export type DashboardIconKey = keyof typeof dashboardIcons;

export interface PremiumMiniButtonProps {
  label?: string;
  children?: ReactNode;
  iconKey?: DashboardIconKey;
  iconPosition?: "start" | "end";
  tone?: MiniButtonTone;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const toneColors: Record<MiniButtonTone, string> = {
  violet: premiumColors.violet,
  emerald: premiumColors.emerald,
  amber: premiumColors.amber,
  orange: premiumColors.orange,
  gray: premiumColors.slate,
  blue: premiumColors.blue,
};

export function PremiumMiniButton({
  label,
  children,
  iconKey,
  iconPosition = "end",
  tone = "violet",
  className,
  onClick,
  type = "button",
}: PremiumMiniButtonProps) {
  const color = toneColors[tone];
  const content = children || label;
  const Icon = iconKey ? dashboardIcons[iconKey] : null;

  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[12px]",
        "font-semibold text-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:shadow-sm",
        styles.motionButtonPress,
        className
      )}
      style={{
        backgroundColor: `${color}12`,
        color: color,
        height: "32px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `${color}18`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = `${color}12`;
      }}
    >
      {Icon && iconPosition === "start" && <Icon className="w-4 h-4 motion-icon-soft-vector" />}
      {content}
      {Icon && iconPosition === "end" && <Icon className="w-4 h-4 motion-icon-soft-vector" />}
    </button>
  );
}

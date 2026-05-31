import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import styles from "./PremiumMotion.module.css";

export type IconTone = "violet" | "emerald" | "orange" | "amber" | "gray" | "rose" | "blue";

export interface PremiumAppIconFrameProps {
  icon: LucideIcon;
  tone?: IconTone;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const toneColors: Record<IconTone, string> = {
  violet: "#7C3AED",
  emerald: "#10B981",
  orange: "#F97316",
  amber: "#F59E0B",
  gray: "#6B7280",
  rose: "#E11D48",
  blue: "#2F80ED",
};

const sizeClasses = {
  sm: "h-11 w-11", // 44px - increased for premium feel
  md: "h-10 w-10", // 40px
  lg: "h-12 w-12", // 48px
};

const iconSizes = {
  sm: "w-5 h-5", // 20px - increased for premium feel
  md: "w-5 h-5", // 20px
  lg: "w-6 h-6", // 24px
};

export function PremiumAppIconFrame({
  icon: Icon,
  tone = "gray",
  size = "md",
  className,
}: PremiumAppIconFrameProps) {
  const iconColor = toneColors[tone];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[10px] bg-white border",
        "motion-icon-frame-glow motion-icon-tap-pop",
        sizeClasses[size],
        className
      )}
      style={{
        borderColor: "#E4E7EC",
        boxShadow: "0 2px 6px rgba(15, 23, 42, 0.05)",
      }}
    >
      <Icon 
        className={cn(iconSizes[size], "motion-icon-soft-vector")} 
        style={{ color: iconColor }} 
      />
    </div>
  );
}

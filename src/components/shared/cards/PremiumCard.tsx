import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { StaticCard } from "./StaticCard";
import { MotionLayer, MotionVariant } from "./MotionLayer";

export type PremiumCardVariant = "default" | "elevated" | "interactive";
export type PremiumCardMotion = "none" | "hover-border" | "gradient-breathe";

export interface PremiumCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: PremiumCardVariant;
  motion?: PremiumCardMotion;
  children: React.ReactNode;
}

const variantStyles: Record<PremiumCardVariant, string> = {
  default: "",
  elevated: "shadow-elevated",
  interactive: "transition-all duration-300 hover:shadow-elevated hover:-translate-y-1",
};

const motionStyles: Record<PremiumCardMotion, MotionVariant> = {
  none: "none",
  "hover-border": "none",
  "gradient-breathe": "none",
};

export function PremiumCard({
  variant = "default",
  motion = "none",
  children,
  className,
  ...props
}: PremiumCardProps) {
  return (
    <StaticCard depth="subtle" className={cn(variantStyles[variant], className)} {...props}>
      <MotionLayer motionVariant={motionStyles[motion]} />
      <div className="relative z-10">{children}</div>
    </StaticCard>
  );
}

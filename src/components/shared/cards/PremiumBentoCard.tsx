import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { PremiumGradientCard } from "./PremiumGradientCard";

export type BentoCardVariant = "violet" | "blue" | "emerald" | "rose";
export type BentoCardSize = "sm" | "md" | "lg" | "xl";

export interface PremiumBentoCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: BentoCardVariant;
  size?: BentoCardSize;
  children: React.ReactNode;
}

const sizeStyles: Record<BentoCardSize, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

export function PremiumBentoCard({
  variant = "violet",
  size = "md",
  children,
  className,
  ...props
}: PremiumBentoCardProps) {
  return (
    <PremiumGradientCard variant={variant} className={cn("h-full", className)} {...props}>
      <div className={cn("relative z-10 h-full", sizeStyles[size])}>{children}</div>
    </PremiumGradientCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { PremiumHoverBorder } from "../motion/PremiumHoverBorder";
import { StaticCard } from "./StaticCard";

export type GradientCardVariant = "violet" | "blue" | "emerald" | "rose";

export interface PremiumGradientCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: GradientCardVariant;
  children: React.ReactNode;
}

export function PremiumGradientCard({
  variant = "violet",
  children,
  className,
  ...props
}: PremiumGradientCardProps) {
  return (
    <PremiumHoverBorder variant={variant} className={cn("h-full", className)} {...props}>
      <StaticCard depth="subtle" className="h-full">
        <div className="relative z-10">{children}</div>
      </StaticCard>
    </PremiumHoverBorder>
  );
}

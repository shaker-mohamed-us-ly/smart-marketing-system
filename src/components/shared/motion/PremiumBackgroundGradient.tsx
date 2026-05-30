"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface PremiumBackgroundGradientProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "violet" | "blue" | "emerald" | "rose";
  intensity?: "subtle" | "medium" | "strong";
}

const gradientVariants = {
  violet: "from-violet-500/10 via-purple-500/5 to-indigo-500/10",
  blue: "from-blue-500/10 via-cyan-500/5 to-sky-500/10",
  emerald: "from-emerald-500/10 via-green-500/5 to-teal-500/10",
  rose: "from-rose-500/10 via-pink-500/5 to-red-500/10",
};

const intensityStyles = {
  subtle: "opacity-50",
  medium: "opacity-70",
  strong: "opacity-100",
};

export function PremiumBackgroundGradient({
  children,
  variant = "violet",
  intensity = "subtle",
  className,
  ...props
}: PremiumBackgroundGradientProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br animate-gradient-slow",
          gradientVariants[variant],
          intensityStyles[intensity]
        )}
        style={{
          backgroundSize: "200% 200%",
          animation: "gradient-slow 8s ease-in-out infinite",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

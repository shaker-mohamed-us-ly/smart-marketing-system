"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

export interface PremiumGradientBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "violet" | "blue" | "emerald" | "rose";
}

const gradientVariants = {
  violet: "from-violet-500 via-purple-500 to-indigo-500",
  blue: "from-blue-500 via-cyan-500 to-sky-500",
  emerald: "from-emerald-500 via-green-500 to-teal-500",
  rose: "from-rose-500 via-pink-500 to-red-500",
};

export function PremiumGradientBorder({
  children,
  variant = "violet",
  className,
  ...props
}: PremiumGradientBorderProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r animate-gradient-rotate",
          gradientVariants[variant]
        )}
        style={{
          backgroundSize: "200% 200%",
          animation: "gradient-rotate 6s linear infinite",
        }}
      />
      <div className="relative bg-card rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
}

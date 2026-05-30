"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState } from "react";

export interface PremiumHoverBorderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "violet" | "blue" | "emerald" | "rose";
}

const gradientVariants = {
  violet: "from-violet-500 via-purple-500 to-indigo-500",
  blue: "from-blue-500 via-cyan-500 to-sky-500",
  emerald: "from-emerald-500 via-green-500 to-teal-500",
  rose: "from-rose-500 via-pink-500 to-red-500",
};

export function PremiumHoverBorder({
  children,
  variant = "violet",
  className,
  ...props
}: PremiumHoverBorderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn(
        "relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300",
        isHovered && "shadow-lg shadow-primary/20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300",
          gradientVariants[variant],
          isHovered && "opacity-100"
        )}
      />
      <div className="relative bg-card rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
}

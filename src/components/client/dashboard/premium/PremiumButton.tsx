"use client";

import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";
import styles from "./PremiumMotion.module.css";

export type PremiumButtonVariant = "liquidPressFinal" | "auroraBorderPressFinal" | "liquidElastic" | "auroraBorder" | "default";

export interface PremiumButtonProps {
  children: ReactNode;
  variant?: PremiumButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  style?: "primary" | "secondary";
}

export function PremiumButton({
  children,
  variant = "default",
  className,
  onClick,
  type = "button",
  style = "primary",
}: PremiumButtonProps) {
  if (variant === "liquidPressFinal") {
    return (
      <div className="relative motion-liquid-sweep-trigger">
        <button
          type={type}
          onClick={onClick}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] font-semibold text-white overflow-hidden whitespace-nowrap group",
            "transition-all duration-280 hover:-translate-y-0.5",
            styles.motionButtonPress,
            "shadow-md hover:shadow-lg",
            className
          )}
          style={{
            backgroundColor: "#2F80ED",
            height: "48px",
          }}
        >
          {/* Liquid wave animation - clipped inside button with blue/violet/cyan colors */}
          <span
            className="absolute inset-0 opacity-0 transition-all duration-280 group-hover:opacity-100 active:opacity-100 group-hover:translate-x-0 group-hover:scale-100 motion-liquid-sweep"
            style={{
              background: "linear-gradient(135deg, rgba(99, 102, 241, 0.6) 0%, rgba(124, 58, 237, 0.5) 30%, rgba(6, 182, 212, 0.4) 60%, rgba(59, 130, 246, 0.5) 100%)",
              filter: "blur(20px)",
              transform: "translateX(-120%) scale(1.8) skewX(-12deg)",
            }}
          />
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </button>
      </div>
    );
  }

  if (variant === "auroraBorderPressFinal") {
    const isPrimary = style === "primary";
    
    return (
      <div className="relative inline-flex isolation-isolate group motion-aurora-border-trigger">
        {/* Aurora glow layer behind button only - subtle premium colors */}
        <span
          className="absolute inset-[-3px] rounded-[16px] opacity-0 transition-all duration-280 group-hover:opacity-60 group-active:opacity-80 group-hover:scale-[1.02] group-active:scale-[1.06] group-active:blur-[12px] motion-aurora-border"
          style={{
            background: "conic-gradient(from 0deg, rgba(124, 58, 237, 0.5) 0deg, rgba(6, 182, 212, 0.45) 90deg, rgba(16, 185, 129, 0.45) 180deg, rgba(245, 158, 11, 0.45) 270deg, rgba(124, 58, 237, 0.5) 360deg)",
            filter: "blur(12px)",
            zIndex: 0,
          }}
        />
        <button
          type={type}
          onClick={onClick}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[14px] font-semibold transition-all duration-280 whitespace-nowrap",
            "hover:-translate-y-0.5 active:scale-[0.985] active:translate-y-[1px]",
            styles.motionButtonPress,
            "shadow-md hover:shadow-lg",
            className
          )}
          style={{
            backgroundColor: isPrimary ? "#7C3AED" : "#FFFFFF",
            color: isPrimary ? "#FFFFFF" : "#374151",
            border: isPrimary ? "none" : "1px solid #E4E7EC",
            zIndex: 10,
            height: "48px",
          }}
        >
          <span className="relative z-20 flex items-center gap-2">{children}</span>
        </button>
      </div>
    );
  }

  if (variant === "liquidElastic") {
    return (
      <button
        type={type}
        onClick={onClick}
        className={cn(
          "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[14px] font-semibold text-white overflow-hidden",
          "transition-all duration-300 hover:-translate-y-0.5",
          "shadow-md hover:shadow-lg",
          className
        )}
        style={{
          backgroundColor: "#7C3AED",
        }}
      >
        {/* Liquid elastic square animation - clipped inside button */}
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-all duration-550"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.8) 0%, rgba(236, 72, 153, 0.5) 30%, rgba(139, 92, 246, 0.3) 60%, transparent 100%)",
            filter: "blur(20px)",
            transform: "translateX(-150%) scale(1.8)",
          }}
        />
        <span className="relative z-10">{children}</span>
      </button>
    );
  }

  if (variant === "auroraBorder") {
    return (
      <div className="relative inline-flex p-[2px] rounded-[14px]">
        {/* Aurora glow layer behind button border only */}
        <span
          className="absolute inset-0 rounded-[14px] opacity-0 hover:opacity-100 transition-all duration-550"
          style={{
            background: "linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(16, 185, 129, 0.15) 25%, rgba(245, 158, 11, 0.12) 50%, rgba(6, 182, 212, 0.15) 75%, rgba(124, 58, 237, 0.2) 100%)",
            filter: "blur(14px)",
          }}
        />
        <button
          type={type}
          onClick={onClick}
          className={cn(
            "relative inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] font-semibold text-gray-700 bg-white",
            "transition-all duration-300 hover:-translate-y-0.5",
            "shadow-md hover:shadow-lg",
            className
          )}
          style={{
            border: "1px solid #E4E7EC",
          }}
        >
          <span className="relative z-10">{children}</span>
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200",
        className
      )}
    >
      {children}
    </button>
  );
}

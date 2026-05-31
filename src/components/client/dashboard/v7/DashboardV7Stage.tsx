/**
 * Dashboard V7.2 Stage
 * 
 * Premium Centered Command Stage
 * 
 * Responsibilities:
 * - Route background fills content area
 * - Centered stage with max-width 1220px
 * - No edge-to-edge card spread
 * - No tiny stack
 * - Graphite dark mode
 * - Clean day mode
 * - Stage reveal animation
 * 
 * Sources:
 * - Material Design Layout
 * - Apple Human Interface Guidelines - Layout
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { v7Colors, v7Layout, v7Spacing } from "./DashboardV7Tokens";
import styles from "./DashboardV7Motion.module.css";

export interface DashboardV7StageProps {
  children: ReactNode;
  className?: string;
}

export function DashboardV7Stage({
  children,
  className,
}: DashboardV7StageProps) {
  return (
    <div
      className={cn(
        // Route background fills content area
        "w-full min-h-screen",
        // Light mode: clean continuous background
        "bg-[#F5F6F8]",
        // Dark mode: luxury graphite
        "dark:bg-[#080A0D]",
        // Subtle radial accent for depth
        "radial-bg",
        className
      )}
      style={{
        // Light mode subtle radial accent
        backgroundImage: "radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.015) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.015) 0%, transparent 50%)",
      }}
    >
      {/* Centered Premium Stage */}
      <div
        className={cn(
          "w-full mx-auto",
          styles.v7StageReveal
        )}
        style={{
          maxWidth: `${v7Layout.stage.maxWidth}px`,
          padding: `${v7Spacing.stage.desktop}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

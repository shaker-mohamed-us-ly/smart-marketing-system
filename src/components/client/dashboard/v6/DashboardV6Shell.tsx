/**
 * Dashboard V6.5 Shell
 *
 * Responsibilities:
 * - Transparent canvas wrapper (background handled by route/page)
 * - Centered premium canvas with max-width 1160px
 * - No padding (handled by AppShell main)
 * - No background (handled by route/page)
 */

import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface DashboardV6ShellProps {
  children: ReactNode;
  className?: string;
}

export function DashboardV6Shell({
  children,
  className,
}: DashboardV6ShellProps) {
  return (
    <div
      className={cn(
        // Transparent wrapper, no background
        "w-full",
        className
      )}
    >
      {/* Centered premium canvas */}
      <div
        className="w-full mx-auto"
        style={{
          maxWidth: "1160px",
        }}
      >
        {children}
      </div>
    </div>
  );
}

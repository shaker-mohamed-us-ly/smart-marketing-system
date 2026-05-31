import { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface PremiumDashboardShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * PremiumDashboardShell - Route-level wrapper for /client/dashboard
 * 
 * Responsibilities:
 * - Owns light/dark page background (full-bleed)
 * - Owns canvas max-width
 * - Owns route-level spacing
 * - Fixes dark mode edge bleed (white gutters)
 * - Prevents horizontal overflow
 */
export function PremiumDashboardShell({
  children,
  className,
}: PremiumDashboardShellProps) {
  return (
    <div
      className={cn(
        // Full-bleed background - no white gutters in dark mode
        "min-h-screen w-full overflow-x-hidden",
        // Light mode: premium bright background
        "bg-[#F9FBFD]",
        // Dark mode: Framer-inspired deep dark with inner canvas
        "dark:bg-[#05070D]",
        // Route-level padding
        "p-4 sm:p-6 lg:p-8",
        className
      )}
    >
      {/* Canvas with max-width */}
      <div className="w-full mx-auto max-w-[1400px]">
        {children}
      </div>
    </div>
  );
}

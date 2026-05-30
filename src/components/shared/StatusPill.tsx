import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";

export interface StatusPillProps extends HTMLAttributes<HTMLDivElement> {
  status: "active" | "inactive" | "pending" | "success" | "error" | "warning";
  label?: string;
}

const StatusPill = forwardRef<HTMLDivElement, StatusPillProps>(
  ({ className, status, label, ...props }, ref) => {
    const statusConfig = {
      active: {
        label: label || "Active",
        className: "bg-success/10 text-success border-success/20",
        dot: "bg-success",
      },
      inactive: {
        label: label || "Inactive",
        className: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground",
      },
      pending: {
        label: label || "Pending",
        className: "bg-warning/10 text-warning border-warning/20",
        dot: "bg-warning",
      },
      success: {
        label: label || "Success",
        className: "bg-success/10 text-success border-success/20",
        dot: "bg-success",
      },
      error: {
        label: label || "Error",
        className: "bg-error/10 text-error border-error/20",
        dot: "bg-error",
      },
      warning: {
        label: label || "Warning",
        className: "bg-warning/10 text-warning border-warning/20",
        dot: "bg-warning",
      },
    };

    const config = statusConfig[status];

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium",
          config.className,
          className
        )}
        {...props}
      >
        <div className={cn("h-2 w-2 rounded-full", config.dot)} />
        <span>{config.label}</span>
      </div>
    );
  }
);

StatusPill.displayName = "StatusPill";

export { StatusPill };

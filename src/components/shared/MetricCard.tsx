import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

export interface MetricCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon?: LucideIcon;
}

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  (
    { className, title, value, change, changeType = "neutral", icon: Icon, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl bg-card p-6 shadow-md transition-all duration-200 hover:shadow-lg",
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
            {change && (
              <p
                className={cn("text-sm font-medium", {
                  "text-success": changeType === "positive",
                  "text-error": changeType === "negative",
                  "text-muted-foreground": changeType === "neutral",
                })}
              >
                {change}
              </p>
            )}
          </div>
          {Icon && (
            <div className="rounded-lg bg-primary/10 p-2">
              <Icon className="h-5 w-5 text-primary" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

MetricCard.displayName = "MetricCard";

export { MetricCard };

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export interface SystemStatusProps extends HTMLAttributes<HTMLDivElement> {
  status: "operational" | "degraded" | "down";
  icon?: LucideIcon;
  label?: string;
  showIndicator?: boolean;
}

const SystemStatus = forwardRef<HTMLDivElement, SystemStatusProps>(
  ({ status = "operational", icon: Icon, label, showIndicator = true, className, ...props }, ref) => {
    const t = useTranslations('common');
    const statusColors = {
      operational: "bg-success",
      degraded: "bg-warning",
      down: "bg-error",
    };

    const statusLabels = {
      operational: t('statusOperational'),
      degraded: t('statusDegraded'),
      down: t('statusDown'),
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
      >
        {showIndicator && (
          <div className={cn("h-2 w-2 rounded-full", statusColors[status], "animate-subtle-pulse")} />
        )}
        {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
        {label && <span className="text-sm text-muted-foreground">{label}</span>}
        {!label && <span className="text-sm text-muted-foreground">{statusLabels[status]}</span>}
      </div>
    );
  }
);

SystemStatus.displayName = "SystemStatus";

export { SystemStatus };

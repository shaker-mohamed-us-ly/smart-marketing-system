import { cn } from "@/lib/utils/cn";
import styles from "./PremiumConnectionStatus.module.css";

export type ConnectionStatus = "connected" | "offline" | "syncing" | "warning";

export interface PremiumConnectionStatusProps {
  status: ConnectionStatus;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

export function PremiumConnectionStatus({
  status,
  showLabel = false,
  label,
  className,
}: PremiumConnectionStatusProps) {
  const statusConfig = {
    connected: {
      dotColor: "bg-emerald-500",
      ringColor: "border-emerald-500",
      textColor: "text-emerald-600",
      defaultLabel: "متصل",
    },
    offline: {
      dotColor: "bg-gray-400",
      ringColor: "border-gray-400",
      textColor: "text-gray-500",
      defaultLabel: "غير متصل",
    },
    syncing: {
      dotColor: "bg-amber-500",
      ringColor: "border-amber-500",
      textColor: "text-amber-600",
      defaultLabel: "مزامنة",
    },
    warning: {
      dotColor: "bg-amber-500",
      ringColor: "border-amber-500",
      textColor: "text-amber-600",
      defaultLabel: "تنبيه",
    },
  };

  const config = statusConfig[status];
  const displayLabel = label || config.defaultLabel;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* Animated status indicator */}
      <div className="relative flex items-center justify-center w-4 h-4">
        {/* Pulse ring - softer animation */}
        {status === "connected" && (
          <span
            className={cn("absolute inset-0 rounded-full border-2", styles.softPulseConnected)}
            style={{ borderColor: "#10B981" }}
          />
        )}
        {status === "syncing" && (
          <span
            className={cn("absolute inset-0 rounded-full border-2", styles.softPulseSyncing)}
            style={{ borderColor: "#F59E0B" }}
          />
        )}
        {status === "offline" && (
          <span
            className={cn("absolute inset-0 rounded-full border-2 opacity-30", styles.softPulseOffline)}
            style={{ borderColor: "#9CA3AF" }}
          />
        )}
        
        {/* Status dot */}
        <span
          className={cn(
            "relative w-2.5 h-2.5 rounded-full",
            config.dotColor
          )}
        />
      </div>

      {/* Optional label */}
      {showLabel && (
        <span className={cn("text-xs font-medium", config.textColor)}>
          {displayLabel}
        </span>
      )}
    </div>
  );
}

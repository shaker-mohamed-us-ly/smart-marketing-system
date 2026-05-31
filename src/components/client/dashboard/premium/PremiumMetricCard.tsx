import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { PremiumAppIconFrame, IconTone } from "./PremiumAppIconFrame";
import { premiumColors } from "@/lib/design/premium-dashboard-tokens";
import styles from "./PremiumMotion.module.css";

export type CardSurface = "neutral" | "softGray" | "softViolet" | "softEmerald" | "softOrange" | "softAmber" | "peach" | "mint" | "blue" | "lavender";

export interface PremiumMetricCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  description?: string;
  tone?: IconTone;
  vsLastMonth?: string;
  surface?: CardSurface;
  className?: string;
}

const surfaceStyles: Record<CardSurface, { bg: string; borderClass: string; hoverBorderClass: string }> = {
  neutral: { bg: "bg-white dark:bg-[#101624]", borderClass: "border-[rgba(203,213,225,0.57)] dark:border-white/8", hoverBorderClass: "hover:border-[rgba(203,213,225,0.70)] dark:hover:border-white/12" },
  softGray: { bg: "bg-[#F7F9FC] dark:bg-[#0B0F19]", borderClass: "border-[rgba(203,213,225,0.57)] dark:border-white/8", hoverBorderClass: "hover:border-[rgba(203,213,225,0.70)] dark:hover:border-white/12" },
  softViolet: { bg: "bg-[#F7F4FF] dark:bg-[#141B2B]", borderClass: "border-[rgba(124,58,237,0.13)] dark:border-violet-500/20", hoverBorderClass: "hover:border-[rgba(124,58,237,0.22)] dark:hover:border-violet-500/30" },
  softEmerald: { bg: "bg-[#F4FCF8] dark:bg-[#141B2B]", borderClass: "border-[rgba(16,185,129,0.13)] dark:border-emerald-500/20", hoverBorderClass: "hover:border-[rgba(16,185,129,0.22)] dark:hover:border-emerald-500/30" },
  softOrange: { bg: "bg-[#FFF5EE] dark:bg-[#141B2B]", borderClass: "border-[rgba(249,115,22,0.13)] dark:border-orange-500/20", hoverBorderClass: "hover:border-[rgba(249,115,22,0.22)] dark:hover:border-orange-500/30" },
  softAmber: { bg: "bg-[#FFFAEA] dark:bg-[#141B2B]", borderClass: "border-[rgba(245,158,11,0.13)] dark:border-amber-500/20", hoverBorderClass: "hover:border-[rgba(245,158,11,0.22)] dark:hover:border-amber-500/30" },
  peach: { bg: "bg-[#FFF5EE] dark:bg-[#141B2B]", borderClass: "border-[rgba(249,115,22,0.13)] dark:border-orange-500/20", hoverBorderClass: "hover:border-[rgba(249,115,22,0.22)] dark:hover:border-orange-500/30" },
  mint: { bg: "bg-[#F4FCF8] dark:bg-[#141B2B]", borderClass: "border-[rgba(16,185,129,0.13)] dark:border-emerald-500/20", hoverBorderClass: "hover:border-[rgba(16,185,129,0.22)] dark:hover:border-emerald-500/30" },
  blue: { bg: "bg-[#F4FAFF] dark:bg-[#141B2B]", borderClass: "border-[rgba(47,128,237,0.13)] dark:border-blue-500/20", hoverBorderClass: "hover:border-[rgba(47,128,237,0.22)] dark:hover:border-blue-500/30" },
  lavender: { bg: "bg-[#F7F4FF] dark:bg-[#141B2B]", borderClass: "border-[rgba(124,58,237,0.13)] dark:border-violet-500/20", hoverBorderClass: "hover:border-[rgba(124,58,237,0.22)] dark:hover:border-violet-500/30" },
};

export function PremiumMetricCard({
  icon: Icon,
  title,
  value,
  trend,
  trendUp = true,
  description,
  tone = "gray",
  vsLastMonth,
  surface = "neutral",
  className,
}: PremiumMetricCardProps) {
  const surfaceStyle = surfaceStyles[surface];

  return (
    <div
      className={cn(
        "rounded-[24px] border p-5",
        "transition-all duration-200 hover:-translate-y-0.5",
        "animate-in fade-in slide-in-from-bottom-1.5 duration-280",
        surfaceStyle.bg,
        surfaceStyle.borderClass,
        surfaceStyle.hoverBorderClass,
        className
      )}
      style={{
        boxShadow: "0 12px 32px rgba(15, 23, 42, 0.032)",
      }}
    >
      {/* Header with Icon Tile and Title */}
      <div className="flex items-center gap-3 mb-3">
        <PremiumAppIconFrame icon={Icon} tone={tone} size="lg" className="motion-icon-frame-glow motion-icon-tap-pop" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{title}</p>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{value}</p>
      
      {/* Trend */}
      {trend && (
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-semibold",
              trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
            )}
          >
            {trendUp ? "+" : ""}{trend}
          </span>
          <span className="text-xs text-gray-400 dark:text-slate-400">{vsLastMonth || "vs last month"}</span>
        </div>
      )}

      {/* Description */}
      {description && (
        <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">{description}</p>
      )}

      {/* Premium Signal Bar with gradient and animation */}
      <div className="mt-3 h-[5px] w-full rounded-full bg-slate-200/60 dark:bg-white/10 overflow-hidden">
        <div 
          className={cn("h-full rounded-full motion-signal-reveal", styles.motionSignalReveal)}
          style={{ 
            width: trendUp ? "75%" : "45%",
            background: getSignalGradient(tone, trendUp),
          }}
        />
      </div>
    </div>
  );
}

function getSignalGradient(tone: IconTone, trendUp: boolean): string {
  const gradients: Record<IconTone, { up: string; down: string }> = {
    violet: { up: `linear-gradient(90deg, rgba(124,58,237,0.4) 0%, #7C3AED 100%)`, down: `linear-gradient(90deg, rgba(124,58,237,0.4) 0%, #7C3AED 100%)` },
    emerald: { up: `linear-gradient(90deg, rgba(16,185,129,0.4) 0%, #10B981 100%)`, down: `linear-gradient(90deg, rgba(16,185,129,0.4) 0%, #10B981 100%)` },
    orange: { up: `linear-gradient(90deg, rgba(249,115,22,0.4) 0%, #F97316 100%)`, down: `linear-gradient(90deg, rgba(249,115,22,0.4) 0%, #F97316 100%)` },
    amber: { up: `linear-gradient(90deg, rgba(245,158,11,0.4) 0%, #F59E0B 100%)`, down: `linear-gradient(90deg, rgba(245,158,11,0.4) 0%, #F59E0B 100%)` },
    gray: { up: `linear-gradient(90deg, rgba(107,114,128,0.4) 0%, #6B7280 100%)`, down: `linear-gradient(90deg, rgba(107,114,128,0.4) 0%, #6B7280 100%)` },
    rose: { up: `linear-gradient(90deg, rgba(225,29,72,0.4) 0%, #E11D48 100%)`, down: `linear-gradient(90deg, rgba(225,29,72,0.4) 0%, #E11D48 100%)` },
    blue: { up: `linear-gradient(90deg, rgba(47,128,237,0.4) 0%, #2F80ED 100%)`, down: `linear-gradient(90deg, rgba(47,128,237,0.4) 0%, #2F80ED 100%)` },
  };
  return gradients[tone][trendUp ? "up" : "down"];
}

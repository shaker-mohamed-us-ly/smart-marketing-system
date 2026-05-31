import { cn } from "@/lib/utils/cn";
import { LucideIcon } from "lucide-react";
import { PremiumAppIconFrame, IconTone } from "./PremiumAppIconFrame";
import { CardSurface } from "./PremiumMetricCard";
import { PremiumMiniButton, MiniButtonTone } from "./PremiumMiniButton";

export interface PremiumActionCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  actionLabel: string;
  tone?: IconTone;
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

export function PremiumActionCard({
  icon: Icon,
  title,
  subtitle,
  actionLabel,
  tone = "gray",
  surface = "neutral",
  className,
}: PremiumActionCardProps) {
  const surfaceStyle = surfaceStyles[surface];

  return (
    <div
      className={cn(
        "rounded-[24px] border p-5",
        "transition-all duration-200 hover:-translate-y-0.5",
        "group cursor-pointer",
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
          <h3 className="text-base font-bold text-gray-900 dark:text-white leading-tight">{title}</h3>
        </div>
      </div>

      {/* Subtitle */}
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-3">{subtitle}</p>

      {/* Action */}
      <PremiumMiniButton tone={tone as MiniButtonTone} iconKey="openAction" iconPosition="end">
        {actionLabel}
      </PremiumMiniButton>
    </div>
  );
}

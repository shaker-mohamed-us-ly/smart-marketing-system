"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes, useState } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";
import { AnimatedIcon } from "@/components/shared/AnimatedIcon";
import { AIThinkingIndicator } from "@/components/shared/AIThinkingIndicator";
import { BrainCircuit, TrendingUp, Lightbulb, Moon, Sun, Home, BarChart3, Settings } from "lucide-react";

export interface DarkModePreviewPanelProps extends HTMLAttributes<HTMLDivElement> {
  isDark?: boolean;
  labels?: {
    title: string;
    dashboard: string;
    aiBrain: string;
    health: string;
    summerCollection: string;
    increaseBudget: string;
    systems: string;
    operational: string;
  };
}

export function DarkModePreviewPanel({ isDark = true, labels, className, ...props }: DarkModePreviewPanelProps) {
  const t = useTranslations('clientDashboard.previewPanel');
  const [darkMode, setDarkMode] = useState(isDark);

  return (
    <div className={cn("w-full max-w-[300px] hidden lg:block", className)} {...props}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <AnimatedIcon icon={darkMode ? Moon : Sun} size={18} state="idle" />
        </button>
      </div>

      <div className={cn(
        "rounded-3xl p-4 border transition-all duration-300",
        darkMode ? "bg-[#0f1115] border-gray-800" : "bg-white border-gray-200"
      )}>
        {/* Phone Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: darkMode ? '#1f2937' : '#e5e7eb' }}>
          <span className="text-sm font-medium" style={{ color: darkMode ? '#f5f6f7' : '#1a1d23' }}>{labels?.dashboard || t('dashboard')}</span>
          <div className="flex gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: darkMode ? '#10b981' : '#3b82f6' }} />
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: darkMode ? '#6b7280' : '#d1d5db' }} />
          </div>
        </div>

        {/* Mini AI Status */}
        <div className={cn(
          "rounded-xl p-3 mb-3",
          darkMode ? "bg-[#1a1d23]" : "bg-gray-50"
        )}>
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 animate-pulse" />
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <AIThinkingIndicator state="thinking" size="sm" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: darkMode ? '#f5f6f7' : '#1a1d23' }}>{labels?.aiBrain || t('aiBrain')}</p>
              <p className="text-xs" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{labels?.health || t('health')}</p>
            </div>
          </div>
        </div>

        {/* Mini Campaign Card */}
        <div className={cn(
          "rounded-xl p-3 mb-3",
          darkMode ? "bg-[#1a1d23]" : "bg-gray-50"
        )}>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <AnimatedIcon icon={TrendingUp} size={14} state="idle" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: darkMode ? '#f5f6f7' : '#1a1d23' }}>{labels?.summerCollection || t('summerCollection')}</p>
              <p className="text-xs" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>$12,450</p>
            </div>
            <span className="text-xs text-emerald-500">↑ 24%</span>
          </div>
        </div>

        {/* Mini AI Recommendation */}
        <div className={cn(
          "rounded-xl p-3 mb-3",
          darkMode ? "bg-[#1a1d23]" : "bg-gray-50"
        )}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <AnimatedIcon icon={Lightbulb} size={14} state="idle" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: darkMode ? '#f5f6f7' : '#1a1d23' }}>{labels?.increaseBudget || t('increaseBudget')}</p>
              <p className="text-xs text-primary">+18% ROI</p>
            </div>
          </div>
        </div>

        {/* Mini AI Brain Status */}
        <div className={cn(
          "rounded-xl p-3",
          darkMode ? "bg-[#1a1d23]" : "bg-gray-50"
        )}>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <AnimatedIcon icon={BrainCircuit} size={14} state="idle" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium" style={{ color: darkMode ? '#f5f6f7' : '#1a1d23' }}>{labels?.systems || t('systems')}</p>
              <p className="text-xs" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>{labels?.operational || t('operational')}</p>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-around mt-4 pt-3 border-t" style={{ borderColor: darkMode ? '#1f2937' : '#e5e7eb' }}>
          <AnimatedIcon icon={Home} size={18} state="idle" style={{ color: darkMode ? '#6366f1' : '#4f46e5' }} />
          <AnimatedIcon icon={BarChart3} size={18} state="idle" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }} />
          <AnimatedIcon icon={Settings} size={18} state="idle" style={{ color: darkMode ? '#6b7280' : '#9ca3af' }} />
        </div>
      </div>
    </div>
  );
}

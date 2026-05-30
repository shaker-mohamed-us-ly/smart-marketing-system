"use client";

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { InteractiveCard } from "@/components/shared/InteractiveCard";

export interface PerformanceOverviewProps extends HTMLAttributes<HTMLDivElement> {
  data?: { label: string; value: number }[];
  labels?: {
    title: string;
    subtitle: string;
    revenue: string;
    target: string;
    jan?: string;
    feb?: string;
    mar?: string;
    apr?: string;
    may?: string;
    jun?: string;
    jul?: string;
    aug?: string;
    sep?: string;
    oct?: string;
    nov?: string;
    dec?: string;
  };
}

export function PerformanceOverview({ data = [
  { label: "jan", value: 30 },
  { label: "feb", value: 45 },
  { label: "mar", value: 35 },
  { label: "apr", value: 55 },
  { label: "may", value: 48 },
  { label: "jun", value: 65 },
  { label: "jul", value: 58 },
  { label: "aug", value: 72 },
  { label: "sep", value: 68 },
  { label: "oct", value: 80 },
  { label: "nov", value: 75 },
  { label: "dec", value: 90 },
], labels, className, ...props }: PerformanceOverviewProps) {
  const t = useTranslations('clientDashboard.performanceOverview');
  const l = labels || {
    title: t('title'),
    subtitle: t('subtitle'),
    revenue: t('revenue'),
    target: t('target'),
    jan: t('jan'),
    feb: t('feb'),
    mar: t('mar'),
    apr: t('apr'),
    may: t('may'),
    jun: t('jun'),
    jul: t('jul'),
    aug: t('aug'),
    sep: t('sep'),
    oct: t('oct'),
    nov: t('nov'),
    dec: t('dec'),
  };

  const getMonthLabel = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(" ");

  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <InteractiveCard depth="subtle" className={cn("p-6", className)} {...props}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
          <p className="text-sm text-muted-foreground">{labels?.subtitle || t('subtitle')}</p>
        </div>
        <div className="flex gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{labels?.revenue || t('revenue')}</span>
          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">{labels?.target || t('target')}</span>
        </div>
      </div>
      <div className="relative h-48">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(79, 70, 229, 0.3)" />
              <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
            </linearGradient>
          </defs>
          <polygon
            points={areaPoints}
            fill="url(#gradient)"
            className="transition-all duration-500"
          />
          <polyline
            points={points}
            fill="none"
            stroke="rgba(79, 70, 229, 0.8)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500"
          />
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (d.value / maxValue) * 100;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1.5"
                fill="rgba(79, 70, 229, 1)"
                className="transition-all duration-300 hover:r-2"
              />
            );
          })}
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        {data.map((d, i) => (
          <span key={i} className={i % 2 === 0 ? "" : "hidden sm:inline"}>{getMonthLabel(d.label)}</span>
        ))}
      </div>
    </InteractiveCard>
  );
}

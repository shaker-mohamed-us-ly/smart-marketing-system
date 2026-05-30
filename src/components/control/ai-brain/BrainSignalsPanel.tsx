import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Radio, Activity } from "lucide-react";

export interface BrainSignalsPanelProps extends HTMLAttributes<HTMLDivElement> {
  signals?: { 
    strength: "Strong" | "Medium" | "Weak"; 
    signal: string; 
  }[];
  labels?: {
    title: string;
    signals: string;
    input: string;
    processing: string;
    output: string;
  };
}

export function BrainSignalsPanel({ 
  signals: signalsProp,
  labels,
  className, 
  ...props 
}: BrainSignalsPanelProps) {
  const t = useTranslations('controlAIBrain.signals');
  const signals = signalsProp || [
    { 
      strength: t('strength.strong'), 
      signal: t('signalList0'),
    },
    { 
      strength: t('strength.medium'), 
      signal: t('signalList1'),
    },
    { 
      strength: t('strength.weak'), 
      signal: t('signalList2'),
    },
  ];
  const l = labels || {
    title: t('title'),
    signals: t('signals'),
    input: t('input'),
    processing: t('processing'),
    output: t('output'),
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case "Strong":
        return "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
      case "Medium":
        return "text-amber-600 bg-amber-500/10 border-amber-500/20";
      case "Weak":
        return "text-muted-foreground bg-secondary/30 border-border/40";
      default:
        return "text-muted-foreground bg-secondary/30 border-border/40";
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Radio className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {signals.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border",
                getStrengthColor(item.strength)
              )}>
                {item.strength} {t('signalLabel')}
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Activity className="h-4 w-4 text-primary/60" />
                <p className="text-sm font-medium">{item.signal}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

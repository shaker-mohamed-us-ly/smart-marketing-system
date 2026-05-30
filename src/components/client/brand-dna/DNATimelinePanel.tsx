import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Clock, CheckCircle } from "lucide-react";

export interface DNATimelinePanelProps extends HTMLAttributes<HTMLDivElement> {
  events?: { event: string; time: string }[];
  labels?: {
    title: string;
    events?: { event: string; time: string }[];
  };
}

export function DNATimelinePanel({ 
  events: eventsProp,
  labels,
  className, 
  ...props 
}: DNATimelinePanelProps) {
  const t = useTranslations('clientBrandDNA.dnaTimeline');
  const events = eventsProp || labels?.events || [];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          {events.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                {index < events.length - 1 && (
                  <div className="w-px h-full bg-border/40 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <p className="text-sm font-medium">{item.event}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

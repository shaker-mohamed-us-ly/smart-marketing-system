import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Clock, MessageSquare } from "lucide-react";

export interface BrainDecisionTimelineProps extends HTMLAttributes<HTMLDivElement> {
  decisions?: { 
    time: string; 
    director: string; 
    decision: string; 
  }[];
  labels?: {
    title: string;
    timeline: string;
    decisions: string;
    confidence: string;
    execution: string;
  };
}

export function BrainDecisionTimeline({ 
  decisions: decisionsProp,
  labels,
  className, 
  ...props 
}: BrainDecisionTimelineProps) {
  const t = useTranslations('controlAIBrain.collaborationMap');
  const tTimeline = useTranslations('controlAIBrain.timeline');
  const decisions = decisionsProp || [
    { 
      time: "09:12 AM", 
      director: t('directors0'), 
      decision: tTimeline('decision0'),
    },
    { 
      time: "09:16 AM", 
      director: t('directors1'), 
      decision: tTimeline('decision1'),
    },
    { 
      time: "09:20 AM", 
      director: t('directors2'), 
      decision: tTimeline('decision2'),
    },
    { 
      time: "09:25 AM", 
      director: t('directors3'), 
      decision: tTimeline('decision3'),
    },
    { 
      time: "09:29 AM", 
      director: t('directors4'), 
      decision: tTimeline('decision4'),
    },
  ];
  const l = labels || {
    title: t('title'),
    timeline: t('timeline'),
    decisions: t('decisions'),
    confidence: t('confidence'),
    execution: t('execution'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-4">
          {decisions.map((decision, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-primary">{decision.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm font-medium">{decision.director}</span>
                </div>
                <p className="text-sm text-muted-foreground">{decision.decision}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

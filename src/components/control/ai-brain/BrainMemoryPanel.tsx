import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Database, CheckCircle } from "lucide-react";

export interface BrainMemoryPanelProps extends HTMLAttributes<HTMLDivElement> {
  memories?: string[];
  title?: string;
  labels?: {
    title: string;
    memory: string;
    storage: string;
    retrieval: string;
    learning: string;
  };
}

export function BrainMemoryPanel({ 
  memories: memoriesProp,
  title: titleProp,
  labels,
  className, 
  ...props 
}: BrainMemoryPanelProps) {
  const t = useTranslations('controlAIBrain.memoryPanel');
  const memories = memoriesProp || [
    t('memory0'),
    t('memory1'),
    t('memory2'),
    t('memory3'),
    t('memory4'),
  ];
  const title = titleProp || t('title');
  const l = labels || {
    title: title,
    memory: "Memory",
    storage: "Storage",
    retrieval: "Retrieval",
    learning: "Learning",
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {memories.map((memory, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium flex-1">{memory}</p>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

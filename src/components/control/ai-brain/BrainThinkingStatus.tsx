import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Activity, CheckCircle, Clock, Loader2 } from "lucide-react";

export interface BrainThinkingStatusProps extends HTMLAttributes<HTMLDivElement> {
  directors?: { 
    name: string; 
    status: "Thinking" | "Ready" | "Waiting" | "Analyzing" | "Learning"; 
  }[];
  labels?: {
    title: string;
    thinking: string;
    status: string;
    progress: string;
    completion: string;
  };
}

export function BrainThinkingStatus({ 
  directors: directorsProp,
  labels,
  className, 
  ...props 
}: BrainThinkingStatusProps) {
  const t = useTranslations('controlAIBrain.collaborationMap');
  const tStatus = useTranslations('controlAIBrain.thinkingStatus');
  const directors = directorsProp || [
    { 
      name: t('directors0'), 
      status: tStatus('statuses.thinking'),
    },
    { 
      name: t('directors2'), 
      status: tStatus('statuses.ready'),
    },
    { 
      name: t('directors3'), 
      status: tStatus('statuses.waiting'),
    },
    { 
      name: t('directors1'), 
      status: tStatus('statuses.analyzing'),
    },
    { 
      name: t('directors4'), 
      status: tStatus('statuses.learning'),
    },
  ];
  const l = labels || {
    title: tStatus('title'),
    thinking: tStatus('thinking'),
    status: tStatus('status'),
    progress: tStatus('progress'),
    completion: tStatus('completion'),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Thinking":
        return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      case "Ready":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "Waiting":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Analyzing":
        return <Activity className="h-4 w-4 text-primary animate-pulse" />;
      case "Learning":
        return <Loader2 className="h-4 w-4 animate-spin text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Thinking":
        return "text-primary";
      case "Ready":
        return "text-emerald-500";
      case "Waiting":
        return "text-amber-500";
      case "Analyzing":
        return "text-primary";
      case "Learning":
        return "text-purple-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        <div className="space-y-3">
          {directors.map((director, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
            >
              <span className="text-sm font-medium">{director.name}</span>
              <div className="flex items-center gap-2">
                {getStatusIcon(director.status)}
                <span className={cn("text-sm font-medium", getStatusColor(director.status))}>
                  {director.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Link, Eye, FileText, BrainCircuit, ArrowRight, Zap } from "lucide-react";
import { MagneticHover } from "@/components/shared/cards/MagneticHover";

export interface UnifiedSourceConnectorPreviewProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  status?: string;
  labels?: {
    connectorModes: string;
    openConnector: string;
  };
}

export function UnifiedSourceConnectorPreview({ 
  title: titleProp,
  description: descriptionProp,
  status: statusProp,
  labels,
  className, 
  ...props 
}: UnifiedSourceConnectorPreviewProps) {
  const t = useTranslations('controlOverview.unifiedSourceConnectorPanel');
  const title = titleProp || t('title');
  const description = descriptionProp || t('description');
  const status = statusProp || t('status');
  const modes = [
    { name: t('apiMode'), icon: Link, description: t('restGraphql') },
    { name: t('smartSourceReader'), icon: Eye, description: t('webScraping') },
    { name: t('visualSensor'), icon: Zap, description: t('imageAnalysis') },
    { name: t('textSensor'), icon: FileText, description: t('contentAnalysis') },
    { name: t('behavioralSensor'), icon: BrainCircuit, description: t('patternDetection') },
  ];

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Link className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {status}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-3">{labels?.connectorModes || t('connectorModes')}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {modes.map((mode, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <mode.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xs font-medium text-center">{mode.name}</p>
                <p className="text-xs text-muted-foreground text-center">{mode.description}</p>
              </div>
            ))}
          </div>
        </div>

        <SmartButton className="w-full group">
          <span className="flex items-center justify-center gap-2">
            {labels?.openConnector || t('openConnector')}
            <MagneticHover strength={0.2}>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </MagneticHover>
          </span>
        </SmartButton>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";

export interface ProviderPerformanceTableProps extends HTMLAttributes<HTMLDivElement> {
  providers?: { 
    name: string; 
    quality: number; 
    speed: number; 
    cost: string; 
    promptObedience: number; 
    stability: number; 
    bestUse: string;
  }[];
  labels?: {
    title: string;
    providers: string;
    provider: string;
    performance: string;
    uptime: string;
    latency: string;
    quality: string;
    speed: string;
    promptObedience: string;
    stability: string;
    bestUse: string;
  };
}

export function ProviderPerformanceTable({ 
  providers: providersProp,
  labels,
  className, 
  ...props 
}: ProviderPerformanceTableProps) {
  const t = useTranslations('controlIntegrations.providerPerformance');
  const tCommon = useTranslations('common');
  const providers = providersProp || [
    { 
      name: "Leonardo AI", 
      quality: 85, 
      speed: 78, 
      cost: t('cost.low'), 
      promptObedience: 83, 
      stability: 82, 
      bestUse: t('bestUses.bulkImageGeneration'),
    },
    { 
      name: "Ideogram", 
      quality: 88, 
      speed: 75, 
      cost: t('cost.low'), 
      promptObedience: 91, 
      stability: 85, 
      bestUse: t('bestUses.printPosters'),
    },
    { 
      name: "Kling AI", 
      quality: 82, 
      speed: 85, 
      cost: t('cost.medium'), 
      promptObedience: 90, 
      stability: 80, 
      bestUse: t('bestUses.costEffectiveVideo'),
    },
    { 
      name: "Runway", 
      quality: 92, 
      speed: 70, 
      cost: t('cost.high'), 
      promptObedience: 92, 
      stability: 88, 
      bestUse: t('bestUses.premiumVideo'),
    },
    { 
      name: "Nano Banana", 
      quality: 95, 
      speed: 72, 
      cost: t('cost.high'), 
      promptObedience: 94, 
      stability: 90, 
      bestUse: t('bestUses.premiumCreativeAssets'),
    },
    { 
      name: "Flux Self-hosted", 
      quality: 78, 
      speed: 82, 
      cost: t('cost.veryLow'), 
      promptObedience: 78, 
      stability: 75, 
      bestUse: t('bestUses.reduceHighVolumeImageCost'),
    },
  ];
  const l = labels || {
    title: t('title'),
    providers: t('providers'),
    performance: t('performance'),
    uptime: t('uptime'),
    latency: t('latency'),
    quality: t('quality'),
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <h3 className="text-lg font-semibold mb-6">{l.title}</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.provider || t('provider')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.quality || t('quality')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.speed || t('speed')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{tCommon('costLabel')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.promptObedience || t('promptObedience')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.stability || t('stability')}</th>
                <th className="text-left py-3 px-4 text-sm font-medium">{labels?.bestUse || t('bestUse')}</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((provider, index) => (
                <tr key={index} className="border-b border-border/20 hover:bg-secondary/20">
                  <td className="py-3 px-4 font-medium">{provider.name}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full"
                          style={{ width: `${provider.quality}%` }}
                        />
                      </div>
                      <span className="text-sm">{provider.quality}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full"
                          style={{ width: `${provider.speed}%` }}
                        />
                      </div>
                      <span className="text-sm">{provider.speed}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{provider.cost}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full"
                          style={{ width: `${provider.promptObedience}%` }}
                        />
                      </div>
                      <span className="text-sm">{provider.promptObedience}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 bg-secondary/50 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full"
                          style={{ width: `${provider.stability}%` }}
                        />
                      </div>
                      <span className="text-sm">{provider.stability}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm">{provider.bestUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StaticCard>
  );
}

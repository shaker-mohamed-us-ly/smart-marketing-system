import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { FileText, Hash, ArrowRight, Video, Image as ImageIcon, Users, Briefcase } from "lucide-react";

export interface CopywritingPanelProps extends HTMLAttributes<HTMLDivElement> {
  hook?: string;
  caption?: string;
  cta?: string;
  hashtags?: string;
  platformVariants?: { platform: string; icon: any; copy: string }[];
  labels?: {
    title: string;
    hook: string;
    caption: string;
    cta: string;
    hashtags: string;
    platformCopyVariants: string;
  };
}

export function CopywritingPanel({ 
  hook: hookProp,
  caption: captionProp,
  cta: ctaProp,
  hashtags: hashtagsProp,
  platformVariants: platformVariantsProp,
  labels,
  className, 
  ...props 
}: CopywritingPanelProps) {
  const t = useTranslations('clientContentStudio.copywriting');
  const hook = hookProp || t('defaultHook');
  const caption = captionProp || t('defaultCaption');
  const cta = ctaProp || t('defaultCta');
  const hashtags = hashtagsProp || t('defaultHashtags');
  const platformVariants = platformVariantsProp || [
    { 
      platform: t('platform0'), 
      icon: ImageIcon, 
      copy: t('platform0Copy'),
    },
    { 
      platform: t('platform1'), 
      icon: Video, 
      copy: t('platform1Copy'),
    },
    { 
      platform: t('platform2'), 
      icon: Users, 
      copy: t('platform2Copy'),
    },
    { 
      platform: t('platform3'), 
      icon: Briefcase, 
      copy: t('platform3Copy'),
    },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-secondary/30">
            <p className="text-sm text-muted-foreground mb-1">{labels?.hook || t('hook')}</p>
            <p className="font-medium">{hook}</p>
          </div>

          <div className="p-4 rounded-xl bg-secondary/30">
            <p className="text-sm text-muted-foreground mb-1">{labels?.caption || t('caption')}</p>
            <p className="font-medium text-sm leading-relaxed">{caption}</p>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
            <div className="flex items-start gap-3">
              <ArrowRight className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">{labels?.cta || t('cta')}</p>
                <p className="font-semibold text-primary">{cta}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-secondary/30">
            <div className="flex items-start gap-3">
              <Hash className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">{labels?.hashtags || t('hashtags')}</p>
                <p className="font-medium text-sm">{hashtags}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-3">{labels?.platformCopyVariants || t('platformCopyVariants')}</p>
          <div className="space-y-2">
            {platformVariants.map((variant, index) => {
              const Icon = variant.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{variant.platform}</p>
                    <p className="text-xs text-muted-foreground">{variant.copy}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Building2, Globe, Calendar, Target } from "lucide-react";

export interface BrandProfileCardProps extends HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  industry?: string;
  website?: string;
  founded?: string;
  mission?: string;
  defaultMission?: string;
  labels?: {
    title: string;
    brandName: string;
    website: string;
    founded: string;
    mission: string;
    defaultMission?: string;
  };
}

export function BrandProfileCard({ 
  brandName = "Nova Phones",
  industry = "Consumer Electronics",
  website = "novaphones.com",
  founded = "2022",
  mission: missionProp,
  defaultMission: defaultMissionProp,
  labels,
  className, 
  ...props 
}: BrandProfileCardProps) {
  const t = useTranslations('clientBrandDNA.brandProfile');
  const mission = missionProp || defaultMissionProp || labels?.defaultMission || "تمكين الناس بتقنية مبتكرة";
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.brandName || t('brandName')}</p>
              <p className="font-medium">{brandName}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.website || t('website')}</p>
              <p className="font-medium">{website}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.founded || t('founded')}</p>
              <p className="font-medium">{founded}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.mission || t('mission')}</p>
              <p className="font-medium">{mission}</p>
            </div>
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

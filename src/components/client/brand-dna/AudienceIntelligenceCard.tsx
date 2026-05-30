import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Users, MapPin, Heart, TrendingUp } from "lucide-react";

export interface AudienceIntelligenceCardProps extends HTMLAttributes<HTMLDivElement> {
  primaryAudience?: string;
  ageRange?: string;
  location?: string;
  interests?: string[];
  purchaseDrivers?: { label: string; value: number }[];
  labels?: {
    title: string;
    primaryAudience: string;
    ageRange: string;
    location: string;
    topInterests: string;
    purchaseDrivers: string;
  };
}

export function AudienceIntelligenceCard({ 
  primaryAudience: primaryAudienceProp,
  ageRange: ageRangeProp,
  location: locationProp,
  interests: interestsProp,
  purchaseDrivers: purchaseDriversProp,
  labels,
  className, 
  ...props 
}: AudienceIntelligenceCardProps) {
  const t = useTranslations('clientBrandDNA.audienceIntelligence');
  const primaryAudience = primaryAudienceProp || t('defaultPrimaryAudience');
  const ageRange = ageRangeProp || "18–35";
  const location = locationProp || t('defaultLocation');
  const interests = interestsProp || [
    t('defaultInterest0'),
    t('defaultInterest1'),
    t('defaultInterest2'),
    t('defaultInterest3'),
  ];
  const purchaseDrivers = purchaseDriversProp || [
    { label: t('driver0'), value: 92 },
    { label: t('driver1'), value: 88 },
    { label: t('driver2'), value: 85 },
    { label: t('driver3'), value: 72 },
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.primaryAudience || t('primaryAudience')}</p>
              <p className="font-medium">{primaryAudience}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.ageRange || t('ageRange')}</p>
              <p className="font-medium">{ageRange}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.location || t('location')}</p>
              <p className="font-medium">{location}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Heart className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.topInterests || t('topInterests')}</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest, index) => (
                  <span key={index} className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            {labels?.purchaseDrivers || t('purchaseDrivers')}
          </p>
          <div className="space-y-3">
            {purchaseDrivers.map((driver, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{driver.label}</span>
                  <span className="text-sm text-muted-foreground">{driver.value}%</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 rounded-full transition-all duration-300"
                    style={{ width: `${driver.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

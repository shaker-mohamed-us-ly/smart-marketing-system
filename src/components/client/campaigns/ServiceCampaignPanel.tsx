import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Heart, Sparkles, Users, Clock, Shield, CheckCircle } from "lucide-react";

export interface ServiceCampaignPanelProps extends HTMLAttributes<HTMLDivElement> {
  serviceName?: string;
  tagline?: string;
  defaultServiceName?: string;
  defaultTagline?: string;
  campaignAngles?: { title: string; description: string }[];
  labels?: {
    title: string;
    serviceName: string;
    businessType: string;
    contentStrategy: string;
    trustScore: string;
    autoDetected: string;
    uploadBrief: string;
    uploadDescription: string;
    generatedContent: string;
    example: string;
    marketingStrategy: string;
    problemSolution: string;
    trustBuilding: string;
    beforeAfter: string;
    emotionalComfort: string;
    campaignAngles: string;
    beforeAfterTransformation?: string;
    showDramaticImprovement?: string;
    familyComfort?: string;
    focusOnPeaceOfMind?: string;
    timeSaving?: string;
    emphasizeConvenience?: string;
    trustAndGuarantee?: string;
    buildTrust?: string;
    seasonalOffer?: string;
    limitedTimeUrgency?: string;
    emergencyBooking?: string;
    available247?: string;
    defaultServiceName?: string;
    defaultTagline?: string;
  };
}

export function ServiceCampaignPanel({
  serviceName: serviceNameProp,
  tagline: taglineProp,
  defaultServiceName: defaultServiceNameProp,
  defaultTagline: defaultTaglineProp,
  campaignAngles = [
    { title: "beforeAfterTransformation", description: "showDramaticImprovement" },
    { title: "familyComfort", description: "focusOnPeaceOfMind" },
    { title: "timeSaving", description: "emphasizeConvenience" },
    { title: "trustAndGuarantee", description: "buildTrust" },
    { title: "seasonalOffer", description: "limitedTimeUrgency" },
    { title: "emergencyBooking", description: "available247" },
  ],
  labels,
  className,
  ...props
}: ServiceCampaignPanelProps) {
  const t = useTranslations('clientCampaigns.serviceCampaign');
  const l = labels || {
    title: t('title'),
    serviceName: t('serviceName'),
    businessType: t('businessType'),
    contentStrategy: t('contentStrategy'),
    trustScore: t('trustScore'),
    autoDetected: t('autoDetected'),
    uploadBrief: t('uploadBrief'),
    uploadDescription: t('uploadDescription'),
    generatedContent: t('generatedContent'),
    example: t('example'),
    marketingStrategy: t('marketingStrategy'),
    problemSolution: t('problemSolution'),
    trustBuilding: t('trustBuilding'),
    beforeAfter: t('beforeAfter'),
    emotionalComfort: t('emotionalComfort'),
    campaignAngles: t('campaignAngles'),
    beforeAfterTransformation: t('beforeAfterTransformation'),
    showDramaticImprovement: t('showDramaticImprovement'),
    familyComfort: t('familyComfort'),
    focusOnPeaceOfMind: t('focusOnPeaceOfMind'),
    timeSaving: t('timeSaving'),
    emphasizeConvenience: t('emphasizeConvenience'),
    trustAndGuarantee: t('trustAndGuarantee'),
    buildTrust: t('buildTrust'),
    seasonalOffer: t('seasonalOffer'),
    limitedTimeUrgency: t('limitedTimeUrgency'),
    emergencyBooking: t('emergencyBooking'),
    available247: t('available247'),
    defaultServiceName: t('defaultServiceName'),
    defaultTagline: t('defaultTagline'),
  };

  const serviceName = serviceNameProp || defaultServiceNameProp || l.defaultServiceName;
  const tagline = taglineProp || defaultTaglineProp || l.defaultTagline;

  const getAngleText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        {/* Service Example */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-transparent border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-sm font-medium text-primary">{l.example}</p>
          </div>
          <p className="font-semibold mb-1">{serviceName}</p>
          <p className="text-sm text-muted-foreground italic">"{tagline}"</p>
        </div>

        {/* Service Marketing Strategy */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{l.marketingStrategy}</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: Users, label: l.problemSolution },
              { icon: Heart, label: l.trustBuilding },
              { icon: Shield, label: l.beforeAfter },
              { icon: Clock, label: l.emotionalComfort },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30">
                  <Icon className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Campaign Angles */}
        <div>
          <p className="text-sm font-medium mb-3">{l.campaignAngles}</p>
          <div className="space-y-2">
            {campaignAngles.map((angle, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-primary">{index + 1}</span>
                </div>
                <div>
                  <p className="text-sm font-medium">{getAngleText(angle.title)}</p>
                  <p className="text-xs text-muted-foreground">{getAngleText(angle.description)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

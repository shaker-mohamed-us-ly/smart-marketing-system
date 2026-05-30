import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Package, Upload, CheckCircle, AlertCircle, Image as ImageIcon, Video, Camera } from "lucide-react";

export interface ProductCampaignPanelProps extends HTMLAttributes<HTMLDivElement> {
  productName?: string;
  detectedCategory?: string;
  imageStatus?: string;
  defaultImageStatus?: string;
  readiness?: number;
  assetDirections?: string[];
  labels?: {
    title: string;
    productName: string;
    readiness: string;
    detectedCategory: string;
    autoDetected: string;
    imageStatus: string;
    required: string;
    uploadImage: string;
    uploadDescription: string;
    generatedDirections: string;
    premiumStudioShot?: string;
    backAngleView?: string;
    fortyFiveDegreeAngleShot?: string;
    productOnExecutiveDesk?: string;
    personUsingPhone?: string;
    personListeningToMusic?: string;
    cameraFocusedLifestyleShot?: string;
    tenSecondProductVideo?: string;
    defaultImageStatus?: string;
  };
}

export function ProductCampaignPanel({ 
  productName = "iPhone 16 Pro",
  detectedCategory: detectedCategoryProp,
  imageStatus: imageStatusProp,
  defaultImageStatus: defaultImageStatusProp,
  readiness = 78,
  assetDirections = [
    "premiumStudioShot",
    "backAngleView",
    "fortyFiveDegreeAngleShot",
    "productOnExecutiveDesk",
    "personUsingPhone",
    "personListeningToMusic",
    "cameraFocusedLifestyleShot",
    "tenSecondProductVideo",
  ],
  labels,
  className, 
  ...props 
}: ProductCampaignPanelProps) {
  const t = useTranslations('clientCampaigns.productPanel');
  const detectedCategory = detectedCategoryProp || t('defaultDetectedCategory');
  const imageStatus = imageStatusProp || defaultImageStatusProp || labels?.defaultImageStatus || t('defaultImageStatus') || "تم الرفع";
  const l = labels || {
    title: t('title'),
    productName: t('productName'),
    readiness: t('readiness'),
    detectedCategory: t('detectedCategory'),
    autoDetected: t('autoDetected'),
    imageStatus: t('imageStatus'),
    required: t('required'),
    uploadImage: t('uploadImage'),
    uploadDescription: t('uploadDescription'),
    generatedDirections: t('generatedDirections'),
    premiumStudioShot: t('premiumStudioShot'),
    backAngleView: t('backAngleView'),
    fortyFiveDegreeAngleShot: t('fortyFiveDegreeAngleShot'),
    productOnExecutiveDesk: t('productOnExecutiveDesk'),
    personUsingPhone: t('personUsingPhone'),
    personListeningToMusic: t('personListeningToMusic'),
    cameraFocusedLifestyleShot: t('cameraFocusedLifestyleShot'),
    tenSecondProductVideo: t('tenSecondProductVideo'),
  };

  const getDirectionText = (key: string): string => {
    return l[key as keyof typeof l] || key;
  };

  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{l.title}</h3>
        </div>

        {/* Product Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.productName}</p>
              <p className="font-semibold">{productName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">{l.readiness}</p>
              <p className="font-semibold text-primary">{readiness}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.detectedCategory}</p>
              <p className="font-medium">{detectedCategory}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-emerald-600">{l.autoDetected}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{l.imageStatus}</p>
              <p className="font-medium">{imageStatus}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-emerald-600">{l.required}</span>
            </div>
          </div>
        </div>

        {/* Product Image Upload Area - Required */}
        <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-border/60 bg-secondary/20 hover:bg-secondary/30 transition-colors">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">{l.uploadImage}</p>
              <p className="text-xs text-muted-foreground">
                {l.uploadDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Generated Asset Directions */}
        <div>
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            {l.generatedDirections}
          </p>
          <div className="space-y-2">
            {assetDirections.map((direction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {direction.includes("video") ? (
                    <Video className="h-4 w-4 text-primary" />
                  ) : (
                    <ImageIcon className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="text-sm font-medium">{getDirectionText(direction)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

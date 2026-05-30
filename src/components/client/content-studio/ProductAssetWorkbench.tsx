import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { Package, Upload, CheckCircle, Camera, Video } from "lucide-react";

export interface ProductAssetWorkbenchProps extends HTMLAttributes<HTMLDivElement> {
  productName?: string;
  detectedCategory?: string;
  imageStatus?: string;
  defaultImageStatus?: string;
  readiness?: number;
  visualDirections?: string[];
  labels?: {
    title: string;
    product: string;
    readiness: string;
    detectedCategory: string;
    autoDetected: string;
    imageStatus: string;
    required: string;
    uploadProductImage: string;
    uploadDescription: string;
    generatedVisualDirections: string;
    defaultImageStatus?: string;
  };
}

export function ProductAssetWorkbench({ 
  productName: productNameProp,
  detectedCategory: detectedCategoryProp,
  imageStatus: imageStatusProp,
  defaultImageStatus: defaultImageStatusProp,
  readiness: readinessProp,
  visualDirections: visualDirectionsProp,
  labels,
  className, 
  ...props 
}: ProductAssetWorkbenchProps) {
  const t = useTranslations('clientContentStudio.productAsset');
  const productName = productNameProp || "iPhone 16 Pro";
  const detectedCategory = detectedCategoryProp || t('defaultDetectedCategory');
  const imageStatus = imageStatusProp || defaultImageStatusProp || labels?.defaultImageStatus || t('defaultImageStatus') || "تم الرفع";
  const readiness = readinessProp || 78;
  const visualDirections = visualDirectionsProp || [
    t('direction0'),
    t('direction1'),
    t('direction2'),
    t('direction3'),
    t('direction4'),
    t('direction5'),
    t('direction6'),
  ];
  return (
    <StaticCard depth="subtle" className={cn("p-6", className)} {...props}>
      <MotionLayer hoverLift lightSweep />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold">{labels?.title || t('title')}</h3>
        </div>

        {/* Product Information */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.product || t('product')}</p>
              <p className="font-semibold">{productName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">{labels?.readiness || t('readiness')}</p>
              <p className="font-semibold text-primary">{readiness}%</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.detectedCategory || t('detectedCategory')}</p>
              <p className="font-medium">{detectedCategory}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-emerald-600">{labels?.autoDetected || t('autoDetected')}</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
            <div>
              <p className="text-sm text-muted-foreground mb-1">{labels?.imageStatus || t('imageStatus')}</p>
              <p className="font-medium">{imageStatus}</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-500" />
              <span className="text-sm text-emerald-600">{labels?.required || t('required')} ✓</span>
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
              <p className="text-sm font-medium mb-1">{labels?.uploadProductImage || t('uploadProductImage')}</p>
              <p className="text-xs text-muted-foreground">
                {labels?.uploadDescription || t('uploadDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Generated Visual Directions */}
        <div>
          <p className="text-sm font-medium mb-3 flex items-center gap-2">
            <Camera className="h-4 w-4 text-primary" />
            {labels?.generatedVisualDirections || t('generatedVisualDirections')}
          </p>
          <div className="space-y-2">
            {visualDirections.map((direction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {direction.includes("video") ? (
                    <Video className="h-4 w-4 text-primary" />
                  ) : (
                    <Camera className="h-4 w-4 text-primary" />
                  )}
                </div>
                <span className="text-sm font-medium">{direction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </StaticCard>
  );
}

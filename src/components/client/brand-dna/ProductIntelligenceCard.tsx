import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";
import { useTranslations } from "next-intl";
import { StaticCard } from "@/components/shared/cards/StaticCard";
import { MotionLayer } from "@/components/shared/cards/MotionLayer";
import { SmartButton } from "@/components/shared/SmartButton";
import { Package, Upload, Image as ImageIcon, ArrowRight } from "lucide-react";

export interface ProductIntelligenceCardProps extends HTMLAttributes<HTMLDivElement> {
  products?: { name: string; image?: string }[];
  labels?: {
    title: string;
    uploadProductImages: string;
    uploadDescription: string;
    chooseImages: string;
    currentProductImages: string;
    keyProducts: string;
    viewAllProducts: string;
  };
}

export function ProductIntelligenceCard({ 
  products = [
    { name: "Nova Pro Max" },
    { name: "Nova Lite" },
    { name: "Nova Buds" },
  ],
  labels,
  className, 
  ...props 
}: ProductIntelligenceCardProps) {
  const t = useTranslations('clientBrandDNA.productIntelligence');
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

        {/* Product Image Upload Area - Required for Product-Based Brands */}
        <div className="mb-6 p-4 rounded-xl border-2 border-dashed border-border/60 bg-secondary/20 hover:bg-secondary/30 transition-colors">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium mb-1">{labels?.uploadProductImages || t('uploadProductImages')}</p>
              <p className="text-xs text-muted-foreground">
                {labels?.uploadDescription || t('uploadDescription')}
              </p>
            </div>
            <SmartButton variant="outline" size="sm" className="gap-2">
              <ImageIcon className="h-4 w-4" />
              {labels?.chooseImages || t('chooseImages')}
            </SmartButton>
          </div>
        </div>

        {/* Current Product Images */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">{labels?.currentProductImages || t('currentProductImages')}</p>
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-border/40 flex items-center justify-center"
              >
                <ImageIcon className="h-6 w-6 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        {/* Key Products */}
        <div>
          <p className="text-sm font-medium mb-3">{labels?.keyProducts || t('keyProducts')}</p>
          <div className="space-y-2">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{product.name}</span>
              </div>
            ))}
          </div>
        </div>

        <SmartButton variant="outline" className="w-full mt-4 gap-2">
          {labels?.viewAllProducts || t('viewAllProducts')}
          <ArrowRight className="h-4 w-4" />
        </SmartButton>
      </div>
    </StaticCard>
  );
}

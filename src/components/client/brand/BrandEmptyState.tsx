import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Plus } from 'lucide-react';

interface BrandEmptyStateProps {
  onCreateBrand: () => void;
}

export function BrandEmptyState({ onCreateBrand }: BrandEmptyStateProps) {
  const t = useTranslations('clientBrand.v1.ui.emptyState');

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-muted/50 flex items-center justify-center">
          <Plus className="h-10 w-10 text-muted-foreground" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-3">{t('title')}</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6">{t('description')}</p>

        {/* CTA Button */}
        <Button onClick={onCreateBrand} size="lg">
          <Plus className="h-4 w-4 mr-2" />
          {t('cta')}
        </Button>

        {/* Hint */}
        <p className="text-sm text-muted-foreground mt-4">{t('hint')}</p>
      </div>
    </div>
  );
}

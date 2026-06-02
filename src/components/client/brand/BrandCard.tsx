import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Building2, MoreHorizontal } from 'lucide-react';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    industry: string;
    description: string;
    logo_url: string | null;
    status: string;
    onboarding_status: string;
    created_at: string;
  };
}

export function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('clientBrand.v1.ui.card');

  return (
    <div className="group relative rounded-xl border border-border/60 bg-card/80 p-6 hover:border-border hover:shadow-lg transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        {/* Logo or Placeholder */}
        {brand.logo_url ? (
          <img
            src={brand.logo_url}
            alt={brand.name}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 rounded-lg bg-muted/50 flex items-center justify-center">
            <Building2 className="h-6 w-6 text-muted-foreground" />
          </div>
        )}

        {/* Actions */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={t('moreOptions')}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg">{brand.name}</h3>
        <p className="text-sm text-muted-foreground">{brand.industry}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{brand.description}</p>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          {new Date(brand.created_at).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            {t('edit')}
          </Button>
          <Button variant="outline" size="sm">
            {t('manageChannels')}
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Plus } from 'lucide-react';
import { BrandEmptyState } from '@/components/client/brand/BrandEmptyState';
import { BrandCard } from '@/components/client/brand/BrandCard';
import { BrandCreateDialog } from '@/components/client/brand/BrandCreateDialog';
import { useState, useEffect } from 'react';
import { getBrands } from '@/lib/brand/server-actions';
import type { Brand } from '@/lib/brand/types';

export default function BrandPage() {
  const t = useTranslations('clientBrand.v1.ui');
  const tList = useTranslations('clientBrand.v1.ui.list');
  const tErrors = useTranslations('clientBrand.v1.ui.errors');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBrands = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getBrands();
      if (result.success && result.data) {
        setBrands(result.data);
      } else {
        // Map error code to i18n key, fallback to generic localized message
        const code = result.error?.code;
        let message: string;
        try {
          message = code ? tErrors(code) : tErrors('BRAND_LOAD_FAILED');
        } catch {
          message = tErrors('BRAND_LOAD_FAILED');
        }
        setError(message);
      }
    } catch (err) {
      setError(tErrors('BRAND_LOAD_FAILED'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleBrandCreated = () => {
    fetchBrands();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t('title')}</h1>
            <p className="text-muted-foreground mt-2">{t('subtitle')}</p>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t('createBrand')}
          </Button>
        </div>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-muted-foreground">{tList('loading')}</div>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <div className="text-destructive">{error}</div>
          <Button onClick={fetchBrands} variant="outline">
            {tList('retry')}
          </Button>
        </div>
      ) : brands.length === 0 ? (
        <BrandEmptyState onCreateBrand={() => setIsCreateDialogOpen(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      )}

      {/* Create Brand Dialog */}
      <BrandCreateDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onBrandCreated={handleBrandCreated}
      />
    </div>
  );
}

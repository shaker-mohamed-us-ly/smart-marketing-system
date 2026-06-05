'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Plus } from 'lucide-react';
import { BrandEmptyState } from '@/components/client/brand/BrandEmptyState';
import { BrandCard } from '@/components/client/brand/BrandCard';
import { BrandCreateDialog } from '@/components/client/brand/BrandCreateDialog';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/brand/server-actions';
import type { Brand } from '@/lib/brand/types';

export default function BrandPage() {
  const t = useTranslations('clientBrand.v1.ui');
  const tList = useTranslations('clientBrand.v1.ui.list');
  const tErrors = useTranslations('clientBrand.v1.ui.errors');
  const tAuth = useTranslations('auth.authBlocker');
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
    <div className="max-w-6xl mx-auto px-6 py-10" style={{ background: 'var(--sms-v8-canvas)' }}>
      {/* Premium Hero Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[32px] font-bold tracking-tight" style={{ color: 'var(--sms-v8-text)' }}>
                  {t('title')}
                </h1>
                {!isLoading && brands.length > 0 && (
                  <span data-tone="violet" className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-[var(--tone-bg)] text-[var(--tone-text)] border border-[var(--tone-border)]">
                    {brands.length}
                  </span>
                )}
              </div>
              <p className="text-base" style={{ color: 'var(--sms-v8-text-2)' }}>
                {t('subtitle')}
              </p>
            </div>
          </div>
          <Button onClick={() => setIsCreateDialogOpen(true)} tone="violet" icon={<Plus className="h-4 w-4" />} iconPosition="start">
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
          <div className="flex items-center gap-3">
            <Button onClick={fetchBrands} variant="outline">
              {tList('retry')}
            </Button>
            <Link
              href="/login?returnTo=/client/brand"
              className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 h-10 px-4 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg"
            >
              {tAuth('cta')}
            </Link>
          </div>
        </div>
      ) : brands.length === 0 ? (
        <BrandEmptyState onCreateBrand={() => setIsCreateDialogOpen(true)} />
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-px flex-1" style={{ background: 'var(--sms-v8-border)' }} />
            <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--sms-v8-text-3)' }}>
              {tList('brandCount', { count: brands.length })}
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--sms-v8-border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {brands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </div>
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

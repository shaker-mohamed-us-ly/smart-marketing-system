'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { BrandEmptyState } from '@/components/client/brand/BrandEmptyState';
import { BrandCard } from '@/components/client/brand/BrandCard';
import { BrandCreateDialog } from '@/components/client/brand/BrandCreateDialog';
import { BrandCommandCenterHeader } from '@/components/client/brand/BrandCommandCenterHeader';
import { BrandDnaJourneyTree } from '@/components/client/brand/BrandDnaJourneyTree';
import { BrandPlanLimitGate } from '@/components/client/brand/BrandPlanLimitGate';
import { BrandNextBestActionPanel } from '@/components/client/brand/BrandNextBestActionPanel';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBrands } from '@/lib/brand/server-actions';
import type { Brand } from '@/lib/brand/types';

export default function BrandPage() {
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

  // Plan limit — UI-ready only. Backend required for functional enforcement.
  const MAX_BRANDS = 1;
  const atLimit = brands.length >= MAX_BRANDS;

  return (
    <div
      className="max-w-6xl mx-auto px-6 py-10"
      style={{
        background: 'var(--sms-v8-canvas)',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(120, 113, 108, 0.04) 0%, transparent 60%)',
      }}
    >
      {/* Brand Command Center Header */}
      <BrandCommandCenterHeader
        brandCount={brands.length}
        onCreateBrand={() => setIsCreateDialogOpen(true)}
        maxBrands={MAX_BRANDS}
      />

      {/* Hero Operational Panel — dominant guidance surface, not a card */}
      <BrandNextBestActionPanel
        brands={brands}
        onCreateBrand={() => setIsCreateDialogOpen(true)}
      />

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
        <div className="space-y-5">
          {/* Brand DNA Journey Tree — primary guidance */}
          <BrandDnaJourneyTree onCreateBrand={() => setIsCreateDialogOpen(true)} />

          {/* Plan Limit Gate — contextually placed after journey */}
          {atLimit && (
            <BrandPlanLimitGate
              brandCount={brands.length}
              maxBrands={MAX_BRANDS}
            />
          )}

          <div className="flex items-center gap-3 px-1">
            <div className="h-px flex-1" style={{ background: 'var(--sms-v8-border)' }} />
            <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--sms-v8-text-3)' }}>
              {tList('brandCount', { count: brands.length })}
            </span>
            <div className="h-px flex-1" style={{ background: 'var(--sms-v8-border)' }} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brands.map((brand, index) => (
              <div
                key={brand.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
              >
                <BrandCard brand={brand} />
              </div>
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

'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Plus } from 'lucide-react';

interface BrandCommandCenterHeaderProps {
  brandCount: number;
  onCreateBrand: () => void;
  maxBrands?: number;
}

export function BrandCommandCenterHeader({ brandCount, onCreateBrand, maxBrands }: BrandCommandCenterHeaderProps) {
  const t = useTranslations('clientBrand.v1.ui.operatingSystem');
  const atLimit = maxBrands !== undefined && brandCount >= maxBrands;

  return (
    <div className="mb-6">
      {/* Header row */}
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h1
              className="text-[28px] font-bold"
              style={{ color: 'var(--sms-v8-text)' }}
            >
              {t('title')}
            </h1>
            {brandCount > 0 && (
              <span
                data-tone="violet"
                className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--tone-bg)] text-[var(--tone-text)] border border-[var(--tone-border)]"
              >
                {brandCount}
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('subtitle')}
          </p>
        </div>
        <Button
          onClick={onCreateBrand}
          tone="violet"
          icon={<Plus className="h-4 w-4" />}
          iconPosition="start"
          disabled={atLimit}
        >
          {t('createBrand')}
        </Button>
      </div>
    </div>
  );
}

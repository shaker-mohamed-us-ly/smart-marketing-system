'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Crown, ArrowLeft } from 'lucide-react';

interface BrandPlanLimitGateProps {
  brandCount: number;
  maxBrands: number;
  onUpgrade?: () => void;
}

export function BrandPlanLimitGate({ brandCount, maxBrands, onUpgrade }: BrandPlanLimitGateProps) {
  const t = useTranslations('clientBrand.v1.ui.planLimit');

  return (
    <Card variant="subtle" padding="md" className="mb-4">
      <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4">
        <IconFrame size="md" tone="amber" decorative>
          <Crown className="h-5 w-5" />
        </IconFrame>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
            {t('title', { count: brandCount, max: maxBrands })}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('description')}
          </p>
        </div>
        {onUpgrade ? (
          <button
            type="button"
            onClick={onUpgrade}
            className="shrink-0 flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg border transition-colors hover:opacity-90"
            style={{
              background: 'var(--tone-bg)',
              color: 'var(--tone-solid)',
              borderColor: 'var(--tone-border)',
            }}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t('upgradeCta')}
          </button>
        ) : (
          <span
            className="shrink-0 text-xs font-medium px-2.5 py-1.5 rounded-lg border"
            style={{
              background: 'var(--sms-v8-surface-2)',
              color: 'var(--sms-v8-text-3)',
              borderColor: 'var(--sms-v8-border)',
            }}
          >
            {t('upgradeSoon')}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

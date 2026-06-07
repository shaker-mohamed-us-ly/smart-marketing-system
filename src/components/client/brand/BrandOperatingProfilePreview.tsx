'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import type { BrandOperatingProfile } from '@/lib/brand/types';
import { Target, Check } from 'lucide-react';

interface BrandOperatingProfilePreviewProps {
  profile?: BrandOperatingProfile | null;
}

export function BrandOperatingProfilePreview({ profile }: BrandOperatingProfilePreviewProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.operatingProfile');

  if (!profile?.businessModel) {
    return null;
  }

  const items = [
    { key: 'businessModel', value: profile.businessModel },
    { key: 'salesMotion', value: profile.salesMotion },
    { key: 'growthIntent', value: profile.growthIntent },
    { key: 'identityMaturity', value: profile.identityMaturity },
  ];

  return (
    <Card variant="bordered" padding="md">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <IconFrame size="sm" tone="violet" decorative>
            <Target className="h-4 w-4" />
          </IconFrame>
          <CardTitle className="text-sm">{t('previewTitle')}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {items.map((item) => {
            if (!item.value) return null;
            return (
              <div
                key={item.key}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ background: 'var(--sms-v8-surface)', border: '1px solid var(--sms-v8-border)' }}
              >
                <Check className="h-3.5 w-3.5 shrink-0" style={{ color: '#059669' }} />
                <div className="min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {t(`fields.${item.key}`)}
                  </p>
                  <p className="text-xs font-medium truncate" style={{ color: 'var(--sms-v8-text)' }}>
                    {t(`choices.${item.value.replace(/_([a-z])/g, (_, l) => l.toUpperCase())}.label`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Crown, TrendingUp, Zap } from 'lucide-react';

export function BrandIdentityPathCards() {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.paths');

  const paths = [
    { key: 'premium', icon: <Crown className="h-5 w-5" />, tone: 'amber' as const },
    { key: 'growth', icon: <TrendingUp className="h-5 w-5" />, tone: 'emerald' as const },
    { key: 'viral', icon: <Zap className="h-5 w-5" />, tone: 'sky' as const },
  ];

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <h2 className="text-base font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
          {t('sectionTitle')}
        </h2>
        <span
          className="text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{
            background: 'var(--sms-v8-surface-2)',
            color: 'var(--sms-v8-text-3)',
            border: '1px solid var(--sms-v8-border)',
          }}
        >
          {t('previewBadge')}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paths.map((path) => (
          <Card key={path.key} variant="bordered" padding="md" tone={path.tone}>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <IconFrame size="md" tone={path.tone} decorative>
                  {path.icon}
                </IconFrame>
                <div className="min-w-0">
                  <CardTitle className="text-sm">{t(`${path.key}.title`)}</CardTitle>
                  <CardDescription>{t(`${path.key}.subtitle`)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
                {t(`${path.key}.bestFor`)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import type { Brand } from '@/lib/brand/types';
import { FolderOpen, Image, Palette, FileText, Sparkles } from 'lucide-react';

interface BrandAssetsTabProps {
  brand: Brand;
}

export function BrandAssetsTab({ brand }: BrandAssetsTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.assetsTab');

  const assetTypes = [
    { key: 'logo', icon: <Image className="h-4 w-4" />, hasValue: !!brand.logo_url },
    { key: 'palette', icon: <Palette className="h-4 w-4" />, hasValue: false },
    { key: 'fonts', icon: <FileText className="h-4 w-4" />, hasValue: false },
    { key: 'templates', icon: <Sparkles className="h-4 w-4" />, hasValue: false },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card variant="elevated" padding="lg" tone="sky">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="sky" decorative>
              <FolderOpen className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-base">{t('title')}</CardTitle>
              <CardDescription className="text-sm">{t('subtitle', { brandName: brand.name })}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('description')}
          </p>
        </CardContent>
      </Card>

      {/* Current assets preview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {assetTypes.map((asset) => (
          <Card
            key={asset.key}
            variant={asset.hasValue ? 'bordered' : 'subtle'}
            padding="md"
            className={asset.hasValue ? '' : 'opacity-50'}
          >
            <CardContent className="flex items-center gap-3 py-4">
              <IconFrame size="sm" tone={asset.hasValue ? 'emerald' : 'slate'} decorative>
                {asset.icon}
              </IconFrame>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
                  {t(`assets.${asset.key}`)}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {asset.hasValue ? t('present') : t('comingLater')}
                </p>
              </div>
              {asset.hasValue && (
                <span
                  className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
                  style={{
                    background: 'var(--tone-bg)',
                    color: 'var(--tone-text)',
                  }}
                >
                  {t('uploaded')}
                </span>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Honest notice */}
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <FolderOpen className="h-4 w-4" />
          </IconFrame>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
              {t('noticeTitle')}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('noticeDescription')}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

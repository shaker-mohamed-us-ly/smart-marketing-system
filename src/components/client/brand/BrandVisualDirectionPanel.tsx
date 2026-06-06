'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Palette, Type, Image as ImageIcon, Megaphone, AlertTriangle } from 'lucide-react';

export function BrandVisualDirectionPanel() {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.visual');

  const palettes = [
    { key: 'primary', color: '#4f46e5', label: t('palette.primary') },
    { key: 'accent', color: '#f59e0b', label: t('palette.accent') },
    { key: 'neutral', color: '#64748b', label: t('palette.neutral') },
    { key: 'surface', color: '#f8fafc', label: t('palette.surface') },
  ];

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="orange" decorative>
            <Palette className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-sm">{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Palette chips */}
        <div className="space-y-3">
          <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('paletteLabel')}
          </p>
          <div className="flex flex-wrap gap-3">
            {palettes.map((palette) => (
              <div key={palette.key} className="flex items-center gap-2.5">
                <div
                  className="h-7 w-7 rounded-full border-2"
                  style={{
                    background: palette.color,
                    borderColor: 'var(--sms-v8-border)',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                />
                <span className="text-sm font-medium" style={{ color: 'var(--sms-v8-text-2)' }}>
                  {palette.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Typography direction */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Type className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('typographyLabel')}
            </p>
          </div>
          <p className="text-sm leading-relaxed pl-1" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('typographyValue')}
          </p>
        </div>

        {/* Image style */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('imageStyleLabel')}
            </p>
          </div>
          <p className="text-sm leading-relaxed pl-1" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('imageStyleValue')}
          </p>
        </div>

        {/* Campaign visual notes */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('campaignVisualLabel')}
            </p>
          </div>
          <p className="text-sm leading-relaxed pl-1" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('campaignVisualValue')}
          </p>
        </div>

        {/* Preview notice */}
        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-medium"
          style={{
            background: 'var(--sms-v8-surface-2)',
            color: 'var(--sms-v8-text-3)',
            border: '1px solid var(--sms-v8-border)',
          }}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: 'var(--tone-solid)' }} />
          <span>{t('previewNotice')}</span>
        </div>
      </CardContent>
    </Card>
  );
}

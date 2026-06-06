'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { MessageSquare, Check, X, ThumbsUp, AlertTriangle } from 'lucide-react';

export function BrandVoicePanel() {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.voice');

  const tones = [
    { key: 'formal', label: t('tones.formal') },
    { key: 'friendly', label: t('tones.friendly') },
    { key: 'direct', label: t('tones.direct') },
    { key: 'luxury', label: t('tones.luxury') },
  ];

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="violet" decorative>
            <MessageSquare className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-sm">{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Tone chips */}
        <div className="space-y-3">
          <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('toneProfileLabel')}
          </p>
          <div className="flex flex-wrap gap-2">
            {tones.map((tone) => (
              <span
                key={tone.key}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--tone-bg)',
                  color: 'var(--tone-text)',
                  border: '1px solid var(--tone-border)',
                }}
              >
                {tone.label}
              </span>
            ))}
          </div>
        </div>

        {/* Do examples */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-success-light, #10b981)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-success, #059669)' }}>
              {t('doLabel')}
            </p>
          </div>
          <div className="space-y-2 pl-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-2.5">
                <Check className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-success-light, #10b981)' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
                  {t(`doExample${i}`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Don't examples */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-danger-light, #ef4444)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-danger, #dc2626)' }}>
              {t('dontLabel')}
            </p>
          </div>
          <div className="space-y-2 pl-1">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-start gap-2.5">
                <X className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-danger-light, #ef4444)' }} />
                <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {t(`dontExample${i}`)}
                </p>
              </div>
            ))}
          </div>
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

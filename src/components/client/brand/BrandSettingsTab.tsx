'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type { Brand } from '@/lib/brand/types';
import { Settings, Building2, FileText, Globe, Tag, Trash2 } from 'lucide-react';

interface BrandSettingsTabProps {
  brand: Brand;
}

export function BrandSettingsTab({ brand }: BrandSettingsTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.settingsTab');

  const infoItems = [
    { icon: <Building2 className="h-4 w-4" />, label: t('fields.name'), value: brand.name },
    { icon: <Tag className="h-4 w-4" />, label: t('fields.industry'), value: brand.industry },
    { icon: <FileText className="h-4 w-4" />, label: t('fields.description'), value: brand.description || t('noDescription') },
    { icon: <Globe className="h-4 w-4" />, label: t('fields.website'), value: brand.website || t('noWebsite') },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card variant="elevated" padding="lg" tone="slate">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="slate" decorative>
              <Settings className="h-5 w-5" />
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

      {/* Brand info preview (read-only) */}
      <Card variant="bordered" padding="md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">{t('infoTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {infoItems.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <IconFrame size="sm" tone="slate" decorative className="mt-0.5">
                {item.icon}
              </IconFrame>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {item.label}
                </p>
                <p className="text-sm font-medium truncate" style={{ color: 'var(--sms-v8-text)' }}>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Edit notice */}
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <Settings className="h-4 w-4" />
          </IconFrame>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
              {t('editNoticeTitle')}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('editNoticeDescription')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone preview */}
      <Card
        variant="subtle"
        padding="md"
        className="border"
        style={{ borderColor: 'var(--sms-v8-border)' }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="sm" tone="amber" decorative>
              <Trash2 className="h-4 w-4" />
            </IconFrame>
            <CardTitle className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
              {t('dangerZoneTitle')}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('dangerZoneDescription')}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled
            fullWidth
            icon={<Trash2 className="h-4 w-4" />}
            iconPosition="start"
          >
            {t('deleteDisabled')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { BrandLogoUploadField } from './BrandLogoUploadField';
import type { Brand } from '@/lib/brand/types';
import {
  FolderOpen,
  Image,
  Palette,
  FileText,
  Sparkles,
  CheckCircle2,
  Circle,
  Layers,
  AlertTriangle,
} from 'lucide-react';

interface BrandAssetsTabProps {
  brand: Brand;
  onBrandUpdated?: () => void;
}

export function BrandAssetsTab({ brand, onBrandUpdated }: BrandAssetsTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.assetsTab');

  const hasLogo = !!brand.logo_url;

  const assetStatuses: {
    key: string;
    icon: React.ReactNode;
    label: string;
    status: 'ready' | 'missing' | 'comingLater';
    statusLabel: string;
  }[] = [
    {
      key: 'logo',
      icon: <Image className="h-4 w-4" />,
      label: t('assets.logo'),
      status: hasLogo ? 'ready' : 'missing',
      statusLabel: hasLogo ? t('statusReady') : t('statusMissing'),
    },
    {
      key: 'palette',
      icon: <Palette className="h-4 w-4" />,
      label: t('assets.palette'),
      status: 'comingLater',
      statusLabel: t('statusComingLater'),
    },
    {
      key: 'fonts',
      icon: <FileText className="h-4 w-4" />,
      label: t('assets.fonts'),
      status: 'comingLater',
      statusLabel: t('statusComingLater'),
    },
    {
      key: 'templates',
      icon: <Sparkles className="h-4 w-4" />,
      label: t('assets.templates'),
      status: 'comingLater',
      statusLabel: t('statusComingLater'),
    },
  ];

  const statusTone = (status: string) => {
    switch (status) {
      case 'ready': return 'emerald';
      case 'missing': return 'amber';
      case 'comingLater': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card variant="elevated" padding="lg" tone="violet">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="violet" decorative>
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

      {/* Logo Management */}
      <BrandLogoUploadField brand={brand} onBrandUpdated={onBrandUpdated} />

      {/* Asset Status Grid */}
      <Card variant="bordered" padding="lg">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="slate" decorative>
              <Layers className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-sm font-semibold">{t('statusGridTitle')}</CardTitle>
              <CardDescription className="text-sm">{t('statusGridDescription')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {assetStatuses.map((asset) => (
              <div
                key={asset.key}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  background: asset.status === 'comingLater' ? 'var(--sms-v8-surface-2)' : 'var(--sms-v8-surface)',
                  border: '1px solid var(--sms-v8-border)',
                  opacity: asset.status === 'comingLater' ? 0.7 : 1,
                }}
              >
                <IconFrame size="sm" tone={statusTone(asset.status)} decorative>
                  {asset.status === 'ready'
                    ? <CheckCircle2 className="h-4 w-4" />
                    : asset.status === 'missing'
                      ? <AlertTriangle className="h-4 w-4" />
                      : <Circle className="h-4 w-4" />}
                </IconFrame>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
                    {asset.label}
                  </p>
                </div>
                <span
                  className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
                  style={{
                    background: asset.status === 'ready' ? 'rgba(16,185,129,0.12)' : asset.status === 'missing' ? 'rgba(245,158,11,0.12)' : 'var(--sms-v8-surface-2)',
                    color: asset.status === 'ready' ? '#059669' : asset.status === 'missing' ? '#d97706' : 'var(--sms-v8-text-3)',
                  }}
                >
                  {asset.statusLabel}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Honest notice for upcoming features */}
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <Layers className="h-4 w-4" />
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

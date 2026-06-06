'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import type { Brand } from '@/lib/brand/types';
import { Link2, Globe, MessageCircle, Video, Share2, Users } from 'lucide-react';

interface BrandChannelsTabProps {
  brand: Brand;
}

const platformIcons: Record<string, React.ReactNode> = {
  facebook: <Users className="h-4 w-4" />,
  instagram: <Share2 className="h-4 w-4" />,
  tiktok: <Video className="h-4 w-4" />,
  x: <Globe className="h-4 w-4" />,
  whatsapp: <MessageCircle className="h-4 w-4" />,
};

const platformOrder = ['facebook', 'instagram', 'tiktok', 'x', 'whatsapp'];

export function BrandChannelsTab({ brand }: BrandChannelsTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.channelsTab');

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card variant="elevated" padding="lg" tone="emerald">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="emerald" decorative>
              <Link2 className="h-5 w-5" />
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

      {/* Platform grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {platformOrder.map((platform) => (
          <Card
            key={platform}
            variant="subtle"
            padding="md"
            className="opacity-60 hover:opacity-80 transition-opacity"
          >
            <CardContent className="flex items-center gap-3 py-4">
              <IconFrame size="sm" tone="slate" decorative>
                {platformIcons[platform] || <Globe className="h-4 w-4" />}
              </IconFrame>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
                  {t(`platforms.${platform}`)}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {t('platformStatus')}
                </p>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-1 rounded-full shrink-0"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  color: 'var(--sms-v8-text-3)',
                }}
              >
                {t('comingSoonBadge')}
              </span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Honest notice */}
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <Link2 className="h-4 w-4" />
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

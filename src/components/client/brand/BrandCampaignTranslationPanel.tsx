'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import {
  Megaphone, ShoppingBag, Briefcase, Video, Smartphone, Store, AlertTriangle
} from 'lucide-react';

const allCampaigns = [
  { key: 'productPost', icon: <ShoppingBag className="h-4 w-4" />, tone: 'violet' as const },
  { key: 'serviceAd', icon: <Briefcase className="h-4 w-4" />, tone: 'sky' as const },
  { key: 'shortVideo', icon: <Video className="h-4 w-4" />, tone: 'orange' as const },
  { key: 'whatsappCampaign', icon: <Smartphone className="h-4 w-4" />, tone: 'emerald' as const },
  { key: 'storeDescription', icon: <Store className="h-4 w-4" />, tone: 'amber' as const },
];

const compactCampaigns = allCampaigns.slice(0, 3);

const pathExamples = {
  premium: {
    traits: ['calmImages', 'confidentTone', 'luxuryCta', 'avoidLoudOffers'],
  },
  growth: {
    traits: ['proof', 'urgency', 'offerAngle', 'directCta'],
  },
  viral: {
    traits: ['fastHook', 'shortCaptions', 'trendFormat', 'visualPunch'],
  },
};

interface BrandCampaignTranslationPanelProps {
  compact?: boolean;
}

export function BrandCampaignTranslationPanel({ compact }: BrandCampaignTranslationPanelProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.campaignTranslation');

  const campaignList = compact ? compactCampaigns : allCampaigns;
  const recipeFields = compact
    ? ['hook', 'cta', 'visualCue']
    : ['hook', 'offer', 'proof', 'cta', 'visualCue'];

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="emerald" decorative>
            <Megaphone className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-sm">{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {!compact && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('description')}
          </p>
        )}

        {/* Identity Path Traits — compact = single row of tags, full = cards */}
        {compact ? (
          <div className="flex flex-wrap gap-2">
            {(['premium', 'growth', 'viral'] as const).map((pathKey) => (
              <span
                key={pathKey}
                className="text-xs font-semibold px-2.5 py-1 rounded-full border"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  borderColor: 'var(--sms-v8-border)',
                  color: 'var(--sms-v8-text-2)',
                }}
              >
                {t(`paths.${pathKey}.title`)}
              </span>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['premium', 'growth', 'viral'] as const).map((pathKey) => (
              <div
                key={pathKey}
                className="p-4 rounded-xl border space-y-3"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                }}
              >
                <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                  {t(`paths.${pathKey}.title`)}
                </p>
                <ul className="space-y-2">
                  {pathExamples[pathKey].traits.map((trait) => (
                    <li key={trait} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--tone-solid)' }}
                      />
                      <span className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
                        {t(`paths.${pathKey}.traits.${trait}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Campaign Recipe Cards */}
        <div className="space-y-3">
          <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
            {t('recipesTitle')}
          </p>
          <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} lg:grid-cols-3 gap-4`}>
            {campaignList.map((campaign) => (
              <div
                key={campaign.key}
                className="p-3 rounded-xl border space-y-2"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                }}
              >
                <div className="flex items-center gap-2.5">
                  <IconFrame size="sm" tone={campaign.tone} decorative>
                    {campaign.icon}
                  </IconFrame>
                  <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                    {t(`campaigns.${campaign.key}.title`)}
                  </p>
                </div>

                <div className="space-y-1.5">
                  {recipeFields.map((field) => (
                    <div key={field} className="flex items-start gap-2">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ background: 'var(--tone-solid)' }}
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-2)' }}>
                          {t(`recipe.${field}`)}:{' '}
                        </span>
                        <span className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                          {t(`campaigns.${campaign.key}.${field}`)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium"
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

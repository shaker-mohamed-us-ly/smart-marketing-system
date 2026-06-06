'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import {
  Globe, Camera, Share2, Video, Users, Package, Tag, MessageCircle, Shield, FileText, Link2, Clock, Lightbulb, Zap
} from 'lucide-react';

const recommendedSources = [
  { key: 'manualBrief', icon: <FileText className="h-4 w-4" />, tone: 'slate' as const, status: 'ready' as const },
  { key: 'productImages', icon: <Package className="h-4 w-4" />, tone: 'emerald' as const, status: 'pending' as const },
  { key: 'localCompetitor', icon: <Users className="h-4 w-4" />, tone: 'orange' as const, status: 'pending' as const },
];

const sourceGroups = [
  {
    groupKey: 'coreBrand',
    sources: [
      { key: 'website', icon: <Globe className="h-4 w-4" />, tone: 'violet' as const, status: 'pending' as const },
      { key: 'instagram', icon: <Camera className="h-4 w-4" />, tone: 'orange' as const, status: 'pending' as const },
      { key: 'facebook', icon: <Share2 className="h-4 w-4" />, tone: 'sky' as const, status: 'pending' as const },
      { key: 'tiktok', icon: <Video className="h-4 w-4" />, tone: 'sky' as const, status: 'pending' as const },
    ],
  },
  {
    groupKey: 'productProof',
    sources: [
      { key: 'offers', icon: <Tag className="h-4 w-4" />, tone: 'amber' as const, status: 'pending' as const },
      { key: 'testimonials', icon: <MessageCircle className="h-4 w-4" />, tone: 'emerald' as const, status: 'pending' as const },
    ],
  },
  {
    groupKey: 'guardrails',
    sources: [
      { key: 'guardrails', icon: <Shield className="h-4 w-4" />, tone: 'slate' as const, status: 'pending' as const },
    ],
  },
];

function SourceCard({ source, t }: { source: any; t: any }) {
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl border"
      style={{
        background: 'var(--sms-v8-surface)',
        borderColor: 'var(--sms-v8-border)',
      }}
    >
      <IconFrame size="sm" tone={source.tone} decorative>
        {source.icon}
      </IconFrame>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
          {t(`sources.${source.key}.title`)}
        </p>
        <p className="text-sm mt-0.5 leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t(`sources.${source.key}.benefit`)}
        </p>
        <p className="text-sm mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
          {t(`sources.${source.key}.campaignImpact`)}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{
              background: source.status === 'ready'
                ? 'rgba(16,185,129,0.12)'
                : 'var(--sms-v8-surface-2)',
              color: source.status === 'ready'
                ? '#059669'
                : 'var(--sms-v8-text-3)',
            }}
          >
            {source.status === 'ready'
              ? <Zap className="h-3 w-3" />
              : <Clock className="h-3 w-3" />
            }
            {t(`status.${source.status}`)}
          </span>
        </div>
      </div>
    </div>
  );
}

interface BrandSourceIntelligencePanelProps {
  compact?: boolean;
}

export function BrandSourceIntelligencePanel({ compact }: BrandSourceIntelligencePanelProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.sourceIntelligence');

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="violet" decorative>
            <Link2 className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-sm">{t('title')}</CardTitle>
            <CardDescription>{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact && (
          <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('description')}
          </p>
        )}

        {!compact && (
          /* Smart Hint */
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{
              background: 'rgba(124,58,237,0.06)',
              border: '1px solid rgba(124,58,237,0.15)',
            }}
          >
            <Lightbulb className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#7c3aed' }} />
            <p className="text-sm leading-relaxed" style={{ color: '#5b21b6' }}>
              {t('recommended.hint')}
            </p>
          </div>
        )}

        {/* Recommended First */}
        <div className="space-y-2">
          {!compact && (
            <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
              {t('recommended.title')}
            </p>
          )}
          {compact ? (
            <div className="space-y-2">
              {recommendedSources.map((source) => (
                <div
                  key={source.key}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg"
                  style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}
                >
                  <IconFrame size="sm" tone={source.tone} decorative>{source.icon}</IconFrame>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                      {t(`sources.${source.key}.title`)}
                    </p>
                    <p className="text-sm truncate" style={{ color: 'var(--sms-v8-text-2)' }}>
                      {t(`sources.${source.key}.benefit`)}
                    </p>
                  </div>
                  <span
                    className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{
                      background: source.status === 'ready'
                        ? 'rgba(16,185,129,0.12)'
                        : 'var(--sms-v8-surface-2)',
                      color: source.status === 'ready' ? '#059669' : 'var(--sms-v8-text-3)',
                    }}
                  >
                    {source.status === 'ready' ? <Zap className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {t(`status.${source.status}`)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendedSources.map((source) => (
                <SourceCard key={source.key} source={source} t={t} />
              ))}
            </div>
          )}
        </div>

        {/* Source Groups — hidden in compact */}
        {!compact && sourceGroups.map((group) => (
          <div key={group.groupKey} className="space-y-3">
            <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text-2)' }}>
              {t(`groups.${group.groupKey}`)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {group.sources.map((source) => (
                <SourceCard key={source.key} source={source} t={t} />
              ))}
            </div>
          </div>
        ))}

        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{
            background: 'var(--sms-v8-surface-2)',
            color: 'var(--sms-v8-text-3)',
            border: '1px solid var(--sms-v8-border)',
          }}
        >
          <Shield className="h-4 w-4 shrink-0" style={{ color: 'var(--tone-solid)' }} />
          <span>{t('previewNotice')}</span>
        </div>
      </CardContent>
    </Card>
  );
}

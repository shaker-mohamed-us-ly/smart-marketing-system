'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type { BrandOperatingProfile } from '@/lib/brand/types';
import {
  Compass,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface BrandProfileIntelligenceHeroProps {
  profile?: BrandOperatingProfile | null;
  hasDna?: boolean;
  onBuildProfile?: () => void;
  onEditDna?: () => void;
  disabled?: boolean;
}

export function BrandProfileIntelligenceHero({
  profile,
  hasDna,
  onBuildProfile,
  onEditDna,
  disabled,
}: BrandProfileIntelligenceHeroProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.hero');
  const tOp = useTranslations('clientBrand.v1.ui.details.identityStudio.operatingProfile');

  const hasProfile = !!profile?.businessModel;
  const status: 'incomplete' | 'ready' | 'evolving' = hasProfile && hasDna
    ? 'ready'
    : hasProfile || hasDna
      ? 'evolving'
      : 'incomplete';

  const statusConfig = {
    incomplete: {
      icon: <AlertCircle className="h-5 w-5" />,
      tone: 'amber' as const,
      title: t('statusIncomplete'),
      description: t('descIncomplete'),
      cta: t('ctaBuild'),
      onClick: onBuildProfile,
    },
    evolving: {
      icon: <RefreshCw className="h-5 w-5" />,
      tone: 'sky' as const,
      title: t('statusEvolving'),
      description: t('descEvolving'),
      cta: t('ctaEdit'),
      onClick: onEditDna,
    },
    ready: {
      icon: <CheckCircle2 className="h-5 w-5" />,
      tone: 'emerald' as const,
      title: t('statusReady'),
      description: t('descReady'),
      cta: t('ctaEdit'),
      onClick: onEditDna,
    },
  };

  const config = statusConfig[status];

  return (
    <Card variant="elevated" padding="lg" tone="violet">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="violet" decorative>
              <Compass className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-base">{t('title')}</CardTitle>
              <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
            </div>
          </div>
          <span
            className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: 'var(--tone-bg)',
              color: 'var(--tone-text)',
            }}
          >
            {config.title}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className="flex items-start gap-3 p-3 rounded-lg"
          style={{ background: 'var(--sms-v8-surface)', border: '1px solid var(--sms-v8-border)' }}
        >
          <IconFrame size="sm" tone={config.tone} decorative>{config.icon}</IconFrame>
          <div className="flex-1">
            <p className="text-sm" style={{ color: 'var(--sms-v8-text)' }}>
              {config.description}
            </p>
            {hasProfile && (
              <p className="text-xs mt-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('profileSummary', {
                  model: profile?.businessModel
                    ? tOp(`choices.${profile.businessModel.replace(/_([a-z])/g, (_, l) => l.toUpperCase())}.label`)
                    : '',
                  motion: profile?.salesMotion
                    ? tOp(`choices.${profile.salesMotion.replace(/_([a-z])/g, (_, l) => l.toUpperCase())}.label`)
                    : '',
                })}
              </p>
            )}
          </div>
        </div>

        {config.onClick && (
          <Button
            variant="outline"
            size="sm"
            onClick={config.onClick}
            disabled={disabled}
            icon={<ChevronLeft className="h-4 w-4" />}
            iconPosition="start"
          >
            {config.cta}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

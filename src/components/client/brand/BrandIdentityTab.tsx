'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { BrandIdentityPathCards } from './BrandIdentityPathCards';
import { BrandVoicePanel } from './BrandVoicePanel';
import { BrandVisualDirectionPanel } from './BrandVisualDirectionPanel';
import { BrandSourceIntelligencePanel } from './BrandSourceIntelligencePanel';
import { BrandDnaCanvas } from './BrandDnaCanvas';
import { BrandCampaignTranslationPanel } from './BrandCampaignTranslationPanel';
import { BrandReadinessChecklist } from './BrandReadinessChecklist';
import type { Brand } from '@/lib/brand/types';
import {
  Fingerprint, AlertCircle, Building2, FileText, Gauge, Activity,
  Link2, Sparkles, Megaphone, ArrowRight, ListChecks, ChevronDown
} from 'lucide-react';
import { useState } from 'react';

interface BrandIdentityTabProps {
  brand: Brand;
}

function getReadinessPercent(status: Brand['onboarding_status']): number {
  switch (status) {
    case 'created': return 25;
    case 'profile_complete': return 50;
    case 'channels_connected': return 75;
    case 'ready': return 100;
    default: return 25;
  }
}

export function BrandIdentityTab({ brand }: BrandIdentityTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio');
  const readiness = getReadinessPercent(brand.onboarding_status);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="space-y-6">
      {/* ── Zone A: DNA Summary + Start Here ── */}
      <Card variant="elevated" padding="lg" tone="violet">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="violet" decorative>
              <Fingerprint className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-base">{t('dnaSummary.title')}</CardTitle>
              <CardDescription className="text-sm">{t('dnaSummary.subtitle', { brandName: brand.name })}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Compact 4-item meta row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Building2 className="h-4 w-4" />, label: t('dnaSummary.industry'), value: brand.industry },
              { icon: <FileText className="h-4 w-4" />, label: t('dnaSummary.brandPromise'), value: brand.description || t('dnaSummary.noDescription') },
              { icon: <Gauge className="h-4 w-4" />, label: t('dnaSummary.readiness'), value: `${readiness}%`, isProgress: true, progress: readiness },
              { icon: <Activity className="h-4 w-4" />, label: t('dnaSummary.status'), value: brand.status === 'active' ? t('dnaSummary.statusActive') : t('dnaSummary.statusInactive') },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <IconFrame size="sm" tone="slate" decorative>{item.icon}</IconFrame>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>{item.label}</p>
                  {item.isProgress ? (
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--sms-v8-surface-2)' }}>
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.progress}%`, background: 'var(--tone-solid)' }} />
                      </div>
                      <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--tone-text)' }}>{item.value}</span>
                    </div>
                  ) : (
                    <p className="text-sm font-semibold truncate" style={{ color: 'var(--sms-v8-text)' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Start Here — 3 steps */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg border"
            style={{ background: 'var(--sms-v8-surface-2)', borderColor: 'var(--sms-v8-border)' }}
          >
            <div className="flex items-center gap-2 shrink-0">
              <IconFrame size="sm" tone="amber" decorative><Sparkles className="h-4 w-4" /></IconFrame>
              <span className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>{t('guide.title')}</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
              {[
                { icon: <Link2 className="h-3.5 w-3.5" />, label: t('guide.steps.addSources') },
                { icon: <Fingerprint className="h-3.5 w-3.5" />, label: t('guide.steps.reviewSignals') },
                { icon: <Megaphone className="h-3.5 w-3.5" />, label: t('guide.steps.buildCampaigns') },
              ].map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>{step.label}</span>
                  {i < arr.length - 1 && <ArrowRight className="h-3 w-3 hidden sm:block" style={{ color: 'var(--sms-v8-text-3)' }} />}
                </div>
              ))}
            </div>
          </div>

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'var(--sms-v8-surface)', color: 'var(--sms-v8-text-3)', border: '1px solid var(--sms-v8-border)' }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <span>{t('previewOnly')}</span>
          </div>
        </CardContent>
      </Card>

      {/* ── Zone B: DNA Snapshot (compact) ── */}
      <BrandDnaCanvas brand={brand} compact />

      {/* ── Zone C: Campaign Preview (3 recipes) ── */}
      <BrandCampaignTranslationPanel compact />

      {/* ── Secondary: Source Intelligence (compact) ── */}
      <BrandSourceIntelligencePanel compact />

      {/* ── Secondary: Readiness (compact next actions) ── */}
      <BrandReadinessChecklist brand={brand} compact />

      {/* ── Details-on-demand ── */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border"
          style={{
            background: 'var(--sms-v8-surface)',
            borderColor: 'var(--sms-v8-border)',
            color: 'var(--sms-v8-text-2)',
          }}
        >
          <ListChecks className="h-4 w-4" />
          <span>{showDetails ? t('hideDetails') : t('showDetails')}</span>
          <ChevronDown className="h-4 w-4 transition-transform" style={{ transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>
      </div>

      {showDetails && (
        <div className="space-y-6">
          <BrandIdentityPathCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BrandVoicePanel />
            <BrandVisualDirectionPanel />
          </div>
        </div>
      )}
    </div>
  );
}

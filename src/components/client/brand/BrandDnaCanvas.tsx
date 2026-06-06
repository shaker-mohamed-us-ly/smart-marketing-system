'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Fingerprint, Users, Award, MessageSquare, Palette, Shield, AlertTriangle, Target, Search, Megaphone } from 'lucide-react';
import type { Brand } from '@/lib/brand/types';

interface BrandDnaCanvasProps {
  brand: Brand;
  compact?: boolean;
}

const sections = [
  { key: 'promise', icon: <Fingerprint className="h-4 w-4" />, tone: 'violet' as const },
  { key: 'audience', icon: <Users className="h-4 w-4" />, tone: 'sky' as const },
  { key: 'differentiator', icon: <Award className="h-4 w-4" />, tone: 'amber' as const },
  { key: 'voice', icon: <MessageSquare className="h-4 w-4" />, tone: 'emerald' as const },
  { key: 'visual', icon: <Palette className="h-4 w-4" />, tone: 'orange' as const },
  { key: 'guardrails', icon: <Shield className="h-4 w-4" />, tone: 'slate' as const },
];

function getConfidence(brand: Brand, sectionKey: string): 'low' | 'medium' | 'good' {
  const hasName = !!brand.name && brand.name.length > 2;
  const hasDesc = !!brand.description && brand.description.length > 10;
  const hasIndustry = !!brand.industry && brand.industry.length > 2;

  if (sectionKey === 'promise') {
    return hasName && hasDesc ? 'good' : hasName ? 'medium' : 'low';
  }
  if (sectionKey === 'audience') {
    return hasDesc && hasIndustry ? 'medium' : 'low';
  }
  if (sectionKey === 'differentiator') {
    return hasDesc ? 'medium' : 'low';
  }
  if (sectionKey === 'voice') {
    return hasDesc ? 'medium' : 'low';
  }
  if (sectionKey === 'visual') {
    return hasName ? 'low' : 'low';
  }
  return 'low';
}

function getSignalValue(brand: Brand, sectionKey: string, t: any): string {
  if (sectionKey === 'promise') {
    return brand.description || t('missingInputHint');
  }
  if (sectionKey === 'audience') {
    return brand.industry ? t('audience.audienceDraft', { industry: brand.industry }) : t('missingInputHint');
  }
  if (sectionKey === 'differentiator') {
    return brand.description ? t('differentiator.differentiatorDraft') : t('missingInputHint');
  }
  return t('missingInputHint');
}

const confidenceStyles = {
  low: { bg: 'rgba(239,68,68,0.08)', color: '#dc2626', labelKey: 'confidence.low' },
  medium: { bg: 'rgba(245,158,11,0.08)', color: '#d97706', labelKey: 'confidence.medium' },
  good: { bg: 'rgba(16,185,129,0.08)', color: '#059669', labelKey: 'confidence.good' },
};

function DnaField({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5">
        <IconFrame size="sm" tone={tone as any} decorative>
          {icon}
        </IconFrame>
        <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-2)' }}>{label}</p>
      </div>
      <p className="text-sm leading-relaxed pl-8" style={{ color: 'var(--sms-v8-text)' }}>{value}</p>
    </div>
  );
}

export function BrandDnaCanvas({ brand, compact }: BrandDnaCanvasProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaCanvas');

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="amber" decorative>
            <Fingerprint className="h-5 w-5" />
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

        {compact ? (
          /* ── Compact: 6 rows, icon + title + signal + chip ── */
          <div className="space-y-2">
            {sections.map((section) => {
              const confidence = getConfidence(brand, section.key);
              const style = confidenceStyles[confidence];
              const signalValue = getSignalValue(brand, section.key, t);
              return (
                <div
                  key={section.key}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg"
                  style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}
                >
                  <IconFrame size="sm" tone={section.tone} decorative>{section.icon}</IconFrame>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                      {t(`${section.key}.title`)}
                    </p>
                    <p className="text-sm truncate" style={{ color: 'var(--sms-v8-text-2)' }}>
                      {signalValue}
                    </p>
                  </div>
                  <span
                    className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: style.bg, color: style.color }}
                  >
                    {t(style.labelKey)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          /* ── Full: 6 cards × 4 fields ── */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sections.map((section) => {
              const confidence = getConfidence(brand, section.key);
              const style = confidenceStyles[confidence];
              const signalValue = getSignalValue(brand, section.key, t);
              const missingValue = confidence === 'low'
                ? t(`${section.key}.missing`)
                : t(`${section.key}.missingPartial`);
              const impactValue = t(`${section.key}.campaignImpact`);

              return (
                <div
                  key={section.key}
                  className="p-4 rounded-xl border space-y-4"
                  style={{
                    background: 'var(--sms-v8-surface)',
                    borderColor: 'var(--sms-v8-border)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2.5">
                    <IconFrame size="sm" tone={section.tone} decorative>
                      {section.icon}
                    </IconFrame>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                        {t(`${section.key}.title`)}
                      </p>
                    </div>
                    <span
                      className="text-xs font-semibold px-2 py-0.5 rounded-full shrink-0"
                      style={{ background: style.bg, color: style.color }}
                    >
                      {t(style.labelKey)}
                    </span>
                  </div>

                  {/* Decision */}
                  <DnaField
                    icon={<Target className="h-3 w-3" />}
                    label={t('decision')}
                    value={t(`${section.key}.decision`)}
                    tone={section.tone}
                  />

                  {/* Current Signal */}
                  <DnaField
                    icon={<Search className="h-3 w-3" />}
                    label={t('currentSignal')}
                    value={signalValue}
                    tone="slate"
                  />

                  {/* Missing Input */}
                  {confidence !== 'good' && (
                    <div className="flex items-start gap-1.5">
                      <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--sms-v8-warning, #f59e0b)' }} />
                      <div className="space-y-1">
                        <p className="text-xs font-semibold" style={{ color: 'var(--sms-v8-text-2)' }}>
                          {t('missingInput')}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                          {missingValue}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Campaign Impact */}
                  <DnaField
                    icon={<Megaphone className="h-3 w-3" />}
                    label={t('campaignImpact')}
                    value={impactValue}
                    tone="emerald"
                  />
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

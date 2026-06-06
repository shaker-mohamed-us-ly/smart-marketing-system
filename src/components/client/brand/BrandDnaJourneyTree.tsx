'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent } from '@/components/shared/Card';
import {
  PenTool,
  Dna,
  Users,
  Share2,
  Megaphone,
  ArrowLeft,
  Zap,
} from 'lucide-react';
import styles from './BrandDnaJourneyTree.module.css';

interface BrandDnaJourneyTreeProps {
  onCreateBrand?: () => void;
}

export function BrandDnaJourneyTree({ onCreateBrand }: BrandDnaJourneyTreeProps) {
  const t = useTranslations('clientBrand.v1.ui.operatingSystem.tree');

  const steps = [
    { key: 'inputs', icon: <PenTool className="h-4 w-4" />, tone: 'violet' },
    { key: 'dna', icon: <Dna className="h-4 w-4" />, tone: 'sky' },
    { key: 'managers', icon: <Users className="h-4 w-4" />, tone: 'emerald' },
    { key: 'channels', icon: <Share2 className="h-4 w-4" />, tone: 'amber' },
    { key: 'campaigns', icon: <Megaphone className="h-4 w-4" />, tone: 'orange' },
  ] as const;

  return (
    <Card variant="subtle" padding="md" className="mb-4">
      <CardContent className="space-y-4">
        {/* Compact header inline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div
              className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ background: 'var(--tone-bg)' }}
            >
              <Zap className="h-3.5 w-3.5" style={{ color: 'var(--tone-solid)' }} />
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                {t('title')}
              </p>
              <p className="text-[11px]" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('subtitle')}
              </p>
            </div>
          </div>
          {onCreateBrand && (
            <button
              type="button"
              onClick={onCreateBrand}
              className="shrink-0 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:opacity-90"
              style={{
                background: 'var(--tone-bg)',
                color: 'var(--tone-solid)',
                borderColor: 'var(--tone-border)',
              }}
            >
              <ArrowLeft className="h-3 w-3" />
              {t('ctaStartJourney')}
            </button>
          )}
        </div>

        {/* Journey Stepper */}
        <div className={styles.journeyRoot}>
          {steps.map((step, index) => {
            const isFirst = index === 0;
            return (
              <div key={step.key} className={styles.journeyStep}>
                <div
                  className={styles.journeyIcon}
                  style={{
                    borderColor: isFirst ? 'var(--tone-solid)' : 'var(--sms-v8-border)',
                    color: isFirst ? 'var(--tone-solid)' : 'var(--sms-v8-text-3)',
                    boxShadow: isFirst ? '0 0 0 3px var(--tone-bg)' : 'none',
                    background: isFirst ? 'var(--tone-bg)' : 'var(--sms-v8-surface)',
                  }}
                >
                  {step.icon}
                </div>
                <div className={styles.journeyText}>
                  <p className={styles.journeyTitle}>
                    {t(`steps.${step.key}.title`)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

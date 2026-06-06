import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Card, CardContent } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Plus, Sparkles } from 'lucide-react';

interface BrandEmptyStateProps {
  onCreateBrand: () => void;
}

export function BrandEmptyState({ onCreateBrand }: BrandEmptyStateProps) {
  const t = useTranslations('clientBrand.v1.ui.emptyState');

  return (
    <Card variant="elevated" padding="lg" className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-14 px-6">
        {/* Icon with subtle ambient ring */}
        <div className="relative mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-20"
            style={{ background: 'var(--tone-solid)' }}
          />
          <IconFrame size="lg" tone="violet" decorative>
            <Sparkles className="h-10 w-10" />
          </IconFrame>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--sms-v8-text)' }}>
          {t('title')}
        </h2>

        {/* Description */}
        <p className="text-sm mb-8 max-w-sm text-center leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        {/* CTA Button */}
        <Button onClick={onCreateBrand} size="lg" tone="violet" icon={<Plus className="h-5 w-5" />} iconPosition="start">
          {t('cta')}
        </Button>

        {/* Hint */}
        <p className="text-xs mt-4 text-center" style={{ color: 'var(--sms-v8-text-3)' }}>
          {t('hint')}
        </p>

        {/* Getting Started Checklist — honest guidance, no fake progress */}
        <div
          className="w-full max-w-sm mt-10 pt-8 border-t"
          style={{ borderColor: 'var(--sms-v8-border-strong)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="h-px w-8" style={{ background: 'var(--sms-v8-border)' }} />
            <p
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'var(--sms-v8-text-3)' }}
            >
              {t('checklistTitle')}
            </p>
            <div className="h-px w-8" style={{ background: 'var(--sms-v8-border)' }} />
          </div>

          <div className="space-y-4">
            {/* Step 1 — current step: filled violet circle with white number */}
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-xs font-bold"
                style={{
                  background: 'var(--tone-solid)',
                  color: '#ffffff',
                  border: '2px solid var(--tone-solid)',
                }}
                data-tone="violet"
              >
                1
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                {t('step1Label')}
              </span>
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full ml-auto shrink-0"
                style={{
                  background: 'var(--tone-bg)',
                  color: 'var(--tone-text)',
                  border: '1px solid var(--tone-border)',
                }}
                data-tone="violet"
              >
                {t('step1Status')}
              </span>
            </div>

            {/* Step 2 — upcoming: outlined circle with gray number */}
            <div className="flex items-center gap-3 opacity-55">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-xs font-semibold"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  color: 'var(--sms-v8-text-3)',
                  border: '2px solid var(--sms-v8-border)',
                }}
              >
                2
              </div>
              <span className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>
                {t('step2Label')}
              </span>
            </div>

            {/* Step 3 — upcoming with honest "coming later" badge: outlined circle with gray number */}
            <div className="flex items-center gap-3 opacity-55">
              <div
                className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-xs font-semibold"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  color: 'var(--sms-v8-text-3)',
                  border: '2px solid var(--sms-v8-border)',
                }}
              >
                3
              </div>
              <span className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>
                {t('step3Label')}
              </span>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full ml-auto shrink-0"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  color: 'var(--sms-v8-text-3)',
                  border: '1px solid var(--sms-v8-border)',
                }}
              >
                {t('step3Hint')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import type { Brand, BrandCoreProfile, BrandOnboardingStatus } from '@/lib/brand/types';
import {
  Check,
  Circle,
  CircleDot,
  Rocket,
  Building2,
  Fingerprint,
  Link2,
  Megaphone,
} from 'lucide-react';

interface BrandProgressStepperProps {
  brand: Brand;
  profile?: BrandCoreProfile | null;
}

interface StepConfig {
  key: string;
  icon: React.ReactNode;
  checkKey: BrandOnboardingStatus;
}

const steps: StepConfig[] = [
  {
    key: 'profile',
    icon: <Building2 className="h-4 w-4" />,
    checkKey: 'created',
  },
  {
    key: 'identity',
    icon: <Fingerprint className="h-4 w-4" />,
    checkKey: 'profile_complete',
  },
  {
    key: 'channels',
    icon: <Link2 className="h-4 w-4" />,
    checkKey: 'channels_connected',
  },
  {
    key: 'firstCampaign',
    icon: <Megaphone className="h-4 w-4" />,
    checkKey: 'ready',
  },
];

const statusOrder: BrandOnboardingStatus[] = ['created', 'profile_complete', 'channels_connected', 'ready'];

function getStepState(
  stepIndex: number,
  currentStatus: BrandOnboardingStatus
): 'completed' | 'current' | 'pending' {
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (stepIndex < currentIndex) return 'completed';
  if (stepIndex === currentIndex) return 'current';
  return 'pending';
}

export function BrandProgressStepper({ brand, profile }: BrandProgressStepperProps) {
  const t = useTranslations('clientBrand.v1.ui.details');
  const currentStatus = brand.onboarding_status;

  return (
    <Card variant="elevated" padding="lg" tone="violet">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('readinessTitle')}</CardTitle>
        <CardDescription>{t('readinessDescription')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const state = getStepState(index, currentStatus);
            const isCompleted = state === 'completed';
            const isCurrent = state === 'current';

            return (
              <div key={step.key} className="flex items-start gap-4">
                {/* Step indicator */}
                <div className="flex flex-col items-center gap-1 pt-0.5">
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-full transition-colors"
                    style={{
                      background: isCompleted
                        ? 'var(--tone-solid)'
                        : isCurrent
                          ? 'var(--tone-bg)'
                          : 'var(--sms-v8-surface-2)',
                      color: isCompleted
                        ? 'var(--sms-v8-canvas)'
                        : isCurrent
                          ? 'var(--tone-text)'
                          : 'var(--sms-v8-text-3)',
                      border: isCurrent ? '2px solid var(--tone-solid)' : '2px solid transparent',
                    }}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : isCurrent ? (
                      <CircleDot className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className="w-0.5 h-6 rounded-full"
                      style={{
                        background: isCompleted ? 'var(--tone-solid)' : 'var(--sms-v8-border)',
                      }}
                    />
                  )}
                </div>

                {/* Step content */}
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: isCompleted || isCurrent ? 'var(--sms-v8-text)' : 'var(--sms-v8-text-3)',
                      }}
                    >
                      {t(`steps.${step.key}`)}
                    </span>
                    {isCompleted && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: 'var(--tone-bg)',
                          color: 'var(--tone-text)',
                        }}
                      >
                        {t('completed')}
                      </span>
                    )}
                    {isCurrent && (
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                        style={{
                          background: 'var(--tone-bg)',
                          color: 'var(--tone-text)',
                        }}
                      >
                        {t('inProgress')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {isCompleted
                      ? t(`stepDescriptions.${step.key}.done`)
                      : isCurrent
                        ? t(`stepDescriptions.${step.key}.current`)
                        : t(`stepDescriptions.${step.key}.pending`)}
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

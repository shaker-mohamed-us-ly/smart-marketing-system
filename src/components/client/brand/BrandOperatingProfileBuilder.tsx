'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame, type IconFrameTone } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type {
  BrandOperatingProfile,
  BrandBusinessModel,
  BrandSalesMotion,
  BrandGrowthIntent,
  BrandIdentityMaturity,
} from '@/lib/brand/types';
import {
  Building2,
  Wrench,
  Package,
  Store,
  UserCircle,
  Layers,
  ShoppingCart,
  CalendarCheck,
  FileText,
  BookOpen,
  Repeat,
  Megaphone,
  Target,
  TrendingUp,
  Users,
  Rocket,
  RefreshCw,
  Image,
  Palette,
  Award,
  Check,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface BrandOperatingProfileBuilderProps {
  initialProfile?: BrandOperatingProfile | null;
  onSave: (profile: BrandOperatingProfile) => void;
  disabled?: boolean;
}

type StepKey = 'businessModel' | 'salesMotion' | 'growthIntent' | 'identityMaturity';

interface StepConfig<T> {
  key: StepKey;
  title: string;
  subtitle: string;
  choices: { key: T; icon: React.ReactNode; tone: IconFrameTone; label: string; outcome: string }[];
}

const steps: StepConfig<unknown>[] = [
  {
    key: 'businessModel',
    title: 'steps.businessModel.title',
    subtitle: 'steps.businessModel.subtitle',
    choices: [
      { key: 'company', icon: <Building2 className="h-5 w-5" />, tone: 'violet', label: 'choices.company.label', outcome: 'choices.company.outcome' },
      { key: 'service_business', icon: <Wrench className="h-5 w-5" />, tone: 'sky', label: 'choices.serviceBusiness.label', outcome: 'choices.serviceBusiness.outcome' },
      { key: 'product_brand', icon: <Package className="h-5 w-5" />, tone: 'emerald', label: 'choices.productBrand.label', outcome: 'choices.productBrand.outcome' },
      { key: 'retail', icon: <Store className="h-5 w-5" />, tone: 'amber', label: 'choices.retail.label', outcome: 'choices.retail.outcome' },
      { key: 'personal_expert', icon: <UserCircle className="h-5 w-5" />, tone: 'orange', label: 'choices.personalExpert.label', outcome: 'choices.personalExpert.outcome' },
      { key: 'hybrid', icon: <Layers className="h-5 w-5" />, tone: 'slate', label: 'choices.hybrid.label', outcome: 'choices.hybrid.outcome' },
    ],
  },
  {
    key: 'salesMotion',
    title: 'steps.salesMotion.title',
    subtitle: 'steps.salesMotion.subtitle',
    choices: [
      { key: 'direct_purchase', icon: <ShoppingCart className="h-5 w-5" />, tone: 'emerald', label: 'choices.directPurchase.label', outcome: 'choices.directPurchase.outcome' },
      { key: 'consultation', icon: <CalendarCheck className="h-5 w-5" />, tone: 'sky', label: 'choices.consultation.label', outcome: 'choices.consultation.outcome' },
      { key: 'quote_request', icon: <FileText className="h-5 w-5" />, tone: 'violet', label: 'choices.quoteRequest.label', outcome: 'choices.quoteRequest.outcome' },
      { key: 'catalog', icon: <BookOpen className="h-5 w-5" />, tone: 'amber', label: 'choices.catalog.label', outcome: 'choices.catalog.outcome' },
      { key: 'subscription', icon: <Repeat className="h-5 w-5" />, tone: 'orange', label: 'choices.subscription.label', outcome: 'choices.subscription.outcome' },
    ],
  },
  {
    key: 'growthIntent',
    title: 'steps.growthIntent.title',
    subtitle: 'steps.growthIntent.subtitle',
    choices: [
      { key: 'trust', icon: <Award className="h-5 w-5" />, tone: 'violet', label: 'choices.trust.label', outcome: 'choices.trust.outcome' },
      { key: 'conversion', icon: <ShoppingCart className="h-5 w-5" />, tone: 'emerald', label: 'choices.conversion.label', outcome: 'choices.conversion.outcome' },
      { key: 'awareness', icon: <Megaphone className="h-5 w-5" />, tone: 'sky', label: 'choices.awareness.label', outcome: 'choices.awareness.outcome' },
      { key: 'retention', icon: <Users className="h-5 w-5" />, tone: 'amber', label: 'choices.retention.label', outcome: 'choices.retention.outcome' },
      { key: 'launch', icon: <Rocket className="h-5 w-5" />, tone: 'orange', label: 'choices.launch.label', outcome: 'choices.launch.outcome' },
      { key: 'repositioning', icon: <RefreshCw className="h-5 w-5" />, tone: 'slate', label: 'choices.repositioning.label', outcome: 'choices.repositioning.outcome' },
    ],
  },
  {
    key: 'identityMaturity',
    title: 'steps.identityMaturity.title',
    subtitle: 'steps.identityMaturity.subtitle',
    choices: [
      { key: 'none', icon: <Circle className="h-5 w-5" />, tone: 'slate', label: 'choices.none.label', outcome: 'choices.none.outcome' },
      { key: 'logo_only', icon: <Image className="h-5 w-5" />, tone: 'sky', label: 'choices.logoOnly.label', outcome: 'choices.logoOnly.outcome' },
      { key: 'colors_logo', icon: <Palette className="h-5 w-5" />, tone: 'amber', label: 'choices.colorsLogo.label', outcome: 'choices.colorsLogo.outcome' },
      { key: 'full_identity', icon: <Award className="h-5 w-5" />, tone: 'emerald', label: 'choices.fullIdentity.label', outcome: 'choices.fullIdentity.outcome' },
      { key: 'refresh', icon: <RefreshCw className="h-5 w-5" />, tone: 'violet', label: 'choices.refresh.label', outcome: 'choices.refresh.outcome' },
    ],
  },
];

// Helper for Circle icon since lucide-react doesn't export it directly in some versions
function Circle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}

export function BrandOperatingProfileBuilder({ initialProfile, onSave, disabled }: BrandOperatingProfileBuilderProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.operatingProfile');

  const [profile, setProfile] = useState<BrandOperatingProfile>({
    businessModel: initialProfile?.businessModel || undefined,
    salesMotion: initialProfile?.salesMotion || undefined,
    growthIntent: initialProfile?.growthIntent || undefined,
    identityMaturity: initialProfile?.identityMaturity || undefined,
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [showSummary, setShowSummary] = useState(!!initialProfile?.businessModel);

  const stepKeys: StepKey[] = ['businessModel', 'salesMotion', 'growthIntent', 'identityMaturity'];
  const totalSteps = steps.length;
  const completedSteps = stepKeys.filter((k) => !!profile[k]).length;

  const handleSelect = useCallback((stepKey: StepKey, value: string) => {
    setProfile((prev) => ({ ...prev, [stepKey]: value }));
    // Auto-advance after selection
    const nextStep = currentStep + 1;
    if (nextStep < totalSteps) {
      setCurrentStep(nextStep);
    } else {
      setShowSummary(true);
    }
  }, [currentStep, totalSteps]);

  const handleBack = useCallback(() => {
    if (showSummary) {
      setShowSummary(false);
      setCurrentStep(totalSteps - 1);
    } else if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, showSummary, totalSteps]);

  const handleEditStep = useCallback((stepIndex: number) => {
    setShowSummary(false);
    setCurrentStep(stepIndex);
  }, []);

  const handleSave = useCallback(() => {
    onSave(profile);
  }, [profile, onSave]);

  const currentStepConfig = steps[currentStep];
  const stepKey = stepKeys[currentStep];

  if (showSummary) {
    return (
      <Card variant="elevated" padding="lg" tone="violet">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="emerald" decorative>
              <Check className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-base">{t('summaryTitle')}</CardTitle>
              <CardDescription className="text-sm">{t('summarySubtitle')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {steps.map((s, idx) => {
              const value = profile[s.key];
              const choice = s.choices.find((c) => c.key === value);
              return (
                <button
                  key={s.key}
                  onClick={() => handleEditStep(idx)}
                  disabled={disabled}
                  className="flex items-center gap-3 w-full p-3 rounded-xl border text-left transition-all hover:opacity-90"
                  style={{
                    background: 'var(--sms-v8-surface)',
                    borderColor: 'var(--sms-v8-border)',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    opacity: disabled ? 0.6 : 1,
                  }}
                  type="button"
                >
                  {choice ? (
                    <IconFrame size="sm" tone={choice.tone} decorative>{choice.icon}</IconFrame>
                  ) : (
                    <IconFrame size="sm" tone="slate" decorative><Circle className="h-4 w-4" /></IconFrame>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>
                      {t(s.title)}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                      {choice ? t(choice.label) : t('notSelected')}
                    </p>
                  </div>
                  <span className="text-xs" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {t('edit')}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="outline" size="sm" onClick={handleBack} disabled={disabled} className="flex-1">
              {t('edit')}
            </Button>
            <Button size="sm" onClick={handleSave} disabled={disabled} className="flex-1">
              {t('save')}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" padding="lg" tone="violet">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="violet" decorative>
            <Target className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">
              {t('subtitle')} — {completedSteps}/{totalSteps}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className="h-1.5 flex-1 rounded-full transition-all"
              style={{
                background: idx < currentStep
                  ? 'var(--tone-solid)'
                  : idx === currentStep
                    ? 'var(--tone-bg)'
                    : 'var(--sms-v8-surface-2)',
                border: idx === currentStep ? '1px solid var(--tone-solid)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Step title */}
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
            {t(currentStepConfig.title)}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t(currentStepConfig.subtitle)}
          </p>
        </div>

        {/* Choices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentStepConfig.choices.map((choice) => {
            const isSelected = profile[stepKey as keyof BrandOperatingProfile] === choice.key;
            return (
              <button
                key={choice.key as string}
                onClick={() => handleSelect(stepKey, choice.key as string)}
                disabled={disabled}
                className="relative flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all"
                style={{
                  background: isSelected ? 'var(--tone-bg)' : 'var(--sms-v8-surface)',
                  borderColor: isSelected ? 'var(--tone-solid)' : 'var(--sms-v8-border)',
                  opacity: disabled ? 0.6 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                }}
                type="button"
              >
                {isSelected && (
                  <div className="absolute top-2 end-2">
                    <IconFrame size="sm" tone="emerald" decorative>
                      <Check className="h-3 w-3" />
                    </IconFrame>
                  </div>
                )}
                <IconFrame size="sm" tone={choice.tone} decorative>{choice.icon}</IconFrame>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isSelected ? 'var(--tone-text)' : 'var(--sms-v8-text)' }}
                  >
                    {t(choice.label)}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {t(choice.outcome)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 0 || disabled}
            icon={<ChevronLeft className="h-4 w-4" />}
            iconPosition="start"
          >
            {t('cancel')}
          </Button>
          <span className="text-xs" style={{ color: 'var(--sms-v8-text-3)' }}>
            {currentStep + 1} / {totalSteps}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const next = currentStep + 1;
              if (next < totalSteps) setCurrentStep(next);
              else setShowSummary(true);
            }}
            disabled={disabled}
            icon={<ChevronRight className="h-4 w-4" />}
            iconPosition="end"
          >
            {t('next')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

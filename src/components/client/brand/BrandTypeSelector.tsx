'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame, type IconFrameTone } from '@/components/shared/IconFrame';
import type { BrandIdentityType } from '@/lib/brand/types';
import {
  Building2,
  Wrench,
  Package,
  HeadphonesIcon,
  CalendarDays,
  Layers,
  Check,
} from 'lucide-react';

interface BrandTypeSelectorProps {
  selectedType?: BrandIdentityType | null;
  onSelect: (type: BrandIdentityType) => void;
  disabled?: boolean;
}

const typeConfigs: { key: BrandIdentityType; icon: React.ReactNode; tone: IconFrameTone }[] = [
  { key: 'company', icon: <Building2 className="h-5 w-5" />, tone: 'violet' },
  { key: 'service', icon: <Wrench className="h-5 w-5" />, tone: 'sky' },
  { key: 'product', icon: <Package className="h-5 w-5" />, tone: 'emerald' },
  { key: 'after_sales', icon: <HeadphonesIcon className="h-5 w-5" />, tone: 'amber' },
  { key: 'seasonal', icon: <CalendarDays className="h-5 w-5" />, tone: 'orange' },
  { key: 'hybrid', icon: <Layers className="h-5 w-5" />, tone: 'slate' },
];

export function BrandTypeSelector({ selectedType, onSelect, disabled }: BrandTypeSelectorProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.typeSelector');

  return (
    <Card variant="elevated" padding="lg" tone="violet">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="violet" decorative>
            <Layers className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {typeConfigs.map((config) => {
            const isSelected = selectedType === config.key;
            const label = t(`types.${config.key}.label`);
            const description = t(`types.${config.key}.description`);

            return (
              <button
                key={config.key}
                onClick={() => !disabled && onSelect(config.key)}
                disabled={disabled}
                className="relative flex flex-col items-start gap-3 p-4 rounded-xl border text-left transition-all"
                style={{
                  background: isSelected
                    ? 'var(--tone-bg)'
                    : 'var(--sms-v8-surface)',
                  borderColor: isSelected
                    ? 'var(--tone-solid)'
                    : 'var(--sms-v8-border)',
                  opacity: disabled ? 0.6 : 1,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                }}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <IconFrame size="sm" tone="emerald" decorative>
                      <Check className="h-3 w-3" />
                    </IconFrame>
                  </div>
                )}
                <IconFrame size="sm" tone={config.tone} decorative>
                  {config.icon}
                </IconFrame>
                <div className="min-w-0">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: isSelected ? 'var(--tone-text)' : 'var(--sms-v8-text)' }}
                  >
                    {label}
                  </p>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {!selectedType && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
            style={{ background: 'var(--sms-v8-surface-2)', color: 'var(--sms-v8-text-3)', border: '1px solid var(--sms-v8-border)' }}
          >
            <span>{t('notSelected')}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

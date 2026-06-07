'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type { BrandOccasionContext, BrandOccasionMode } from '@/lib/brand/types';
import {
  CalendarDays,
  Moon,
  Gift,
  Flag,
  Tag,
  Rocket,
  MapPin,
  GraduationCap,
  Pencil,
  Check,
  Info,
} from 'lucide-react';

interface BrandOccasionContextPanelProps {
  initialContext?: BrandOccasionContext | null;
  onSave: (context: BrandOccasionContext) => void;
  disabled?: boolean;
}

const occasions: { key: BrandOccasionMode; icon: React.ReactNode; tone: 'violet' | 'sky' | 'emerald' | 'amber' | 'orange' | 'slate' }[] = [
  { key: 'ramadan', icon: <Moon className="h-4 w-4" />, tone: 'violet' },
  { key: 'eid', icon: <Gift className="h-4 w-4" />, tone: 'emerald' },
  { key: 'national_day', icon: <Flag className="h-4 w-4" />, tone: 'sky' },
  { key: 'sale', icon: <Tag className="h-4 w-4" />, tone: 'amber' },
  { key: 'launch', icon: <Rocket className="h-4 w-4" />, tone: 'orange' },
  { key: 'new_branch', icon: <MapPin className="h-4 w-4" />, tone: 'violet' },
  { key: 'back_to_school', icon: <GraduationCap className="h-4 w-4" />, tone: 'sky' },
  { key: 'custom', icon: <Pencil className="h-4 w-4" />, tone: 'slate' },
];

export function BrandOccasionContextPanel({ initialContext, onSave, disabled }: BrandOccasionContextPanelProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.occasionContext');

  const [expanded, setExpanded] = useState(true);
  const [enabled, setEnabled] = useState(!!initialContext?.enabled);
  const [selectedMode, setSelectedMode] = useState<BrandOccasionMode | undefined>(initialContext?.activeMode || undefined);

  const handleToggle = useCallback(() => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    if (newEnabled) {
      setExpanded(true);
    }
  }, [enabled]);

  const handleSave = useCallback(() => {
    onSave({ enabled, activeMode: selectedMode });
  }, [enabled, selectedMode, onSave]);

  return (
    <Card variant="subtle" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="amber" decorative>
            <CalendarDays className="h-5 w-5" />
          </IconFrame>
          <div className="flex-1">
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
          </div>
          <button
            onClick={handleToggle}
            disabled={disabled}
            className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
            style={{
              background: enabled ? 'var(--tone-solid)' : 'var(--sms-v8-surface-2)',
              cursor: disabled ? 'not-allowed' : 'pointer',
            }}
            type="button"
            role="switch"
            aria-checked={enabled}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full transition-transform"
              style={{
                background: 'var(--sms-v8-canvas)',
                translate: enabled ? '1.5rem' : '0.25rem',
              }}
            />
          </button>
        </div>
      </CardHeader>

      {expanded && (
        <CardContent className="space-y-4">
          {/* Explanation */}
          <div
            className="flex items-start gap-2.5 p-3 rounded-lg text-xs"
            style={{ background: 'var(--sms-v8-surface)', border: '1px solid var(--sms-v8-border)' }}
          >
            <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }} />
            <span style={{ color: 'var(--sms-v8-text-2)' }}>{t('explanation')}</span>
          </div>

          {/* Occasion choices */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {occasions.map((occ) => {
              const isSelected = selectedMode === occ.key;
              return (
                <button
                  key={occ.key}
                  onClick={() => setSelectedMode(occ.key)}
                  disabled={disabled || !enabled}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all"
                  style={{
                    background: isSelected ? 'var(--tone-bg)' : 'var(--sms-v8-surface)',
                    borderColor: isSelected ? 'var(--tone-solid)' : 'var(--sms-v8-border)',
                    opacity: !enabled ? 0.5 : 1,
                    cursor: !enabled || disabled ? 'not-allowed' : 'pointer',
                  }}
                  type="button"
                >
                  <IconFrame size="sm" tone={occ.tone} decorative>{occ.icon}</IconFrame>
                  <span
                    className="text-xs font-medium"
                    style={{ color: isSelected ? 'var(--tone-text)' : 'var(--sms-v8-text)' }}
                  >
                    {t(`modes.${occ.key}`)}
                  </span>
                  {isSelected && (
                    <IconFrame size="sm" tone="emerald" decorative className="absolute top-1 end-1">
                      <Check className="h-3 w-3" />
                    </IconFrame>
                  )}
                </button>
              );
            })}
          </div>

          <Button size="sm" onClick={handleSave} disabled={disabled} fullWidth>
            {t('save')}
          </Button>
        </CardContent>
      )}
    </Card>
  );
}

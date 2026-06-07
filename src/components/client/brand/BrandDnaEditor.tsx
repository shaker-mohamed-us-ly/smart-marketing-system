'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame, type IconFrameTone } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type { BrandDnaEditorInput } from '@/lib/brand/types';
import {
  Dna,
  ChevronDown,
  ChevronUp,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Users,
  Mic,
  Heart,
  Target,
  Sparkles,
  Eye,
  FileText,
  MousePointerClick,
  Gift,
  ShieldCheck,
  CalendarDays,
} from 'lucide-react';

interface BrandDnaEditorProps {
  initialData?: BrandDnaEditorInput;
  onSave: (data: BrandDnaEditorInput) => Promise<void>;
  onCancel?: () => void;
  isSaving?: boolean;
  saveSuccess?: boolean;
  saveError?: string | null;
}

interface FieldConfig {
  key: keyof BrandDnaEditorInput;
  icon: React.ReactNode;
  tone: IconFrameTone;
}

const coreFields: FieldConfig[] = [
  { key: 'audience', icon: <Users className="h-4 w-4" />, tone: 'sky' },
  { key: 'tone', icon: <Mic className="h-4 w-4" />, tone: 'violet' },
  { key: 'values', icon: <Heart className="h-4 w-4" />, tone: 'orange' },
  { key: 'positioning', icon: <Target className="h-4 w-4" />, tone: 'amber' },
  { key: 'differentiation', icon: <Sparkles className="h-4 w-4" />, tone: 'emerald' },
];

const advancedFields: FieldConfig[] = [
  { key: 'visualDirection', icon: <Eye className="h-4 w-4" />, tone: 'orange' },
  { key: 'contentRules', icon: <FileText className="h-4 w-4" />, tone: 'slate' },
  { key: 'ctaStyle', icon: <MousePointerClick className="h-4 w-4" />, tone: 'sky' },
  { key: 'offerStyle', icon: <Gift className="h-4 w-4" />, tone: 'violet' },
  { key: 'trustProof', icon: <ShieldCheck className="h-4 w-4" />, tone: 'emerald' },
  { key: 'seasonalNotes', icon: <CalendarDays className="h-4 w-4" />, tone: 'amber' },
];

export function BrandDnaEditor({
  initialData,
  onSave,
  onCancel,
  isSaving = false,
  saveSuccess = false,
  saveError = null,
}: BrandDnaEditorProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaEditor');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formData, setFormData] = useState<BrandDnaEditorInput>({
    identityType: initialData?.identityType,
    audience: initialData?.audience || '',
    tone: initialData?.tone || '',
    values: initialData?.values || '',
    positioning: initialData?.positioning || '',
    differentiation: initialData?.differentiation || '',
    visualDirection: initialData?.visualDirection || '',
    contentRules: initialData?.contentRules || '',
    ctaStyle: initialData?.ctaStyle || '',
    offerStyle: initialData?.offerStyle || '',
    trustProof: initialData?.trustProof || '',
    seasonalNotes: initialData?.seasonalNotes || '',
  });

  const handleChange = useCallback((field: keyof BrandDnaEditorInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    // Send all fields (including empty strings) so clearing a field persists
    const payload: BrandDnaEditorInput = {
      identityType: formData.identityType,
      audience: (formData.audience || '').trim(),
      tone: (formData.tone || '').trim(),
      values: (formData.values || '').trim(),
      positioning: (formData.positioning || '').trim(),
      differentiation: (formData.differentiation || '').trim(),
      visualDirection: (formData.visualDirection || '').trim(),
      contentRules: (formData.contentRules || '').trim(),
      ctaStyle: (formData.ctaStyle || '').trim(),
      offerStyle: (formData.offerStyle || '').trim(),
      trustProof: (formData.trustProof || '').trim(),
      seasonalNotes: (formData.seasonalNotes || '').trim(),
    };

    onSave(payload);
  }, [formData, onSave]);

  const renderField = (field: FieldConfig) => {
    const value = (formData[field.key] as string) || '';
    const label = t(`fields.${field.key}.label`);
    const placeholder = t(`fields.${field.key}.placeholder`);

    return (
      <div key={field.key}>
        <label
          className="flex items-center gap-2 text-xs font-medium mb-1.5"
          style={{ color: 'var(--sms-v8-text-3)' }}
        >
          <IconFrame size="sm" tone={field.tone} decorative>
            {field.icon}
          </IconFrame>
          {label}
        </label>
        <textarea
          value={value}
          onChange={(e) => handleChange(field.key, e.target.value)}
          disabled={isSaving}
          maxLength={300}
          rows={2}
          className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--sms-v8-accent)]/30 resize-y"
          style={{
            background: 'var(--sms-v8-surface)',
            borderColor: 'var(--sms-v8-border)',
            color: 'var(--sms-v8-text)',
          }}
          placeholder={placeholder}
        />
        {value.length > 0 && (
          <p className="text-[10px] mt-1 text-right" style={{ color: 'var(--sms-v8-text-3)' }}>
            {value.length}/300
          </p>
        )}
      </div>
    );
  };

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="violet" decorative>
            <Dna className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        {saveSuccess && (
          <div
            className="flex items-center gap-2 p-3 rounded-lg"
            style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--sms-v8-border)' }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>{t('success')}</p>
          </div>
        )}

        {saveError && (
          <div
            className="flex items-start gap-2 p-3 rounded-lg"
            style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}
          >
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>{saveError}</p>
          </div>
        )}

        {/* Core fields */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide mb-3" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('sections.core')}
          </p>
          <div className="space-y-4">
            {coreFields.map(renderField)}
          </div>
        </div>

        {/* Advanced toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 text-sm font-medium w-full"
          style={{ color: 'var(--sms-v8-text-2)' }}
          type="button"
        >
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {t('sections.advanced')}
        </button>

        {showAdvanced && (
          <div className="space-y-4 pt-2">
            {advancedFields.map(renderField)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          {onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              disabled={isSaving}
              className="flex-1"
            >
              {t('cancel')}
            </Button>
          )}
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1"
            icon={isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : undefined}
            iconPosition="start"
          >
            {isSaving ? t('saving') : t('save')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

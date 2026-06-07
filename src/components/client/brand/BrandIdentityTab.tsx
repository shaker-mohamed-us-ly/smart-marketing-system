'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import { BrandTypeSelector } from './BrandTypeSelector';
import { BrandDnaEditor } from './BrandDnaEditor';
import { BrandDnaPreview } from './BrandDnaPreview';
import { BrandDnaCanvas } from './BrandDnaCanvas';
import type { Brand, BrandCoreProfile, BrandIdentityType, BrandDnaEditorInput } from '@/lib/brand/types';
import {
  Fingerprint, Pencil, CheckCircle2, AlertCircle,
} from 'lucide-react';

interface BrandIdentityTabProps {
  brand: Brand;
  profile?: BrandCoreProfile | null;
  onBrandUpdated?: () => void;
}

function extractDnaFromProfile(profile?: BrandCoreProfile | null): {
  identityType?: BrandIdentityType | null;
  dna?: BrandDnaEditorInput | null;
} {
  if (!profile?.brand_dna) return {};
  const bd = profile.brand_dna as Record<string, unknown>;
  const dnaBlock = (bd.dna as Record<string, string>) || {};

  return {
    identityType: (bd.identityType as BrandIdentityType) || null,
    dna: {
      identityType: (bd.identityType as BrandIdentityType) || undefined,
      audience: dnaBlock.audience || '',
      tone: dnaBlock.tone || '',
      values: dnaBlock.values || '',
      positioning: dnaBlock.positioning || '',
      differentiation: dnaBlock.differentiation || '',
      visualDirection: dnaBlock.visualDirection || '',
      contentRules: dnaBlock.contentRules || '',
      ctaStyle: dnaBlock.ctaStyle || '',
      offerStyle: dnaBlock.offerStyle || '',
      trustProof: dnaBlock.trustProof || '',
      seasonalNotes: dnaBlock.seasonalNotes || '',
    },
  };
}

export function BrandIdentityTab({ brand, profile, onBrandUpdated }: BrandIdentityTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio');
  const tEditor = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaEditor');

  const { identityType: initialIdentityType, dna: initialDna } = extractDnaFromProfile(profile);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [localIdentityType, setLocalIdentityType] = useState<BrandIdentityType | null>(initialIdentityType || null);
  const [localDna, setLocalDna] = useState<BrandDnaEditorInput | null>(initialDna || null);

  const handleTypeSelect = useCallback((type: BrandIdentityType) => {
    setLocalIdentityType(type);
    setSaveSuccess(false);
  }, []);

  const handleSaveDna = useCallback(async (data: BrandDnaEditorInput) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { updateBrandDna } = await import('@/lib/brand/server-actions');
      const payload: BrandDnaEditorInput = {
        ...data,
        identityType: localIdentityType || undefined,
      };

      const result = await updateBrandDna(brand.id, payload);

      if (result.success) {
        setSaveSuccess(true);
        setIsEditing(false);
        setLocalDna(data);
        if (onBrandUpdated) {
          onBrandUpdated();
        }
      } else {
        setSaveError(tEditor('error'));
      }
    } catch (err) {
      console.error('[BrandIdentityTab] DNA save error:', err);
      setSaveError(tEditor('error'));
    } finally {
      setIsSaving(false);
    }
  }, [brand.id, localIdentityType, onBrandUpdated, tEditor]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
    // Reset to saved values
    setLocalIdentityType(initialIdentityType || null);
    setLocalDna(initialDna || null);
  }, [initialIdentityType, initialDna]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card variant="elevated" padding="lg" tone="violet">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconFrame size="md" tone="violet" decorative>
                <Fingerprint className="h-5 w-5" />
              </IconFrame>
              <div>
                <CardTitle className="text-base">{t('dnaSummary.title')}</CardTitle>
                <CardDescription className="text-sm">{t('dnaSummary.subtitle', { brandName: brand.name })}</CardDescription>
              </div>
            </div>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                icon={<Pencil className="h-4 w-4" />}
                iconPosition="start"
                onClick={() => setIsEditing(true)}
              >
                {tEditor('edit')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Honest status notice */}
          {saveSuccess && (
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--sms-v8-border)' }}
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>{tEditor('success')}</p>
            </div>
          )}

          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs"
            style={{ background: 'var(--sms-v8-surface)', color: 'var(--sms-v8-text-3)', border: '1px solid var(--sms-v8-border)' }}
          >
            <AlertCircle className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <span>{t('previewOnly')}</span>
          </div>
        </CardContent>
      </Card>

      {/* Brand Type Selector */}
      <BrandTypeSelector
        selectedType={localIdentityType}
        onSelect={handleTypeSelect}
        disabled={isSaving}
      />

      {/* DNA Editor or Preview */}
      {isEditing ? (
        <BrandDnaEditor
          initialData={localDna ? { ...localDna, identityType: localIdentityType || undefined } : undefined}
          onSave={handleSaveDna}
          onCancel={handleCancel}
          isSaving={isSaving}
          saveSuccess={saveSuccess}
          saveError={saveError}
        />
      ) : (
        <BrandDnaPreview
          dna={localDna}
          identityType={localIdentityType}
        />
      )}

      {/* Legacy DNA Canvas (compact, honest preview) */}
      <BrandDnaCanvas brand={brand} compact />
    </div>
  );
}

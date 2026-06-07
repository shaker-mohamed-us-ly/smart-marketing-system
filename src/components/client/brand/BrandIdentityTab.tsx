'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { BrandTypeSelector } from './BrandTypeSelector';
import { BrandDnaEditor } from './BrandDnaEditor';
import { BrandDnaPreview } from './BrandDnaPreview';
import { BrandDnaCanvas } from './BrandDnaCanvas';
import { BrandOperatingProfileBuilder } from './BrandOperatingProfileBuilder';
import { BrandOperatingProfilePreview } from './BrandOperatingProfilePreview';
import { BrandOccasionContextPanel } from './BrandOccasionContextPanel';
import { BrandProfileIntelligenceHero } from './BrandProfileIntelligenceHero';
import { BrandStrategyUseMap } from './BrandStrategyUseMap';
import { Card, CardContent } from '@/components/shared/Card';
import { AlertTriangle } from 'lucide-react';
import type {
  Brand,
  BrandCoreProfile,
  BrandIdentityType,
  BrandDnaEditorInput,
  BrandOperatingProfile,
  BrandOccasionContext,
} from '@/lib/brand/types';

interface BrandIdentityTabProps {
  brand: Brand;
  profile?: BrandCoreProfile | null;
  onBrandUpdated?: () => void;
}

function extractIdentityData(profile?: BrandCoreProfile | null): {
  identityType?: BrandIdentityType | null;
  operatingProfile?: BrandOperatingProfile | null;
  occasionContext?: BrandOccasionContext | null;
  dna?: BrandDnaEditorInput | null;
} {
  if (!profile?.brand_dna) return {};
  const bd = profile.brand_dna as Record<string, unknown>;
  const dnaBlock = (bd.dna as Record<string, string>) || {};

  return {
    identityType: (bd.identityType as BrandIdentityType) || null,
    operatingProfile: (bd.operatingProfile as BrandOperatingProfile) || null,
    occasionContext: (bd.occasionContext as BrandOccasionContext) || null,
    dna: {
      identityType: (bd.identityType as BrandIdentityType) || undefined,
      operatingProfile: (bd.operatingProfile as BrandOperatingProfile) || undefined,
      occasionContext: (bd.occasionContext as BrandOccasionContext) || undefined,
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

  const {
    identityType: initialIdentityType,
    operatingProfile: initialOperatingProfile,
    occasionContext: initialOccasionContext,
    dna: initialDna,
  } = extractIdentityData(profile);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [localIdentityType, setLocalIdentityType] = useState<BrandIdentityType | null>(initialIdentityType || null);
  const [localOperatingProfile, setLocalOperatingProfile] = useState<BrandOperatingProfile | null>(initialOperatingProfile || null);
  const [localOccasionContext, setLocalOccasionContext] = useState<BrandOccasionContext | null>(initialOccasionContext || null);
  const [localDna, setLocalDna] = useState<BrandDnaEditorInput | null>(initialDna || null);

  const hasDna = !!localDna && Object.entries(localDna).some(([k, v]) => {
    if (k === 'identityType' || k === 'operatingProfile' || k === 'occasionContext') return false;
    return typeof v === 'string' && v.trim().length > 0;
  });

  const handleTypeSelect = useCallback((type: BrandIdentityType) => {
    setLocalIdentityType(type);
    setSaveSuccess(false);
  }, []);

  const handleSaveOperatingProfile = useCallback(async (op: BrandOperatingProfile) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { updateBrandDna } = await import('@/lib/brand/server-actions');
      const payload: BrandDnaEditorInput = {
        ...(localDna || {}),
        identityType: localIdentityType || undefined,
        operatingProfile: op,
        occasionContext: localOccasionContext || undefined,
      };

      const result = await updateBrandDna(brand.id, payload);

      if (result.success) {
        setSaveSuccess(true);
        setLocalOperatingProfile(op);
        if (onBrandUpdated) onBrandUpdated();
      } else {
        setSaveError(tEditor('error'));
      }
    } catch (err) {
      console.error('[BrandIdentityTab] profile save error:', err);
      setSaveError(tEditor('error'));
    } finally {
      setIsSaving(false);
    }
  }, [brand.id, localDna, localIdentityType, localOccasionContext, onBrandUpdated, tEditor]);

  const handleSaveOccasionContext = useCallback(async (oc: BrandOccasionContext) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { updateBrandDna } = await import('@/lib/brand/server-actions');
      const payload: BrandDnaEditorInput = {
        ...(localDna || {}),
        identityType: localIdentityType || undefined,
        operatingProfile: localOperatingProfile || undefined,
        occasionContext: oc,
      };

      const result = await updateBrandDna(brand.id, payload);

      if (result.success) {
        setSaveSuccess(true);
        setLocalOccasionContext(oc);
        if (onBrandUpdated) onBrandUpdated();
      } else {
        setSaveError(tEditor('error'));
      }
    } catch (err) {
      console.error('[BrandIdentityTab] occasion save error:', err);
      setSaveError(tEditor('error'));
    } finally {
      setIsSaving(false);
    }
  }, [brand.id, localDna, localIdentityType, localOperatingProfile, onBrandUpdated, tEditor]);

  const handleSaveDna = useCallback(async (data: BrandDnaEditorInput) => {
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { updateBrandDna } = await import('@/lib/brand/server-actions');
      const payload: BrandDnaEditorInput = {
        ...data,
        identityType: localIdentityType || undefined,
        operatingProfile: localOperatingProfile || undefined,
        occasionContext: localOccasionContext || undefined,
      };

      const result = await updateBrandDna(brand.id, payload);

      if (result.success) {
        setSaveSuccess(true);
        setIsEditing(false);
        setLocalDna(data);
        if (onBrandUpdated) onBrandUpdated();
      } else {
        setSaveError(tEditor('error'));
      }
    } catch (err) {
      console.error('[BrandIdentityTab] DNA save error:', err);
      setSaveError(tEditor('error'));
    } finally {
      setIsSaving(false);
    }
  }, [brand.id, localIdentityType, localOperatingProfile, localOccasionContext, onBrandUpdated, tEditor]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
    setLocalIdentityType(initialIdentityType || null);
    setLocalOperatingProfile(initialOperatingProfile || null);
    setLocalOccasionContext(initialOccasionContext || null);
    setLocalDna(initialDna || null);
  }, [initialIdentityType, initialOperatingProfile, initialOccasionContext, initialDna]);

  return (
    <div className="space-y-6">
      {/* Hero Intelligence Panel */}
      <BrandProfileIntelligenceHero
        profile={localOperatingProfile}
        hasDna={hasDna}
        onBuildProfile={() => setIsEditing(true)}
        onEditDna={() => setIsEditing(true)}
        disabled={isSaving}
      />

      {/* Operating Profile Builder */}
      <BrandOperatingProfileBuilder
        initialProfile={localOperatingProfile}
        onSave={handleSaveOperatingProfile}
        disabled={isSaving}
      />

      {/* Operating Profile Preview (when saved) */}
      {localOperatingProfile?.businessModel && (
        <BrandOperatingProfilePreview profile={localOperatingProfile} />
      )}

      {/* Legacy seasonal notice */}
      {initialIdentityType === 'seasonal' && (
        <Card variant="subtle" padding="md">
          <CardContent className="flex items-start gap-3">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }} />
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
                {t('legacySeasonalNoticeTitle')}
              </p>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('legacySeasonalNoticeDescription')}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Legacy Brand Type Selector (preserve existing data) */}
      {initialIdentityType && (
        <BrandTypeSelector
          selectedType={localIdentityType}
          onSelect={handleTypeSelect}
          disabled={isSaving}
        />
      )}

      {/* Occasion Context Panel */}
      <BrandOccasionContextPanel
        initialContext={localOccasionContext}
        onSave={handleSaveOccasionContext}
        disabled={isSaving}
      />

      {/* DNA Editor or Preview */}
      {isEditing ? (
        <BrandDnaEditor
          initialData={localDna ? {
            ...localDna,
            identityType: localIdentityType || undefined,
            operatingProfile: localOperatingProfile || undefined,
            occasionContext: localOccasionContext || undefined,
          } : undefined}
          onSave={handleSaveDna}
          onCancel={handleCancel}
          isSaving={isSaving}
          saveSuccess={saveSuccess}
          saveError={saveError}
        />
      ) : (
        <>
          <BrandDnaPreview
            dna={localDna}
            identityType={localIdentityType}
          />
          <BrandStrategyUseMap
            dna={localDna}
            profile={localOperatingProfile}
          />
        </>
      )}

      {/* Legacy DNA Canvas */}
      <BrandDnaCanvas brand={brand} compact />
    </div>
  );
}

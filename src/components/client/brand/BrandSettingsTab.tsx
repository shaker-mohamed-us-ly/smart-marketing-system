'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import type { Brand } from '@/lib/brand/types';
import {
  Settings,
  Building2,
  FileText,
  Globe,
  Tag,
  Trash2,
  Pencil,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image,
  Upload,
  X,
} from 'lucide-react';

interface BrandSettingsTabProps {
  brand: Brand;
  onBrandUpdated?: () => void;
}

export function BrandSettingsTab({ brand, onBrandUpdated }: BrandSettingsTabProps) {
  const t = useTranslations('clientBrand.v1.ui.details.settingsTab');
  const tForm = useTranslations('clientBrand.v1.ui.form');

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: brand.name,
    industry: brand.industry,
    description: brand.description || '',
    website: brand.website || '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoSuccess, setLogoSuccess] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setLogoError(null);
    setLogoSuccess(false);

    try {
      const { validateBrandLogoFile } = await import('@/lib/brand/validation');
      const validation = validateBrandLogoFile(file);
      if (!validation.valid) {
        setLogoError(validation.error || t('logoUploadErrorGeneric'));
        setLogoUploading(false);
        return;
      }

      const { uploadBrandLogo } = await import('@/lib/brand/server-actions');
      const result = await uploadBrandLogo(brand.id, file);

      if (result.success && result.data) {
        setLogoSuccess(true);
        if (onBrandUpdated) {
          onBrandUpdated();
        }
      } else {
        setLogoError(t('logoUploadErrorGeneric'));
      }
    } catch (error) {
      console.error('[BrandSettingsTab] logo upload error:', error);
      setLogoError(t('logoUploadErrorGeneric'));
    } finally {
      setLogoUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLogoButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleEdit = () => {
    setFormData({
      name: brand.name,
      industry: brand.industry,
      description: brand.description || '',
      website: brand.website || '',
    });
    setSaveError(null);
    setSaveSuccess(false);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveError(null);
    setSaveSuccess(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (saveError) setSaveError(null);
    if (saveSuccess) setSaveSuccess(false);
  };

  const validateForm = (): string | null => {
    if (!formData.name.trim()) return t('validationNameRequired');
    if (formData.name.trim().length < 3) return t('validationNameMin');
    if (!formData.industry.trim()) return t('validationIndustryRequired');
    if (formData.description.trim().length > 0 && formData.description.trim().length < 10) {
      return t('validationDescriptionMin');
    }
    if (formData.website.trim()) {
      const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
      if (!urlRegex.test(formData.website.trim())) {
        return t('validationWebsiteInvalid');
      }
    }
    return null;
  };

  const normalizeWebsite = (value: string): string | undefined => {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return `https://${trimmed}`;
    }
    return trimmed;
  };

  const handleSave = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSaveError(validationError);
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    try {
      const { updateBrand } = await import('@/lib/brand/server-actions');

      const updatePayload: Record<string, string | undefined> = {
        name: formData.name.trim(),
        industry: formData.industry.trim(),
      };

      // Only send description if it meets minimum length or is non-empty
      const descTrimmed = formData.description.trim();
      if (descTrimmed.length >= 10) {
        updatePayload.description = descTrimmed;
      }

      const normalizedWebsite = normalizeWebsite(formData.website);
      if (normalizedWebsite !== undefined) {
        updatePayload.website = normalizedWebsite;
      }

      const result = await updateBrand(brand.id, updatePayload);

      if (result.success && result.data) {
        setSaveSuccess(true);
        setIsEditing(false);
        if (onBrandUpdated) {
          onBrandUpdated();
        }
      } else {
        const code = result.error?.code;
        let message: string;
        switch (code) {
          case 'BRAND_AUTH_REQUIRED':
            message = tForm('authRequired');
            break;
          case 'BRAND_ENV_MISSING':
            message = tForm('envMissing');
            break;
          case 'BRAND_RLS_DENIED':
            message = tForm('rlsDenied');
            break;
          case 'BRAND_DUPLICATE_NAME':
            message = tForm('duplicateName');
            break;
          case 'BRAND_NOT_FOUND':
            message = t('brandNotFound');
            break;
          default:
            message = t('saveErrorGeneric');
        }
        setSaveError(message);
      }
    } catch (error) {
      console.error('[BrandSettingsTab] save error:', error);
      setSaveError(t('saveErrorGeneric'));
    } finally {
      setIsSaving(false);
    }
  };

  const infoItems = [
    { icon: <Building2 className="h-4 w-4" />, label: t('fields.name'), value: brand.name },
    { icon: <Tag className="h-4 w-4" />, label: t('fields.industry'), value: brand.industry },
    { icon: <FileText className="h-4 w-4" />, label: t('fields.description'), value: brand.description || t('noDescription') },
    { icon: <Globe className="h-4 w-4" />, label: t('fields.website'), value: brand.website || t('noWebsite') },
  ];

  return (
    <div className="space-y-6">
      {/* Header card */}
      <Card variant="elevated" padding="lg" tone="slate">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="slate" decorative>
              <Settings className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-base">{t('title')}</CardTitle>
              <CardDescription className="text-sm">{t('subtitle', { brandName: brand.name })}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
            {t('description')}
          </p>
        </CardContent>
      </Card>

      {/* Success banner */}
      {saveSuccess && (
        <Card variant="subtle" padding="md" className="border" style={{ borderColor: 'var(--sms-v8-border)' }}>
          <CardContent className="flex items-center gap-3 py-3">
            <IconFrame size="sm" tone="emerald" decorative>
              <CheckCircle2 className="h-4 w-4" />
            </IconFrame>
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
              {t('saveSuccess')}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Brand info — View Mode */}
      {!isEditing ? (
        <Card variant="bordered" padding="md">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">{t('infoTitle')}</CardTitle>
              <Button variant="ghost" size="sm" icon={<Pencil className="h-4 w-4" />} iconPosition="start" onClick={handleEdit}>
                {t('edit')}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {infoItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <IconFrame size="sm" tone="slate" decorative className="mt-0.5">
                  {item.icon}
                </IconFrame>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>
                    {item.label}
                  </p>
                  <p className="text-sm font-medium truncate" style={{ color: 'var(--sms-v8-text)' }}>
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode Form */
        <Card variant="bordered" padding="md">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold">{t('infoTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error banner */}
            {saveError && (
              <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}>
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
                <p className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>{saveError}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="brand-name" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('fields.name')}
              </label>
              <input
                id="brand-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--sms-v8-accent)]/30"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                  color: 'var(--sms-v8-text)',
                }}
                disabled={isSaving}
                minLength={3}
                maxLength={100}
              />
            </div>

            {/* Industry */}
            <div>
              <label htmlFor="brand-industry" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('fields.industry')}
              </label>
              <input
                id="brand-industry"
                type="text"
                value={formData.industry}
                onChange={(e) => handleChange('industry', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--sms-v8-accent)]/30"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                  color: 'var(--sms-v8-text)',
                }}
                disabled={isSaving}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="brand-description" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('fields.description')}
              </label>
              <textarea
                id="brand-description"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--sms-v8-accent)]/30 min-h-[80px] resize-y"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                  color: 'var(--sms-v8-text)',
                }}
                disabled={isSaving}
                minLength={10}
                maxLength={500}
              />
              <p className="text-xs mt-1" style={{ color: 'var(--sms-v8-text-3)' }}>
                {formData.description.length}/500
              </p>
            </div>

            {/* Website */}
            <div>
              <label htmlFor="brand-website" className="block text-xs font-medium mb-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('fields.website')}
              </label>
              <input
                id="brand-website"
                type="text"
                inputMode="url"
                autoComplete="url"
                value={formData.website}
                onChange={(e) => handleChange('website', e.target.value)}
                className="w-full px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 focus:ring-[var(--sms-v8-accent)]/30"
                style={{
                  background: 'var(--sms-v8-surface)',
                  borderColor: 'var(--sms-v8-border)',
                  color: 'var(--sms-v8-text)',
                }}
                disabled={isSaving}
                placeholder="https://example.com"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isSaving}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
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
      )}

      {/* Logo Card */}
      <Card variant="bordered" padding="md">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold">{t('logoTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {logoSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--sms-v8-border)' }}>
              <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
              <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>{t('logoUploadSuccess')}</p>
            </div>
          )}
          {logoError && (
            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}>
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
              <p className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>{logoError}</p>
            </div>
          )}

          <div className="flex items-center gap-4">
            {brand.logo_url ? (
              <div className="relative">
                <img
                  src={brand.logo_url}
                  alt={brand.name}
                  className="w-20 h-20 rounded-xl object-contain border"
                  style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface)' }}
                />
              </div>
            ) : (
              <div
                className="w-20 h-20 rounded-xl border flex items-center justify-center"
                style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface-2)' }}
              >
                <Image className="h-8 w-8" style={{ color: 'var(--sms-v8-text-3)' }} />
              </div>
            )}

            <div className="flex-1 min-w-0">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogoButtonClick}
                disabled={logoUploading}
                icon={logoUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                iconPosition="start"
              >
                {logoUploading ? t('logoUploading') : brand.logo_url ? t('logoChange') : t('logoUpload')}
              </Button>
              <p className="text-xs mt-1.5" style={{ color: 'var(--sms-v8-text-3)' }}>
                {t('logoUploadHint')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit notice */}
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <Settings className="h-4 w-4" />
          </IconFrame>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
              {t('editNoticeTitle')}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('editNoticeDescription')}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone preview */}
      <Card
        variant="subtle"
        padding="md"
        className="border"
        style={{ borderColor: 'var(--sms-v8-border)' }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <IconFrame size="sm" tone="amber" decorative>
              <Trash2 className="h-4 w-4" />
            </IconFrame>
            <CardTitle className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
              {t('dangerZoneTitle')}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
            {t('dangerZoneDescription')}
          </p>
          <Button
            variant="outline"
            size="sm"
            disabled
            fullWidth
            icon={<Trash2 className="h-4 w-4" />}
            iconPosition="start"
          >
            {t('deleteDisabled')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

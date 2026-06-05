'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

interface BrandCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBrandCreated?: () => void;
}

export function BrandCreateDialog({ open, onOpenChange, onBrandCreated }: BrandCreateDialogProps) {
  const t = useTranslations('clientBrand.v1.ui');
  const tForm = useTranslations('clientBrand.v1.ui.form');
  const tBrandTypes = useTranslations('clientBrand.v1.ui.brandTypes');
  
  const [formData, setFormData] = useState({
    name: '',
    brandType: '',
    industry: '',
    description: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [websiteError, setWebsiteError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitErrorCode, setSubmitErrorCode] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const brandTypeOptions = [
    { value: 'ecommerce_store', label: tBrandTypes('ecommerce_store') },
    { value: 'local_store', label: tBrandTypes('local_store') },
    { value: 'company', label: tBrandTypes('company') },
    { value: 'service', label: tBrandTypes('service') },
    { value: 'personal_brand', label: tBrandTypes('personal_brand') },
    { value: 'restaurant_cafe', label: tBrandTypes('restaurant_cafe') },
    { value: 'clinic_health_center', label: tBrandTypes('clinic_health_center') },
    { value: 'agency_service_office', label: tBrandTypes('agency_service_office') },
    { value: 'single_product', label: tBrandTypes('single_product') },
    { value: 'startup', label: tBrandTypes('startup') },
    { value: 'other', label: tBrandTypes('other') },
  ];

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setLogoError(tForm('logoHint'));
      setLogoFile(null);
      setLogoPreview(null);
      return;
    }

    // Validate file size (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      setLogoError(tForm('logoSizeError'));
      setLogoFile(null);
      setLogoPreview(null);
      return;
    }

    setLogoError(null);
    setLogoFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setLogoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setLogoError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateWebsite = (value: string): string | null => {
    if (!value.trim()) return null;
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i;
    if (!urlRegex.test(value.trim())) {
      return tForm('websiteInvalid');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitErrorCode(null);
    setWebsiteError(null);

    // Validate website
    const websiteValidation = validateWebsite(formData.website);
    if (websiteValidation) {
      setWebsiteError(websiteValidation);
      setIsSubmitting(false);
      return;
    }

    try {
      const { createBrand } = await import('@/lib/brand/server-actions');
      
      const result = await createBrand({
        name: formData.name,
        brandType: formData.brandType,
        industry: formData.industry,
        description: formData.description,
        website: normalizeWebsite(formData.website),
        logo: logoFile || undefined,
      });

      if (result.success) {
        // Success: close dialog, reset form, refresh list
        onOpenChange(false);
        setFormData({ name: '', brandType: '', industry: '', description: '', website: '' });
        setLogoFile(null);
        setLogoPreview(null);
        setLogoError(null);
        setSubmitError(null);
        setSubmitErrorCode(null);
        if (onBrandCreated) {
          onBrandCreated();
        }
      } else {
        // Error: map error code to localized message, keep form data
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
          default:
            message = tForm('createBrandGenericError');
        }
        console.error(result.error);
        setSubmitError(message);
        setSubmitErrorCode(code ?? 'BRAND_UNKNOWN');
      }
    } catch (error) {
      console.error(error);
      setSubmitError(tForm('createBrandGenericError'));
      setSubmitErrorCode('BRAND_UNKNOWN');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onOpenChange(false);
      setFormData({ name: '', brandType: '', industry: '', description: '', website: '' });
      setLogoFile(null);
      setLogoPreview(null);
      setLogoError(null);
      setWebsiteError(null);
      setSubmitError(null);
      setSubmitErrorCode(null);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-lg rounded-xl border border-border/60 bg-card p-6 shadow-lg">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{tForm('title')}</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Brand Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              {tForm('nameLabel')}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={tForm('namePlaceholder')}
              className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
              minLength={3}
              maxLength={100}
            />
          </div>

          {/* Brand Type */}
          <div>
            <label htmlFor="brandType" className="block text-sm font-medium mb-2">
              {tForm('brandTypeLabel')}
            </label>
            <select
              id="brandType"
              value={formData.brandType}
              onChange={(e) => setFormData({ ...formData, brandType: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            >
              <option value="">{tForm('brandTypePlaceholder')}</option>
              {brandTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Industry */}
          <div>
            <label htmlFor="industry" className="block text-sm font-medium mb-2">
              {tForm('industryLabel')}
            </label>
            <input
              id="industry"
              type="text"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder={tForm('industryPlaceholder')}
              className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2">
              {tForm('descriptionLabel')}
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder={tForm('descriptionPlaceholder')}
              className="w-full px-3 py-2 rounded-lg border border-border/60 bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px] resize-y"
              required
              minLength={10}
              maxLength={500}
            />
          </div>

          {/* Website (Optional) */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-2">
              {tForm('websiteLabel')}
            </label>
            <input
              id="website"
              type="text"
              inputMode="url"
              autoComplete="url"
              value={formData.website}
              onChange={(e) => {
                setFormData({ ...formData, website: e.target.value });
                if (websiteError) setWebsiteError(null);
              }}
              placeholder={tForm('websitePlaceholder')}
              className={`w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                websiteError ? 'border-destructive' : 'border-border/60'
              }`}
            />
            {websiteError && (
              <p className="text-sm text-destructive mt-1">{websiteError}</p>
            )}
          </div>

          {/* Logo Upload */}
          <div>
            <label htmlFor="brand-logo-upload" className="block text-sm font-medium mb-2">
              {tForm('logoLabel')}
            </label>
            <input
              ref={fileInputRef}
              id="brand-logo-upload"
              type="file"
              accept="image/png,image/jpeg,image/webp,image/svg+xml"
              onChange={handleLogoChange}
              className="hidden"
            />
            
            {logoPreview ? (
              <div className="relative w-full">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="w-full h-32 object-contain rounded-lg border border-border/60 bg-muted/30"
                />
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  aria-label={tForm('removeLogo')}
                  className="absolute top-2 right-2 p-1 rounded-full bg-background border border-border/60 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="brand-logo-upload"
                className="flex flex-col items-center justify-center w-full px-3 py-8 rounded-lg border-2 border-dashed border-border/60 bg-muted/30 text-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">{tForm('logoHint')}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tForm('logoStageHint')}
                </p>
              </label>
            )}
            
            {logoError && (
              <p className="text-sm text-destructive mt-1">{logoError}</p>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{submitError}</p>
              {submitErrorCode === 'BRAND_AUTH_REQUIRED' && (
                <p className="text-xs text-muted-foreground mt-1">{tForm('signInHint')}</p>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              {tForm('cancel')}
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? tForm('submitLoading') : tForm('submit')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

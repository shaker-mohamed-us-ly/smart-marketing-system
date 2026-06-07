'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/shared/Button';
import { IconFrame } from '@/components/shared/IconFrame';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import type { Brand } from '@/lib/brand/types';
import {
  Image,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from 'lucide-react';

interface BrandLogoUploadFieldProps {
  brand: Brand;
  onBrandUpdated?: () => void;
  compact?: boolean;
}

export function BrandLogoUploadField({ brand, onBrandUpdated, compact }: BrandLogoUploadFieldProps) {
  const t = useTranslations('clientBrand.v1.ui.details.assetsTab');
  const tSettings = useTranslations('clientBrand.v1.ui.details.settingsTab');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoSuccess, setLogoSuccess] = useState(false);

  const handleLogoUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setLogoUploading(true);
      setLogoError(null);
      setLogoSuccess(false);

      try {
        const { validateBrandLogoFile } = await import('@/lib/brand/validation');
        const validation = validateBrandLogoFile(file);
        if (!validation.valid) {
          setLogoError(validation.error || tSettings('logoUploadErrorGeneric'));
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
          const code = result.error?.code;
          let message: string;
          switch (code) {
            case 'BRAND_AUTH_REQUIRED':
              message = tSettings('authRequired');
              break;
            case 'BRAND_LOGO_UPLOAD_FAILED':
              message = t('logoUploadFailed');
              break;
            case 'BRAND_CREATE_VALIDATION':
              message = t('logoValidationFailed');
              break;
            default:
              message = tSettings('logoUploadErrorGeneric');
          }
          setLogoError(message);
        }
      } catch {
        setLogoError(tSettings('logoUploadErrorGeneric'));
      } finally {
        setLogoUploading(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    },
    [brand.id, onBrandUpdated, t, tSettings]
  );

  const handleLogoButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const dismissSuccess = useCallback(() => setLogoSuccess(false), []);
  const dismissError = useCallback(() => setLogoError(null), []);

  if (compact) {
    return (
      <div className="space-y-3">
        {logoSuccess && (
          <div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--sms-v8-border)' }}>
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
            <p className="text-sm font-medium flex-1" style={{ color: 'var(--sms-v8-text)' }}>{tSettings('logoUploadSuccess')}</p>
            <button onClick={dismissSuccess} className="shrink-0" style={{ color: 'var(--sms-v8-text-3)' }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {logoError && (
          <div className="flex items-start gap-2 p-2 rounded-lg" style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}>
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-sm flex-1" style={{ color: 'var(--sms-v8-text-2)' }}>{logoError}</p>
            <button onClick={dismissError} className="shrink-0" style={{ color: 'var(--sms-v8-text-3)' }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-3">
          {brand.logo_url ? (
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="w-12 h-12 rounded-lg object-contain border"
              style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface)' }}
            />
          ) : (
            <div
              className="w-12 h-12 rounded-lg border flex items-center justify-center"
              style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface-2)' }}
            >
              <Image className="h-5 w-5" style={{ color: 'var(--sms-v8-text-3)' }} />
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
              {logoUploading ? tSettings('logoUploading') : brand.logo_url ? tSettings('logoChange') : tSettings('logoUpload')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card variant="bordered" padding="md">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">{t('logoCardTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {logoSuccess && (
          <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid var(--sms-v8-border)' }}>
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
            <p className="text-sm font-medium flex-1" style={{ color: 'var(--sms-v8-text)' }}>{tSettings('logoUploadSuccess')}</p>
            <button onClick={dismissSuccess} className="shrink-0" style={{ color: 'var(--sms-v8-text-3)' }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        {logoError && (
          <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}>
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className="text-sm flex-1" style={{ color: 'var(--sms-v8-text-2)' }}>{logoError}</p>
            <button onClick={dismissError} className="shrink-0" style={{ color: 'var(--sms-v8-text-3)' }}>
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-4">
          {brand.logo_url ? (
            <div className="relative">
              <img
                src={brand.logo_url}
                alt={brand.name}
                className="w-24 h-24 rounded-xl object-contain border"
                style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface)' }}
              />
            </div>
          ) : (
            <div
              className="w-24 h-24 rounded-xl border flex items-center justify-center"
              style={{ borderColor: 'var(--sms-v8-border)', background: 'var(--sms-v8-surface-2)' }}
            >
              <IconFrame size="md" tone="slate" decorative>
                <Image className="h-8 w-8" style={{ color: 'var(--sms-v8-text-3)' }} />
              </IconFrame>
            </div>
          )}

          <div className="flex-1 min-w-0 space-y-2">
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
              {logoUploading ? tSettings('logoUploading') : brand.logo_url ? t('logoChange') : t('logoUpload')}
            </Button>
            <p className="text-xs" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('logoRequirements')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

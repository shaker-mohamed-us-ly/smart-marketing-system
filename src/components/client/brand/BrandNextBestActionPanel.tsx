'use client';

import { useTranslations } from 'next-intl';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import { Lightbulb, ArrowLeft, Plus, Users, Fingerprint, Link2 } from 'lucide-react';
import Link from 'next/link';
import type { Brand } from '@/lib/brand/types';

interface BrandNextBestActionPanelProps {
  brands: Brand[];
  onCreateBrand: () => void;
}

export function BrandNextBestActionPanel({ brands, onCreateBrand }: BrandNextBestActionPanelProps) {
  const t = useTranslations('clientBrand.v1.ui.nextBestAction');
  const tStatus = useTranslations('clientBrand.v1.ui.status');
  const hasBrands = brands.length > 0;
  const firstBrand = brands[0];

  return (
    <section
      data-tone="violet"
      className="relative overflow-hidden rounded-2xl mb-8 group"
      style={{
        background: 'linear-gradient(135deg, var(--sms-v8-panel) 0%, var(--sms-v8-surface) 100%)',
        border: '1px solid var(--sms-v8-border-strong)',
        borderLeftWidth: '4px',
        borderLeftColor: 'var(--tone-solid)',
        boxShadow: 'var(--sms-v8-shadow-panel)',
        transition: 'transform 200ms var(--sms-v8-motion-ease), box-shadow 200ms ease',
      }}
    >
      {/* Subtle radial glow accent */}
      <div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-[0.06] pointer-events-none"
        style={{ background: 'var(--tone-solid)' }}
      />

      <div className="relative p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          {/* Large Icon */}
          <div className="shrink-0">
            <IconFrame size="lg" tone="violet" decorative>
              <Lightbulb className="h-7 w-7" />
            </IconFrame>
          </div>

          <div className="flex-1 min-w-0">
            {/* Title — much larger than V2 */}
            <h2
              className="text-xl sm:text-2xl font-bold mb-2"
              style={{ color: 'var(--sms-v8-text)' }}
            >
              {hasBrands
                ? t('hasBrandsTitle', { name: firstBrand?.name || '' })
                : t('noBrandsTitle')}
            </h2>

            {/* Description — readable size */}
            <p
              className="text-sm sm:text-base mb-4 max-w-xl leading-relaxed"
              style={{ color: 'var(--sms-v8-text-2)' }}
            >
              {hasBrands ? t('hasBrandsDescription') : t('noBrandsDescription')}
            </p>

            {/* Honest status chips — real data only */}
            <div className="flex flex-wrap gap-2 mb-2">
              {/* Brand count chip */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  background: 'var(--tone-bg)',
                  color: 'var(--tone-text)',
                  border: '1px solid var(--tone-border)',
                }}
              >
                <Users className="h-3 w-3" />
                {tStatus('brandsCount', { count: brands.length })}
              </span>

              {/* Identity status chip */}
              {hasBrands ? (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                  style={{
                    background: 'var(--tone-bg)',
                    color: 'var(--tone-text)',
                    border: '1px solid var(--tone-border)',
                  }}
                >
                  <Fingerprint className="h-3 w-3" />
                  {tStatus('identityPending')}
                </span>
              ) : (
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold opacity-70"
                  style={{
                    background: 'var(--sms-v8-surface-2)',
                    color: 'var(--sms-v8-text-3)',
                    border: '1px solid var(--sms-v8-border)',
                  }}
                >
                  <Fingerprint className="h-3 w-3" />
                  {tStatus('identityNone')}
                </span>
              )}

              {/* Channels chip — always honest */}
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold opacity-70"
                style={{
                  background: 'var(--sms-v8-surface-2)',
                  color: 'var(--sms-v8-text-3)',
                  border: '1px solid var(--sms-v8-border)',
                }}
              >
                <Link2 className="h-3 w-3" />
                {tStatus('channelsComingSoon')}
              </span>
            </div>
          </div>

          {/* Prominent CTA — one primary action only */}
          <div className="shrink-0 self-start sm:self-center pt-1">
            {hasBrands ? (
              <Link href={`/client/brand/${firstBrand.id}`} className="shrink-0">
                <Button
                  size="md"
                  tone="violet"
                  icon={<ArrowLeft className="h-4 w-4" />}
                  iconPosition="start"
                  className="shadow-md hover:shadow-lg"
                >
                  {t('hasBrandsCta')}
                </Button>
              </Link>
            ) : (
              <Button
                size="md"
                tone="violet"
                onClick={onCreateBrand}
                icon={<Plus className="h-4 w-4" />}
                iconPosition="start"
                className="shadow-md hover:shadow-lg"
              >
                {t('noBrandsCta')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

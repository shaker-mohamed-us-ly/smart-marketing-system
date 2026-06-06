import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { BrandLogoAura } from './BrandLogoAura';
import { MoreHorizontal, Pencil, ArrowLeft, Trash2, Sparkles } from 'lucide-react';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    industry: string;
    description: string;
    logo_url: string | null;
    status: string;
    onboarding_status: string;
    created_at: string;
  };
}

function onboardingTone(status: string): 'slate' | 'amber' | 'emerald' {
  switch (status) {
    case 'ready':
      return 'emerald';
    case 'channels_connected':
      return 'amber';
    case 'profile_complete':
      return 'amber';
    default:
      return 'slate';
  }
}

export function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('clientBrand.v1.ui.card');
  const tone = onboardingTone(brand.onboarding_status);

  return (
    <Card variant="interactive" padding="md" tone={tone} className="group relative overflow-hidden">
      <CardHeader className="flex items-start justify-between mb-0 pb-0 gap-3">
        {/* Logo with Aura */}
        <BrandLogoAura
          brandName={brand.name}
          industry={brand.industry}
          logoUrl={brand.logo_url}
        />

        {/* Overflow actions — visible on hover/focus */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" aria-label={t('moreOptions')}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-2.5 pt-5">
        {/* Title row */}
        <div className="space-y-1">
          <CardTitle className="text-[18px] font-semibold leading-tight tracking-tight" style={{ color: 'var(--sms-v8-text)' }}>
            {brand.name}
          </CardTitle>
          <CardDescription className="text-sm font-medium" style={{ color: 'var(--sms-v8-text-2)' }}>
            {brand.industry}
          </CardDescription>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--sms-v8-text-3)' }}>
          {brand.description}
        </p>

        {/* Status chips row */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {/* Brand status */}
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[var(--tone-bg)] text-[var(--tone-text)] border border-[var(--tone-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tone-solid)]" />
            {brand.status === 'active' ? t('statusActive') : t('statusInactive')}
          </span>

          {/* Onboarding readiness */}
          {brand.onboarding_status === 'ready' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800">
              <Sparkles className="h-3 w-3" />
              {t('identityReady')}
            </span>
          )}
          {brand.onboarding_status === 'created' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200 dark:bg-slate-900/20 dark:text-slate-300 dark:border-slate-800">
              {t('identityDraft')}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="mt-0 pt-4 border-t gap-3" style={{ borderColor: 'var(--sms-v8-border)' }}>
        {/* Trash readiness — UI-only, disabled, gated */}
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-50 focus-within:opacity-100 transition-opacity text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
          disabled
          title={t('trashComingSoon')}
          aria-label={t('moveToTrash')}
        >
          <Trash2 className="h-4 w-4" />
        </Button>

        <div className="flex-1" />

        {/* Primary actions */}
        <div className="flex items-center gap-2">
          <Link href={`/client/brand/${brand.id}`}>
            <Button variant="outline" size="sm" tone={tone} icon={<Pencil className="h-3.5 w-3.5" />} iconOnly aria-label={t('edit')} />
          </Link>
          <Link href={`/client/brand/${brand.id}`}>
            <Button variant="primary" size="sm" icon={<ArrowLeft className="h-3.5 w-3.5" />} iconPosition="start">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

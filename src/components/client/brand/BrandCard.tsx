import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Building2, MoreHorizontal, Pencil, ArrowLeft } from 'lucide-react';

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

export function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('clientBrand.v1.ui.card');

  return (
    <Card variant="interactive" padding="md" tone="violet" className="group relative">
      <CardHeader className="flex items-start justify-between mb-0 pb-0">
        {/* Logo or Placeholder */}
        {brand.logo_url ? (
          <div className="relative">
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="h-14 w-14 rounded-xl object-cover ring-2 ring-[var(--tone-border)]"
            />
          </div>
        ) : (
          <IconFrame size="lg" tone="violet" decorative>
            <Building2 className="h-7 w-7" />
          </IconFrame>
        )}

        {/* Actions */}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={t('moreOptions')}>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-2 pt-4">
        <CardTitle className="text-[18px] leading-tight">{brand.name}</CardTitle>
        <CardDescription className="text-sm">{brand.industry}</CardDescription>
        <p className="text-sm text-[var(--sms-v8-text-3)] line-clamp-2 leading-relaxed">{brand.description}</p>

        {/* Status indicator */}
        <div className="flex items-center gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--tone-bg)] text-[var(--tone-text)] border border-[var(--tone-border)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--tone-solid)]" />
            {brand.status === 'active' ? t('statusActive') : brand.status}
          </span>
        </div>
      </CardContent>

      <CardFooter className="mt-0 pt-4 border-t border-[var(--sms-v8-border)] flex items-center justify-between gap-3">
        <span className="text-xs text-[var(--sms-v8-text-3)] shrink-0">
          {new Date(brand.created_at).toLocaleDateString()}
        </span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" tone="violet" icon={<Pencil className="h-3.5 w-3.5" />} iconOnly aria-label={t('edit')} />
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

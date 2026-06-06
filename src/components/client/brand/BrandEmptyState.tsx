import { useTranslations } from 'next-intl';
import { Button } from '@/components/shared/Button';
import { Card, CardContent } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Plus, Sparkles } from 'lucide-react';

interface BrandEmptyStateProps {
  onCreateBrand: () => void;
}

export function BrandEmptyState({ onCreateBrand }: BrandEmptyStateProps) {
  const t = useTranslations('clientBrand.v1.ui.emptyState');

  return (
    <Card variant="elevated" padding="lg" className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-14 px-6">
        {/* Icon with subtle ambient ring */}
        <div className="relative mx-auto mb-8">
          <div
            className="absolute inset-0 rounded-2xl blur-xl opacity-20"
            style={{ background: 'var(--tone-solid)' }}
          />
          <IconFrame size="lg" tone="violet" decorative>
            <Sparkles className="h-10 w-10" />
          </IconFrame>
        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2 text-center" style={{ color: 'var(--sms-v8-text)' }}>
          {t('title')}
        </h2>

        {/* Description */}
        <p className="text-sm mb-8 max-w-sm text-center leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        {/* CTA Button */}
        <Button onClick={onCreateBrand} size="lg" tone="violet" icon={<Plus className="h-5 w-5" />} iconPosition="start">
          {t('cta')}
        </Button>

        {/* Hint */}
        <p className="text-xs mt-4 text-center" style={{ color: 'var(--sms-v8-text-3)' }}>
          {t('hint')}
        </p>
      </CardContent>
    </Card>
  );
}

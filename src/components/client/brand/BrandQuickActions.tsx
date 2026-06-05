'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import type { Brand } from '@/lib/brand/types';
import {
  Fingerprint,
  Link2,
  FolderOpen,
  Settings,
  ChevronLeft,
} from 'lucide-react';

interface BrandQuickActionsProps {
  brand: Brand;
}

interface ActionConfig {
  key: string;
  icon: React.ReactNode;
  tone: 'violet' | 'emerald' | 'amber' | 'sky';
  disabled: boolean;
}

export function BrandQuickActions({ brand }: BrandQuickActionsProps) {
  const t = useTranslations('clientBrand.v1.ui.details');

  const actions: ActionConfig[] = [
    {
      key: 'completeIdentity',
      icon: <Fingerprint className="h-4 w-4" />,
      tone: 'violet',
      disabled: brand.onboarding_status !== 'created',
    },
    {
      key: 'connectChannels',
      icon: <Link2 className="h-4 w-4" />,
      tone: 'emerald',
      disabled: brand.onboarding_status !== 'profile_complete',
    },
    {
      key: 'manageAssets',
      icon: <FolderOpen className="h-4 w-4" />,
      tone: 'amber',
      disabled: true,
    },
    {
      key: 'brandSettings',
      icon: <Settings className="h-4 w-4" />,
      tone: 'sky',
      disabled: true,
    },
  ];

  return (
    <Card variant="bordered" padding="md">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{t('quickActionsTitle')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant={action.disabled ? 'ghost' : 'outline'}
            size="sm"
            tone={action.tone}
            icon={action.icon}
            iconPosition="start"
            disabled={action.disabled}
            fullWidth
            className="justify-between"
          >
            <span className="flex items-center gap-2">
              {t(`quickActions.${action.key}`)}
            </span>
            <span className="flex items-center" dir="ltr">
              {action.disabled ? (
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {t('comingSoon')}
                </span>
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" style={{ color: 'var(--sms-v8-text-3)' }} />
              )}
            </span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

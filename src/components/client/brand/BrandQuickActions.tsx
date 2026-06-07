'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import type { Brand, BrandCoreProfile } from '@/lib/brand/types';
import {
  Fingerprint,
  Link2,
  Settings,
  ChevronLeft,
} from 'lucide-react';

interface BrandQuickActionsProps {
  brand: Brand;
  profile?: BrandCoreProfile | null;
  onNavigateToIdentity?: () => void;
}

interface ActionConfig {
  key: string;
  icon: React.ReactNode;
  tone: 'violet' | 'emerald' | 'amber' | 'sky' | 'slate';
  disabled: boolean;
  onClick?: () => void;
}

function hasDna(profile?: BrandCoreProfile | null): boolean {
  if (!profile?.brand_dna) return false;
  const bd = profile.brand_dna as Record<string, unknown>;
  const dna = (bd.dna as Record<string, string>) || {};
  return !!bd.identityType || Object.values(dna).some((v) => !!v?.trim());
}

export function BrandQuickActions({ profile, onNavigateToIdentity }: BrandQuickActionsProps) {
  const t = useTranslations('clientBrand.v1.ui.details');
  const hasAnyDna = hasDna(profile);

  const actions: ActionConfig[] = [
    {
      key: 'completeIdentity',
      icon: <Fingerprint className="h-4 w-4" />,
      tone: 'violet',
      disabled: false,
      onClick: onNavigateToIdentity,
    },
    {
      key: 'manageAssets',
      icon: <Settings className="h-4 w-4" />,
      tone: 'slate',
      disabled: false,
    },
    {
      key: 'connectChannels',
      icon: <Link2 className="h-4 w-4" />,
      tone: 'emerald',
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
            onClick={action.onClick}
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

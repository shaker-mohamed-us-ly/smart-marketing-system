'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame, type IconFrameTone } from '@/components/shared/IconFrame';
import type { BrandDnaEditorInput, BrandIdentityType } from '@/lib/brand/types';
import {
  Eye,
  Megaphone,
  PenTool,
  LayoutList,
  Users,
  Mic,
  Heart,
  Target,
  Sparkles,
  MousePointerClick,
  Gift,
  ShieldCheck,
  CalendarDays,
} from 'lucide-react';

interface BrandDnaPreviewProps {
  dna?: BrandDnaEditorInput | null;
  identityType?: BrandIdentityType | null;
}

interface ManagerConfig {
  key: 'marketing' | 'publishing' | 'design' | 'campaign';
  icon: React.ReactNode;
  tone: IconFrameTone;
  fieldKeys: (keyof BrandDnaEditorInput)[];
}

const managers: ManagerConfig[] = [
  {
    key: 'marketing',
    icon: <Megaphone className="h-4 w-4" />,
    tone: 'violet',
    fieldKeys: ['positioning', 'differentiation', 'audience'],
  },
  {
    key: 'publishing',
    icon: <PenTool className="h-4 w-4" />,
    tone: 'sky',
    fieldKeys: ['tone', 'contentRules', 'ctaStyle'],
  },
  {
    key: 'design',
    icon: <LayoutList className="h-4 w-4" />,
    tone: 'amber',
    fieldKeys: ['visualDirection'],
  },
  {
    key: 'campaign',
    icon: <Target className="h-4 w-4" />,
    tone: 'emerald',
    fieldKeys: ['offerStyle', 'trustProof', 'seasonalNotes'],
  },
];

const fieldIcons: Record<string, React.ReactNode> = {
  audience: <Users className="h-3 w-3" />,
  tone: <Mic className="h-3 w-3" />,
  values: <Heart className="h-3 w-3" />,
  positioning: <Target className="h-3 w-3" />,
  differentiation: <Sparkles className="h-3 w-3" />,
  visualDirection: <Eye className="h-3 w-3" />,
  contentRules: <PenTool className="h-3 w-3" />,
  ctaStyle: <MousePointerClick className="h-3 w-3" />,
  offerStyle: <Gift className="h-3 w-3" />,
  trustProof: <ShieldCheck className="h-3 w-3" />,
  seasonalNotes: <CalendarDays className="h-3 w-3" />,
};

export function BrandDnaPreview({ dna, identityType }: BrandDnaPreviewProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaPreview');
  const tEditor = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaEditor.fields');
  const tType = useTranslations('clientBrand.v1.ui.details.identityStudio.typeSelector');

  const hasAnyDna = dna && Object.keys(dna).some((k) => k !== 'identityType' && !!(dna as Record<string, unknown>)[k]);

  return (
    <Card variant="elevated" padding="lg" tone="slate">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="slate" decorative>
            <Eye className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        {/* Identity Type */}
        {identityType && (
          <div
            className="flex items-center gap-3 p-3 rounded-lg border"
            style={{ background: 'var(--sms-v8-surface)', borderColor: 'var(--sms-v8-border)' }}
          >
            <IconFrame size="sm" tone="violet" decorative>
              <Megaphone className="h-4 w-4" />
            </IconFrame>
            <div>
              <p className="text-xs font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>
                {tType('title')}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                {tType(`types.${identityType}.label`)}
              </p>
            </div>
          </div>
        )}

        {!hasAnyDna ? (
          <div
            className="flex items-start gap-3 p-4 rounded-lg"
            style={{ background: 'var(--sms-v8-surface-2)', border: '1px solid var(--sms-v8-border)' }}
          >
            <IconFrame size="sm" tone="amber" decorative>
              <Eye className="h-4 w-4" />
            </IconFrame>
            <p className="text-sm" style={{ color: 'var(--sms-v8-text-2)' }}>{t('noDna')}</p>
          </div>
        ) : (
          <>
            {/* Filled DNA fields */}
            <div className="space-y-2">
              {Object.entries(fieldIcons).map(([key, icon]) => {
                const value = dna?.[key as keyof BrandDnaEditorInput];
                if (!value || typeof value !== 'string' || !value.trim()) return null;
                return (
                  <div
                    key={key}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg"
                    style={{ background: 'var(--sms-v8-surface)', border: '1px solid var(--sms-v8-border)' }}
                  >
                    <IconFrame size="sm" tone="slate" decorative>{icon}</IconFrame>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium" style={{ color: 'var(--sms-v8-text-3)' }}>
                        {tEditor(`${key}.label`)}
                      </p>
                      <p className="text-sm truncate" style={{ color: 'var(--sms-v8-text)' }}>
                        {value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Manager cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {managers.map((manager) => {
                const hasFields = manager.fieldKeys.some(
                  (k) => dna?.[k] && typeof dna[k] === 'string' && (dna[k] as string).trim()
                );
                return (
                  <div
                    key={manager.key}
                    className="p-3 rounded-xl border space-y-2"
                    style={{
                      background: hasFields ? 'var(--sms-v8-surface)' : 'var(--sms-v8-surface-2)',
                      borderColor: hasFields ? 'var(--sms-v8-border)' : 'transparent',
                      opacity: hasFields ? 1 : 0.6,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <IconFrame size="sm" tone={manager.tone} decorative>
                        {manager.icon}
                      </IconFrame>
                      <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                        {t(`managers.${manager.key}.title`)}
                      </p>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                      {t(`managers.${manager.key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

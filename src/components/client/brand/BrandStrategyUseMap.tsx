'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import type { BrandDnaEditorInput, BrandOperatingProfile } from '@/lib/brand/types';
import {
  Megaphone,
  PenTool,
  LayoutList,
  Target,
  Users,
  Mic,
  Heart,
  Sparkles,
  Eye,
  FileText,
  MousePointerClick,
  Gift,
  ShieldCheck,
  CheckCircle2,
  Circle,
} from 'lucide-react';

interface BrandStrategyUseMapProps {
  dna?: BrandDnaEditorInput | null;
  profile?: BrandOperatingProfile | null;
}

interface ManagerItem {
  key: string;
  icon: React.ReactNode;
  tone: 'violet' | 'sky' | 'amber' | 'emerald';
  fieldKeys: string[];
}

const managers: ManagerItem[] = [
  {
    key: 'marketing',
    icon: <Megaphone className="h-4 w-4" />,
    tone: 'violet',
    fieldKeys: ['positioning', 'differentiation', 'audience', 'growthIntent', 'salesMotion'],
  },
  {
    key: 'publishing',
    icon: <PenTool className="h-4 w-4" />,
    tone: 'sky',
    fieldKeys: ['tone', 'contentRules', 'ctaStyle', 'salesMotion'],
  },
  {
    key: 'design',
    icon: <LayoutList className="h-4 w-4" />,
    tone: 'amber',
    fieldKeys: ['visualDirection', 'identityMaturity'],
  },
  {
    key: 'campaign',
    icon: <Target className="h-4 w-4" />,
    tone: 'emerald',
    fieldKeys: ['offerStyle', 'trustProof', 'growthIntent', 'businessModel'],
  },
];

const fieldIcons: Record<string, React.ReactNode> = {
  audience: <Users className="h-3 w-3" />,
  tone: <Mic className="h-3 w-3" />,
  values: <Heart className="h-3 w-3" />,
  positioning: <Target className="h-3 w-3" />,
  differentiation: <Sparkles className="h-3 w-3" />,
  visualDirection: <Eye className="h-3 w-3" />,
  contentRules: <FileText className="h-3 w-3" />,
  ctaStyle: <MousePointerClick className="h-3 w-3" />,
  offerStyle: <Gift className="h-3 w-3" />,
  trustProof: <ShieldCheck className="h-3 w-3" />,
  businessModel: <Megaphone className="h-3 w-3" />,
  salesMotion: <PenTool className="h-3 w-3" />,
  growthIntent: <Target className="h-3 w-3" />,
  identityMaturity: <LayoutList className="h-3 w-3" />,
};

export function BrandStrategyUseMap({ dna, profile }: BrandStrategyUseMapProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.strategyUseMap');
  const tFields = useTranslations('clientBrand.v1.ui.details.identityStudio.operatingProfile');
  const tDnaFields = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaEditor.fields');

  function hasField(key: string): boolean {
    if (key === 'businessModel') return !!profile?.businessModel;
    if (key === 'salesMotion') return !!profile?.salesMotion;
    if (key === 'growthIntent') return !!profile?.growthIntent;
    if (key === 'identityMaturity') return !!profile?.identityMaturity;
    const value = dna?.[key as keyof BrandDnaEditorInput];
    return typeof value === 'string' && value.trim().length > 0;
  }

  const hasAnyData = managers.some((m) => m.fieldKeys.some((k) => hasField(k)));

  if (!hasAnyData) {
    return (
      <Card variant="subtle" padding="md">
        <CardContent className="flex items-start gap-3 py-4">
          <IconFrame size="sm" tone="amber" decorative>
            <Circle className="h-4 w-4" />
          </IconFrame>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
              {t('noDataTitle')}
            </p>
            <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
              {t('noDataDescription')}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="bordered" padding="lg">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <IconFrame size="md" tone="slate" decorative>
            <Target className="h-5 w-5" />
          </IconFrame>
          <div>
            <CardTitle className="text-base">{t('title')}</CardTitle>
            <CardDescription className="text-sm">{t('subtitle')}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm leading-relaxed" style={{ color: 'var(--sms-v8-text-2)' }}>
          {t('description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {managers.map((manager) => {
            const hasFields = manager.fieldKeys.some((k) => hasField(k));
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
                  <IconFrame size="sm" tone={manager.tone} decorative>{manager.icon}</IconFrame>
                  <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
                    {t(`managers.${manager.key}.title`)}
                  </p>
                  {hasFields && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" style={{ color: '#059669' }} />}
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--sms-v8-text-3)' }}>
                  {t(`managers.${manager.key}.description`)}
                </p>
                {hasFields && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {manager.fieldKeys.filter((k) => hasField(k)).map((k) => (
                      <span
                        key={k}
                        className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
                        style={{
                          background: 'var(--tone-bg)',
                          color: 'var(--tone-text)',
                        }}
                      >
                        {fieldIcons[k]}
                        {k === 'businessModel' || k === 'salesMotion' || k === 'growthIntent' || k === 'identityMaturity'
                          ? tFields(`fields.${k}`)
                          : tDnaFields(`${k}.label`)
                        }
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

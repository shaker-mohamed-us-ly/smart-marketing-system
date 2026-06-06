'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { CheckCircle2, Circle, Clock, ListChecks, AlertTriangle, ArrowRight, Fingerprint, Link2, Megaphone } from 'lucide-react';
import type { Brand } from '@/lib/brand/types';

interface BrandReadinessChecklistProps {
  brand: Brand;
  compact?: boolean;
}

type CheckItem = { key: string; isDone: boolean };

const groups = [
  {
    key: 'identity',
    icon: <Fingerprint className="h-4 w-4" />,
    tone: 'violet' as const,
    items: ['description', 'audience', 'path', 'voice', 'visual'],
  },
  {
    key: 'sources',
    icon: <Link2 className="h-4 w-4" />,
    tone: 'sky' as const,
    items: ['source', 'products'],
  },
  {
    key: 'campaignability',
    icon: <Megaphone className="h-4 w-4" />,
    tone: 'emerald' as const,
    items: ['channels'],
  },
];

function getChecklist(brand: Brand): CheckItem[] {
  return [
    { key: 'description', isDone: !!brand.description && brand.description.length > 10 },
    { key: 'audience', isDone: !!brand.industry && brand.industry.length > 2 },
    { key: 'source', isDone: false },
    { key: 'path', isDone: false },
    { key: 'voice', isDone: false },
    { key: 'visual', isDone: false },
    { key: 'channels', isDone: brand.onboarding_status === 'channels_connected' || brand.onboarding_status === 'ready' },
    { key: 'products', isDone: false },
  ];
}

function getNextActions(items: CheckItem[], t: any): string[] {
  const undone = items.filter((i) => !i.isDone);
  return undone.slice(0, 3).map((item) => t(`nextActions.${item.key}`));
}

export function BrandReadinessChecklist({ brand, compact }: BrandReadinessChecklistProps) {
  const t = useTranslations('clientBrand.v1.ui.details.identityStudio.readiness');
  const items = getChecklist(brand);
  const completed = items.filter((i) => i.isDone).length;
  const percent = Math.round((completed / items.length) * 100);
  const nextActions = getNextActions(items, t);

  return (
    <Card variant="bordered" padding={compact ? 'md' : 'lg'}>
      {!compact && (
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <IconFrame size="md" tone="emerald" decorative>
              <ListChecks className="h-5 w-5" />
            </IconFrame>
            <div>
              <CardTitle className="text-sm">{t('title')}</CardTitle>
              <CardDescription>{t('subtitle')}</CardDescription>
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className={compact ? 'space-y-3' : 'space-y-6'}>
        {/* Progress */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--sms-v8-surface-2)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${percent}%`,
                background: percent >= 75 ? '#10b981' : percent >= 40 ? '#f59e0b' : 'var(--tone-solid)',
              }}
            />
          </div>
          <span className="text-sm font-bold tabular-nums" style={{ color: 'var(--sms-v8-text)' }}>
            {percent}%
          </span>
        </div>

        {/* Next 3 Actions */}
        {nextActions.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text)' }}>
              {t('nextActionsTitle')}
            </p>
            <div className={`space-y-2 ${compact ? 'grid grid-cols-1 sm:grid-cols-3 gap-2' : ''}`}>
              {nextActions.map((action, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg"
                  style={{
                    background: 'var(--sms-v8-surface-2)',
                    border: '1px solid var(--sms-v8-border)',
                  }}
                >
                  <ArrowRight className="h-4 w-4 shrink-0" style={{ color: 'var(--tone-solid)' }} />
                  <span className="text-sm" style={{ color: 'var(--sms-v8-text)' }}>{action}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grouped Checklist — hidden in compact */}
        {!compact && (
          <div className="space-y-4">
            {groups.map((group) => {
              const groupItems = group.items
                .map((key) => items.find((i) => i.key === key))
                .filter(Boolean) as CheckItem[];
              const groupDone = groupItems.filter((i) => i.isDone).length;
              return (
                <div key={group.key} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconFrame size="sm" tone={group.tone} decorative>
                      {group.icon}
                    </IconFrame>
                    <p className="text-sm font-semibold" style={{ color: 'var(--sms-v8-text-2)' }}>
                      {t(`groups.${group.key}`)}
                    </p>
                    <span className="text-xs font-medium ml-auto" style={{ color: 'var(--sms-v8-text-3)' }}>
                      {groupDone}/{groupItems.length}
                    </span>
                  </div>
                  <div className="space-y-1.5 pl-9">
                    {groupItems.map((item) => (
                      <div
                        key={item.key}
                        className="flex items-center gap-2.5 py-1.5"
                      >
                        {item.isDone ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#10b981' }} />
                        ) : (
                          <Circle className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
                        )}
                        <span
                          className="text-sm flex-1"
                          style={{
                            color: item.isDone ? 'var(--sms-v8-text-3)' : 'var(--sms-v8-text)',
                            textDecoration: item.isDone ? 'line-through' : 'none',
                          }}
                        >
                          {t(`items.${item.key}`)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{
            background: 'var(--sms-v8-surface-2)',
            color: 'var(--sms-v8-text-3)',
            border: '1px solid var(--sms-v8-border)',
          }}
        >
          <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: 'var(--tone-solid)' }} />
          <span>{t('previewOnly')}</span>
        </div>
      </CardContent>
    </Card>
  );
}

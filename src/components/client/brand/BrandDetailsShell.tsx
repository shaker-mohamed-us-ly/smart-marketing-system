'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { IconFrame } from '@/components/shared/IconFrame';
import { Card, CardContent } from '@/components/shared/Card';
import { BrandOverviewTab } from './BrandOverviewTab';
import { BrandIdentityTab } from './BrandIdentityTab';
import { BrandChannelsTab } from './BrandChannelsTab';
import { BrandAssetsTab } from './BrandAssetsTab';
import { BrandSettingsTab } from './BrandSettingsTab';
import type { Brand } from '@/lib/brand/types';
import {
  ArrowLeft,
  Building2,
  LayoutDashboard,
  Fingerprint,
  Link2,
  FolderOpen,
  Settings,
} from 'lucide-react';

interface BrandDetailsShellProps {
  brand: Brand;
}

type TabKey = 'overview' | 'identity' | 'channels' | 'assets' | 'settings';

const tabs: { key: TabKey; labelKey: string; icon: React.ReactNode }[] = [
  { key: 'overview', labelKey: 'overview', icon: <LayoutDashboard className="h-4 w-4" /> },
  { key: 'identity', labelKey: 'identity', icon: <Fingerprint className="h-4 w-4" /> },
  { key: 'channels', labelKey: 'channels', icon: <Link2 className="h-4 w-4" /> },
  { key: 'assets', labelKey: 'assets', icon: <FolderOpen className="h-4 w-4" /> },
  { key: 'settings', labelKey: 'settings', icon: <Settings className="h-4 w-4" /> },
];

export function BrandDetailsShell({ brand }: BrandDetailsShellProps) {
  const t = useTranslations('clientBrand.v1.ui.details');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const handleBrandUpdated = () => {
    router.refresh();
  };

  const statusText = brand.status === 'active' ? t('statusActive') : t('statusInactive');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link href="/client/brand">
          <Button variant="ghost" size="sm" icon={<ArrowLeft className="h-4 w-4" />} iconPosition="start">
            {t('backToBrands')}
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          {brand.logo_url ? (
            <img
              src={brand.logo_url}
              alt={brand.name}
              className="h-16 w-16 rounded-xl object-cover ring-2 ring-[var(--tone-border)] shrink-0"
            />
          ) : (
            <IconFrame size="lg" tone="violet" decorative>
              <Building2 className="h-7 w-7" />
            </IconFrame>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-[28px] font-bold" style={{ color: 'var(--sms-v8-text)' }}>
                {brand.name}
              </h1>
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border"
                style={{
                  background: brand.status === 'active' ? 'var(--tone-bg)' : 'var(--sms-v8-surface-2)',
                  color: brand.status === 'active' ? 'var(--tone-text)' : 'var(--sms-v8-text-3)',
                  borderColor: brand.status === 'active' ? 'var(--tone-border)' : 'var(--sms-v8-border)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: brand.status === 'active' ? 'var(--tone-solid)' : 'var(--sms-v8-text-3)' }}
                />
                {statusText}
              </span>
            </div>
            <p className="text-base mt-1" style={{ color: 'var(--sms-v8-text-2)' }}>
              {brand.industry}
            </p>
            {brand.description && (
              <p className="text-sm mt-1 line-clamp-2" style={{ color: 'var(--sms-v8-text-3)' }}>
                {brand.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div
        className="flex items-center gap-1 border-b overflow-x-auto"
        style={{ borderColor: 'var(--sms-v8-border)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className="flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors relative hover:text-[var(--sms-v8-text-2)]"
            style={{
              color: activeTab === tab.key ? 'var(--sms-v8-accent)' : 'var(--sms-v8-text-3)',
            }}
          >
            {tab.icon}
            {t(`tab.${tab.labelKey}`)}
            {activeTab === tab.key && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ background: 'var(--sms-v8-accent)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <BrandOverviewTab
            brand={brand}
            onNavigateToIdentity={() => setActiveTab('identity')}
          />
        )}
        {activeTab === 'identity' && <BrandIdentityTab brand={brand} />}
        {activeTab === 'channels' && <BrandChannelsTab brand={brand} />}
        {activeTab === 'assets' && <BrandAssetsTab brand={brand} />}
        {activeTab === 'settings' && <BrandSettingsTab brand={brand} onBrandUpdated={handleBrandUpdated} />}
      </div>
    </div>
  );
}

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/shared/Card';
import { IconFrame } from '@/components/shared/IconFrame';
import { Button } from '@/components/shared/Button';
import { BrandProgressStepper } from './BrandProgressStepper';
import { BrandQuickActions } from './BrandQuickActions';
import type { Brand, BrandCoreProfile, BrandIdentityType, BrandOperatingProfile } from '@/lib/brand/types';
import { Layers, CheckCircle2, Circle, Target, ChevronLeft } from 'lucide-react';

interface BrandOverviewTabProps {
  brand: Brand;
  profile?: BrandCoreProfile | null;
  onNavigateToIdentity?: () => void;
}

function extractIdentityType(profile?: BrandCoreProfile | null): BrandIdentityType | null {
  if (!profile?.brand_dna) return null;
  const bd = profile.brand_dna as Record<string, unknown>;
  return (bd.identityType as BrandIdentityType) || null;
}

function extractOperatingProfile(profile?: BrandCoreProfile | null): BrandOperatingProfile | null {
  if (!profile?.brand_dna) return null;
  const bd = profile.brand_dna as Record<string, unknown>;
  return (bd.operatingProfile as BrandOperatingProfile) || null;
}

function getDnaCompletion(profile?: BrandCoreProfile | null, logoUrl?: string | null): {
  hasType: boolean;
  hasAudience: boolean;
  hasTone: boolean;
  hasPositioning: boolean;
  hasVisualDirection: boolean;
  hasLogo: boolean;
} {
  if (!profile?.brand_dna) {
    return {
      hasType: false,
      hasAudience: false,
      hasTone: false,
      hasPositioning: false,
      hasVisualDirection: false,
      hasLogo: !!logoUrl,
    };
  }
  const bd = profile.brand_dna as Record<string, unknown>;
  const dna = (bd.dna as Record<string, string>) || {};
  const op = (bd.operatingProfile as BrandOperatingProfile) || {};
  return {
    hasType: !!bd.identityType || !!op.businessModel,
    hasAudience: !!dna.audience?.trim(),
    hasTone: !!dna.tone?.trim(),
    hasPositioning: !!dna.positioning?.trim(),
    hasVisualDirection: !!dna.visualDirection?.trim(),
    hasLogo: !!logoUrl,
  };
}

export function BrandOverviewTab({ brand, profile, onNavigateToIdentity }: BrandOverviewTabProps) {
  const tType = useTranslations('clientBrand.v1.ui.details.identityStudio.typeSelector');
  const tCompletion = useTranslations('clientBrand.v1.ui.details.identityStudio.dnaCompletion');
  const tOp = useTranslations('clientBrand.v1.ui.details.identityStudio.operatingProfile');
  const tOverview = useTranslations('clientBrand.v1.ui.overview');

  const identityType = extractIdentityType(profile);
  const operatingProfile = extractOperatingProfile(profile);
  const completion = getDnaCompletion(profile, brand.logo_url);
  const completedCount = Object.values(completion).filter(Boolean).length;
  const totalCount = 6;

  const completionLabel =
    completedCount === 0 ? tCompletion('incomplete')
      : completedCount === totalCount ? tCompletion('complete')
        : tCompletion('partial');

  const profileComplete = !!operatingProfile?.businessModel && !!operatingProfile?.salesMotion
    && !!operatingProfile?.growthIntent && !!operatingProfile?.identityMaturity;

  const nextAction = !operatingProfile?.businessModel
    ? 'nextActionBuildProfile'
    : completedCount < totalCount
      ? 'nextActionCompleteDna'
      : !brand.logo_url
        ? 'nextActionUploadLogo'
        : 'nextActionReady';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main panel */}
      <div className="lg:col-span-2 space-y-6">
        <BrandProgressStepper brand={brand} profile={profile} />

        {/* Operating Profile Card */}
        {operatingProfile?.businessModel && (
          <Card variant="elevated" padding="lg" tone="violet">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <IconFrame size="md" tone="violet" decorative>
                  <Target className="h-5 w-5" />
                </IconFrame>
                <div>
                  <CardTitle className="text-base">{tOverview('operatingProfileTitle')}</CardTitle>
                  <CardDescription className="text-sm">
                    {profileComplete ? tOverview('profileComplete') : tOverview('profilePartial')}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'businessModel', value: operatingProfile.businessModel },
                  { key: 'salesMotion', value: operatingProfile.salesMotion },
                  { key: 'growthIntent', value: operatingProfile.growthIntent },
                  { key: 'identityMaturity', value: operatingProfile.identityMaturity },
                ].map((item) => {
                  if (!item.value) return null;
                  return (
                    <span
                      key={item.key}
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{ background: 'var(--tone-bg)', color: 'var(--tone-text)' }}
                    >
                      {tOp(`fields.${item.key}`)}: {tOp(`choices.${item.value.replace(/_([a-z])/g, (_, l) => l.toUpperCase())}.label`)}
                    </span>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Intelligent Action */}
        <Card variant="subtle" padding="md">
          <CardContent className="flex items-start gap-3">
            <IconFrame size="sm" tone="amber" decorative>
              <Target className="h-4 w-4" />
            </IconFrame>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: 'var(--sms-v8-text)' }}>
                {tOverview('nextActionTitle')}
              </p>
              <p className="text-xs mt-1" style={{ color: 'var(--sms-v8-text-3)' }}>
                {tOverview(nextAction)}
              </p>
              {onNavigateToIdentity && nextAction !== 'nextActionReady' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={onNavigateToIdentity}
                  icon={<ChevronLeft className="h-4 w-4" />}
                  iconPosition="start"
                >
                  {tOverview('goToIdentity')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* DNA Completion Card */}
        <Card variant="bordered" padding="lg">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <IconFrame size="md" tone="emerald" decorative>
                <Layers className="h-5 w-5" />
              </IconFrame>
              <div>
                <CardTitle className="text-base">{tCompletion('title')}</CardTitle>
                <CardDescription className="text-sm">
                  {completedCount}/{totalCount} — {completionLabel}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Brand Type Badge */}
            {identityType ? (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border"
                style={{
                  background: 'var(--tone-bg)',
                  color: 'var(--tone-text)',
                  borderColor: 'var(--tone-border)',
                }}
              >
                <Layers className="h-3 w-3" />
                {tType(`types.${identityType}.label`)}
              </div>
            ) : (
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{ background: 'var(--sms-v8-surface-2)', color: 'var(--sms-v8-text-3)', border: '1px solid var(--sms-v8-border)' }}
              >
                <Circle className="h-3 w-3" />
                {tType('notSelected')}
              </div>
            )}

            {/* Checklist */}
            <div className="space-y-2">
              {[
                { key: 'hasType', label: tCompletion('hasType'), done: completion.hasType },
                { key: 'hasAudience', label: tCompletion('hasAudience'), done: completion.hasAudience },
                { key: 'hasTone', label: tCompletion('hasTone'), done: completion.hasTone },
                { key: 'hasPositioning', label: tCompletion('hasPositioning'), done: completion.hasPositioning },
                { key: 'hasVisualDirection', label: tCompletion('hasVisualDirection'), done: completion.hasVisualDirection },
                { key: 'hasLogo', label: tCompletion('hasLogo'), done: completion.hasLogo },
              ].map((item) => (
                <div key={item.key} className="flex items-center gap-2.5">
                  {item.done ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
                  ) : (
                    <Circle className="h-4 w-4 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
                  )}
                  <span
                    className="text-sm"
                    style={{
                      color: item.done ? 'var(--sms-v8-text)' : 'var(--sms-v8-text-3)',
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick actions sidebar */}
      <div className="lg:col-span-1">
        <BrandQuickActions brand={brand} profile={profile} onNavigateToIdentity={onNavigateToIdentity} />
      </div>
    </div>
  );
}

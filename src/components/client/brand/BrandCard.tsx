import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Card } from '@/components/shared/Card';
import { BrandLogoAura } from './BrandLogoAura';
import { ArrowLeft, Sparkles, CircleDot, Building2, FileText } from 'lucide-react';
import styles from './BrandCardV2.module.css';

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

function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function BrandCard({ brand }: BrandCardProps) {
  const t = useTranslations('clientBrand.v1.ui.card');
  const tone = onboardingTone(brand.onboarding_status);

  const brandHue = hashToHue(brand.name + brand.industry);
  const brandAccent = `hsl(${brandHue} 65% 55%)`;
  const brandAccentSoft = `hsl(${brandHue} 50% 55% / 0.2)`;
  const brandAccentBg = `hsl(${brandHue} 60% 55% / 0.06)`;
  const brandRing = `hsl(${brandHue} 65% 55% / 0.5)`;

  const isDraft = brand.onboarding_status === 'created';
  const isActive = brand.status === 'active';

  return (
    <Card
      variant="interactive"
      padding="md"
      tone={tone}
      className={`${styles.cardRoot} group relative overflow-hidden`}
    >
      {/* Full-height left accent bar */}
      <div
        className={styles.leftAccent}
        style={{
          '--brand-accent': brandAccent,
          '--brand-accent-soft': brandAccentSoft,
        } as React.CSSProperties}
      />

      {/* Top-right radial glow */}
      <div
        className={styles.radialGlow}
        style={{ '--brand-accent-bg': brandAccentBg } as React.CSSProperties}
      />

      {/* Card inner content */}
      <div className={styles.inner}>
        {/* Logo centered with colored ring */}
        <div className={styles.logoWrap}>
          <div
            className={styles.logoRing}
            style={{ '--brand-ring': brandRing } as React.CSSProperties}
          >
            <BrandLogoAura
              brandName={brand.name}
              industry={brand.industry}
              logoUrl={brand.logo_url}
            />
          </div>
        </div>

        {/* Name + Industry centered */}
        <div className={styles.metaBlock}>
          <h3 className={styles.brandName}>
            {brand.name}
          </h3>
          <div className={styles.industryRow}>
            <Building2 className="h-3 w-3 shrink-0" style={{ color: 'var(--sms-v8-text-3)' }} />
            <span className={styles.brandIndustry}>
              {brand.industry}
            </span>
          </div>
        </div>

        {/* Description with icon */}
        {brand.description && (
          <div className={styles.descRow}>
            <FileText className="h-3 w-3 shrink-0 mt-0.5" style={{ color: 'var(--sms-v8-text-3)' }} />
            <p className={styles.description}>
              {brand.description}
            </p>
          </div>
        )}

        {/* Status chips with icons */}
        <div className={styles.chipsRow}>
          <span className={styles.statusChip}>
            <CircleDot className="h-3 w-3" />
            {isActive ? t('statusActive') : t('statusInactive')}
          </span>

          {brand.onboarding_status === 'ready' && (
            <span className={styles.readinessChip} style={{ background: 'var(--tone-bg)', color: 'var(--tone-text)', borderColor: 'var(--tone-border)' }}>
              <Sparkles className="h-3 w-3" />
              {t('identityReady')}
            </span>
          )}
          {brand.onboarding_status === 'created' && (
            <span className={styles.readinessChip} style={{ background: 'var(--tone-bg)', color: 'var(--tone-text)', borderColor: 'var(--tone-border)' }}>
              <CircleDot className="h-3 w-3" />
              {t('identityDraft')}
            </span>
          )}
        </div>

        {/* Filled CTA with brand gradient */}
        <Link href={`/client/brand/${brand.id}`} className={styles.ctaLink}>
          <span
            className={styles.cta}
            style={{
              '--brand-accent': brandAccent,
            } as React.CSSProperties}
          >
            {isDraft ? t('ctaBuildIdentity') : t('viewDetails')}
            <ArrowLeft className={styles.ctaArrow} />
          </span>
        </Link>
      </div>
    </Card>
  );
}

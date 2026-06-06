'use client';

import { Building2 } from 'lucide-react';
import { IconFrame } from '@/components/shared/IconFrame';
import styles from './BrandLogoAura.module.css';

interface BrandLogoAuraProps {
  brandName: string;
  industry: string;
  logoUrl: string | null;
  palette?: { primary?: string; secondary?: string; accent?: string } | null;
}

/**
 * Deterministic hue from string hash (0-360)
 */
function hashToHue(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

/**
 * Build a harmonious 3-stop palette from a base hue.
 * Returns HSL tuples: [hue, saturation%, lightness%]
 */
function buildPaletteFromHue(hue: number): string[] {
  return [
    `hsl(${hue} 70% 55%)`,
    `hsl(${(hue + 30) % 360} 65% 60%)`,
    `hsl(${(hue + 60) % 360} 60% 50%)`,
  ];
}

export function BrandLogoAura({ brandName, industry, logoUrl, palette }: BrandLogoAuraProps) {
  // Use provided palette or generate deterministic fallback
  const hasRealPalette = palette && palette.primary;
  const baseHue = hasRealPalette
    ? hashToHue(palette!.primary!)
    : hashToHue(brandName + industry);
  const auraColors = hasRealPalette
    ? [palette!.primary!, palette!.secondary || palette!.primary!, palette!.accent || palette!.primary!]
    : buildPaletteFromHue(baseHue);

  const fallbackNotice = !hasRealPalette;

  // Initials for no-logo state
  const initials = brandName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={styles.auraContainer} data-fallback={fallbackNotice}>
      <div
        className={styles.auraRing}
        style={
          {
            '--aura-1': auraColors[0],
            '--aura-2': auraColors[1],
            '--aura-3': auraColors[2],
          } as React.CSSProperties
        }
      />
      <div className={styles.logoTile}>
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={brandName}
            className={styles.logoImage}
            loading="lazy"
          />
        ) : (
          <div className={styles.initialsFallback} aria-label={brandName}>
            <span className={styles.initialsText}>{initials}</span>
          </div>
        )}
      </div>
    </div>
  );
}

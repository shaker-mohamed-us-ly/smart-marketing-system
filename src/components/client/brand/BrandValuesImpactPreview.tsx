'use client';

import type { BrandValuesState } from '@/lib/brand/types';

interface BrandValuesImpactPreviewProps {
  values?: BrandValuesState | null;
}

export function BrandValuesImpactPreview({ values }: BrandValuesImpactPreviewProps) {
  // Impact preview is now integrated into BrandValuesChoiceStudio
  // This component is kept for backward compatibility but renders nothing
  return null;
}

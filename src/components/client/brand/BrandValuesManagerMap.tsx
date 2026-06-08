'use client';

import type { BrandValuesState } from '@/lib/brand/types';

interface BrandValuesManagerMapProps {
  values?: BrandValuesState | null;
}

export function BrandValuesManagerMap({ values }: BrandValuesManagerMapProps) {
  // Manager map is now integrated into BrandValuesChoiceStudio impact preview
  // This component is kept for backward compatibility but renders nothing
  return null;
}

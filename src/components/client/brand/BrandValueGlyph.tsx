'use client';

import type { BrandValueKey } from '@/lib/brand/types';

interface BrandValueGlyphProps {
  value: BrandValueKey;
  className?: string;
  style?: React.CSSProperties;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const GLYPHS: Record<BrandValueKey, React.ReactNode> = {
  trust: (
    <g>
      <path d="M4 20 L12 4 L20 20" />
      <path d="M7 16 L12 16" />
      <path d="M8 12 L16 12" />
    </g>
  ),
  quality: (
    <g>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2 L12 6" />
      <path d="M12 18 L12 22" />
      <path d="M2 12 L6 12" />
      <path d="M18 12 L22 12" />
    </g>
  ),
  speed: (
    <g>
      <path d="M4 14 Q12 4 20 8" />
      <path d="M6 18 Q12 10 18 12" />
      <path d="M8 20 Q12 16 16 16" />
    </g>
  ),
  simplicity: (
    <g>
      <path d="M4 12 L20 12" strokeWidth="2.5" />
    </g>
  ),
  luxury: (
    <g>
      <path d="M6 16 Q12 4 18 16" />
      <circle cx="12" cy="16" r="3" />
      <path d="M12 10 L12 6" />
    </g>
  ),
  customer_closeness: (
    <g>
      <rect x="3" y="6" width="7" height="12" rx="3" />
      <rect x="14" y="6" width="7" height="12" rx="3" />
      <path d="M10 12 L14 12" />
    </g>
  ),
  innovation: (
    <g>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <path d="M12 4 L12 8" />
      <path d="M12 16 L12 20" />
      <path d="M4 12 L8 12" />
      <path d="M16 12 L20 12" />
      <path d="M6.34 6.34 L9.17 9.17" />
      <path d="M14.83 14.83 L17.66 17.66" />
      <path d="M6.34 17.66 L9.17 14.83" />
      <path d="M14.83 9.17 L17.66 6.34" />
    </g>
  ),
  professionalism: (
    <g>
      <path d="M4 8 L20 8" />
      <path d="M4 12 L20 12" />
      <path d="M4 16 L20 16" />
      <path d="M12 4 L12 20" strokeWidth="2.5" />
    </g>
  ),
  transparency: (
    <g>
      <path d="M6 6 L18 6 L14 18 L10 18 Z" />
      <path d="M8 9 L16 9" />
      <path d="M9 12 L15 12" />
      <path d="M11 15 L13 15" />
    </g>
  ),
};

const SIZE_MAP: Record<string, string> = {
  sm: '20',
  md: '28',
  lg: '40',
  xl: '56',
};

const STROKE_MAP: Record<string, string> = {
  sm: '1.5',
  md: '1.5',
  lg: '1.5',
  xl: '1.75',
};

export function BrandValueGlyph({ value, className = '', style, size = 'md' }: BrandValueGlyphProps) {
  const dim = SIZE_MAP[size] || '28';
  const stroke = STROKE_MAP[size] || '1.5';
  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {GLYPHS[value]}
    </svg>
  );
}


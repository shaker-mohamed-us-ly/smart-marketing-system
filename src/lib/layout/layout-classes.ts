/**
 * Layout Classes for Standard Centered Canvas System
 * 
 * Provides Tailwind class helpers for unified platform canvas layouts
 * with intentional empty side gutters on large screens.
 * Uses logical properties for RTL/LTR support.
 */

import { cn } from "@/lib/utils/cn";

/**
 * Standard centered platform canvas - for all dashboard/control pages
 * Max width: 1360px, centered with auto margins
 * Uses margin-inline-auto for RTL/LTR support
 */
export const centeredPlatformCanvas = cn(
  "w-full",
  "mx-auto",
  "max-w-[1360px]"
);

/**
 * Narrow centered canvas - for simple readable pages
 * Max width: 1120px, centered with auto margins
 * Uses margin-inline-auto for RTL/LTR support
 */
export const centeredReadableCanvas = cn(
  "w-full",
  "mx-auto",
  "max-w-[1120px]"
);

/**
 * Page section gap - consistent vertical spacing between sections
 */
export const pageSectionGap = cn(
  "space-y-6"
);

/**
 * Card grid gap - consistent spacing between cards
 */
export const cardGridGap = cn(
  "gap-5"
);

/**
 * Golden ratio main content area (62% ~ 8/12 columns)
 */
export const goldenMain = cn(
  "col-span-12",
  "lg:col-span-8"
);

/**
 * Golden ratio support area (38% ~ 4/12 columns)
 */
export const goldenSupport = cn(
  "col-span-12",
  "lg:col-span-4"
);

/**
 * Extended main content area (75% ~ 9/12 columns)
 */
export const extendedMain = cn(
  "col-span-12",
  "lg:col-span-9"
);

/**
 * Compact support area (25% ~ 3/12 columns)
 */
export const compactSupport = cn(
  "col-span-12",
  "lg:col-span-3"
);

/**
 * Full width section within canvas
 */
export const fullWidthSection = cn(
  "col-span-12"
);

/**
 * Logical margin start for RTL/LTR support
 * Use instead of ml-auto or mr-auto
 */
export const marginStartAuto = cn(
  "rtl:mr-auto",
  "ltr:ml-auto"
);

/**
 * Logical margin end for RTL/LTR support
 * Use instead of ml-auto or mr-auto
 */
export const marginEndAuto = cn(
  "rtl:ml-auto",
  "ltr:mr-auto"
);

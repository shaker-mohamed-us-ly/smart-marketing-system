/**
 * Layout Tokens for Standard Centered Canvas System
 * 
 * This system ensures all dashboard/control content uses the same
 * standard canvas width for visual consistency across the platform.
 */

export const layoutTokens = {
  // Shell padding for outer container
  shellPaddingMobile: "16px",
  shellPaddingTablet: "24px",
  shellPaddingDesktop: "32px",

  // Gap between page sections
  pageGap: "24px",

  // Gap between cards in grids
  cardGap: "20px",

  // Standard platform canvas width - unified across all pages
  platformCanvasMaxWidth: "1360px",
  
  // Narrow canvas for simple readable pages
  platformNarrowCanvasMaxWidth: "1120px",
  
  // Wide canvas for data-heavy pages (same as standard)
  platformWideCanvasMaxWidth: "1360px",
} as const;

export type CanvasType = "platform" | "narrow" | "wide";

export const getCanvasMaxWidth = (type: CanvasType): string => {
  switch (type) {
    case "platform":
      return layoutTokens.platformCanvasMaxWidth;
    case "narrow":
      return layoutTokens.platformNarrowCanvasMaxWidth;
    case "wide":
      return layoutTokens.platformWideCanvasMaxWidth;
    default:
      return layoutTokens.platformCanvasMaxWidth;
  }
};

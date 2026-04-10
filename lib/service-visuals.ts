/**
 * Material Symbols rounded (filled), same family as pricing nav icons
 * (rocket, trending-up, corporate-fare). Picked for strong silhouettes at small sizes.
 * @see https://icon-sets.iconify.design/material-symbols/
 */
export const SERVICE_ICON_BY_SLUG: Record<string, string> = {
  /** Board + chips: reads clearly at small sizes (deployed-code can look sparse). */
  "web-development": "material-symbols:developer-board-rounded",
  /** Phone + tablet silhouette; stronger fill than phone-iphone alone. */
  "mobile-applications": "material-symbols:devices-rounded",
  "custom-software": "material-symbols:view-quilt-rounded",
  "ui-ux-design": "material-symbols:format-paint-rounded",
  "cloud-infrastructure": "material-symbols:cloud-sync-rounded",
  /** Classic shield; gpp-good can read as a tiny mark in some renders. */
  cybersecurity: "material-symbols:security-rounded",
  "api-development": "material-symbols:cable-rounded",
  "data-analytics": "material-symbols:monitoring-rounded",
};

export function serviceIconForSlug(slug: string): string {
  return SERVICE_ICON_BY_SLUG[slug] ?? "material-symbols:layers-rounded";
}

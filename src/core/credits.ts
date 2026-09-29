/**
 * Author credit. Every link carries UTM params so Google Analytics on darkredgm.com
 * attributes the visit to this template:
 *   Acquisition > Traffic acquisition > Session source / medium = "naturiix / referral"
 * `utm_content` tells which spot of the site was clicked (footer, home, menu...).
 */
export const AUTHOR = {
  name: 'Darkredgm',
  site: 'https://www.darkredgm.com',
};

const UTM = {
  utm_source: 'naturiix',
  utm_medium: 'referral',
  utm_campaign: 'portfolio_templates',
};

export type CreditPlacement = 'footer' | 'home' | 'products' | 'side_menu';

export function authorUrl(placement: CreditPlacement): string {
  const params = new URLSearchParams({ ...UTM, utm_content: placement });
  return `${AUTHOR.site}/?${params}`;
}

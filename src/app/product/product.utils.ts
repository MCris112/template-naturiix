import { products } from './product.data';
import { Product, ProductPresentation, ProductPrice, ProductVariation } from './product.types';

export const presentationLabels: Record<ProductPresentation, string> = {
  capsules: 'Cápsulas',
  powder: 'Polvo',
};

export const currencySymbols: Record<ProductPrice['currency'], string> = {
  PEN: 'S/',
};

/** Simple products are exposed as a single variation so the UI treats every product the same */
export function getVariations(product: Product): ProductVariation[] {
  if (product.type === 'variable') return product.variations;

  return [
    {
      id: `${product.slug}-default`,
      attributes: product.attributes,
      content: product.content,
      price: product.price,
      inStock: product.inStock,
      image: product.image,
    },
  ];
}

export function getPresentations(product: Product): ProductPresentation[] {
  return [...new Set(getVariations(product).map((v) => v.attributes.presentation))];
}

export function finalPrice(price: ProductPrice): number {
  if (!price.discount) return price.amount;
  return Math.round(price.amount * (100 - price.discount)) / 100;
}

export function formatPrice(amount: number, currency: ProductPrice['currency'] = 'PEN'): string {
  return `${currencySymbols[currency]}${amount.toFixed(2)}`;
}

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

const normalize = (text: string) =>
  text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();

export function searchProducts(query: string, presentation?: ProductPresentation): Product[] {
  const q = normalize(query);

  return products.filter((p) => {
    if (presentation && !getPresentations(p).includes(presentation)) return false;
    return !q || normalize(p.name).includes(q) || p.slug.includes(q);
  });
}

/** Products sharing a presentation with the given one, excluding itself */
export function similarProducts(product: Product, limit = 4): Product[] {
  const presentations = getPresentations(product);

  return products
    .filter((p) => p.id !== product.id && getPresentations(p).some((x) => presentations.includes(x)))
    .slice(0, limit);
}

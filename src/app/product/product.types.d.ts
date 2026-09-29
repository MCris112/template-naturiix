export type ProductType = "variable" | "simple";

export type ProductPresentation = "capsules" | "powder";

export type Product = {
  id: number;
  slug: string;             // used in the url: /productos/:slug
  name: string;
  description: string;
  image: string;            // transparent cover used in listings and sliders
  type: ProductType;
} & (
  | {
      type: "variable";
      variations: ProductVariation[];
    }
  | {
      type: "simple";
      attributes: ProductAttributes;
      content: ProductContent;
      price: ProductPrice;
      inStock: boolean;
    }
);

export type ProductAttributes = {
  presentation: ProductPresentation;
  size: string;
};

export type ProductContent = {
  whatIs: string;           // what the product/variant is
  content: string[];        // ingredients or included items
  whatIsUsedFor: string[];  // benefits / uses
  haveInMind: string[];     // warnings, notes
};

export type ProductPrice = {
  amount: number;           // regular price
  currency: "PEN";
  discount?: number;        // percentage off the regular price (0 - 100)
};

export type ProductVariation = {
  id: string;
  attributes: ProductAttributes;
  content: ProductContent;  // 👈 each variation has its own content
  price: ProductPrice;
  inStock: boolean;
  image?: string;           // falls back to the product image
};

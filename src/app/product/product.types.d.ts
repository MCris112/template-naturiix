export type ProductType = "variable" | "simple";

export type Product = {
  id: number;
  name: string;
  description: string;
  type: ProductType;
} & (
  | {
      type: "variable";
      variations: ProductVariation[];
    }
  | {
      type: "simple";
      content: ProductContent;
      price: ProductPrice;
    }
);

export type ProductContent = {
  whatIs: string;           // what the product/variant is
  content: string[];        // ingredients or included items
  whatIsUsedFor: string[];  // benefits / uses
  haveInMind: string[];     // warnings, notes
};

export type ProductPrice = {
  amount: number;
  currency: "PEN";
  discount?: number;
};

export type ProductVariation = {
  id: string;
  attributes: {
    presentation: "capsules" | "powder";
    size: string;
  };
  content: ProductContent;  // 👈 each variation has its own content
  price: ProductPrice;
  inStock: boolean;
  image?: string;
};

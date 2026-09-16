export type ProductColorway = {
  id: string;
  name: string;
  label: string;
  hex: string;
  textColor: string;
  image: string;
};

export type ProductFeature = {
  id: string;
  title: string;
  description: string;
  value?: string;
};

export type ProductMaterial = {
  id: string;
  name: string;
  description: string;
  position: "upper" | "midsole" | "outsole" | "lining";
};

export type ProductSize = {
  label: string;
  value: number;
  available: boolean;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  price: number;

  colorways: ProductColorway[];
  features: ProductFeature[];
  materials: ProductMaterial[];
  sizes: ProductSize[];
};


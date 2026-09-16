"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultColorway } from "@/data/product";

type ProductExperienceContextValue = {
  selectedColorwayId: string;
  selectedSize: number | null;
  cartQuantity: number;
  isCartOpen: boolean;

  setSelectedColorwayId: (id: string) => void;
  setSelectedSize: (size: number | null) => void;
  setCartQuantity: (quantity: number) => void;
  setIsCartOpen: (open: boolean) => void;

  addToCart: () => void;
  closeCart: () => void;
  resetProductSelection: () => void;
};

const ProductExperienceContext =
  createContext<ProductExperienceContextValue | null>(null);

type ProductExperienceProviderProps = {
  children: ReactNode;
};

export function ProductExperienceProvider({
  children,
}: ProductExperienceProviderProps) {
  const [selectedColorwayId, setSelectedColorwayId] = useState(
    defaultColorway.id,
  );
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = () => {
    setCartQuantity((currentQuantity) => currentQuantity + 1);
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const resetProductSelection = () => {
    setSelectedColorwayId(defaultColorway.id);
    setSelectedSize(null);
    setCartQuantity(0);
    setIsCartOpen(false);
  };

  const value = useMemo(
    () => ({
      selectedColorwayId,
      selectedSize,
      cartQuantity,
      isCartOpen,

      setSelectedColorwayId,
      setSelectedSize,
      setCartQuantity,
      setIsCartOpen,

      addToCart,
      closeCart,
      resetProductSelection,
    }),
    [selectedColorwayId, selectedSize, cartQuantity, isCartOpen],
  );

  return (
    <ProductExperienceContext.Provider value={value}>
      {children}
    </ProductExperienceContext.Provider>
  );
}

export function useProductExperience() {
  const context = useContext(ProductExperienceContext);

  if (!context) {
    throw new Error(
      "useProductExperience must be used within ProductExperienceProvider",
    );
  }

  return context;
}


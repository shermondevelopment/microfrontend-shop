import { create } from "zustand";
import type { CartProduct } from "@microfrontend/types";

interface CartStore {
  products: CartProduct[];
  addProduct: (product: CartProduct) => void;
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],

  addProduct: (product) =>
    set((state) => {
      const existing = state.products.find((item) => item.id === product.id);

      if (existing) {
        return {
          products: state.products.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,
          ),
        };
      }

      return {
        products: [
          ...state.products,
          {
            ...product,
            quantity: 1,
          },
        ],
      };
    }),
}));

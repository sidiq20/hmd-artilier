import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ShippingDetails } from '../types';

interface StoreState {
  cart: CartItem[];
  wishlist: Product[];
  shippingDetails: ShippingDetails | null;
  addToCart: (product: Product, size: number) => void;
  removeFromCart: (productId: number, size: number) => void;
  updateQuantity: (productId: number, size: number, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  setShippingDetails: (details: ShippingDetails) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      shippingDetails: null,
      addToCart: (product, size) =>
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id && item.selectedSize === size
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id && item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, selectedSize: size, quantity: 1 }],
          };
        }),
      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.id === productId && item.selectedSize === size)
          ),
        })),
      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId && item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        })),
      toggleWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);
          return {
            wishlist: exists
              ? state.wishlist.filter((item) => item.id !== product.id)
              : [...state.wishlist, product],
          };
        }),
      setShippingDetails: (details) =>
        set({ shippingDetails: details }),
      clearCart: () => set({ cart: [], shippingDetails: null }),
    }),
    {
      name: 'shoe-store',
    }
  )
);
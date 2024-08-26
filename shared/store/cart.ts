import { create } from "zustand";
import { Api } from "../services/api-client";
import { getCartDetails } from "../lib";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export type CartStateItem = {
  id: number;
  quantity: number;
  name: string;
  imageUrl: string;
  price: number;
  pizzaSize?: number | null;
  pizzaType?: number | null;
  ingredients: Array<{ name: string; price: number }>;
};
interface CartState {
  loading: boolean;
  error: boolean;
  totalAmount: number;
  items: CartStateItem[];
  fetchCartItems: () => void;
  updateItemsQuantity: (id: number, quantity: number) => void;
  deleteCartItem: (id: number) => void;

  addCartItem: (values: any) => void;
}

export const useCartStore = create<CartState>()((set, get) => ({
  loading: false,
  error: false,
  totalAmount: 0,
  items: [],
  fetchCartItems: async () => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.fetchCart();
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  updateItemsQuantity: async (id: number, quantity: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.updateQuantity(id, quantity);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  deleteCartItem: async (id: number) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.removeCartItem(id);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
  addCartItem: async (values: CreateCartItemValues) => {
    try {
      set({ loading: true, error: false });
      const data = await Api.cart.addCartItem(values);
      set(getCartDetails(data));
    } catch (err) {
      set({ error: true });
    } finally {
      set({ loading: false });
    }
  },
}));

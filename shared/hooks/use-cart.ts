import React from "react";
import { CartStateItem, useCartStore } from "../store/cart";

interface ReturnProps {
  totalAmount: number;
  items: CartStateItem[];
  loading: boolean;
  updateItemsQuantity: (id: number, quantity: number) => void;
  deleteCartItem: (id: number) => void;
  addCartItem: (values: any) => void;
}
export const useCart = (): ReturnProps => {
  const cartState = useCartStore((state) => state);

  React.useEffect(() => {
    cartState.fetchCartItems();
  }, []);

  return cartState;
};

import { Ingredient } from "@prisma/client";
import { CartStateItem } from "../store/cart";
import { CartDTO } from "../services/dto/cart.dto";
import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";

interface RetuenProps {
  totalAmount: number;
  items: CartStateItem[];
}
export const getCartDetails = (data: CartDTO): RetuenProps => {
  const items = data.items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    name: item.productItem.product.name,
    imageUrl: item.productItem.product.imageUrl,
    price: calcCartItemTotalPrice(item),
    pizzaSize: item.productItem.size,
    pizzaType: item.productItem.pizzaType,
    ingredients: item.ingredients.map((ingredient) => ({
      name: ingredient.name,
      price: ingredient.price,
    })),
  }));
  return {
    totalAmount: data.totalAmount,
    items,
  };
};

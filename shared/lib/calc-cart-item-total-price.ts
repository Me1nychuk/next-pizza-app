import { CartItemDTO } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
  const totalIngredientsPrice = item.ingredients.reduce((acc, item) => {
    return acc + item.price;
  }, 0);
  return item.quantity * (item.productItem.price + totalIngredientsPrice);
};

import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CartStateItem } from "../store/cart";

export const getCartItemDetails = (
  ingredients: CartStateItem["ingredients"],
  type: PizzaType | null,
  size: PizzaSize | null
): string => {
  const productDetails = [];

  if (type && size) {
    const typeName = mapPizzaType[type];
    productDetails.push(`${size} см, ${typeName} тісто`);
  }

  if (ingredients.length > 0) {
    productDetails.push(
      `доп. інгредієнти(${ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ")})`
    );
  }
  return productDetails.join(", ");
};

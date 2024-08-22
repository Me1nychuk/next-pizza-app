import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDetails = (
  type: PizzaType,
  size: PizzaSize,
  ingredients: Ingredient[]
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

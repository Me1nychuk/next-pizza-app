import { Ingredient, ProductItem } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { CalcTotalPizzaPrice } from "./calc-total-pizza-price";

/**
 * Function for getting pizza details
 *
 * @param type
 * @param size
 * @param items
 * @param ingredients
 * @param selectedIngredients
 *
 * @returns totalPrice, productDetails
 */

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const { totalPrice } = CalcTotalPizzaPrice(
    type,
    size,
    items,
    ingredients,
    selectedIngredients
  );

  const productDetails = `${size} см, ${mapPizzaType[type]} тісто${
    selectedIngredients.size > 0
      ? `, доп. інгредієнти(${selectedIngredients.size})`
      : ""
  } `;

  return { totalPrice, productDetails };
};

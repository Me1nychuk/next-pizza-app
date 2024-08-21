import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

/**
 * Function to calculate total price of pizza item
 *
 * @example ``` CalcTotalPizzaPrice(20, 2,[...items], [...ingredients],  [...selectedIngredients]) ```
 *
 * @param items - array of pizza items
 * @param ingredients - array of basic ingredients
 * @param selectedSize - size selected pizza
 * @param selectedType - type selected pizza
 * @param selectedIngredients - array of selected ingredients
 *
 * @returns total price, pizza price
 */
export const CalcTotalPizzaPrice = (
  selectedType: PizzaType,
  selectedSize: PizzaSize,
  items: ProductItem[],
  ingredients: Ingredient[],
  selectedIngredients: Set<number>
) => {
  const pizzaPrice =
    items.find(
      (item) => item.pizzaType === selectedType && item.size === selectedSize
    )?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((item) => selectedIngredients.has(item.id))
    .reduce((acc, item) => acc + item.price, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;

  return { totalPrice };
};

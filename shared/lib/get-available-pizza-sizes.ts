import { ProductItem } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/group-variants";

/**
 *Function to get available pizza sizes
 *
 * @example ``` getAvailablePizzaSizes(1, [...items]) ```
 *
 * @param type - selected pizza type
 * @param items - array of pizza items
 *
 * @returns Array of available pizza sizes
 */
export const getAvailablePizzaSizes = (
  type: PizzaType,
  items: ProductItem[]
): Variant[] => {
  const filteredPizzasByType = items.filter((item) => item.pizzaType === type);
  return pizzaSizes.map((item) => ({
    name: item.name,
    value: item.value,
    disabled: !filteredPizzasByType.some(
      (pizza) => Number(pizza.size) === Number(item.value)
    ),
  }));
};

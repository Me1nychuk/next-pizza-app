import qs from "qs";
import { useRouter } from "next/navigation";
import React from "react";
import { Filters } from "./use-filters";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.prices,
        ingredients: Array.from(filters.selectedIngredients),
        sizes: Array.from(filters.sizes),
        pizzaTypes: Array.from(filters.pizzaTypes),
      };

      const queryString = qs.stringify(params, { arrayFormat: "comma" });
      router.push(`?${queryString}`, { scroll: false });
    }
    isMounted.current = true;
  }, [filters]);
};

import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";
import { useSet } from "react-use";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
  selectedIngredients: Set<string>;
  onToggleId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<
    ReturnProps["ingredients"]
  >([]);

  const [loading, setLoading] = React.useState<ReturnProps["loading"]>(true);

  const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

  React.useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const res = await Api.ingredients.getAll();
        setIngredients(res);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return { ingredients, loading, selectedIngredients, onToggleId: toggle };
};

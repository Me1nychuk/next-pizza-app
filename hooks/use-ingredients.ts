import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import React from "react";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<
    ReturnProps["ingredients"]
  >([]);

  const [loading, setLoading] = React.useState<ReturnProps["loading"]>(true);

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

  return { ingredients, loading };
};

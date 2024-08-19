import { Ingredient, Product, ProductItem } from "@prisma/client";

export interface IProduct extends Product {
  items: ProductItem[];
  ingredients: Ingredient[];
}

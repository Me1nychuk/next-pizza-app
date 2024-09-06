import React from "react";
import { WhiteBlock } from "../white-block";
import { Trash } from "lucide-react";
import { CheckoutItem } from "../checkout-item";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { getCartItemDetails } from "@/shared/lib";
import { CartStateItem } from "@/shared/store/cart";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface CheckoutCartProps {
  className?: string;
  items: CartStateItem[];
  onClickCountButton: (
    id: number,
    quantity: number,
    type: "plus" | "minus"
  ) => void;
  deleteCartItem: (id: number) => void;
  loading?: boolean;
}

export const CheckoutCart = ({
  className,
  items,
  onClickCountButton,
  deleteCartItem,
  loading = false,
}: CheckoutCartProps) => {
  return (
    <WhiteBlock
      title="1. Кошик"
      contentClassName="py-0 px-6"
      endAdornment={
        <div className="flex items-center gap-2 text-gray-400 cursor-pointer hover:text-gray-700 transition-all duration-300">
          Очистити Кошик <Trash size={16} />
        </div>
      }
    >
      {!loading &&
        items &&
        items.map((item) => (
          <CheckoutItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            details={
              item.pizzaSize && item.pizzaType
                ? getCartItemDetails(
                    item.ingredients,
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize
                  )
                : ""
            }
            disabled={item.disabled}
            name={item.name}
            price={item.price}
            quantity={item.quantity}
            onClickCountButton={(type) =>
              onClickCountButton(item.id, item.quantity, type)
            }
            onClickRemove={() => deleteCartItem(item.id)}
          />
        ))}

      {!loading && !items.length && (
        <div className="text-center text-gray-400 py-8">Кошик порожній</div>
      )}

      {loading && [1, 2].map((item) => <CheckoutItemSkeleton key={item} />)}
    </WhiteBlock>
  );
};

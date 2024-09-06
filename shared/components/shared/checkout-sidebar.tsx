import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button, Skeleton } from "../ui";
import { cn } from "@/shared/lib/utils";

interface CheckoutSidebarProps {
  className?: string;
  totalAmount: number;
  loading?: boolean;
}

const VAT = 15;
const DELIVERY_PRICE = 95;
export const CheckoutSidebar = ({
  className,
  totalAmount,
  loading,
}: CheckoutSidebarProps) => {
  return (
    <div className={cn(" w-[450px] bg-white rounded-3xl p-3", className)}>
      <WhiteBlock className="p-6 sticky top-4" contentClassName="p-0">
        <div className="">
          <div className="flex flex-col gap-1">
            <p className="text-xl">Сума до сплати:</p>
            {!loading ? (
              <span className="text-3xl font-extrabold">
                {(
                  totalAmount +
                  (totalAmount > 0 ? DELIVERY_PRICE : 0) +
                  (totalAmount / 100) * VAT
                ).toFixed(2)}
                ₴
              </span>
            ) : (
              <Skeleton className="h-9 w-64 rounded-sm mb-1" />
            )}
          </div>
        </div>
        <div className="py-7 border-y border-y-gray-100">
          {!loading ? (
            <>
              <CheckoutItemDetails
                title="Вартість товарів"
                value={Number(totalAmount.toFixed(2))}
                startAdornment={<Package size={16} className="text-gray-500" />}
              />
              <CheckoutItemDetails
                title="Податки"
                value={Number(((totalAmount / 100) * VAT).toFixed(2))}
                startAdornment={<Percent size={16} className="text-gray-500" />}
              />
              <CheckoutItemDetails
                title="Вартість доставки"
                value={totalAmount > 0 ? DELIVERY_PRICE : 0}
                startAdornment={<Truck size={16} className="text-gray-500" />}
              />
            </>
          ) : (
            <>
              <Skeleton className="h-[60px] w-full rounded-sm mb-1" />
              <Skeleton className="h-[60px] w-full rounded-sm mb-1" />
              <Skeleton className="h-[60px] w-full rounded-sm mb-1" />
            </>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-[60px] text-lg font-bold"
          loading={loading}
          disabled={totalAmount === 0}
        >
          Перейти до оплати <ArrowRight size={20} className="ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

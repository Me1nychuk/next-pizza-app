import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutItemDetails } from "./checkout-item-details";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { Button } from "../ui";
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
            <span className="text-3xl font-extrabold">
              {totalAmount + DELIVERY_PRICE + (totalAmount / 100) * VAT} ₴
            </span>
          </div>
        </div>
        <div className="py-7 border-y border-y-gray-100">
          <CheckoutItemDetails
            title="Вартість товарів"
            value={totalAmount}
            startAdornment={<Package size={16} className="text-gray-500" />}
          />
          <CheckoutItemDetails
            title="Податки"
            value={(totalAmount / 100) * VAT}
            startAdornment={<Percent size={16} className="text-gray-500" />}
          />
          <CheckoutItemDetails
            title="Вартість доставки"
            value={DELIVERY_PRICE}
            startAdornment={<Truck size={16} className="text-gray-500" />}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-[60px] text-lg font-bold"
          loading={loading}
        >
          Перейти до оплати <ArrowRight size={20} className="ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};

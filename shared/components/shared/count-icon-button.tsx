import { cn } from "@/shared/lib/utils";
import React from "react";
import { Button } from "../ui";
import { Minus, Plus } from "lucide-react";

export interface CountIconButtonProps {
  size?: "sm" | "lg";
  type?: "plus" | "minus";
  onClick?: () => void;
  disabled?: boolean;
}
export const CountIconButton = ({
  size = "sm",
  type,
  onClick,
  disabled = false,
}: CountIconButtonProps) => {
  return (
    <Button
      variant="outline"
      onClick={() => onClick?.()}
      disabled={disabled}
      className={cn(
        " p-0 hover:bg-primary hover:text-white disabled:bg-white disabled:border-gray-700 disabled:text-gray-500 ",
        {
          "h-[30px] w-[30px] rounded-[10px]": size === "sm",
          "h-[38px] w-[38px] rounded-md": size === "lg",
        }
      )}
    >
      {type === "plus" ? (
        <Plus className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} />
      ) : (
        <Minus className={size === "sm" ? "w-4 h-4" : "w-5 h-5"} />
      )}
    </Button>
  );
};

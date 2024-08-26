import React from "react";
import { CountIconButton, CountIconButtonProps } from "./count-icon-button";
import { cn } from "@/shared/lib/utils";

interface CountButtonProps {
  size?: CountIconButtonProps["size"];
  value?: number;
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
}
export const CountButton = ({
  className,
  size = "sm",
  value = 1,
  onClick,
}: CountButtonProps) => {
  return (
    <>
      <div
        className={cn(
          "inline-flex items-center gap-3 justify-between   ",
          className
        )}
      >
        <CountIconButton
          size={size}
          disabled={value < 2}
          onClick={() => onClick?.("minus")}
          type="minus"
        />
        <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>
        <CountIconButton
          size={size}
          onClick={() => onClick?.("plus")}
          type="plus"
        />
      </div>
    </>
  );
};

import { cn } from "@/shared/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface ClearButtonProps {
  onClick?: () => void;
  className?: string;
}
export const ClearButton = ({ onClick, className }: ClearButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer",
        className
      )}
    >
      <X className="w-5 h-5" />
    </button>
  );
};

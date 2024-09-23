import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import React from "react";

interface PizzaImageProps {
  className?: string;
  src: string;
  alt: string;
  size: 20 | 30 | 40;
}
export const PizzaImage = ({ className, src, alt, size }: PizzaImageProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative  w-full min-h-[500px] min-w-[510px] max-sm:min-w-[250px]  max-sm:min-h-[250px] max-sm:max-h-[350px]",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={size === 20 ? 300 : size === 30 ? 400 : 500}
          height={size === 20 ? 300 : size === 30 ? 400 : 500}
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300 object-contain ",
            {
              "h-[300px] w-[300px] max-sm:h-[250px] max-sm:w-[250px] ":
                size == 20,
              "h-[400px] w-[400px] rotate-[20deg] max-sm:h-[250px] max-sm:w-[250px] max-sm:rotate-[0deg]":
                size == 30,
              "h-[500px] w-[500px] rotate-[-20deg]max-sm:h-[250px] max-sm:w-[250px] max-sm:rotate-[0deg]":
                size == 40,
            }
          )}
        />
        <div className="max-sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
        <div className="max-sm:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
      </div>
    </>
  );
};

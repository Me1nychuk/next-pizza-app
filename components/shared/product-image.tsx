import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
  className?: string;
  src: string;
  alt: string;
  size: 20 | 30 | 40;
}
export const ProductImage = ({
  className,
  src,
  alt,
  size,
}: ProductImageProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center justify-center flex-1 relative  w-full",
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          width={size === 20 ? 300 : size === 30 ? 400 : 500}
          height={size === 20 ? 300 : size === 30 ? 400 : 500}
          className={cn(
            "relative left-2 top-2 transition-all z-10 duration-300 ",
            {
              "h-[300px] w-[300px]": size == 20,
              "h-[400px] w-[400px]": size == 30,
              "h-[500px] w-[500px]": size == 40,
            }
          )}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dashed border-2 rounded-full border-gray-200 w-[450px] h-[450px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-dotted border-2 rounded-full border-gray-100 w-[370px] h-[370px]" />
      </div>
    </>
  );
};

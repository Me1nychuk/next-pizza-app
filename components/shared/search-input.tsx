"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useClickAway, useDebounce } from "react-use";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";

interface SearchInputProps {
  className?: string;
}
export const SearchInput = ({ className }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [products, setProducts] = React.useState<Product[]>([]);
  const [focused, setFocused] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    setFocused(false);
  });

  useDebounce(
    () => {
      const getData = async () => {
        const res = await Api.products.search(searchQuery);
        setProducts(res);
      };

      getData();
    },
    300,
    [searchQuery]
  );
  return (
    <>
      {focused && (
        <div className="absolute left-0 top-0 right-0 bottom-0 bg-black/50 z-30"></div>
      )}
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search
          size={16}
          className="absolute top-1/2 -translate-y-1/2 left-5 h-4 text-gray-400"
        />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Введіть назву продукту.."
          onFocus={() => setFocused(true)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30 ",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id}>
                <div className=" flex items-center gap-3 px-3 py-2 hover:bg-primary/10 ">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={30}
                    height={30}
                  />
                  <span>{product.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
